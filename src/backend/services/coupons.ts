import "server-only";

import { and, eq, sql } from "drizzle-orm";

import { db } from "@/backend/db";
import { coupons, couponRedemptions } from "@/backend/db/schema";

/**
 * Coupon validation.
 *
 * This is the only place a discount is ever calculated. Client-side
 * discounting is a free-money bug: the browser would be telling the server
 * what to charge. The Server Action that creates an order calls
 * `validateCoupon` and uses the number it returns — nothing else.
 */

export type CouponCheck =
  | {
      valid: true;
      couponId: string;
      code: string;
      discountInPaise: number;
      finalAmountInPaise: number;
    }
  | { valid: false; reason: string };

export function normalizeCouponCode(input: string): string {
  return input.trim().toUpperCase().replace(/[^0-9A-Z_-]/g, "").slice(0, 32);
}

/**
 * Computes the discount for one code against one order.
 *
 * Percentages are basis points and the arithmetic stays in integers — paise in,
 * paise out. Doing this in rupees with floats is how a ₹2,499 order at 15% off
 * ends up a paisa away from what the gateway was told to charge.
 */
export async function validateCoupon(params: {
  code: string;
  userId: string;
  amountInPaise: number;
  scope: "course" | "plan";
  targetId: string;
}): Promise<CouponCheck> {
  const code = normalizeCouponCode(params.code);
  if (!code) return { valid: false, reason: "Enter a coupon code." };

  const [coupon] = await db
    .select()
    .from(coupons)
    .where(eq(coupons.code, code))
    .limit(1);

  // Deliberately the same message for "no such code" and "expired": telling
  // people which is which turns this box into a code-guessing oracle.
  const invalid = { valid: false as const, reason: "That code is not valid." };

  if (!coupon || !coupon.isActive) return invalid;

  const now = new Date();
  if (coupon.validFrom && coupon.validFrom > now) return invalid;
  if (coupon.validUntil && coupon.validUntil < now) {
    return { valid: false, reason: "That code has expired." };
  }

  if (coupon.maxRedemptions !== null && coupon.usedCount >= coupon.maxRedemptions) {
    return { valid: false, reason: "That code has been fully redeemed." };
  }

  if (coupon.scope !== "all") {
    if (coupon.scope !== params.scope || coupon.targetId !== params.targetId) {
      return { valid: false, reason: "That code does not apply to this item." };
    }
  }

  if (params.amountInPaise < coupon.minOrderInPaise) {
    return {
      valid: false,
      reason: `This code needs a minimum order of ₹${Math.ceil(coupon.minOrderInPaise / 100)}.`,
    };
  }

  // Per-user limit is counted from actual redemptions, not from a counter —
  // a counter cannot answer "who used it".
  const [{ used }] = await db
    .select({ used: sql<number>`cast(count(*) as int)` })
    .from(couponRedemptions)
    .where(
      and(eq(couponRedemptions.couponId, coupon.id), eq(couponRedemptions.userId, params.userId)),
    );

  if (used >= coupon.perUserLimit) {
    return { valid: false, reason: "You have already used this code." };
  }

  let discountInPaise =
    coupon.discountType === "percent"
      ? Math.floor((params.amountInPaise * coupon.value) / 10_000)
      : coupon.value;

  if (coupon.maxDiscountInPaise !== null) {
    discountInPaise = Math.min(discountInPaise, coupon.maxDiscountInPaise);
  }

  // Never discount below zero, and never produce a free order from a flat code
  // that exceeds the price — that would hand out a paid course for nothing.
  discountInPaise = Math.max(0, Math.min(discountInPaise, params.amountInPaise));

  if (discountInPaise <= 0) {
    return { valid: false, reason: "That code gives no discount on this item." };
  }

  return {
    valid: true,
    couponId: coupon.id,
    code: coupon.code,
    discountInPaise,
    finalAmountInPaise: params.amountInPaise - discountInPaise,
  };
}

/** Codes a member can see in the "Exclusive Coupons" panel. */
export async function listVisibleCoupons(userId: string) {
  const now = new Date();

  const rows = await db
    .select({
      id: coupons.id,
      code: coupons.code,
      description: coupons.description,
      discountType: coupons.discountType,
      value: coupons.value,
      maxDiscountInPaise: coupons.maxDiscountInPaise,
      minOrderInPaise: coupons.minOrderInPaise,
      validUntil: coupons.validUntil,
      perUserLimit: coupons.perUserLimit,
      usedByMe: sql<number>`cast((
        select count(*) from ${couponRedemptions}
        where ${couponRedemptions.couponId} = ${coupons.id}
          and ${couponRedemptions.userId} = ${userId}
      ) as int)`,
    })
    .from(coupons)
    .where(
      and(
        eq(coupons.isActive, true),
        eq(coupons.scope, "all"),
        sql`(${coupons.validUntil} is null or ${coupons.validUntil} > ${now})`,
        sql`(${coupons.maxRedemptions} is null or ${coupons.usedCount} < ${coupons.maxRedemptions})`,
      ),
    )
    .orderBy(coupons.createdAt);

  return rows.map((r) => ({ ...r, isUsedUp: r.usedByMe >= r.perUserLimit }));
}

export async function listCouponsForAdmin() {
  return db
    .select({
      id: coupons.id,
      code: coupons.code,
      description: coupons.description,
      discountType: coupons.discountType,
      value: coupons.value,
      scope: coupons.scope,
      usedCount: coupons.usedCount,
      maxRedemptions: coupons.maxRedemptions,
      validUntil: coupons.validUntil,
      isActive: coupons.isActive,
      createdAt: coupons.createdAt,
    })
    .from(coupons)
    .orderBy(coupons.createdAt);
}
