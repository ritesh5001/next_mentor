import type { Metadata } from "next";

import {
  ProfileDetailsForm,
  PasswordChangeForm,
  AvatarUploader,
} from "@/components/dashboard/profile-forms";
import { Avatar, DetailField, DetailGrid, Panel } from "@/components/dashboard/panels";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { requireUser, getProfile } from "@/lib/queries";
import {
  changePasswordAction,
  requestAvatarUploadAction,
  setAvatarAction,
  updateProfileAction,
} from "@/actions";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  await requireUser();
  const me = await getProfile();

  return (
    <div className="flex flex-col gap-6">
      {/* Cover band with the avatar straddling its lower edge, as on the
          reference. The band is the brand gradient rather than a photo: there
          is no cover-image field, and inventing one would be a lie. */}
      <section className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
        <div className="h-28 sm:h-36" style={{ background: "var(--brand-gradient)" }} />

        <div className="flex flex-col items-center gap-3 px-5 pb-5 text-center">
          <div className="-mt-12 rounded-full border-4 border-[var(--color-card)] bg-[var(--color-card)] sm:-mt-14">
            <Avatar name={me.name ?? me.email} src={me.avatarUrl} size={96} />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-extrabold tracking-tight">{me.name ?? "Your profile"}</h1>
            <p className="text-sm text-[var(--color-muted-foreground)]">{me.email}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge tone={me.subscription ? "primary" : "neutral"}>
              {me.subscription ? me.subscription.planName : "No active plan"}
            </Badge>
            {me.role !== "student" && (
              <Badge tone="money" className="capitalize">
                {me.role}
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* The record, read-only and boxed. Editing lives further down, so the
          top of the page answers "what is on file for me" at a glance. */}
      <Panel title="Personal detail">
        <DetailGrid>
          <DetailField label="Member ID" value={me.referralCode} />
          <DetailField label="Name" value={me.name} />
          <DetailField label="Email ID" value={me.email} />
          <DetailField label="Mobile no" value={me.phone} />
          <DetailField
            label="Date of joining"
            value={formatDate(me.createdAt, { day: "2-digit", month: "2-digit", year: "numeric" })}
          />
          <DetailField label="Current plan" value={me.subscription?.planName ?? "None"} />
          <DetailField label="Referral code" value={me.referralCode} />
          <DetailField
            label="Sign-in method"
            value={me.hasPassword ? "Email and password" : "Google"}
          />
        </DetailGrid>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Photo">
          <AvatarUploader
            currentUrl={me.avatarUrl}
            name={me.name ?? me.email}
            requestUpload={requestAvatarUploadAction}
            setAvatar={setAvatarAction}
          />
        </Panel>

        <Panel title="Edit your details">
          <ProfileDetailsForm
            action={updateProfileAction}
            defaults={{ name: me.name ?? "", email: me.email, phone: me.phone ?? "" }}
          />
        </Panel>
      </div>

      <Panel title="Password" className="max-w-2xl">
        {me.hasPassword ? (
          <PasswordChangeForm action={changePasswordAction} />
        ) : (
          <p className="text-sm text-[var(--color-muted-foreground)]">
            This account signs in with Google, so there is no password to change.
          </p>
        )}
      </Panel>
    </div>
  );
}
