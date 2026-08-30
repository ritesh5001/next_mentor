"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@nextmentor/shared";

/**
 * A button that runs one admin action and reports the result.
 *
 * Small and generic on purpose — plans, coupons and users all need the same
 * "click, run, show what happened, refresh" behaviour.
 */
export function ActionButton({
  label,
  busyLabel,
  variant = "secondary",
  size = "sm",
  confirm: confirmText,
  run,
}: {
  label: string;
  busyLabel?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "money";
  size?: "sm" | "md" | "lg";
  /** When set, the action asks first. Use for anything destructive. */
  confirm?: string;
  run: () => Promise<ActionState>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        variant={variant}
        size={size}
        loading={pending}
        onClick={() => {
          if (confirmText && !window.confirm(confirmText)) return;
          startTransition(async () => {
            const res = await run();
            if (res?.error) setMessage({ tone: "error", text: res.error });
            else if (res?.success) setMessage({ tone: "success", text: res.success });
            router.refresh();
          });
        }}
      >
        {pending && busyLabel ? busyLabel : label}
      </Button>

      {message && (
        <Alert tone={message.tone} className="max-w-xs text-xs">
          {message.text}
        </Alert>
      )}
    </div>
  );
}

/** Inline <select> that fires an action on change — used for role changes. */
export function ActionSelect<T extends string>({
  value,
  options,
  label,
  run,
}: {
  value: T;
  options: readonly { value: T; label: string }[];
  label: string;
  run: (next: T) => Promise<ActionState>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-1">
      <label className="sr-only">{label}</label>
      <select
        value={value}
        disabled={pending}
        aria-label={label}
        onChange={(e) => {
          const next = e.target.value as T;
          startTransition(async () => {
            const res = await run(next);
            setError(res?.error ?? null);
            router.refresh();
          });
        }}
        className="min-h-9 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-2 text-xs font-medium disabled:opacity-50"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
          {error}
        </p>
      )}
    </div>
  );
}
