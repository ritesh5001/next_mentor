import { and, asc, desc, eq, gt, isNull, or, sql } from "drizzle-orm";
import { cached } from "@/lib/cache";

import { db } from "@/db";
import { plans, subscriptions } from "@/db/schema";

export const PLANS_TAG = "plans";

/**
 * Membership tiers and the subscriptions held against them.
 */

async function queryActivePlans() {
  return db
    .select({
      id: plans.id,
      slug: plans.slug,
      name: plans.name,
      tagline: plans.tagline,
      priceInPaise: plans.priceInPaise,
      mrpInPaise: plans.mrpInPaise,
      durationDays: plans.durationDays,
      features: plans.features,
      grantsAllCourses: plans.grantsAllCourses,
      isFeatured: plans.isFeatured,
      commissionRateBps: plans.commissionRateBps,
    })
    .from(plans)
    .where(eq(plans.isActive, true))
    .orderBy(asc(plans.position), asc(plans.priceInPaise));
}

/** Identical for every visitor, so cached and invalidated by tag on edit. */
export const getActivePlans = cached(queryActivePlans, ["plans"].join(":"), { tags: [PLANS_TAG], ttlSeconds: 3600 });

export type ActivePlan = Awaited<ReturnType<typeof queryActivePlans>>[number];

/**
 * The user's live membership, or null.
 *
 * "Live" means status active AND not past its expiry — a row can sit at
 * `active` after its date has passed if no cron has swept it yet, so the date
 * is checked here rather than trusted from the status column alone.
 */
export async function getActiveSubscription(userId: string) {
  const [row] = await db
    .select({
      id: subscriptions.id,
      planId: plans.id,
      planName: plans.name,
      planSlug: plans.slug,
      commissionRateBps: plans.commissionRateBps,
      grantsAllCourses: plans.grantsAllCourses,
      startsAt: subscriptions.startsAt,
      expiresAt: subscriptions.expiresAt,
    })
    .from(subscriptions)
    .innerJoin(plans, eq(plans.id, subscriptions.planId))
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, "active"),
        or(isNull(subscriptions.expiresAt), gt(subscriptions.expiresAt, new Date())),
      ),
    )
    .orderBy(desc(plans.priceInPaise))
    .limit(1);

  return row ?? null;
}

/**
 * The commission rate the user earns, in basis points.
 *
 * Phase 3's commission engine reads this. Someone with no plan earns nothing,
 * which is the intended default — the tier is what unlocks earning.
 */
export async function getCommissionRateBps(userId: string): Promise<number> {
  const sub = await getActiveSubscription(userId);
  return sub?.commissionRateBps ?? 0;
}

/** True when an active plan grants blanket access to the catalog. */
export async function hasAllCourseAccess(userId: string): Promise<boolean> {
  const sub = await getActiveSubscription(userId);
  return sub?.grantsAllCourses ?? false;
}

export async function getPlanBySlug(slug: string) {
  const [row] = await db.select().from(plans).where(eq(plans.slug, slug)).limit(1);
  return row ?? null;
}

export async function listPlansForAdmin() {
  return db
    .select({
      id: plans.id,
      slug: plans.slug,
      name: plans.name,
      // tagline, mrp and features are here for the edit form to prefill.
      // Without them an admin opening a plan would be shown blank inputs and
      // would silently wipe the values on save.
      tagline: plans.tagline,
      priceInPaise: plans.priceInPaise,
      mrpInPaise: plans.mrpInPaise,
      durationDays: plans.durationDays,
      commissionRateBps: plans.commissionRateBps,
      features: plans.features,
      grantsAllCourses: plans.grantsAllCourses,
      isActive: plans.isActive,
      isFeatured: plans.isFeatured,
      position: plans.position,
      memberCount: sql<number>`cast((
        select count(*) from ${subscriptions}
        where ${subscriptions.planId} = ${plans.id}
          and ${subscriptions.status} = 'active'
      ) as int)`,
    })
    .from(plans)
    .orderBy(asc(plans.position), asc(plans.priceInPaise));
}

/**
 * Marks lapsed subscriptions expired.
 *
 * Called by the daily cron. Read paths already check the date, so this is
 * housekeeping to keep reporting honest — not the thing that enforces expiry.
 */
export async function expireLapsedSubscriptions() {
  const result = await db
    .update(subscriptions)
    .set({ status: "expired", updatedAt: new Date() })
    .where(
      and(
        eq(subscriptions.status, "active"),
        sql`${subscriptions.expiresAt} is not null and ${subscriptions.expiresAt} <= now()`,
      ),
    )
    .returning({ id: subscriptions.id });

  return result.length;
}
