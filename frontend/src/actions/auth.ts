"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ActionState, AuthSession } from "@nextmentor/shared";
import { REFERRAL_COOKIE } from "@nextmentor/shared";

import { api, ApiError } from "@/lib/api";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

export type { ActionState };

/**
 * Auth actions.
 *
 * These are thin: they forward to the Render API and translate its response
 * into the { error } / { success } shape the existing forms already consume.
 * No database access happens here — the frontend has no credentials for one.
 */

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/dashboard");

  let session: AuthSession;
  try {
    session = await api<AuthSession>("/api/auth/login", {
      method: "POST",
      body: { email, password },
      anonymous: true,
    });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Could not sign in. Please try again." };
  }

  // httpOnly so browser JavaScript can never read the token — an XSS bug
  // cannot exfiltrate something it has no access to.
  (await cookies()).set(
    SESSION_COOKIE,
    session.token,
    sessionCookieOptions(session.expiresIn),
  );

  // Admins land in the admin panel, students in their dashboard. They are two
  // different products — sending an administrator to a course list makes them
  // click twice to reach the work they actually signed in to do.
  //
  // An explicit callbackUrl still wins, so "sign in to continue" from a deep
  // link returns you to that page.
  const isExplicit =
    callbackUrl !== "/dashboard" &&
    callbackUrl.startsWith("/") &&
    !callbackUrl.startsWith("//");

  const home = session.user.role === "admin" ? "/admin" : "/dashboard";
  redirect(isExplicit ? callbackUrl : home);
}

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const store = await cookies();
  const referralCode = store.get(REFERRAL_COOKIE)?.value;
  const email = String(formData.get("email") ?? "");

  try {
    await api("/api/auth/register", {
      method: "POST",
      anonymous: true,
      body: {
        name: String(formData.get("name") ?? ""),
        email,
        password: String(formData.get("password") ?? ""),
        confirmPassword: String(formData.get("confirmPassword") ?? ""),
        referralCode,
      },
    });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Could not create that account. Please try again." };
  }

  // Attribution is now recorded against the user row; the cookie has done its job.
  store.delete(REFERRAL_COOKIE);
  redirect(`/verify?email=${encodeURIComponent(email)}`);
}

export async function verifyEmailAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "");

  try {
    await api("/api/auth/verify-email", {
      method: "POST",
      anonymous: true,
      body: { email, code: String(formData.get("code") ?? "") },
    });
  } catch (err) {
    // The API's message already carries the useful detail — how many attempts
    // remain, or that the code is dead and a new one is needed.
    return { error: err instanceof ApiError ? err.message : "That code is not valid." };
  }

  redirect("/login?verified=1");
}

/**
 * Sends a fresh code.
 *
 * Always reports success, including when the API says we are inside the resend
 * cooldown: the previous code is still valid and still in their inbox, so
 * "sent" is true from the user's point of view.
 */
export async function resendOtpAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "");
  const purpose = String(formData.get("purpose") ?? "email_verification");

  try {
    const result = await api<{ status: string; retryAfterSeconds?: number }>(
      "/api/auth/resend-otp",
      { method: "POST", anonymous: true, body: { email, purpose } },
    );

    if (result.status === "cooldown" && result.retryAfterSeconds) {
      return {
        success: `A code was just sent. You can request another in ${result.retryAfterSeconds}s.`,
      };
    }
  } catch (err) {
    if (err instanceof ApiError && err.code === "validation") return { error: err.message };
    // Anything else is swallowed on purpose — see requestPasswordResetAction.
  }

  return { success: "If that email has an account, a new code is on its way." };
}

export async function requestPasswordResetAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await api("/api/auth/request-reset", {
      method: "POST",
      anonymous: true,
      body: { email: String(formData.get("email") ?? "") },
    });
  } catch (err) {
    if (err instanceof ApiError && err.code === "validation") return { error: err.message };
    // Any other failure still reports success: distinguishing them would turn
    // this form into a way to enumerate registered addresses.
  }

  return { success: "If that email has an account, a 6-digit code is on its way." };
}

export async function resetPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await api("/api/auth/reset-password", {
      method: "POST",
      anonymous: true,
      body: {
        email: String(formData.get("email") ?? ""),
        code: String(formData.get("code") ?? ""),
        password: String(formData.get("password") ?? ""),
        confirmPassword: String(formData.get("confirmPassword") ?? ""),
      },
    });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Could not reset that password." };
  }

  redirect("/login?reset=1");
}

export async function signOutAction(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, "", sessionCookieOptions(0));
  redirect("/");
}
