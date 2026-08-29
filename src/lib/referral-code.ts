import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Crockford base32 minus vowels: no accidental words, and no 0/O or 1/I/L
 * confusion when someone reads a code off a phone screen to a friend. That
 * matters here because referral codes get spoken aloud and hand-typed.
 */
const ALPHABET = "23456789BCDFGHJKMNPQRSTVWXYZ";
const CODE_LENGTH = 8;

function randomCode(): string {
  const bytes = new Uint8Array(CODE_LENGTH);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const byte of bytes) {
    out += ALPHABET[byte % ALPHABET.length];
  }
  return out;
}

/**
 * Generates a referral code that is not already taken.
 *
 * The uniqueness check is racy on its own, which is fine — `users.referralCode`
 * carries a UNIQUE index, so the database is the real arbiter. This loop just
 * keeps the common path from ever reaching that error.
 */
export async function generateUniqueReferralCode(maxAttempts = 5): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const code = randomCode();
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.referralCode, code))
      .limit(1);

    if (existing.length === 0) return code;
  }

  throw new Error(
    `Could not generate a unique referral code after ${maxAttempts} attempts. ` +
      `The code space may be saturated — increase CODE_LENGTH.`,
  );
}

export function normalizeReferralCode(input: string): string {
  return input.trim().toUpperCase().replace(/[^0-9A-Z]/g, "");
}
