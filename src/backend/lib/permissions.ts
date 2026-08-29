import "server-only";

import { and, eq, isNull, or, gt } from "drizzle-orm";
import { forbidden, unauthorized } from "next/navigation";

import { auth } from "./auth";
import { db } from "@/db";
import { enrollments, lessons, modules, users } from "@/db/schema";

/**
 * The authorization boundary for the entire application.
 *
 * Server Actions are public HTTP endpoints — anyone can POST to one with a
 * forged payload. `middleware.ts` only redirects unauthenticated *page*
 * navigations; it is not, and cannot be, an authorization check for actions.
 * So every Server Action and route handler starts with a call from this file.
 * There is no exception to this rule.
 */

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role: "student" | "instructor" | "admin";
  referralCode: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  return {
    id: session.user.id,
    email: session.user.email ?? "",
    name: session.user.name ?? null,
    role: session.user.role,
    referralCode: session.user.referralCode,
  };
}

/** Throws (401) unless someone is signed in. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) unauthorized();
  return user;
}

/** Throws (403) unless the caller is an admin. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "admin") forbidden();
  return user;
}

/** Admins and instructors may both author course content. */
export async function requireInstructor(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "admin" && user.role !== "instructor") forbidden();
  return user;
}

/**
 * True when the user holds live access to the course: an enrollment row that
 * has not been revoked and has not expired.
 */
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

export async function requireEnrollment(courseId: string): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role === "admin") return user; // admins can audit any course
  if (!(await isEnrolled(user.id, courseId))) forbidden();
  return user;
}

/**
 * Resolves a lesson to its course and decides whether the caller may watch it.
 *
 * This is the gate in front of minting a Cloudflare Stream playback token.
 * A client-side version of this check would be free video for anyone who
 * opens devtools, so it must stay on the server and must resolve the course
 * from the lesson itself rather than trusting a courseId from the request.
 */
export async function authorizeLessonPlayback(lessonId: string): Promise<{
  user: SessionUser | null;
  courseId: string;
  streamVideoId: string;
  allowed: boolean;
}> {
  const [row] = await db
    .select({
      lessonId: lessons.id,
      streamVideoId: lessons.streamVideoId,
      isFreePreview: lessons.isFreePreview,
      videoStatus: lessons.videoStatus,
      courseId: modules.courseId,
    })
    .from(lessons)
    .innerJoin(modules, eq(lessons.moduleId, modules.id))
    .where(eq(lessons.id, lessonId))
    .limit(1);

  if (!row || !row.streamVideoId || row.videoStatus !== "ready") {
    return { user: null, courseId: "", streamVideoId: "", allowed: false };
  }

  const user = await getSessionUser();

  // A free preview is the only path to a token without an enrollment.
  if (row.isFreePreview) {
    return { user, courseId: row.courseId, streamVideoId: row.streamVideoId, allowed: true };
  }

  if (!user) {
    return { user: null, courseId: row.courseId, streamVideoId: row.streamVideoId, allowed: false };
  }

  const allowed = user.role === "admin" || (await isEnrolled(user.id, row.courseId));
  return { user, courseId: row.courseId, streamVideoId: row.streamVideoId, allowed };
}

export async function isAdminEmail(email: string): Promise<boolean> {
  const [row] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);
  return row?.role === "admin";
}
