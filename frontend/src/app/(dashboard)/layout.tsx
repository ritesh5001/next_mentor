import Link from "next/link";
import { IndianRupee } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { DashboardNav, MobileMenu, type NavGroup } from "@/components/dashboard/dashboard-nav";
import { Avatar } from "@/components/dashboard/panels";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { getProfile, requireUser } from "@/lib/queries";

/**
 * Sidebar sections. Grouped by what the member is doing — learning, earning,
 * or managing the account — because a flat list of seventeen links gives no
 * hint where anything is. Items not yet built render disabled with a "Soon"
 * chip rather than as dead links.
 */
const NAV: NavGroup[] = [
  {
    label: "Learn",
    items: [
      { href: "/dashboard", label: "My Courses", icon: "BookOpen", ready: true },
      { href: "/dashboard/certificates", label: "Certificates", icon: "FileBadge", ready: true },
      { href: "/dashboard/achievements", label: "Achievements", icon: "Award", ready: true },
      { href: "/dashboard/mentorship", label: "Premium Mentorship", icon: "Handshake", ready: true },
      { href: "/dashboard/community", label: "Community Hub", icon: "Users", ready: true },
    ],
  },
  {
    label: "Earn",
    items: [
      { href: "/dashboard/create-account", label: "Create Account", icon: "UserPlus", ready: true },
      { href: "/dashboard/overview", label: "Earnings Overview", icon: "LayoutDashboard", ready: true },
      { href: "/dashboard/earnings", label: "Associates & Earnings", icon: "Coins", ready: true },
      { href: "/dashboard/affiliate", label: "Affiliate Link", icon: "Gift", ready: true },
      { href: "/dashboard/leads", label: "Leads Dashboard", icon: "TrendingUp", ready: true },
      { href: "/dashboard/top-performers", label: "Top Performers", icon: "Trophy", ready: true },
      { href: "/dashboard/training", label: "Affiliate Training", icon: "GraduationCap", ready: true },
      { href: "/dashboard/promo", label: "Promotional Material", icon: "Megaphone", ready: true },
      { href: "/dashboard/coupons", label: "Exclusive Coupons", icon: "Ticket", ready: true },
      { href: "/dashboard/industrial", label: "Industrial Earn", icon: "Briefcase", ready: false },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/profile", label: "Profile", icon: "UserCircle", ready: true },
      { href: "/dashboard/kyc", label: "KYC", icon: "ShieldCheck", ready: true },
      { href: "/dashboard/plan", label: "Upgrade Package", icon: "Sparkles", ready: true },
    ],
  },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  // The session token carries no name or photo; the profile does.
  const profile = await getProfile();
  // Always a name to greet by: the part before the @ when none is on file.
  const displayName = profile.name?.trim() || profile.email.split("@")[0];
  const subscription = profile.subscription;

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--brand-hero-wash)]">
      <header className="sticky top-0 z-40 border-b border-[rgb(16_26_71/0.07)] bg-white/85 surface-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
          {/* The real mark, matching the admin panel and the public site. */}
          <Link href="/dashboard" aria-label="Dashboard">
            <Logo className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/courses"
              className="hidden min-h-11 items-center rounded-full px-4 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--brand-hero-wash)] hover:text-[var(--brand-ink)] sm:flex"
            >
              Browse courses
            </Link>

            {/* Hidden on phones: logo, identity and sign-out together overflow
                a 375px viewport, and identity is the one to spare. */}
            <Link
              href="/dashboard/profile"
              className="hidden min-h-11 items-center gap-2.5 rounded-full py-1 pl-1 pr-4 ring-1 ring-[rgb(16_26_71/0.1)] transition-colors hover:bg-[var(--brand-hero-wash)] sm:flex"
            >
              <Avatar name={displayName} size={34} src={profile.avatarUrl} />
              <span className="flex flex-col leading-tight">
                <span className="max-w-[10rem] truncate text-[13.5px] font-semibold text-[var(--brand-ink)]">
                  {displayName}
                </span>
                {subscription && (
                  <span className="text-[11.5px] font-medium text-[var(--brand-green)]">
                    {subscription.planName} member
                  </span>
                )}
              </span>
            </Link>

            {/* One tap to the live income dashboard, on every screen size. */}
            <Link
              href="/dashboard/overview"
              aria-label="Live income dashboard"
              title="Live income dashboard"
              className="relative flex size-11 items-center justify-center rounded-full bg-[linear-gradient(145deg,#12a150,#0b4a34)] text-white shadow-[0_10px_22px_-10px_rgb(18_161_80/0.8)] transition-transform duration-200 hover:scale-105"
            >
              <IndianRupee className="size-5" strokeWidth={2.2} aria-hidden="true" />
              <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 flex size-3.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--brand-green-bright)] opacity-70" />
                <span className="relative inline-flex size-3.5 rounded-full bg-[var(--brand-green-bright)] ring-2 ring-white" />
              </span>
            </Link>

            {/* Desktop signs out here; on smaller screens it sits in the menu. */}
            <div className="hidden lg:block">
              <SignOutButton />
            </div>

            <MobileMenu groups={NAV} planName={subscription?.planName ?? null} />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 gap-6 px-4 py-6 sm:px-6 lg:gap-8 lg:py-8">
        <DashboardNav groups={NAV} planName={subscription?.planName ?? null} />
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
