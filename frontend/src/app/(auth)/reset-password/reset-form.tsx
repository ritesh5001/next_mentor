"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/ui/password-field";
import { resetPasswordAction } from "@/actions/auth";
import type { ActionState } from "@nextmentor/shared";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full">
      {pending ? "Updating…" : "Update password"}
    </Button>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(resetPasswordAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="token" value={token} />

      {state?.error && <Alert tone="error">{state.error}</Alert>}

      <PasswordField
        label="New password"
        name="password"
        required
        autoComplete="new-password"
        placeholder="••••••••"
        hint="At least 8 characters, with an uppercase letter and a number."
      />

      <PasswordField
        label="Confirm new password"
        name="confirmPassword"
        required
        autoComplete="new-password"
        placeholder="••••••••"
      />

      <SubmitButton />
    </form>
  );
}
