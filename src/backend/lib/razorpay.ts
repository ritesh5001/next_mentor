import "server-only";

import Razorpay from "razorpay";
import crypto from "node:crypto";

import { env } from "./env";

let client: Razorpay | null = null;

export function razorpay(): Razorpay {
  const cfg = env("razorpay");
  client ??= new Razorpay({
    key_id: cfg.RAZORPAY_KEY_ID,
    key_secret: cfg.RAZORPAY_KEY_SECRET,
  });
  return client;
}

export async function createRazorpayOrder(params: {
  amountInPaise: number;
  receipt: string;
  notes: Record<string, string>;
}) {
  if (!Number.isInteger(params.amountInPaise) || params.amountInPaise <= 0) {
    throw new Error(`Order amount must be a positive integer in paise, got ${params.amountInPaise}`);
  }

  return razorpay().orders.create({
    amount: params.amountInPaise,
    currency: "INR",
    receipt: params.receipt,
    notes: params.notes,
    // We grant access from the webhook, so there is no need for Razorpay to
    // auto-capture on a separate schedule.
    payment_capture: true,
  });
}

/**
 * Verifies the `X-Razorpay-Signature` header on an incoming webhook.
 *
 * MUST be given the exact raw request body. Re-serializing the parsed JSON
 * produces a different byte sequence (key order, whitespace) and the HMAC will
 * never match — this is the single most common way this integration breaks.
 *
 * Uses timingSafeEqual rather than `===` so the comparison does not leak the
 * expected signature one byte at a time.
 */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;

  const expected = crypto
    .createHmac("sha256", env("razorpay").RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

/**
 * Verifies the signature Razorpay Checkout hands back to the browser.
 *
 * This is a UX signal only — it tells us whether to show a success screen while
 * the webhook lands. It MUST NOT be what grants an enrollment: the payload
 * reaches us via the user's own browser and can be replayed or forged.
 */
export function verifyCheckoutSignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  signature: string;
}): boolean {
  const expected = crypto
    .createHmac("sha256", env("razorpay").RAZORPAY_KEY_SECRET)
    .update(`${params.razorpayOrderId}|${params.razorpayPaymentId}`)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(params.signature, "utf8");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

/** Formats integer paise as Indian rupees, e.g. 249900 → "₹2,499". */
export function formatPaise(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: paise % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(paise / 100);
}
