import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Lock, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { formatDuration } from "@/lib/format";
import { getTrainingModules, requireUser } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Affiliate training",
  robots: { index: false, follow: false },
};

export default async function TrainingPage() {
  const user = await requireUser();
  const modules = await getTrainingModules();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Affiliate training</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          How to actually get people to click, sign up and buy.
        </p>
      </header>

      {modules.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-16 text-center">
          <GraduationCap
            className="size-8 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold">Training is on the way</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            Modules will appear here as they are published.
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-3">
          {modules.map((m, i) => (
            <li
              key={m.id}
              className="flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
            >
              <span className="tabular flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-muted)] text-sm font-bold text-[var(--color-muted-foreground)]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold leading-snug">{m.title}</h2>
                  {m.locked && (
                    <Badge tone="neutral">
                      <Lock className="size-3" strokeWidth={2} aria-hidden="true" />
                      {m.planRequiredName ?? "Locked"}
                    </Badge>
                  )}
                </div>
                {m.description && (
                  <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                    {m.description}
                  </p>
                )}
                {m.durationSeconds > 0 && (
                  <span className="tabular text-xs text-[var(--color-muted-foreground)]">
                    {formatDuration(m.durationSeconds)}
                  </span>
                )}
              </div>

              {m.locked ? (
                <Link
                  href="/dashboard/plan"
                  className={buttonClasses({ variant: "secondary", size: "sm" })}
                >
                  Upgrade to unlock
                </Link>
              ) : m.streamVideoId ? (
                <span className={buttonClasses({ size: "sm" })}>
                  <PlayCircle className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  Watch
                </span>
              ) : (
                <span className="text-xs text-[var(--color-muted-foreground)]">
                  Video coming soon
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
