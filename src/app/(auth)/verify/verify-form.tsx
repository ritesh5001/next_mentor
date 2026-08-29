"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { confirmEmailAction, type ActionState } from "@/actions/auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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
