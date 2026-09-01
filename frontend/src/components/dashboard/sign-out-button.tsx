"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";

import { signOutAction } from "@/actions/auth";

/** Clears the session cookie and returns to the public site. */
export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => void signOutAction())}
      className="flex min-h-11 items-center gap-1.5 rounded-[var(--radius-control)] px-3 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] disabled:opacity-60"
    >
      <LogOut className="size-4" strokeWidth={1.5} aria-hidden="true" />
      <span className="hidden sm:inline">{pending ? "Signing out…" : "Sign out"}</span>
    </button>
  );
}
