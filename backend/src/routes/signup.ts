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
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

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
      amountInPaise: plan.priceInPaise,
      currency: "INR",
      itemTitle: `${plan.name} package`,
      prefill: { name: input.name, email: input.email, contact: input.phone },
    });

  if (pending && pending.amount === plan.priceInPaise && !pending.razorpayOrderId.startsWith("pending_")) {
    return respond(pending.id, pending.razorpayOrderId);
  }

  const [orderRow] = await db
    .insert(orders)
    .values({
      userId,
      itemType: "plan",
      planId: plan.id,
      listPriceInPaise: plan.priceInPaise,
      discountInPaise: 0,
      amountInPaise: plan.priceInPaise,
      currency: "INR",
      razorpayOrderId: `pending_${crypto.randomUUID()}`,
      status: "created",
    })
    .returning({ id: orders.id });

  try {
    const rzp = await createRazorpayOrder({
      amountInPaise: plan.priceInPaise,
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
