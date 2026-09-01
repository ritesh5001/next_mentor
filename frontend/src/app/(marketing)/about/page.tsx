import type { Metadata } from "next";
import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "NextMentor teaches practical digital skills through project-led courses, and pays people who bring others with them.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--brand-ink)] sm:text-4xl">
        About <span className="brand-gradient-text">NextMentor</span>
      </h1>

      <div className="mt-6 flex flex-col gap-5 text-[16px] leading-relaxed text-[var(--color-foreground)]/85">
        <p>
          Most online courses teach theory and leave you exactly where you
          started. NextMentor exists to fix that. Every track here ends in
          something you have built and can show — a running ad campaign, a
          deployed site, an edited reel — not a certificate for having watched.
        </p>
        <p>
          Every instructor still does the work they teach. When a platform
          changes its rules or a tool ships a new version, the module gets
          rebuilt. What you learn on a Sunday should still work on Monday.
        </p>
        <p>
          The other half is the partner programme. If you learn something here
          and bring someone else with you, you earn a real share of what they
          pay — tracked transparently, cleared after the refund window, and paid
          to your bank account once your KYC is verified.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/courses" className={buttonClasses({ size: "lg" })}>
          Browse courses
        </Link>
        <Link href="/contact" className={buttonClasses({ variant: "secondary", size: "lg" })}>
          Talk to us
        </Link>
      </div>
    </div>
  );
}
