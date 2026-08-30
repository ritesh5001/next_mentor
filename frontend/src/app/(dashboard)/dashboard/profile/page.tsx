import type { Metadata } from "next";
import { formatDate, formatDateTime } from "@/lib/format";

import { publicUrl } from "@/lib/queries";
import {
  ProfileDetailsForm,
  PasswordChangeForm,
  AvatarUploader,
} from "@/components/dashboard/profile-forms";
import { Badge } from "@/components/ui/badge";
import { requireUser, getProfile } from "@/lib/queries";
import { changePasswordAction, requestAvatarUploadAction, setAvatarAction, updateProfileAction } from "@/actions";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const session = await requireUser();

  const me = await getProfile();

  const subscription = me.subscription;

  // An OAuth avatar is already an absolute URL; ours is an R2 key.
  const avatarUrl = me.avatarUrl;

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Profile</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Member since{" "}
          {formatDate(me.createdAt, {
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
