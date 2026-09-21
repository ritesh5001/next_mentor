import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, Briefcase, CalendarDays, IndianRupee, Wallet } from "lucide-react";

import { EarningsChart, SalesDonut } from "@/components/dashboard/overview-charts";
import {
  Avatar,
  Cell,
  DataTable,
  Panel,
  Row,
} from "@/components/dashboard/panels";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPrice } from "@/lib/format";
import { getOverview, getProfile } from "@/lib/queries";
import { LiveRefresh } from "@/components/dashboard/live-refresh";

export const metadata: Metadata = {
  title: "Live income",
  robots: { index: false, follow: false },
};

/** What "on track" means for the month. Shown, not hidden in a constant. */
const MONTHLY_TARGET_IN_PAISE = 30_000_00;

const COMMISSION_TONE = {
  pending: "neutral",
  approved: "success",
  paid: "primary",
  reversed: "danger",
} as const;

export default async function OverviewPage() {
  const [profile, data] = await Promise.all([getProfile(), getOverview()]);
  const fullName = profile.name?.trim() || profile.email.split("@")[0];

  const pct = Math.min(
    100,
    Math.round((data.monthEarnedInPaise / MONTHLY_TARGET_IN_PAISE) * 100),
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Live income hero — the card members screenshot and share, so it
          carries their name, photo, plan and the headline figure. */}
      <section className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#101a47_0%,#132a6b_50%,#0b4a34_100%)] p-6 text-white sm:p-8">
        <span aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,rgb(61_220_114/0.35),transparent_65%)]" />
        <span aria-hidden="true" className="absolute -bottom-28 -left-20 size-72 rounded-full bg-[radial-gradient(circle,rgb(46_111_212/0.35),transparent_65%)]" />
        <span aria-hidden="true" className="absolute bottom-5 right-6 h-20 w-36 bg-[radial-gradient(circle,rgb(255_255_255/0.18)_1.5px,transparent_1.6px)] [background-size:12px_12px]" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span className="rounded-full bg-[linear-gradient(145deg,#3ddc72,#2e6fd4)] p-[3px]">
              <span className="block rounded-full bg-[#101a47] p-[2px]">
                <Avatar name={fullName} src={profile.avatarUrl} size={72} />
              </span>
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-white/65">Welcome back,</p>
              <h1 className="truncate text-[26px] font-bold leading-tight tracking-[-0.6px] sm:text-[32px]">
                {fullName}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="pill bg-[var(--brand-green-bright)] px-3 py-1 text-[12px] font-bold text-[var(--brand-ink)]">
                  {data.planName ?? "No plan"}
                </span>
                <span className="pill bg-white/10 px-3 py-1 font-mono text-[12px] font-semibold ring-1 ring-white/15">
                  ID {profile.referralCode}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 lg:items-end">
            <LiveRefresh />
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-white/60">Total income</p>
            <p className="tabular bg-[linear-gradient(90deg,#ffffff,#b8f5cc)] bg-clip-text text-[44px] font-bold leading-none tracking-[-1.5px] text-transparent sm:text-[56px]">
              {formatPrice(data.earned.allTime)}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                href="/dashboard/earnings"
                className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-[14px] font-semibold text-[var(--brand-ink)] transition-colors hover:bg-white/90"
              >
                View earnings
              </Link>
              <Link
                href="/dashboard/affiliate"
                className="inline-flex min-h-11 items-center rounded-full px-5 text-[14px] font-semibold text-white ring-[1.5px] ring-white/50 transition-colors hover:bg-white/10"
              >
                Share my link
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Income by period — four bold tiles, each its own colour. */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Today", value: data.earned.today, icon: CalendarDays, bg: "linear-gradient(145deg,#22c55e,#0b4a34)" },
          { label: "Last 7 days", value: data.earned.last7, icon: Banknote, bg: "linear-gradient(145deg,#3b82f6,#1b3fa0)" },
          { label: "Last 30 days", value: data.earned.last30, icon: Briefcase, bg: "linear-gradient(145deg,#a855f7,#4c1d95)" },
          { label: "All time", value: data.earned.allTime, icon: IndianRupee, bg: "linear-gradient(145deg,#f59e0b,#c2410c)" },
        ].map((t) => (
          <div
            key={t.label}
            className="relative overflow-hidden rounded-[22px] p-4 text-white shadow-[0_18px_36px_-22px_rgb(16_26_71/0.7)] sm:p-5"
            style={{ background: t.bg }}
          >
            <span aria-hidden="true" className="absolute -right-6 -top-6 size-24 rounded-full bg-white/10" />
            <span aria-hidden="true" className="absolute -bottom-10 right-6 size-20 rounded-full bg-white/[0.07]" />
            <span className="relative flex size-10 items-center justify-center rounded-[12px] bg-white/20">
              <t.icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="relative mt-4 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/80">{t.label}</p>
            <p className="tabular relative mt-1 text-[24px] font-bold leading-tight tracking-[-0.5px] sm:text-[28px]">
              {formatPrice(t.value)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Last 7 days earning overview">
          <EarningsChart data={data.series} />
        </Panel>

        <Panel title="Last 6 months sales">
          <SalesDonut data={data.sales} total={data.totalSales} />
          {data.totalSales > 0 && (
            <ul className="mt-3 flex flex-col gap-1.5 border-t border-[var(--color-border)] pt-3">
              {data.sales.map((s) => (
                <li key={s.planName} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-[var(--color-muted-foreground)]">{s.planName}</span>
                  <span className="tabular font-bold">{s.count}</span>
                </li>
              ))}
              <li className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-1.5 text-sm">
                <span className="font-semibold">Total sales</span>
                <span className="tabular font-bold">{data.totalSales}</span>
              </li>
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-[22px] bg-white p-5 ring-1 ring-[rgb(16_26_71/0.07)] shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)]">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(145deg,#3b82f6,#1b3fa0)] text-white">
            <Wallet className="size-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">Pending commission</p>
            <p className="tabular text-[24px] font-bold text-[var(--brand-ink)]">{formatPrice(data.wallet.pendingInPaise)}</p>
            <p className="text-[12px] text-[var(--color-muted-foreground)]">Clears after the 7-day refund window</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-[22px] bg-[linear-gradient(135deg,#0e5a40,#0b4a34)] p-5 text-white shadow-[0_18px_40px_-28px_rgb(11_74_52/0.8)]">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-white/15">
            <IndianRupee className="size-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/70">Ready to withdraw</p>
            <p className="tabular text-[24px] font-bold">{formatPrice(data.wallet.availableInPaise)}</p>
          </div>
          <Link
            href="/dashboard/earnings"
            className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-white px-4 text-[13px] font-semibold text-[#0b4a34]"
          >
            Withdraw
          </Link>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Total members">
          <PeriodTable
            head="Members"
            row={data.members}
            empty="Nobody has signed up through your link yet."
          />
        </Panel>

        <Panel title="Link views by leads">
          <PeriodTable
            head="Views"
            row={data.clicks}
            empty="Your affiliate link has not been opened yet."
          />
        </Panel>
      </div>

      <Panel title="This month goal">
        <div className="flex flex-col gap-2">
          <div
            className="h-4 w-full overflow-hidden rounded-full bg-[var(--color-muted)]"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress toward this month's earnings goal"
          >
            <div
              className="h-full rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg,#12a150,#3ddc72)" }}
            />
          </div>
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-[var(--color-muted-foreground)]">
              Earned{" "}
              <span className="tabular font-bold text-[var(--brand-green)]">
                {formatPrice(data.monthEarnedInPaise)}
              </span>{" "}
              ({pct}%)
            </span>
            <span className="tabular text-[var(--color-muted-foreground)]">
              Target {formatPrice(MONTHLY_TARGET_IN_PAISE)}
            </span>
          </div>
        </div>
      </Panel>

      <Panel title="Recent joining">
        <DataTable
          head={["#", "Member", "Code", "Joined", "Status", "Amount"]}
          minWidth={640}
          empty={
            data.recent.length === 0
              ? "Nobody has joined through your link yet. Share it to get started."
              : undefined
          }
        >
          {data.recent.map((r, i) => (
            <Row key={`${r.userId}-${i}`} i={i}>
              <Cell className="tabular text-[var(--color-muted-foreground)]">{i + 1}</Cell>
              <Cell>
                <span className="flex items-center gap-2">
                  <Avatar name={r.name ?? "Member"} size={26} />
                  <span className="truncate font-medium">{r.name ?? "Member"}</span>
                </span>
              </Cell>
              <Cell className="tabular text-[var(--color-muted-foreground)]">{r.referralCode}</Cell>
              <Cell className="tabular whitespace-nowrap">
                {r.joinedAt
                  ? formatDate(r.joinedAt, { day: "2-digit", month: "2-digit", year: "numeric" })
                  : "—"}
              </Cell>
              <Cell>
                <Badge tone={COMMISSION_TONE[r.status]} className="capitalize">
                  {r.status}
                </Badge>
              </Cell>
              <Cell align="right" className="tabular font-bold">
                {formatPrice(r.amountInPaise)}
              </Cell>
            </Row>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

/** The four-period strip used for members and for link views. */
function PeriodTable({
  head,
  row,
  empty,
}: {
  head: string;
  row: { today: number; last7: number; last30: number; allTime: number };
  empty: string;
}) {
  if (row.allTime === 0) {
    return (
      <p className="rounded-[var(--radius-control)] border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
        {empty}
      </p>
    );
  }

  const cols: Array<[string, number]> = [
    ["Today", row.today],
    ["Last 7 days", row.last7],
    ["Last 30 days", row.last30],
    ["All time", row.allTime],
  ];

  return (
    <dl className="grid grid-cols-4 gap-px overflow-hidden rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-border)]">
      {cols.map(([label, value]) => (
        <div key={label} className="flex flex-col gap-1 bg-[var(--color-card)] px-3 py-3 text-center">
          <dt className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            {label}
          </dt>
          <dd className="tabular text-lg font-bold">{value}</dd>
          <span className="sr-only">{head}</span>
        </div>
      ))}
    </dl>
  );
}
