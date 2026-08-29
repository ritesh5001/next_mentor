import { Hono } from "hono";
import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { courseFormSchema, requestUploadSchema } from "@nextmentor/shared";

import { db } from "@/db";
import { plans } from "@/db/schema";
import { listCoursesForAdmin, getCourseForEditor } from "@/services/courses";
import { listPlansForAdmin } from "@/services/plans";
import { listCouponsForAdmin } from "@/services/coupons";
import { listUsersForAdmin, listOrdersForAdmin, getAdminStats, getRevenueByDay } from "@/services/admin";
import { listKycForAdmin, listPayoutsForAdmin } from "@/services/affiliate";
import { approvePayout, markPayoutPaid, rejectPayout } from "@/services/payouts";
import { createImageUpload } from "@/lib/r2";
import { createDirectUpload } from "@/lib/cloudflare-stream";
import { requireAdmin, requireInstructor, currentUser } from "@/middleware/auth";
import { ok, fail, parseBody } from "@/middleware/respond";
import * as write from "@/services/admin-write";

export const adminRoutes = new Hono();

/* ------------------------------------------------------------------ reads */

adminRoutes.get("/stats", requireAdmin, async (c) => ok(c, await getAdminStats()));
adminRoutes.get("/revenue", requireAdmin, async (c) => ok(c, await getRevenueByDay(30)));
adminRoutes.get("/courses", requireInstructor, async (c) => ok(c, await listCoursesForAdmin()));
adminRoutes.get("/plans", requireAdmin, async (c) => ok(c, await listPlansForAdmin()));
adminRoutes.get("/coupons", requireAdmin, async (c) => ok(c, await listCouponsForAdmin()));
adminRoutes.get("/orders", requireAdmin, async (c) => ok(c, await listOrdersForAdmin()));

adminRoutes.get("/users", requireAdmin, async (c) =>
  ok(c, await listUsersForAdmin({ query: c.req.query("q") })),
);

adminRoutes.get("/kyc", requireAdmin, async (c) => {
  const status = c.req.query("status") as "pending" | "approved" | "rejected" | undefined;
  return ok(c, await listKycForAdmin(status ?? "pending"));
});

adminRoutes.get("/payouts", requireAdmin, async (c) => {
  const status = c.req.query("status") as
    | "requested" | "approved" | "paid" | "rejected" | undefined;
  return ok(c, await listPayoutsForAdmin(status ?? "requested"));
});

adminRoutes.get("/courses/:courseId", requireInstructor, async (c) => {
  const course = await getCourseForEditor(c.req.param("courseId"));
  if (!course) return fail(c, "That course no longer exists.", "not_found");
  return ok(c, course);
});

adminRoutes.get("/content", requireAdmin, async (c) => {
  const planList = await db
    .select({ id: plans.id, name: plans.name })
    .from(plans)
    .where(eq(plans.isActive, true))
    .orderBy(asc(plans.position));

  const [assets, modules, slots] = await Promise.all([
    write.listPromoAssets(),
    write.listTrainingModules(),
    write.listMentorshipSlots(),
  ]);

  return ok(c, { plans: planList, assets, modules, slots });
});

/* ----------------------------------------------------------------- courses */

adminRoutes.post("/courses", requireInstructor, async (c) => {
  const body = await parseBody(c, courseFormSchema);
  if (!body.ok) return body.response;
  return ok(c, await write.createCourse(body.data), 201);
});

adminRoutes.patch("/courses/:courseId", requireInstructor, async (c) => {
  const body = await parseBody(c, courseFormSchema);
  if (!body.ok) return body.response;

  const result = await write.updateCourse(c.req.param("courseId"), body.data);
  return result.ok ? ok(c, result) : fail(c, result.error, "not_found");
});

adminRoutes.patch("/courses/:courseId/status", requireInstructor, async (c) => {
  const body = await parseBody(
    c,
    z.object({ status: z.enum(["draft", "published", "archived"]) }),
  );
  if (!body.ok) return body.response;

  const result = await write.setCourseStatus(c.req.param("courseId"), body.data.status);
  return result.ok ? ok(c, result) : fail(c, result.error, "validation");
});

adminRoutes.delete("/courses/:courseId", requireAdmin, async (c) => {
  const result = await write.deleteCourse(c.req.param("courseId"));
  return result.ok ? ok(c, result) : fail(c, result.error, "conflict");
});

/* ------------------------------------------------------- modules + lessons */

adminRoutes.post("/modules", requireInstructor, async (c) => {
  const body = await parseBody(
    c,
    z.object({ courseId: z.string().min(1), title: z.string().trim().min(2).max(120) }),
  );
  if (!body.ok) return body.response;
  await write.createModule(body.data);
  return ok(c, { created: true }, 201);
});

adminRoutes.delete("/modules/:moduleId", requireInstructor, async (c) => {
  await write.deleteModule(c.req.param("moduleId"));
  return ok(c, { deleted: true });
});

adminRoutes.post("/lessons", requireInstructor, async (c) => {
  const body = await parseBody(
    c,
    z.object({ moduleId: z.string().min(1), title: z.string().trim().min(2).max(160) }),
  );
  if (!body.ok) return body.response;
  await write.createLesson(body.data);
  return ok(c, { created: true }, 201);
});

adminRoutes.patch("/lessons/:lessonId", requireInstructor, async (c) => {
  const body = await parseBody(
    c,
    z.object({ title: z.string().trim().min(2).max(160), isFreePreview: z.boolean() }),
  );
  if (!body.ok) return body.response;
  await write.updateLesson(c.req.param("lessonId"), body.data);
  return ok(c, { updated: true });
});

adminRoutes.delete("/lessons/:lessonId", requireInstructor, async (c) => {
  await write.deleteLesson(c.req.param("lessonId"));
  return ok(c, { deleted: true });
});

/** One-time Cloudflare upload URL — the file never passes through this server. */
adminRoutes.post("/lessons/:lessonId/upload", requireInstructor, async (c) => {
  const result = await write.requestLessonUpload(c.req.param("lessonId"));
  return "error" in result ? fail(c, result.error, "server_error") : ok(c, result);
});

/* ------------------------------------------------------------- plans etc. */

const planSchema = z.object({
  name: z.string().trim().min(2).max(60),
  tagline: z.string().trim().max(160).optional().or(z.literal("")),
  priceInRupees: z.coerce.number().int().min(0).max(1_000_000),
  mrpInRupees: z.coerce.number().int().min(0).max(1_000_000).optional(),
  durationDays: z.coerce.number().int().min(1).max(3650).optional(),
  commissionPercent: z.coerce.number().min(0).max(100),
  features: z.array(z.string()).max(20).default([]),
  grantsAllCourses: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  position: z.coerce.number().int().min(0).max(100).default(0),
});

adminRoutes.post("/plans", requireAdmin, async (c) => {
  const body = await parseBody(c, planSchema);
  if (!body.ok) return body.response;
  const result = await write.createPlan(body.data);
  return result.ok ? ok(c, result, 201) : fail(c, result.error, "conflict");
});

adminRoutes.patch("/plans/:planId", requireAdmin, async (c) => {
  const body = await parseBody(c, planSchema.partial({ features: true }).extend({
    isActive: z.boolean().optional(),
  }));
  if (!body.ok) return body.response;
  await write.updatePlan(c.req.param("planId"), body.data);
  return ok(c, { updated: true });
});

const couponSchema = z.object({
  code: z.string().trim().min(3).max(32),
  description: z.string().trim().max(200).optional().or(z.literal("")),
  discountType: z.enum(["percent", "flat"]),
  value: z.coerce.number().positive(),
  maxDiscountInRupees: z.coerce.number().int().min(0).optional(),
  minOrderInRupees: z.coerce.number().int().min(0).default(0),
  maxRedemptions: z.coerce.number().int().min(1).optional(),
  perUserLimit: z.coerce.number().int().min(1).max(100).default(1),
  validUntil: z.string().optional().or(z.literal("")),
});

adminRoutes.post("/coupons", requireAdmin, async (c) => {
  const body = await parseBody(c, couponSchema);
  if (!body.ok) return body.response;

  const result = await write.createCoupon(body.data, currentUser(c).id);
  return result.ok ? ok(c, result, 201) : fail(c, result.error, "conflict");
});

adminRoutes.patch("/coupons/:couponId", requireAdmin, async (c) => {
  const body = await parseBody(c, z.object({ isActive: z.boolean() }));
  if (!body.ok) return body.response;
  await write.setCouponActive(c.req.param("couponId"), body.data.isActive);
  return ok(c, { updated: true });
});

adminRoutes.delete("/coupons/:couponId", requireAdmin, async (c) => {
  const result = await write.deleteCoupon(c.req.param("couponId"));
  return result.ok ? ok(c, result) : fail(c, result.error, "conflict");
});

/* --------------------------------------------------------- users + review */

adminRoutes.patch("/users/:userId", requireAdmin, async (c) => {
  const body = await parseBody(
    c,
    z.object({
      role: z.enum(["student", "instructor", "admin"]).optional(),
      isBlocked: z.boolean().optional(),
    }),
  );
  if (!body.ok) return body.response;

  const result = await write.updateUser(c.req.param("userId"), currentUser(c).id, body.data);
  return result.ok ? ok(c, result) : fail(c, result.error, "forbidden");
});

adminRoutes.patch("/kyc/:kycId", requireAdmin, async (c) => {
  const body = await parseBody(
    c,
    z.object({
      decision: z.enum(["approved", "rejected"]),
      reason: z.string().trim().max(500).optional(),
    }),
  );
  if (!body.ok) return body.response;

  const result = await write.reviewKyc(
    c.req.param("kycId"),
    currentUser(c).id,
    body.data.decision,
    body.data.reason,
  );
  return result.ok ? ok(c, result) : fail(c, result.error, "validation");
});

adminRoutes.patch("/payouts/:payoutId", requireAdmin, async (c) => {
  const body = await parseBody(
    c,
    z.object({
      action: z.enum(["approve", "paid", "reject"]),
      utrNumber: z.string().trim().optional(),
      reason: z.string().trim().optional(),
    }),
  );
  if (!body.ok) return body.response;

  const admin = currentUser(c).id;
  const payoutId = c.req.param("payoutId");
  const { action } = body.data;

  const result =
    action === "approve"
      ? await approvePayout(payoutId, admin)
      : action === "paid"
        ? await markPayoutPaid({ payoutId, adminId: admin, utrNumber: body.data.utrNumber ?? "" })
        : await rejectPayout({ payoutId, adminId: admin, reason: body.data.reason ?? "" });

  if (!result.ok) return fail(c, result.error, "validation");

  await write.notifyPayout(payoutId, action, body.data.utrNumber ?? body.data.reason);
  return ok(c, { message: result.message });
});

/* -------------------------------------------------------------- uploads */

adminRoutes.post("/uploads/image", requireInstructor, async (c) => {
  const body = await parseBody(
    c,
    requestUploadSchema.extend({ prefix: z.enum(["thumbnails", "promo"]).default("thumbnails") }),
  );
  if (!body.ok) return body.response;

  const result = await createImageUpload({
    prefix: body.data.prefix,
    contentType: body.data.contentType,
    contentLength: body.data.contentLength,
  });

  return "error" in result
    ? fail(c, result.error, "validation")
    : ok(c, { uploadUrl: result.uploadUrl, key: result.key });
});

adminRoutes.patch("/courses/:courseId/thumbnail", requireInstructor, async (c) => {
  const body = await parseBody(c, z.object({ key: z.string().min(1) }));
  if (!body.ok) return body.response;
  await write.setCourseThumbnail(c.req.param("courseId"), body.data.key);
  return ok(c, { updated: true });
});

/* --------------------------------------------------------------- content */

adminRoutes.post("/content/promo", requireAdmin, async (c) => {
  const result = await write.createPromoAsset(await c.req.json());
  return result.ok ? ok(c, result, 201) : fail(c, result.error, "validation");
});

adminRoutes.delete("/content/promo/:id", requireAdmin, async (c) => {
  await write.deletePromoAsset(c.req.param("id"));
  return ok(c, { deleted: true });
});

adminRoutes.post("/content/training", requireAdmin, async (c) => {
  const result = await write.createTrainingModule(await c.req.json());
  return result.ok ? ok(c, result, 201) : fail(c, result.error, "validation");
});

adminRoutes.post("/content/training/:id/upload", requireAdmin, async (c) => {
  const result = await write.requestTrainingUpload(c.req.param("id"));
  return "error" in result ? fail(c, result.error, "server_error") : ok(c, result);
});

adminRoutes.delete("/content/training/:id", requireAdmin, async (c) => {
  await write.deleteTrainingModule(c.req.param("id"));
  return ok(c, { deleted: true });
});

adminRoutes.post("/content/mentorship", requireAdmin, async (c) => {
  const result = await write.createMentorshipSlot(await c.req.json(), currentUser(c).id);
  return result.ok ? ok(c, result, 201) : fail(c, result.error, "validation");
});

adminRoutes.delete("/content/mentorship/:id", requireAdmin, async (c) => {
  await write.cancelMentorshipSlot(c.req.param("id"));
  return ok(c, { cancelled: true });
});

/** Cloudflare direct-creator-upload, reused by training videos. */
export { createDirectUpload };
