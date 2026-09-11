"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/logo";

const PACKAGES = ["Mini", "Basic", "Standard", "Prime", "Infinity", "Legacy"];

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Course Package", packages: true },
  { href: "/contact", label: "Contact" },
  { href: "/courses", label: "Courses" },
];

/**
 * Marketing header.
 *
 * Two layouts from one markup. Below lg the logo is absolutely centred and the
 * menu button sits right, which is the phone convention; from lg up the logo
 * returns to the flow on the left and the links sit beside it. Doing it with
 * position rather than two separate trees keeps one set of links to maintain.
 */
export function MarketingNav({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 surface-blur">
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6"
      >
        <Link
          href="/"
          aria-label="NextMentor home"
          className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-9 w-auto" />
        </Link>

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
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--brand-blue)]"
                  >
                    {l.label}
                    <ChevronDown className="size-3.5" strokeWidth={2} aria-hidden="true" />
                  </Link>

                  {pkgOpen && (
                    <ul className="absolute left-0 top-full w-48 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] py-1 shadow-[var(--shadow-overlay)]">
                      {PACKAGES.map((p) => (
                        <li key={p}>
                          <Link
                            href={`/pricing#${p.toLowerCase()}`}
                            className="block px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--brand-blue)]"
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
                  className="px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--brand-blue)]"
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={isSignedIn ? "/dashboard" : "/login"}
            className="hidden min-h-10 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-medium transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] sm:inline-flex"
          >
            {isSignedIn ? "Dashboard" : "Login"}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex size-11 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-foreground)] lg:hidden"
          >
            {open ? (
              <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-card)] lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-[var(--color-border)] text-[15px] font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={isSignedIn ? "/dashboard" : "/login"}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center text-[15px] font-medium text-[var(--brand-blue)]"
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
