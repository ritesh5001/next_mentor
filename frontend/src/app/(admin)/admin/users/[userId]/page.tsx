import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { GrantAccess } from "@/components/admin/grant-access";
import { ActionButton } from "@/components/admin/row-actions";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { grantAccessAction, revokeAccessAction } from "@/actions/admin";
import {
  getUserAccessForAdmin,
  listCoursesForAdmin,
  listPlansForAdmin,
  listUsersForAdmin,
  requireAdmin,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "User",
  robots: { index: false, follow: false },
};

export default async function AdminUserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  await requireAdmin();
  const { userId } = await params;

  const [users, access, courses, plans] = await Promise.all([
    listUsersForAdmin(),
    getUserAccessForAdmin(userId),
    listCoursesForAdmin(),
    listPlansForAdmin(),
  ]);

  const user = users.find((u) => u.id === userId);
  if (!user) notFound();

  const live = access.enrolled.filter((e) => e.revokedAt === null);
  const revoked = access.enrolled.filter((e) => e.revokedAt !== null);

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Link
          href="/admin/users"
          className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
          All users
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight">{user.name ?? user.email}</h1>
          {user.role !== "student" && (
            <Badge tone="money" className="capitalize">
              {user.role}
            </Badge>
          )}
          {user.isBlocked && <Badge tone="danger">Blocked</Badge>}
        </div>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {user.email} · referral code {user.referralCode}
        </p>
      </div>

      <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <h2 className="text-lg font-bold tracking-tight">Grant access</h2>
        <GrantAccess
          userId={userId}
          courses={courses.map((c) => ({ id: c.id, title: c.title }))}
          plans={plans.map((p) => ({ id: p.id, name: p.name }))}
          grant={grantAccessAction}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold tracking-tight">Membership</h2>
        {access.membership ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3">
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-2 font-semibold">
                {access.membership.planName}
                {access.membership.grantedById && <Badge tone="neutral">Granted</Badge>}
              </span>
              <span className="text-xs text-[var(--color-muted-foreground)]">
                {access.membership.expiresAt
                  ? `Expires ${formatDate(access.membership.expiresAt, { day: "numeric", month: "short", year: "numeric" })}`
                  : "Lifetime"}
              </span>
            </div>
            <ActionButton
              label="Revoke"
              run={async () => {
                "use server";
                return revokeAccessAction(userId, "plan");
              }}
            />
          </div>
        ) : (
          <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
            No active membership.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold tracking-tight">Courses</h2>
        {live.length === 0 ? (
          <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
            No course access.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {live.map((e) => (
              <li
                key={e.courseId}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2 font-semibold">
                    {e.title}
                    {/* "Granted" means nobody paid — the enrollment has no
                        order behind it. Worth seeing at a glance. */}
                    {e.isGranted && <Badge tone="neutral">Granted</Badge>}
                  </span>
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    Since {formatDate(e.enrolledAt, { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <ActionButton
                  label="Revoke"
                  run={async () => {
                    "use server";
                    return revokeAccessAction(userId, "course", e.courseId);
                  }}
                />
              </li>
            ))}
          </ul>
        )}

        {revoked.length > 0 && (
          <details className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-[var(--color-muted-foreground)]">
              {revoked.length} revoked {revoked.length === 1 ? "course" : "courses"}
            </summary>
            <ul className="mt-3 flex flex-col gap-2 border-t border-[var(--color-border)] pt-3">
              {revoked.map((e) => (
                <li key={e.courseId} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[var(--color-muted-foreground)] line-through">{e.title}</span>
                  <ActionButton
                    label="Restore"
                    run={async () => {
                      "use server";
                      return grantAccessAction(userId, "course", e.courseId);
                    }}
                  />
                </li>
              ))}
            </ul>
          </details>
        )}
      </section>
    </div>
  );
}
