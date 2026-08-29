import { Hono } from "hono";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { commissions, lessons, users } from "@/db/schema";
import { verifyWebhookSignature, formatPaise } from "@/lib/razorpay";
import {
  fulfilPaidOrder,
  markOrderFailed,
  reverseRefundedOrder,
  getOrderReceiptData,
} from "@/services/orders";
import { sendPurchaseReceiptEmail, sendCommissionEarnedEmail } from "@/lib/email";
import { invalidateTag } from "@/lib/cache";
import { CATALOG_TAG } from "@/services/courses";

/**
 * Gateway webhooks. No auth middleware — these are authenticated by signature.
 */
export const webhookRoutes = new Hono();

type RazorpayEntity = {
  id?: string;
  order_id?: string;
  amount?: number;
  payment_id?: string;
  error_description?: string;
};

/**
 * Razorpay — the only thing in this system that grants course access.
 *
 * Reads the RAW body for HMAC verification. Re-serialising parsed JSON changes
 * key order and whitespace, so the signature never matches — the classic silent
 * failure in this integration.
 *
 * Always answers 2xx once the signature is valid: returning 500 for a
 * business-logic problem makes Razorpay retry forever.
 */
webhookRoutes.post("/razorpay", async (c) => {
  const rawBody = await c.req.text();

  if (!verifyWebhookSignature(rawBody, c.req.header("x-razorpay-signature") ?? null)) {
    console.warn("[razorpay-webhook] Rejected: bad signature");
    return c.json({ error: "Invalid signature" }, 400);
  }

  let event: { event?: string; payload?: Record<string, { entity?: RazorpayEntity }> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return c.json({ error: "Malformed JSON" }, 400);
  }

  try {
    switch (event.event) {
      case "payment.captured": {
        const entity = event.payload?.payment?.entity;
        if (!entity?.order_id || !entity.id || typeof entity.amount !== "number") {
          return c.json({ received: true });
        }

        const result = await fulfilPaidOrder({
          razorpayOrderId: entity.order_id,
          razorpayPaymentId: entity.id,
          amountReceivedInPaise: entity.amount,
        });

        if (result.status === "granted") {
          // After the transaction commits — a rollback must not still deliver
          // a receipt for a purchase that never happened.
          const receipt = await getOrderReceiptData(result.orderId);
          if (receipt) {
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

          if (result.commissionInPaise !== null) {
            await notifyCommissionEarned(result.orderId, result.commissionInPaise);
          }

          console.info("[razorpay-webhook] Granted", result.orderId);
        } else if (result.status === "amount_mismatch") {
          // Do NOT grant. Someone paid an amount we did not ask for.
          console.error("[razorpay-webhook] AMOUNT MISMATCH — access withheld", {
            razorpayOrderId: entity.order_id,
            expected: result.expected,
            received: result.received,
          });
        }

        return c.json({ received: true });
      }

      case "payment.failed": {
        const entity = event.payload?.payment?.entity;
        if (entity?.order_id) {
          await markOrderFailed(entity.order_id, entity.error_description ?? "Payment failed");
        }
        return c.json({ received: true });
      }

      case "refund.created":
      case "refund.processed": {
        const entity = event.payload?.refund?.entity;
        if (entity?.payment_id) await reverseRefundedOrder(entity.payment_id);
        return c.json({ received: true });
      }

      default:
        // Acknowledge unhandled events or Razorpay retries them indefinitely.
        return c.json({ received: true });
    }
  } catch (err) {
    // A genuine fault (database down) — 500 so Razorpay retries, which is what
    // we want here.
    console.error("[razorpay-webhook] Handler threw", err);
    return c.json({ error: "Handler error" }, 500);
  }
});

/** Never throws: the money is recorded, and a mail failure must not 500. */
async function notifyCommissionEarned(orderId: string, amountInPaise: number) {
  try {
    const [commission] = await db
      .select({
        earnerId: commissions.earnerId,
        sourceUserId: commissions.sourceUserId,
        maturesAt: commissions.maturesAt,
      })
      .from(commissions)
      .where(eq(commissions.orderId, orderId))
      .limit(1);

    if (!commission) return;

    const [earner] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, commission.earnerId))
      .limit(1);

    const [buyer] = await db
      .select({ name: users.name })
      .from(users)
      .where(eq(users.id, commission.sourceUserId))
      .limit(1);

    if (!earner) return;

    await sendCommissionEarnedEmail({
      to: earner.email,
      amountFormatted: formatPaise(amountInPaise),
      // First name only — an affiliate does not need a contact list emailed to
      // them.
      buyerName: buyer?.name?.split(" ")[0] ?? "Someone",
      clearsOn: commission.maturesAt,
    });
  } catch (err) {
    console.error("[razorpay-webhook] Commission notification failed", orderId, err);
  }
}

/**
 * Cloudflare Stream transcode callback.
 *
 * Fails closed without a secret: an unsigned endpoint that flips lessons to
 * "ready" would let anyone mark a lesson playable.
 */
webhookRoutes.post("/cloudflare", async (c) => {
  const rawBody = await c.req.text();
  const secret = process.env.CLOUDFLARE_STREAM_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[cf-webhook] CLOUDFLARE_STREAM_WEBHOOK_SECRET is not set — rejecting");
    return c.json({ error: "Not configured" }, 503);
  }

  if (!verifyCloudflareSignature(rawBody, c.req.header("webhook-signature") ?? null, secret)) {
    return c.json({ error: "Invalid signature" }, 400);
  }

  let body: {
    uid?: string;
    readyToStream?: boolean;
    status?: { state?: string };
    duration?: number;
  };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return c.json({ error: "Malformed JSON" }, 400);
  }

  if (!body.uid) return c.json({ received: true });

  const state = body.status?.state;
  const videoStatus =
    body.readyToStream && state === "ready" ? "ready" : state === "error" ? "errored" : "processing";

  const durationSeconds = Math.round(body.duration ?? 0);

  const updated = await db
    .update(lessons)
    .set({
      videoStatus,
      durationSeconds: durationSeconds > 0 ? durationSeconds : undefined,
      updatedAt: new Date(),
    })
    .where(eq(lessons.streamVideoId, body.uid))
    .returning({ id: lessons.id });

  // Duration feeds the catalog card, so the cached copy is now stale.
  if (updated.length > 0) invalidateTag(CATALOG_TAG);

  return c.json({ received: true });
});

/**
 * `Webhook-Signature: time=<ts>,sig1=<hmac>` over `<ts>.<body>`.
 * Timing-safe, and the timestamp is range-checked so a captured payload cannot
 * be replayed later.
 */
function verifyCloudflareSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;

  const parts = Object.fromEntries(
    header.split(",").map((kv) => {
      const [k, ...rest] = kv.split("=");
      return [k.trim(), rest.join("=")];
    }),
  );

  const time = parts.time;
  const sig = parts.sig1;
  if (!time || !sig) return false;

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(time));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) return false;

  const expected = crypto.createHmac("sha256", secret).update(`${time}.${rawBody}`).digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(sig, "utf8");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}
