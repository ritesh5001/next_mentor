"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

import { loginAction, type ActionState } from "@/backend/actions/auth";
import { Alert } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Field } from "@/frontend/components/ui/field";
import { PasswordField } from "@/frontend/components/ui/password-field";

function SubmitButton() {
  // useFormStatus must be read from a child of the <form>, which is the only
  // reason this is split out.
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full">
      {pending ? "Signing in…" : "Sign in"}
    </Button>
  );
}

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {state?.error && <Alert tone="error">{state.error}</Alert>}

      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        // inputMode + type together get the right keyboard on mobile.
        inputMode="email"
        placeholder="you@example.com"
      />

      <div className="flex flex-col gap-1.5">
        <PasswordField
          label="Password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
        />
        <Link
          href="/forgot-password"
          className="self-end text-xs font-medium text-[var(--color-primary)] hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <SubmitButton />
    </form>
  );
}
