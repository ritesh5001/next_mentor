/**
 * Values shared between the edge proxy and server-side code.
 *
 * Kept in its own module so a Server Action can read the cookie name without
 * importing src/proxy.ts, which would drag edge-runtime code into the Node
 * bundle.
 */

/** First-touch referral attribution cookie, written by src/proxy.ts. */
export const REFERRAL_COOKIE = "nm_ref";
export const REFERRAL_TTL_DAYS = 30;

/**
 * Normalises a referral code for comparison.
 *
 * Shared because the edge proxy, the register page and the API all need to
 * agree on what "the same code" means.
 */
export function normalizeReferralCode(input: string): string {
  return input.trim().toUpperCase().replace(/[^0-9A-Z]/g, "");
}
