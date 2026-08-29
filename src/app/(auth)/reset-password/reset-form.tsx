"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { resetPasswordAction, type ActionState } from "@/backend/actions/auth";
import { Alert } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { PasswordField } from "@/frontend/components/ui/password-field";

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
