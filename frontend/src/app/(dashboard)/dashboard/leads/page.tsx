import type { Metadata } from "next";

import { LeadsBoard } from "@/components/dashboard/leads-board";
import { PageHeader, StatRow, StatTile } from "@/components/dashboard/panels";
import { CheckCircle2, Clock, PhoneCall, ShoppingCart, UserPlus, Users } from "lucide-react";
import { requireUser, getLeadsPage } from "@/lib/queries";
import { createLeadAction, deleteLeadAction, updateLeadStatusAction } from "@/actions";


export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default async function LeadsPage() {
  const user = await requireUser();
  const { leads, stats } = await getLeadsPage();

  const conversionRate =
    stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Leads dashboard"
        subtitle={`People you are working on. ${stats.total} total, ${conversionRate}% converted.`}
      />

      {/* A tile per pipeline stage, as on the reference: the counts are the
          first thing worth seeing, and the table below is the detail. */}
      <StatRow>
        <StatTile
          label="Total leads" value={stats.total} tone="primary"
          icon={<Users className="size-7" strokeWidth={1.4} aria-hidden="true" />}
        />
        <StatTile
          label="New" value={stats.new} tone="info"
          icon={<UserPlus className="size-7" strokeWidth={1.4} aria-hidden="true" />}
        />
        <StatTile
          label="Contacted" value={stats.contacted} tone="neutral"
          icon={<PhoneCall className="size-7" strokeWidth={1.4} aria-hidden="true" />}
        />
        <StatTile
          label="Qualified" value={stats.qualified} tone="warning"
          icon={<Clock className="size-7" strokeWidth={1.4} aria-hidden="true" />}
        />
        <StatTile
          label="Converted" value={stats.converted} tone="success"
          icon={<CheckCircle2 className="size-7" strokeWidth={1.4} aria-hidden="true" />}
        />
        <StatTile
          label="Lost" value={stats.lost} tone="danger"
          icon={<ShoppingCart className="size-7" strokeWidth={1.4} aria-hidden="true" />}
        />
      </StatRow>

      <LeadsBoard
        leads={leads}
        createLead={createLeadAction}
        updateStatus={updateLeadStatusAction}
        deleteLead={deleteLeadAction}
      />
    </div>
  );
}
