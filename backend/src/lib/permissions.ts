import { and, eq, isNull, or, gt } from "drizzle-orm";

import { db } from "@/db";
import { enrollments, lessons, modules } from "@/db/schema";

/**
 * Entitlement checks, shared by the route handlers.
 *
 * Role checks now live in middleware (see middleware/auth.ts). What remains
 * here is the "does this person own this thing?" logic, which the routes call
 * after the middleware has established who they are.
 */

/** True when the user holds live access: not revoked, not expired. */
export async function isEnrolled(userId: string, courseId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: enrollments.id })
    .from(enrollments)
    .where(
      and(
        eq(enrollments.userId, userId),
        eq(enrollments.courseId, courseId),
        isNull(enrollments.revokedAt),
        or(isNull(enrollments.expiresAt), gt(enrollments.expiresAt, new Date())),
      ),
    )
    .limit(1);

  return Boolean(row);
}

/**
 * Resolves a lesson to its course and decides whether the caller may watch it.
 *
 * This is the gate in front of minting a Cloudflare Stream playback token. The
 * course is resolved FROM the lesson rather than trusted from the request, so a
 * lesson id belonging to another course cannot be smuggled through.
 */
export async function authorizeLessonPlayback(
  lessonId: string,
  viewer: { id: string; role: string } | null,
): Promise<{ courseId: string; streamVideoId: string; allowed: boolean }> {
  const [row] = await db
    .select({
      streamVideoId: lessons.streamVideoId,
      isFreePreview: lessons.isFreePreview,
      videoStatus: lessons.videoStatus,
      courseId: modules.courseId,
    })
    .from(lessons)
    .innerJoin(modules, eq(lessons.moduleId, modules.id))
    .where(eq(lessons.id, lessonId))
    .limit(1);

  if (!row?.streamVideoId || row.videoStatus !== "ready") {
    return { courseId: "", streamVideoId: "", allowed: false };
  }

  // A free preview is the only route to a token without an enrollment.
  if (row.isFreePreview) {
    return { courseId: row.courseId, streamVideoId: row.streamVideoId, allowed: true };
  }

  if (!viewer) {
    return { courseId: row.courseId, streamVideoId: row.streamVideoId, allowed: false };
  }

  const allowed = viewer.role === "admin" || (await isEnrolled(viewer.id, row.courseId));
  return { courseId: row.courseId, streamVideoId: row.streamVideoId, allowed };
}
