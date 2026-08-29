import type { Metadata } from "next";

import { requireAdmin } from "@/backend/lib/permissions";
import { listOrdersForAdmin } from "@/backend/services/admin";
import { Badge } from "@/frontend/components/ui/badge";
import { formatPrice } from "@/frontend/lib/format";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

const STATUS_TONE = {
  paid: "success",
  created: "warning",
  failed: "danger",
  refunded: "neutral",
} as const;

export default async function AdminOrdersPage() {
  await requireAdmin();
  const orders = await listOrdersForAdmin();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Orders</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {orders.length} most recent
        </p>
      </header>

      {orders.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
          No orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
                <th scope="col" className="px-4 py-3 font-semibold">Customer</th>
                <th scope="col" className="px-4 py-3 font-semibold">Item</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Discount</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Paid</th>
                <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                <th scope="col" className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {orders.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-[var(--color-muted)]">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{o.userName ?? "—"}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)]">
                      {o.userEmail}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{o.courseTitle ?? o.planName ?? "—"}</div>
                    <Badge tone={o.itemType === "plan" ? "primary" : "neutral"}>
                      {o.itemType}
                    </Badge>
                  </td>
                  <td className="tabular px-4 py-3 text-right">
                    {o.discountInPaise > 0 ? (
                      <span className="font-medium text-[var(--color-accent)]">
                        −{formatPrice(o.discountInPaise)}
                      </span>
                    ) : (
                      <span className="text-[var(--color-muted-foreground)]">—</span>
                    )}
                  </td>
                  <td className="tabular px-4 py-3 text-right font-bold">
                    {formatPrice(o.amountInPaise)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={STATUS_TONE[o.status]} className="capitalize">
                      {o.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--color-muted-foreground)]">
                    {(o.paidAt ?? o.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
