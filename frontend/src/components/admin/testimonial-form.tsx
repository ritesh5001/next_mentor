"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { MessageSquareQuote } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { createTestimonialAction, type ActionState } from "@/actions/admin";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full sm:w-auto">
      {pending ? "Adding…" : "Add feedback"}
    </Button>
  );
}

/** Add one piece of real student feedback; it appears on the homepage at once. */
export function TestimonialForm() {
  const [state, action] = useActionState<ActionState, FormData>(createTestimonialAction, null);

  return (
    <section className="rounded-[22px] bg-white p-5 shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)] ring-1 ring-[rgb(16_26_71/0.07)] sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(145deg,#12a150,#0b4a34)] text-white">
          <MessageSquareQuote className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-[17px] font-semibold text-[var(--brand-ink)]">Add student feedback</h2>
          <p className="mt-0.5 text-sm text-[var(--color-muted-foreground)]">
            Paste what the student actually wrote — each card shows a verified tick, so only real
            feedback belongs here.
          </p>
        </div>
      </div>

      <form action={action} className="mt-5 grid gap-4 sm:grid-cols-2">
        {state?.error && <Alert tone="error" className="sm:col-span-2">{state.error}</Alert>}
        {state?.success && <Alert tone="success" className="sm:col-span-2">{state.success}</Alert>}

        <Field label="Student name" name="name" required autoComplete="off" placeholder="e.g. Priti Priyedarshni" />
        <Field
          label="They are a…"
          name="who"
          autoComplete="off"
          placeholder="Student / Housewife / Working professional / Freelancer"
        />
        <Field label="Course or skill" name="course" autoComplete="off" placeholder="e.g. Meta Ads" />
        <Field
          label="Order"
          name="position"
          type="number"
          inputMode="numeric"
          min={0}
          defaultValue={0}
          hint="Lower shows first."
        />

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="body" className="text-sm font-medium">
            What they said <span className="text-[var(--color-destructive)]">*</span>
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={4}
            maxLength={600}
            placeholder="Paste their message here, in their own words."
            className="rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2.5 text-[16px] leading-relaxed"
          />
        </div>

        <div className="sm:col-span-2">
          <Submit />
        </div>
      </form>
    </section>
  );
}
