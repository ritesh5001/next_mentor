"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, isNull } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { db } from "@/backend/db";
import { users } from "@/backend/db/schema";
import { signIn } from "@/backend/lib/auth";
import { generateUniqueReferralCode, normalizeReferralCode } from "@/backend/lib/referral-code";
import { issueToken, consumeToken } from "@/backend/lib/tokens";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/backend/lib/email";
import { REFERRAL_COOKIE } from "@/shared/constants";

import type { ActionState } from "@/shared/action-state";

export type { ActionState };

const BCRYPT_ROUNDS = 12;

const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name").max(80),
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72, "Passwords are limited to 72 characters")
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const { name, email, password } = parsed.data;

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    // Deliberately vague: confirming that an address is registered turns this
    // form into an account-enumeration oracle.
    return { error: "That email cannot be used. Try signing in instead." };
  }

  // Resolve the referrer from the first-touch cookie set in middleware.
  const cookieStore = await cookies();
  const refCode = cookieStore.get(REFERRAL_COOKIE)?.value;
  let referredById: string | null = null;

  if (refCode) {
    const [referrer] = await db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.referralCode, normalizeReferralCode(refCode)), eq(users.isBlocked, false)))
      .limit(1);
    referredById = referrer?.id ?? null;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const referralCode = await generateUniqueReferralCode();

  let userId: string;
  try {
    const [created] = await db
      .insert(users)
      .values({
        name,
        email,
        passwordHash,
        referralCode,
        referredById,
        referredAt: referredById ? new Date() : null,
      })
      .returning({ id: users.id });
    userId = created.id;
  } catch {
    // The UNIQUE index on email is the real guard against the race between the
    // existence check above and this insert.
    return { error: "That email cannot be used. Try signing in instead." };
  }

  const token = await issueToken(userId, "email_verification");
  await sendVerificationEmail(email, token, name);

  // Attribution is now stored on the user row; the cookie has done its job.
  cookieStore.delete(REFERRAL_COOKIE);

  redirect("/verify?sent=1");
}

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const callbackUrl = (formData.get("callbackUrl") as string) || "/dashboard";

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: callbackUrl.startsWith("/") ? callbackUrl : "/dashboard",
    });
  } catch (error) {
    // signIn throws a redirect on success — rethrow it or the user never moves.
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) throw error;

    if (error instanceof Error && error.cause) {
      const cause = String((error.cause as { err?: unknown }).err ?? "");
      if (cause.includes("EMAIL_NOT_VERIFIED")) {
        return { error: "Confirm your email first. Check your inbox for the link." };
      }
    }
    return { error: "Email or password is incorrect." };
  }

  return null;
}

const emailOnlySchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
});

export async function requestPasswordResetAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = emailOnlySchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Enter a valid email address" };
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, parsed.data.email))
    .limit(1);

  if (user) {
    const token = await issueToken(user.id, "password_reset");
    await sendPasswordResetEmail(parsed.data.email, token);
  }

  // Identical response whether or not the account exists — otherwise this form
  // becomes a way to enumerate registered users.
  return { success: "If that email has an account, a reset link is on its way." };
}

const resetSchema = z
  .object({
    token: z.string().min(1),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72)
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function resetPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = resetSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const consumed = await consumeToken(parsed.data.token, "password_reset");
  if (!consumed) {
    return { error: "That reset link is invalid or has expired. Request a new one." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, BCRYPT_ROUNDS);
  await db
    .update(users)
    .set({
      passwordHash,
      // Someone who can prove control of the inbox has proven the address is
      // theirs, so a reset also completes verification.
      emailVerified: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, consumed.userId));

  redirect("/login?reset=1");
}

/**
 * Confirms an email address.
 *
 * Deliberately a POST-only Server Action rather than something the /verify page
 * runs during a GET render: mail scanners and link unfurlers fetch every URL in
 * an outgoing email, and consuming a single-use token on GET would burn it
 * before the recipient ever clicked.
 */
export async function confirmEmailAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const token = formData.get("token");
  if (typeof token !== "string" || token.length === 0) {
    return { error: "That link is invalid or has expired." };
  }

  const consumed = await consumeToken(token, "email_verification");
  if (!consumed) {
    return { error: "That link is invalid or has expired. Sign in to request a new one." };
  }

  await db
    .update(users)
    .set({ emailVerified: new Date(), updatedAt: new Date() })
    .where(and(eq(users.id, consumed.userId), isNull(users.emailVerified)));

  redirect("/login?verified=1");
}
