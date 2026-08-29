"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Field } from "@/frontend/components/ui/field";
import type { ActionState, FormAction } from "@/shared/action-state";

export type PlanFormValues = {
  id?: string;
  name?: string;
  tagline?: string | null;
  priceInPaise?: number;
  mrpInPaise?: number | null;
  durationDays?: number | null;
  commissionRateBps?: number;
  features?: string[];
  grantsAllCourses?: boolean;
  isFeatured?: boolean;
  position?: number;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Saving…" : label}
    </Button>
  );
}

function Checkbox({
  name,
  label,
  hint,
  defaultChecked,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-start gap-2.5 rounded-[var(--radius-control)] border border-[var(--color-border)] p-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 size-4 accent-[var(--color-primary)]"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{label}</span>
        {hint && (
          <span className="text-xs text-[var(--color-muted-foreground)]">{hint}</span>
        )}
      </span>
    </label>
  );
}

export function PlanForm({
  action,
  values,
  submitLabel,
}: {
  action: FormAction;
  values?: PlanFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {values?.id && <input type="hidden" name="planId" value={values.id} />}

      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <Field label="Name" name="name" required defaultValue={values?.name ?? ""} placeholder="Premium Pro" maxLength={60} />

      <Field
        label="Tagline"
        name="tagline"
        defaultValue={values?.tagline ?? ""}
        placeholder="Everything, plus the highest commission"
        maxLength={160}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Price (₹)"
          name="priceInRupees"
          type="number"
          inputMode="numeric"
          min={0}
          required
          defaultValue={values?.priceInPaise != null ? values.priceInPaise / 100 : 0}
        />
        <Field
          label="MRP (₹)"
          name="mrpInRupees"
          type="number"
          inputMode="numeric"
          min={0}
          defaultValue={values?.mrpInPaise != null ? values.mrpInPaise / 100 : ""}
          hint="Optional, shown struck through."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Duration (days)"
          name="durationDays"
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={values?.durationDays ?? ""}
          hint="Blank = lifetime."
        />
        <Field
          label="Commission (%)"
          name="commissionPercent"
          type="number"
          inputMode="decimal"
          step="0.01"
          min={0}
          max={100}
          // Basis points in the database; percent in the form. The action
          // converts, so no two places have to agree on the unit.
          defaultValue={values?.commissionRateBps != null ? values.commissionRateBps / 100 : 0}
          hint="Earned by members on referrals."
        />
        <Field
          label="Sort position"
          name="position"
          type="number"
          inputMode="numeric"
          min={0}
          defaultValue={values?.position ?? 0}
          hint="Lower shows first."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="features" className="text-sm font-medium">
          Features
        </label>
        <textarea
          id="features"
          name="features"
          rows={5}
          defaultValue={(values?.features ?? []).join("\n")}
          placeholder={"Full course catalog\nPriority support\nWeekly live calls"}
          className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[16px] leading-relaxed"
        />
        <p className="text-xs text-[var(--color-muted-foreground)]">
          One per line. Up to 20.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Checkbox
          name="grantsAllCourses"
          label="Unlocks every course"
          hint="Members get the whole catalog while active."
          defaultChecked={values?.grantsAllCourses}
        />
        <Checkbox
          name="isFeatured"
          label="Highlight as most popular"
          defaultChecked={values?.isFeatured}
        />
      </div>

      <div className="pt-1">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
