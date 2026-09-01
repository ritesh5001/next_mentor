import { Hono } from "hono";

import { getCatalog, getCourseBySlug, getEnrolledCourses } from "@/services/courses";
import { getActivePlans } from "@/services/plans";
import { isEnrolled } from "@/lib/permissions";
import { optionalAuth, requireUser, currentUser } from "@/middleware/auth";
import { ok, fail } from "@/middleware/respond";

/** Public catalog. Reads only — no guard beyond optional auth for entitlement. */
export const catalogRoutes = new Hono();

catalogRoutes.get("/courses", async (c) => ok(c, await getCatalog()));

catalogRoutes.get("/plans", async (c) => ok(c, await getActivePlans()));

catalogRoutes.get("/courses/:slug", optionalAuth, async (c) => {
  const course = await getCourseBySlug(c.req.param("slug"));
  const viewer = c.get("user");
  const isStaff = viewer?.role === "admin";

  // Draft and archived courses 404 for everyone except staff, who preview them.
  if (!course || (course.status !== "published" && !isStaff)) {
    return fail(c, "That course is not available.", "not_found");
  }

  return ok(c, {
    ...course,
    enrolled: viewer ? await isEnrolled(viewer.id, course.id) : false,
  });
});

catalogRoutes.get("/my/courses", requireUser, async (c) =>
  ok(c, await getEnrolledCourses(currentUser(c).id)),
);
