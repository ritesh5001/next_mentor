/**
 * Smoke test for the commerce path, run against a real database.
 *
 *   pnpm verify:commerce
 *
 * The webhook is the piece most likely to break silently, so the idempotency
 * and amount-mismatch cases are asserted rather than assumed.
 */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users, courses, modules, lessons, orders, enrollments } from "@/db/schema";
import { fulfilPaidOrder, reverseRefundedOrder } from "@/services/orders";
import { isEnrolled } from "@/lib/permissions";
import { generateUniqueReferralCode, } from "@/lib/referral-code";
import { uniqueSlug } from "@/services/courses";
import { verifyWebhookSignature } from "@/lib/razorpay";
import crypto from "node:crypto";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

async function main() {
  const stamp = Date.now();

  // ---------------------------------------------------------------- fixtures
  const [buyer] = await db.insert(users).values({
    name: "Buyer", email: `buyer${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(), emailVerified: new Date(),
  }).returning({ id: users.id });

  const [course] = await db.insert(courses).values({
    slug: await uniqueSlug(`Test Course ${stamp}`),
    title: "Test Course", priceInPaise: 249900, status: "published",
    publishedAt: new Date(),
  }).returning({ id: courses.id });

  const [mod] = await db.insert(modules).values({
    courseId: course.id, title: "Section 1", position: 0,
  }).returning({ id: modules.id });

  await db.insert(lessons).values({
    moduleId: mod.id, title: "Lesson 1", position: 0,
    streamVideoId: `vid_${stamp}`, videoStatus: "ready", durationSeconds: 600,
  });

  const rzpOrderId = `order_test_${stamp}`;
  const rzpPaymentId = `pay_test_${stamp}`;

  const [order] = await db.insert(orders).values({
    userId: buyer.id, courseId: course.id,
    listPriceInPaise: 249900, amountInPaise: 249900,
    razorpayOrderId: rzpOrderId, status: "created",
  }).returning({ id: orders.id });

  // ------------------------------------------------- access before payment
  check("no access before payment", !(await isEnrolled(buyer.id, course.id)));

  // ------------------------------------------------------- amount mismatch
  const mismatch = await fulfilPaidOrder({
    razorpayOrderId: rzpOrderId, razorpayPaymentId: rzpPaymentId,
    amountReceivedInPaise: 100,
  });
  check("underpayment is refused", mismatch.status === "amount_mismatch", mismatch.status);
  check("underpayment grants no access", !(await isEnrolled(buyer.id, course.id)));

  // --------------------------------------------------------- correct payment
  const first = await fulfilPaidOrder({
    razorpayOrderId: rzpOrderId, razorpayPaymentId: rzpPaymentId,
    amountReceivedInPaise: 249900,
  });
  check("correct payment grants access", first.status === "granted", first.status);
  check("enrollment is live", await isEnrolled(buyer.id, course.id));

  // ----------------------------------------------------------- idempotency
  const replay = await fulfilPaidOrder({
    razorpayOrderId: rzpOrderId, razorpayPaymentId: rzpPaymentId,
    amountReceivedInPaise: 249900,
  });
  check("replayed webhook is a no-op", replay.status === "already_granted", replay.status);

  const enrollRows = await db.select().from(enrollments)
    .where(eq(enrollments.userId, buyer.id));
  check("exactly one enrollment after replay", enrollRows.length === 1, `${enrollRows.length} rows`);

  const orderRows = await db.select({ status: orders.status, paymentId: orders.razorpayPaymentId })
    .from(orders).where(eq(orders.id, order.id));
  check("order marked paid once", orderRows[0].status === "paid");
  check("payment id recorded", orderRows[0].paymentId === rzpPaymentId);

  // -------------------------------------------------------------- unknown
  const unknown = await fulfilPaidOrder({
    razorpayOrderId: "order_does_not_exist", razorpayPaymentId: "pay_x",
    amountReceivedInPaise: 100,
  });
  check("unknown order does not throw", unknown.status === "unknown_order", unknown.status);

  // --------------------------------------------------------------- refund
  const refund = await reverseRefundedOrder(rzpPaymentId);
  check("refund reverses the order", refund.status === "reversed", refund.status);
  check("refund revokes access", !(await isEnrolled(buyer.id, course.id)));

  // ------------------------------------------------------ signature check
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const body = JSON.stringify({ event: "payment.captured", payload: {} });
  const goodSig = crypto.createHmac("sha256", secret).update(body).digest("hex");
  check("valid signature accepted", verifyWebhookSignature(body, goodSig));
  check("tampered body rejected", !verifyWebhookSignature(body + " ", goodSig));
  check("bad signature rejected", !verifyWebhookSignature(body, "deadbeef"));
  check("missing signature rejected", !verifyWebhookSignature(body, null));

  // ------------------------------------------ deletion guard + cleanup
  // orders.courseId is RESTRICT, so a purchased course cannot be dropped.
  // That is deliberate — a paid order is a financial record.
  let restrictHeld = false;
  try {
    await db.delete(courses).where(eq(courses.id, course.id));
  } catch {
    restrictHeld = true;
  }
  check("course with orders cannot be deleted", restrictHeld);

  await db.delete(orders).where(eq(orders.id, order.id));
  await db.delete(courses).where(eq(courses.id, course.id));
  await db.delete(users).where(eq(users.id, buyer.id));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
