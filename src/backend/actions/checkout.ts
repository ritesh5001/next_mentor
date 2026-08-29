"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/backend/db";
import { courses, enrollments, orders } from "@/backend/db/schema";
import { requireUser, isEnrolled } from "@/backend/lib/permissions";
import { createRazorpayOrder } from "@/backend/lib/razorpay";
import type { CheckoutResult } from "@/shared/checkout";

export type { CheckoutResult };

/**
 * Creates a Razorpay order for a course purchase.
 *
 * Note what this does NOT do: grant anything. It only reserves an order row.
 * Access is granted by the webhook at /api/webhooks/razorpay after Razorpay
 * confirms the money moved. The browser is never trusted to report its own
 * payment — that payload travels through the buyer's machine and can be forged
 * or replayed.
 */
export async function createCheckoutAction(courseSlug: string): Promise<CheckoutResult> {
  const user = await requireUser();

  const [course] = await db
    .select({
      id: courses.id,
      title: courses.title,
      priceInPaise: courses.priceInPaise,
      status: courses.status,
    })
    .from(courses)
    .where(eq(courses.slug, courseSlug))
    .limit(1);

  if (!course || course.status !== "published") {
    return { status: "error", message: "That course is not available." };
  }

  if (await isEnrolled(user.id, course.id)) {
    return { status: "already_enrolled" };
  }

  // The price is read from the database, never from the client. A price posted
  // by the browser is a request to be charged whatever the buyer likes.
  const amountInPaise = course.priceInPaise;

  if (amountInPaise <= 0) {
    // Free course: grant immediately, no payment gateway involved.
    await db
      .insert(enrollments)
      .values({ userId: user.id, courseId: course.id })
      .onConflictDoNothing();
    return { status: "already_enrolled" };
  }

  // Reuse an outstanding unpaid order for the same course rather than piling up
  // abandoned rows every time someone opens and closes the checkout modal.
  const [pending] = await db
    .select({ id: orders.id, razorpayOrderId: orders.razorpayOrderId, amount: orders.amountInPaise })
    .from(orders)
    .where(
      and(
        eq(orders.userId, user.id),
        eq(orders.courseId, course.id),
        eq(orders.status, "created"),
      ),
    )
    .limit(1);

  if (pending && pending.amount === amountInPaise) {
    return {
      status: "ok",
      razorpayOrderId: pending.razorpayOrderId,
      amountInPaise,
      currency: "INR",
      orderId: pending.id,
      courseTitle: course.title,
      prefill: { name: user.name ?? "", email: user.email },
    };
  }

  try {
    const [orderRow] = await db
      .insert(orders)
      .values({
        userId: user.id,
        courseId: course.id,
        listPriceInPaise: course.priceInPaise,
        discountInPaise: 0, // coupons land in Phase 2
        amountInPaise,
        currency: "INR",
        // Placeholder — replaced below once Razorpay hands back the real id.
        razorpayOrderId: `pending_${crypto.randomUUID()}`,
        status: "created",
      })
      .returning({ id: orders.id });

    const rzp = await createRazorpayOrder({
      amountInPaise,
      receipt: orderRow.id,
      notes: { orderId: orderRow.id, userId: user.id, courseId: course.id },
    });

    await db
      .update(orders)
      .set({ razorpayOrderId: rzp.id, updatedAt: new Date() })
      .where(eq(orders.id, orderRow.id));

    return {
      status: "ok",
      razorpayOrderId: rzp.id,
      amountInPaise,
      currency: "INR",
      orderId: orderRow.id,
      courseTitle: course.title,
      prefill: { name: user.name ?? "", email: user.email },
    };
  } catch (err) {
    console.error("[checkout] Could not create Razorpay order", err);
    return { status: "error", message: "Could not start checkout. Please try again." };
  }
}

/**
 * Polled by the success screen while it waits for the webhook to land.
 *
 * The browser calls this to find out when access is real. It reports enrollment
 * state; it never creates it.
 */
export async function pollEnrollmentAction(
  courseSlug: string,
): Promise<{ enrolled: boolean }> {
  const user = await requireUser();

  const [course] = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.slug, courseSlug))
    .limit(1);

  if (!course) return { enrolled: false };
  return { enrolled: await isEnrolled(user.id, course.id) };
}
