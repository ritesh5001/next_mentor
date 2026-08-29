import Link from "next/link";
import { GraduationCap } from "lucide-react";

import { auth } from "@/backend/lib/auth";
import { buttonClasses } from "@/frontend/components/ui/button";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Blur is allowed here — a sticky nav is one of the three surfaces the
          design system permits it on. */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/85 surface-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <GraduationCap
              className="size-6 text-[var(--color-primary)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            NextMentor
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/courses"
              className="rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              Courses
            </Link>

            {session?.user ? (
              <Link href="/dashboard" className={buttonClasses({ size: "sm" })}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonClasses({ variant: "ghost", size: "sm" })}
                >
                  Sign in
                </Link>
                <Link href="/register" className={buttonClasses({ size: "sm" })}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-[var(--color-muted-foreground)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} NextMentor</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-[var(--color-foreground)]">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[var(--color-foreground)]">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
