import "server-only";

import { and, asc, desc, eq, gt, isNull, or, sql } from "drizzle-orm";

import { db } from "@/backend/db";
import {
  communityComments,
  communityPosts,
  leads,
  mentorshipBookings,
  mentorshipSlots,
  plans,
  promoAssets,
  subscriptions,
  trainingModules,
  users,
} from "@/backend/db/schema";

/** Read paths for the Phase 4 surfaces. */

/* ---------------------------------------------------------------------- leads */

export async function getLeads(ownerId: string) {
  return db
    .select()
    .from(leads)
    .where(eq(leads.ownerId, ownerId))
    .orderBy(desc(leads.createdAt));
}

export async function getLeadStats(ownerId: string) {
  const [row] = await db
    .select({
      total: sql<number>`cast(count(*) as int)`,
      new: sql<number>`cast(count(*) filter (where ${leads.status} = 'new') as int)`,
      contacted: sql<number>`cast(count(*) filter (where ${leads.status} = 'contacted') as int)`,
      qualified: sql<number>`cast(count(*) filter (where ${leads.status} = 'qualified') as int)`,
      converted: sql<number>`cast(count(*) filter (where ${leads.status} = 'converted') as int)`,
      lost: sql<number>`cast(count(*) filter (where ${leads.status} = 'lost') as int)`,
    })
    .from(leads)
    .where(eq(leads.ownerId, ownerId));

  return row ?? { total: 0, new: 0, contacted: 0, qualified: 0, converted: 0, lost: 0 };
}

/* ------------------------------------------------------------------ community */

export async function getCommunityFeed(params: { category?: string; limit?: number } = {}) {
  return db
    .select({
      id: communityPosts.id,
      title: communityPosts.title,
      body: communityPosts.body,
      category: communityPosts.category,
      isPinned: communityPosts.isPinned,
      isLocked: communityPosts.isLocked,
      commentCount: communityPosts.commentCount,
      createdAt: communityPosts.createdAt,
      authorId: communityPosts.authorId,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(communityPosts)
    .innerJoin(users, eq(users.id, communityPosts.authorId))
    .where(
      and(
        // Hidden posts are excluded everywhere; moderation is a soft delete.
        isNull(communityPosts.hiddenAt),
        params.category ? eq(communityPosts.category, params.category) : undefined,
      ),
    )
    .orderBy(desc(communityPosts.isPinned), desc(communityPosts.createdAt))
    .limit(Math.min(params.limit ?? 50, 100));
}

export async function getPostWithComments(postId: string) {
  const [post] = await db
    .select({
      id: communityPosts.id,
      title: communityPosts.title,
      body: communityPosts.body,
      category: communityPosts.category,
      isPinned: communityPosts.isPinned,
      isLocked: communityPosts.isLocked,
      createdAt: communityPosts.createdAt,
      authorId: communityPosts.authorId,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(communityPosts)
    .innerJoin(users, eq(users.id, communityPosts.authorId))
    .where(and(eq(communityPosts.id, postId), isNull(communityPosts.hiddenAt)))
    .limit(1);

  if (!post) return null;

  const comments = await db
    .select({
      id: communityComments.id,
      body: communityComments.body,
      createdAt: communityComments.createdAt,
      authorId: communityComments.authorId,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(communityComments)
    .innerJoin(users, eq(users.id, communityComments.authorId))
    .where(and(eq(communityComments.postId, postId), isNull(communityComments.hiddenAt)))
    .orderBy(asc(communityComments.createdAt));

  return { post, comments };
}

/* ----------------------------------------------------------------- mentorship */

/**
 * Upcoming sessions, with whether this user has booked and may see the link.
 *
 * The meeting URL is only returned to someone with a live booking — otherwise
 * anyone could read it off the page and join a session they did not book.
 */
export async function getMentorshipSlots(userId: string) {
  const rows = await db
    .select({
      id: mentorshipSlots.id,
      title: mentorshipSlots.title,
      description: mentorshipSlots.description,
      mentorName: mentorshipSlots.mentorName,
      startsAt: mentorshipSlots.startsAt,
      endsAt: mentorshipSlots.endsAt,
      capacity: mentorshipSlots.capacity,
      bookedCount: mentorshipSlots.bookedCount,
      meetingUrl: mentorshipSlots.meetingUrl,
      planRequiredId: mentorshipSlots.planRequiredId,
      planRequiredName: plans.name,
      myBookingId: mentorshipBookings.id,
    })
    .from(mentorshipSlots)
    .leftJoin(plans, eq(plans.id, mentorshipSlots.planRequiredId))
    .leftJoin(
      mentorshipBookings,
      and(
        eq(mentorshipBookings.slotId, mentorshipSlots.id),
        eq(mentorshipBookings.userId, userId),
      ),
    )
    .where(
      and(eq(mentorshipSlots.isCancelled, false), gt(mentorshipSlots.startsAt, new Date())),
    )
    .orderBy(asc(mentorshipSlots.startsAt));

  return rows.map((r) => ({
    ...r,
    isBooked: r.myBookingId !== null,
    seatsLeft: Math.max(0, r.capacity - r.bookedCount),
    // Strip the link unless they hold a booking.
    meetingUrl: r.myBookingId ? r.meetingUrl : null,
  }));
}

/* --------------------------------------------------- promo + training assets */

/** The user's active plan id, or null. Used for content gating. */
async function activePlanId(userId: string): Promise<string | null> {
  const [row] = await db
    .select({ planId: subscriptions.planId })
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, "active"),
        or(isNull(subscriptions.expiresAt), gt(subscriptions.expiresAt, new Date())),
      ),
    )
    .limit(1);

  return row?.planId ?? null;
}

export async function getPromoAssets(userId: string) {
  const myPlanId = await activePlanId(userId);

  const rows = await db
    .select({
      id: promoAssets.id,
      title: promoAssets.title,
      description: promoAssets.description,
      type: promoAssets.type,
      r2Key: promoAssets.r2Key,
      bodyText: promoAssets.bodyText,
      dimensions: promoAssets.dimensions,
      planRequiredId: promoAssets.planRequiredId,
      planRequiredName: plans.name,
    })
    .from(promoAssets)
    .leftJoin(plans, eq(plans.id, promoAssets.planRequiredId))
    .where(eq(promoAssets.isActive, true))
    .orderBy(asc(promoAssets.position));

  return rows.map((r) => {
    const locked = r.planRequiredId !== null && r.planRequiredId !== myPlanId;
    return {
      ...r,
      locked,
      // Locked rows keep their title and description as a teaser, but the
      // downloadable key and the copy itself are withheld server-side.
      r2Key: locked ? null : r.r2Key,
      bodyText: locked ? null : r.bodyText,
    };
  });
}

export async function getTrainingModules(userId: string) {
  const myPlanId = await activePlanId(userId);

  const rows = await db
    .select({
      id: trainingModules.id,
      title: trainingModules.title,
      description: trainingModules.description,
      streamVideoId: trainingModules.streamVideoId,
      durationSeconds: trainingModules.durationSeconds,
      planRequiredId: trainingModules.planRequiredId,
      planRequiredName: plans.name,
    })
    .from(trainingModules)
    .leftJoin(plans, eq(plans.id, trainingModules.planRequiredId))
    .where(eq(trainingModules.isActive, true))
    .orderBy(asc(trainingModules.position));

  return rows.map((r) => {
    const locked = r.planRequiredId !== null && r.planRequiredId !== myPlanId;
    return { ...r, locked, streamVideoId: locked ? null : r.streamVideoId };
  });
}
