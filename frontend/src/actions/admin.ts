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
  contentType: string,
): Promise<{ uploadUrl: string; videoId: string } | { error: string }> {
  try {
    return await api(`/api/admin/lessons/${lessonId}/upload`, {
      method: "POST",
      body: { contentType },
    });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not start the upload." };
  }
}

/**
 * Marks the lesson playable after the browser finishes its PUT.
 *
 * R2 has no transcode webhook, so nothing else would ever flip the lesson to
 * "ready". The server re-checks that the object exists before trusting this.
 */
export async function confirmLessonUploadAction(
  lessonId: string,
  key: string,
  durationSeconds: number,
): Promise<ActionState> {
  return run(
    () =>
      api(`/api/admin/lessons/${lessonId}/upload/confirm`, {
        method: "POST",
        body: { key, durationSeconds },
      }),
    [`/admin/courses`],
    "Video uploaded",
  );
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

/* ----------------------------------------------------------- user access */

export async function grantAccessAction(
  userId: string,
  itemType: "course" | "plan",
  itemId: string,
): Promise<ActionState> {
  return run(
    () =>
      api(`/api/admin/users/${userId}/access`, {
        method: "POST",
        body: { itemType, itemId },
      }),
    [`/admin/users/${userId}`, "/admin/users"],
    itemType === "course" ? "Course access granted" : "Plan granted",
  );
}

export async function revokeAccessAction(
  userId: string,
  itemType: "course" | "plan",
  itemId?: string,
): Promise<ActionState> {
  const q = new URLSearchParams({ itemType, ...(itemId ? { itemId } : {}) });
  return run(
    () => api(`/api/admin/users/${userId}/access?${q}`, { method: "DELETE" }),
    [`/admin/users/${userId}`, "/admin/users"],
    "Access revoked",
  );
}

/* ---------------------------------------------------------------- coupons */

export async function createCouponAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  // An unticked checkbox is absent from FormData, so this is false rather
  // than undefined and the API sees a real boolean.
  const body = { ...form(fd), visibleToAssignee: fd.get("visibleToAssignee") === "on" };
  return run(() => api("/api/admin/coupons", { method: "POST", body }), ["/admin/coupons"], "Coupon created");
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

/**
 * Records a transfer made during the Monday payout run. Unlike marking a
 * member's own request paid, this both debits their wallet and closes the
 * payout, so the balance on their dashboard drops the moment it is recorded.
 */
export async function recordPayoutRunAction(
  userId: string,
  amountInPaise: number,
  utrNumber: string,
): Promise<ActionState> {
  return run(
    () => api("/api/admin/payout-run", { method: "POST", body: { userId, amountInPaise, utrNumber } }),
    ["/admin/payout-run", "/admin/payouts", "/admin/earnings"],
    `Recorded · UTR ${utrNumber}`,
  );
}

/* ----------------------------------------------------------------- offers */

/** The form posts criteria as JSON so the target rows stay one field. */
function offerBody(fd: FormData) {
  const criteria = JSON.parse(String(fd.get("criteria") ?? "[]")) as Array<{
    metric: string;
    target: number;
    label?: string;
  }>;
  return {
    title: String(fd.get("title") ?? ""),
    description: String(fd.get("description") ?? ""),
    reward: String(fd.get("reward") ?? ""),
    imageUrl: String(fd.get("imageUrl") ?? ""),
    startsAt: String(fd.get("startsAt") ?? ""),
    endsAt: String(fd.get("endsAt") ?? "") || null,
    criteria,
    isPublished: fd.get("isPublished") === "on",
    position: Number(fd.get("position") ?? 0),
  };
}

export async function createOfferAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(
    () => api("/api/admin/offers", { method: "POST", body: offerBody(fd) }),
    ["/admin/offers", "/dashboard/offers"],
    "Offer created.",
  );
}

export async function updateOfferAction(
  offerId: string,
  _p: ActionState,
  fd: FormData,
): Promise<ActionState> {
  return run(
    () => api(`/api/admin/offers/${offerId}`, { method: "PATCH", body: offerBody(fd) }),
    ["/admin/offers", "/dashboard/offers"],
    "Offer updated.",
  );
}

/** Release or withdraw an offer without touching anything else about it. */
export async function setOfferPublishedAction(
  offerId: string,
  isPublished: boolean,
): Promise<ActionState> {
  return run(
    () => api(`/api/admin/offers/${offerId}`, { method: "PATCH", body: { isPublished } }),
    ["/admin/offers", "/dashboard/offers"],
    isPublished ? "Offer released to members." : "Offer withdrawn.",
  );
}

export async function deleteOfferAction(offerId: string): Promise<ActionState> {
  return run(
    () => api(`/api/admin/offers/${offerId}`, { method: "DELETE" }),
    ["/admin/offers", "/dashboard/offers"],
    "Offer deleted.",
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
export async function requestResourceUploadAction(
  lessonId: string,
  input: { contentType: string; fileName: string; sizeBytes: number },
): Promise<{ uploadUrl: string; key: string } | { error: string }> {
  try {
    return await api(`/api/admin/lessons/${lessonId}/resources/upload`, {
      method: "POST",
      body: input,
    });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not start the upload." };
  }
}

/**
 * Records the attachment after the browser has PUT it to R2.
 *
 * The file itself never comes through here. A Server Action caps its request
 * body at 1MB and Vercel caps a serverless request at 4.5MB, so the old
 * version — which forwarded the bytes — silently failed on any real workbook.
 */
export async function confirmResourceUploadAction(
  lessonId: string,
  input: { key: string; title: string; mimeType: string },
): Promise<ActionState> {
  return run(
    () => api(`/api/admin/lessons/${lessonId}/resources`, { method: "POST", body: input }),
    ["/admin/courses"],
    "Attached",
  );
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

/* ------------------------------------------------------------ free member */

/** Creates an active member with a free plan and emails their credentials. */
export async function createFreeMemberAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const res = await api<{ memberId: string }>("/api/admin/members", {
      method: "POST",
      body: form(fd),
    });
    revalidatePath("/admin/users");
    return {
      success: `Member created — ID ${res.memberId}. Login details have been emailed to ${String(fd.get("email") ?? "")}.`,
    };
  } catch (err) {
    if (err instanceof ApiError && err.fields) {
      return { error: Object.values(err.fields)[0] ?? err.message };
    }
    return { error: err instanceof ApiError ? err.message : "Something went wrong." };
  }
}

/* ------------------------------------------------------ student feedback */

export async function createTestimonialAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(
    () => api("/api/admin/testimonials", { method: "POST", body: form(fd) }),
    ["/admin/testimonials", "/"],
    "Feedback added",
  );
}

export async function setTestimonialPublishedAction(id: string, isPublished: boolean): Promise<ActionState> {
  return run(
    () => api(`/api/admin/testimonials/${id}`, { method: "PATCH", body: { isPublished } }),
    ["/admin/testimonials", "/"],
    isPublished ? "Shown on the homepage" : "Hidden from the homepage",
  );
}

export async function deleteTestimonialAction(id: string): Promise<ActionState> {
  return run(
    () => api(`/api/admin/testimonials/${id}`, { method: "DELETE" }),
    ["/admin/testimonials", "/"],
    "Feedback deleted",
  );
}

/* --------------------------------------------------------- certificates */

/** Issues a certificate by hand, to a member or to anyone else by name. */
export async function issueCertificateAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const res = await api<{ serial: string }>("/api/admin/certificates", {
      method: "POST",
      body: form(fd),
    });
    revalidatePath("/admin/certificates");
    return { success: `Certificate issued — ${res.serial}. It can be downloaded and verified now.` };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Something went wrong." };
  }
}

export async function setCertificateRevokedAction(serial: string, revoked: boolean): Promise<ActionState> {
  return run(
    () => api(`/api/admin/certificates/${serial}`, { method: "PATCH", body: { revoked } }),
    ["/admin/certificates"],
    revoked ? "Certificate revoked" : "Certificate restored",
  );
}

/* ------------------------------------------------------ member details */

export async function updateUserDetailsAction(
  userId: string,
  _p: ActionState,
  fd: FormData,
): Promise<ActionState> {
  try {
    await api(`/api/admin/users/${userId}/details`, { method: "PATCH", body: form(fd) });
    revalidatePath(`/admin/users/${userId}`);
    revalidatePath("/admin/users");
    return { success: "Details saved" };
  } catch (err) {
    if (err instanceof ApiError && err.fields) {
      return { error: Object.values(err.fields)[0] ?? err.message };
    }
    return { error: err instanceof ApiError ? err.message : "Something went wrong." };
  }
}

export async function setUserPasswordAction(
  userId: string,
  _p: ActionState,
  fd: FormData,
): Promise<ActionState> {
  try {
    const res = await api<{ emailed: boolean }>(`/api/admin/users/${userId}/password`, {
      method: "POST",
      body: {
        password: String(fd.get("password") ?? ""),
        emailMember: fd.get("emailMember") === "on",
      },
    });
    return {
      success: res.emailed
        ? "New password set and emailed to the member."
        : "New password set. Share it with the member yourself.",
    };
  } catch (err) {
    if (err instanceof ApiError && err.fields) {
      return { error: Object.values(err.fields)[0] ?? err.message };
    }
    return { error: err instanceof ApiError ? err.message : "Something went wrong." };
  }
}
