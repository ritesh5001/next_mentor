"use server";

import { updateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/backend/db";
import { coupons, plans, users } from "@/backend/db/schema";
import { requireAdmin, requireInstructor } from "@/backend/lib/permissions";
import { PLANS_TAG } from "@/backend/services/plans";
import { CATALOG_TAG, courseTag, slugify } from "@/backend/services/courses";
import { normalizeCouponCode } from "@/backend/services/coupons";
import { createImageUpload } from "@/backend/lib/r2";
import type { ActionState } from "@/shared/action-state";

export type { ActionState };

/**
 * Admin management for plans, coupons and users.
 *
 * Every action opens with a permissions call. Server Actions are public HTTP
 * endpoints — anyone can POST a forged payload at one.
 */

/* -------------------------------------------------------------------- plans */

const planSchema = z.object({
  name: z.string().trim().min(2).max(60),
  tagline: z.string().trim().max(160).optional().or(z.literal("")),
  priceInRupees: z.coerce.number().int().min(0).max(1_000_000),
  mrpInRupees: z.coerce.number().int().min(0).max(1_000_000).optional(),
  // Blank means lifetime.
  durationDays: z.coerce.number().int().min(1).max(3650).optional(),
  // Percent in the form; basis points in the database.
  commissionPercent: z.coerce.number().min(0).max(100),
  features: z.string().max(2000).optional().or(z.literal("")),
  grantsAllCourses: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
  position: z.coerce.number().int().min(0).max(100).default(0),
});

function readPlanForm(formData: FormData) {
  return planSchema.safeParse({
    name: formData.get("name"),
    tagline: formData.get("tagline") ?? "",
    priceInRupees: formData.get("priceInRupees"),
    mrpInRupees: formData.get("mrpInRupees") || undefined,
    durationDays: formData.get("durationDays") || undefined,
    commissionPercent: formData.get("commissionPercent") || 0,
    features: formData.get("features") ?? "",
    grantsAllCourses: formData.get("grantsAllCourses") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    position: formData.get("position") || 0,
  });
}

/** One feature per line in the textarea, stored as a JSON array. */
function parseFeatures(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export async function createPlanAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = readPlanForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;

  try {
    await db.insert(plans).values({
      slug: slugify(d.name) || `plan-${Date.now()}`,
      name: d.name,
      tagline: d.tagline || null,
      priceInPaise: d.priceInRupees * 100,
      mrpInPaise: d.mrpInRupees ? d.mrpInRupees * 100 : null,
      durationDays: d.durationDays ?? null,
      // Percent -> basis points. Integer bps keeps commission maths exact.
      commissionRateBps: Math.round(d.commissionPercent * 100),
      features: parseFeatures(d.features),
      grantsAllCourses: d.grantsAllCourses ?? false,
      isFeatured: d.isFeatured ?? false,
      position: d.position,
    });
  } catch {
    return { error: "A plan with that name already exists." };
  }

  updateTag(PLANS_TAG);
  revalidatePath("/admin/plans");
  redirect("/admin/plans");
}

export async function updatePlanAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const planId = formData.get("planId");
  if (typeof planId !== "string") return { error: "Missing plan" };

  const parsed = readPlanForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;

  await db
    .update(plans)
    .set({
      name: d.name,
      tagline: d.tagline || null,
      priceInPaise: d.priceInRupees * 100,
      mrpInPaise: d.mrpInRupees ? d.mrpInRupees * 100 : null,
      durationDays: d.durationDays ?? null,
      commissionRateBps: Math.round(d.commissionPercent * 100),
      features: parseFeatures(d.features),
      grantsAllCourses: d.grantsAllCourses ?? false,
      isFeatured: d.isFeatured ?? false,
      position: d.position,
      updatedAt: new Date(),
    })
    .where(eq(plans.id, planId));

  updateTag(PLANS_TAG);
  revalidatePath("/admin/plans");
  return { success: "Saved" };
}

export async function setPlanActiveAction(planId: string, isActive: boolean): Promise<ActionState> {
  await requireAdmin();

  // Deactivating hides a plan from pricing but leaves existing members on it —
  // pulling access from people who paid would be theft.
  await db.update(plans).set({ isActive, updatedAt: new Date() }).where(eq(plans.id, planId));

  updateTag(PLANS_TAG);
  revalidatePath("/admin/plans");
  return { success: isActive ? "Plan is live" : "Plan hidden from pricing" };
}

/* ------------------------------------------------------------------ coupons */

const couponSchema = z
  .object({
    code: z.string().trim().min(3, "Codes need at least 3 characters").max(32),
    description: z.string().trim().max(200).optional().or(z.literal("")),
    discountType: z.enum(["percent", "flat"]),
    value: z.coerce.number().min(0.01, "Enter a discount above zero"),
    maxDiscountInRupees: z.coerce.number().int().min(0).optional(),
    minOrderInRupees: z.coerce.number().int().min(0).default(0),
    maxRedemptions: z.coerce.number().int().min(1).optional(),
    perUserLimit: z.coerce.number().int().min(1).max(100).default(1),
    validUntil: z.string().optional().or(z.literal("")),
  })
  .refine((v) => v.discountType !== "percent" || v.value <= 100, {
    message: "A percentage discount cannot exceed 100%",
    path: ["value"],
  });

export async function createCouponAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const admin = await requireAdmin();

  const parsed = couponSchema.safeParse({
    code: formData.get("code"),
    description: formData.get("description") ?? "",
    discountType: formData.get("discountType"),
    value: formData.get("value"),
    maxDiscountInRupees: formData.get("maxDiscountInRupees") || undefined,
    minOrderInRupees: formData.get("minOrderInRupees") || 0,
    maxRedemptions: formData.get("maxRedemptions") || undefined,
    perUserLimit: formData.get("perUserLimit") || 1,
    validUntil: formData.get("validUntil") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;
  const code = normalizeCouponCode(d.code);
  if (code.length < 3) return { error: "Use letters, numbers, dashes or underscores." };

  try {
    await db.insert(coupons).values({
      code,
      description: d.description || null,
      discountType: d.discountType,
      // Percent -> basis points; flat -> paise. Integers either way, so the
      // discount can never land a fraction of a paisa off the charged amount.
      value: d.discountType === "percent" ? Math.round(d.value * 100) : Math.round(d.value * 100),
      maxDiscountInPaise: d.maxDiscountInRupees ? d.maxDiscountInRupees * 100 : null,
      minOrderInPaise: d.minOrderInRupees * 100,
      maxRedemptions: d.maxRedemptions ?? null,
      perUserLimit: d.perUserLimit,
      validUntil: d.validUntil ? new Date(d.validUntil) : null,
      scope: "all",
      createdById: admin.id,
    });
  } catch {
    return { error: "That code already exists." };
  }

  revalidatePath("/admin/coupons");
  return { success: `Created ${code}` };
}

export async function setCouponActiveAction(
  couponId: string,
  isActive: boolean,
): Promise<ActionState> {
  await requireAdmin();

  await db
    .update(coupons)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(coupons.id, couponId));

  revalidatePath("/admin/coupons");
  return { success: isActive ? "Coupon enabled" : "Coupon disabled" };
}

export async function deleteCouponAction(couponId: string): Promise<ActionState> {
  await requireAdmin();

  // A redeemed coupon is part of the order history. Disable it instead of
  // destroying the record of what a customer was actually charged.
  const [{ used }] = await db
    .select({ used: coupons.usedCount })
    .from(coupons)
    .where(eq(coupons.id, couponId));

  if (used > 0) {
    return {
      error: `This code has been used ${used} time(s) and cannot be deleted — that would break order history. Disable it instead.`,
    };
  }

  await db.delete(coupons).where(eq(coupons.id, couponId));
  revalidatePath("/admin/coupons");
  return { success: "Coupon deleted" };
}

/* -------------------------------------------------------------------- users */

export async function setUserRoleAction(
  userId: string,
  role: "student" | "instructor" | "admin",
): Promise<ActionState> {
  const admin = await requireAdmin();

  // Removing your own admin rights locks you out of this page with no way back.
  if (userId === admin.id && role !== "admin") {
    return { error: "You cannot remove your own admin access." };
  }

  await db.update(users).set({ role, updatedAt: new Date() }).where(eq(users.id, userId));
  revalidatePath("/admin/users");
  return { success: `Role set to ${role}` };
}

export async function setUserBlockedAction(
  userId: string,
  isBlocked: boolean,
): Promise<ActionState> {
  const admin = await requireAdmin();

  if (userId === admin.id) return { error: "You cannot block your own account." };

  await db
    .update(users)
    .set({ isBlocked, updatedAt: new Date() })
    .where(eq(users.id, userId));

  revalidatePath("/admin/users");
  return { success: isBlocked ? "Account blocked" : "Account unblocked" };
}

/* --------------------------------------------------------------- thumbnails */

/**
 * Issues a presigned PUT so an admin can upload a course thumbnail straight
 * to R2. The file never passes through this server.
 */
export async function requestThumbnailUploadAction(input: {
  contentType: string;
  contentLength: number;
}): Promise<{ uploadUrl: string; key: string } | { error: string }> {
  await requireInstructor();

  const result = await createImageUpload({
    prefix: "thumbnails",
    contentType: input.contentType,
    contentLength: input.contentLength,
  });

  if ("error" in result) return result;
  return { uploadUrl: result.uploadUrl, key: result.key };
}

export async function setCourseThumbnailAction(
  courseId: string,
  key: string,
): Promise<ActionState> {
  await requireInstructor();

  const { courses } = await import("@/backend/db/schema");

  const [course] = await db
    .update(courses)
    .set({ thumbnailKey: key, updatedAt: new Date() })
    .where(eq(courses.id, courseId))
    .returning({ slug: courses.slug });

  if (course) {
    updateTag(CATALOG_TAG);
    updateTag(courseTag(course.slug));
    revalidatePath(`/admin/courses/${courseId}`);
  }

  return { success: "Thumbnail updated" };
}

/* ---------------------------------------------------------------- dashboard */

/** Headline numbers for the admin overview. */
export async function getRevenueSummary() {
  await requireAdmin();

  const { orders } = await import("@/backend/db/schema");

  const [totals] = await db
    .select({
      grossInPaise: sql<number>`cast(coalesce(sum(${orders.amountInPaise}) filter (where ${orders.status} = 'paid'), 0) as bigint)`,
      refundedInPaise: sql<number>`cast(coalesce(sum(${orders.amountInPaise}) filter (where ${orders.status} = 'refunded'), 0) as bigint)`,
      paidCount: sql<number>`cast(count(*) filter (where ${orders.status} = 'paid') as int)`,
      failedCount: sql<number>`cast(count(*) filter (where ${orders.status} = 'failed') as int)`,
    })
    .from(orders);

  return totals;
}
