import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Form field with a visible label, persistent helper text, and an error slot
 * directly beneath the input.
 *
 * Labels are never collapsed into placeholders: a placeholder disappears the
 * moment someone types, which strands anyone who gets interrupted mid-form.
 */

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, hint, error, id, required, className, containerClassName, ...props },
  ref,
) {
  const generated = React.useId();
  const fieldId = id ?? generated;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-[var(--color-foreground)]">
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--color-destructive)]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hintId, errorId) || undefined}
        className={cn(
          // 44px min height — the same touch-target floor as buttons.
          "min-h-11 w-full rounded-[var(--radius-control)] border bg-[var(--color-card)] px-3 py-2",
          "text-[16px] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]",
          "transition-colors duration-150",
          "border-[var(--color-border)] focus:border-[var(--color-primary)]",
          error && "border-[var(--color-destructive)]",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />

      {hint && !error && (
        <p id={hintId} className="text-xs text-[var(--color-muted-foreground)]">
          {hint}
        </p>
      )}

      {error && (
        // role="alert" so a screen reader announces the problem without the
        // user having to go hunting for it.
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
});
