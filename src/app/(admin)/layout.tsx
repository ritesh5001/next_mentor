import Link from "next/link";
import { GraduationCap, LayoutList } from "lucide-react";

import { requireAdmin } from "@/backend/lib/permissions";

/**
 * Admin shell.
 *
 * requireAdmin() here is a real server-side check, not just a redirect. The
 * edge proxy only guards page navigations by cookie presence; it cannot verify
 * a role, and it never runs for Server Actions.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/85 surface-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 font-extrabold tracking-tight">
              <GraduationCap
                className="size-6 text-[var(--color-primary)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              NextMentor
            </Link>
            <span className="rounded-full bg-[var(--color-accent-subtle)] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">
              Admin
            </span>
          </div>

          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          >
            <LayoutList className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Courses
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
