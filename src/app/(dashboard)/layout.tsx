import Link from "next/link";
// Only the icons this file actually renders. The sidebar resolves its own
// icons from the `icon` name on each NavItem.
import { BadgeCheck, GraduationCap } from "lucide-react";

import { requireUser } from "@/backend/lib/permissions";
import { DashboardNav, type NavItem } from "@/frontend/components/dashboard/dashboard-nav";

/**
 * Sidebar mirrors the feature list from the reference dashboard. Items not yet
 * built are rendered as disabled with a "Soon" chip rather than as dead links —
 * a nav item that silently does nothing is worse than one that says why.
 */
const NAV: NavItem[] = [
  { href: "/dashboard", label: "My Courses", icon: "LayoutDashboard", ready: true },
  { href: "/dashboard/profile", label: "Profile", icon: "UserCircle", ready: true },
  { href: "/dashboard/kyc", label: "KYC", icon: "ShieldCheck", ready: false },
  { href: "/dashboard/earnings", label: "Associates & Earnings", icon: "Coins", ready: false },
  { href: "/dashboard/top-performers", label: "Top Performers", icon: "Trophy", ready: false },
  { href: "/dashboard/affiliate", label: "Affiliate link", icon: "Gift", ready: false },
  { href: "/dashboard/plan", label: "Upgrade Your Plan", icon: "Sparkles", ready: true },
  { href: "/dashboard/training", label: "Affiliate Training", icon: "GraduationCap", ready: false },
  { href: "/dashboard/leads", label: "Leads Dashboard", icon: "TrendingUp", ready: false },
  { href: "/dashboard/mentorship", label: "Premium Mentorship", icon: "Handshake", ready: false },
  { href: "/dashboard/promo", label: "Promotional Material", icon: "Megaphone", ready: false },
  { href: "/dashboard/coupons", label: "Exclusive Coupons", icon: "Ticket", ready: true },
  { href: "/dashboard/community", label: "Community Hub", icon: "Users", ready: false },
  { href: "/dashboard/achievements", label: "My Achievements", icon: "Award", ready: false },
  { href: "/dashboard/certificate", label: "Get Certificate", icon: "FileBadge", ready: false },
  { href: "/dashboard/qualification", label: "Qualification Criteria", icon: "Target", ready: false },
  { href: "/dashboard/industrial", label: "Industrial Earn", icon: "Briefcase", ready: false },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/85 surface-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-extrabold tracking-tight">
            <GraduationCap
              className="size-6 text-[var(--color-primary)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            NextMentor
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="hidden rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] sm:block"
            >
              Browse courses
            </Link>

            {user.role === "admin" && (
              <Link
                href="/admin/courses"
                className="hidden rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] sm:block"
              >
                Admin
              </Link>
            )}

            <div className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-sm font-semibold text-[var(--color-on-primary)]">
              <BadgeCheck className="size-4" strokeWidth={1.5} aria-hidden="true" />
              <span className="max-w-[10rem] truncate">{user.name ?? user.email}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-6 px-4 py-6 sm:px-6">
        <DashboardNav items={NAV} />
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
