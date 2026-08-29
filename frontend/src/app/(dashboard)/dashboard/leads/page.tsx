import type { Metadata } from "next";

import { requireUser } from "@/backend/lib/permissions";
import { getLeads, getLeadStats } from "@/backend/services/engagement";
import {
  createLeadAction,
  updateLeadStatusAction,
  deleteLeadAction,
} from "@/backend/actions/engagement";
import { LeadsBoard } from "@/frontend/components/dashboard/leads-board";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default async function LeadsPage() {
  const user = await requireUser();
  const [leads, stats] = await Promise.all([getLeads(user.id), getLeadStats(user.id)]);

  const conversionRate =
    stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Leads</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          People you are working on. {stats.total} total · {conversionRate}% converted.
        </p>
      </header>

      <LeadsBoard
        leads={leads}
        createLead={createLeadAction}
        updateStatus={updateLeadStatusAction}
        deleteLead={deleteLeadAction}
      />
    </div>
  );
}
