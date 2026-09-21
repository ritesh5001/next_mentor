"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { KeyRound } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import type { ActionState } from "@/actions/admin";
import { INDIAN_STATES } from "@/lib/indian-states";

function Submit({ label, busy }: { label: string; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} className="w-full sm:w-auto">
      {pending ? busy : label}
    </Button>
  );
}

/** Edit what the member typed at signup: name, email, phone, state. */
export function MemberDetailsForm({
  action,
  values,
}: {
  action: (p: ActionState, fd: FormData) => Promise<ActionState>;
  values: { name: string | null; email: string; phone: string | null; state: string | null };
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);
  // A state typed before the list existed may not be in it; keep it selectable.
  const states = values.state && !INDIAN_STATES.includes(values.state)
    ? [values.state, ...INDIAN_STATES]
    : INDIAN_STATES;

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      {state?.error && <Alert tone="error" className="sm:col-span-2">{state.error}</Alert>}
      {state?.success && <Alert tone="success" className="sm:col-span-2">{state.success}</Alert>}

      <Field label="Full name" name="name" required defaultValue={values.name ?? ""} autoComplete="off" />
      <Field label="Email (login)" name="email" type="email" required defaultValue={values.email} autoComplete="off" />
      <Field
        label="Contact number"
        name="phone"
        type="tel"
        inputMode="numeric"
        defaultValue={values.phone ?? ""}
        placeholder="10-digit mobile"
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="md-state" className="text-sm font-medium">State</label>
        <select
          id="md-state"
          name="state"
          defaultValue={values.state ?? ""}
          className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px]"
        >
          <option value="">Not set</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <p className="text-xs text-[var(--color-muted-foreground)] sm:col-span-2">
        Changing the email changes what they log in with — let them know.
      </p>
      <div className="sm:col-span-2">
        <Submit label="Save details" busy="Saving…" />
      </div>
    </form>
  );
}

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint32Array(10));
  return `N${Array.from(bytes, (b) => chars[b % chars.length]).join("")}7`;
}

/**
 * Sets a new password. Existing passwords cannot be shown — they are stored
 * one-way — so the fix for "I forgot it" or a typo at signup is a new one.
 */
export function SetPasswordForm({
  action,
}: {
  action: (p: ActionState, fd: FormData) => Promise<ActionState>;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);
  const [password, setPassword] = useState("");

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="sp-password" className="text-sm font-medium">New password</label>
        <div className="flex gap-2">
          <input
            id="sp-password"
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
        <p className="text-xs text-[var(--color-muted-foreground)]">
          8+ characters, with a capital letter and a number. Their old password stops working.
        </p>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <input type="checkbox" name="emailMember" defaultChecked className="size-4 accent-[var(--brand-blue)]" />
        Email the new password to the member
      </label>

      <div>
        <Submit label="Set new password" busy="Setting…" />
      </div>
    </form>
  );
}
