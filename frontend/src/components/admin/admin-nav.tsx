"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  BadgeIndianRupee,
  FolderOpen,
  LayoutDashboard,
  Menu,
  Receipt,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Admin navigation, grouped by the job being done.
 *
 * A flat list of nine links makes an operator scan the whole thing to find the
 * payout queue. Grouping separates the two rhythms of the role: content you
 * publish occasionally, and money and people you check daily.
 *
 * Deliberately contains nothing from the student dashboard. An administrator
 * has no KYC to submit, no commission to earn and no certificates to collect —
 * showing those was mixing two different products in one sidebar.
 */
type NavItem = { href: string; label: string; icon: LucideIcon; exact?: boolean };

const GROUPS: Array<{ heading: string; items: NavItem[] }> = [
  {
    heading: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }],
  },
  {
    heading: "Catalog",
    items: [
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/plans", label: "Plans", icon: Sparkles },
      { href: "/admin/coupons", label: "Coupons", icon: Ticket },
      { href: "/admin/content", label: "Training & Promo", icon: FolderOpen },
    ],
  },
  {
    heading: "Money",
    items: [
      { href: "/admin/orders", label: "Orders", icon: Receipt },
      { href: "/admin/payouts", label: "Payouts", icon: Wallet },
    ],
  },
  {
    heading: "People",
    items: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/kyc", label: "KYC review", icon: ShieldCheck },
    ],
  },
];

function isActive(pathname: string, item: NavItem) {
  // "/admin" would otherwise match every admin page.
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="flex flex-col gap-5">
      {GROUPS.map((group) => (
        <div key={group.heading} className="flex flex-col gap-1">
          <h2 className="px-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted-foreground)]">
            {group.heading}
          </h2>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = isActive(pathname, item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-sm font-medium transition-colors duration-150",
                      active
                        ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                        : "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
                    )}
                  >
                    <item.icon className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function AdminNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-24 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-3">
          <NavList />
        </div>
      </aside>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        className="fixed bottom-4 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[var(--shadow-overlay)] lg:hidden"
      >
        <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[var(--color-overlay)] surface-blur"
          />
          <div className="absolute inset-y-0 right-0 flex w-[85vw] max-w-xs flex-col bg-[var(--color-card)] shadow-[var(--shadow-overlay)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <span className="text-sm font-bold">Admin</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-[var(--radius-control)] hover:bg-[var(--color-muted)]"
              >
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { BadgeIndianRupee };
