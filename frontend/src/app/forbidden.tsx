import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";

/**
 * Rendered when forbidden() is called — a signed-in user without the required
 * role or entitlement. Served with HTTP 403.
 *
 * Deliberately says nothing about what exists behind the wall.
 */
export default function Forbidden() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-[var(--color-destructive-subtle)]">
        <ShieldAlert
          className="size-7 text-[var(--color-destructive)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight">No access</h1>
      <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
        Your account does not have permission to view this page.
      </p>

      <Link href="/dashboard" className={buttonClasses({ className: "mt-2" })}>
        Back to my courses
      </Link>
    </main>
  );
}
