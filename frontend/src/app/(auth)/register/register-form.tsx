"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordField } from "@/components/ui/password-field";
import { registerAction } from "@/actions/auth";
import type { ActionState } from "@nextmentor/shared";

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

      <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-[var(--color-muted-foreground)]">
        <input
          type="checkbox"
          name="acceptedTerms"
          required
          className="mt-0.5 size-4 shrink-0 cursor-pointer rounded-[4px] border border-[var(--color-border)] accent-[var(--brand-fill)]"
        />
        <span>
          I accept the{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--brand-blue)] underline underline-offset-2"
          >
            Terms &amp; Conditions
          </a>
          ,{" "}
          <a
            href="/refund"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--brand-blue)] underline underline-offset-2"
          >
            Refund Policy
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--brand-blue)] underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <SubmitButton />
    </form>
  );
}
