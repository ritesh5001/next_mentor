import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/backend/db";
import { courses, enrollments, orders, users } from "@/backend/db/schema";

/**
 * Order fulfilment.
 *
 * Everything here is written to be safe to run twice. Razorpay retries a
 * webhook until it gets a 2xx, and it does not promise to stop after the first
 * success — so "did this already happen?" is answered by database constraints,
 * not by an in-memory guard or an `if` that races.
 */

export type FulfilResult =
  | { status: "granted"; orderId: string; courseId: string; userId: string }
  | { status: "already_granted"; orderId: string }
  | { status: "unknown_order" }
  | { status: "amount_mismatch"; expected: number; received: number };

/**
 * Marks an order paid and grants the enrollment, atomically.
 *
 * Called only from the Razorpay webhook after signature verification. If the
 * enrollment insert fails the order must not be left as `paid`, or the customer
 * has a charge and no course — so both writes share one transaction.
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
        courseId: orders.courseId,
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

    // onConflictDoNothing against the UNIQUE(userId, courseId) index: if the
    // user somehow already has this course, that is success, not an error.
    await tx
      .insert(enrollments)
      .values({ userId: order.userId, courseId: order.courseId, orderId: order.id })
      .onConflictDoNothing();

    return {
      status: "granted" as const,
      orderId: order.id,
      courseId: order.courseId,
      userId: order.userId,
    };
  });
}

export async function markOrderFailed(razorpayOrderId: string, reason: string) {
  await db
    .update(orders)
    .set({ status: "failed", failureReason: reason.slice(0, 500), updatedAt: new Date() })
    .where(and(eq(orders.razorpayOrderId, razorpayOrderId), eq(orders.status, "created")));
}

/**
 * Reverses a refunded order and revokes access.
 *
 * Phase 3 hooks commission reversal in here — which is why the maturity window
 * on a commission is longer than the refund window.
 */
export async function reverseRefundedOrder(razorpayPaymentId: string) {
  return db.transaction(async (tx) => {
    const [order] = await tx
      .select({ id: orders.id, userId: orders.userId, courseId: orders.courseId })
      .from(orders)
      .where(eq(orders.razorpayPaymentId, razorpayPaymentId))
      .limit(1)
      .for("update");

    if (!order) return { status: "unknown_order" as const };

    await tx
      .update(orders)
      .set({ status: "refunded", refundedAt: new Date(), updatedAt: new Date() })
      .where(eq(orders.id, order.id));

    await tx
      .update(enrollments)
      .set({ revokedAt: new Date() })
      .where(
        and(eq(enrollments.userId, order.userId), eq(enrollments.courseId, order.courseId)),
      );

    return { status: "reversed" as const, orderId: order.id };
  });
}

/** Everything the receipt email needs, in one query. */
export async function getOrderReceiptData(orderId: string) {
  const [row] = await db
    .select({
      orderId: orders.id,
      amountInPaise: orders.amountInPaise,
      email: users.email,
      name: users.name,
      courseTitle: courses.title,
      courseSlug: courses.slug,
    })
    .from(orders)
    .innerJoin(users, eq(users.id, orders.userId))
    .innerJoin(courses, eq(courses.id, orders.courseId))
    .where(eq(orders.id, orderId))
    .limit(1);

  return row ?? null;
}

export async function getUserOrders(userId: string) {
  return db
    .select({
      id: orders.id,
      amountInPaise: orders.amountInPaise,
      status: orders.status,
      createdAt: orders.createdAt,
      paidAt: orders.paidAt,
      courseTitle: courses.title,
      courseSlug: courses.slug,
    })
    .from(orders)
    .innerJoin(courses, eq(courses.id, orders.courseId))
    .where(eq(orders.userId, userId))
    .orderBy(orders.createdAt);
}
