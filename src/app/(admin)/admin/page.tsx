import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookOpen, CreditCard, TrendingUp, Users } from "lucide-react";

import { requireAdmin } from "@/backend/lib/permissions";
import { getAdminStats, getRevenueByDay } from "@/backend/services/admin";
import { RevenueChart } from "@/frontend/components/admin/revenue-chart";
import { formatPrice } from "@/frontend/lib/format";

export const metadata: Metadata = {
  title: "Overview",
  robots: { index: false, follow: false },
};

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  money,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: typeof Users;
  money?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
          {label}
        </span>
        <Icon
          className={money ? "size-4 text-[var(--color-accent)]" : "size-4 text-[var(--color-muted-foreground)]"}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <span
        className={
          money
            ? "tabular text-2xl font-extrabold text-[var(--color-accent)]"
            : "tabular text-2xl font-extrabold"
        }
      >
        {value}
      </span>
      {sub && <span className="text-xs text-[var(--color-muted-foreground)]">{sub}</span>}
    </div>
  );
}

function ChartSkeleton() {
  return <div className="h-64 animate-pulse rounded-[var(--radius-control)] bg-[var(--color-muted)]" />;
}

async function RevenueSection() {
  const data = await getRevenueByDay(30);
  return <RevenueChart data={data} />;
}

async function StatsSection() {
  const stats = await getAdminStats();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Net revenue"
        value={formatPrice(stats.netInPaise)}
        sub={
          stats.refundedInPaise > 0
            ? `${formatPrice(stats.refundedInPaise)} refunded`
            : `${stats.paidCount} paid order(s)`
        }
        icon={TrendingUp}
        money
      />
      <StatCard
        label="Paid orders"
        value={String(stats.paidCount)}
        sub={stats.pendingCount > 0 ? `${stats.pendingCount} awaiting payment` : "All settled"}
        icon={CreditCard}
      />
      <StatCard
        label="Users"
        value={String(stats.userCount)}
        sub={`${stats.verifiedCount} verified`}
        icon={Users}
      />
      <StatCard
        label="Courses"
        value={String(stats.publishedCount)}
        sub={stats.draftCount > 0 ? `${stats.draftCount} in draft` : "All published"}
        icon={BookOpen}
      />
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-[104px] animate-pulse rounded-[var(--radius-card)] bg-[var(--color-muted)]" />
      ))}
    </div>
  );
}

export default async function AdminOverviewPage() {
  await requireAdmin();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Overview</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Revenue and activity across the platform.
        </p>
      </header>

      {/* Each section streams independently, so a slow aggregate never blocks
          the page shell. */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      <section className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <h2 className="text-lg font-bold tracking-tight">Revenue · last 30 days</h2>
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueSection />
        </Suspense>
      </section>

      <nav aria-label="Admin sections" className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {[
          { href: "/admin/courses", label: "Courses" },
          { href: "/admin/plans", label: "Plans" },
          { href: "/admin/coupons", label: "Coupons" },
          { href: "/admin/kyc", label: "KYC" },
          { href: "/admin/payouts", label: "Payouts" },
          { href: "/admin/users", label: "Users" },
          { href: "/admin/orders", label: "Orders" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex min-h-11 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm font-semibold transition-colors hover:bg-[var(--color-muted)]"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
