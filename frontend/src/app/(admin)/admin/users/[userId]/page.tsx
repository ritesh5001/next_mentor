import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { GrantAccess } from "@/components/admin/grant-access";
import { ActionButton } from "@/components/admin/row-actions";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import {
  grantAccessAction,
  revokeAccessAction,
  setUserDashboardEarningsAction,
  setUserPasswordAction,
  updateUserDetailsAction,
} from "@/actions/admin";
import {
  getUserAccessForAdmin,
  listCoursesForAdmin,
  listPlansForAdmin,
  getUserProfileForAdmin,
  requireAdmin,
} from "@/lib/queries";
import { MemberDetailsForm, SetPasswordForm } from "@/components/admin/member-details-form";

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

  // Looked up directly: finding them in the users list only worked for the
  // first 50 accounts, so later members' pages came back "not found".
  const [user, access, courses, plans] = await Promise.all([
    getUserProfileForAdmin(userId),
    getUserAccessForAdmin(userId),
    listCoursesForAdmin(),
    listPlansForAdmin(),
  ]);
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
          <h1 className="text-2xl font-bold tracking-tight">{user.name ?? user.email}</h1>
          {user.role !== "student" && (
            <Badge tone="money" className="capitalize">
              {user.role}
            </Badge>
          )}
          {user.isBlocked && <Badge tone="danger">Blocked</Badge>}
        </div>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {user.email} · Member ID <span className="font-mono">{user.memberId}</span>
        </p>
      </div>

      {/* What they gave at signup, and who brought them in. */}
      <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="text-lg font-bold tracking-tight">Member details</h2>
          {!user.emailVerified && <Badge tone="warning">Not activated — payment not completed</Badge>}
        </div>
        <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          {[
            ["Full name", user.name],
            ["Email", user.email],
            ["Contact number", user.phone],
            ["State", user.state],
            ["Member ID", user.memberId],
            ["Plan", user.planName],
            [
              "Sponsored by",
              user.sponsorName || user.sponsorEmail
                ? `${user.sponsorName ?? user.sponsorEmail} (${user.sponsorMemberId})`
                : null,
            ],
            ["Joined", formatDate(user.createdAt, { day: "numeric", month: "short", year: "numeric" })],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted-foreground)]">
                {label}
              </dt>
              <dd className="font-medium">{value || <span className="font-normal text-[var(--color-muted-foreground)]">Not given</span>}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold tracking-tight">Edit details</h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Fix a typo in their name, email, number or state.
          </p>
        </div>
        <MemberDetailsForm
          action={updateUserDetailsAction.bind(null, userId)}
          values={{ name: user.name, email: user.email, phone: user.phone, state: user.state }}
        />
      </section>

      <section className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold tracking-tight">Dashboard earnings</h2>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Double this member&apos;s earnings figures on the dashboard homepage only. Stored earnings and payouts are unchanged.
            </p>
          </div>
          <ActionButton
            label={user.doubleEarningsOnDashboard ? "Turn off doubling" : "Double earnings"}
            variant={user.doubleEarningsOnDashboard ? "secondary" : "primary"}
            run={async () => {
              "use server";
              return setUserDashboardEarningsAction(userId, !user.doubleEarningsOnDashboard);
            }}
          />
        </div>
        {user.doubleEarningsOnDashboard && <Badge tone="money">Active on dashboard</Badge>}
      </section>

      <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold tracking-tight">Password</h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Passwords are stored encrypted one-way, so no one — including admins — can see a
            member&apos;s current password. Set a new one here if they forgot it or mistyped it.
          </p>
        </div>
        <SetPasswordForm action={setUserPasswordAction.bind(null, userId)} />
      </section>

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
