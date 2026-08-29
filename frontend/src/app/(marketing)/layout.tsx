import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/frontend/components/marketing/social-icons";

import { auth } from "@/backend/lib/auth";
import { Logo } from "@/frontend/components/brand/logo";
import { MarketingNav } from "@/frontend/components/marketing/marketing-nav";

const USEFUL_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Plans" },
  { href: "/register", label: "Register As a Partner" },
  { href: "/contact", label: "Contact Us" },
];

const IMP_LINKS = [
  { href: "/login", label: "Login | Register" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund", label: "Cancel & Refund Policy" },
];

const SOCIALS = [
  { href: "https://facebook.com", label: "Facebook", Icon: FacebookIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://youtube.com", label: "YouTube", Icon: YoutubeIcon },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedinIcon },
];

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)]">
      <MarketingNav isSignedIn={Boolean(session?.user)} />

      <main id="main" className="flex-1">
        {children}
      </main>

      {/* -------------------------------------------------------------- footer */}
      <footer className="bg-[#0B1437] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="flex flex-col gap-4">
            <Logo className="h-10 w-auto" inverted />
            <p className="w-full max-w-xs text-sm leading-relaxed text-white/70">
              Live as if you were to die tomorrow. Learn as if you were to live forever.
            </p>

            <ul className="flex gap-2 pt-1">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="pill mt-2 inline-flex w-fit items-center gap-2 bg-white/10 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/20"
            >
              Contact With Us
            </Link>
          </div>

          <nav aria-labelledby="footer-useful" className="flex flex-col gap-3">
            <h2 id="footer-useful" className="text-sm font-bold uppercase tracking-wide">
              Useful Links
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-white/70">
              {USEFUL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-imp" className="flex flex-col gap-3">
            <h2 id="footer-imp" className="text-sm font-bold uppercase tracking-wide">
              Imp Links
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-white/70">
              {IMP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wide">Get Contact</h2>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <a href="tel:+911234567890" className="hover:text-white">
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <a href="mailto:hello@nextmentor.in" className="hover:text-white">
                  hello@nextmentor.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>© {new Date().getFullYear()} NextMentor. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms &amp; Conditions
              </Link>
              <Link href="/refund" className="hover:text-white">
                Cancel &amp; Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
