"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight, Award, BookOpen, Briefcase, Coins, FileBadge, Gift, GraduationCap, Handshake,
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

export type NavGroup = { label: string; items: NavItem[] };

function NavList({ groups, onNavigate }: { groups: NavGroup[]; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/40">
            {group.label}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = ICONS[item.icon] ?? LayoutDashboard;
              const active = pathname === item.href;

              if (!item.ready) {
                return (
                  <li key={item.href}>
                    <div
                      aria-disabled="true"
                      className="flex min-h-11 cursor-not-allowed items-center gap-3 rounded-[12px] px-3 text-[14px] text-white/35"
                    >
                      <Icon className="size-[18px] shrink-0" strokeWidth={1.7} aria-hidden="true" />
                      <span className="flex-1 truncate">{item.label}</span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60">
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
                      "relative flex min-h-11 items-center gap-3 rounded-[12px] px-3 text-[14px] font-medium transition-colors duration-150",
                      active
                        ? "bg-white/[0.1] font-semibold text-white"
                        : "text-white/70 hover:bg-white/[0.06] hover:text-white",
                    )}
                  >
                    {/* The active marker is a bar as well as a tint, so the
                        current page is not signalled by colour alone. */}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-2.5 left-0 w-[3px] rounded-full bg-[var(--brand-green-bright)]"
                      />
                    )}
                    <Icon
                      className={cn("size-[18px] shrink-0", active && "text-[var(--brand-green-bright)]")}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** The member's plan at the foot of the sidebar, with the way to upgrade. */
function PlanCard({ planName, onNavigate }: { planName: string | null; onNavigate?: () => void }) {
  return (
    <div className="rounded-[18px] bg-[linear-gradient(145deg,#12a150,#0b4a34)] p-4 text-white">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">Your plan</p>
      <p className="mt-1 text-[17px] font-semibold">{planName ?? "No active plan"}</p>
      <Link
        href="/dashboard/plan"
        onClick={onNavigate}
        className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-semibold text-[#0b4a34] transition-colors hover:bg-white/90"
      >
        View plans
        <ArrowUpRight className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
      </Link>
    </div>
  );
}

const PANEL_BG = "linear-gradient(180deg,#101a47 0%,#0d1640 100%)";

export function DashboardNav({ groups, planName }: { groups: NavGroup[]; planName: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: a persistent sidebar, per the adaptive-navigation rule for
          viewports ≥1024px. */}
      <nav aria-label="Dashboard" className="hidden w-64 shrink-0 lg:block">
        <div
          className="sticky top-24 flex max-h-[calc(100dvh-7rem)] flex-col gap-4 overflow-y-auto rounded-[24px] p-3 shadow-[0_24px_48px_-30px_rgb(16_26_71/0.7)] [scrollbar-width:thin]"
          style={{ background: PANEL_BG }}
        >
          <div className="pt-2">
            <NavList groups={groups} />
          </div>
          <PlanCard planName={planName} />
        </div>
      </nav>

      {/* Mobile: a trigger plus a slide-over. Seventeen items is far too many
          for a bottom bar, which caps at five. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[var(--brand-ink)] text-white shadow-[0_18px_36px_-12px_rgb(16_26_71/0.7)] ring-2 ring-white lg:hidden"
        aria-label="Open dashboard menu"
      >
        <Menu className="size-5" strokeWidth={1.8} aria-hidden="true" />
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
            style={{ background: PANEL_BG }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-sm font-semibold text-white">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
              >
                <X className="size-5" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-3">
              <NavList groups={groups} onNavigate={() => setOpen(false)} />
              <PlanCard planName={planName} onNavigate={() => setOpen(false)} />
            </div>

            <div className="border-t border-white/10 p-2">
              <SignOutButton variant="panel" onSignOut={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
