"use server";

import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/backend/db";
import {
  communityComments,
  communityPosts,
  leads,
  mentorshipBookings,
  mentorshipSlots,
  subscriptions,
} from "@/backend/db/schema";
import { requireUser, requireAdmin } from "@/backend/lib/permissions";
import { issueCertificate } from "@/backend/services/certificates";
import { evaluateAchievements } from "@/backend/services/achievements";
import type { ActionState } from "@/shared/action-state";

export type { ActionState };

/* --------------------------------------------------------------- certificates */

export async function issueCertificateAction(courseId: string): Promise<ActionState> {
  const user = await requireUser();

  const result = await issueCertificate(user.id, courseId);

  switch (result.status) {
    case "issued":
      // Earning a certificate can unlock a badge, so re-evaluate right away
      // rather than making the user wait for the nightly job.
      await evaluateAchievements(user.id);
      revalidatePath("/dashboard/certificates");
      return { success: `Certificate ${result.serial} issued.` };
    case "already_issued":
      return { success: `You already have certificate ${result.serial}.` };
    case "not_enrolled":
      return { error: "You are not enrolled in that course." };
    case "incomplete":
      return {
        error: `Finish all lessons first — ${result.completed} of ${result.total} complete.`,
      };
  }
}

/* ---------------------------------------------------------------------- leads */

const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter a name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email").optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?91[-\s]?)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .optional()
    .or(z.literal("")),
  source: z.string().trim().max(60).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export async function createLeadAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();

  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    source: formData.get("source") ?? "",
    notes: formData.get("notes") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;
  if (!d.email && !d.phone) {
    return { error: "Add an email or a phone number so you can follow up." };
  }

  await db.insert(leads).values({
    ownerId: user.id,
    name: d.name,
    email: d.email || null,
    phone: d.phone || null,
    source: d.source || null,
    notes: d.notes || null,
    status: "new",
  });

  revalidatePath("/dashboard/leads");
  return { success: "Lead added" };
}

export async function updateLeadStatusAction(
  leadId: string,
  status: "new" | "contacted" | "qualified" | "converted" | "lost",
): Promise<ActionState> {
  const user = await requireUser();

  const updated = await db
    .update(leads)
    .set({
      status,
      lastContactedAt: status === "contacted" ? new Date() : undefined,
      updatedAt: new Date(),
    })
    // Scoped to the owner: without this, any signed-in user could move
    // anybody's leads by guessing an id.
    .where(and(eq(leads.id, leadId), eq(leads.ownerId, user.id)))
    .returning({ id: leads.id });

  if (updated.length === 0) return { error: "That lead was not found." };

  revalidatePath("/dashboard/leads");
  return { success: `Moved to ${status}` };
}

export async function deleteLeadAction(leadId: string): Promise<ActionState> {
  const user = await requireUser();

  await db.delete(leads).where(and(eq(leads.id, leadId), eq(leads.ownerId, user.id)));

  revalidatePath("/dashboard/leads");
  return { success: "Lead removed" };
}

/* ------------------------------------------------------------------ community */

const postSchema = z.object({
  title: z.string().trim().min(4, "Give your post a title").max(140),
  body: z.string().trim().min(10, "Say a little more").max(10_000),
  category: z.enum(["general", "wins", "questions", "resources"]),
});

export async function createPostAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    category: formData.get("category") ?? "general",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  await db.insert(communityPosts).values({
    authorId: user.id,
    title: parsed.data.title,
    body: parsed.data.body,
    category: parsed.data.category,
  });

  revalidatePath("/dashboard/community");
  return { success: "Posted" };
}

export async function createCommentAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();

  const postId = formData.get("postId");
  const body = formData.get("body");

  if (typeof postId !== "string" || typeof body !== "string") {
    return { error: "Something went wrong. Try again." };
  }

  const text = body.trim();
  if (text.length < 2) return { error: "Write a reply first." };
  if (text.length > 5000) return { error: "That reply is too long." };

  const [post] = await db
    .select({ id: communityPosts.id, isLocked: communityPosts.isLocked, hiddenAt: communityPosts.hiddenAt })
    .from(communityPosts)
    .where(eq(communityPosts.id, postId))
    .limit(1);

  if (!post || post.hiddenAt) return { error: "That post is no longer available." };
  if (post.isLocked) return { error: "This thread is locked." };

  await db.transaction(async (tx) => {
    await tx.insert(communityComments).values({
      postId,
      authorId: user.id,
      body: text,
    });

    // Denormalised count, incremented in the same transaction so the feed
    // never shows a number that disagrees with the thread.
    await tx
      .update(communityPosts)
      .set({ commentCount: sql`${communityPosts.commentCount} + 1`, updatedAt: new Date() })
      .where(eq(communityPosts.id, postId));
  });

  revalidatePath(`/dashboard/community/${postId}`);
  return { success: "Reply posted" };
}

/** Authors may delete their own post; admins may hide anyone's. */
export async function hidePostAction(postId: string, reason?: string): Promise<ActionState> {
  const user = await requireUser();

  const [post] = await db
    .select({ authorId: communityPosts.authorId })
    .from(communityPosts)
    .where(eq(communityPosts.id, postId))
    .limit(1);

  if (!post) return { error: "That post no longer exists." };

  if (post.authorId !== user.id && user.role !== "admin") {
    return { error: "You can only remove your own posts." };
  }

  // Soft delete: the thread and its replies survive, so a moderated post does
  // not silently erase other people's contributions.
  await db
    .update(communityPosts)
    .set({
      hiddenAt: new Date(),
      hiddenReason: reason?.slice(0, 200) ?? (user.role === "admin" ? "Removed by a moderator" : "Removed by the author"),
    })
    .where(eq(communityPosts.id, postId));

  revalidatePath("/dashboard/community");
  return { success: "Post removed" };
}

export async function setPostPinnedAction(
  postId: string,
  isPinned: boolean,
): Promise<ActionState> {
  await requireAdmin();

  await db.update(communityPosts).set({ isPinned }).where(eq(communityPosts.id, postId));

  revalidatePath("/dashboard/community");
  return { success: isPinned ? "Pinned" : "Unpinned" };
}

export async function setPostLockedAction(
  postId: string,
  isLocked: boolean,
): Promise<ActionState> {
  await requireAdmin();

  await db.update(communityPosts).set({ isLocked }).where(eq(communityPosts.id, postId));

  revalidatePath("/dashboard/community");
  return { success: isLocked ? "Thread locked" : "Thread unlocked" };
}

/* ----------------------------------------------------------------- mentorship */

/**
 * Books a mentorship slot.
 *
 * Capacity, plan gating and double-booking are all checked inside one
 * transaction with the slot row locked — otherwise two people clicking at once
 * both read the same `bookedCount` and a 1-seat slot ends up with two bookings.
 */
export async function bookSlotAction(slotId: string): Promise<ActionState> {
  const user = await requireUser();

  return db.transaction(async (tx) => {
    const [slot] = await tx
      .select()
      .from(mentorshipSlots)
      .where(eq(mentorshipSlots.id, slotId))
      .limit(1)
      .for("update");

    if (!slot || slot.isCancelled) return { error: "That session is no longer available." };
    if (slot.startsAt <= new Date()) return { error: "That session has already started." };
    if (slot.bookedCount >= slot.capacity) return { error: "That session is fully booked." };

    if (slot.planRequiredId) {
      const [sub] = await tx
        .select({ planId: subscriptions.planId })
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, user.id),
            eq(subscriptions.status, "active"),
            sql`(${subscriptions.expiresAt} is null or ${subscriptions.expiresAt} > now())`,
          ),
        )
        .limit(1);

      if (!sub || sub.planId !== slot.planRequiredId) {
        return { error: "This session is only available on a higher plan." };
      }
    }

    const inserted = await tx
      .insert(mentorshipBookings)
      .values({ slotId, userId: user.id })
      // UNIQUE(slotId, userId) — a second click is a no-op, not a second seat.
      .onConflictDoNothing()
      .returning({ id: mentorshipBookings.id });

    if (inserted.length === 0) return { error: "You have already booked this session." };

    await tx
      .update(mentorshipSlots)
      .set({ bookedCount: sql`${mentorshipSlots.bookedCount} + 1` })
      .where(eq(mentorshipSlots.id, slotId));

    revalidatePath("/dashboard/mentorship");
    return { success: "Booked. The joining link is on this page." };
  });
}

export async function cancelBookingAction(slotId: string): Promise<ActionState> {
  const user = await requireUser();

  return db.transaction(async (tx) => {
    const deleted = await tx
      .delete(mentorshipBookings)
      .where(
        and(eq(mentorshipBookings.slotId, slotId), eq(mentorshipBookings.userId, user.id)),
      )
      .returning({ id: mentorshipBookings.id });

    if (deleted.length === 0) return { error: "You do not have a booking for that session." };

    // greatest(...,0) so a miscount can never drive the seat count negative and
    // make a full slot look bookable.
    await tx
      .update(mentorshipSlots)
      .set({ bookedCount: sql`greatest(${mentorshipSlots.bookedCount} - 1, 0)` })
      .where(eq(mentorshipSlots.id, slotId));

    revalidatePath("/dashboard/mentorship");
    return { success: "Booking cancelled" };
  });
}
