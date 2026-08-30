"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { OtpInput } from "@/components/ui/otp-input";
import { verifyEmailAction, resendOtpAction } from "@/actions/auth";
import type { ActionState } from "@nextmentor/shared";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full">
      {pending ? "Verifying…" : "Verify my email"}
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

export function VerifyForm({ email: initialEmail }: { email?: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(verifyEmailAction, null);
  const [resendState, resendAction] = useActionState<ActionState, FormData>(
    resendOtpAction,
    null,
  );
  // The email is needed on both forms: codes are scoped to an account, so the
  // API cannot verify a code without knowing whose it is.
  const [email, setEmail] = useState(initialEmail ?? "");

  return (
    <div className="flex w-full flex-col gap-5">
      <form action={formAction} className="flex w-full flex-col gap-5" noValidate>
        {state?.error && (
          <Alert tone="error" className="text-left">
            {state.error}
          </Alert>
        )}

        {!initialEmail && (
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
        )}
        {initialEmail && <input type="hidden" name="email" value={initialEmail} />}

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Verification code</span>
          <OtpInput describedBy="otp-hint" invalid={Boolean(state?.error)} />
          <p id="otp-hint" className="text-center text-xs text-[var(--color-muted-foreground)]">
            Enter the 6-digit code we emailed you. It expires in 15 minutes.
          </p>
        </div>

        <SubmitButton />
      </form>

      <form action={resendAction} className="flex flex-col items-center gap-2">
        <input type="hidden" name="email" value={initialEmail ?? email} />
        <input type="hidden" name="purpose" value="email_verification" />

        {resendState?.success && (
          <Alert tone="success" className="w-full text-left">
            {resendState.success}
          </Alert>
        )}
        {resendState?.error && (
          <Alert tone="error" className="w-full text-left">
            {resendState.error}
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
