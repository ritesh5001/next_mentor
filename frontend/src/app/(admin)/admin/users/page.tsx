import type { Metadata } from "next";
import { Search } from "lucide-react";

import { ActionButton, ActionSelect } from "@/components/admin/row-actions";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { setUserBlockedAction, setUserRoleAction } from "@/actions/admin";
import { listUsersForAdmin, requireAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Users",
  robots: { index: false, follow: false },
};

const ROLES = [
  { value: "student" as const, label: "Student" },
  { value: "instructor" as const, label: "Instructor" },
  { value: "admin" as const, label: "Admin" },
];

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();
  const { q } = await searchParams;
  const users = await listUsersForAdmin(q);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Users</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {users.length} shown{q ? ` for “${q}”` : ""}
        </p>
      </header>

      {/* A plain GET form — search belongs in the URL so it can be shared,
          bookmarked and survives a back navigation. */}
      <form method="get" className="flex max-w-md gap-2">
        <label htmlFor="q" className="sr-only">
          Search users
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <input
            id="q"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Name, email or referral code"
            className="min-h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] py-2 pl-9 pr-3 text-[16px]"
          />
        </div>
        <button
          type="submit"
          className="min-h-11 cursor-pointer rounded-[var(--radius-control)] bg-[var(--color-primary)] px-4 text-sm font-semibold text-[var(--color-on-primary)]"
        >
          Search
        </button>
      </form>

      {users.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
          No users matched that search.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
                <th scope="col" className="px-4 py-3 font-semibold">User</th>
                <th scope="col" className="px-4 py-3 font-semibold">Plan</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Courses</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Spent</th>
                <th scope="col" className="px-4 py-3 font-semibold">Role</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {users.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-[var(--color-muted)]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{u.name ?? "—"}</span>
                      {u.isBlocked && <Badge tone="danger">Blocked</Badge>}
                      {!u.emailVerified && <Badge tone="warning">Unverified</Badge>}
                    </div>
                    <div className="text-xs text-[var(--color-muted-foreground)]">{u.email}</div>
                    <div className="font-mono text-xs text-[var(--color-muted-foreground)]">
                      {u.referralCode}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {u.planName ? (
                      <Badge tone="primary">{u.planName}</Badge>
                    ) : (
                      <span className="text-xs text-[var(--color-muted-foreground)]">—</span>
                    )}
                  </td>
                  <td className="tabular px-4 py-3 text-right">{u.enrollmentCount}</td>
                  <td className="tabular px-4 py-3 text-right font-semibold text-[var(--color-accent)]">
                    {u.spentInPaise > 0 ? formatPrice(u.spentInPaise) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <ActionSelect
                      value={u.role}
                      options={ROLES}
                      label={`Role for ${u.email}`}
                      run={async (next) => {
                        "use server";
                        return setUserRoleAction(u.id, next);
                      }}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <ActionButton
                        label={u.isBlocked ? "Unblock" : "Block"}
                        variant={u.isBlocked ? "secondary" : "danger"}
                        confirm={
                          u.isBlocked
                            ? undefined
                            : `Block ${u.email}? They will not be able to sign in.`
                        }
                        run={async () => {
                          "use server";
                          return setUserBlockedAction(u.id, !u.isBlocked);
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
    </div>
  );
}
