import type { Metadata } from "next";
import { Trophy } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { getTopPerformers, requireUser } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Top performers",
  robots: { index: false, follow: false },
};

/** Medal colours for the first three. Rank is also shown as a number. */
const MEDAL = ["text-[#D4AF37]", "text-[#A8A9AD]", "text-[#A97142]"];

export default async function TopPerformersPage() {
  const me = await requireUser();
  const performers = await getTopPerformers();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Top performers</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Ranked on cleared commission over the last 30 days.
        </p>
      </header>

      {performers.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-16 text-center">
          <Trophy
            className="size-8 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold">The board is empty</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            Nobody has cleared commission in the last 30 days yet. Be the first.
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-2">
          {performers.map((p, i) => {
            const isMe = p.userId === me.id;

            return (
              <li
                key={p.userId}
                className={cn(
                  "flex items-center gap-4 rounded-[var(--radius-card)] border bg-[var(--color-card)] px-4 py-3",
                  isMe
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]"
                    : "border-[var(--color-border)]",
                )}
              >
                <span className="flex w-8 shrink-0 items-center justify-center">
                  {i < 3 ? (
                    <Trophy
                      className={cn("size-5", MEDAL[i])}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="tabular text-sm font-bold text-[var(--color-muted-foreground)]">
                      {i + 1}
                    </span>
                  )}
                  {/* Rank is announced for screen readers even when a medal
                      icon replaces the number visually. */}
                  <span className="sr-only">Rank {i + 1}</span>
                </span>

                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">
                    {/* Only a first name and initial — a public leaderboard is
                        not a reason to publish everyone's full identity. */}
                    {maskName(p.name)}
                    {isMe && (
                      <span className="ml-2 text-xs font-bold text-[var(--color-primary)]">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--color-muted-foreground)]">
                    {p.saleCount} sale{p.saleCount === 1 ? "" : "s"}
                  </div>
                </div>

                <span className="tabular shrink-0 font-extrabold text-[var(--color-accent)]">
                  {formatPrice(p.earnedInPaise)}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function maskName(name: string | null): string {
  if (!name) return "Anonymous";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}
