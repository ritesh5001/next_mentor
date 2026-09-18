"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, Plus } from "lucide-react";

import { SectionHead } from "./home-sections";
import { cn } from "@/lib/cn";
import { SITE_CONTACT } from "@/lib/site";

/**
 * Every answer here is checked against how the product actually behaves —
 * membership is paid and unlocks on a confirmed payment, commission matures
 * after 7 days, payouts need approved KYC. An FAQ is where buyers look for
 * the catch, so it cannot promise courses or terms that do not exist.
 */
const ITEMS = [
  {
    q: "What is NextMentor?",
    a: "An online learning platform for practical digital skills. You join with a plan, learn from screen-recorded lessons you can follow in your own account, and earn a verifiable certificate when you finish. Every member also gets a referral link that pays commission.",
  },
  {
    q: "Do I need a plan to join?",
    a: "Yes — membership is paid. Create your account, verify your email with the code we send, then choose a plan. Your dashboard, courses and referral link unlock as soon as the payment is confirmed.",
  },
  {
    q: "What can I learn right now?",
    a: "The current courses focus on digital marketing: running Meta ads and generating leads through WhatsApp. Each skill pack lists exactly which courses it includes.",
  },
  {
    q: "Are the courses suitable for beginners?",
    a: "Yes. Each course shows its level and walks through the real setup step by step, and every course page has a free preview lesson you can watch first.",
  },
  {
    q: "How do I pay?",
    a: "Securely through Razorpay, with UPI, debit and credit cards, or netbanking. Your plan usually activates within seconds of the payment going through.",
  },
  {
    q: "How long do I keep access?",
    a: "Each plan runs for the period shown on it. Watch on any device, whenever suits you — the player remembers where you stopped.",
  },
  {
    q: "How does the referral programme pay?",
    a: "Share your link. When someone joins through it, you earn commission at your plan's rate on what they actually paid. Commission clears after 7 days, and you can withdraw to your bank once your KYC is approved.",
  },
];

/**
 * Questions on the left as a sticky column with a way to reach a person;
 * answers on the right as rounded cards. Panels animate their height with the
 * grid-rows technique, which the global reduced-motion rule flattens.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[var(--brand-hero-wash)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow="Questions"
            title="Things people ask before joining."
            lede="Straight answers about plans, payment, access and the referral programme."
          />

          <div className="reveal mt-9 overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,#0e5a40,#0b4a34_55%,#101a47)] p-6 text-white sm:p-7">
            <p className="text-[18px] font-semibold">Still have a question?</p>
            <p className="mt-1.5 text-[14.5px] leading-[1.55] text-white/75">
              Talk to the team on WhatsApp or email.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={SITE_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-3 rounded-[14px] bg-white/10 px-4 text-[14.5px] font-medium ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                <MessageCircle className="size-[18px] text-[var(--brand-green-bright)]" strokeWidth={2} aria-hidden="true" />
                WhatsApp {SITE_CONTACT.phone}
              </a>
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="flex min-h-12 items-center gap-3 rounded-[14px] bg-white/10 px-4 text-[14.5px] font-medium ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                <Mail className="size-[18px] text-[var(--brand-green-bright)]" strokeWidth={2} aria-hidden="true" />
                {SITE_CONTACT.email}
              </a>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-block text-[14px] font-semibold text-white underline-offset-4 hover:underline"
            >
              Or use the contact form →
            </Link>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className={cn(
                  "rounded-[18px] bg-white ring-1 transition-shadow duration-200",
                  isOpen
                    ? "shadow-[0_18px_36px_-26px_rgb(16_26_71/0.45)] ring-[var(--brand-blue)]/25"
                    : "ring-[rgb(16_26_71/0.07)]",
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-5 px-5 py-4 text-left text-[15.5px] font-semibold leading-snug text-[var(--brand-ink)] sm:px-6 sm:py-5 sm:text-[17px]"
                  >
                    {item.q}
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                        isOpen
                          ? "bg-[var(--brand-blue)] text-white"
                          : "bg-[var(--brand-hero-wash)] text-[var(--brand-blue)]",
                      )}
                    >
                      <Plus
                        className={cn("size-4 transition-transform duration-300 ease-out", isOpen && "rotate-45")}
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="px-5 pb-5 pr-14 text-[15px] leading-[1.65] text-[var(--color-muted-foreground)] sm:px-6 sm:pb-6">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
