"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/frontend/components/brand/logo";
import { cn } from "@/frontend/lib/cn";

const PACKAGES = ["Mini", "Basic", "Standard", "Prime", "Infinity", "Legacy"];

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Course Package", packages: true },
  { href: "/contact", label: "Contact" },
  { href: "/courses", label: "Courses" },
  { href: "/jobs", label: "Job" },
];

export function MarketingNav({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 surface-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link href="/" className="shrink-0" aria-label="NextMentor home">
          <Logo className="h-9 w-auto" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href} className="relative">
              {l.packages ? (
                <div
                  onMouseEnter={() => setPkgOpen(true)}
                  onMouseLeave={() => setPkgOpen(false)}
                >
                  <Link
                    href={l.href}
                    aria-expanded={pkgOpen}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium text-[var(--color-foreground)] transition-colors hover:text-[var(--brand-blue)]"
                  >
                    {l.label}
                    <ChevronDown className="size-3.5" strokeWidth={2} aria-hidden="true" />
                  </Link>

                  {pkgOpen && (
                    <ul className="absolute left-0 top-full w-48 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] py-1 shadow-[var(--shadow-overlay)]">
                      {PACKAGES.map((p) => (
                        <li key={p}>
                          <Link
                            href={`/pricing#${p.toLowerCase()}`}
                            className="block px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--brand-blue)]"
                          >
                            {p}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-[15px] font-medium text-[var(--color-foreground)] transition-colors hover:text-[var(--brand-blue)]"
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={isSignedIn ? "/dashboard" : "/login"}
            className="pill hidden border-2 border-[var(--color-border)] px-5 py-2 text-[15px] font-medium transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] sm:inline-flex"
          >
            {isSignedIn ? "Dashboard" : "Login | Register"}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center rounded-lg lg:hidden"
          >
            {open ? (
              <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-card)] lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center border-b border-[var(--color-border)] text-[15px] font-medium",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={isSignedIn ? "/dashboard" : "/login"}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center text-[15px] font-semibold text-[var(--brand-blue)]"
              >
                {isSignedIn ? "Dashboard" : "Login | Register"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
