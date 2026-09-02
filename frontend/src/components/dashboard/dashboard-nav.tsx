"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Award, BookOpen, Briefcase, Coins, FileBadge, Gift, GraduationCap, Handshake,
  LayoutDashboard, Megaphone, Menu, ShieldCheck, Sparkles, Target, Ticket,
  TrendingUp, Trophy, UserCircle, Users, X, type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard, BookOpen, UserCircle, ShieldCheck, Coins, Trophy, Gift, Sparkles,
  GraduationCap, TrendingUp, Handshake, Megaphone, Ticket, Users, Award,
  FileBadge, Target, Briefcase,
};

export type NavItem = {
  href: string;
  label: string;
  icon: string;
  /** false renders a disabled row with a "Soon" chip instead of a dead link. */
  ready: boolean;
};

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item) => {
        const Icon = ICONS[item.icon] ?? LayoutDashboard;
        const active = pathname === item.href;

        if (!item.ready) {
          return (
            <li key={item.href}>
              <div
                aria-disabled="true"
                className="flex min-h-11 cursor-not-allowed items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-sm text-white/45"
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span className="flex-1 truncate">{item.label}</span>
                <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                  Soon
                </span>
              </div>
            </li>
          );
        }

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-sm font-medium transition-colors duration-150",
                // A white pill for the active row. The reference uses orange
                // here, but amber is this product's money colour and using it
                // for navigation would break that association everywhere else.
                active
                  ? "bg-white font-bold text-[var(--brand-blue)] shadow-[var(--shadow-card)]"
                  : "text-white/85 hover:bg-white/12 hover:text-white",
              )}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function DashboardNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: a persistent sidebar, per the adaptive-navigation rule for
          viewports ≥1024px. */}
      <nav
        aria-label="Dashboard"
        className="hidden w-60 shrink-0 lg:block"
      >
        <div
          className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[var(--radius-card)] p-2.5 shadow-[var(--shadow-raised)]"
          style={{ background: "var(--brand-gradient)" }}
        >
          <NavList items={items} />
        </div>
      </nav>

      {/* Mobile: a trigger plus a slide-over. 17 items is far too many for a
          bottom bar, which caps at 5. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[var(--shadow-overlay)] lg:hidden"
        aria-label="Open dashboard menu"
      >
        <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Scrim strong enough to isolate the panel, and it dismisses on tap. */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[var(--color-overlay)] surface-blur"
          />

          <nav
            aria-label="Dashboard"
            className="absolute inset-y-0 right-0 flex w-[85vw] max-w-xs flex-col shadow-[var(--shadow-overlay)]"
            style={{ background: "var(--brand-gradient)" }}
          >
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
              <span className="text-sm font-bold text-white">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-[var(--radius-control)] text-white hover:bg-white/12"
              >
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <NavList items={items} onNavigate={() => setOpen(false)} />
            </div>

            <div className="border-t border-white/15 p-2">
              <SignOutButton variant="panel" onSignOut={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
