import { Hono } from "hono";
import { z } from "zod";
import { asc, eq, max } from "drizzle-orm";
import { courseFormSchema, requestUploadSchema } from "@nextmentor/shared";

import { db } from "@/db";
import { lessonResources, lessons, modules, plans } from "@/db/schema";
import { listCoursesForAdmin, getCourseForEditor } from "@/services/courses";
import * as grants from "@/services/grants";
import { listPlansForAdmin } from "@/services/plans";
import { listCouponsForAdmin } from "@/services/coupons";
import { listUsersForAdmin, listOrdersForAdmin, getAdminStats, getRevenueByDay } from "@/services/admin";
import { listKycForAdmin, listPayoutsForAdmin } from "@/services/affiliate";
import { approvePayout, markPayoutPaid, rejectPayout } from "@/services/payouts";
import {
  createUploadAuth,
  signedDocumentUrl,
  uploadCourseResource,
  deleteObject,
} from "@/lib/imagekit";
import { requireAdmin, currentUser } from "@/middleware/auth";
import { ok, fail, parseBody } from "@/middleware/respond";
import * as write from "@/services/admin-write";

export const adminRoutes = new Hono();

/* ------------------------------------------------------------------ reads */

adminRoutes.get("/stats", requireAdmin, async (c) => ok(c, await getAdminStats()));
adminRoutes.get("/revenue", requireAdmin, async (c) => ok(c, await getRevenueByDay(30)));
adminRoutes.get("/courses", requireAdmin, async (c) => ok(c, await listCoursesForAdmin()));
adminRoutes.get("/plans", requireAdmin, async (c) => ok(c, await listPlansForAdmin()));
adminRoutes.get("/coupons", requireAdmin, async (c) => ok(c, await listCouponsForAdmin()));
adminRoutes.get("/orders", requireAdmin, async (c) => ok(c, await listOrdersForAdmin()));

adminRoutes.get("/users", requireAdmin, async (c) =>
  ok(c, await listUsersForAdmin({ query: c.req.query("q") })),
);

adminRoutes.get("/kyc", requireAdmin, async (c) => {
  const status = c.req.query("status") as "pending" | "approved" | "rejected" | undefined;
  const rows = await listKycForAdmin(status ?? "pending");

  // Storage paths are swapped for short-lived signed URLs here, at the edge of
  // the API. The raw paths never leave the server: they are only useful with a
  // signature, and not sending them keeps them out of browser history, logs
  // and anything the reviewer later pastes somewhere.
  return ok(
    c,
    rows.map(({ aadhaarFrontPath, aadhaarBackPath, panFrontPath, panBackPath, bankProofPath, ...row }) => ({
      ...row,
      documents: {
        aadhaarFront: signedDocumentUrl(aadhaarFrontPath),
        aadhaarBack: signedDocumentUrl(aadhaarBackPath),
        panFront: signedDocumentUrl(panFrontPath),
        panBack: signedDocumentUrl(panBackPath),
        bankProof: signedDocumentUrl(bankProofPath),
      },
    })),
  );
});

adminRoutes.get("/payouts", requireAdmin, async (c) => {
  const status = c.req.query("status") as
    | "requested" | "approved" | "paid" | "rejected" | undefined;
  return ok(c, await listPayoutsForAdmin(status ?? "requested"));
});

adminRoutes.get("/courses/:courseId", requireAdmin, async (c) => {
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

adminRoutes.post("/courses", requireAdmin, async (c) => {
  const body = await parseBody(c, courseFormSchema);
  if (!body.ok) return body.response;
  return ok(c, await write.createCourse(body.data), 201);
});

adminRoutes.patch("/courses/:courseId", requireAdmin, async (c) => {
  const body = await parseBody(c, courseFormSchema);
  if (!body.ok) return body.response;

  const result = await write.updateCourse(c.req.param("courseId"), body.data);
  return result.ok ? ok(c, result) : fail(c, result.error, "not_found");
});

adminRoutes.patch("/courses/:courseId/status", requireAdmin, async (c) => {
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

adminRoutes.post("/modules", requireAdmin, async (c) => {
  const body = await parseBody(
    c,
    z.object({ courseId: z.string().min(1), title: z.string().trim().min(2).max(120) }),
  );
  if (!body.ok) return body.response;
  await write.createModule(body.data);
  return ok(c, { created: true }, 201);
});

adminRoutes.delete("/modules/:moduleId", requireAdmin, async (c) => {
  await write.deleteModule(c.req.param("moduleId"));
  return ok(c, { deleted: true });
});

adminRoutes.post("/lessons", requireAdmin, async (c) => {
  const body = await parseBody(
    c,
    z.object({ moduleId: z.string().min(1), title: z.string().trim().min(2).max(160) }),
  );
  if (!body.ok) return body.response;
  await write.createLesson(body.data);
  return ok(c, { created: true }, 201);
});

adminRoutes.patch("/lessons/:lessonId", requireAdmin, async (c) => {
  const body = await parseBody(
    c,
    z.object({ title: z.string().trim().min(2).max(160), isFreePreview: z.boolean() }),
  );
  if (!body.ok) return body.response;
  await write.updateLesson(c.req.param("lessonId"), body.data);
  return ok(c, { updated: true });
});

adminRoutes.delete("/lessons/:lessonId", requireAdmin, async (c) => {
  await write.deleteLesson(c.req.param("lessonId"));
  return ok(c, { deleted: true });
});

/** One-time R2 upload URL. The file never passes through this server. */
adminRoutes.post("/lessons/:lessonId/upload", requireAdmin, async (c) => {
  const body = await parseBody(c, z.object({ contentType: z.string().min(1) }));
  if (!body.ok) return body.response;

  const result = await write.requestLessonUpload(
    c.req.param("lessonId"),
    body.data.contentType,
  );
  return "error" in result ? fail(c, result.error, "server_error") : ok(c, result);
});

/**
 * Marks the lesson playable once the browser's PUT has finished.
 *
 * R2 has no transcode webhook, so this replaces the Cloudflare callback that
 * used to flip a lesson to `ready`.
 */
adminRoutes.post("/lessons/:lessonId/upload/confirm", requireAdmin, async (c) => {
  const body = await parseBody(
    c,
    z.object({
      key: z.string().min(1),
      durationSeconds: z.coerce.number().min(0).max(60 * 60 * 12).default(0),
    }),
  );
  if (!body.ok) return body.response;

  const result = await write.confirmLessonUpload(
    c.req.param("lessonId"),
    body.data.key,
    body.data.durationSeconds,
  );
  return "error" in result ? fail(c, result.error, "validation") : ok(c, result);
});

/* ------------------------------------------------------------ user access */

/**
 * Comped access. See services/grants.ts for why none of this touches orders,
 * wallets or commissions.
 */
const grantSchema = z.object({
  itemType: z.enum(["course", "plan"]),
  itemId: z.string().min(1),
});

adminRoutes.get("/users/:userId/access", requireAdmin, async (c) =>
  ok(c, await grants.getUserAccess(c.req.param("userId"))),
);

adminRoutes.post("/users/:userId/access", requireAdmin, async (c) => {
  const body = await parseBody(c, grantSchema);
  if (!body.ok) return body.response;

  const admin = currentUser(c);
  const userId = c.req.param("userId");

  const result =
    body.data.itemType === "course"
      ? await grants.grantCourse({ userId, courseId: body.data.itemId, grantedById: admin.id })
      : await grants.grantPlan({ userId, planId: body.data.itemId, grantedById: admin.id });

  return "error" in result ? fail(c, result.error, "validation") : ok(c, result);
});

adminRoutes.delete("/users/:userId/access", requireAdmin, async (c) => {
  const itemType = c.req.query("itemType");
  const itemId = c.req.query("itemId");

  if (itemType !== "course" && itemType !== "plan") {
    return fail(c, "Unknown item type.", "validation");
  }

  const userId = c.req.param("userId");
  const result =
    itemType === "course"
      ? await grants.revokeCourse(userId, itemId ?? "")
      : await grants.revokePlan(userId);

  return "error" in result ? fail(c, result.error, "validation") : ok(c, result);
});

/* ------------------------------------------------------------- plans etc. */

/**
 * An optional number arriving from an HTML form.
 *
 * A blank input posts "", and z.coerce turns that into 0, not undefined. For
 * durationDays that meant a lifetime plan (deliberately blank) failed min(1)
 * and could be neither created nor saved. Empty means absent here.
 */
const optionalNumber = (min: number, max: number) =>
  z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce.number().int().min(min).max(max).optional(),
  );

const planSchema = z.object({
  name: z.string().trim().min(2).max(60),
  tagline: z.string().trim().max(160).optional().or(z.literal("")),
  priceInRupees: z.coerce.number().int().min(0).max(1_000_000),
  mrpInRupees: optionalNumber(0, 1_000_000),
  durationDays: optionalNumber(1, 3650),
  commissionPercent: z.coerce.number().min(0).max(100),
  features: z.array(z.string()).max(20).default([]),
  grantsAllCourses: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  position: z.coerce.number().int().min(0).max(100).default(0),
});

/**
 * The PATCH shape, built by hand rather than from planSchema.
 *
 * Two traps live here, and both cause silent data loss rather than an error.
 *
 * `.partial()` makes a field optional but does NOT drop its `.default()`. So
 * `features: z.array(...).default([])` still materialises `[]` when the client
 * omits it, and the writer — which only checks `!== undefined` — dutifully
 * saves that empty array. The same applies to grantsAllCourses, isFeatured and
 * position. A Publish/Hide toggle sending nothing but `isActive` would wipe a
 * plan's feature list, revoke its catalogue access and reset its sort order.
 *
 * So every field here is optional with no default: absent means "leave alone".
 */
export const planPatchSchema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  tagline: z.string().trim().max(160).optional().or(z.literal("")),
  priceInRupees: optionalNumber(0, 1_000_000),
  mrpInRupees: optionalNumber(0, 1_000_000),
  durationDays: optionalNumber(1, 3650),
  commissionPercent: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce.number().min(0).max(100).optional(),
  ),
  features: z.array(z.string()).max(20).optional(),
  grantsAllCourses: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  position: optionalNumber(0, 100),
  isActive: z.boolean().optional(),
});

adminRoutes.post("/plans", requireAdmin, async (c) => {
  const body = await parseBody(c, planSchema);
  if (!body.ok) return body.response;
  const result = await write.createPlan(body.data);
  return result.ok ? ok(c, result, 201) : fail(c, result.error, "conflict");
});

adminRoutes.patch("/plans/:planId", requireAdmin, async (c) => {
  const body = await parseBody(c, planPatchSchema);
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
      role: z.enum(["student", "admin"]).optional(),
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

adminRoutes.post("/uploads/image", requireAdmin, async (c) => {
  const body = await parseBody(
    c,
    requestUploadSchema.extend({
      prefix: z.enum(["thumbnails", "promo", "certificates"]).default("thumbnails"),
    }),
  );
  if (!body.ok) return body.response;

  const result = createUploadAuth({
    folder: body.data.prefix,
    contentType: body.data.contentType,
    contentLength: body.data.contentLength,
  });

  return "error" in result ? fail(c, result.error, "validation") : ok(c, result);
});

adminRoutes.patch("/courses/:courseId/thumbnail", requireAdmin, async (c) => {
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
  const body = await parseBody(c, z.object({ contentType: z.string().min(1) }));
  if (!body.ok) return body.response;

  const result = await write.requestTrainingUpload(c.req.param("id"), body.data.contentType);
  return "error" in result ? fail(c, result.error, "server_error") : ok(c, result);
});

adminRoutes.post("/content/training/:id/upload/confirm", requireAdmin, async (c) => {
  const body = await parseBody(c, z.object({ key: z.string().min(1) }));
  if (!body.ok) return body.response;

  const result = await write.confirmTrainingUpload(c.req.param("id"), body.data.key);
  return "error" in result ? fail(c, result.error, "validation") : ok(c, result);
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

/* ------------------------------------------------- lesson resource files */

/**
 * Attaches a downloadable file to a lesson.
 *
 * Multipart through this API rather than browser-direct, so the server owns
 * `isPrivateFile`. This is paid content; see lib/imagekit.ts.
 */
adminRoutes.post("/lessons/:lessonId/resources", requireAdmin, async (c) => {
  const lessonId = c.req.param("lessonId");

  const [lesson] = await db
    .select({ id: lessons.id, courseId: modules.courseId })
    .from(lessons)
    .innerJoin(modules, eq(modules.id, lessons.moduleId))
    .where(eq(lessons.id, lessonId))
    .limit(1);

  if (!lesson) return fail(c, "That lesson no longer exists.", "not_found");

  let form: FormData;
  try {
    form = await c.req.formData();
  } catch {
    return fail(c, "Send the file as multipart form data.", "validation");
  }

  const file = form.get("file");
  if (!(file instanceof File)) return fail(c, "No file was attached.", "validation");

  const title = String(form.get("title") ?? "").trim() || file.name || "Resource";

  const uploaded = await uploadCourseResource({
    file: Buffer.from(await file.arrayBuffer()),
    contentType: file.type,
    courseId: lesson.courseId,
    lessonId,
  });

  if ("error" in uploaded) return fail(c, uploaded.error, "validation");

  const [{ maxPos }] = await db
    .select({ maxPos: max(lessonResources.position) })
    .from(lessonResources)
    .where(eq(lessonResources.lessonId, lessonId));

  const [created] = await db
    .insert(lessonResources)
    .values({
      lessonId,
      title: title.slice(0, 160),
      filePath: uploaded.filePath,
      sizeBytes: uploaded.sizeBytes,
      mimeType: file.type,
      position: (maxPos ?? -1) + 1,
    })
    .returning({ id: lessonResources.id });

  return ok(c, { id: created.id, title, sizeBytes: uploaded.sizeBytes }, 201);
});

adminRoutes.delete("/resources/:resourceId", requireAdmin, async (c) => {
  const [row] = await db
    .delete(lessonResources)
    .where(eq(lessonResources.id, c.req.param("resourceId")))
    .returning({ filePath: lessonResources.filePath });

  // Drop the stored file too, or it bills forever with nothing pointing at it.
  if (row?.filePath) await deleteObject(row.filePath);

  return ok(c, { deleted: true });
});
