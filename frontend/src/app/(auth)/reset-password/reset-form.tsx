"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordField } from "@/components/ui/password-field";
import { OtpInput } from "@/components/ui/otp-input";
import { resetPasswordAction, resendOtpAction } from "@/actions/auth";
import type { ActionState } from "@nextmentor/shared";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full">
      {pending ? "Updating…" : "Set new password"}
    </Button>
  );
}

function ResendButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="ghost" size="sm" loading={pending}>
      {pending ? "Sending…" : "Send a new code"}
    </Button>
  );
}

export function ResetForm({ email: initialEmail }: { email?: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(resetPasswordAction, null);
  const [resendState, resendAction] = useActionState<ActionState, FormData>(
    resendOtpAction,
    null,
  );
  const [email, setEmail] = useState(initialEmail ?? "");

  return (
    <div className="flex w-full flex-col gap-5">
      <form action={formAction} className="flex w-full flex-col gap-5" noValidate>
        {state?.error && <Alert tone="error">{state.error}</Alert>}

        <Field
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Reset code</span>
          <OtpInput describedBy="reset-hint" invalid={Boolean(state?.error)} />
          <p id="reset-hint" className="text-center text-xs text-[var(--color-muted-foreground)]">
            The 6-digit code we emailed you. It expires in 10 minutes.
          </p>
        </div>

        <PasswordField
          label="New password"
          name="password"
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

        <SubmitButton />
      </form>

      <form action={resendAction} className="flex flex-col items-center gap-2">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="purpose" value="password_reset" />

        {resendState?.success && (
          <Alert tone="success" className="w-full text-left">
            {resendState.success}
          </Alert>
        )}

        <span className="text-xs text-[var(--color-muted-foreground)]">
          Didn&apos;t get it? Check spam, or
        </span>
        <ResendButton />
      </form>
    </div>
  );
}
