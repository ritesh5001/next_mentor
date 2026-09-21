import { cookies } from "next/headers";

import { REFERRAL_COOKIE, normalizeReferralCode } from "@nextmentor/shared";

/**
 * The referral ID to credit for a signup happening right now.
 *
 * The link in front of the person wins over the cookie. Attribution used to be
 * first-touch — the cookie was never overwritten — which meant a phone that
 * had once opened one member's link kept crediting that member for every
 * account created on it afterwards, for thirty days. On a shared phone at a
 * seminar that is the wrong sponsor on every sale.
 *
 * The cookie still covers the normal case: someone clicks a link, browses the
 * site, and signs up later from a page with no `?ref=` of its own.
 */
export async function resolveSignupReferral(ref?: string): Promise<string | undefined> {
  const jar = await cookies();
  const raw = ref?.trim() || jar.get(REFERRAL_COOKIE)?.value;
  const code = raw ? normalizeReferralCode(raw) : "";
  return code.length >= 4 ? code : undefined;
}
