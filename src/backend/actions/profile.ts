"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { db } from "@/backend/db";
import { users } from "@/backend/db/schema";
import { requireUser } from "@/backend/lib/permissions";
import { createImageUpload, deleteObject } from "@/backend/lib/r2";
import type { ActionState } from "@/shared/action-state";

export type { ActionState };

const BCRYPT_ROUNDS = 12;

const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  // Indian mobile numbers, optionally with a country code.
  phone: z
    .string()
    .trim()
    .regex(/^(\+?91[-\s]?)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .optional()
    .or(z.literal("")),
});

export async function updateProfileAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  await db
    .update(users)
    .set({
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      updatedAt: new Date(),
    })
    // Scoped to the session user's own id — never an id from the request, or
    // anyone could rewrite anyone's profile.
    .where(eq(users.id, user.id));

  revalidatePath("/dashboard/profile");
  return { success: "Profile updated" };
}

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72)
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((v) => v.newPassword !== v.currentPassword, {
    message: "Choose a password you have not used here before",
    path: ["newPassword"],
  });

export async function changePasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();

  const parsed = passwordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const [row] = await db
    .select({ passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  // A Google-only account has no password to change.
  if (!row?.passwordHash) {
    return {
      error: "This account signs in with Google, so it has no password to change.",
    };
  }

  // Requiring the current password is what stops a stolen session from being
  // upgraded into permanent account takeover.
  const valid = await bcrypt.compare(parsed.data.currentPassword, row.passwordHash);
  if (!valid) return { error: "Your current password is incorrect." };

  await db
    .update(users)
    .set({
      passwordHash: await bcrypt.hash(parsed.data.newPassword, BCRYPT_ROUNDS),
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));

  return { success: "Password updated" };
}

/** Issues a presigned PUT so the browser uploads the avatar straight to R2. */
export async function requestAvatarUploadAction(input: {
  contentType: string;
  contentLength: number;
}): Promise<{ uploadUrl: string; key: string } | { error: string }> {
  await requireUser();

  const result = await createImageUpload({
    prefix: "avatars",
    contentType: input.contentType,
    contentLength: input.contentLength,
  });

  if ("error" in result) return result;
  return { uploadUrl: result.uploadUrl, key: result.key };
}

export async function setAvatarAction(key: string): Promise<ActionState> {
  const user = await requireUser();

  // Reject anything outside the avatars prefix: the key arrives from the
  // browser, and without this someone could point their avatar at another
  // user's private object and have it served from our domain.
  if (!/^avatars\/[0-9a-f-]{36}\.(jpg|png|webp|avif)$/.test(key)) {
    return { error: "That image could not be saved." };
  }

  const [previous] = await db
    .select({ image: users.image })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  await db
    .update(users)
    .set({ image: key, updatedAt: new Date() })
    .where(eq(users.id, user.id));

  // Drop the old file so replaced avatars do not accumulate forever. Only ours
  // — an OAuth avatar is a remote URL, not a key we own.
  if (previous?.image && previous.image.startsWith("avatars/")) {
    await deleteObject(previous.image);
  }

  revalidatePath("/dashboard/profile");
  return { success: "Photo updated" };
}
