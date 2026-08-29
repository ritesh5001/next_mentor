import type { Metadata } from "next";
import { eq } from "drizzle-orm";

import { requireUser } from "@/backend/lib/permissions";
import { db } from "@/backend/db";
import { users } from "@/backend/db/schema";
import { getActiveSubscription } from "@/backend/services/plans";
import { publicUrl } from "@/backend/lib/r2";
import {
  updateProfileAction,
  changePasswordAction,
  requestAvatarUploadAction,
  setAvatarAction,
} from "@/backend/actions/profile";
import {
  ProfileDetailsForm,
  PasswordChangeForm,
  AvatarUploader,
} from "@/frontend/components/dashboard/profile-forms";
import { Badge } from "@/frontend/components/ui/badge";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const session = await requireUser();

  const [me] = await db
    .select({
      name: users.name,
      email: users.email,
      phone: users.phone,
      image: users.image,
      role: users.role,
      referralCode: users.referralCode,
      createdAt: users.createdAt,
      hasPassword: users.passwordHash,
    })
    .from(users)
    .where(eq(users.id, session.id))
    .limit(1);

  const subscription = await getActiveSubscription(session.id);

  // An OAuth avatar is already an absolute URL; ours is an R2 key.
  const avatarUrl = me.image
    ? me.image.startsWith("http")
      ? me.image
      : publicUrl(me.image)
    : null;

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Profile</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Member since{" "}
          {me.createdAt.toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Badge tone={subscription ? "primary" : "neutral"}>
          {subscription ? subscription.planName : "No active plan"}
        </Badge>
        {me.role !== "student" && (
          <Badge tone="money" className="capitalize">
            {me.role}
          </Badge>
        )}
      </div>

      <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <h2 className="text-lg font-bold tracking-tight">Photo</h2>
        <AvatarUploader
          currentUrl={avatarUrl}
          name={me.name ?? me.email}
          requestUpload={requestAvatarUploadAction}
          setAvatar={setAvatarAction}
        />
      </section>

      <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <h2 className="text-lg font-bold tracking-tight">Your details</h2>
        <ProfileDetailsForm
          action={updateProfileAction}
          defaults={{
            name: me.name ?? "",
            email: me.email,
            phone: me.phone ?? "",
          }}
        />
      </section>

      <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <h2 className="text-lg font-bold tracking-tight">Password</h2>
        {me.hasPassword ? (
          <PasswordChangeForm action={changePasswordAction} />
        ) : (
          <p className="text-sm text-[var(--color-muted-foreground)]">
            This account signs in with Google, so there is no password to change.
          </p>
        )}
      </section>
    </div>
  );
}
