"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { registerAction, type ActionState } from "@/backend/actions/auth";
import { Alert } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Field } from "@/frontend/components/ui/field";
import { PasswordField } from "@/frontend/components/ui/password-field";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full">
      {pending ? "Creating account…" : "Create account"}
    </Button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(registerAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}

      <Field
        label="Full name"
        name="name"
        required
        autoComplete="name"
        placeholder="Saurabh Namdev"
      />

      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
        hint="We'll send a confirmation link here."
      />

      <PasswordField
        label="Password"
        name="password"
        required
        autoComplete="new-password"
        placeholder="••••••••"
        hint="At least 8 characters, with an uppercase letter and a number."
      />

      <PasswordField
        label="Confirm password"
        name="confirmPassword"
        required
        autoComplete="new-password"
        placeholder="••••••••"
      />

      <SubmitButton />

      <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
        By creating an account you agree to our{" "}
        <a href="/terms" className="underline hover:text-[var(--color-foreground)]">
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-[var(--color-foreground)]">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
