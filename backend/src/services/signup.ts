import { and, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { orders, plans, users } from "@/db/schema";
import { decryptSecret } from "@/lib/crypto";
import { sendWelcomeCredentialsEmail } from "@/lib/email";

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
