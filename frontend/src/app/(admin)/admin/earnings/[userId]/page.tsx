import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatDate, formatPrice } from "@/lib/format";
import { getMemberEarnings, requireAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Member earnings",
  robots: { index: false, follow: false },
};

const COMMISSION_TONE = { pending: "warning", approved: "success", paid: "primary", reversed: "danger" } as const;
const COMMISSION_LABEL = { pending: "Maturing", approved: "Ready", paid: "Paid", reversed: "Reversed (refund)" } as const;
const PAYOUT_TONE = { requested: "warning", approved: "primary", paid: "success", rejected: "danger" } as const;

/** Every rupee a member earned, where it came from, and what was paid. */
export default async function MemberEarningsPage({ params }: { params: Promise<{ userId: string }> }) {
  await requireAdmin();
  const { userId } = await params;
  const data = await getMemberEarnings(userId);
  if (!data) notFound();

  const { member, commissions, payouts } = data;
  const live = commissions.filter((c) => c.status !== "reversed");
  const total = live.reduce((n, c) => n + c.amountInPaise, 0);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/earnings" className="inline-flex w-fit items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--brand-ink)]">
        <ChevronLeft className="size-4" aria-hidden="true" />
        Earnings &amp; payouts
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{member.name ?? member.email}</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {member.email} · <span className="font-mono">{member.memberId}</span> · {live.length} sale
          {live.length === 1 ? "" : "s"} · {formatPrice(total)} earned
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold tracking-tight">Commission, line by line</h2>
        {commissions.length === 0 ? (
          <p className="rounded-[16px] border border-dashed border-[rgb(16_26_71/0.14)] bg-white px-6 py-10 text-center text-sm text-[var(--color-muted-foreground)]">
            No commission yet. It appears here the moment someone they referred pays.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-[18px] bg-white ring-1 ring-[rgb(16_26_71/0.07)]">
            <table className="w-full text-sm" style={{ minWidth: 820 }}>
              <thead>
                <tr className="bg-[var(--brand-hero-wash)] text-left text-[11.5px] uppercase tracking-[0.08em] text-[var(--brand-ink)]/60">
                  <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                  <th scope="col" className="px-3 py-3 font-semibold">From (buyer)</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Bought</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold">Paid by buyer</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold">Rate</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold">Commission</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((c) => (
                  <tr key={c.id} className="border-t border-[rgb(16_26_71/0.06)]">
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(c.createdAt)}</td>
                    <td className="px-3 py-3">
                      <span className="block font-medium">{c.fromName ?? "—"}</span>
                      <span className="block text-xs text-[var(--color-muted-foreground)]">{c.fromEmail}</span>
                    </td>
                    <td className="px-3 py-3">{c.itemName ?? "—"}</td>
                    <td className="tabular px-3 py-3 text-right">{formatPrice(c.baseAmountInPaise)}</td>
                    <td className="tabular px-3 py-3 text-right">{c.rateBps / 100}%</td>
                    <td className="tabular px-3 py-3 text-right font-semibold">{formatPrice(c.amountInPaise)}</td>
                    <td className="px-3 py-3">
                      <Badge tone={COMMISSION_TONE[c.status]}>{COMMISSION_LABEL[c.status]}</Badge>
                      {c.status === "pending" && (
                        <span className="mt-1 block text-[11px] text-[var(--color-muted-foreground)]">
                          ready {formatDate(c.maturesAt)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold tracking-tight">Payouts</h2>
        {payouts.length === 0 ? (
          <p className="rounded-[16px] border border-dashed border-[rgb(16_26_71/0.14)] bg-white px-6 py-10 text-center text-sm text-[var(--color-muted-foreground)]">
            No payout requested yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-[18px] bg-white ring-1 ring-[rgb(16_26_71/0.07)]">
            <table className="w-full text-sm" style={{ minWidth: 560 }}>
              <thead>
                <tr className="bg-[var(--brand-hero-wash)] text-left text-[11.5px] uppercase tracking-[0.08em] text-[var(--brand-ink)]/60">
                  <th scope="col" className="px-4 py-3 font-semibold">Requested</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold">Amount</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-3 py-3 font-semibold">UTR / processed</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className="border-t border-[rgb(16_26_71/0.06)]">
                    <td className="px-4 py-3">{formatDate(p.createdAt)}</td>
                    <td className="tabular px-3 py-3 text-right font-semibold">{formatPrice(p.amountInPaise)}</td>
                    <td className="px-3 py-3">
                      <Badge tone={PAYOUT_TONE[p.status]} className="capitalize">{p.status}</Badge>
                    </td>
                    <td className="px-3 py-3 text-xs text-[var(--color-muted-foreground)]">
                      {p.utrNumber ?? "—"}
                      {p.processedAt ? ` · ${formatDate(p.processedAt)}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
