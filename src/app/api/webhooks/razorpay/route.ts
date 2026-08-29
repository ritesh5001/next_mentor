import { NextResponse } from "next/server";

import { verifyWebhookSignature, formatPaise } from "@/backend/lib/razorpay";
import {
  fulfilPaidOrder,
  markOrderFailed,
  reverseRefundedOrder,
  getOrderReceiptData,
} from "@/backend/services/orders";
import {
  sendPurchaseReceiptEmail,
  sendCommissionEarnedEmail,
} from "@/backend/lib/email";
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

/**
 * Emails the affiliate about commission they just earned.
 *
 * Never throws: the money is already recorded, and a mail failure must not turn
 * a successful webhook into a 500 that Razorpay then retries.
 */
async function notifyCommissionEarned(orderId: string, amountInPaise: number) {
  try {
    const { db } = await import("@/backend/db");
    const { commissions, users } = await import("@/backend/db/schema");
    const { eq } = await import("drizzle-orm");
    const { formatPaise } = await import("@/backend/lib/razorpay");

    const rows = await db
      .select({
        earnerId: commissions.earnerId,
        sourceUserId: commissions.sourceUserId,
        maturesAt: commissions.maturesAt,
      })
      .from(commissions)
      .where(eq(commissions.orderId, orderId))
      .limit(1);

    const commission = rows[0];
    if (!commission) return;

    const [earner] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, commission.earnerId))
      .limit(1);

    const [buyer] = await db
      .select({ name: users.name, email: users.email })
      .from(users)
      .where(eq(users.id, commission.sourceUserId))
      .limit(1);

    if (!earner) return;

    await sendCommissionEarnedEmail({
      to: earner.email,
      amountFormatted: formatPaise(amountInPaise),
      // First name only — an affiliate does not need their referral's full
      // contact details pushed to them by email.
      buyerName: buyer?.name?.split(" ")[0] ?? "Someone",
      clearsOn: commission.maturesAt,
    });
  } catch (err) {
    console.error("[razorpay-webhook] Commission notification failed", orderId, err);
  }
}

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
            // A course order links to the player; a plan order links to the
            // dashboard, since a plan is not a single piece of content.
            await sendPurchaseReceiptEmail({
              to: receipt.email,
              name: receipt.name,
              itemName:
                receipt.itemType === "plan"
                  ? (receipt.planName ?? "your plan")
                  : (receipt.courseTitle ?? "your course"),
              destinationPath:
                receipt.itemType === "plan" || !receipt.courseSlug
                  ? "/dashboard"
                  : `/learn/${receipt.courseSlug}`,
              amountFormatted: formatPaise(receipt.amountInPaise),
              orderId: receipt.orderId,
            });
          }
          // Tell the affiliate they earned, if they did. After the receipt so
          // the buyer's email is never delayed by the affiliate's.
          if (result.commissionInPaise !== null) {
            await notifyCommissionEarned(result.orderId, result.commissionInPaise);
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
