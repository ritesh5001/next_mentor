import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { FooterGroup } from "@/components/marketing/footer-group";
import { auth } from "@/lib/queries";
import { SITE_CONTACT } from "@/lib/site";

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/pricing", label: "Plans" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#partner-programme", label: "Partner programme" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/login", label: "Log in" },
      { href: "/register", label: "Create an account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms & conditions" },
      { href: "/refund", label: "Refund policy" },
    ],
  },
];

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)]">
      <MarketingNav isSignedIn={Boolean(session)} />

      <main id="main" className="flex-1">
        {children}
      </main>

      {/* -------------------------------------------------------------- footer */}
      {/* No social links until real profile URLs exist: the old icons pointed
          at facebook.com, instagram.com and so on, not at NextMentor. */}
      <footer className="bg-[var(--brand-surface-dark)] text-white">
        <div className="mx-auto grid max-w-7xl gap-x-12 px-5 pt-14 sm:grid-cols-2 sm:gap-y-12 sm:px-8 sm:pt-16 md:grid-cols-[1fr_1fr_1fr_1.4fr] xl:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr]">
          <div className="flex flex-col items-start pb-8 sm:col-span-2 sm:pb-0 md:col-span-4 xl:col-span-1">
            <Link href="/" aria-label="NextMentor home">
              <Logo className="h-9 w-auto" inverted />
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-[1.6] text-white/60">
              Practical digital skills, taught by someone who does the work.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <FooterGroup key={col.title} title={col.title}>
              <ul className="flex flex-col gap-3 text-[15px] text-white/65">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterGroup>
          ))}

          <FooterGroup title="Support">
            <ul className="flex flex-col gap-3 text-[15px] text-white/65">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-[3px] size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <a href={`mailto:${SITE_CONTACT.email}`} className="whitespace-nowrap hover:text-white">
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-[3px] size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <a href={SITE_CONTACT.phoneHref} className="hover:text-white">
                  {SITE_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-[3px] size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span>India</span>
              </li>
            </ul>
          </FooterGroup>
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-5 sm:mt-14 sm:px-8">
          <div className="flex flex-col gap-2 border-t border-white/10 pb-8 pt-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} NextMentor. All rights reserved.</p>
            <p>
              Developed by{" "}
              <a
                href="https://nextgenfusion.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/70 hover:text-white"
              >
                NextGen Fusion
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
