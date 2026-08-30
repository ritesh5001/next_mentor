"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { formatPrice } from "@/lib/format";
import type { ActionState, FormAction } from "@nextmentor/shared";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    // Amber: this button moves money.
    <Button type="submit" variant="money" loading={pending} className="w-full">
      {pending ? "Requesting…" : "Request withdrawal"}
    </Button>
  );
}

export function PayoutForm({
  action,
  availableInPaise,
  minimumInPaise,
  kycApproved,
  hasPendingRequest,
}: {
  action: FormAction;
  availableInPaise: number;
  minimumInPaise: number;
  kycApproved: boolean;
  hasPendingRequest: boolean;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  // Each blocker is explained rather than silently disabling the button, so
  // there is always a clear next step.
  if (!kycApproved) {
    return (
      <Alert tone="info">
        Complete{" "}
        <Link href="/dashboard/kyc" className="font-semibold underline">
          KYC verification
        </Link>{" "}
        before withdrawing. It usually takes 1–2 working days to review.
      </Alert>
    );
  }

  if (hasPendingRequest) {
    return (
      <Alert tone="info">
        You have a withdrawal in progress. You can request another once it is settled.
      </Alert>
    );
  }

  if (availableInPaise < minimumInPaise) {
    return (
      <Alert tone="info">
        The minimum withdrawal is {formatPrice(minimumInPaise)}. You have{" "}
        {formatPrice(Math.max(0, availableInPaise))} available.
      </Alert>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <Field
        label="Amount to withdraw (₹)"
        name="amountInRupees"
        type="number"
        inputMode="decimal"
        step="0.01"
        min={minimumInPaise / 100}
        max={availableInPaise / 100}
        required
        defaultValue={(availableInPaise / 100).toFixed(2)}
        hint={`Between ${formatPrice(minimumInPaise)} and ${formatPrice(availableInPaise)}.`}
      />

      <SubmitButton />

      <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
        Funds are transferred to the bank account on your approved KYC. Transfers are
        processed manually within 3 working days.
      </p>
    </form>
  );
}
