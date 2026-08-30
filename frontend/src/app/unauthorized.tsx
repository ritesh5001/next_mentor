import Link from "next/link";
import { LogIn } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";

/**
 * Rendered when unauthorized() is called — a signed-out user reaching a page
 * that needs an account. Served with HTTP 401.
 */
export default function Unauthorized() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-[var(--color-primary-subtle)]">
        <LogIn
          className="size-7 text-[var(--color-primary)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight">Sign in to continue</h1>
      <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
        You need an account to view this page.
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Link href="/login" className={buttonClasses()}>
          Sign in
        </Link>
        <Link href="/register" className={buttonClasses({ variant: "secondary" })}>
          Create an account
        </Link>
      </div>
    </main>
  );
}
