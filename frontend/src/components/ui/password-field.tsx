"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  hint?: string;
  error?: string;
}

export function PasswordField({
  label,
  hint,
  error,
  id,
  required,
  className,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);
  const generated = React.useId();
  const fieldId = id ?? generated;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-[var(--color-foreground)]">
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--color-destructive)]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <input
          id={fieldId}
          type={visible ? "text" : "password"}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hintId, errorId) || undefined}
          className={cn(
            "min-h-11 w-full rounded-[var(--radius-control)] border bg-[var(--color-card)] py-2 pl-3 pr-12",
            "text-[16px] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]",
            "transition-colors duration-150",
            "border-[var(--color-border)] focus:border-[var(--color-primary)]",
            error && "border-[var(--color-destructive)]",
            className,
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          // The toggle is a convenience, not content — keep it out of the tab
          // order so it does not sit between the field and the submit button.
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
        >
          {visible ? (
            <EyeOff className="size-4" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Eye className="size-4" strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </div>

      {hint && !error && (
        <p id={hintId} className="text-xs text-[var(--color-muted-foreground)]">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-[var(--color-destructive)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
