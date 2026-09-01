"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { ActionState, CheckoutResult, CouponPreview, ItemType, UploadAuth } from "@nextmentor/shared";

import { api, ApiError, API_BASE } from "@/lib/api";
import { SESSION_COOKIE } from "@/lib/session";

export type { ActionState };

/**
 * Every mutation the UI performs, as a thin call to the Render API.
 *
 * Kept as Server Actions so the existing forms and `useActionState` hooks work
 * unchanged — only what sits behind them moved. The session cookie is attached
 * by `api()`, so the JWT never reaches client JavaScript.
 */

/** Turns an ApiError into the { error } shape the forms already render. */
async function run(fn: () => Promise<unknown>, paths: string[] = []): Promise<ActionState> {
  try {
    await fn();
    for (const p of paths) revalidatePath(p);
    return { success: "Saved" };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Something went wrong." };
  }
}

function form(formData: FormData): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of formData.entries()) out[k] = typeof v === "string" ? v : undefined;
  return out;
}

/* -------------------------------------------------------------- commerce */

export async function createCheckoutAction(input: {
  itemType: ItemType;
  slug: string;
  couponCode?: string;
}): Promise<CheckoutResult> {
  try {
    const data = await api<
      | { status: "ok"; razorpayOrderId: string; amountInPaise: number; currency: string; orderId: string; itemTitle: string; prefill: { name: string; email: string } }
      | { status: "already_owned" }
    >("/api/checkout", { method: "POST", body: input });

    return data as CheckoutResult;
  } catch (err) {
    return {
      status: "error",
      message: err instanceof ApiError ? err.message : "Could not start checkout.",
    };
  }
}

export async function previewCouponAction(input: {
  code: string;
  itemType: ItemType;
  slug: string;
}): Promise<CouponPreview> {
  try {
    return await api<CouponPreview>("/api/coupons/preview", { method: "POST", body: input });
  } catch (err) {
    return { valid: false, reason: err instanceof ApiError ? err.message : "That code is not valid." };
  }
}

export async function pollOwnershipAction(input: {
  itemType: ItemType;
  slug: string;
}): Promise<{ owned: boolean }> {
  try {
    return await api<{ owned: boolean }>(
      `/api/ownership?itemType=${input.itemType}&slug=${encodeURIComponent(input.slug)}`,
    );
  } catch {
    return { owned: false };
  }
}

/* -------------------------------------------------------------- progress */

export async function saveProgressAction(input: {
  lessonId: string;
  positionSeconds: number;
  completed: boolean;
}): Promise<{ ok: boolean }> {
  try {
    await api("/api/progress", { method: "POST", body: input });
    return { ok: true };
  } catch {
    // Progress is best-effort: losing a tick must not interrupt playback.
    return { ok: false };
  }
}

/* --------------------------------------------------------------- profile */

export async function updateProfileAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return run(
    () => api("/api/profile", { method: "PATCH", body: { name: fd.get("name"), phone: fd.get("phone") } }),
    ["/dashboard/profile"],
  );
}

export async function changePasswordAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  try {
    await api("/api/profile/password", { method: "POST", body: form(fd) });
    return { success: "Password updated" };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not update that password." };
  }
}

export async function requestAvatarUploadAction(input: {
  contentType: string;
  contentLength: number;
}): Promise<UploadAuth | { error: string }> {
  try {
    return await api("/api/profile/avatar-upload", { method: "POST", body: input });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not start the upload." };
  }
}

export async function setAvatarAction(key: string): Promise<ActionState> {
  return run(() => api("/api/profile/avatar", { method: "PATCH", body: { key } }), ["/dashboard/profile"]);
}

/* ------------------------------------------------------------- affiliate */

/**
 * Uploads one KYC identity document.
 *
 * Forwards the multipart body to the API untouched. The bytes go through our
 * server on purpose — see components/dashboard/kyc-documents.tsx for why the
 * direct-to-ImageKit path is not safe for a government ID.
 */
export async function uploadKycDocumentAction(
  _slot: string,
  formData: FormData,
): Promise<ActionState> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return { error: "Your session expired. Sign in again." };

  try {
    const res = await fetch(`${API_BASE}/api/affiliate/kyc/document`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      // No Content-Type header: fetch sets the multipart boundary itself, and
      // overriding it produces a body the server cannot parse.
      body: formData,
    });

    const payload = (await res.json()) as { ok: boolean; error?: string };
    if (!payload.ok) return { error: payload.error ?? "Could not upload that document." };
  } catch {
    return { error: "Could not upload that document. Check your connection." };
  }

  revalidatePath("/dashboard/kyc");
  return { success: "Uploaded" };
}

export async function submitKycAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  try {
    await api("/api/affiliate/kyc", { method: "POST", body: form(fd) });
    revalidatePath("/dashboard/kyc");
    return { success: "Submitted for review. This usually takes 1–2 working days." };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not submit that." };
  }
}

export async function requestPayoutAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const data = await api<{ message: string }>("/api/affiliate/payouts", {
      method: "POST",
      body: { amountInRupees: Number(fd.get("amountInRupees")) },
    });
    revalidatePath("/dashboard/earnings");
    return { success: data.message };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not submit that request." };
  }
}

/* ---------------------------------------------------------- certificates */

export async function issueCertificateAction(courseId: string): Promise<ActionState> {
  try {
    const data = await api<{ serial: string; issued: boolean }>(
      `/api/certificates/claim/${courseId}`,
      { method: "POST" },
    );
    revalidatePath("/dashboard/certificates");
    return {
      success: data.issued
        ? `Certificate ${data.serial} issued.`
        : `You already have certificate ${data.serial}.`,
    };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not issue that certificate." };
  }
}

/* ------------------------------------------------------------ engagement */

export async function createLeadAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  try {
    await api("/api/leads", { method: "POST", body: form(fd) });
    revalidatePath("/dashboard/leads");
    return { success: "Lead added" };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not add that lead." };
  }
}

export async function updateLeadStatusAction(
  leadId: string,
  status: "new" | "contacted" | "qualified" | "converted" | "lost",
): Promise<ActionState> {
  return run(() => api(`/api/leads/${leadId}`, { method: "PATCH", body: { status } }), ["/dashboard/leads"]);
}

export async function deleteLeadAction(leadId: string): Promise<ActionState> {
  return run(() => api(`/api/leads/${leadId}`, { method: "DELETE" }), ["/dashboard/leads"]);
}

export async function createPostAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  try {
    await api("/api/community", { method: "POST", body: form(fd) });
    revalidatePath("/dashboard/community");
    return { success: "Posted" };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not post that." };
  }
}

export async function createCommentAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const postId = String(fd.get("postId") ?? "");
  try {
    await api(`/api/community/${postId}/comments`, {
      method: "POST",
      body: { body: fd.get("body") },
    });
    revalidatePath(`/dashboard/community/${postId}`);
    return { success: "Reply posted" };
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not post that reply." };
  }
}

export async function hidePostAction(postId: string): Promise<ActionState> {
  return run(() => api(`/api/community/${postId}`, { method: "DELETE" }), ["/dashboard/community"]);
}

export async function setPostPinnedAction(postId: string, isPinned: boolean): Promise<ActionState> {
  return run(
    () => api(`/api/community/${postId}/moderation`, { method: "PATCH", body: { isPinned } }),
    ["/dashboard/community"],
  );
}

export async function setPostLockedAction(postId: string, isLocked: boolean): Promise<ActionState> {
  return run(
    () => api(`/api/community/${postId}/moderation`, { method: "PATCH", body: { isLocked } }),
    ["/dashboard/community"],
  );
}

export async function bookSlotAction(slotId: string): Promise<ActionState> {
  return run(() => api(`/api/mentorship/${slotId}/book`, { method: "POST" }), ["/dashboard/mentorship"]);
}

export async function cancelBookingAction(slotId: string): Promise<ActionState> {
  return run(() => api(`/api/mentorship/${slotId}/book`, { method: "DELETE" }), ["/dashboard/mentorship"]);
}

/**
 * Exchanges a resource id for a short-lived signed download URL.
 *
 * The API re-checks enrollment before it signs anything, so this action stays
 * a thin pass-through — the authorisation is not here.
 */
export async function getResourceUrlAction(
  resourceId: string,
): Promise<{ url?: string; error?: string }> {
  try {
    const res = await api<{ url: string; title: string }>(`/api/resources/${resourceId}`);
    return { url: res.url };
  } catch (err) {
    return {
      error: err instanceof ApiError ? err.message : "Could not prepare that download.",
    };
  }
}
