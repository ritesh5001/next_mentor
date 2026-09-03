import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { requireUser } from "@/lib/queries";

/**
 * The player shell.
 *
 * Deliberately outside the (dashboard) group rather than nested inside it: a
 * nested layout can only add chrome, never remove its parent's, and the
 * seventeen-item sidebar is exactly what should not be here. Watching a lesson
 * is a focused task, and every pixel spent on navigation is a pixel not spent
 * on the video.
 *
 * What remains is the minimum needed to not feel trapped: the mark, the way
 * back, and nothing else.
 */
export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  await requireUser();

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 surface-blur">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/dashboard"
            className="flex min-h-11 items-center gap-1.5 rounded-[var(--radius-control)] pr-3 text-sm font-semibold text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            <ChevronLeft className="size-4" strokeWidth={2} aria-hidden="true" />
            Back to dashboard
          </Link>

          <Link href="/dashboard" aria-label="NextMentor">
            <Logo className="h-7 w-auto" />
          </Link>
        </div>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>
    </div>
  );
}
