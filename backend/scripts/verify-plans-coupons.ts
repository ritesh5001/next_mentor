/**
 * Smoke test for Phase 2: coupon arithmetic, plan grants, renewals.
 *
 *   pnpm verify:phase2
 *
 * Discount maths is asserted exactly, in paise. This is the code path where a
 * rounding slip becomes a real difference between what the gateway charged and
 * what we recorded.
 */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  users, courses, plans, subscriptions, coupons, couponRedemptions, orders, enrollments,
} from "@/db/schema";
import { validateCoupon } from "@/services/coupons";
import { fulfilPaidOrder, reverseRefundedOrder } from "@/services/orders";
import { getActiveSubscription, getCommissionRateBps } from "@/services/plans";
import { generateUniqueReferralCode } from "@/lib/referral-code";
import { uniqueSlug } from "@/services/courses";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

async function main() {
  const stamp = Date.now();

  // ---------------------------------------------------------------- fixtures
  const [buyer] = await db.insert(users).values({
    name: "Buyer", email: `p2buyer${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(), emailVerified: new Date(),
  }).returning({ id: users.id });

  const [course] = await db.insert(courses).values({
    slug: await uniqueSlug(`P2 Course ${stamp}`), title: "P2 Course",
    priceInPaise: 249900, status: "published", publishedAt: new Date(),
  }).returning({ id: courses.id });

  const [plan] = await db.insert(plans).values({
    slug: `p2-pro-${stamp}`, name: "P2 Pro", priceInPaise: 999900,
    durationDays: 30, commissionRateBps: 1500, isActive: true,
  }).returning({ id: plans.id });

  // ------------------------------------------------------ coupon arithmetic
  const [pct] = await db.insert(coupons).values({
    code: `P2PCT${stamp}`, discountType: "percent", value: 1500, // 15%
    scope: "all", perUserLimit: 1,
  }).returning({ id: coupons.id });

  const r1 = await validateCoupon({
    code: `P2PCT${stamp}`, userId: buyer.id,
    amountInPaise: 249900, scope: "course", targetId: course.id,
  });
  // 249900 * 1500 / 10000 = 37485 exactly
  check("15% of ₹2499 = ₹374.85", r1.valid && r1.discountInPaise === 37485,
    r1.valid ? String(r1.discountInPaise) : r1.reason);
  check("final = list − discount", r1.valid && r1.finalAmountInPaise === 249900 - 37485);

  // capped percentage
  const [capped] = await db.insert(coupons).values({
    code: `P2CAP${stamp}`, discountType: "percent", value: 5000, // 50%
    maxDiscountInPaise: 50000, scope: "all",
  }).returning({ id: coupons.id });

  const r2 = await validateCoupon({
    code: `P2CAP${stamp}`, userId: buyer.id,
    amountInPaise: 249900, scope: "course", targetId: course.id,
  });
  check("cap beats percentage", r2.valid && r2.discountInPaise === 50000,
    r2.valid ? String(r2.discountInPaise) : r2.reason);

  // flat discount larger than the price must not go negative
  await db.insert(coupons).values({
    code: `P2BIG${stamp}`, discountType: "flat", value: 999900, scope: "all",
  });
  const r3 = await validateCoupon({
    code: `P2BIG${stamp}`, userId: buyer.id,
    amountInPaise: 249900, scope: "course", targetId: course.id,
  });
  check("oversized flat clamps to price", r3.valid && r3.discountInPaise === 249900);
  check("never charges below zero", r3.valid && r3.finalAmountInPaise === 0);

  // minimum order
  await db.insert(coupons).values({
    code: `P2MIN${stamp}`, discountType: "flat", value: 10000,
    minOrderInPaise: 500000, scope: "all",
  });
  const r4 = await validateCoupon({
    code: `P2MIN${stamp}`, userId: buyer.id,
    amountInPaise: 249900, scope: "course", targetId: course.id,
  });
  check("minimum order enforced", !r4.valid);

  // scope mismatch
  await db.insert(coupons).values({
    code: `P2SCOPE${stamp}`, discountType: "flat", value: 10000,
    scope: "plan", targetId: plan.id,
  });
  const r5 = await validateCoupon({
    code: `P2SCOPE${stamp}`, userId: buyer.id,
    amountInPaise: 249900, scope: "course", targetId: course.id,
  });
  check("plan-only code rejected on a course", !r5.valid);

  // expired
  await db.insert(coupons).values({
    code: `P2EXP${stamp}`, discountType: "flat", value: 10000, scope: "all",
    validUntil: new Date(Date.now() - 86400000),
  });
  const r6 = await validateCoupon({
    code: `P2EXP${stamp}`, userId: buyer.id,
    amountInPaise: 249900, scope: "course", targetId: course.id,
  });
  check("expired code rejected", !r6.valid);

  // unknown code
  const r7 = await validateCoupon({
    code: "DOES_NOT_EXIST", userId: buyer.id,
    amountInPaise: 249900, scope: "course", targetId: course.id,
  });
  check("unknown code rejected", !r7.valid);

  // ------------------------------------ coupon counted only once money lands
  const rzpOrder = `order_p2_${stamp}`;
  await db.insert(orders).values({
    userId: buyer.id, itemType: "course", courseId: course.id,
    listPriceInPaise: 249900, discountInPaise: 37485, couponId: pct.id,
    amountInPaise: 212415, razorpayOrderId: rzpOrder, status: "created",
  });

  const [beforePay] = await db.select({ used: coupons.usedCount })
    .from(coupons).where(eq(coupons.id, pct.id));
  check("unpaid order does not burn the coupon", beforePay.used === 0, String(beforePay.used));

  const fulfil = await fulfilPaidOrder({
    razorpayOrderId: rzpOrder, razorpayPaymentId: `pay_p2_${stamp}`,
    amountReceivedInPaise: 212415,
  });
  check("discounted order fulfils", fulfil.status === "granted", fulfil.status);

  const [afterPay] = await db.select({ used: coupons.usedCount })
    .from(coupons).where(eq(coupons.id, pct.id));
  check("payment increments usedCount", afterPay.used === 1, String(afterPay.used));

  const redemptions = await db.select().from(couponRedemptions)
    .where(eq(couponRedemptions.couponId, pct.id));
  check("redemption row recorded", redemptions.length === 1);

  // per-user limit now exhausted
  const r8 = await validateCoupon({
    code: `P2PCT${stamp}`, userId: buyer.id,
    amountInPaise: 249900, scope: "course", targetId: course.id,
  });
  check("per-user limit blocks reuse", !r8.valid);

  // replay must not double-count the coupon
  await fulfilPaidOrder({
    razorpayOrderId: rzpOrder, razorpayPaymentId: `pay_p2_${stamp}`,
    amountReceivedInPaise: 212415,
  });
  const [afterReplay] = await db.select({ used: coupons.usedCount })
    .from(coupons).where(eq(coupons.id, pct.id));
  check("replayed webhook does not double-count", afterReplay.used === 1, String(afterReplay.used));

  // ---------------------------------------------------------- plan purchase
  const planOrderId = `order_p2plan_${stamp}`;
  await db.insert(orders).values({
    userId: buyer.id, itemType: "plan", planId: plan.id,
    listPriceInPaise: 999900, amountInPaise: 999900,
    razorpayOrderId: planOrderId, status: "created",
  });

  const planFulfil = await fulfilPaidOrder({
    razorpayOrderId: planOrderId, razorpayPaymentId: `pay_p2plan_${stamp}`,
    amountReceivedInPaise: 999900,
  });
  check("plan order fulfils", planFulfil.status === "granted", planFulfil.status);

  const sub = await getActiveSubscription(buyer.id);
  check("subscription created", sub?.planId === plan.id);
  check("commission rate comes from the plan", (await getCommissionRateBps(buyer.id)) === 1500);

  const firstExpiry = sub?.expiresAt?.getTime() ?? 0;
  check("30-day plan expires in ~30 days",
    Math.abs(firstExpiry - (Date.now() + 30 * 86400000)) < 60000);

  // renewal extends from the existing end date, not from today
  const renewalOrderId = `order_p2renew_${stamp}`;
  await db.insert(orders).values({
    userId: buyer.id, itemType: "plan", planId: plan.id,
    listPriceInPaise: 999900, amountInPaise: 999900,
    razorpayOrderId: renewalOrderId, status: "created",
  });
  await fulfilPaidOrder({
    razorpayOrderId: renewalOrderId, razorpayPaymentId: `pay_p2renew_${stamp}`,
    amountReceivedInPaise: 999900,
  });

  const renewed = await getActiveSubscription(buyer.id);
  const renewedExpiry = renewed?.expiresAt?.getTime() ?? 0;
  check("early renewal stacks, not resets",
    Math.abs(renewedExpiry - (firstExpiry + 30 * 86400000)) < 60000,
    `${Math.round((renewedExpiry - firstExpiry) / 86400000)} days added`);

  const subCount = await db.select().from(subscriptions)
    .where(eq(subscriptions.userId, buyer.id));
  check("renewal reuses one subscription row", subCount.length === 1, `${subCount.length} rows`);

  // refunding a plan cancels the membership
  const rev = await reverseRefundedOrder(`pay_p2renew_${stamp}`);
  check("plan refund reverses", rev.status === "reversed", rev.status);
  check("refund cancels the membership", (await getActiveSubscription(buyer.id)) === null);

  // -------------------------------------------------------------- CHECK constraint
  let checkHeld = false;
  try {
    await db.insert(orders).values({
      userId: buyer.id, itemType: "course", courseId: course.id, planId: plan.id,
      listPriceInPaise: 1, amountInPaise: 1,
      razorpayOrderId: `order_bad_${stamp}`, status: "created",
    });
  } catch { checkHeld = true; }
  check("order cannot target both a course and a plan", checkHeld);

  // -------------------------------------------------------------- cleanup
  await db.delete(couponRedemptions).where(eq(couponRedemptions.userId, buyer.id));
  await db.delete(orders).where(eq(orders.userId, buyer.id));
  await db.delete(enrollments).where(eq(enrollments.userId, buyer.id));
  await db.delete(subscriptions).where(eq(subscriptions.userId, buyer.id));
  await db.delete(coupons).where(eq(coupons.id, pct.id));
  await db.delete(coupons).where(eq(coupons.id, capped.id));
  for (const c of [`P2BIG${stamp}`, `P2MIN${stamp}`, `P2SCOPE${stamp}`, `P2EXP${stamp}`]) {
    await db.delete(coupons).where(eq(coupons.code, c));
  }
  await db.delete(plans).where(eq(plans.id, plan.id));
  await db.delete(courses).where(eq(courses.id, course.id));
  await db.delete(users).where(eq(users.id, buyer.id));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
