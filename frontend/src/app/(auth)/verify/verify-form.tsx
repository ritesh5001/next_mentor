"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { confirmEmailAction } from "@/actions/auth";
import type { ActionState } from "@nextmentor/shared";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full">
      {pending ? "Confirming…" : "Confirm my email"}
    </Button>
  );
}

export function VerifyForm({ token }: { token: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(confirmEmailAction, null);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <input type="hidden" name="token" value={token} />
      {state?.error && (
        <Alert tone="error" className="text-left">
          {state.error}
        </Alert>
      )}
      <SubmitButton />
    </form>
  );
}
