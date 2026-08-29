"use server";

import { updateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq, max, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/backend/db";
import { courses, lessons, modules, orders } from "@/backend/db/schema";
import { requireInstructor, requireAdmin } from "@/backend/lib/permissions";
import { CATALOG_TAG, courseTag, uniqueSlug } from "@/backend/services/courses";
import { createDirectUpload, deleteVideo } from "@/backend/lib/cloudflare-stream";

import type { ActionState } from "@/shared/action-state";

export type { ActionState };

/**
 * Admin/instructor course management.
 *
 * Every action opens with a permissions call. Server Actions are public HTTP
 * endpoints — anyone can POST a forged payload at one — so the guard is the
 * only thing standing between a student and the ability to publish courses.
 */

const courseSchema = z.object({
  title: z.string().trim().min(3, "Title needs at least 3 characters").max(120),
  subtitle: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(5000).optional().or(z.literal("")),
  instructorName: z.string().trim().max(80).optional().or(z.literal("")),
  // Rupees in the form; paise in the database. The conversion happens here so
  // no other layer has to remember which unit it is holding.
  priceInRupees: z.coerce.number().int().min(0).max(1_000_000),
  mrpInRupees: z.coerce.number().int().min(0).max(1_000_000).optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  language: z.string().trim().min(2).max(20).default("en"),
});

function readCourseForm(formData: FormData) {
  return courseSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle") ?? "",
    description: formData.get("description") ?? "",
    instructorName: formData.get("instructorName") ?? "",
    priceInRupees: formData.get("priceInRupees"),
    mrpInRupees: formData.get("mrpInRupees") || undefined,
    level: formData.get("level"),
    language: formData.get("language") || "en",
  });
}

export async function createCourseAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireInstructor();

  const parsed = readCourseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;
  const slug = await uniqueSlug(d.title);

  const [created] = await db
    .insert(courses)
    .values({
      slug,
      title: d.title,
      subtitle: d.subtitle || null,
      description: d.description || null,
      instructorName: d.instructorName || null,
      priceInPaise: d.priceInRupees * 100,
      mrpInPaise: d.mrpInRupees ? d.mrpInRupees * 100 : null,
      level: d.level,
      language: d.language,
      status: "draft",
    })
    .returning({ id: courses.id });

  redirect(`/admin/courses/${created.id}`);
}

export async function updateCourseAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireInstructor();

  const courseId = formData.get("courseId");
  if (typeof courseId !== "string") return { error: "Missing course" };

  const parsed = readCourseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;

  const [existing] = await db
    .select({ slug: courses.slug, title: courses.title })
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  if (!existing) return { error: "That course no longer exists" };

  // Keep the slug stable once set — changing it silently breaks every link an
  // affiliate has already shared. It only moves if the title actually changed.
  const slug =
    existing.title === d.title ? existing.slug : await uniqueSlug(d.title, courseId);

  await db
    .update(courses)
    .set({
      slug,
      title: d.title,
      subtitle: d.subtitle || null,
      description: d.description || null,
      instructorName: d.instructorName || null,
      priceInPaise: d.priceInRupees * 100,
      mrpInPaise: d.mrpInRupees ? d.mrpInRupees * 100 : null,
      level: d.level,
      language: d.language,
      updatedAt: new Date(),
    })
    .where(eq(courses.id, courseId));

  updateTag(CATALOG_TAG);
  updateTag(courseTag(existing.slug));
  if (slug !== existing.slug) updateTag(courseTag(slug));
  revalidatePath(`/admin/courses/${courseId}`);

  return { success: "Saved" };
}

export async function setCourseStatusAction(
  courseId: string,
  status: "draft" | "published" | "archived",
): Promise<ActionState> {
  await requireInstructor();

  const [course] = await db
    .select({ slug: courses.slug, publishedAt: courses.publishedAt })
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  if (!course) return { error: "That course no longer exists" };

  if (status === "published") {
    // Publishing a course with no playable lesson puts a buy button in front of
    // an empty player. Refuse rather than let someone pay for nothing.
    const [{ readyCount }] = await db
      .select({ readyCount: sql<number>`cast(count(*) as int)` })
      .from(lessons)
      .innerJoin(modules, eq(modules.id, lessons.moduleId))
      .where(and(eq(modules.courseId, courseId), eq(lessons.videoStatus, "ready")));

    if (readyCount === 0) {
      return { error: "Add at least one lesson with a processed video before publishing." };
    }
  }

  await db
    .update(courses)
    .set({
      status,
      publishedAt: status === "published" ? (course.publishedAt ?? new Date()) : course.publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(courses.id, courseId));

  updateTag(CATALOG_TAG);
  updateTag(courseTag(course.slug));
  revalidatePath(`/admin/courses/${courseId}`);

  return { success: status === "published" ? "Course is live" : `Course set to ${status}` };
}

export async function deleteCourseAction(courseId: string): Promise<ActionState> {
  // Deletion is admin-only: an instructor can archive, but destroying a course
  // with live enrollments is not theirs to do.
  await requireAdmin();

  const [course] = await db
    .select({ slug: courses.slug })
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  if (!course) return { error: "That course no longer exists" };

  // orders.courseId is RESTRICT on purpose: a paid order is a financial record
  // and must survive the course being taken down. Deleting anyway would throw a
  // raw foreign-key error, so refuse here with something actionable.
  const [{ orderCount }] = await db
    .select({ orderCount: sql<number>`cast(count(*) as int)` })
    .from(orders)
    .where(eq(orders.courseId, courseId));

  if (orderCount > 0) {
    return {
      error: `This course has ${orderCount} order(s) and cannot be deleted — that would destroy financial records. Archive it instead to hide it from the catalog.`,
    };
  }

  // Clean up the hosted video before dropping the rows, or the Stream UIDs are
  // lost and the videos bill forever with nothing pointing at them.
  const videoRows = await db
    .select({ streamVideoId: lessons.streamVideoId })
    .from(lessons)
    .innerJoin(modules, eq(modules.id, lessons.moduleId))
    .where(eq(modules.courseId, courseId));

  for (const row of videoRows) {
    if (row.streamVideoId) {
      try {
        await deleteVideo(row.streamVideoId);
      } catch (err) {
        // A failed remote delete must not block the local delete; log it so it
        // can be reconciled rather than silently orphaned.
        console.error("[courses] Stream delete failed", row.streamVideoId, err);
      }
    }
  }

  await db.delete(courses).where(eq(courses.id, courseId));

  updateTag(CATALOG_TAG);
  updateTag(courseTag(course.slug));
  redirect("/admin/courses");
}

/* ------------------------------------------------------------------ modules */

export async function createModuleAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireInstructor();

  const courseId = formData.get("courseId");
  const title = formData.get("title");

  if (typeof courseId !== "string" || typeof title !== "string" || title.trim().length < 2) {
    return { error: "Enter a section title" };
  }

  const [{ maxPos }] = await db
    .select({ maxPos: max(modules.position) })
    .from(modules)
    .where(eq(modules.courseId, courseId));

  await db.insert(modules).values({
    courseId,
    title: title.trim().slice(0, 120),
    position: (maxPos ?? -1) + 1,
  });

  revalidatePath(`/admin/courses/${courseId}`);
  return { success: "Section added" };
}

export async function renameModuleAction(moduleId: string, title: string): Promise<ActionState> {
  await requireInstructor();
  if (title.trim().length < 2) return { error: "Enter a section title" };

  const [row] = await db
    .update(modules)
    .set({ title: title.trim().slice(0, 120) })
    .where(eq(modules.id, moduleId))
    .returning({ courseId: modules.courseId });

  if (row) revalidatePath(`/admin/courses/${row.courseId}`);
  return { success: "Renamed" };
}

export async function deleteModuleAction(moduleId: string): Promise<ActionState> {
  await requireInstructor();

  const videoRows = await db
    .select({ streamVideoId: lessons.streamVideoId })
    .from(lessons)
    .where(eq(lessons.moduleId, moduleId));

  const [row] = await db
    .delete(modules)
    .where(eq(modules.id, moduleId))
    .returning({ courseId: modules.courseId });

  for (const v of videoRows) {
    if (v.streamVideoId) {
      try {
        await deleteVideo(v.streamVideoId);
      } catch (err) {
        console.error("[courses] Stream delete failed", v.streamVideoId, err);
      }
    }
  }

  if (row) {
    revalidatePath(`/admin/courses/${row.courseId}`);
    updateTag(CATALOG_TAG);
  }
  return { success: "Section deleted" };
}

/* ------------------------------------------------------------------ lessons */

export async function createLessonAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireInstructor();

  const moduleId = formData.get("moduleId");
  const title = formData.get("title");

  if (typeof moduleId !== "string" || typeof title !== "string" || title.trim().length < 2) {
    return { error: "Enter a lesson title" };
  }

  const [{ maxPos }] = await db
    .select({ maxPos: max(lessons.position) })
    .from(lessons)
    .where(eq(lessons.moduleId, moduleId));

  await db.insert(lessons).values({
    moduleId,
    title: title.trim().slice(0, 160),
    position: (maxPos ?? -1) + 1,
  });

  const [mod] = await db
    .select({ courseId: modules.courseId })
    .from(modules)
    .where(eq(modules.id, moduleId))
    .limit(1);

  if (mod) revalidatePath(`/admin/courses/${mod.courseId}`);
  return { success: "Lesson added" };
}

export async function updateLessonAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireInstructor();

  const lessonId = formData.get("lessonId");
  const title = formData.get("title");
  const isFreePreview = formData.get("isFreePreview") === "on";

  if (typeof lessonId !== "string" || typeof title !== "string" || title.trim().length < 2) {
    return { error: "Enter a lesson title" };
  }

  await db
    .update(lessons)
    .set({ title: title.trim().slice(0, 160), isFreePreview, updatedAt: new Date() })
    .where(eq(lessons.id, lessonId));

  updateTag(CATALOG_TAG);
  return { success: "Saved" };
}

export async function deleteLessonAction(lessonId: string): Promise<ActionState> {
  await requireInstructor();

  const [row] = await db
    .delete(lessons)
    .where(eq(lessons.id, lessonId))
    .returning({ streamVideoId: lessons.streamVideoId, moduleId: lessons.moduleId });

  if (row?.streamVideoId) {
    try {
      await deleteVideo(row.streamVideoId);
    } catch (err) {
      console.error("[courses] Stream delete failed", row.streamVideoId, err);
    }
  }

  updateTag(CATALOG_TAG);
  return { success: "Lesson deleted" };
}

/**
 * Issues a one-time Cloudflare Stream upload URL for a lesson.
 *
 * The browser PUTs the file straight to Cloudflare — it never passes through
 * this server, so there is no serverless request-body limit to fight and a 2GB
 * video is no harder than a 20MB one.
 */
export async function requestLessonUploadAction(
  lessonId: string,
): Promise<{ uploadUrl: string; videoId: string } | { error: string }> {
  await requireInstructor();

  const [lesson] = await db
    .select({ id: lessons.id, courseId: modules.courseId, existing: lessons.streamVideoId })
    .from(lessons)
    .innerJoin(modules, eq(modules.id, lessons.moduleId))
    .where(eq(lessons.id, lessonId))
    .limit(1);

  if (!lesson) return { error: "That lesson no longer exists" };

  try {
    const { uploadUrl, videoId } = await createDirectUpload({
      lessonId: lesson.id,
      courseId: lesson.courseId,
    });

    await db
      .update(lessons)
      .set({ streamVideoId: videoId, videoStatus: "uploading", updatedAt: new Date() })
      .where(eq(lessons.id, lessonId));

    // Replacing a video: drop the old one so it stops billing.
    if (lesson.existing && lesson.existing !== videoId) {
      try {
        await deleteVideo(lesson.existing);
      } catch (err) {
        console.error("[courses] Stream delete failed", lesson.existing, err);
      }
    }

    return { uploadUrl, videoId };
  } catch (err) {
    console.error("[courses] Could not create direct upload", err);
    return { error: "Could not start the upload. Check the Cloudflare credentials." };
  }
}
