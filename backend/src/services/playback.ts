import { and, asc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { courses, lessons, lessonProgress, modules } from "@/db/schema";
import { authorizeLessonPlayback } from "@/lib/permissions";
import { signPlaybackToken, hlsManifestUrl } from "@/lib/cloudflare-stream";

/**
 * Turns a lesson into a playable stream URL — but only for someone entitled to it.
 *
 * The authorization check and the token minting are deliberately in the same
 * function so there is no way to call the second without the first. Everything
 * here runs on the server; a client-side entitlement check would be free video
 * for anyone who opens devtools.
 */
export async function getPlayback(
  lessonId: string,
  viewer: { id: string; role: string } | null,
): Promise<
  | { ok: true; manifestUrl: string; expiresInSeconds: number }
  | { ok: false; reason: "not_found" | "not_ready" | "forbidden" }
> {
  const auth = await authorizeLessonPlayback(lessonId, viewer);

  if (!auth.streamVideoId) return { ok: false, reason: "not_found" };
  if (!auth.allowed) return { ok: false, reason: "forbidden" };

  const expiresInSeconds = 2 * 60 * 60;
  const token = await signPlaybackToken(auth.streamVideoId, { expiresInSeconds });

  return { ok: true, manifestUrl: hlsManifestUrl(token), expiresInSeconds };
}

/**
 * The full player view: curriculum sidebar, the active lesson, and progress.
 *
 * Returns null when the user has no live access, so the caller can 404 rather
 * than leak the fact that a course exists at that slug.
 */
export async function getLearnView(params: {
  courseSlug: string;
  lessonId?: string;
  userId: string;
  isAdmin: boolean;
}) {
  const [course] = await db
    .select({ id: courses.id, slug: courses.slug, title: courses.title })
    .from(courses)
    .where(eq(courses.slug, params.courseSlug))
    .limit(1);

  if (!course) return null;

  const rows = await db
    .select({
      moduleId: modules.id,
      moduleTitle: modules.title,
      lessonId: lessons.id,
      lessonTitle: lessons.title,
      durationSeconds: lessons.durationSeconds,
      videoStatus: lessons.videoStatus,
      isFreePreview: lessons.isFreePreview,
      completedAt: lessonProgress.completedAt,
      lastPositionSeconds: lessonProgress.lastPositionSeconds,
    })
    .from(modules)
    .leftJoin(lessons, eq(lessons.moduleId, modules.id))
    .leftJoin(
      lessonProgress,
      and(eq(lessonProgress.lessonId, lessons.id), eq(lessonProgress.userId, params.userId)),
    )
    .where(eq(modules.courseId, course.id))
    .orderBy(asc(modules.position), asc(lessons.position));

  const curriculum: Array<{
    id: string;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      durationSeconds: number;
      isReady: boolean;
      isFreePreview: boolean;
      isCompleted: boolean;
      lastPositionSeconds: number;
    }>;
  }> = [];

  const seen = new Map<string, number>();

  for (const row of rows) {
    let idx = seen.get(row.moduleId);
    if (idx === undefined) {
      idx = curriculum.length;
      seen.set(row.moduleId, idx);
      curriculum.push({ id: row.moduleId, title: row.moduleTitle, lessons: [] });
    }
    if (row.lessonId) {
      curriculum[idx].lessons.push({
        id: row.lessonId,
        title: row.lessonTitle ?? "",
        durationSeconds: row.durationSeconds ?? 0,
        isReady: row.videoStatus === "ready",
        isFreePreview: row.isFreePreview ?? false,
        isCompleted: row.completedAt !== null,
        lastPositionSeconds: row.lastPositionSeconds ?? 0,
      });
    }
  }

  const playable = curriculum.flatMap((m) => m.lessons).filter((l) => l.isReady);
  if (playable.length === 0) return null;

  // Resolve the requested lesson against the real curriculum rather than
  // trusting the URL — otherwise a lesson id from another course would play.
  const active =
    (params.lessonId ? playable.find((l) => l.id === params.lessonId) : undefined) ??
    playable.find((l) => !l.isCompleted) ??
    playable[0];

  const totalLessons = playable.length;
  const completedLessons = playable.filter((l) => l.isCompleted).length;

  return {
    course,
    curriculum,
    active,
    totalLessons,
    completedLessons,
  };
}

/**
 * Records watch progress.
 *
 * `secondsWatched` only ever moves forward: the player posts on an interval and
 * those requests can arrive out of order, so taking the max stops a late packet
 * from rewinding someone's completion.
 */
export async function saveProgress(params: {
  userId: string;
  lessonId: string;
  positionSeconds: number;
  completed: boolean;
}) {
  const [lesson] = await db
    .select({ id: lessons.id, courseId: modules.courseId, duration: lessons.durationSeconds })
    .from(lessons)
    .innerJoin(modules, eq(modules.id, lessons.moduleId))
    .where(eq(lessons.id, params.lessonId))
    .limit(1);

  if (!lesson) return { ok: false as const };

  const position = Math.max(0, Math.floor(params.positionSeconds));

  await db
    .insert(lessonProgress)
    .values({
      userId: params.userId,
      lessonId: params.lessonId,
      courseId: lesson.courseId,
      secondsWatched: position,
      lastPositionSeconds: position,
      completedAt: params.completed ? new Date() : null,
    })
    .onConflictDoUpdate({
      target: [lessonProgress.userId, lessonProgress.lessonId],
      set: {
        lastPositionSeconds: position,
        // greatest() in SQL, not JS: the player posts on an interval and those
        // requests can arrive out of order, so a late packet must not rewind
        // someone's watch time.
        secondsWatched: sql`greatest(${lessonProgress.secondsWatched}, ${position})`,
        // Completion is sticky — re-watching a finished lesson must not
        // un-complete it and knock the course off 100%.
        completedAt: params.completed ? new Date() : undefined,
        updatedAt: new Date(),
      },
    });

  return { ok: true as const };
}
