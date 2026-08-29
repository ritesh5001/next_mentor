import type { Metadata } from "next";

import { requireAdmin } from "@/backend/lib/permissions";
import { listCouponsForAdmin } from "@/backend/services/coupons";
import {
  createCouponAction,
  setCouponActiveAction,
  deleteCouponAction,
} from "@/backend/actions/admin";
import { CouponForm } from "@/frontend/components/admin/coupon-form";
import { ActionButton } from "@/frontend/components/admin/row-actions";
import { Badge } from "@/frontend/components/ui/badge";
import { formatPrice } from "@/frontend/lib/format";

export const metadata: Metadata = {
  title: "Coupons",
  robots: { index: false, follow: false },
};

export default async function AdminCouponsPage() {
  await requireAdmin();
  const coupons = await listCouponsForAdmin();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Coupons</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Discount codes that apply at checkout on any course or plan.
        </p>
      </header>

      <section className="flex max-w-2xl flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <h2 className="text-lg font-bold tracking-tight">New coupon</h2>
        <CouponForm action={createCouponAction} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold tracking-tight">All coupons</h2>

        {coupons.length === 0 ? (
          <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
            No coupons yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
                  <th scope="col" className="px-4 py-3 font-semibold">Code</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Discount</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Used</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Expires</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {coupons.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-[var(--color-muted)]">
                    <td className="px-4 py-3">
                      <span className="font-mono font-bold tracking-wide">{c.code}</span>
                      {c.description && (
                        <div className="text-xs text-[var(--color-muted-foreground)]">
                          {c.description}
                        </div>
                      )}
                    </td>
                    <td className="tabular px-4 py-3 font-semibold text-[var(--color-accent)]">
                      {c.discountType === "percent"
                        ? `${c.value / 100}%`
                        : formatPrice(c.value)}
                    </td>
                    <td className="tabular px-4 py-3 text-right">
                      {c.usedCount}
                      {c.maxRedemptions !== null && ` / ${c.maxRedemptions}`}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-muted-foreground)]">
                      {c.validUntil
                        ? c.validUntil.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "No expiry"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={c.isActive ? "success" : "neutral"}>
                        {c.isActive ? "Active" : "Disabled"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-start justify-end gap-2">
                        <ActionButton
                          label={c.isActive ? "Disable" : "Enable"}
                          run={async () => {
                            "use server";
                            return setCouponActiveAction(c.id, !c.isActive);
                          }}
                        />
                        <ActionButton
                          label="Delete"
                          variant="danger"
                          confirm={`Delete ${c.code}? This cannot be undone.`}
                          run={async () => {
                            "use server";
                            return deleteCouponAction(c.id);
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
    </div>
  );
}
