"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

import type { ActionState, FormAction } from "@nextmentor/shared";

export type CourseFormState = ActionState;

export type CourseFormValues = {
  id?: string;
  title?: string;
  subtitle?: string | null;
  description?: string | null;
  instructorName?: string | null;
  priceInPaise?: number;
  mrpInPaise?: number | null;
  level?: "beginner" | "intermediate" | "advanced";
  language?: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Saving…" : label}
    </Button>
  );
}

export function CourseForm({
  action,
  values,
  submitLabel,
}: {
  action: FormAction;
  values?: CourseFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState<CourseFormState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {values?.id && <input type="hidden" name="courseId" value={values.id} />}

      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <Field
        label="Title"
        name="title"
        required
        defaultValue={values?.title ?? ""}
        placeholder="Meta Ads Mastery"
        maxLength={120}
      />

      <Field
        label="Subtitle"
        name="subtitle"
        defaultValue={values?.subtitle ?? ""}
        placeholder="Run profitable ad campaigns from scratch"
        hint="One line, shown on the course card."
        maxLength={200}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={6}
          maxLength={5000}
          defaultValue={values?.description ?? ""}
          placeholder="What will someone be able to do after this course?"
          className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[16px] leading-relaxed transition-colors focus:border-[var(--color-primary)]"
        />
        <p className="text-xs text-[var(--color-muted-foreground)]">
          Line breaks are preserved.
        </p>
      </div>

      <Field
        label="Instructor name"
        name="instructorName"
        defaultValue={values?.instructorName ?? ""}
        placeholder="Aishwarya Sharma"
        maxLength={80}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Price (₹)"
          name="priceInRupees"
          type="number"
          inputMode="numeric"
          min={0}
          required
          // Rupees in the form, paise in the database. The Server Action does
          // the conversion so no two places have to agree on the unit.
          defaultValue={values?.priceInPaise != null ? values.priceInPaise / 100 : 0}
          hint="Enter 0 for a free course."
        />
        <Field
          label="MRP (₹)"
          name="mrpInRupees"
          type="number"
          inputMode="numeric"
          min={0}
          defaultValue={values?.mrpInPaise != null ? values.mrpInPaise / 100 : ""}
          hint="Optional. Shown struck through to display a discount."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="level" className="text-sm font-medium">
            Level
          </label>
          <select
            id="level"
            name="level"
            defaultValue={values?.level ?? "beginner"}
            className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px] transition-colors focus:border-[var(--color-primary)]"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <Field
          label="Language"
          name="language"
          defaultValue={values?.language ?? "en"}
          placeholder="en"
          maxLength={20}
        />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
