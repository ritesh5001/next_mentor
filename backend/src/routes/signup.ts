import { Hono } from "hono";
import { and, eq, isNull } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { db } from "@/db";
import { orders, users } from "@/db/schema";
import { BCRYPT_ROUNDS } from "@/lib/auth";
import { encryptSecret } from "@/lib/crypto";
import { createRazorpayOrder } from "@/lib/razorpay";
import { generateUniqueReferralCode, normalizeReferralCode } from "@/lib/referral-code";
import { optionalAuth } from "@/middleware/auth";
import { ok, fail, parseBody } from "@/middleware/respond";
import { getActiveSubscription, getPlanBySlug } from "@/services/plans";
import { validateCoupon } from "@/services/coupons";

/**
 * Paid signup: an account exists only once its first plan is paid for.
 *
 * The form (name, phone, email, state, password, plan) creates a *pending*
 * user — no verified email, so it cannot sign in — plus a Razorpay order for
 * the plan. The payment webhook is what activates the account and sends the
 * welcome email with the member ID and password (services/signup). An unpaid
 * pending row is inert, and is simply reused if the same email tries again.
 *
 * There is no OTP step: a captured payment to an address that then receives
 * the credentials is the verification.
 *
 * The same endpoint serves a member creating an account for someone else from
 * their dashboard — when the caller is signed in, they become the sponsor.
 */
export const signupRoutes = new Hono();

const PHONE = /^[6-9]\d{9}$/;

const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Enter the full name.").max(80),
    phone: z
      .string()
      .transform((v) => v.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, ""))
      .refine((v) => PHONE.test(v), "Enter a valid 10-digit mobile number."),
    email: z.string().trim().toLowerCase().email("Enter a valid email address."),
    state: z.string().trim().min(2, "Choose a state.").max(60),
    password: z
      .string()
      .min(8, "At least 8 characters.")
      .max(72)
      .regex(/[A-Z]/, "Include an uppercase letter.")
      .regex(/\d/, "Include a number."),
    confirmPassword: z.string(),
    acceptedTerms: z.literal(true, { message: "Accept the terms to continue." }),
    planSlug: z.string().min(1, "Choose a package."),
    referralCode: z.string().trim().max(20).optional(),
    couponCode: z.string().trim().max(32).optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

/**
 * What a member is allowed to sell: their own pack level.
 *
 * A Starter member may introduce someone to Starter, a Pro member to Starter
 * or Pro, and so on — you can only sell what you own. Admins are not selling,
 * so they are not capped.
 */
export async function sellableTier(userId: string): Promise<number> {
  const [row] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (row?.role === "admin") return Number.MAX_SAFE_INTEGER;
  const sub = await getActiveSubscription(userId);
  return sub?.planTier ?? 0;
}

/** A signed-in member sponsoring the signup, or the referral code on the form. */
async function resolveReferrer(callerId: string | null, code: string | undefined) {
  if (callerId) {
    const [caller] = await db
      .select({ id: users.id, isBlocked: users.isBlocked })
      .from(users)
      .where(eq(users.id, callerId))
      .limit(1);
    if (caller && !caller.isBlocked) return caller.id;
  }
  if (code) {
    const [referrer] = await db
      .select({ id: users.id, isBlocked: users.isBlocked })
      .from(users)
      .where(eq(users.referralCode, normalizeReferralCode(code)))
      .limit(1);
    if (referrer && !referrer.isBlocked) return referrer.id;
  }
  return null;
}

signupRoutes.post("/signup/checkout", optionalAuth, async (c) => {
  const body = await parseBody(c, signupSchema);
  if (!body.ok) return body.response;
  const input = body.data;
  const caller = c.get("user");

  const plan = await getPlanBySlug(input.planSlug);
  if (!plan || !plan.isActive) return fail(c, "That package is not available.", "not_found");

  const [existing] = await db
    .select({ id: users.id, emailVerified: users.emailVerified, referredById: users.referredById })
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  // Only a never-activated, never-paid row may be taken over by a new
  // attempt. Anything else is a real account.
  if (existing && (existing.emailVerified || (await getActiveSubscription(existing.id)))) {
    return fail(c, "An account with this email already exists. Sign in instead.", "conflict");
  }
  if (caller && existing?.id === caller.id) {
    return fail(c, "You cannot create an account for yourself.", "validation");
  }

  const referredById = await resolveReferrer(caller?.id ?? null, input.referralCode);
  // A typed referral ID that matches nobody is a typo, not "no referrer" —
  // silently dropping it loses the sponsor their commission.
  if (!referredById && input.referralCode && !caller) {
    return fail(c, "No member found with that referral ID.", "validation", {
      referralCode: "Check this ID with the person who referred you.",
    });
  }
  // A member can only introduce someone to a package they hold themselves.
  // The form hides the ones they cannot sell; this is the backstop, because a
  // hidden radio button is not a rule.
  if (referredById) {
    const allowed = await sellableTier(referredById);
    if (plan.tier > allowed) {
      return fail(
        c,
        caller
          ? "You can only create accounts on packages you own. Upgrade your own package first."
          : "The member who referred you cannot introduce this package. Choose a package they hold, or sign up without a referral ID.",
        "validation",
        { planSlug: "Not available through this referral ID." },
      );
    }
  }

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
  const pendingPasswordEnc = encryptSecret(input.password);

  let userId: string;
  if (existing) {
    userId = existing.id;
    await db
      .update(users)
      .set({
        name: input.name,
        phone: input.phone,
        state: input.state,
        passwordHash,
        pendingPasswordEnc,
        // Attribution is first-touch: an earlier referrer keeps the credit.
        ...(existing.referredById || !referredById ? {} : { referredById, referredAt: new Date() }),
        updatedAt: new Date(),
      })
      .where(and(eq(users.id, existing.id), isNull(users.emailVerified)));
  } else {
    try {
      const [created] = await db
        .insert(users)
        .values({
          name: input.name,
          email: input.email,
          phone: input.phone,
          state: input.state,
          passwordHash,
          pendingPasswordEnc,
          referralCode: await generateUniqueReferralCode(),
          referredById,
          referredAt: referredById ? new Date() : null,
        })
        .returning({ id: users.id });
      userId = created.id;
    } catch {
      // UNIQUE(email): lost a race with a parallel submit of the same address.
      return fail(c, "An account with this email already exists. Sign in instead.", "conflict");
    }
  }

  // Coupon, checked against the pending account so per-user limits apply.
  let discountInPaise = 0;
  let couponId: string | null = null;
  if (input.couponCode) {
    const check = await validateCoupon({
      code: input.couponCode,
      userId,
      amountInPaise: plan.priceInPaise,
      scope: "plan",
      targetId: plan.id,
      purchase: "signup",
    });
    if (!check.valid) {
      return fail(c, check.reason, "validation", { couponCode: check.reason });
    }
    discountInPaise = check.discountInPaise;
    couponId = check.couponId;
  }

  // Never zero: Razorpay rejects a zero-value order, and access is granted by
  // a captured payment.
  const amountInPaise = Math.max(100, plan.priceInPaise - discountInPaise);

  // Reuse an open order for the same plan and amount, as normal checkout does.
  const [pending] = await db
    .select({ id: orders.id, razorpayOrderId: orders.razorpayOrderId, amount: orders.amountInPaise })
    .from(orders)
    .where(and(eq(orders.userId, userId), eq(orders.status, "created"), eq(orders.planId, plan.id)))
    .limit(1);

  const respond = (orderId: string, razorpayOrderId: string) =>
    ok(c, {
      orderId,
      razorpayOrderId,
      amountInPaise,
      currency: "INR",
      itemTitle: `${plan.name} package`,
      prefill: { name: input.name, email: input.email, contact: input.phone },
    });

  if (pending && pending.amount === amountInPaise && !pending.razorpayOrderId.startsWith("pending_")) {
    return respond(pending.id, pending.razorpayOrderId);
  }

  const [orderRow] = await db
    .insert(orders)
    .values({
      userId,
      itemType: "plan",
      planId: plan.id,
      listPriceInPaise: plan.priceInPaise,
      discountInPaise,
      couponId,
      amountInPaise,
      currency: "INR",
      razorpayOrderId: `pending_${crypto.randomUUID()}`,
      status: "created",
    })
    .returning({ id: orders.id });

  try {
    const rzp = await createRazorpayOrder({
      amountInPaise,
      receipt: orderRow.id,
      notes: { orderId: orderRow.id, userId, itemType: "plan", signup: "1" },
    });
    await db
      .update(orders)
      .set({ razorpayOrderId: rzp.id, updatedAt: new Date() })
      .where(eq(orders.id, orderRow.id));
    return respond(orderRow.id, rzp.id);
  } catch (err) {
    // Nothing references the row yet; drop it rather than strand it.
    await db.delete(orders).where(eq(orders.id, orderRow.id));
    const status = (err as { statusCode?: number }).statusCode;
    console.error("[signup] Could not create Razorpay order", err);
    return fail(
      c,
      status === 401 || status === 400
        ? "Payments are unavailable right now. Please contact support."
        : "Could not start payment. Please try again.",
      "server_error",
    );
  }
});

/**
 * Prices a coupon before the account exists, so the signup form can show what
 * will actually be charged instead of making someone pay to find out.
 *
 * Indicative by design: the binding check happens when the order is created,
 * against the real account. A code that passes here can still be refused there
 * — if it is private to a member, or if that email has already used it.
 */
signupRoutes.post("/signup/coupon-preview", async (c) => {
  const body = await parseBody(
    c,
    z.object({ code: z.string().trim().min(1).max(32), planSlug: z.string().min(1) }),
  );
  if (!body.ok) return body.response;

  const plan = await getPlanBySlug(body.data.planSlug);
  if (!plan || !plan.isActive) return fail(c, "That package is not available.", "not_found");

  const check = await validateCoupon({
    code: body.data.code,
    userId: null,
    amountInPaise: plan.priceInPaise,
    scope: "plan",
    targetId: plan.id,
    purchase: "signup",
  });

  return check.valid
    ? ok(c, {
        valid: true as const,
        code: check.code,
        discountInPaise: check.discountInPaise,
        finalAmountInPaise: check.finalAmountInPaise,
      })
    : ok(c, { valid: false as const, reason: check.reason });
});

/**
 * Who a referral ID belongs to, and the highest package they can introduce.
 *
 * Public on purpose: the code is printed on the link the member shares. It
 * gives back only a first name — enough for the signup page to say who
 * referred you and to hide the packages that member cannot sell.
 */
signupRoutes.get("/signup/referrer", async (c) => {
  const code = normalizeReferralCode(c.req.query("code") ?? "");
  if (code.length < 4) return ok(c, { found: false });

  const [referrer] = await db
    .select({ id: users.id, name: users.name, code: users.referralCode, isBlocked: users.isBlocked })
    .from(users)
    .where(eq(users.referralCode, code))
    .limit(1);

  if (!referrer || referrer.isBlocked) return ok(c, { found: false });

  return ok(c, {
    found: true,
    code: referrer.code,
    name: referrer.name?.trim().split(/\s+/)[0] ?? null,
    maxTier: Math.min(99, await sellableTier(referrer.id)),
  });
});

/**
 * Polled by the signup page after the Razorpay window reports success. The
 * order id is an unguessable UUID only the paying browser holds, and the
 * answer is a single boolean.
 */
signupRoutes.get("/signup/status", async (c) => {
  const orderId = c.req.query("orderId") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(orderId)) return fail(c, "Unknown order.", "validation");

  const [order] = await db
    .select({ status: orders.status })
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  return ok(c, { paid: order?.status === "paid" });
});
