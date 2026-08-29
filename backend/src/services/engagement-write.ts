import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  communityComments,
  communityPosts,
  leads,
  mentorshipBookings,
  mentorshipSlots,
  subscriptions,
} from "@/db/schema";

/**
 * Mutations for the engagement features.
 *
 * Lifted out of the old Server Actions. Auth now happens in middleware, so
 * these take the caller's id as an argument and enforce OWNERSHIP — the check
 * that a row belongs to the person editing it.
 */

export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

export async function createLead(input: {
  ownerId: string;
  name: string;
  email?: string;
  phone?: string;
  source?: string;
  notes?: string;
}) {
  await db.insert(leads).values({
    ownerId: input.ownerId,
    name: input.name,
    email: input.email || null,
    phone: input.phone || null,
    source: input.source || null,
    notes: input.notes || null,
    status: "new",
  });
}

export async function updateLeadStatus(
  leadId: string,
  ownerId: string,
  status: LeadStatus,
): Promise<boolean> {
  // Scoped to the owner: without this any signed-in user could move anybody's
  // leads by guessing an id.
  const updated = await db
    .update(leads)
    .set({
      status,
      lastContactedAt: status === "contacted" ? new Date() : undefined,
      updatedAt: new Date(),
    })
    .where(and(eq(leads.id, leadId), eq(leads.ownerId, ownerId)))
    .returning({ id: leads.id });

  return updated.length > 0;
}

export async function deleteLead(leadId: string, ownerId: string) {
  await db.delete(leads).where(and(eq(leads.id, leadId), eq(leads.ownerId, ownerId)));
}

export async function createPost(input: {
  authorId: string;
  title: string;
  body: string;
  category: string;
}) {
  await db.insert(communityPosts).values(input);
}

export async function createComment(input: {
  postId: string;
  authorId: string;
  body: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const [post] = await db
    .select({
      id: communityPosts.id,
      isLocked: communityPosts.isLocked,
      hiddenAt: communityPosts.hiddenAt,
    })
    .from(communityPosts)
    .where(eq(communityPosts.id, input.postId))
    .limit(1);

  if (!post || post.hiddenAt) return { ok: false, error: "That post is no longer available." };
  if (post.isLocked) return { ok: false, error: "This thread is locked." };

  await db.transaction(async (tx) => {
    await tx.insert(communityComments).values(input);

    // Denormalised count, incremented in the same transaction so the feed never
    // shows a number that disagrees with the thread.
    await tx
      .update(communityPosts)
      .set({ commentCount: sql`${communityPosts.commentCount} + 1`, updatedAt: new Date() })
      .where(eq(communityPosts.id, input.postId));
  });

  return { ok: true };
}

export async function hidePost(
  postId: string,
  userId: string,
  isAdmin: boolean,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const [post] = await db
    .select({ authorId: communityPosts.authorId })
    .from(communityPosts)
    .where(eq(communityPosts.id, postId))
    .limit(1);

  if (!post) return { ok: false, error: "That post no longer exists." };
  if (post.authorId !== userId && !isAdmin) {
    return { ok: false, error: "You can only remove your own posts." };
  }

  // Soft delete: the thread and its replies survive, so moderating one post
  // does not erase other people's contributions.
  await db
    .update(communityPosts)
    .set({
      hiddenAt: new Date(),
      hiddenReason: isAdmin ? "Removed by a moderator" : "Removed by the author",
    })
    .where(eq(communityPosts.id, postId));

  return { ok: true };
}

export async function setPostPinned(postId: string, isPinned: boolean) {
  await db.update(communityPosts).set({ isPinned }).where(eq(communityPosts.id, postId));
}

export async function setPostLocked(postId: string, isLocked: boolean) {
  await db.update(communityPosts).set({ isLocked }).where(eq(communityPosts.id, postId));
}

/**
 * Books a mentorship seat.
 *
 * Capacity, plan gating and double-booking are checked in one transaction with
 * the slot row locked — otherwise two people clicking at once both read the
 * same bookedCount and a 1-seat slot ends up with two bookings.
 */
export async function bookSlot(
  slotId: string,
  userId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  return db.transaction(async (tx) => {
    const [slot] = await tx
      .select()
      .from(mentorshipSlots)
      .where(eq(mentorshipSlots.id, slotId))
      .limit(1)
      .for("update");

    if (!slot || slot.isCancelled) {
      return { ok: false as const, error: "That session is no longer available." };
    }
    if (slot.startsAt <= new Date()) {
      return { ok: false as const, error: "That session has already started." };
    }
    if (slot.bookedCount >= slot.capacity) {
      return { ok: false as const, error: "That session is fully booked." };
    }

    if (slot.planRequiredId) {
      const [sub] = await tx
        .select({ planId: subscriptions.planId })
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, userId),
            eq(subscriptions.status, "active"),
            sql`(${subscriptions.expiresAt} is null or ${subscriptions.expiresAt} > now())`,
          ),
        )
        .limit(1);

      if (!sub || sub.planId !== slot.planRequiredId) {
        return { ok: false as const, error: "This session is only available on a higher plan." };
      }
    }

    const inserted = await tx
      .insert(mentorshipBookings)
      .values({ slotId, userId })
      // UNIQUE(slotId, userId) — a second click is a no-op, not a second seat.
      .onConflictDoNothing()
      .returning({ id: mentorshipBookings.id });

    if (inserted.length === 0) {
      return { ok: false as const, error: "You have already booked this session." };
    }

    await tx
      .update(mentorshipSlots)
      .set({ bookedCount: sql`${mentorshipSlots.bookedCount} + 1` })
      .where(eq(mentorshipSlots.id, slotId));

    return { ok: true as const };
  });
}

export async function cancelBooking(
  slotId: string,
  userId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  return db.transaction(async (tx) => {
    const deleted = await tx
      .delete(mentorshipBookings)
      .where(and(eq(mentorshipBookings.slotId, slotId), eq(mentorshipBookings.userId, userId)))
      .returning({ id: mentorshipBookings.id });

    if (deleted.length === 0) {
      return { ok: false as const, error: "You do not have a booking for that session." };
    }

    // greatest(...,0) so a miscount can never drive the seat count negative and
    // make a full slot look bookable.
    await tx
      .update(mentorshipSlots)
      .set({ bookedCount: sql`greatest(${mentorshipSlots.bookedCount} - 1, 0)` })
      .where(eq(mentorshipSlots.id, slotId));

    return { ok: true as const };
  });
}
