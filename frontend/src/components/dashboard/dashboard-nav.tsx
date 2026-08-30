"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Award, Briefcase, Coins, FileBadge, Gift, GraduationCap, Handshake,
  LayoutDashboard, Megaphone, Menu, ShieldCheck, Sparkles, Target, Ticket,
  TrendingUp, Trophy, UserCircle, Users, X, type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard, UserCircle, ShieldCheck, Coins, Trophy, Gift, Sparkles,
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
                className="flex cursor-not-allowed items-center gap-2.5 rounded-[var(--radius-control)] px-3 py-2 text-sm text-[var(--color-muted-foreground)] opacity-60"
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span className="flex-1 truncate">{item.label}</span>
                <span className="rounded-full bg-[var(--color-muted)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
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
                "flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium transition-colors duration-150",
                active
                  ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
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
        <div className="sticky top-24 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-2">
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
            className="absolute inset-y-0 right-0 flex w-[85vw] max-w-xs flex-col bg-[var(--color-card)] shadow-[var(--shadow-overlay)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <span className="text-sm font-bold">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-[var(--radius-control)] hover:bg-[var(--color-muted)]"
              >
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <NavList items={items} onNavigate={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
