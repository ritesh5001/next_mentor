import { Hono } from "hono";
import crypto from "node:crypto";

import { maturePendingCommissions } from "@/lib/referral";
import { expireLapsedSubscriptions } from "@/services/plans";
import { evaluateAllAchievements } from "@/services/achievements";

/**
 * Daily housekeeping.
 *
 * Every step is idempotent — running twice in a day changes nothing the second
 * time — because a job that cannot safely be retried is a job that silently
 * skips days.
 */
export const cronRoutes = new Hono();

cronRoutes.get("/daily", async (c) => {
  const secret = process.env.CRON_SECRET;

  // Fail closed. An open endpoint lets anyone mature commissions early,
  // collapsing the refund window that protects against clawback fraud.
  if (!secret) return c.json({ error: "Unauthorized" }, 401);

  const header = c.req.header("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  const a = Buffer.from(header);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return c.json({ error: "Unauthorized" }, 401);
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
    return c.json(summary);
  } catch (err) {
    console.error("[cron/daily] Failed", err);
    return c.json({ error: "Job failed" }, 500);
  }
});
