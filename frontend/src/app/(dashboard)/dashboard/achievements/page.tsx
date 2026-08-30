import type { Metadata } from "next";
import * as Icons from "lucide-react";

import { formatPrice, formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { getAchievementBoard, requireUser } from "@/lib/queries";

export const metadata: Metadata = {
  title: "My achievements",
  robots: { index: false, follow: false },
};

const TIER_STYLE: Record<string, string> = {
  bronze: "text-[#A97142] bg-[#A97142]/10",
  silver: "text-[#8C8F94] bg-[#8C8F94]/10",
  gold: "text-[#B8860B] bg-[#B8860B]/10",
};

export default async function AchievementsPage() {
  const user = await requireUser();
  const board = await getAchievementBoard();

  const unlocked = board.filter((b) => b.unlockedAt);
  const locked = board.filter((b) => !b.unlockedAt);

  function progressLabel(b: (typeof board)[number]) {
    // Money metrics read as currency; everything else is a plain count.
    if (b.metric === "commission_earned_paise") {
      return `${formatPrice(b.current)} of ${formatPrice(b.threshold)}`;
    }
    return `${b.current} of ${b.threshold}`;
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">My achievements</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {unlocked.length} of {board.length} unlocked
        </p>
      </header>

      {board.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-16 text-center text-sm text-[var(--color-muted-foreground)]">
          No badges have been set up yet.
        </p>
      ) : (
        <>
          {unlocked.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-tight">Unlocked</h2>
              <ul className="stagger-in grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {unlocked.map((b) => {
                  const Icon =
                    (Icons[b.icon as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.Award;
                  return (
                    <li
                      key={b.id}
                      className="flex gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
                    >
                      <div
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-full",
                          TIER_STYLE[b.tier] ?? TIER_STYLE.bronze,
                        )}
                      >
                        <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <h3 className="font-bold leading-snug">{b.title}</h3>
                        <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                          {b.description}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[var(--color-success)]">
                          Unlocked{" "}
                          {formatDate(b.unlockedAt)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {locked.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-tight">Still to earn</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {locked.map((b) => {
                  const Icon =
                    (Icons[b.icon as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.Award;
                  return (
                    <li
                      key={b.id}
                      className="flex gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 opacity-75"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-muted)]">
                        <Icon
                          className="size-5 text-[var(--color-muted-foreground)]"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <h3 className="font-bold leading-snug">{b.title}</h3>
                        <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                          {b.description}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <div
                            role="progressbar"
                            aria-valuenow={b.percent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${b.title} progress`}
                            className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-muted)]"
                          >
                            <div
                              className="h-full rounded-full bg-[var(--color-primary)]"
                              style={{ width: `${b.percent}%` }}
                            />
                          </div>
                          {/* The number is present as well as the bar. */}
                          <span className="tabular shrink-0 text-xs text-[var(--color-muted-foreground)]">
                            {progressLabel(b)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
