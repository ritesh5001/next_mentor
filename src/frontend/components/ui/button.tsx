import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "money";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-card)]",
  secondary:
    "bg-[var(--color-card)] text-[var(--color-foreground)] border border-[var(--color-border)] hover:bg-[var(--color-muted)]",
  ghost: "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
  danger:
    "bg-[var(--color-destructive)] text-[var(--color-on-destructive)] hover:brightness-95",
  // Amber is reserved for money surfaces — withdraw, payout, claim earnings.
  money: "bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:brightness-95",
};

const sizes: Record<Size, string> = {
  // min-h-11 = 44px, the accessibility floor for a touch target.
  sm: "min-h-9 px-3 text-sm gap-1.5",
  md: "min-h-11 px-4 text-sm gap-2",
  lg: "min-h-12 px-6 text-base gap-2",
};

/**
 * Shared class computation so a <Link> can look like a button without nesting
 * an <a> inside a <button> — invalid HTML that also breaks keyboard semantics.
 * Use this on Link; use <Button> for anything that submits or dispatches.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center rounded-[var(--radius-control)] font-semibold",
    "transition-[background-color,box-shadow,transform] duration-200 ease-out",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      // A button that is busy must not be clickable twice — double-submitting a
      // checkout is a duplicate charge.
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {loading && (
        <svg
          className="size-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
          <path
            d="M22 12a10 10 0 0 1-10 10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
