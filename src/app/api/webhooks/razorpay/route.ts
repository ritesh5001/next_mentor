import { NextResponse } from "next/server";

import { verifyWebhookSignature, formatPaise } from "@/backend/lib/razorpay";
import {
  fulfilPaidOrder,
  markOrderFailed,
  reverseRefundedOrder,
  getOrderReceiptData,
} from "@/backend/services/orders";
import { sendPurchaseReceiptEmail } from "@/backend/lib/email";
import { revalidatePath } from "next/cache";

/**
 * Razorpay webhook — the only thing in this application that grants course access.
 *
 * Four constraints, each of which has burned someone before:
 *
 *  1. Node runtime, not edge. Signature verification needs node:crypto.
 *  2. The RAW body. Re-serialising parsed JSON changes key order and whitespace,
 *     so the HMAC never matches. This is the classic silent failure.
 *  3. Idempotent. Razorpay retries until it gets a 2xx and does not promise to
 *     stop after the first success.
 *  4. Always 2xx once the signature is valid. Returning 500 for a business-logic
 *     problem (unknown order, amount mismatch) makes Razorpay retry forever.
 *     Those cases are logged and acknowledged instead.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RazorpayEntity = {
  id?: string;
  order_id?: string;
  amount?: number;
  payment_id?: string;
  error_description?: string;
};

export async function POST(request: Request) {
  // MUST read the raw text before any JSON parsing.
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    console.warn("[razorpay-webhook] Rejected: bad signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { event?: string; payload?: Record<string, { entity?: RazorpayEntity }> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }

  const name = event.event ?? "";

  try {
    switch (name) {
      case "payment.captured": {
        const entity = event.payload?.payment?.entity;
        if (!entity?.order_id || !entity.id || typeof entity.amount !== "number") {
          console.warn("[razorpay-webhook] payment.captured missing fields");
          return NextResponse.json({ received: true });
        }

        const result = await fulfilPaidOrder({
          razorpayOrderId: entity.order_id,
          razorpayPaymentId: entity.id,
          amountReceivedInPaise: entity.amount,
        });

        if (result.status === "granted") {
          // Email after the transaction has committed. Sending inside it would
          // mean a rollback still delivered a receipt for a purchase that
          // never happened.
          const receipt = await getOrderReceiptData(result.orderId);
          if (receipt) {
            await sendPurchaseReceiptEmail({
              to: receipt.email,
              name: receipt.name,
              courseTitle: receipt.courseTitle,
              courseSlug: receipt.courseSlug,
              amountFormatted: formatPaise(receipt.amountInPaise),
              orderId: receipt.orderId,
            });
          }
          revalidatePath("/dashboard");
          console.info("[razorpay-webhook] Enrollment granted", result.orderId);
        } else if (result.status === "amount_mismatch") {
          // Do NOT grant. Someone paid an amount we did not ask for; a human
          // needs to look at this.
          console.error("[razorpay-webhook] AMOUNT MISMATCH — access withheld", {
            razorpayOrderId: entity.order_id,
            expected: result.expected,
            received: result.received,
          });
        } else {
          console.info("[razorpay-webhook] No-op", result.status, entity.order_id);
        }

        return NextResponse.json({ received: true });
      }

      case "payment.failed": {
        const entity = event.payload?.payment?.entity;
        if (entity?.order_id) {
          await markOrderFailed(entity.order_id, entity.error_description ?? "Payment failed");
        }
        return NextResponse.json({ received: true });
      }

      case "refund.created":
      case "refund.processed": {
        const entity = event.payload?.refund?.entity;
        if (entity?.payment_id) {
          const result = await reverseRefundedOrder(entity.payment_id);
          console.info("[razorpay-webhook] Refund handled", result.status, entity.payment_id);
        }
        return NextResponse.json({ received: true });
      }

      default:
        // Razorpay sends many event types. Acknowledge the ones we do not act
        // on, or it will retry them indefinitely.
        return NextResponse.json({ received: true });
    }
  } catch (err) {
    // A genuine server fault (database down, etc.) — 500 so Razorpay retries,
    // which is exactly what we want here.
    console.error("[razorpay-webhook] Handler threw", name, err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }
}
