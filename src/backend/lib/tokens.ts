import "server-only";

import crypto from "node:crypto";
import { and, eq, gt, isNull } from "drizzle-orm";

import { db } from "@/backend/db";
import { authTokens } from "@/backend/db/schema";

/**
 * Single-use, expiring tokens for email verification and password reset.
 *
 * The raw token goes in the email; only its SHA-256 hash is stored. A database
 * dump therefore does not hand an attacker the ability to verify or reset any
 * account — the same reason passwords are hashed.
 *
 * SHA-256 (not bcrypt) is correct here: these tokens are 256 bits of CSPRNG
 * output, so there is no dictionary to attack and no need for a slow KDF.
 */

const TTL_SECONDS = {
  email_verification: 24 * 60 * 60,
  password_reset: 60 * 60, // deliberately shorter — it grants account takeover
} as const;

export type TokenPurpose = keyof typeof TTL_SECONDS;

function hash(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function issueToken(userId: string, purpose: TokenPurpose): Promise<string> {
  const raw = crypto.randomBytes(32).toString("base64url");

  // Invalidate any outstanding token of the same purpose, so requesting a new
  // reset link immediately kills the old one.
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
    tokenHash: hash(raw),
    purpose,
    expiresAt: new Date(Date.now() + TTL_SECONDS[purpose] * 1000),
  });

  return raw;
}

/**
 * Atomically consumes a token, returning the user it belonged to.
 *
 * The `consumedAt IS NULL` predicate lives in the UPDATE's WHERE clause rather
 * than in a preceding SELECT, so two simultaneous requests with the same token
 * cannot both succeed — the second one updates zero rows.
 */
export async function consumeToken(
  rawToken: string,
  purpose: TokenPurpose,
): Promise<{ userId: string } | null> {
  const tokenHash = hash(rawToken);

  const updated = await db
    .update(authTokens)
    .set({ consumedAt: new Date() })
    .where(
      and(
        eq(authTokens.tokenHash, tokenHash),
        eq(authTokens.purpose, purpose),
        isNull(authTokens.consumedAt),
        gt(authTokens.expiresAt, new Date()),
      ),
    )
    .returning({ userId: authTokens.userId });

  return updated[0] ?? null;
}
