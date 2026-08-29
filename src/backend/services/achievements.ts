import "server-only";

import { and, asc, eq, sql } from "drizzle-orm";

import { db } from "@/backend/db";
import {
  achievements,
  certificates,
  commissions,
  lessonProgress,
  userAchievements,
  users,
} from "@/backend/db/schema";

/**
 * Badge evaluation.
 *
 * Criteria are stored as `{ metric, threshold }` JSON so a new badge is a row,
 * not a deploy. The set of metrics is fixed and known here — anything else is
 * ignored rather than crashing the nightly job for everyone.
 */

export const METRICS = [
  "lessons_completed",
  "courses_completed",
  "certificates_earned",
  "referrals_signed_up",
  "referrals_purchased",
  "commission_earned_paise",
] as const;

export type Metric = (typeof METRICS)[number];

/** Every metric for one user, in a single round trip. */
export async function getUserMetrics(userId: string): Promise<Record<Metric, number>> {
  const [row] = await db
    .select({
      lessons_completed: sql<number>`cast((
        select count(*) from ${lessonProgress}
        where ${lessonProgress.userId} = ${userId}
          and ${lessonProgress.completedAt} is not null
      ) as int)`,
      courses_completed: sql<number>`cast((
        select count(distinct ${certificates.courseId}) from ${certificates}
        where ${certificates.userId} = ${userId}
      ) as int)`,
      certificates_earned: sql<number>`cast((
        select count(*) from ${certificates}
        where ${certificates.userId} = ${userId} and ${certificates.revokedAt} is null
      ) as int)`,
      referrals_signed_up: sql<number>`cast((
        select count(*) from users u where u.referred_by_id = ${userId}
      ) as int)`,
      referrals_purchased: sql<number>`cast((
        select count(distinct ${commissions.sourceUserId}) from ${commissions}
        where ${commissions.earnerId} = ${userId} and ${commissions.status} <> 'reversed'
      ) as int)`,
      commission_earned_paise: sql<number>`cast(coalesce((
        select sum(${commissions.amountInPaise}) from ${commissions}
        where ${commissions.earnerId} = ${userId} and ${commissions.status} in ('approved','paid')
      ), 0) as int)`,
    })
    // Anchored to the user's own row so exactly one row always comes back.
    // Selecting FROM a data table instead would return nothing whenever that
    // table happened to be empty, silently zeroing everyone's progress.
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return {
    lessons_completed: row?.lessons_completed ?? 0,
    courses_completed: row?.courses_completed ?? 0,
    certificates_earned: row?.certificates_earned ?? 0,
    referrals_signed_up: row?.referrals_signed_up ?? 0,
    referrals_purchased: row?.referrals_purchased ?? 0,
    commission_earned_paise: row?.commission_earned_paise ?? 0,
  };
}

/**
 * Awards any newly-earned badges.
 *
 * Safe to run repeatedly: the UNIQUE(userId, achievementId) index turns a
 * repeat award into a no-op, so the nightly job can be retried freely.
 */
export async function evaluateAchievements(userId: string): Promise<string[]> {
  const [defs, metrics, held] = await Promise.all([
    db.select().from(achievements).where(eq(achievements.isActive, true)),
    getUserMetrics(userId),
    db
      .select({ achievementId: userAchievements.achievementId })
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId)),
  ]);

  const heldIds = new Set(held.map((h) => h.achievementId));
  const newlyEarned: string[] = [];

  for (const def of defs) {
    if (heldIds.has(def.id)) continue;

    const metric = def.criteria?.metric as Metric | undefined;
    const threshold = def.criteria?.threshold;

    // An unknown metric is a data problem, not a reason to fail the whole run.
    if (!metric || !METRICS.includes(metric) || typeof threshold !== "number") {
      console.warn("[achievements] Skipping badge with unusable criteria", def.code);
      continue;
    }

    if (metrics[metric] >= threshold) {
      const inserted = await db
        .insert(userAchievements)
        .values({ userId, achievementId: def.id })
        .onConflictDoNothing()
        .returning({ id: userAchievements.id });

      if (inserted.length > 0) newlyEarned.push(def.code);
    }
  }

  return newlyEarned;
}

/**
 * Runs the evaluator for everyone. Called by the daily cron.
 *
 * Each user is independent, so one failure is logged and skipped rather than
 * aborting the run and leaving everybody else un-evaluated.
 */
export async function evaluateAllAchievements(): Promise<{ users: number; awarded: number }> {
  const everyone = await db.select({ id: users.id }).from(users);

  let awarded = 0;
  for (const u of everyone) {
    try {
      awarded += (await evaluateAchievements(u.id)).length;
    } catch (err) {
      console.error("[achievements] Evaluation failed for user", u.id, err);
    }
  }

  return { users: everyone.length, awarded };
}

/** All badges with the user's progress toward each. */
export async function getAchievementBoard(userId: string) {
  const [defs, held, metrics] = await Promise.all([
    db
      .select()
      .from(achievements)
      .where(eq(achievements.isActive, true))
      .orderBy(asc(achievements.position)),
    db
      .select({
        achievementId: userAchievements.achievementId,
        unlockedAt: userAchievements.unlockedAt,
      })
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId)),
    getUserMetrics(userId),
  ]);

  const unlocked = new Map(held.map((h) => [h.achievementId, h.unlockedAt]));

  return defs.map((def) => {
    const metric = def.criteria?.metric as Metric | undefined;
    const threshold = def.criteria?.threshold ?? 0;
    const current = metric && METRICS.includes(metric) ? metrics[metric] : 0;

    return {
      id: def.id,
      code: def.code,
      title: def.title,
      description: def.description,
      icon: def.icon,
      tier: def.tier,
      unlockedAt: unlocked.get(def.id) ?? null,
      current: Math.min(current, threshold),
      threshold,
      // Progress is shown as a number as well as a bar, so the bar is never the
      // only thing carrying the information.
      percent: threshold > 0 ? Math.min(100, Math.round((current / threshold) * 100)) : 0,
      metric,
    };
  });
}

export async function countUnlocked(userId: string): Promise<number> {
  const [row] = await db
    .select({ n: sql<number>`cast(count(*) as int)` })
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));
  return row?.n ?? 0;
}

/** Cheap enough to call after a lesson completes, so badges feel immediate. */
export async function evaluateAchievementsQuietly(userId: string) {
  try {
    return await evaluateAchievements(userId);
  } catch (err) {
    console.error("[achievements] Inline evaluation failed", err);
    return [];
  }
}

export async function hasAchievement(userId: string, code: string): Promise<boolean> {
  const [row] = await db
    .select({ id: userAchievements.id })
    .from(userAchievements)
    .innerJoin(achievements, eq(achievements.id, userAchievements.achievementId))
    .where(and(eq(userAchievements.userId, userId), eq(achievements.code, code)))
    .limit(1);
  return Boolean(row);
}
