import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { requireAdmin } from "@/lib/queries";
import { Logo } from "@/components/brand/logo";
import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

/**
 * Admin shell — deliberately a different product from the student dashboard.
 *
 * An administrator does not study here: no KYC to submit, no commission to
 * earn, no certificates to collect. Those seventeen student nav items were
 * noise for this role, so this panel carries only administration.
 *
 * requireAdmin() here is a real server-side check, not just a redirect. The
 * edge proxy only guards page navigations by cookie presence; it cannot verify
 * a role, and it never runs for Server Actions.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 surface-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" aria-label="Admin dashboard">
              <Logo className="h-8 w-auto" />
            </Link>
            <span className="rounded-full bg-[var(--color-accent-subtle)] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--color-accent)]">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* The live site, not the student dashboard: an admin checks how a
                change looks to a visitor, not their own course list. */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] sm:inline-flex"
            >
              View site
              <ExternalLink className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            </Link>

            <span className="hidden max-w-[14rem] truncate text-sm text-[var(--color-muted-foreground)] md:inline">
              {admin.email}
            </span>

            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-6 px-4 py-6 sm:px-6">
        <AdminNav />
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
