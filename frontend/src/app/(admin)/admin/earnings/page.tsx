import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";

import { EarningsCsvButton } from "@/components/admin/earnings-csv";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { getEarningsReport, requireAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Earnings & payouts",
  robots: { index: false, follow: false },
};

const KYC_TONE = { approved: "success", pending: "warning", rejected: "danger" } as const;

/**
 * The payout sheet: every earning member, what they earned, what is still
 * maturing, what is ready, and what can be paid today — no hand arithmetic.
 */
export default async function AdminEarningsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; show?: string }>;
}) {
  await requireAdmin();
  const [{ q, show }, report] = await Promise.all([searchParams, getEarningsReport()]);

  const needle = q?.trim().toLowerCase() ?? "";
  const rows = report.members.filter((m) => {
    if (show === "payable" && m.toPayInPaise <= 0) return false;
    if (!needle) return true;
    return [m.name, m.email, m.memberId, m.phone].some((v) => v?.toLowerCase().includes(needle));
  });

  const t = report.totals;
  const cards = [
    { label: "Total earned", value: t.lifetimeEarnedInPaise, hint: "all commission ever credited" },
    { label: "Maturing", value: t.pendingInPaise, hint: "inside the 7-day refund window" },
    { label: "Ready to withdraw", value: t.availableInPaise, hint: "matured, not yet paid" },
    { label: "Payout in process", value: t.inProcessInPaise, hint: "requested or approved" },
    { label: "Paid out", value: t.withdrawnInPaise, hint: "already sent to banks" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Earnings &amp; payouts</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Every member&apos;s commission, worked out from the ledger. {t.members} member
            {t.members === 1 ? "" : "s"} with earnings or referrals.
          </p>
        </div>
        <EarningsCsvButton rows={rows} />
      </header>

      {/* The number the owner acts on, set apart from the rest. */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-[linear-gradient(135deg,#0e5a40,#0b4a34)] p-5 text-white sm:p-6">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">To pay now</p>
          <p className="tabular mt-1 text-[32px] font-bold leading-none">{formatPrice(t.toPayInPaise)}</p>
          <p className="mt-1.5 text-[13px] text-white/75">
            Ready to withdraw, for members whose KYC is approved.
          </p>
        </div>
        <Link
          href={show === "payable" ? "/admin/earnings" : "/admin/earnings?show=payable"}
          className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0b4a34]"
        >
          {show === "payable" ? "Show everyone" : "Show only who to pay"}
        </Link>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-[16px] bg-white p-4 ring-1 ring-[rgb(16_26_71/0.07)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted-foreground)]">
              {c.label}
            </p>
            <p className="tabular mt-1 text-[20px] font-bold text-[var(--brand-ink)]">{formatPrice(c.value)}</p>
            <p className="mt-0.5 text-[11.5px] text-[var(--color-muted-foreground)]">{c.hint}</p>
          </div>
        ))}
      </div>

      <form method="get" className="flex max-w-md gap-2">
        {show && <input type="hidden" name="show" value={show} />}
        <label htmlFor="q" className="sr-only">Search members</label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" strokeWidth={1.5} aria-hidden="true" />
          <input
            id="q"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Name, email, phone or member ID"
            className="min-h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] py-2 pl-9 pr-3 text-[16px]"
          />
        </div>
        <button type="submit" className="min-h-11 rounded-[var(--radius-control)] bg-[var(--brand-blue)] px-4 text-sm font-semibold text-white">
          Search
        </button>
      </form>

      {rows.length === 0 ? (
        <p className="rounded-[18px] border border-dashed border-[rgb(16_26_71/0.14)] bg-white px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
          {show === "payable" ? "Nobody is due a payout right now." : "No members match."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[18px] bg-white ring-1 ring-[rgb(16_26_71/0.07)]">
          <table className="w-full text-sm" style={{ minWidth: 1100 }}>
            <thead>
              <tr className="bg-[var(--brand-hero-wash)] text-left text-[11.5px] uppercase tracking-[0.08em] text-[var(--brand-ink)]/60">
                <th scope="col" className="px-4 py-3 font-semibold">Member</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">Referrals</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">Sales</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">Earned</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">Maturing</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">Ready</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">In process</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">Paid out</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">To pay now</th>
                <th scope="col" className="px-3 py-3 font-semibold">KYC / bank</th>
                <th scope="col" className="px-3 py-3"><span className="sr-only">Details</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.userId} className="border-t border-[rgb(16_26_71/0.06)] align-top">
                  <td className="px-4 py-3">
                    <span className="block font-semibold text-[var(--brand-ink)]">{m.name ?? m.email}</span>
                    <span className="block text-xs text-[var(--color-muted-foreground)]">{m.email}</span>
                    <span className="mt-0.5 block font-mono text-[11px] text-[var(--color-muted-foreground)]">
                      {m.memberId}
                      {m.planName ? ` · ${m.planName}` : ""}
                    </span>
                  </td>
                  <td className="tabular px-3 py-3 text-right">{m.referrals}</td>
                  <td className="tabular px-3 py-3 text-right">{m.sales}</td>
                  <td className="tabular px-3 py-3 text-right font-semibold">{formatPrice(m.lifetimeEarnedInPaise)}</td>
                  <td className="tabular px-3 py-3 text-right text-[var(--color-muted-foreground)]">{formatPrice(m.pendingInPaise)}</td>
                  <td className="tabular px-3 py-3 text-right">{formatPrice(m.availableInPaise)}</td>
                  <td className="tabular px-3 py-3 text-right text-[var(--color-muted-foreground)]">{formatPrice(m.inProcessInPaise)}</td>
                  <td className="tabular px-3 py-3 text-right text-[var(--color-muted-foreground)]">{formatPrice(m.withdrawnInPaise)}</td>
                  <td className={cn("tabular px-3 py-3 text-right font-bold", m.toPayInPaise > 0 ? "text-[var(--brand-green)]" : "text-[var(--color-muted-foreground)]")}>
                    {formatPrice(m.toPayInPaise)}
                  </td>
                  <td className="px-3 py-3">
                    {m.kycStatus ? (
                      <>
                        <Badge tone={KYC_TONE[m.kycStatus]} className="capitalize">{m.kycStatus}</Badge>
                        {m.bankAccountName && (
                          <span className="mt-1 block text-xs text-[var(--color-muted-foreground)]">
                            {m.bankAccountName} · ••{m.accountNumberLast4} · {m.ifsc}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-[var(--color-muted-foreground)]">No KYC yet</span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/admin/earnings/${m.userId}`}
                      className="inline-flex items-center gap-0.5 whitespace-nowrap text-[13px] font-semibold text-[var(--brand-blue)] hover:underline"
                    >
                      Details
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-[var(--color-muted-foreground)]">
        To pay someone: approve their request in <Link href="/admin/payouts" className="font-semibold text-[var(--brand-blue)] hover:underline">Payouts</Link>,
        transfer the money, then mark it paid with the bank reference (UTR). Their balance updates automatically.
      </p>
    </div>
  );
}
