import "server-only";

import { db } from "@/backend/db";
import { referralClicks } from "@/backend/db/schema";
import { hashIp } from "@/backend/lib/crypto";

/**
 * Logs an affiliate link click.
 *
 * Deliberately fire-and-forget and never throws: a failure to record analytics
 * must not stop the visitor seeing the page they asked for. Called from the
 * landing page's Server Component rather than the edge proxy, which runs on
 * every request and must stay free of database work.
 */
export async function recordReferralClick(params: {
  referralCode: string;
  ip: string | null;
  userAgent: string | null;
  landingPath: string;
}) {
  try {
    await db.insert(referralClicks).values({
      referralCode: params.referralCode.toUpperCase().slice(0, 16),
      // Salted hash, never the raw address: this is behavioural data about
      // people who have not signed up, and "same visitor?" is all we need.
      ipHash: params.ip ? hashIp(params.ip) : null,
      userAgent: params.userAgent?.slice(0, 300) ?? null,
      landingPath: params.landingPath.slice(0, 200),
    });
  } catch (err) {
    console.error("[referral] Click log failed", err);
  }
}
