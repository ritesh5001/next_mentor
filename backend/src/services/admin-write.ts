import { and, asc, desc, eq, max, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  coupons,
  courses,
  kycSubmissions,
  lessons,
  mentorshipSlots,
  modules,
  orders,
  payoutRequests,
  plans,
  promoAssets,
  trainingModules,
  users,
} from "@/db/schema";
import { invalidateTag } from "@/lib/cache";
import { CATALOG_TAG, courseTag, slugify, uniqueSlug } from "./courses";
import { PLANS_TAG } from "./plans";
import { normalizeCouponCode } from "./coupons";
import { createDirectUpload, deleteVideo } from "@/lib/cloudflare-stream";
import { deleteObject, createUploadAuth } from "@/lib/imagekit";
import { formatPaise } from "@/lib/razorpay";
import {
  sendKycApprovedEmail,
  sendKycRejectedEmail,
  sendPayoutApprovedEmail,
  sendPayoutPaidEmail,
  sendPayoutRejectedEmail,
} from "@/lib/email";

/**
 * Admin mutations.
 *
 * Lifted from the old Server Actions with the Next-specific parts removed:
 * `requireAdmin()` now runs as route middleware, `revalidatePath()` has no
 * meaning across a network boundary, and `updateTag()` became `invalidateTag()`
 * against this process's own cache.
 */

type Result<T = Record<string, unknown>> = ({ ok: true } & T) | { ok: false; error: string };

/* ----------------------------------------------------------------- courses */

type CourseInput = {
  title: string;
  subtitle?: string;
  description?: string;
  instructorName?: string;
  priceInRupees: number;
  mrpInRupees?: number;
  level: "beginner" | "intermediate" | "advanced";
  language: string;
};

function courseValues(d: CourseInput) {
  return {
    title: d.title,
    subtitle: d.subtitle || null,
    description: d.description || null,
    instructorName: d.instructorName || null,
    // Rupees on the wire, paise in the database — converted here so no other
    // layer has to remember which unit it is holding.
    priceInPaise: d.priceInRupees * 100,
    mrpInPaise: d.mrpInRupees ? d.mrpInRupees * 100 : null,
    level: d.level,
    language: d.language,
  };
}

export async function createCourse(d: CourseInput) {
  const [created] = await db
    .insert(courses)
    .values({ ...courseValues(d), slug: await uniqueSlug(d.title), status: "draft" })
    .returning({ id: courses.id, slug: courses.slug });

  invalidateTag(CATALOG_TAG);
  return { id: created.id, slug: created.slug };
}

export async function updateCourse(courseId: string, d: CourseInput): Promise<Result> {
  const [existing] = await db
    .select({ slug: courses.slug, title: courses.title })
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  if (!existing) return { ok: false, error: "That course no longer exists" };

  // The slug only moves if the title actually changed — otherwise every save
  // would break links affiliates have already shared.
  const slug =
    existing.title === d.title ? existing.slug : await uniqueSlug(d.title, courseId);

  await db
    .update(courses)
    .set({ ...courseValues(d), slug, updatedAt: new Date() })
    .where(eq(courses.id, courseId));

  invalidateTag(CATALOG_TAG);
  invalidateTag(courseTag(existing.slug));
  if (slug !== existing.slug) invalidateTag(courseTag(slug));

  return { ok: true, slug };
}

export async function setCourseStatus(
  courseId: string,
  status: "draft" | "published" | "archived",
): Promise<Result> {
  const [course] = await db
    .select({ slug: courses.slug, publishedAt: courses.publishedAt })
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  if (!course) return { ok: false, error: "That course no longer exists" };

  if (status === "published") {
    // Publishing with no playable lesson puts a buy button in front of an empty
    // player. Refuse rather than let someone pay for nothing.
    const [{ readyCount }] = await db
      .select({ readyCount: sql<number>`cast(count(*) as int)` })
      .from(lessons)
      .innerJoin(modules, eq(modules.id, lessons.moduleId))
      .where(and(eq(modules.courseId, courseId), eq(lessons.videoStatus, "ready")));

    if (readyCount === 0) {
      return { ok: false, error: "Add at least one lesson with a processed video before publishing." };
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

  invalidateTag(CATALOG_TAG);
  invalidateTag(courseTag(course.slug));
  return { ok: true, status };
}

export async function deleteCourse(courseId: string): Promise<Result> {
  const [course] = await db
    .select({ slug: courses.slug })
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  if (!course) return { ok: false, error: "That course no longer exists" };

  // orders.courseId is RESTRICT on purpose: a paid order is a financial record
  // that must survive the course being taken down.
  const [{ orderCount }] = await db
    .select({ orderCount: sql<number>`cast(count(*) as int)` })
    .from(orders)
    .where(eq(orders.courseId, courseId));

  if (orderCount > 0) {
    return {
      ok: false,
      error: `This course has ${orderCount} order(s) and cannot be deleted — that would destroy financial records. Archive it instead.`,
    };
  }

  const videoRows = await db
    .select({ streamVideoId: lessons.streamVideoId })
    .from(lessons)
    .innerJoin(modules, eq(modules.id, lessons.moduleId))
    .where(eq(modules.courseId, courseId));

  for (const row of videoRows) {
    if (row.streamVideoId) await safeDeleteVideo(row.streamVideoId);
  }

  await db.delete(courses).where(eq(courses.id, courseId));

  invalidateTag(CATALOG_TAG);
  invalidateTag(courseTag(course.slug));
  return { ok: true };
}

export async function setCourseThumbnail(courseId: string, key: string) {
  const [course] = await db
    .update(courses)
    .set({ thumbnailKey: key, updatedAt: new Date() })
    .where(eq(courses.id, courseId))
    .returning({ slug: courses.slug });

  if (course) {
    invalidateTag(CATALOG_TAG);
    invalidateTag(courseTag(course.slug));
  }
}

/** A failed remote delete must not block the local one. */
async function safeDeleteVideo(videoId: string) {
  try {
    await deleteVideo(videoId);
  } catch (err) {
    console.error("[admin] Stream delete failed — video may be orphaned", videoId, err);
  }
}

/* ------------------------------------------------------- modules + lessons */

export async function createModule(input: { courseId: string; title: string }) {
  const [{ maxPos }] = await db
    .select({ maxPos: max(modules.position) })
    .from(modules)
    .where(eq(modules.courseId, input.courseId));

  await db.insert(modules).values({
    courseId: input.courseId,
    title: input.title,
    position: (maxPos ?? -1) + 1,
  });
}

export async function deleteModule(moduleId: string) {
  const videoRows = await db
    .select({ streamVideoId: lessons.streamVideoId })
    .from(lessons)
    .where(eq(lessons.moduleId, moduleId));

  await db.delete(modules).where(eq(modules.id, moduleId));

  for (const v of videoRows) {
    if (v.streamVideoId) await safeDeleteVideo(v.streamVideoId);
  }

  invalidateTag(CATALOG_TAG);
}

export async function createLesson(input: { moduleId: string; title: string }) {
  const [{ maxPos }] = await db
    .select({ maxPos: max(lessons.position) })
    .from(lessons)
    .where(eq(lessons.moduleId, input.moduleId));

  await db.insert(lessons).values({
    moduleId: input.moduleId,
    title: input.title,
    position: (maxPos ?? -1) + 1,
  });

  invalidateTag(CATALOG_TAG);
}

export async function updateLesson(
  lessonId: string,
  input: { title: string; isFreePreview: boolean },
) {
  await db
    .update(lessons)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(lessons.id, lessonId));

  invalidateTag(CATALOG_TAG);
}

export async function deleteLesson(lessonId: string) {
  const [row] = await db
    .delete(lessons)
    .where(eq(lessons.id, lessonId))
    .returning({ streamVideoId: lessons.streamVideoId });

  if (row?.streamVideoId) await safeDeleteVideo(row.streamVideoId);
  invalidateTag(CATALOG_TAG);
}

/**
 * One-time Cloudflare upload URL for a lesson.
 *
 * The browser PUTs straight to Cloudflare, so a 2GB video is no harder than a
 * 20MB one and nothing streams through this server.
 */
export async function requestLessonUpload(
  lessonId: string,
): Promise<{ uploadUrl: string; videoId: string } | { error: string }> {
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
    if (lesson.existing && lesson.existing !== videoId) await safeDeleteVideo(lesson.existing);

    return { uploadUrl, videoId };
  } catch (err) {
    console.error("[admin] Could not create direct upload", err);
    return { error: "Could not start the upload. Check the Cloudflare credentials." };
  }
}

/* ------------------------------------------------------------------- plans */

type PlanInput = {
  name: string;
  tagline?: string;
  priceInRupees: number;
  mrpInRupees?: number;
  durationDays?: number;
  commissionPercent: number;
  features?: string[];
  grantsAllCourses?: boolean;
  isFeatured?: boolean;
  position?: number;
  isActive?: boolean;
};

function planValues(d: PlanInput) {
  return {
    name: d.name,
    tagline: d.tagline || null,
    priceInPaise: d.priceInRupees * 100,
    mrpInPaise: d.mrpInRupees ? d.mrpInRupees * 100 : null,
    durationDays: d.durationDays ?? null,
    // Percent on the wire, basis points in the database — integer bps keeps
    // commission arithmetic exact.
    commissionRateBps: Math.round(d.commissionPercent * 100),
    features: d.features ?? [],
    grantsAllCourses: d.grantsAllCourses ?? false,
    isFeatured: d.isFeatured ?? false,
    position: d.position ?? 0,
  };
}

export async function createPlan(d: PlanInput): Promise<Result> {
  try {
    await db.insert(plans).values({
      ...planValues(d),
      slug: slugify(d.name) || `plan-${Date.now()}`,
    });
  } catch {
    return { ok: false, error: "A plan with that name already exists." };
  }

  invalidateTag(PLANS_TAG);
  return { ok: true };
}

export async function updatePlan(planId: string, d: Partial<PlanInput>) {
  const patch: Record<string, unknown> = { updatedAt: new Date() };

  if (d.name !== undefined) patch.name = d.name;
  if (d.tagline !== undefined) patch.tagline = d.tagline || null;
  if (d.priceInRupees !== undefined) patch.priceInPaise = d.priceInRupees * 100;
  if (d.mrpInRupees !== undefined) patch.mrpInPaise = d.mrpInRupees ? d.mrpInRupees * 100 : null;
  if (d.durationDays !== undefined) patch.durationDays = d.durationDays ?? null;
  if (d.commissionPercent !== undefined) {
    patch.commissionRateBps = Math.round(d.commissionPercent * 100);
  }
  if (d.features !== undefined) patch.features = d.features;
  if (d.grantsAllCourses !== undefined) patch.grantsAllCourses = d.grantsAllCourses;
  if (d.isFeatured !== undefined) patch.isFeatured = d.isFeatured;
  if (d.position !== undefined) patch.position = d.position;
  // Deactivating hides a plan from pricing but leaves existing members on it —
  // pulling access from people who paid would be theft.
  if (d.isActive !== undefined) patch.isActive = d.isActive;

  await db.update(plans).set(patch).where(eq(plans.id, planId));
  invalidateTag(PLANS_TAG);
}

/* ----------------------------------------------------------------- coupons */

type CouponInput = {
  code: string;
  description?: string;
  discountType: "percent" | "flat";
  value: number;
  maxDiscountInRupees?: number;
  minOrderInRupees: number;
  maxRedemptions?: number;
  perUserLimit: number;
  validUntil?: string;
};

export async function createCoupon(d: CouponInput, adminId: string): Promise<Result> {
  const code = normalizeCouponCode(d.code);
  if (code.length < 3) {
    return { ok: false, error: "Use letters, numbers, dashes or underscores." };
  }
  if (d.discountType === "percent" && d.value > 100) {
    return { ok: false, error: "A percentage discount cannot exceed 100%." };
  }

  try {
    await db.insert(coupons).values({
      code,
      description: d.description || null,
      discountType: d.discountType,
      // Percent -> basis points, flat -> paise. Integers either way, so the
      // discount can never land a fraction of a paisa off the charged amount.
      value: Math.round(d.value * 100),
      maxDiscountInPaise: d.maxDiscountInRupees ? d.maxDiscountInRupees * 100 : null,
      minOrderInPaise: d.minOrderInRupees * 100,
      maxRedemptions: d.maxRedemptions ?? null,
      perUserLimit: d.perUserLimit,
      validUntil: d.validUntil ? new Date(d.validUntil) : null,
      scope: "all",
      createdById: adminId,
    });
  } catch {
    return { ok: false, error: "That code already exists." };
  }

  return { ok: true, code };
}

export async function setCouponActive(couponId: string, isActive: boolean) {
  await db.update(coupons).set({ isActive, updatedAt: new Date() }).where(eq(coupons.id, couponId));
}

export async function deleteCoupon(couponId: string): Promise<Result> {
  const [row] = await db
    .select({ used: coupons.usedCount })
    .from(coupons)
    .where(eq(coupons.id, couponId))
    .limit(1);

  if (!row) return { ok: false, error: "That coupon no longer exists." };

  // A redeemed coupon is part of the order history. Disabling preserves the
  // record of what a customer was actually charged.
  if (row.used > 0) {
    return {
      ok: false,
      error: `This code has been used ${row.used} time(s) and cannot be deleted. Disable it instead.`,
    };
  }

  await db.delete(coupons).where(eq(coupons.id, couponId));
  return { ok: true };
}

/* ------------------------------------------------------------------- users */

export async function updateUser(
  userId: string,
  adminId: string,
  patch: { role?: "student" | "admin"; isBlocked?: boolean },
): Promise<Result> {
  // Removing your own admin rights locks you out with no way back.
  if (userId === adminId && patch.role && patch.role !== "admin") {
    return { ok: false, error: "You cannot remove your own admin access." };
  }
  if (userId === adminId && patch.isBlocked) {
    return { ok: false, error: "You cannot block your own account." };
  }

  await db
    .update(users)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(users.id, userId));

  return { ok: true };
}

/* --------------------------------------------------------------------- KYC */

export async function reviewKyc(
  kycId: string,
  adminId: string,
  decision: "approved" | "rejected",
  reason?: string,
): Promise<Result> {
  // A rejection with no reason leaves the user nothing to correct.
  if (decision === "rejected" && !reason?.trim()) {
    return { ok: false, error: "Give a reason so the user knows what to correct." };
  }

  const [updated] = await db
    .update(kycSubmissions)
    .set({
      status: decision,
      rejectionReason: decision === "rejected" ? (reason ?? "").slice(0, 500) : null,
      reviewedById: adminId,
      reviewedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(kycSubmissions.id, kycId))
    .returning({ userId: kycSubmissions.userId });

  if (updated) {
    const [person] = await db
      .select({ email: users.email, name: users.name })
      .from(users)
      .where(eq(users.id, updated.userId))
      .limit(1);

    // This gates their ability to withdraw, so it never changes silently.
    if (person) {
      if (decision === "approved") await sendKycApprovedEmail(person.email, person.name);
      else await sendKycRejectedEmail(person.email, reason ?? "Please check your details.");
    }
  }

  return { ok: true };
}

/** Emails the affiliate about a payout transition. Never throws. */
export async function notifyPayout(
  payoutId: string,
  event: "approve" | "paid" | "reject",
  detail?: string,
) {
  try {
    const [row] = await db
      .select({
        amountInPaise: payoutRequests.amountInPaise,
        utrNumber: payoutRequests.utrNumber,
        email: users.email,
      })
      .from(payoutRequests)
      .innerJoin(users, eq(users.id, payoutRequests.userId))
      .where(eq(payoutRequests.id, payoutId))
      .limit(1);

    if (!row) return;
    const amount = formatPaise(row.amountInPaise);

    if (event === "approve") await sendPayoutApprovedEmail(row.email, amount);
    else if (event === "paid") {
      await sendPayoutPaidEmail(row.email, amount, row.utrNumber ?? detail ?? "—");
    } else await sendPayoutRejectedEmail(row.email, amount, detail ?? "No reason given.");
  } catch (err) {
    console.error("[admin] Payout notification failed", payoutId, event, err);
  }
}

/* ----------------------------------------------------------------- content */

export const listPromoAssets = () =>
  db.select().from(promoAssets).orderBy(asc(promoAssets.position));

export const listTrainingModules = () =>
  db.select().from(trainingModules).orderBy(asc(trainingModules.position));

export const listMentorshipSlots = () =>
  db.select().from(mentorshipSlots).orderBy(desc(mentorshipSlots.startsAt));

export async function createPromoAsset(input: {
  title: string;
  description?: string;
  type: "banner" | "video" | "script" | "pdf";
  r2Key?: string;
  bodyText?: string;
  dimensions?: string;
  planRequiredId?: string;
  position?: number;
}): Promise<Result> {
  // A script is copy to paste, everything else is a file. Saving one without
  // the other produces a card with nothing behind it.
  if (input.type === "script" && !input.bodyText) {
    return { ok: false, error: "A script asset needs its copy in the body field." };
  }
  if (input.type !== "script" && !input.r2Key) {
    return { ok: false, error: "Upload the file before saving." };
  }

  await db.insert(promoAssets).values({
    title: input.title,
    description: input.description || null,
    type: input.type,
    r2Key: input.r2Key || null,
    bodyText: input.bodyText || null,
    dimensions: input.dimensions || null,
    planRequiredId: input.planRequiredId || null,
    position: input.position ?? 0,
  });

  return { ok: true };
}

export async function deletePromoAsset(id: string) {
  const [row] = await db
    .delete(promoAssets)
    .where(eq(promoAssets.id, id))
    .returning({ r2Key: promoAssets.r2Key });

  // Drop the file too, or it bills forever with nothing pointing at it.
  if (row?.r2Key) await deleteObject(row.r2Key);
}

export async function createTrainingModule(input: {
  title: string;
  description?: string;
  planRequiredId?: string;
  position?: number;
}): Promise<Result> {
  await db.insert(trainingModules).values({
    title: input.title,
    description: input.description || null,
    planRequiredId: input.planRequiredId || null,
    position: input.position ?? 0,
  });
  return { ok: true };
}

export async function requestTrainingUpload(
  moduleId: string,
): Promise<{ uploadUrl: string; videoId: string } | { error: string }> {
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

    if (mod.existing && mod.existing !== videoId) await safeDeleteVideo(mod.existing);

    return { uploadUrl, videoId };
  } catch (err) {
    console.error("[admin] Could not create training upload", err);
    return { error: "Could not start the upload. Check the Cloudflare credentials." };
  }
}

export async function deleteTrainingModule(id: string) {
  const [row] = await db
    .delete(trainingModules)
    .where(eq(trainingModules.id, id))
    .returning({ streamVideoId: trainingModules.streamVideoId });

  if (row?.streamVideoId) await safeDeleteVideo(row.streamVideoId);
}

export async function createMentorshipSlot(
  input: {
    title: string;
    description?: string;
    mentorName: string;
    startsAt: string;
    durationMinutes: number;
    capacity: number;
    meetingUrl?: string;
    planRequiredId?: string;
  },
  adminId: string,
): Promise<Result> {
  const startsAt = new Date(input.startsAt);

  if (Number.isNaN(startsAt.getTime())) {
    return { ok: false, error: "That start time is not valid." };
  }
  // A session in the past is filtered out of every read query, so saving one
  // just creates a row nobody will ever see.
  if (startsAt <= new Date()) {
    return { ok: false, error: "Pick a start time in the future." };
  }

  await db.insert(mentorshipSlots).values({
    mentorId: adminId,
    mentorName: input.mentorName,
    title: input.title,
    description: input.description || null,
    startsAt,
    endsAt: new Date(startsAt.getTime() + input.durationMinutes * 60 * 1000),
    capacity: input.capacity,
    meetingUrl: input.meetingUrl || null,
    planRequiredId: input.planRequiredId || null,
  });

  return { ok: true };
}

export async function cancelMentorshipSlot(id: string) {
  // Cancel rather than delete: the bookings record who signed up, and dropping
  // the row would cascade them away.
  await db.update(mentorshipSlots).set({ isCancelled: true }).where(eq(mentorshipSlots.id, id));
}

export { createUploadAuth };
