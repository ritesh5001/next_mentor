import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PlanForm } from "@/components/admin/plan-form";
import { Badge } from "@/components/ui/badge";
import { updatePlanAction } from "@/actions/admin";
import { listPlansForAdmin, requireAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Edit plan",
  robots: { index: false, follow: false },
};

/**
 * Edit one plan.
 *
 * The pieces for this already existed: PlanForm emits a hidden `planId`, and
 * updatePlanAction PATCHes it. Only the route was missing, so a plan could be
 * created and hidden but never corrected. A typo in a price meant deleting the
 * tier and rebuilding it.
 */
export default async function EditPlanPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  await requireAdmin();
  const { planId } = await params;

  // There are a handful of plans, so the list this page was linked from is
  // already the cheapest way to get one. No extra endpoint earns its keep.
  const plan = (await listPlansForAdmin()).find((p) => p.id === planId);
  if (!plan) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Link
          href="/admin/plans"
          className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
          All plans
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight">{plan.name}</h1>
          <Badge tone={plan.isActive ? "success" : "neutral"}>
            {plan.isActive ? "Live" : "Hidden"}
          </Badge>
          {plan.isFeatured && <Badge tone="primary">Featured</Badge>}
        </div>

        <p className="text-sm text-[var(--color-muted-foreground)]">
          {plan.memberCount === 0
            ? "Nobody is on this plan yet."
            : `${plan.memberCount} active member${plan.memberCount === 1 ? "" : "s"}. Changing the commission rate applies to commission earned from now on, not to what has already been recorded.`}
        </p>
      </div>

      <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <PlanForm
          action={updatePlanAction}
          submitLabel="Save changes"
          values={{
            id: plan.id,
            name: plan.name,
            tagline: plan.tagline,
            priceInPaise: plan.priceInPaise,
            mrpInPaise: plan.mrpInPaise,
            durationDays: plan.durationDays,
            commissionRateBps: plan.commissionRateBps,
            features: plan.features,
            grantsAllCourses: plan.grantsAllCourses,
            isFeatured: plan.isFeatured,
            position: plan.position,
          }}
        />
      </section>
    </div>
  );
}
