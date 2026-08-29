import { and, asc, desc, eq, isNull, or, gt, sql } from "drizzle-orm";
import { cached } from "@/lib/cache";

import { db } from "@/db";
import { courses, modules, lessons, enrollments, lessonProgress } from "@/db/schema";

/**
 * Read + write paths for course content.
 *
 * Queries here always name their columns explicitly rather than `select()`.
 * A bare select pulls every column, which on `courses` means dragging the full
 * description into a catalog grid that renders 12 cards and shows none of it.
 */

export const CATALOG_TAG = "catalog";
export const courseTag = (slug: string) => `course:${slug}`;

export type CatalogCourse = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  thumbnailKey: string | null;
  instructorName: string | null;
  priceInPaise: number;
  mrpInPaise: number | null;
  level: "beginner" | "intermediate" | "advanced";
  lessonCount: number;
  durationSeconds: number;
};

async function queryCatalog(): Promise<CatalogCourse[]> {
  // Lesson count and total duration are aggregated in SQL rather than by
  // loading every lesson row into JS — a 20-course catalog with 30 lessons
  // each would otherwise transfer 600 rows to render 20 cards.
  const rows = await db
    .select({
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      subtitle: courses.subtitle,
      thumbnailKey: courses.thumbnailKey,
      instructorName: courses.instructorName,
      priceInPaise: courses.priceInPaise,
      mrpInPaise: courses.mrpInPaise,
      level: courses.level,
      lessonCount: sql<number>`cast(count(${lessons.id}) as int)`,
      durationSeconds: sql<number>`cast(coalesce(sum(${lessons.durationSeconds}), 0) as int)`,
    })
    .from(courses)
    .leftJoin(modules, eq(modules.courseId, courses.id))
    .leftJoin(lessons, eq(lessons.moduleId, modules.id))
    .where(eq(courses.status, "published"))
    .groupBy(courses.id)
    .orderBy(asc(courses.position), desc(courses.publishedAt));

  return rows;
}

/**
 * The catalog is identical for every visitor, so it is cached and invalidated
 * by tag when an admin publishes or edits a course — see revalidateCatalog().
 * Next 15+ does not cache anything by default, so this has to be explicit.
 */
export const getCatalog = cached(queryCatalog, ["catalog"].join(":"), { tags: [CATALOG_TAG], ttlSeconds: 3600 });

export type CourseDetail = NonNullable<Awaited<ReturnType<typeof queryCourseBySlug>>>;

async function queryCourseBySlug(slug: string) {
  const [course] = await db
    .select({
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      subtitle: courses.subtitle,
      description: courses.description,
      thumbnailKey: courses.thumbnailKey,
      instructorName: courses.instructorName,
      priceInPaise: courses.priceInPaise,
      mrpInPaise: courses.mrpInPaise,
      level: courses.level,
      language: courses.language,
      status: courses.status,
    })
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1);

  if (!course) return null;

  const curriculum = await db
    .select({
      moduleId: modules.id,
      moduleTitle: modules.title,
      modulePosition: modules.position,
      lessonId: lessons.id,
      lessonTitle: lessons.title,
      lessonPosition: lessons.position,
      durationSeconds: lessons.durationSeconds,
      isFreePreview: lessons.isFreePreview,
      videoStatus: lessons.videoStatus,
    })
    .from(modules)
    .leftJoin(lessons, eq(lessons.moduleId, modules.id))
    .where(eq(modules.courseId, course.id))
    .orderBy(asc(modules.position), asc(lessons.position));

  // Flat join result -> nested modules. Done in JS because the alternative is
  // json_agg, which is harder to read and no faster at this row count.
  const moduleMap = new Map<
    string,
    {
      id: string;
      title: string;
      lessons: Array<{
        id: string;
        title: string;
        durationSeconds: number;
        isFreePreview: boolean;
        isReady: boolean;
      }>;
    }
  >();

  for (const row of curriculum) {
    let mod = moduleMap.get(row.moduleId);
    if (!mod) {
      mod = { id: row.moduleId, title: row.moduleTitle, lessons: [] };
      moduleMap.set(row.moduleId, mod);
    }
    // leftJoin yields a row with null lesson fields for an empty module.
    if (row.lessonId) {
      mod.lessons.push({
        id: row.lessonId,
        title: row.lessonTitle ?? "",
        durationSeconds: row.durationSeconds ?? 0,
        isFreePreview: row.isFreePreview ?? false,
        isReady: row.videoStatus === "ready",
      });
    }
  }

  const modulesList = [...moduleMap.values()];
  const lessonCount = modulesList.reduce((n, m) => n + m.lessons.length, 0);
  const durationSeconds = modulesList.reduce(
    (n, m) => n + m.lessons.reduce((x, l) => x + l.durationSeconds, 0),
    0,
  );

  return { ...course, modules: modulesList, lessonCount, durationSeconds };
}

export function getCourseBySlug(slug: string) {
  return cached(() => queryCourseBySlug(slug), ["course", slug].join(":"), { tags: [courseTag(slug), CATALOG_TAG], ttlSeconds: 3600 })();
}

/** Admin/instructor view — includes drafts, and never cached. */
export async function getCourseForEditor(courseId: string) {
  const [course] = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
  if (!course) return null;

  const rows = await db
    .select({
      moduleId: modules.id,
      moduleTitle: modules.title,
      modulePosition: modules.position,
      lessonId: lessons.id,
      lessonTitle: lessons.title,
      lessonPosition: lessons.position,
      durationSeconds: lessons.durationSeconds,
      isFreePreview: lessons.isFreePreview,
      videoStatus: lessons.videoStatus,
      streamVideoId: lessons.streamVideoId,
    })
    .from(modules)
    .leftJoin(lessons, eq(lessons.moduleId, modules.id))
    .where(eq(modules.courseId, courseId))
    .orderBy(asc(modules.position), asc(lessons.position));

  const moduleMap = new Map<
    string,
    {
      id: string;
      title: string;
      position: number;
      lessons: Array<{
        id: string;
        title: string;
        position: number;
        durationSeconds: number;
        isFreePreview: boolean;
        videoStatus: string;
        streamVideoId: string | null;
      }>;
    }
  >();

  for (const row of rows) {
    let mod = moduleMap.get(row.moduleId);
    if (!mod) {
      mod = {
        id: row.moduleId,
        title: row.moduleTitle,
        position: row.modulePosition,
        lessons: [],
      };
      moduleMap.set(row.moduleId, mod);
    }
    if (row.lessonId) {
      mod.lessons.push({
        id: row.lessonId,
        title: row.lessonTitle ?? "",
        position: row.lessonPosition ?? 0,
        durationSeconds: row.durationSeconds ?? 0,
        isFreePreview: row.isFreePreview ?? false,
        videoStatus: row.videoStatus ?? "pending",
        streamVideoId: row.streamVideoId ?? null,
      });
    }
  }

  return { ...course, modules: [...moduleMap.values()] };
}

export async function listCoursesForAdmin() {
  return db
    .select({
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      status: courses.status,
      priceInPaise: courses.priceInPaise,
      publishedAt: courses.publishedAt,
      updatedAt: courses.updatedAt,
      enrollmentCount: sql<number>`cast(count(distinct ${enrollments.id}) as int)`,
    })
    .from(courses)
    .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
    .groupBy(courses.id)
    .orderBy(desc(courses.updatedAt));
}

/**
 * Courses the user has live access to, with progress, for the dashboard grid.
 */
export async function getEnrolledCourses(userId: string) {
  return db
    .select({
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      thumbnailKey: courses.thumbnailKey,
      instructorName: courses.instructorName,
      enrolledAt: enrollments.enrolledAt,
      lessonCount: sql<number>`cast(count(distinct ${lessons.id}) as int)`,
      completedCount: sql<number>`cast(count(distinct ${lessonProgress.id}) filter (where ${lessonProgress.completedAt} is not null) as int)`,
    })
    .from(enrollments)
    .innerJoin(courses, eq(courses.id, enrollments.courseId))
    .leftJoin(modules, eq(modules.courseId, courses.id))
    .leftJoin(lessons, eq(lessons.moduleId, modules.id))
    .leftJoin(
      lessonProgress,
      and(eq(lessonProgress.lessonId, lessons.id), eq(lessonProgress.userId, userId)),
    )
    .where(
      and(
        eq(enrollments.userId, userId),
        isNull(enrollments.revokedAt),
        or(isNull(enrollments.expiresAt), gt(enrollments.expiresAt, new Date())),
      ),
    )
    .groupBy(courses.id, enrollments.enrolledAt)
    .orderBy(desc(enrollments.enrolledAt));
}

/** Turns a title into a URL-safe slug. Uniqueness is enforced by the DB index. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/^-|-$/g, "");
}

export async function uniqueSlug(base: string, excludeCourseId?: string): Promise<string> {
  const root = slugify(base) || "course";

  for (let n = 0; n < 50; n++) {
    const candidate = n === 0 ? root : `${root}-${n + 1}`;
    const [clash] = await db
      .select({ id: courses.id })
      .from(courses)
      .where(eq(courses.slug, candidate))
      .limit(1);

    if (!clash || clash.id === excludeCourseId) return candidate;
  }

  return `${root}-${Date.now()}`;
}
