import { NextResponse } from "next/server";
import crypto from "node:crypto";

import { maturePendingCommissions } from "@/backend/lib/referral";
import { expireLapsedSubscriptions } from "@/backend/services/plans";
import { evaluateAllAchievements } from "@/backend/services/achievements";

/**
 * Daily housekeeping, invoked by Vercel Cron.
 *
 * Matures commissions past their refund window, marks lapsed subscriptions
 * expired, and awards any newly-earned badges. All three are idempotent — running twice in a day changes nothing the
 * second time — because a cron that cannot safely be retried is a cron that
 * silently skips days.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorised(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  // Fail closed. An open endpoint here lets anyone mature commissions early,
  // collapsing the refund window that protects against clawback fraud.
  if (!secret) return false;

  const header = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;

  const a = Buffer.from(header);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = Date.now();

  try {
    const commissions = await maturePendingCommissions();
    const expired = await expireLapsedSubscriptions();
    const badges = await evaluateAllAchievements();

    const summary = {
      ok: true,
      commissionsMatured: commissions.matured,
      earnersCredited: commissions.earners,
      subscriptionsExpired: expired,
      usersEvaluated: badges.users,
      badgesAwarded: badges.awarded,
      durationMs: Date.now() - startedAt,
    };

    console.info("[cron/daily]", summary);
    return NextResponse.json(summary);
  } catch (err) {
    console.error("[cron/daily] Failed", err);
    return NextResponse.json({ error: "Job failed" }, { status: 500 });
  }
}
