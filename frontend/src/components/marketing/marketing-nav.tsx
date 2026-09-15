"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/cn";

/**
 * Only routes that exist. The old "Course Package" menu listed Mini, Basic,
 * Standard, Prime, Infinity and Legacy — none of which is a real plan — so it
 * is gone rather than restyled.
 */
const LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Plans" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Marketing header.
 *
 * Below lg the logo is absolutely centred with the menu button on the right;
 * from lg up the logo returns to the flow on the left. One markup, two layouts.
 */
export function MarketingNav({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // A hairline appears once the page moves under the header, not before: at
  // the very top it would draw a line across the hero for no reason.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b surface-blur transition-colors duration-200",
        scrolled
          ? "border-[var(--color-border)] bg-[var(--color-background)]/95"
          : "border-transparent bg-[var(--brand-hero-wash)]",
      )}
    >
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-[72px] max-w-7xl items-center gap-10 px-5 sm:px-8"
      >
        <Link
          href="/"
          aria-label="NextMentor home"
          className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-[34px] w-auto" />
        </Link>

        <ul className="hidden items-center gap-2 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3 py-2 text-[15px] font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--brand-ink)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="btn-liquid hidden min-h-11 items-center px-5 text-[15px] font-semibold lg:inline-flex"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full px-4 py-2 text-[15px] font-medium text-[var(--brand-ink)] transition-colors hover:text-[var(--brand-blue)] lg:inline-flex"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="btn-liquid hidden min-h-11 items-center px-5 text-[15px] font-semibold lg:inline-flex"
              >
                Get started
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex size-11 items-center justify-center rounded-full text-[var(--brand-ink)] lg:hidden"
          >
            {open ? (
              <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu className="size-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-[var(--color-border)] bg-[var(--color-card)] lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-[var(--color-border)] text-base font-medium text-[var(--brand-ink)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-5 sm:px-8">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="btn-liquid inline-flex min-h-12 items-center justify-center text-base font-semibold"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="btn-liquid inline-flex min-h-12 items-center justify-center text-base font-semibold"
                >
                  Get started
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="btn-liquid btn-liquid--outline inline-flex min-h-12 items-center justify-center text-base font-semibold"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
