"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/backend/db";
import { courses, enrollments, orders, plans } from "@/backend/db/schema";
import { requireUser, isEnrolled } from "@/backend/lib/permissions";
import { createRazorpayOrder } from "@/backend/lib/razorpay";
import { validateCoupon } from "@/backend/services/coupons";
import { getActiveSubscription } from "@/backend/services/plans";
import type { CheckoutResult, CouponPreview } from "@/shared/checkout";

export type { CheckoutResult };

/**
 * Resolves what is being bought, from the database.
 *
 * Price always comes from here — never from the request. A price posted by the
 * browser is a request to be charged whatever the buyer likes.
 */
async function resolveItem(input: { type: "course" | "plan"; slug: string }) {
  if (input.type === "course") {
    const [course] = await db
      .select({
        id: courses.id,
        title: courses.title,
        priceInPaise: courses.priceInPaise,
        status: courses.status,
      })
      .from(courses)
      .where(eq(courses.slug, input.slug))
      .limit(1);

    if (!course || course.status !== "published") return null;
    return { id: course.id, title: course.title, priceInPaise: course.priceInPaise };
  }

  const [plan] = await db
    .select({
      id: plans.id,
      name: plans.name,
      priceInPaise: plans.priceInPaise,
      isActive: plans.isActive,
    })
    .from(plans)
    .where(eq(plans.slug, input.slug))
    .limit(1);

  if (!plan || !plan.isActive) return null;
  return { id: plan.id, title: plan.name, priceInPaise: plan.priceInPaise };
}

/**
 * Previews a coupon without creating an order.
 *
 * Used by the code box so someone sees the new total before committing. The
 * number shown here is advisory — `createCheckoutAction` re-validates from
 * scratch, because anything the browser was told can be tampered with before
 * it comes back.
 */
export async function previewCouponAction(input: {
  code: string;
  itemType: "course" | "plan";
  slug: string;
}): Promise<CouponPreview> {
  const user = await requireUser();

  const item = await resolveItem({ type: input.itemType, slug: input.slug });
  if (!item) return { valid: false, reason: "That item is not available." };

  const check = await validateCoupon({
    code: input.code,
    userId: user.id,
    amountInPaise: item.priceInPaise,
    scope: input.itemType,
    targetId: item.id,
  });

  if (!check.valid) return { valid: false, reason: check.reason };

  return {
    valid: true,
    code: check.code,
    discountInPaise: check.discountInPaise,
    finalAmountInPaise: check.finalAmountInPaise,
  };
}

/**
 * Creates a Razorpay order for a course or plan purchase.
 *
 * Note what this does NOT do: grant anything. It only reserves an order row.
 * Access is granted by the webhook at /api/webhooks/razorpay after Razorpay
 * confirms the money moved. The browser is never trusted to report its own
 * payment — that payload travels through the buyer's machine and can be forged
 * or replayed.
 */
export async function createCheckoutAction(input: {
  itemType: "course" | "plan";
  slug: string;
  couponCode?: string;
}): Promise<CheckoutResult> {
  const user = await requireUser();

  const item = await resolveItem({ type: input.itemType, slug: input.slug });
  if (!item) return { status: "error", message: "That item is not available." };

  if (input.itemType === "course" && (await isEnrolled(user.id, item.id))) {
    return { status: "already_owned" };
  }

  const listPriceInPaise = item.priceInPaise;
  let discountInPaise = 0;
  let couponId: string | null = null;

  // Re-validated here from scratch, ignoring whatever the preview returned.
  if (input.couponCode) {
    const check = await validateCoupon({
      code: input.couponCode,
      userId: user.id,
      amountInPaise: listPriceInPaise,
      scope: input.itemType,
      targetId: item.id,
    });

    if (!check.valid) return { status: "error", message: check.reason };

    discountInPaise = check.discountInPaise;
    couponId = check.couponId;
  }

  const amountInPaise = listPriceInPaise - discountInPaise;

  // A coupon that takes the total to zero still has to grant the thing, so
  // this path handles both free items and fully-discounted ones.
  if (amountInPaise <= 0) {
    if (input.itemType === "course") {
      await db
        .insert(enrollments)
        .values({ userId: user.id, courseId: item.id })
        .onConflictDoNothing();
    }
    return { status: "already_owned" };
  }

  // Reuse an outstanding unpaid order for the same item and price rather than
  // piling up abandoned rows every time someone opens and closes the modal.
  const [pending] = await db
    .select({
      id: orders.id,
      razorpayOrderId: orders.razorpayOrderId,
      amount: orders.amountInPaise,
    })
    .from(orders)
    .where(
      and(
        eq(orders.userId, user.id),
        eq(orders.status, "created"),
        input.itemType === "course"
          ? eq(orders.courseId, item.id)
          : eq(orders.planId, item.id),
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
      itemTitle: item.title,
      prefill: { name: user.name ?? "", email: user.email },
    };
  }

  try {
    const [orderRow] = await db
      .insert(orders)
      .values({
        userId: user.id,
        itemType: input.itemType,
        courseId: input.itemType === "course" ? item.id : null,
        planId: input.itemType === "plan" ? item.id : null,
        listPriceInPaise,
        discountInPaise,
        couponId,
        amountInPaise,
        currency: "INR",
        // Placeholder — replaced below with the real id from Razorpay.
        razorpayOrderId: `pending_${crypto.randomUUID()}`,
        status: "created",
      })
      .returning({ id: orders.id });

    const rzp = await createRazorpayOrder({
      amountInPaise,
      receipt: orderRow.id,
      notes: { orderId: orderRow.id, userId: user.id, itemType: input.itemType },
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
      itemTitle: item.title,
      prefill: { name: user.name ?? "", email: user.email },
    };
  } catch (err) {
    console.error("[checkout] Could not create Razorpay order", err);
    return { status: "error", message: "Could not start checkout. Please try again." };
  }
}

/**
 * Polled by the buy button while it waits for the webhook to land.
 *
 * Reports entitlement; never creates it.
 */
export async function pollOwnershipAction(input: {
  itemType: "course" | "plan";
  slug: string;
}): Promise<{ owned: boolean }> {
  const user = await requireUser();

  if (input.itemType === "plan") {
    const sub = await getActiveSubscription(user.id);
    return { owned: sub?.planSlug === input.slug };
  }

  const [course] = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.slug, input.slug))
    .limit(1);

  if (!course) return { owned: false };
  return { owned: await isEnrolled(user.id, course.id) };
}
