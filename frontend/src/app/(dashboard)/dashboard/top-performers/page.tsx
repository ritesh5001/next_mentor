import type { Metadata } from "next";
import { Trophy } from "lucide-react";

import { Avatar, PageHeader, Panel } from "@/components/dashboard/panels";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { getTopPerformers, requireUser } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Top performers",
  robots: { index: false, follow: false },
};

/** First name plus a last initial. A public board is no reason to publish full names. */
function maskName(name: string | null): string {
  if (!name) return "Anonymous";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

export default async function TopPerformersPage() {
  const [me, performers] = await Promise.all([requireUser(), getTopPerformers()]);

  const myIndex = performers.findIndex((p) => p.userId === me.id);
  const podium = performers.slice(0, 3);
  const rest = performers.slice(3, 10);

  // Second, first, third — the arrangement that makes a podium read as one.
  const ORDER = [1, 0, 2];
  const HEIGHT = ["h-20 sm:h-24", "h-28 sm:h-36", "h-14 sm:h-16"];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Leader board"
        subtitle="Ranked on cleared commission over the last 30 days."
      />

      {/* Your own standing first. On the reference this is the widest element
          on the page, because it is the only row the viewer came to find. */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] px-5 py-4 text-white shadow-[var(--shadow-card)]"
        style={{ background: "var(--brand-gradient)" }}
      >
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
          Your rank
        </span>
        {myIndex === -1 ? (
          <span className="text-sm text-white/85">
            Not on the board yet. Cleared commission puts you here.
          </span>
        ) : (
          <span className="flex items-center gap-3">
            <span className="tabular rounded-full bg-white/20 px-3 py-1 text-sm font-extrabold">
              #{myIndex + 1}
            </span>
            <span className="text-sm font-semibold">{me.name ?? me.email}</span>
            <span className="tabular text-lg font-extrabold">
              {formatPrice(performers[myIndex].earnedInPaise)}
            </span>
          </span>
        )}
      </div>

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
        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Panel title="Top three" bodyClassName="pt-8">
            {/* The visual order is 2-1-3, so the DOM order is corrected for
                assistive tech with an explicit rank on each entry. */}
            <ol className="flex items-end justify-center gap-3 sm:gap-6">
              {ORDER.map((idx, slot) => {
                const p = podium[idx];
                if (!p) return null;
                return (
                  <li key={p.userId} className="flex w-24 flex-col items-center gap-2 sm:w-32">
                    <Avatar name={maskName(p.name)} src={p.image} size={slot === 1 ? 72 : 56} />
                    <span className="w-full truncate text-center text-xs font-bold sm:text-sm">
                      {maskName(p.name)}
                    </span>
                    <span className="tabular rounded-full bg-[var(--color-accent-subtle)] px-2.5 py-1 text-xs font-extrabold text-[var(--color-accent)]">
                      {formatPrice(p.earnedInPaise)}
                    </span>
                    <div
                      className={cn(
                        "flex w-full items-start justify-center rounded-t-[var(--radius-control)] pt-2",
                        HEIGHT[slot],
                      )}
                      style={{ background: "var(--brand-gradient)" }}
                    >
                      <span className="tabular text-2xl font-extrabold text-white/90">
                        {idx + 1}
                      </span>
                    </div>
                    <span className="sr-only">Rank {idx + 1}</span>
                  </li>
                );
              })}
            </ol>
          </Panel>

          <Panel title="Ranks 4 to 10">
            {rest.length === 0 ? (
              <p className="py-6 text-center text-sm text-[var(--color-muted-foreground)]">
                Nobody else has cleared commission yet.
              </p>
            ) : (
              <ol className="flex flex-col gap-2">
                {rest.map((p, i) => {
                  const rank = i + 4;
                  const isMe = p.userId === me.id;
                  return (
                    <li
                      key={p.userId}
                      className={cn(
                        "flex items-center gap-3 rounded-[var(--radius-control)] border px-3 py-2.5",
                        isMe
                          ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]"
                          : "border-[var(--color-border)]",
                      )}
                    >
                      <span className="tabular w-7 shrink-0 text-sm font-bold text-[var(--color-muted-foreground)]">
                        #{rank}
                      </span>
                      <Avatar name={maskName(p.name)} src={p.image} size={28} />
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                        {maskName(p.name)}
                        {isMe && (
                          <span className="ml-2 text-xs font-bold text-[var(--color-primary)]">
                            You
                          </span>
                        )}
                      </span>
                      <span className="tabular shrink-0 text-sm font-extrabold text-[var(--color-accent)]">
                        {formatPrice(p.earnedInPaise)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}
          </Panel>
        </div>
      )}
    </div>
  );
}
