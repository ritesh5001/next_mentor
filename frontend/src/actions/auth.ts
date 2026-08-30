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

  redirect(callbackUrl.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/dashboard");
}

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const store = await cookies();
  const referralCode = store.get(REFERRAL_COOKIE)?.value;

  try {
    await api("/api/auth/register", {
      method: "POST",
      anonymous: true,
      body: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
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
  redirect("/verify?sent=1");
}

export async function confirmEmailAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await api("/api/auth/confirm-email", {
      method: "POST",
      anonymous: true,
      body: { token: String(formData.get("token") ?? "") },
    });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "That link is not valid." };
  }

  redirect("/login?verified=1");
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

  return { success: "If that email has an account, a reset link is on its way." };
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
        token: String(formData.get("token") ?? ""),
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
