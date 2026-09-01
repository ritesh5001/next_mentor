"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";

import { signOutAction } from "@/actions/auth";
import { cn } from "@/lib/cn";

/**
 * Clears the session cookie and returns to the public site.
 *
 * Two shapes for the two places it appears. `header` is the compact control in
 * the top bar, which drops its label on narrow screens to save room. `panel` is
 * the full-width row at the foot of the mobile drawer — on a phone the header
 * is tight, and the drawer is where someone already goes to navigate.
 */
export function SignOutButton({
  variant = "header",
  onSignOut,
}: {
  variant?: "header" | "panel";
  onSignOut?: () => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      // The label is hidden below `sm` and the icon is decorative, so without
      // this the header button reaches a screen reader as an unnamed button.
      aria-label="Sign out"
      onClick={() => {
        onSignOut?.();
        startTransition(() => void signOutAction());
      }}
      className={cn(
        "flex min-h-11 items-center gap-1.5 rounded-[var(--radius-control)] px-3 text-sm font-medium transition-colors disabled:opacity-60",
        variant === "header"
          ? "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          : "w-full justify-start text-[var(--color-destructive)] hover:bg-[var(--color-destructive-subtle)]",
      )}
    >
      <LogOut className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      <span className={cn(variant === "header" && "hidden sm:inline")}>
        {pending ? "Signing out…" : "Sign out"}
      </span>
    </button>
  );
}
