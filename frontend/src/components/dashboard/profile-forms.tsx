"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Camera, User } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordField } from "@/components/ui/password-field";
import type { ActionState, FormAction } from "@nextmentor/shared";

function SubmitButton({ label, busyLabel }: { label: string; busyLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? busyLabel : label}
    </Button>
  );
}

export function ProfileDetailsForm({
  action,
  defaults,
}: {
  action: FormAction;
  defaults: { name: string; email: string; phone: string };
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <Field label="Full name" name="name" required defaultValue={defaults.name} autoComplete="name" />

      <Field
        label="Email"
        name="email"
        type="email"
        defaultValue={defaults.email}
        disabled
        readOnly
        // Read-only, not disabled-looking-broken: the address is the account
        // identifier and changing it needs a re-verification flow we have not
        // built yet.
        hint="Your email is your sign-in and cannot be changed here."
      />

      <Field
        label="Mobile number"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        defaultValue={defaults.phone}
        placeholder="9876543210"
        hint="Optional. Used for payout and support contact."
      />

      <div className="pt-1">
        <SubmitButton label="Save changes" busyLabel="Saving…" />
      </div>
    </form>
  );
}

export function PasswordChangeForm({ action }: { action: FormAction }) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <PasswordField
        label="Current password"
        name="currentPassword"
        required
        autoComplete="current-password"
      />
      <PasswordField
        label="New password"
        name="newPassword"
        required
        autoComplete="new-password"
        hint="At least 8 characters, with an uppercase letter and a number."
      />
      <PasswordField
        label="Confirm new password"
        name="confirmPassword"
        required
        autoComplete="new-password"
      />

      <div className="pt-1">
        <SubmitButton label="Update password" busyLabel="Updating…" />
      </div>
    </form>
  );
}

export function AvatarUploader({
  currentUrl,
  name,
  requestUpload,
  setAvatar,
}: {
  currentUrl: string | null;
  name: string;
  requestUpload: (input: {
    contentType: string;
    contentLength: number;
  }) => Promise<{ uploadUrl: string; key: string } | { error: string }>;
  setAvatar: (key: string) => Promise<ActionState>;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Shows the new image immediately, before the server round-trip finishes.
  const [preview, setPreview] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setBusy(true);

    const target = await requestUpload({
      contentType: file.type,
      contentLength: file.size,
    });

    if ("error" in target) {
      setError(target.error);
      setBusy(false);
      return;
    }

    try {
      // Straight to R2 with the presigned URL. The Content-Type must match what
      // was signed or R2 rejects the PUT.
      const res = await fetch(target.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!res.ok) throw new Error(`Upload failed (${res.status})`);

      const result = await setAvatar(target.key);
      if (result?.error) {
        setError(result.error);
      } else {
        setPreview(URL.createObjectURL(file));
        router.refresh();
      }
    } catch {
      setError("Upload failed. Check your connection and try again.");
    }

    setBusy(false);
  }

  const shown = preview ?? currentUrl;

  return (
    <div className="flex items-center gap-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-[var(--color-muted)]">
        {shown ? (
          // Plain <img>: the source is a blob: URL during preview, which
          // next/image cannot optimise.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shown} alt="" className="size-full object-cover" width={80} height={80} />
        ) : (
          <div className="flex size-full items-center justify-center">
            <User
              className="size-8 text-[var(--color-muted-foreground)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          aria-label={`Profile photo for ${name}`}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = "";
          }}
        />

        <Button
          type="button"
          variant="secondary"
          size="sm"
          loading={busy}
          onClick={() => inputRef.current?.click()}
        >
          <Camera className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          {shown ? "Change photo" : "Upload photo"}
        </Button>

        <p className="text-xs text-[var(--color-muted-foreground)]">
          JPEG, PNG, WebP or AVIF. Max 5MB.
        </p>

        {error && (
          <p role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
