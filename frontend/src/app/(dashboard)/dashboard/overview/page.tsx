import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, Briefcase, CalendarDays, IndianRupee, Users, Wallet } from "lucide-react";

import { EarningsChart, SalesDonut } from "@/components/dashboard/overview-charts";
import {
  Avatar,
  Cell,
  DataTable,
  Panel,
  Row,
  StatTile,
} from "@/components/dashboard/panels";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/lib/format";
import { getOverview, requireUser } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Dashboard",
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
  const [user, data] = await Promise.all([requireUser(), getOverview()]);

  const pct = Math.min(
    100,
    Math.round((data.monthEarnedInPaise / MONTHLY_TARGET_IN_PAISE) * 100),
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Identity band, as on the reference: who you are, what you are on, and
          the one action worth putting at the top of the page. */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] sm:p-5">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name={user.name ?? user.email} src={user.image} size={64} />
          <div className="flex min-w-0 flex-col">
            <h1 className="truncate text-lg font-extrabold tracking-tight sm:text-xl">
              {user.name ?? "Your dashboard"}
            </h1>
            <p className="truncate text-sm text-[var(--color-muted-foreground)]">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="pill inline-flex min-h-11 items-center px-4 text-sm font-bold text-white" style={{ background: "var(--brand-gradient)" }}>
            {data.planName ?? "No plan"}
          </span>
          <Link href="/dashboard/earnings" className={buttonClasses({ variant: "secondary" })}>
            View earnings
          </Link>
        </div>
      </section>

      {/* Earnings by period. All four are money, so all four are amber. */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Today" value={formatPrice(data.earned.today)} tone="money"
          icon={<CalendarDays className="size-7" strokeWidth={1.4} aria-hidden="true" />} />
        <StatTile label="Last 7 days" value={formatPrice(data.earned.last7)} tone="money"
          icon={<Banknote className="size-7" strokeWidth={1.4} aria-hidden="true" />} />
        <StatTile label="Last 30 days" value={formatPrice(data.earned.last30)} tone="money"
          icon={<Briefcase className="size-7" strokeWidth={1.4} aria-hidden="true" />} />
        <StatTile label="All time" value={formatPrice(data.earned.allTime)} tone="money"
          icon={<IndianRupee className="size-7" strokeWidth={1.4} aria-hidden="true" />} />
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
                <span className="tabular font-extrabold">{data.totalSales}</span>
              </li>
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <StatTile label="Pending commission" value={formatPrice(data.wallet.pendingInPaise)}
          hint="clears after the refund window" tone="info"
          icon={<Wallet className="size-7" strokeWidth={1.4} aria-hidden="true" />} />
        <StatTile label="Remaining balance" value={formatPrice(data.wallet.availableInPaise)}
          hint="ready to withdraw" tone="money"
          icon={<IndianRupee className="size-7" strokeWidth={1.4} aria-hidden="true" />} />
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
              style={{ width: `${pct}%`, background: "var(--brand-gradient)" }}
            />
          </div>
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-[var(--color-muted-foreground)]">
              Earned{" "}
              <span className="tabular font-bold text-[var(--color-accent)]">
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
          <dd className="tabular text-lg font-extrabold">{value}</dd>
          <span className="sr-only">{head}</span>
        </div>
      ))}
    </dl>
  );
}
