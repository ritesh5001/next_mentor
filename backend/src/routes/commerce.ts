import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { createCheckoutSchema, previewCouponSchema } from "@nextmentor/shared";

import { db } from "@/db";
import { courses, enrollments, orders, plans } from "@/db/schema";
import { createRazorpayOrder } from "@/lib/razorpay";
import { validateCoupon, listVisibleCoupons } from "@/services/coupons";
import {
  getActivePlans,
  getActiveSubscription,
  quoteForPlan,
  UPGRADE_WINDOW_HOURS,
} from "@/services/plans";
import { getUserOrders } from "@/services/orders";
import { isEnrolled } from "@/lib/permissions";
import { requireAccount, requireUser, currentUser } from "@/middleware/auth";
import { ok, fail, parseBody } from "@/middleware/respond";

export const commerceRoutes = new Hono();

/** Resolves what is being bought — price always from the database. */
async function resolveItem(type: "course" | "plan", slug: string) {
  if (type === "course") {
    const [course] = await db
      .select({
        id: courses.id,
        title: courses.title,
        priceInPaise: courses.priceInPaise,
        status: courses.status,
      })
      .from(courses)
      .where(eq(courses.slug, slug))
      .limit(1);

    if (!course || course.status !== "published") return null;
    return {
      id: course.id,
      title: course.title,
      priceInPaise: course.priceInPaise,
      tier: undefined as number | undefined,
    };
  }

  const [plan] = await db
    .select({
      id: plans.id,
      name: plans.name,
      priceInPaise: plans.priceInPaise,
      tier: plans.tier,
      isActive: plans.isActive,
    })
    .from(plans)
    .where(eq(plans.slug, slug))
    .limit(1);

  if (!plan || !plan.isActive) return null;
  return { id: plan.id, title: plan.name, priceInPaise: plan.priceInPaise, tier: plan.tier };
}

commerceRoutes.post("/coupons/preview", requireAccount, async (c) => {
  const body = await parseBody(c, previewCouponSchema);
  if (!body.ok) return body.response;

  const user = currentUser(c);
  const item = await resolveItem(body.data.itemType, body.data.slug);
  if (!item) return fail(c, "That item is not available.", "not_found");

  const check = await validateCoupon({
    code: body.data.code,
    userId: user.id,
    amountInPaise: item.priceInPaise,
    scope: body.data.itemType,
    targetId: item.id,
  });

  if (!check.valid) return ok(c, { valid: false as const, reason: check.reason });

  return ok(c, {
    valid: true as const,
    code: check.code,
    discountInPaise: check.discountInPaise,
    finalAmountInPaise: check.finalAmountInPaise,
  });
});

/**
 * Creates a Razorpay order.
 *
 * Grants nothing — the webhook does that, after Razorpay confirms the money
 * moved. The browser is never trusted to report its own payment.
 */
commerceRoutes.post("/checkout", requireAccount, async (c) => {
  const body = await parseBody(c, createCheckoutSchema);
  if (!body.ok) return body.response;

  const user = currentUser(c);
  const { itemType, slug, couponCode } = body.data;

  // Membership comes first: without an active plan the only thing a student
  // can buy is a plan. Single courses are an add-on for members.
  if (itemType === "course" && user.role !== "admin" && !(await getActiveSubscription(user.id))) {
    return fail(c, "Choose a plan first. Single courses are available to members.", "forbidden");
  }

  const item = await resolveItem(itemType, slug);
  if (!item) return fail(c, "That item is not available.", "not_found");

  if (itemType === "course" && (await isEnrolled(user.id, item.id))) {
    return ok(c, { status: "already_owned" as const });
  }

  // A member moving up a pack pays the upgrade price, which within the
  // 72-hour window is only the difference (services/plans#quoteForPlan).
  let listPriceInPaise = item.priceInPaise;
  if (itemType === "plan") {
    const quote = await quoteForPlan(user.id, {
      id: item.id,
      tier: item.tier ?? 1,
      priceInPaise: item.priceInPaise,
      name: item.title,
    });
    if (quote.kind === "blocked") return fail(c, quote.reason, "validation");
    listPriceInPaise = quote.amountInPaise;
  }

  let discountInPaise = 0;
  let couponId: string | null = null;

  // Re-validated here from scratch, ignoring whatever the preview returned.
  if (couponCode) {
    const check = await validateCoupon({
      code: couponCode,
      userId: user.id,
      amountInPaise: listPriceInPaise,
      scope: itemType,
      targetId: item.id,
    });
    if (!check.valid) return fail(c, check.reason, "validation");
    discountInPaise = check.discountInPaise;
    couponId = check.couponId;
  }

  const amountInPaise = listPriceInPaise - discountInPaise;

  // A coupon that zeroes the total still has to grant the thing.
  if (amountInPaise <= 0) {
    if (itemType === "course") {
      await db
        .insert(enrollments)
        .values({ userId: user.id, courseId: item.id })
        .onConflictDoNothing();
    }
    return ok(c, { status: "already_owned" as const });
  }

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
        itemType === "course" ? eq(orders.courseId, item.id) : eq(orders.planId, item.id),
      ),
    )
    .limit(1);

  if (pending && pending.amount === amountInPaise) {
    return ok(c, {
      status: "ok" as const,
      razorpayOrderId: pending.razorpayOrderId,
      amountInPaise,
      currency: "INR",
      orderId: pending.id,
      itemTitle: item.title,
      prefill: { name: "", email: user.email },
    });
  }

  try {
    const [orderRow] = await db
      .insert(orders)
      .values({
        userId: user.id,
        itemType,
        courseId: itemType === "course" ? item.id : null,
        planId: itemType === "plan" ? item.id : null,
        listPriceInPaise,
        discountInPaise,
        couponId,
        amountInPaise,
        currency: "INR",
        razorpayOrderId: `pending_${crypto.randomUUID()}`,
        status: "created",
      })
      .returning({ id: orders.id });

    let rzp: Awaited<ReturnType<typeof createRazorpayOrder>>;
    try {
      rzp = await createRazorpayOrder({
        amountInPaise,
        receipt: orderRow.id,
        notes: { orderId: orderRow.id, userId: user.id, itemType },
      });
    } catch (err) {
      // The row above was written before Razorpay was reached, so a failure
      // here strands it as `created` with a `pending_` id forever —
      // indistinguishable from a checkout the buyer genuinely abandoned, and
      // one more row for every retry. Nothing references it yet, so drop it.
      await db.delete(orders).where(eq(orders.id, orderRow.id));

      // A 401 is bad credentials, not a blip. Telling the buyer to try again
      // sends them into a loop that cannot succeed, so separate the two: the
      // operator needs to see this in the log, and the buyer needs to stop.
      const status = (err as { statusCode?: number }).statusCode;
      const misconfigured = status === 401 || status === 400;

      console.error(
        misconfigured
          ? "[checkout] Razorpay rejected our credentials — check RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET"
          : "[checkout] Could not create Razorpay order",
        err,
      );

      return fail(
        c,
        misconfigured
          ? "Payments are unavailable right now. Please contact support."
          : "Could not start checkout. Please try again.",
        "server_error",
      );
    }

    await db
      .update(orders)
      .set({ razorpayOrderId: rzp.id, updatedAt: new Date() })
      .where(eq(orders.id, orderRow.id));

    return ok(c, {
      status: "ok" as const,
      razorpayOrderId: rzp.id,
      amountInPaise,
      currency: "INR",
      orderId: orderRow.id,
      itemTitle: item.title,
      prefill: { name: "", email: user.email },
    });
  } catch (err) {
    console.error("[checkout] Could not create Razorpay order", err);
    return fail(c, "Could not start checkout. Please try again.", "server_error");
  }
});

/**
 * What each package costs this member right now, with the upgrade window's
 * deadline. Drives the plan page: the browser displays these, never computes
 * them.
 */
commerceRoutes.get("/plans/quotes", requireAccount, async (c) => {
  const user = currentUser(c);
  const active = await getActivePlans();

  const quotes = await Promise.all(
    active.map(async (p) => ({
      slug: p.slug,
      tier: p.tier,
      priceInPaise: p.priceInPaise,
      quote: await quoteForPlan(user.id, {
        id: p.id,
        tier: p.tier,
        priceInPaise: p.priceInPaise,
        name: p.name,
      }),
    })),
  );

  return ok(c, { upgradeWindowHours: UPGRADE_WINDOW_HOURS, quotes });
});

/** Polled by the buy button while it waits for the webhook to land. */
commerceRoutes.get("/ownership", requireAccount, async (c) => {
  const user = currentUser(c);
  const itemType = c.req.query("itemType");
  const slug = c.req.query("slug");

  if (itemType !== "course" && itemType !== "plan") {
    return fail(c, "Unknown item type.", "validation");
  }
  if (!slug) return fail(c, "Missing slug.", "validation");

  if (itemType === "plan") {
    const sub = await getActiveSubscription(user.id);
    return ok(c, { owned: sub?.planSlug === slug });
  }

  const [course] = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1);

  if (!course) return ok(c, { owned: false });
  return ok(c, { owned: await isEnrolled(user.id, course.id) });
});

commerceRoutes.get("/my/orders", requireAccount, async (c) =>
  ok(c, await getUserOrders(currentUser(c).id)),
);

commerceRoutes.get("/my/coupons", requireUser, async (c) =>
  ok(c, await listVisibleCoupons(currentUser(c).id)),
);

commerceRoutes.get("/my/subscription", requireAccount, async (c) =>
  ok(c, await getActiveSubscription(currentUser(c).id)),
);
