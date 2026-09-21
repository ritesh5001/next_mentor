"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Gift, KeyRound } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { createFreeMemberAction, type ActionState } from "@/actions/admin";
import { INDIAN_STATES } from "@/lib/indian-states";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full sm:w-auto">
      {pending ? "Creating…" : "Create free member"}
    </Button>
  );
}

/** A strong random password: letters, digits, at least one capital and number. */
function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint32Array(10));
  const body = Array.from(bytes, (b) => chars[b % chars.length]).join("");
  return `N${body}7`;
}

/**
 * Admin: create a member without payment. The chosen plan is granted free —
 * pick one that grants all courses for full access — and the member gets the
 * same welcome email with their ID and password.
 */
export function FreeMemberForm({ plans }: { plans: { id: string; name: string; grantsAllCourses: boolean }[] }) {
  const [state, action] = useActionState<ActionState, FormData>(createFreeMemberAction, null);
  const [password, setPassword] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const defaultPlan = plans.find((p) => p.grantsAllCourses)?.id ?? plans[0]?.id;

  return (
    <section className="rounded-[22px] bg-white p-5 shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)] ring-1 ring-[rgb(16_26_71/0.07)] sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(145deg,#12a150,#0b4a34)] text-white">
          <Gift className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-[17px] font-semibold text-[var(--brand-ink)]">Create a free member</h2>
          <p className="mt-0.5 text-sm text-[var(--color-muted-foreground)]">
            Active immediately with the plan below — no payment, no commission. Their ID and
            password are emailed to them.
          </p>
        </div>
      </div>

      <form ref={formRef} action={action} className="mt-5 grid gap-4 sm:grid-cols-2">
        {state?.error && (
          <Alert tone="error" className="sm:col-span-2">
            {state.error}
          </Alert>
        )}
        {state?.success && (
          <Alert tone="success" className="sm:col-span-2">
            {state.success}
          </Alert>
        )}

        <Field label="Full name" name="name" required autoComplete="off" />
        <Field label="Contact number" name="phone" type="tel" inputMode="numeric" required placeholder="10-digit mobile" />
        <Field label="Email" name="email" type="email" required autoComplete="off" />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="fm-state" className="text-sm font-medium">
            State <span className="text-[var(--color-destructive)]">*</span>
          </label>
          <select
            id="fm-state"
            name="state"
            required
            defaultValue=""
            className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px]"
          >
            <option value="" disabled>
              Select state
            </option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="fm-password" className="text-sm font-medium">
            Password <span className="text-[var(--color-destructive)]">*</span>
          </label>
          <div className="flex gap-2">
            <input
              id="fm-password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="min-h-11 min-w-0 flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 font-mono text-[15px]"
            />
            <button
              type="button"
              onClick={() => setPassword(generatePassword())}
              className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-[var(--radius-control)] px-3 text-sm font-semibold text-[var(--brand-blue)] ring-1 ring-[var(--color-border)] hover:bg-[var(--brand-hero-wash)]"
            >
              <KeyRound className="size-4" strokeWidth={1.8} aria-hidden="true" />
              Generate
            </button>
          </div>
          <p className="text-xs text-[var(--color-muted-foreground)]">8+ characters, with a capital letter and a number.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="fm-plan" className="text-sm font-medium">
            Plan (granted free) <span className="text-[var(--color-destructive)]">*</span>
          </label>
          <select
            id="fm-plan"
            name="planId"
            required
            defaultValue={defaultPlan}
            className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px]"
          >
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
                {p.grantsAllCourses ? " — all courses" : ""}
              </option>
            ))}
          </select>
        </div>

        <Field
          label="Sponsor referral ID (optional)"
          name="sponsorCode"
          autoComplete="off"
          hint="Places them under a member's team. Leave blank for none."
          containerClassName="sm:col-span-2"
        />

        <div className="sm:col-span-2">
          <Submit />
        </div>
      </form>
    </section>
  );
}
