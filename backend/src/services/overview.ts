import { and, desc, eq, gte, inArray, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  commissions,
  orders,
  plans,
  referralClicks,
  subscriptions,
  users,
  wallets,
} from "@/db/schema";

/**
 * Everything the affiliate overview screen shows, in one round trip.
 *
 * Deliberately one endpoint rather than eight: the page renders as a single
 * unit, and eight parallel requests would each pay the connection cost to Neon
 * for a few hundred bytes of aggregate.
 *
 * Every figure is computed from the commission and order tables rather than
 * from the cached wallet, except the balance itself. The wallet is a
 * projection; these are the underlying facts.
 */

/** Commission that actually counts as earned. Reversed sales never do. */
const EARNED = ["approved", "paid"] as const;

function daysAgo(n: number): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}

function startOfMonth(): Date {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

export type OverviewData = Awaited<ReturnType<typeof getOverview>>;

export async function getOverview(userId: string) {
  const today = daysAgo(0);
  const last7 = daysAgo(6);
  const last30 = daysAgo(29);
  const last6Months = daysAgo(182);

  const [
    earnedRows,
    seriesRows,
    salesRows,
    memberRows,
    clickRows,
    walletRow,
    recentRows,
    monthRow,
  ] = await Promise.all([
    // Earnings bucketed by period, in one pass over the same rows.
    db
      .select({
        today: sql<number>`coalesce(sum(case when ${commissions.createdAt} >= ${today} then ${commissions.amountInPaise} else 0 end), 0)::int`,
        last7: sql<number>`coalesce(sum(case when ${commissions.createdAt} >= ${last7} then ${commissions.amountInPaise} else 0 end), 0)::int`,
        last30: sql<number>`coalesce(sum(case when ${commissions.createdAt} >= ${last30} then ${commissions.amountInPaise} else 0 end), 0)::int`,
        allTime: sql<number>`coalesce(sum(${commissions.amountInPaise}), 0)::int`,
      })
      .from(commissions)
      .where(and(eq(commissions.earnerId, userId), inArray(commissions.status, [...EARNED]))),

    // One row per day for the last seven, for the line chart.
    db
      .select({
        day: sql<string>`to_char(date_trunc('day', ${commissions.createdAt}), 'YYYY-MM-DD')`,
        amount: sql<number>`coalesce(sum(${commissions.amountInPaise}), 0)::int`,
      })
      .from(commissions)
      .where(
        and(
          eq(commissions.earnerId, userId),
          inArray(commissions.status, [...EARNED]),
          gte(commissions.createdAt, last7),
        ),
      )
      .groupBy(sql`date_trunc('day', ${commissions.createdAt})`),

    // Sales you drove in the last six months, split by the plan bought.
    // Joined through the order so a course sale is not miscounted as a plan.
    db
      .select({
        planName: sql<string>`coalesce(${plans.name}, 'Course')`,
        count: sql<number>`count(*)::int`,
      })
      .from(commissions)
      .innerJoin(orders, eq(orders.id, commissions.orderId))
      .leftJoin(plans, eq(plans.id, orders.planId))
      .where(
        and(
          eq(commissions.earnerId, userId),
          inArray(commissions.status, [...EARNED]),
          gte(commissions.createdAt, last6Months),
        ),
      )
      .groupBy(sql`coalesce(${plans.name}, 'Course')`),

    // People who signed up under your code.
    db
      .select({
        today: sql<number>`count(*) filter (where ${users.referredAt} >= ${today})::int`,
        last7: sql<number>`count(*) filter (where ${users.referredAt} >= ${last7})::int`,
        last30: sql<number>`count(*) filter (where ${users.referredAt} >= ${last30})::int`,
        allTime: sql<number>`count(*)::int`,
      })
      .from(users)
      .where(eq(users.referredById, userId)),

    // Link clicks, which is the closest real equivalent of "presentation views".
    db
      .select({
        today: sql<number>`count(*) filter (where ${referralClicks.createdAt} >= ${today})::int`,
        last7: sql<number>`count(*) filter (where ${referralClicks.createdAt} >= ${last7})::int`,
        last30: sql<number>`count(*) filter (where ${referralClicks.createdAt} >= ${last30})::int`,
        allTime: sql<number>`count(*)::int`,
      })
      .from(referralClicks)
      .innerJoin(users, eq(users.referralCode, referralClicks.referralCode))
      .where(eq(users.id, userId)),

    db
      .select({
        availableInPaise: wallets.availableInPaise,
        pendingInPaise: wallets.pendingInPaise,
        lifetimeEarnedInPaise: wallets.lifetimeEarnedInPaise,
      })
      .from(wallets)
      .where(eq(wallets.userId, userId))
      .limit(1),

    // The most recent people to join under you, with what they paid.
    db
      .select({
        userId: users.id,
        name: users.name,
        referralCode: users.referralCode,
        joinedAt: users.referredAt,
        amountInPaise: commissions.baseAmountInPaise,
        status: commissions.status,
      })
      .from(commissions)
      .innerJoin(users, eq(users.id, commissions.sourceUserId))
      .where(eq(commissions.earnerId, userId))
      .orderBy(desc(commissions.createdAt))
      .limit(8),

    db
      .select({
        earned: sql<number>`coalesce(sum(${commissions.amountInPaise}), 0)::int`,
      })
      .from(commissions)
      .where(
        and(
          eq(commissions.earnerId, userId),
          inArray(commissions.status, [...EARNED]),
          gte(commissions.createdAt, startOfMonth()),
        ),
      ),
  ]);

  // The chart needs a point for every day, including the ones with no sale.
  // Left to the database's GROUP BY, an empty Tuesday would simply vanish and
  // the line would misrepresent the week.
  const byDay = new Map(seriesRows.map((r) => [r.day, r.amount]));
  const series: Array<{ day: string; amountInPaise: number }> = [];
  for (let i = 6; i >= 0; i--) {
    const key = daysAgo(i).toISOString().slice(0, 10);
    series.push({ day: key, amountInPaise: byDay.get(key) ?? 0 });
  }

  const wallet = walletRow[0] ?? {
    availableInPaise: 0,
    pendingInPaise: 0,
    lifetimeEarnedInPaise: 0,
  };

  const [sub] = await db
    .select({ planName: plans.name })
    .from(subscriptions)
    .innerJoin(plans, eq(plans.id, subscriptions.planId))
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, "active")))
    .limit(1);

  return {
    earned: earnedRows[0] ?? { today: 0, last7: 0, last30: 0, allTime: 0 },
    series,
    sales: salesRows,
    totalSales: salesRows.reduce((n, r) => n + r.count, 0),
    members: memberRows[0] ?? { today: 0, last7: 0, last30: 0, allTime: 0 },
    clicks: clickRows[0] ?? { today: 0, last7: 0, last30: 0, allTime: 0 },
    wallet,
    recent: recentRows,
    monthEarnedInPaise: monthRow[0]?.earned ?? 0,
    planName: sub?.planName ?? null,
  };
}
