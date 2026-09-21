import bcrypt from "bcryptjs";
import { and, eq, ne, sql } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { BCRYPT_ROUNDS } from "@/lib/auth";

/**
 * Admin view and correction of a member's own details.
 *
 * Passwords are never readable here — they are stored as one-way bcrypt
 * hashes, so there is nothing to show. What an admin can do is set a new one.
 */

/** Everything the member typed at signup, plus who sponsored them. */
export async function getUserProfileForAdmin(userId: string) {
  const [row] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      state: users.state,
      role: users.role,
      isBlocked: users.isBlocked,
      emailVerified: users.emailVerified,
      memberId: users.referralCode,
      createdAt: users.createdAt,
      // The outer row is named explicitly: with no join, bare column names
      // here would be ambiguous against the tables inside each subquery.
      sponsorName: sql<string | null>`(select s.name from users s where s.id = "users"."referred_by_id")`,
      sponsorEmail: sql<string | null>`(select s.email from users s where s.id = "users"."referred_by_id")`,
      sponsorMemberId: sql<string | null>`(select s.referral_code from users s where s.id = "users"."referred_by_id")`,
      planName: sql<string | null>`(
        select p.name from subscriptions sub
        join plans p on p.id = sub.plan_id
        where sub.user_id = "users"."id" and sub.status = 'active'
        order by p.tier desc limit 1
      )`,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return row ?? null;
}

type Result = { ok: true } | { error: string; field?: string };

/** Corrects a member's details. Email stays unique; phone is normalised. */
export async function updateUserDetails(
  userId: string,
  d: { name: string; email: string; phone?: string; state?: string },
): Promise<Result> {
  const email = d.email.trim().toLowerCase();

  const [taken] = await db
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.email, email), ne(users.id, userId)))
    .limit(1);
  if (taken) return { error: "Another account already uses that email.", field: "email" };

  const phone = d.phone ? d.phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "") : "";
  if (phone && !/^[6-9]\d{9}$/.test(phone)) {
    return { error: "Enter a valid 10-digit mobile number.", field: "phone" };
  }

  const [row] = await db
    .update(users)
    .set({
      name: d.name.trim(),
      email,
      phone: phone || null,
      state: d.state?.trim() || null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning({ id: users.id });

  return row ? { ok: true } : { error: "That member no longer exists." };
}

/** Replaces a member's password. The old one stops working at once. */
export async function setUserPassword(userId: string, password: string): Promise<Result> {
  const [row] = await db
    .update(users)
    .set({
      passwordHash: await bcrypt.hash(password, BCRYPT_ROUNDS),
      // A held signup password is obsolete once an admin sets a new one.
      pendingPasswordEnc: null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning({ id: users.id });

  return row ? { ok: true } : { error: "That member no longer exists." };
}
