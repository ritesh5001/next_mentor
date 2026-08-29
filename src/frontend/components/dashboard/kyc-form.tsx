"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ShieldCheck } from "lucide-react";

import { Alert } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Field } from "@/frontend/components/ui/field";
import type { ActionState, FormAction } from "@/shared/action-state";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Submitting…" : label}
    </Button>
  );
}

export function KycForm({
  action,
  defaults,
  isResubmission,
}: {
  action: FormAction;
  defaults?: { fullName?: string; bankAccountName?: string; ifsc?: string };
  isResubmission?: boolean;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <div className="flex items-start gap-2.5 rounded-[var(--radius-control)] bg-[var(--color-muted)] px-3.5 py-3 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
        <ShieldCheck
          className="mt-px size-4 shrink-0 text-[var(--color-primary)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span>
          Your account number is encrypted before it is stored and is never shown back to
          you or to staff — only the last four digits are visible for confirmation.
        </span>
      </div>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-1 text-sm font-bold">Identity</legend>

        <Field
          label="Full legal name"
          name="fullName"
          required
          defaultValue={defaults?.fullName ?? ""}
          autoComplete="name"
          hint="Exactly as it appears on your PAN card."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="PAN number"
            name="panNumber"
            required
            placeholder="ABCDE1234F"
            maxLength={10}
            className="uppercase"
            autoComplete="off"
          />
          <Field
            label="Aadhaar — last 4 digits"
            name="aadhaarLast4"
            inputMode="numeric"
            maxLength={4}
            placeholder="1234"
            autoComplete="off"
            hint="Optional. We never store the full number."
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-1 text-sm font-bold">Bank account</legend>

        <Field
          label="Name on the account"
          name="bankAccountName"
          required
          defaultValue={defaults?.bankAccountName ?? ""}
          autoComplete="off"
        />

        <Field
          label="Account number"
          name="accountNumber"
          required
          inputMode="numeric"
          maxLength={20}
          autoComplete="off"
          placeholder="123456789012"
        />

        <Field
          label="Confirm account number"
          name="confirmAccountNumber"
          required
          inputMode="numeric"
          maxLength={20}
          autoComplete="off"
          // Re-entry, not paste-and-hope: a wrong digit sends the money to a
          // stranger and it is not recoverable.
          onPaste={(e) => e.preventDefault()}
          hint="Type it again — pasting is disabled on purpose."
        />

        <Field
          label="IFSC code"
          name="ifsc"
          required
          placeholder="HDFC0001234"
          maxLength={11}
          className="uppercase"
          autoComplete="off"
        />
      </fieldset>

      <div className="pt-1">
        <SubmitButton label={isResubmission ? "Resubmit for review" : "Submit for review"} />
      </div>
    </form>
  );
}
