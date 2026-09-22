import type { Metadata } from "next";
import Link from "next/link";
import { Trophy } from "lucide-react";

import { Avatar, PageHeader } from "@/components/dashboard/panels";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { getTopPerformers, requireUser, type LeaderboardPeriod } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Top performers",
  robots: { index: false, follow: false },
};

const PERIODS: Array<{ value: LeaderboardPeriod; label: string; empty: string }> = [
  { value: "today", label: "Today", empty: "today" },
  { value: "week", label: "This week", empty: "in the last 7 days" },
  { value: "month", label: "This month", empty: "this month" },
  { value: "all", label: "All time", empty: "yet" },
];

const GRADIENT = "linear-gradient(100deg,#0f7a45 0%,#12305f 70%,#101a47 100%)";

/** First name plus a last initial. A public board is no reason to publish full names. */
function maskName(name: string | null): string {
  if (!name) return "Anonymous";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

export default async function TopPerformersPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period: raw } = await searchParams;
  const active = PERIODS.find((p) => p.value === raw) ?? PERIODS[2];

  const [me, board] = await Promise.all([requireUser(), getTopPerformers(active.value)]);
  const { top } = board;

  const podium = top.slice(0, 3);
  const rest = top.slice(3, 10);

  // Second, first, third — the arrangement that makes a podium read as one.
  const ORDER = [1, 0, 2];
  const HEIGHT = ["h-20 sm:h-24", "h-28 sm:h-36", "h-14 sm:h-16"];
  const AVATAR = [64, 84, 64];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Leader board" subtitle="Ranked on commission earned in the period." />

      <section className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
        {/* Your own standing first — the only row the viewer came to find. */}
        <div className="flex flex-col gap-3 border-b border-[var(--color-border)] px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
          <span className="shrink-0 text-base font-bold text-[var(--brand-ink)]">Your rank</span>
          <div
            className="flex min-w-0 flex-1 items-center gap-3 rounded-[var(--radius-control)] px-4 py-3 text-white"
            style={{ background: GRADIENT }}
          >
            <Avatar name={me.name ?? me.email} src={me.image} size={36} />
            {board.me ? (
              <>
                <span className="tabular text-lg font-bold">#{board.me.rank}</span>
                <span className="min-w-0 flex-1 truncate text-center text-sm text-white/85">
                  {me.name ?? me.email}
                </span>
                <span className="tabular shrink-0 text-base font-bold sm:text-lg">
                  {formatPrice(board.me.earnedInPaise)}
                </span>
              </>
            ) : (
              <span className="min-w-0 flex-1 text-sm text-white/85">
                Not ranked {active.value === "all" ? "yet" : active.empty}. Your next sale puts
                you on the board.
              </span>
            )}
          </div>
        </div>

        <div className="px-4 py-5 sm:px-6">
          <nav
            aria-label="Leader board period"
            className="mx-auto grid max-w-2xl grid-cols-4 gap-1 rounded-full bg-[var(--color-muted)] p-1"
          >
            {PERIODS.map((p) => {
              const isActive = p.value === active.value;
              return (
                <Link
                  key={p.value}
                  href={`/dashboard/top-performers?period=${p.value}`}
                  aria-current={isActive ? "page" : undefined}
                  scroll={false}
                  className={cn(
                    "rounded-full px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide transition-colors sm:text-xs",
                    isActive
                      ? "text-white shadow-[var(--shadow-card)]"
                      : "text-[var(--color-muted-foreground)] hover:text-[var(--brand-ink)]",
                  )}
                  style={isActive ? { background: GRADIENT } : undefined}
                >
                  {p.label}
                </Link>
              );
            })}
          </nav>

          {top.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <Trophy
                className="size-8 text-[var(--color-muted-foreground)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="text-lg font-bold">The board is empty</h2>
              <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
                Nobody has earned commission {active.empty}. Be the first.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
              {/* The visual order is 2-1-3, so each entry carries its rank for
                  assistive tech. */}
              <ol className="flex items-end justify-center">
                {ORDER.map((idx, slot) => {
                  const p = podium[idx];
                  return (
                    <li key={idx} className="flex w-1/3 max-w-44 flex-col items-center">
                      {p ? (
                        <>
                          <span className="rounded-full p-1" style={{ background: GRADIENT }}>
                            <span className="block rounded-full bg-[var(--color-card)] p-0.5">
                              <Avatar
                                name={maskName(p.name)}
                                src={p.image}
                                size={AVATAR[slot]}
                              />
                            </span>
                          </span>
                          <span className="mt-2 w-full truncate px-1 text-center text-xs font-semibold text-[var(--brand-ink)] sm:text-sm">
                            {maskName(p.name)}
                            {p.userId === me.id && (
                              <span className="ml-1 text-[var(--brand-green)]">(You)</span>
                            )}
                          </span>
                          <span
                            className="tabular mt-1.5 mb-3 rounded-full px-3 py-1 text-xs font-bold text-white sm:text-sm"
                            style={{ background: GRADIENT }}
                          >
                            {formatPrice(p.earnedInPaise)}
                          </span>
                          <span className="sr-only">Rank {p.rank}</span>
                        </>
                      ) : (
                        <span className="mb-3 text-xs text-[var(--color-muted-foreground)]">—</span>
                      )}
                      {/* Podium step: a light top face over a green front. */}
                      <div className="w-full">
                        <div className="h-2.5 rounded-t-md bg-gradient-to-b from-slate-200 to-slate-400" />
                        <div
                          className={cn(
                            "flex w-full items-start justify-center pt-2 shadow-inner",
                            HEIGHT[slot],
                            slot === 0 && "rounded-bl-md",
                            slot === 2 && "rounded-br-md",
                          )}
                          style={{ background: "linear-gradient(180deg,#12a150,#0b5d33)" }}
                        >
                          <span
                            className="tabular text-3xl font-black text-white sm:text-4xl"
                            style={{ textShadow: "0 2px 0 rgba(0,0,0,.35)" }}
                            aria-hidden="true"
                          >
                            {idx + 1}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {rest.length > 0 && (
                <ol className="flex flex-col gap-2.5 self-start">
                  {rest.map((p) => {
                    const isMe = p.userId === me.id;
                    return (
                      <li
                        key={p.userId}
                        className={cn(
                          "flex items-center gap-3 rounded-full py-1.5 pr-4 pl-4 text-white shadow-[var(--shadow-card)]",
                          isMe && "ring-2 ring-[var(--brand-green)] ring-offset-2",
                        )}
                        style={{ background: GRADIENT }}
                      >
                        <span className="tabular w-8 shrink-0 text-sm font-bold">#{p.rank}</span>
                        <Avatar name={maskName(p.name)} src={p.image} size={36} />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">
                          {maskName(p.name)}
                          {isMe && <span className="ml-1.5 text-xs font-bold">(You)</span>}
                        </span>
                        <span className="tabular shrink-0 text-sm font-bold">
                          {formatPrice(p.earnedInPaise)}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
