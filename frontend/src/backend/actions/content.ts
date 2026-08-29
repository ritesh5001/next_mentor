"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/backend/db";
import {
  mentorshipSlots,
  promoAssets,
  trainingModules,
} from "@/backend/db/schema";
import { requireAdmin } from "@/backend/lib/permissions";
import { createImageUpload, deleteObject } from "@/backend/lib/r2";
import { createDirectUpload, deleteVideo } from "@/backend/lib/cloudflare-stream";
import type { ActionState } from "@/shared/action-state";

export type { ActionState };

/**
 * Admin management for the Phase 4 content tables.
 *
 * Without these, /dashboard/promo, /dashboard/training and
 * /dashboard/mentorship render their empty states forever — the read paths and
 * the pages existed, but nothing could ever put a row in front of them.
 */

/* ---------------------------------------------------------- promo assets */

const promoSchema = z.object({
  title: z.string().trim().min(2, "Give the asset a title").max(120),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  type: z.enum(["banner", "video", "script", "pdf"]),
  bodyText: z.string().trim().max(5000).optional().or(z.literal("")),
  dimensions: z.string().trim().max(40).optional().or(z.literal("")),
  planRequiredId: z.string().trim().optional().or(z.literal("")),
  position: z.coerce.number().int().min(0).max(999).default(0),
});

export async function createPromoAssetAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = promoSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") ?? "",
    type: formData.get("type"),
    bodyText: formData.get("bodyText") ?? "",
    dimensions: formData.get("dimensions") ?? "",
    planRequiredId: formData.get("planRequiredId") ?? "",
    position: formData.get("position") || 0,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;
  const r2Key = (formData.get("r2Key") as string) || null;

  // A "script" is copy to be pasted, so it needs body text. Everything else is
  // a file, so it needs an upload. Saving one without the other produces a card
  // on the affiliate's page with nothing behind it.
  if (d.type === "script" && !d.bodyText) {
    return { error: "A script asset needs its copy in the body field." };
  }
  if (d.type !== "script" && !r2Key) {
    return { error: "Upload the file before saving." };
  }

  await db.insert(promoAssets).values({
    title: d.title,
    description: d.description || null,
    type: d.type,
    r2Key,
    bodyText: d.bodyText || null,
    dimensions: d.dimensions || null,
    planRequiredId: d.planRequiredId || null,
    position: d.position,
  });

  revalidatePath("/admin/content");
  revalidatePath("/dashboard/promo");
  return { success: `Added ${d.title}` };
}

export async function setPromoAssetActiveAction(
  id: string,
  isActive: boolean,
): Promise<ActionState> {
  await requireAdmin();

  await db.update(promoAssets).set({ isActive }).where(eq(promoAssets.id, id));

  revalidatePath("/admin/content");
  revalidatePath("/dashboard/promo");
  return { success: isActive ? "Published" : "Hidden" };
}

export async function deletePromoAssetAction(id: string): Promise<ActionState> {
  await requireAdmin();

  const [row] = await db
    .delete(promoAssets)
    .where(eq(promoAssets.id, id))
    .returning({ r2Key: promoAssets.r2Key });

  // Drop the file too, or it bills forever with nothing pointing at it.
  if (row?.r2Key) await deleteObject(row.r2Key);

  revalidatePath("/admin/content");
  revalidatePath("/dashboard/promo");
  return { success: "Deleted" };
}

/**
 * Presigned PUT for a promotional file. The browser uploads straight to R2.
 */
export async function requestPromoUploadAction(input: {
  contentType: string;
  contentLength: number;
}): Promise<{ uploadUrl: string; key: string } | { error: string }> {
  await requireAdmin();

  const result = await createImageUpload({
    prefix: "promo",
    contentType: input.contentType,
    contentLength: input.contentLength,
  });

  if ("error" in result) return result;
  return { uploadUrl: result.uploadUrl, key: result.key };
}

/* ------------------------------------------------------- training modules */

const trainingSchema = z.object({
  title: z.string().trim().min(2, "Give the module a title").max(120),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  planRequiredId: z.string().trim().optional().or(z.literal("")),
  position: z.coerce.number().int().min(0).max(999).default(0),
});

export async function createTrainingModuleAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = trainingSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") ?? "",
    planRequiredId: formData.get("planRequiredId") ?? "",
    position: formData.get("position") || 0,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;

  await db.insert(trainingModules).values({
    title: d.title,
    description: d.description || null,
    planRequiredId: d.planRequiredId || null,
    position: d.position,
  });

  revalidatePath("/admin/content");
  revalidatePath("/dashboard/training");
  return { success: `Added ${d.title}. Upload its video next.` };
}

/** Same direct-creator-upload pipeline as course lessons. */
export async function requestTrainingUploadAction(
  moduleId: string,
): Promise<{ uploadUrl: string; videoId: string } | { error: string }> {
  await requireAdmin();

  const [mod] = await db
    .select({ id: trainingModules.id, existing: trainingModules.streamVideoId })
    .from(trainingModules)
    .where(eq(trainingModules.id, moduleId))
    .limit(1);

  if (!mod) return { error: "That module no longer exists." };

  try {
    const { uploadUrl, videoId } = await createDirectUpload({
      lessonId: mod.id,
      courseId: "affiliate-training",
    });

    await db
      .update(trainingModules)
      .set({ streamVideoId: videoId })
      .where(eq(trainingModules.id, moduleId));

    if (mod.existing && mod.existing !== videoId) {
      try {
        await deleteVideo(mod.existing);
      } catch (err) {
        console.error("[content] Stream delete failed", mod.existing, err);
      }
    }

    return { uploadUrl, videoId };
  } catch (err) {
    console.error("[content] Could not create training upload", err);
    return { error: "Could not start the upload. Check the Cloudflare credentials." };
  }
}

export async function deleteTrainingModuleAction(id: string): Promise<ActionState> {
  await requireAdmin();

  const [row] = await db
    .delete(trainingModules)
    .where(eq(trainingModules.id, id))
    .returning({ streamVideoId: trainingModules.streamVideoId });

  if (row?.streamVideoId) {
    try {
      await deleteVideo(row.streamVideoId);
    } catch (err) {
      console.error("[content] Stream delete failed", row.streamVideoId, err);
    }
  }

  revalidatePath("/admin/content");
  revalidatePath("/dashboard/training");
  return { success: "Deleted" };
}

/* -------------------------------------------------------- mentorship slots */

const slotSchema = z.object({
  title: z.string().trim().min(2, "Give the session a title").max(120),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  mentorName: z.string().trim().min(2, "Who is running it?").max(80),
  startsAt: z.string().min(1, "Pick a start time"),
  durationMinutes: z.coerce.number().int().min(15).max(480),
  capacity: z.coerce.number().int().min(1).max(500),
  meetingUrl: z.string().trim().url("Enter a valid meeting link").optional().or(z.literal("")),
  planRequiredId: z.string().trim().optional().or(z.literal("")),
});

export async function createMentorshipSlotAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const admin = await requireAdmin();

  const parsed = slotSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") ?? "",
    mentorName: formData.get("mentorName"),
    startsAt: formData.get("startsAt"),
    durationMinutes: formData.get("durationMinutes") || 60,
    capacity: formData.get("capacity") || 1,
    meetingUrl: formData.get("meetingUrl") ?? "",
    planRequiredId: formData.get("planRequiredId") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;
  const startsAt = new Date(d.startsAt);

  if (Number.isNaN(startsAt.getTime())) {
    return { error: "That start time is not valid." };
  }
  // A session in the past can never be booked — the read query filters it out —
  // so saving one just creates a row nobody will ever see.
  if (startsAt <= new Date()) {
    return { error: "Pick a start time in the future." };
  }

  await db.insert(mentorshipSlots).values({
    mentorId: admin.id,
    mentorName: d.mentorName,
    title: d.title,
    description: d.description || null,
    startsAt,
    endsAt: new Date(startsAt.getTime() + d.durationMinutes * 60 * 1000),
    capacity: d.capacity,
    meetingUrl: d.meetingUrl || null,
    planRequiredId: d.planRequiredId || null,
  });

  revalidatePath("/admin/content");
  revalidatePath("/dashboard/mentorship");
  return { success: `Scheduled ${d.title}` };
}

export async function cancelMentorshipSlotAction(id: string): Promise<ActionState> {
  await requireAdmin();

  // Cancel rather than delete: the bookings are a record of who signed up, and
  // dropping the row would cascade them away.
  await db
    .update(mentorshipSlots)
    .set({ isCancelled: true })
    .where(eq(mentorshipSlots.id, id));

  revalidatePath("/admin/content");
  revalidatePath("/dashboard/mentorship");
  return { success: "Session cancelled. Booked attendees keep their record." };
}
