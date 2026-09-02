import Link from "next/link";
// Only the icons this file actually renders. The sidebar resolves its own
// icons from the `icon` name on each NavItem.
import { BadgeCheck } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { DashboardNav, type NavItem } from "@/components/dashboard/dashboard-nav";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { requireUser } from "@/lib/queries";

/**
 * Sidebar mirrors the feature list from the reference dashboard. Items not yet
 * built are rendered as disabled with a "Soon" chip rather than as dead links —
 * a nav item that silently does nothing is worse than one that says why.
 */
const NAV: NavItem[] = [
  { href: "/dashboard/overview", label: "Dashboard", icon: "LayoutDashboard", ready: true },
  { href: "/dashboard", label: "My Courses", icon: "BookOpen", ready: true },
  { href: "/dashboard/profile", label: "Profile", icon: "UserCircle", ready: true },
  { href: "/dashboard/kyc", label: "KYC", icon: "ShieldCheck", ready: true },
  { href: "/dashboard/earnings", label: "Associates & Earnings", icon: "Coins", ready: true },
  { href: "/dashboard/top-performers", label: "Top Performers", icon: "Trophy", ready: true },
  { href: "/dashboard/affiliate", label: "Affiliate link", icon: "Gift", ready: true },
  { href: "/dashboard/plan", label: "Upgrade Your Plan", icon: "Sparkles", ready: true },
  { href: "/dashboard/training", label: "Affiliate Training", icon: "GraduationCap", ready: true },
  { href: "/dashboard/leads", label: "Leads Dashboard", icon: "TrendingUp", ready: true },
  { href: "/dashboard/mentorship", label: "Premium Mentorship", icon: "Handshake", ready: true },
  { href: "/dashboard/promo", label: "Promotional Material", icon: "Megaphone", ready: true },
  { href: "/dashboard/coupons", label: "Exclusive Coupons", icon: "Ticket", ready: true },
  { href: "/dashboard/community", label: "Community Hub", icon: "Users", ready: true },
  { href: "/dashboard/achievements", label: "My Achievements", icon: "Award", ready: true },
  { href: "/dashboard/certificates", label: "Get Certificate", icon: "FileBadge", ready: true },
  { href: "/dashboard/plan", label: "Qualification Criteria", icon: "Target", ready: true },
  { href: "/dashboard/industrial", label: "Industrial Earn", icon: "Briefcase", ready: false },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/85 surface-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          {/* The real mark, matching the admin panel and the public site. A
              stand-in icon here was the only place the brand was redrawn. */}
          <Link href="/dashboard" aria-label="Dashboard">
            <Logo className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="hidden rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] sm:block"
            >
              Browse courses
            </Link>

            {/* Hidden on phones. The logo, this pill and the sign-out button
                together overflowed a 375px viewport and made the whole page
                scroll sideways; the identity is the one of the three a visitor
                can do without on a small screen. */}
            <div className="hidden items-center gap-2 rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-sm font-semibold text-[var(--color-on-primary)] sm:flex">
              <BadgeCheck className="size-4" strokeWidth={1.5} aria-hidden="true" />
              <span className="max-w-[10rem] truncate">{user.name ?? user.email}</span>
            </div>

            <SignOutButton />
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
