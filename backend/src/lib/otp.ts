import crypto from "node:crypto";
import { and, desc, eq, gt, isNull, sql } from "drizzle-orm";

import { db } from "@/db";
import { authTokens } from "@/db/schema";

/**
 * Six-digit one-time codes for email verification and password reset.
 *
 * A 6-digit code is 1,000,000 possibilities. That is small enough that the
 * security comes almost entirely from the limits around it, not from the code:
 *
 *  - Codes are looked up by (userId, purpose), never by code alone. An attacker
 *    must already know whose account they are attacking, and cannot sweep for
 *    "any valid code" across the whole table.
 *  - MAX_ATTEMPTS wrong guesses burns the code. Five tries against a million
 *    possibilities is a 1-in-200,000 chance, and the sixth try gets nothing.
 *  - Codes expire in minutes, not hours.
 *  - A cooldown between sends stops the mailbox being used as a flood target.
 *
 * The code is still hashed at rest. SHA-256 rather than bcrypt is a deliberate
 * trade: a slow KDF on every verification would make the endpoint a cheap
 * denial-of-service target, and against a 6-digit space bcrypt buys little —
 * the attempt cap is what actually protects the account.
 */

export const OTP_LENGTH = 6;

/** Wrong guesses before the code is destroyed and a new one must be requested. */
export const MAX_OTP_ATTEMPTS = 5;

const TTL_SECONDS = {
  email_verification: 15 * 60,
  // Deliberately shorter: this one grants account takeover.
  password_reset: 10 * 60,
} as const;

/** Minimum gap between two sends for the same user and purpose. */
const RESEND_COOLDOWN_SECONDS = 60;

export type OtpPurpose = keyof typeof TTL_SECONDS;

/**
 * Generates a uniformly-distributed 6-digit code.
 *
 * `randomInt` rather than `randomBytes() % 1000000`: the modulo version is
 * biased toward low numbers because 2^32 is not a multiple of 1,000,000, which
 * would make some codes measurably likelier than others.
 */
function generateCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(OTP_LENGTH, "0");
}

function hash(code: string): string {
  return crypto.createHash("sha256").update(code).digest("hex");
}

/** Constant-time compare, so a wrong code cannot be narrowed by response timing. */
function matches(candidate: string, storedHash: string): boolean {
  const a = Buffer.from(hash(candidate), "hex");
  const b = Buffer.from(storedHash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export type IssueResult =
  | { status: "issued"; code: string; expiresInSeconds: number }
  | { status: "cooldown"; retryAfterSeconds: number };

/**
 * Issues a code, subject to a resend cooldown.
 *
 * Any outstanding code for the same purpose is invalidated first, so requesting
 * a new one immediately kills the old — a user who requests twice and then
 * types the first code gets a clean rejection rather than an inconsistent state.
 */
export async function issueOtp(
  userId: string,
  purpose: OtpPurpose,
): Promise<IssueResult> {
  const [recent] = await db
    .select({ createdAt: authTokens.createdAt })
    .from(authTokens)
    .where(and(eq(authTokens.userId, userId), eq(authTokens.purpose, purpose)))
    .orderBy(desc(authTokens.createdAt))
    .limit(1);

  if (recent) {
    const elapsed = (Date.now() - recent.createdAt.getTime()) / 1000;
    if (elapsed < RESEND_COOLDOWN_SECONDS) {
      return {
        status: "cooldown",
        retryAfterSeconds: Math.ceil(RESEND_COOLDOWN_SECONDS - elapsed),
      };
    }
  }

  const code = generateCode();

  await db
    .update(authTokens)
    .set({ consumedAt: new Date() })
    .where(
      and(
        eq(authTokens.userId, userId),
        eq(authTokens.purpose, purpose),
        isNull(authTokens.consumedAt),
      ),
    );

  await db.insert(authTokens).values({
    userId,
    tokenHash: hash(code),
    purpose,
    expiresAt: new Date(Date.now() + TTL_SECONDS[purpose] * 1000),
  });

  return { status: "issued", code, expiresInSeconds: TTL_SECONDS[purpose] };
}

export type VerifyResult =
  | { status: "ok" }
  | { status: "invalid"; attemptsLeft: number }
  | { status: "expired" }
  | { status: "too_many_attempts" }
  | { status: "no_code" };

/**
 * Verifies a code for a known user.
 *
 * Takes the userId rather than searching by code: a code alone is not an
 * identifier, and letting one be looked up globally would let an attacker
 * brute-force *somebody's* account rather than a specific one.
 */
export async function verifyOtp(
  userId: string,
  code: string,
  purpose: OtpPurpose,
): Promise<VerifyResult> {
  const clean = code.replace(/\D/g, "");
  if (clean.length !== OTP_LENGTH) {
    return { status: "invalid", attemptsLeft: MAX_OTP_ATTEMPTS };
  }

  const [token] = await db
    .select()
    .from(authTokens)
    .where(
      and(
        eq(authTokens.userId, userId),
        eq(authTokens.purpose, purpose),
        isNull(authTokens.consumedAt),
      ),
    )
    .orderBy(desc(authTokens.createdAt))
    .limit(1);

  if (!token) return { status: "no_code" };

  if (token.expiresAt <= new Date()) {
    await db
      .update(authTokens)
      .set({ consumedAt: new Date() })
      .where(eq(authTokens.id, token.id));
    return { status: "expired" };
  }

  if (token.attemptCount >= MAX_OTP_ATTEMPTS) {
    await db
      .update(authTokens)
      .set({ consumedAt: new Date() })
      .where(eq(authTokens.id, token.id));
    return { status: "too_many_attempts" };
  }

  // The attempt is recorded BEFORE the comparison. Counting only failures
  // would leave a window where a crash mid-verify loses the increment, and
  // incrementing after a match is wasted work.
  const [bumped] = await db
    .update(authTokens)
    .set({ attemptCount: sql`${authTokens.attemptCount} + 1` })
    .where(and(eq(authTokens.id, token.id), isNull(authTokens.consumedAt)))
    .returning({ attemptCount: authTokens.attemptCount });

  // Lost a race with another request that consumed the code.
  if (!bumped) return { status: "no_code" };

  if (!matches(clean, token.tokenHash)) {
    const attemptsLeft = Math.max(0, MAX_OTP_ATTEMPTS - bumped.attemptCount);

    if (attemptsLeft === 0) {
      await db
        .update(authTokens)
        .set({ consumedAt: new Date() })
        .where(eq(authTokens.id, token.id));
      return { status: "too_many_attempts" };
    }

    return { status: "invalid", attemptsLeft };
  }

  // Correct. Consume it — the `consumedAt IS NULL` predicate sits in the WHERE
  // clause so two simultaneous requests with the same code cannot both win.
  const consumed = await db
    .update(authTokens)
    .set({ consumedAt: new Date() })
    .where(
      and(
        eq(authTokens.id, token.id),
        isNull(authTokens.consumedAt),
        gt(authTokens.expiresAt, new Date()),
      ),
    )
    .returning({ id: authTokens.id });

  if (consumed.length === 0) return { status: "no_code" };

  return { status: "ok" };
}

/** Housekeeping for the daily cron: drop spent and expired rows. */
export async function purgeStaleOtps(): Promise<number> {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const deleted = await db
    .delete(authTokens)
    .where(sql`${authTokens.createdAt} < ${cutoff}`)
    .returning({ id: authTokens.id });
  return deleted.length;
}
