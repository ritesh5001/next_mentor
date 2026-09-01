"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState, UploadAuth } from "@nextmentor/shared";

import { api, ApiError, API_BASE } from "@/lib/api";
import { SESSION_COOKIE } from "@/lib/session";

export type { ActionState };

/** Admin mutations, forwarded to the API. Role checks happen there. */

function form(fd: FormData): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) if (typeof v === "string") out[k] = v;
  return out;
}

async function run(fn: () => Promise<unknown>, paths: string[] = [], success = "Saved"): Promise<ActionState> {
  try {
    await fn();
    for (const p of paths) revalidatePath(p);
    return { success };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Something went wrong." };
  }
}

/* ----------------------------------------------------------------- courses */

export async function createCourseAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  let created: { id: string };
  try {
    created = await api<{ id: string; slug: string }>("/api/admin/courses", {
      method: "POST",
      body: form(fd),
    });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not create that course." };
  }
  redirect(`/admin/courses/${created.id}`);
}

export async function updateCourseAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const courseId = String(fd.get("courseId") ?? "");
  return run(
    () => api(`/api/admin/courses/${courseId}`, { method: "PATCH", body: form(fd) }),
    [`/admin/courses/${courseId}`],
  );
}

export async function setCourseStatusAction(
  courseId: string,
  status: "draft" | "published" | "archived",
): Promise<ActionState> {
  return run(
    () => api(`/api/admin/courses/${courseId}/status`, { method: "PATCH", body: { status } }),
    [`/admin/courses/${courseId}`, "/admin/courses"],
    status === "published" ? "Course is live" : `Course set to ${status}`,
  );
}

export async function deleteCourseAction(courseId: string): Promise<ActionState> {
  const result = await run(() => api(`/api/admin/courses/${courseId}`, { method: "DELETE" }));
  if (result?.error) return result;
  redirect("/admin/courses");
}

export async function createModuleAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(
    () => api("/api/admin/modules", { method: "POST", body: { courseId: fd.get("courseId"), title: fd.get("title") } }),
    [],
    "Section added",
  );
}

export async function deleteModuleAction(moduleId: string): Promise<ActionState> {
  return run(() => api(`/api/admin/modules/${moduleId}`, { method: "DELETE" }), [], "Section deleted");
}

export async function createLessonAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(
    () => api("/api/admin/lessons", { method: "POST", body: { moduleId: fd.get("moduleId"), title: fd.get("title") } }),
    [],
    "Lesson added",
  );
}

export async function updateLessonAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(() =>
    api(`/api/admin/lessons/${fd.get("lessonId")}`, {
      method: "PATCH",
      body: { title: fd.get("title"), isFreePreview: fd.get("isFreePreview") === "on" },
    }),
  );
}

export async function deleteLessonAction(lessonId: string): Promise<ActionState> {
  return run(() => api(`/api/admin/lessons/${lessonId}`, { method: "DELETE" }), [], "Lesson deleted");
}

export async function requestLessonUploadAction(
  lessonId: string,
): Promise<{ uploadUrl: string; videoId: string } | { error: string }> {
  try {
    return await api(`/api/admin/lessons/${lessonId}/upload`, { method: "POST" });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not start the upload." };
  }
}

/* ------------------------------------------------------------ thumbnails */

export async function requestThumbnailUploadAction(input: {
  contentType: string;
  contentLength: number;
}): Promise<UploadAuth | { error: string }> {
  try {
    return await api("/api/admin/uploads/image", {
      method: "POST",
      body: { ...input, prefix: "thumbnails" },
    });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not start the upload." };
  }
}

export async function setCourseThumbnailAction(courseId: string, key: string): Promise<ActionState> {
  return run(
    () => api(`/api/admin/courses/${courseId}/thumbnail`, { method: "PATCH", body: { key } }),
    [`/admin/courses/${courseId}`],
    "Thumbnail updated",
  );
}

/* ------------------------------------------------------------------ plans */

export async function createPlanAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const body = {
    ...form(fd),
    // One feature per line in the textarea, an array on the wire.
    features: String(fd.get("features") ?? "").split("\n").map((l) => l.trim()).filter(Boolean).slice(0, 20),
    grantsAllCourses: fd.get("grantsAllCourses") === "on",
    isFeatured: fd.get("isFeatured") === "on",
  };

  const result = await run(() => api("/api/admin/plans", { method: "POST", body }), ["/admin/plans"]);
  if (result?.error) return result;
  redirect("/admin/plans");
}

export async function updatePlanAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const planId = String(fd.get("planId") ?? "");
  return run(
    () =>
      api(`/api/admin/plans/${planId}`, {
        method: "PATCH",
        body: {
          ...form(fd),
          features: String(fd.get("features") ?? "").split("\n").map((l) => l.trim()).filter(Boolean),
          grantsAllCourses: fd.get("grantsAllCourses") === "on",
          isFeatured: fd.get("isFeatured") === "on",
        },
      }),
    // The detail page too, or the form keeps showing the values it just replaced.
    ["/admin/plans", `/admin/plans/${planId}`],
    "Plan updated",
  );
}

export async function setPlanActiveAction(planId: string, isActive: boolean): Promise<ActionState> {
  return run(
    () => api(`/api/admin/plans/${planId}`, { method: "PATCH", body: { isActive } }),
    ["/admin/plans"],
    isActive ? "Plan is live" : "Plan hidden from pricing",
  );
}

/* ---------------------------------------------------------------- coupons */

export async function createCouponAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(() => api("/api/admin/coupons", { method: "POST", body: form(fd) }), ["/admin/coupons"], "Coupon created");
}

export async function setCouponActiveAction(couponId: string, isActive: boolean): Promise<ActionState> {
  return run(
    () => api(`/api/admin/coupons/${couponId}`, { method: "PATCH", body: { isActive } }),
    ["/admin/coupons"],
    isActive ? "Coupon enabled" : "Coupon disabled",
  );
}

export async function deleteCouponAction(couponId: string): Promise<ActionState> {
  return run(() => api(`/api/admin/coupons/${couponId}`, { method: "DELETE" }), ["/admin/coupons"], "Coupon deleted");
}

/* ------------------------------------------------------------------ users */

export async function setUserRoleAction(
  userId: string,
  role: "student" | "instructor" | "admin",
): Promise<ActionState> {
  return run(() => api(`/api/admin/users/${userId}`, { method: "PATCH", body: { role } }), ["/admin/users"], `Role set to ${role}`);
}

export async function setUserBlockedAction(userId: string, isBlocked: boolean): Promise<ActionState> {
  return run(
    () => api(`/api/admin/users/${userId}`, { method: "PATCH", body: { isBlocked } }),
    ["/admin/users"],
    isBlocked ? "Account blocked" : "Account unblocked",
  );
}

/* ------------------------------------------------------------- KYC/payouts */

export async function reviewKycAction(
  kycId: string,
  decision: "approved" | "rejected",
  reason?: string,
): Promise<ActionState> {
  return run(
    () => api(`/api/admin/kyc/${kycId}`, { method: "PATCH", body: { decision, reason } }),
    ["/admin/kyc"],
    decision === "approved" ? "KYC approved" : "KYC rejected",
  );
}

export async function approvePayoutAction(payoutId: string): Promise<ActionState> {
  return run(
    () => api(`/api/admin/payouts/${payoutId}`, { method: "PATCH", body: { action: "approve" } }),
    ["/admin/payouts"],
    "Approved. Transfer the funds, then mark it paid with the UTR.",
  );
}

export async function markPayoutPaidAction(payoutId: string, utrNumber: string): Promise<ActionState> {
  return run(
    () => api(`/api/admin/payouts/${payoutId}`, { method: "PATCH", body: { action: "paid", utrNumber } }),
    ["/admin/payouts"],
    `Marked paid · UTR ${utrNumber}`,
  );
}

export async function rejectPayoutAction(payoutId: string, reason: string): Promise<ActionState> {
  return run(
    () => api(`/api/admin/payouts/${payoutId}`, { method: "PATCH", body: { action: "reject", reason } }),
    ["/admin/payouts"],
    "Rejected and funds returned to the wallet.",
  );
}

/* ---------------------------------------------------------------- content */

export async function createPromoAssetAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(
    () => api("/api/admin/content/promo", { method: "POST", body: { ...form(fd), position: Number(fd.get("position") ?? 0) } }),
    ["/admin/content", "/dashboard/promo"],
    "Asset added",
  );
}

export async function setPromoAssetActiveAction(id: string, isActive: boolean): Promise<ActionState> {
  return run(
    () => api(`/api/admin/content/promo/${id}`, { method: "PATCH", body: { isActive } }),
    ["/admin/content", "/dashboard/promo"],
    isActive ? "Published" : "Hidden",
  );
}

export async function deletePromoAssetAction(id: string): Promise<ActionState> {
  return run(() => api(`/api/admin/content/promo/${id}`, { method: "DELETE" }), ["/admin/content", "/dashboard/promo"], "Deleted");
}

export async function requestPromoUploadAction(input: {
  contentType: string;
  contentLength: number;
}): Promise<UploadAuth | { error: string }> {
  try {
    return await api("/api/admin/uploads/image", { method: "POST", body: { ...input, prefix: "promo" } });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not start the upload." };
  }
}

export async function createTrainingModuleAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(
    () => api("/api/admin/content/training", { method: "POST", body: { ...form(fd), position: Number(fd.get("position") ?? 0) } }),
    ["/admin/content", "/dashboard/training"],
    "Module added. Upload its video next.",
  );
}

export async function requestTrainingUploadAction(
  moduleId: string,
): Promise<{ uploadUrl: string; videoId: string } | { error: string }> {
  try {
    return await api(`/api/admin/content/training/${moduleId}/upload`, { method: "POST" });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not start the upload." };
  }
}

export async function deleteTrainingModuleAction(id: string): Promise<ActionState> {
  return run(() => api(`/api/admin/content/training/${id}`, { method: "DELETE" }), ["/admin/content", "/dashboard/training"], "Deleted");
}

export async function createMentorshipSlotAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(
    () =>
      api("/api/admin/content/mentorship", {
        method: "POST",
        body: {
          ...form(fd),
          durationMinutes: Number(fd.get("durationMinutes") ?? 60),
          capacity: Number(fd.get("capacity") ?? 1),
        },
      }),
    ["/admin/content", "/dashboard/mentorship"],
    "Session scheduled",
  );
}

export async function cancelMentorshipSlotAction(id: string): Promise<ActionState> {
  return run(
    () => api(`/api/admin/content/mentorship/${id}`, { method: "DELETE" }),
    ["/admin/content", "/dashboard/mentorship"],
    "Session cancelled. Booked attendees keep their record.",
  );
}

/**
 * Attaches a downloadable file to a lesson.
 *
 * Multipart forwarded straight to the API — the bytes go through the server so
 * it can force ImageKit's private flag. See lib/imagekit.ts on the backend.
 */
export async function uploadLessonResourceAction(
  lessonId: string,
  formData: FormData,
): Promise<ActionState> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return { error: "Your session expired. Sign in again." };

  try {
    const res = await fetch(`${API_BASE}/api/admin/lessons/${lessonId}/resources`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const payload = (await res.json()) as { ok: boolean; error?: string };
    if (!payload.ok) return { error: payload.error ?? "Could not attach that file." };
  } catch {
    return { error: "Could not attach that file. Check your connection." };
  }

  revalidatePath("/admin/courses");
  return { success: "Attached" };
}

export async function deleteLessonResourceAction(resourceId: string): Promise<ActionState> {
  try {
    await api(`/api/admin/resources/${resourceId}`, { method: "DELETE" });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not remove that file." };
  }
  revalidatePath("/admin/courses");
  return { success: "Removed" };
}
