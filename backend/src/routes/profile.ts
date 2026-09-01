import { Hono } from "hono";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { updateProfileSchema, changePasswordSchema, requestUploadSchema } from "@nextmentor/shared";
import { z } from "zod";

import { db } from "@/db";
import { users } from "@/db/schema";
import { BCRYPT_ROUNDS } from "@/lib/auth";
import { createUploadAuth, deleteObject, publicUrl } from "@/lib/imagekit";
import { getActiveSubscription } from "@/services/plans";
import { requireUser, currentUser } from "@/middleware/auth";
import { ok, fail, parseBody } from "@/middleware/respond";

export const profileRoutes = new Hono();

profileRoutes.get("/profile", requireUser, async (c) => {
  const me = currentUser(c);

  const [row] = await db
    .select({
      name: users.name,
      email: users.email,
      phone: users.phone,
      image: users.image,
      role: users.role,
      referralCode: users.referralCode,
      createdAt: users.createdAt,
      // Boolean only — the hash itself never leaves the database.
      hasPassword: users.passwordHash,
    })
    .from(users)
    .where(eq(users.id, me.id))
    .limit(1);

  if (!row) return fail(c, "Account not found.", "not_found");

  const subscription = await getActiveSubscription(me.id);

  return ok(c, {
    ...row,
    hasPassword: Boolean(row.hasPassword),
    // An OAuth avatar is already absolute; ours is an R2 key.
    avatarUrl: row.image?.startsWith("http") ? row.image : publicUrl(row.image),
    subscription,
  });
});

profileRoutes.patch("/profile", requireUser, async (c) => {
  const body = await parseBody(c, updateProfileSchema);
  if (!body.ok) return body.response;

  await db
    .update(users)
    .set({
      name: body.data.name,
      phone: body.data.phone || null,
      updatedAt: new Date(),
    })
    // Scoped to the caller's own id, never an id from the request body.
    .where(eq(users.id, currentUser(c).id));

  return ok(c, { updated: true });
});

profileRoutes.post("/profile/password", requireUser, async (c) => {
  const body = await parseBody(c, changePasswordSchema);
  if (!body.ok) return body.response;

  const me = currentUser(c);

  const [row] = await db
    .select({ passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.id, me.id))
    .limit(1);

  if (!row?.passwordHash) {
    return fail(c, "This account signs in with Google, so it has no password to change.", "validation");
  }

  // Requiring the current password is what stops a stolen session from being
  // upgraded into permanent account takeover.
  if (!(await bcrypt.compare(body.data.currentPassword, row.passwordHash))) {
    return fail(c, "Your current password is incorrect.", "unauthorized");
  }

  await db
    .update(users)
    .set({
      passwordHash: await bcrypt.hash(body.data.newPassword, BCRYPT_ROUNDS),
      updatedAt: new Date(),
    })
    .where(eq(users.id, me.id));

  return ok(c, { updated: true });
});

profileRoutes.post("/profile/avatar-upload", requireUser, async (c) => {
  const body = await parseBody(c, requestUploadSchema);
  if (!body.ok) return body.response;

  const result = createUploadAuth({ folder: "avatars", ...body.data });
  return "error" in result ? fail(c, result.error, "validation") : ok(c, result);
});

profileRoutes.patch("/profile/avatar", requireUser, async (c) => {
  const body = await parseBody(c, z.object({ key: z.string().min(1) }));
  if (!body.ok) return body.response;

  // The path comes from the browser. Without this check someone could point
  // their avatar at another user's file and have it served from our endpoint.
  if (!/^\/?avatars\/[0-9a-f-]{36}\.(jpg|png|webp|avif)$/.test(body.data.key)) {
    return fail(c, "That image could not be saved.", "validation");
  }

  const me = currentUser(c);

  const [previous] = await db
    .select({ image: users.image })
    .from(users)
    .where(eq(users.id, me.id))
    .limit(1);

  await db
    .update(users)
    .set({ image: body.data.key, updatedAt: new Date() })
    .where(eq(users.id, me.id));

  // Drop the replaced file. Only ours — an OAuth avatar is a remote URL.
  if (previous?.image && /^\/?avatars\//.test(previous.image)) {
    await deleteObject(previous.image);
  }

  return ok(c, { updated: true });
});
