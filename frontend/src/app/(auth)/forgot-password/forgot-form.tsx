"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { requestPasswordResetAction } from "@/actions/auth";
import type { ActionState } from "@nextmentor/shared";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full">
      {pending ? "Sending…" : "Send reset link"}
    </Button>
  );
}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(
    requestPasswordResetAction,
    null,
  );

  // On success the form is replaced entirely — leaving the input on screen
  // invites people to submit again and again while they wait for the email.
  if (state?.success) {
    return <Alert tone="success">{state.success}</Alert>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}

      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
      />

      <SubmitButton />
    </form>
  );
}
