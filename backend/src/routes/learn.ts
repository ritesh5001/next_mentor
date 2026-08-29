import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { saveProgressSchema } from "@nextmentor/shared";

import { db } from "@/db";
import { courses } from "@/db/schema";
import { getLearnView, getPlayback, saveProgress } from "@/services/playback";
import { authorizeLessonPlayback, isEnrolled } from "@/lib/permissions";
import { evaluateAchievementsQuietly } from "@/services/achievements";
import { requireUser, currentUser } from "@/middleware/auth";
import { ok, fail, parseBody } from "@/middleware/respond";

export const learnRoutes = new Hono();

/**
 * The player view: curriculum, active lesson, and a signed playback URL.
 *
 * Entitlement is checked before a token is minted. A client-side check here
 * would be free video for anyone who opens devtools.
 */
learnRoutes.get("/learn/:slug", requireUser, async (c) => {
  const user = currentUser(c);
  const slug = c.req.param("slug");

  const [course] = await db
    .select({ id: courses.id, title: courses.title })
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1);

  if (!course) return fail(c, "That course does not exist.", "not_found");

  const entitled = user.role === "admin" || (await isEnrolled(user.id, course.id));
  if (!entitled) {
    return fail(c, "You are not enrolled in this course.", "forbidden");
  }

  const view = await getLearnView({
    courseSlug: slug,
    lessonId: c.req.query("lesson"),
    userId: user.id,
    isAdmin: user.role === "admin",
  });

  if (!view) return fail(c, "This course has no playable lessons yet.", "not_found");

  const playback = await getPlayback(view.active.id, { id: user.id, role: user.role });

  return ok(c, {
    course: view.course,
    curriculum: view.curriculum,
    active: view.active,
    totalLessons: view.totalLessons,
    completedLessons: view.completedLessons,
    playback: playback.ok
      ? { manifestUrl: playback.manifestUrl, expiresInSeconds: playback.expiresInSeconds }
      : null,
    playbackError: playback.ok ? null : playback.reason,
  });
});

learnRoutes.post("/progress", requireUser, async (c) => {
  const body = await parseBody(c, saveProgressSchema);
  if (!body.ok) return body.response;

  const user = currentUser(c);

  // Re-checked rather than trusted: without this anyone could write progress
  // against lessons they never bought.
  const auth = await authorizeLessonPlayback(body.data.lessonId, {
    id: user.id,
    role: user.role,
  });
  if (!auth.allowed) return fail(c, "You do not have access to that lesson.", "forbidden");

  await saveProgress({
    userId: user.id,
    lessonId: body.data.lessonId,
    positionSeconds: body.data.positionSeconds,
    completed: body.data.completed,
  });

  // Finishing a lesson can unlock a badge; cheap enough to check inline.
  if (body.data.completed) await evaluateAchievementsQuietly(user.id);

  return ok(c, { saved: true });
});
