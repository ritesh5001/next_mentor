import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { awardCommission, reverseCommissionsForOrder } from "@/lib/referral";
import {
  courses,
  coupons,
  couponRedemptions,
  enrollments,
  orders,
  plans,
  subscriptions,
  users,
} from "@/db/schema";

/**
 * Order fulfilment.
 *
 * Everything here is written to be safe to run twice. Razorpay retries a
 * webhook until it gets a 2xx, and it does not promise to stop after the first
 * success — so "did this already happen?" is answered by database constraints,
 * not by an in-memory guard or an `if` that races.
 */

export type FulfilResult =
  | {
      status: "granted";
      orderId: string;
      userId: string;
      itemType: "course" | "plan";
      /** Non-null when this sale generated affiliate commission. */
      commissionInPaise: number | null;
    }
  | { status: "already_granted"; orderId: string }
  | { status: "unknown_order" }
  | { status: "amount_mismatch"; expected: number; received: number };

/**
 * Marks an order paid and grants what it bought, atomically.
 *
 * Called only from the Razorpay webhook after signature verification. If the
 * grant fails the order must not be left as `paid`, or the customer has a
 * charge and nothing to show for it — so every write shares one transaction.
 */
export async function fulfilPaidOrder(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amountReceivedInPaise: number;
}): Promise<FulfilResult> {
  return db.transaction(async (tx) => {
    const [order] = await tx
      .select({
        id: orders.id,
        userId: orders.userId,
        itemType: orders.itemType,
        courseId: orders.courseId,
        planId: orders.planId,
        couponId: orders.couponId,
        discountInPaise: orders.discountInPaise,
        amountInPaise: orders.amountInPaise,
        status: orders.status,
      })
      .from(orders)
      .where(eq(orders.razorpayOrderId, params.razorpayOrderId))
      .limit(1)
      // Lock the row for the duration of the transaction. Two concurrent
      // deliveries of the same webhook would otherwise both read `created`
      // and both try to grant.
      .for("update");

    if (!order) return { status: "unknown_order" as const };

    if (order.status === "paid") {
      return { status: "already_granted" as const, orderId: order.id };
    }

    // Never trust the amount in the webhook payload over our own record. If
    // they disagree, something is wrong — refuse rather than grant access for
    // whatever was actually paid.
    if (order.amountInPaise !== params.amountReceivedInPaise) {
      return {
        status: "amount_mismatch" as const,
        expected: order.amountInPaise,
        received: params.amountReceivedInPaise,
      };
    }

    await tx
      .update(orders)
      .set({
        status: "paid",
        razorpayPaymentId: params.razorpayPaymentId,
        paidAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(orders.id, order.id));

    if (order.itemType === "course" && order.courseId) {
      // onConflictDoNothing against UNIQUE(userId, courseId): if the user
      // somehow already has this course, that is success, not an error.
      await tx
        .insert(enrollments)
        .values({ userId: order.userId, courseId: order.courseId, orderId: order.id })
        .onConflictDoNothing();
    } else if (order.itemType === "plan" && order.planId) {
      await grantSubscription(tx, {
        userId: order.userId,
        planId: order.planId,
      });
    }

    // A coupon is only truly redeemed once the money arrives. Counting it at
    // order-creation time would let someone burn a limited code by opening
    // checkout and walking away.
    if (order.couponId) {
      await tx
        .update(coupons)
        .set({ usedCount: sql`${coupons.usedCount} + 1` })
        .where(eq(coupons.id, order.couponId));

      await tx.insert(couponRedemptions).values({
        couponId: order.couponId,
        userId: order.userId,
        orderId: order.id,
        discountInPaise: order.discountInPaise,
      });
    }

    // Commission runs inside this same transaction. If it were awarded
    // afterwards, a crash in between would leave a paid order with no
    // commission and no record that one was owed.
    const commission = await awardCommission(tx, {
      orderId: order.id,
      buyerId: order.userId,
      // The amount actually charged, never the list price. Paying a percentage
      // of a price nobody paid comes straight out of the platform's margin.
      netAmountInPaise: order.amountInPaise,
    });

    return {
      status: "granted" as const,
      orderId: order.id,
      userId: order.userId,
      itemType: order.itemType,
      commissionInPaise: commission.status === "created" ? commission.amountInPaise : null,
    };
  });
}

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

/**
 * Starts or extends a membership.
 *
 * Renewing before expiry extends from the existing end date rather than from
 * today, so paying early never costs the member days they already own.
 */
async function grantSubscription(tx: Tx, params: { userId: string; planId: string }) {
  const [plan] = await tx
    .select({ durationDays: plans.durationDays })
    .from(plans)
    .where(eq(plans.id, params.planId))
    .limit(1);

  if (!plan) return;

  const [existing] = await tx
    .select({ id: subscriptions.id, expiresAt: subscriptions.expiresAt })
    .from(subscriptions)
    .where(and(eq(subscriptions.userId, params.userId), eq(subscriptions.status, "active")))
    .limit(1)
    .for("update");

  const now = new Date();
  const base =
    existing?.expiresAt && existing.expiresAt > now ? existing.expiresAt : now;

  const expiresAt = plan.durationDays
    ? new Date(base.getTime() + plan.durationDays * 24 * 60 * 60 * 1000)
    : null; // lifetime

  if (existing) {
    await tx
      .update(subscriptions)
      .set({ planId: params.planId, status: "active", expiresAt, updatedAt: now })
      .where(eq(subscriptions.id, existing.id));
  } else {
    await tx.insert(subscriptions).values({
      userId: params.userId,
      planId: params.planId,
      status: "active",
      startsAt: now,
      expiresAt,
    });
  }
}

export async function markOrderFailed(razorpayOrderId: string, reason: string) {
  await db
    .update(orders)
    .set({ status: "failed", failureReason: reason.slice(0, 500), updatedAt: new Date() })
    .where(and(eq(orders.razorpayOrderId, razorpayOrderId), eq(orders.status, "created")));
}

/**
 * Reverses a refunded order and revokes what it granted.
 *
 * Phase 3 hooks commission reversal in here — which is why the maturity window
 * on a commission is longer than the refund window.
 */
export async function reverseRefundedOrder(razorpayPaymentId: string) {
  return db.transaction(async (tx) => {
    const [order] = await tx
      .select({
        id: orders.id,
        userId: orders.userId,
        itemType: orders.itemType,
        courseId: orders.courseId,
        planId: orders.planId,
      })
      .from(orders)
      .where(eq(orders.razorpayPaymentId, razorpayPaymentId))
      .limit(1)
      .for("update");

    if (!order) return { status: "unknown_order" as const };

    await tx
      .update(orders)
      .set({ status: "refunded", refundedAt: new Date(), updatedAt: new Date() })
      .where(eq(orders.id, order.id));

    // Claw back any commission this sale generated. This is why the maturity
    // window exists — inside it the money is still in `pending` and can simply
    // be taken back.
    await reverseCommissionsForOrder(tx, order.id);

    if (order.itemType === "course" && order.courseId) {
      await tx
        .update(enrollments)
        .set({ revokedAt: new Date() })
        .where(
          and(eq(enrollments.userId, order.userId), eq(enrollments.courseId, order.courseId)),
        );
    } else if (order.itemType === "plan" && order.planId) {
      await tx
        .update(subscriptions)
        .set({ status: "cancelled", cancelledAt: new Date(), updatedAt: new Date() })
        .where(
          and(
            eq(subscriptions.userId, order.userId),
            eq(subscriptions.planId, order.planId),
            eq(subscriptions.status, "active"),
          ),
        );
    }

    return { status: "reversed" as const, orderId: order.id };
  });
}

/** Everything the receipt email needs, in one query. */
export async function getOrderReceiptData(orderId: string) {
  const [row] = await db
    .select({
      orderId: orders.id,
      amountInPaise: orders.amountInPaise,
      itemType: orders.itemType,
      email: users.email,
      name: users.name,
      courseTitle: courses.title,
      courseSlug: courses.slug,
      planName: plans.name,
    })
    .from(orders)
    .innerJoin(users, eq(users.id, orders.userId))
    .leftJoin(courses, eq(courses.id, orders.courseId))
    .leftJoin(plans, eq(plans.id, orders.planId))
    .where(eq(orders.id, orderId))
    .limit(1);

  return row ?? null;
}

export async function getUserOrders(userId: string) {
  return db
    .select({
      id: orders.id,
      itemType: orders.itemType,
      amountInPaise: orders.amountInPaise,
      discountInPaise: orders.discountInPaise,
      status: orders.status,
      createdAt: orders.createdAt,
      paidAt: orders.paidAt,
      courseTitle: courses.title,
      courseSlug: courses.slug,
      planName: plans.name,
    })
    .from(orders)
    .leftJoin(courses, eq(courses.id, orders.courseId))
    .leftJoin(plans, eq(plans.id, orders.planId))
    .where(eq(orders.userId, userId))
    .orderBy(orders.createdAt);
}
