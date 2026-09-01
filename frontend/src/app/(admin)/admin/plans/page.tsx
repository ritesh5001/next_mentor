import type { Metadata } from "next";
import Link from "next/link";

import { PlanForm } from "@/components/admin/plan-form";
import { ActionButton } from "@/components/admin/row-actions";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { createPlanAction, setPlanActiveAction } from "@/actions/admin";
import { listPlansForAdmin, requireAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Plans",
  robots: { index: false, follow: false },
};

export default async function AdminPlansPage() {
  await requireAdmin();
  const plans = await listPlansForAdmin();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Plans</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Membership tiers. The commission rate here is what members earn on referrals.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold tracking-tight">All plans</h2>

        {plans.length === 0 ? (
          <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
            No plans yet. Create one below.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
                  <th scope="col" className="px-4 py-3 font-semibold">Plan</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Price</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Commission</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Members</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {plans.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-[var(--color-muted)]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{p.name}</span>
                        {p.isFeatured && <Badge tone="primary">Featured</Badge>}
                      </div>
                      <div className="text-xs text-[var(--color-muted-foreground)]">
                        {p.durationDays ? `${p.durationDays} days` : "Lifetime"}
                        {p.grantsAllCourses && " · all courses"}
                      </div>
                    </td>
                    <td className="tabular px-4 py-3 text-right font-medium">
                      {p.priceInPaise === 0 ? "Free" : formatPrice(p.priceInPaise)}
                    </td>
                    <td className="tabular px-4 py-3 text-right font-semibold text-[var(--color-accent)]">
                      {p.commissionRateBps / 100}%
                    </td>
                    <td className="tabular px-4 py-3 text-right">{p.memberCount}</td>
                    <td className="px-4 py-3">
                      <Badge tone={p.isActive ? "success" : "neutral"}>
                        {p.isActive ? "Live" : "Hidden"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/plans/${p.id}`}
                          className="inline-flex min-h-9 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 text-sm font-medium transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        >
                          Edit
                        </Link>
                        <ActionButton
                          label={p.isActive ? "Hide" : "Publish"}
                          run={async () => {
                            "use server";
                            return setPlanActiveAction(p.id, !p.isActive);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="flex max-w-2xl flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <h2 className="text-lg font-bold tracking-tight">New plan</h2>
        <PlanForm action={createPlanAction} submitLabel="Create plan" />
      </section>
    </div>
  );
}
