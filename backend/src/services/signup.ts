import { and, eq, isNull } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { db } from "@/db";
import { orders, plans, users } from "@/db/schema";
import { decryptSecret } from "@/lib/crypto";
import { sendWelcomeCredentialsEmail } from "@/lib/email";
import { BCRYPT_ROUNDS } from "@/lib/auth";
import { generateUniqueReferralCode, normalizeReferralCode } from "@/lib/referral-code";
import { grantPlan } from "@/services/grants";

/**
 * Activates a paid signup: marks the email verified (the payment plus the
 * welcome mail stand in for OTP), wipes the held password, and sends the
 * congratulations email with the member ID and credentials.
 *
 * Runs from the payment webhook after the order is granted. Idempotent: only
 * the delivery that flips `email_verified` from null sends the email, so a
 * retried webhook cannot send it twice. Never throws — the payment is already
 * recorded, and a mail problem must not make Razorpay retry.
 */
export async function activatePendingSignup(orderId: string): Promise<void> {
  try {
    const [row] = await db
      .select({
        userId: users.id,
        email: users.email,
        name: users.name,
        memberId: users.referralCode,
        pendingPasswordEnc: users.pendingPasswordEnc,
        planName: plans.name,
      })
      .from(orders)
      .innerJoin(users, eq(users.id, orders.userId))
      .leftJoin(plans, eq(plans.id, orders.planId))
      .where(eq(orders.id, orderId))
      .limit(1);

    if (!row) return;

    const [activated] = await db
      .update(users)
      .set({ emailVerified: new Date(), pendingPasswordEnc: null, updatedAt: new Date() })
      .where(and(eq(users.id, row.userId), isNull(users.emailVerified)))
      .returning({ id: users.id });

    // Already active (an existing member buying another plan): nothing to do.
    if (!activated || !row.pendingPasswordEnc) return;

    await sendWelcomeCredentialsEmail({
      to: row.email,
      name: row.name,
      memberId: row.memberId,
      password: decryptSecret(row.pendingPasswordEnc),
      planName: row.planName ?? "NextMentor",
    });
    console.info("[signup] Activated and welcomed", row.userId);
  } catch (err) {
    console.error("[signup] Activation failed for order", orderId, err);
  }
}

/* ------------------------------------------------------------ free member */

/**
 * Admin-created member: active immediately, plan granted free (no order, no
 * payment, so no commission is paid to anyone), and the same welcome email
 * with the Member ID and password. For people the owner brings on without
 * charging them.
 *
 * A never-activated pending signup on the same email is taken over; any
 * other existing account is refused.
 */
export async function createFreeMember(input: {
  name: string;
  phone: string;
  email: string;
  state: string;
  password: string;
  planId: string;
  sponsorCode?: string;
  adminId: string;
}): Promise<{ ok: true; memberId: string; userId: string } | { error: string }> {
  const [existing] = await db
    .select({ id: users.id, emailVerified: users.emailVerified })
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);
  if (existing?.emailVerified) {
    return { error: "An account with this email already exists — grant it a plan from its user page instead." };
  }

  let referredById: string | null = null;
  if (input.sponsorCode) {
    const [sponsor] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.referralCode, normalizeReferralCode(input.sponsorCode)))
      .limit(1);
    if (!sponsor) return { error: "No member has that sponsor referral ID." };
    referredById = sponsor.id;
  }

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
  const now = new Date();
  const fields = {
    name: input.name,
    phone: input.phone,
    state: input.state,
    passwordHash,
    pendingPasswordEnc: null,
    emailVerified: now,
    referredById,
    referredAt: referredById ? now : null,
    updatedAt: now,
  };

  let userId: string;
  let memberId: string;
  if (existing) {
    const [row] = await db
      .update(users)
      .set(fields)
      .where(eq(users.id, existing.id))
      .returning({ id: users.id, code: users.referralCode });
    userId = row.id;
    memberId = row.code;
  } else {
    try {
      const [row] = await db
        .insert(users)
        .values({ ...fields, email: input.email, referralCode: await generateUniqueReferralCode() })
        .returning({ id: users.id, code: users.referralCode });
      userId = row.id;
      memberId = row.code;
    } catch {
      return { error: "An account with this email already exists." };
    }
  }

  const granted = await grantPlan({ userId, planId: input.planId, grantedById: input.adminId });
  if ("error" in granted) return { error: granted.error };

  const [plan] = await db.select({ name: plans.name }).from(plans).where(eq(plans.id, input.planId)).limit(1);
  await sendWelcomeCredentialsEmail({
    to: input.email,
    name: input.name,
    memberId,
    password: input.password,
    planName: plan?.name ?? "NextMentor",
  });

  return { ok: true, memberId, userId };
}
