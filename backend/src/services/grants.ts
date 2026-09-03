import { and, desc, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { courses, enrollments, plans, subscriptions, users } from "@/db/schema";

/**
 * Comped access: an administrator giving a user a course or a plan for free.
 *
 * For staff accounts, refunds handled outside Razorpay, giveaway winners, and
 * the support case where someone paid by other means.
 *
 * Three rules hold everywhere in this file.
 *
 * 1. A grant is NOT a sale. Nothing here touches orders, wallets or
 *    commissions. Referral commission is calculated inside the payment
 *    webhook against a real captured amount; routing a free grant through that
 *    path would pay an affiliate real money for a sale that never happened.
 * 2. A grant is auditable. `grantedById` records which administrator did it,
 *    and access is revoked by marking it revoked, never by deleting the row,
 *    so "who had access to this, and when" survives.
 * 3. A grant never overwrites a purchase. If someone already paid, the paid
 *    record is left exactly as it is.
 */

export type GrantResult =
  | { ok: true; created: boolean }
  | { error: string };

/* ------------------------------------------------------------------ course */

export async function grantCourse(params: {
  userId: string;
  courseId: string;
  grantedById: string;
}): Promise<GrantResult> {
  const [course] = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.id, params.courseId))
    .limit(1);
  if (!course) return { error: "That course no longer exists." };

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, params.userId))
    .limit(1);
  if (!user) return { error: "That user no longer exists." };

  const [existing] = await db
    .select({ id: enrollments.id, revokedAt: enrollments.revokedAt, orderId: enrollments.orderId })
    .from(enrollments)
    .where(
      and(eq(enrollments.userId, params.userId), eq(enrollments.courseId, params.courseId)),
    )
    .limit(1);

  if (existing) {
    // Already has live access, whether bought or comped. Nothing to do, and
    // saying so beats silently rewriting a paid enrollment as a gift.
    if (!existing.revokedAt) return { ok: true, created: false };

    // Reinstating. UNIQUE(userId, courseId) means there is one row per pair,
    // so this has to be an update rather than a second insert.
    await db
      .update(enrollments)
      .set({
        revokedAt: null,
        // Only claim authorship of the grant if this was not a purchase.
        grantedById: existing.orderId ? undefined : params.grantedById,
      })
      .where(eq(enrollments.id, existing.id));
    return { ok: true, created: true };
  }

  await db.insert(enrollments).values({
    userId: params.userId,
    courseId: params.courseId,
    // No order: this was not bought. Revenue reports join orders, so a comped
    // enrolment stays out of them without any special-casing.
    orderId: null,
    grantedById: params.grantedById,
  });

  return { ok: true, created: true };
}

export async function revokeCourse(userId: string, courseId: string): Promise<GrantResult> {
  const [row] = await db
    .update(enrollments)
    .set({ revokedAt: new Date() })
    .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)))
    .returning({ id: enrollments.id });

  return row ? { ok: true, created: false } : { error: "That user is not enrolled." };
}

/* -------------------------------------------------------------------- plan */

export async function grantPlan(params: {
  userId: string;
  planId: string;
  grantedById: string;
}): Promise<GrantResult> {
  const [plan] = await db
    .select({ id: plans.id, durationDays: plans.durationDays })
    .from(plans)
    .where(eq(plans.id, params.planId))
    .limit(1);
  if (!plan) return { error: "That plan no longer exists." };

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, params.userId))
    .limit(1);
  if (!user) return { error: "That user no longer exists." };

  // The plan's own duration decides the expiry, so a comped membership lapses
  // on the same schedule a bought one would. Null stays null: lifetime.
  const expiresAt = plan.durationDays
    ? new Date(Date.now() + plan.durationDays * 24 * 60 * 60 * 1000)
    : null;

  // One live membership at a time. An existing active subscription is moved
  // onto the granted plan rather than left running alongside it, because
  // getCommissionRateBps and the plan badge both read "the active one" and two
  // would make that ambiguous.
  const [active] = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(and(eq(subscriptions.userId, params.userId), eq(subscriptions.status, "active")))
    .limit(1);

  if (active) {
    await db
      .update(subscriptions)
      .set({
        planId: params.planId,
        expiresAt,
        startsAt: new Date(),
        cancelledAt: null,
        grantedById: params.grantedById,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.id, active.id));
    return { ok: true, created: false };
  }

  await db.insert(subscriptions).values({
    userId: params.userId,
    planId: params.planId,
    status: "active",
    expiresAt,
    grantedById: params.grantedById,
  });

  return { ok: true, created: true };
}

export async function revokePlan(userId: string): Promise<GrantResult> {
  const [row] = await db
    .update(subscriptions)
    .set({ status: "cancelled", cancelledAt: new Date(), updatedAt: new Date() })
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, "active")))
    .returning({ id: subscriptions.id });

  return row ? { ok: true, created: false } : { error: "That user has no active plan." };
}

/* ------------------------------------------------------------------ read */

/** What a user can currently reach, and whether they paid for it. */
export async function getUserAccess(userId: string) {
  const [enrolled, membership] = await Promise.all([
    db
      .select({
        courseId: courses.id,
        title: courses.title,
        slug: courses.slug,
        enrolledAt: enrollments.enrolledAt,
        revokedAt: enrollments.revokedAt,
        // No order means nobody paid: this was comped.
        isGranted: isNull(enrollments.orderId),
        grantedById: enrollments.grantedById,
      })
      .from(enrollments)
      .innerJoin(courses, eq(courses.id, enrollments.courseId))
      .where(eq(enrollments.userId, userId))
      .orderBy(desc(enrollments.enrolledAt)),

    db
      .select({
        subscriptionId: subscriptions.id,
        planId: plans.id,
        planName: plans.name,
        status: subscriptions.status,
        startsAt: subscriptions.startsAt,
        expiresAt: subscriptions.expiresAt,
        grantedById: subscriptions.grantedById,
      })
      .from(subscriptions)
      .innerJoin(plans, eq(plans.id, subscriptions.planId))
      .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, "active")))
      .limit(1),
  ]);

  return { enrolled, membership: membership[0] ?? null };
}
