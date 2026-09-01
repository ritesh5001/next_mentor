import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";

/**
 * Terms, Privacy and Refund pages.
 *
 * These are stubs on purpose. Razorpay will not approve a merchant account
 * without all three being reachable, so the routes must exist and must not
 * 404 — but the wording is a legal question, not an engineering one. Each
 * page carries a visible notice so nobody mistakes placeholder text for a
 * reviewed policy.
 */
const PAGES = {
  terms: {
    title: "Terms & Conditions",
    intro:
      "The terms that govern your use of NextMentor, including course access, membership plans and the affiliate programme.",
    sections: [
      "Who may use NextMentor and what an account entitles you to",
      "How course and membership purchases work, and what access you receive",
      "Affiliate programme rules: how commission is earned, when it clears, and what voids it",
      "Acceptable use, content ownership and account termination",
      "Limitation of liability and governing law",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "What personal data NextMentor collects, why, how long it is kept, and the choices you have.",
    sections: [
      "What we collect: account details, payment records, KYC documents, watch history",
      "Why we collect it, and the legal basis for each purpose",
      "Who it is shared with: Razorpay for payments, Cloudflare and ImageKit for media, Resend for email",
      "How long each category is retained, and how KYC documents are secured",
      "Your rights: access, correction, deletion, and how to exercise them",
    ],
  },
  refund: {
    title: "Cancellation & Refund Policy",
    intro:
      "When a purchase can be cancelled or refunded, how to request one, and how long it takes.",
    sections: [
      "The refund window for course and membership purchases",
      "What happens to course access when a refund is issued",
      "How a refund affects affiliate commission already earned on that sale",
      "How to request a refund and the expected turnaround",
    ],
  },
} as const;

type Slug = keyof typeof PAGES;

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug as Slug];
  if (!page) return { title: "Not found" };
  return { title: page.title, description: page.intro, alternates: { canonical: `/${slug}` } };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGES[slug as Slug];
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--brand-ink)] sm:text-4xl">
        {page.title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-[var(--color-muted-foreground)]">
        {page.intro}
      </p>

      <div
        role="note"
        className="mt-8 flex gap-3 rounded-[var(--radius-card)] border border-[var(--color-warning)] bg-[var(--color-warning-subtle)] p-4"
      >
        <AlertTriangle
          className="mt-0.5 size-5 shrink-0 text-[var(--color-warning)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-bold text-[var(--color-warning)]">
            This policy has not been written yet
          </span>
          <span className="leading-relaxed text-[var(--color-foreground)]/80">
            The outline below shows what this page needs to cover. Have a
            professional draft the real wording before taking payments — Razorpay
            requires these three pages for merchant approval, and an affiliate
            programme makes the terms worth getting right.
          </span>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-bold tracking-tight">This page should cover</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {page.sections.map((s) => (
          <li
            key={s}
            className="flex gap-3 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]"
          >
            <span aria-hidden="true" className="text-[var(--color-primary)]">
              —
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
