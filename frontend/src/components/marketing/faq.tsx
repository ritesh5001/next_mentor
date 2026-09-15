"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { SectionHead } from "./home-sections";
import { cn } from "@/lib/cn";

/**
 * Every answer here is checked against how the product actually behaves —
 * course access has no expiry, commission matures after 7 days, payouts need
 * approved KYC. An FAQ is where buyers look for the catch, so it cannot
 * promise courses or terms that do not exist.
 */
const ITEMS = [
  {
    q: "What is NextMentor?",
    a: "An online learning platform for practical digital skills. You buy a course or a plan, learn from screen-recorded lessons you can follow in your own account, and earn a verifiable certificate when you finish. Every account also gets a referral link that pays commission.",
  },
  {
    q: "What can I learn right now?",
    a: "The current courses focus on digital marketing: running Meta ads and generating leads through WhatsApp. See the Courses page for everything that is live.",
  },
  {
    q: "Are the courses suitable for beginners?",
    a: "Yes. Each course shows its level, and you can watch a free preview lesson before you buy.",
  },
  {
    q: "What happens after I buy?",
    a: "The course unlocks in your dashboard as soon as your payment is confirmed. You can start watching straight away.",
  },
  {
    q: "Do I keep access, and can I learn at my own pace?",
    a: "A course you buy stays in your account with no expiry. Watch on any device, whenever suits you — the player remembers where you stopped. Plans run for the period shown on each plan.",
  },
  {
    q: "How does the referral programme pay?",
    a: "Share your link. When someone buys through it, you earn commission at your plan's rate on what they actually paid. Commission clears after 7 days, and you can withdraw to your bank once your KYC is approved.",
  },
];

/**
 * An editorial accordion: a single centred column, large questions, hairlines
 * and nothing boxed. Panels animate their height with the grid-rows technique,
 * which the global reduced-motion rule flattens to an instant change.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[var(--color-card)]">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <SectionHead align="center" eyebrow="Questions" title="Things people ask before buying." />

        <ul className="mt-12 border-t border-[rgb(16_26_71/0.1)] sm:mt-14">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-[rgb(16_26_71/0.1)]">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-6 py-[18px] text-left text-base font-semibold leading-snug text-[var(--brand-ink)] transition-colors hover:text-[var(--brand-blue)] sm:py-6 sm:text-lg"
                  >
                    {item.q}
                    <Plus
                      className={cn(
                        "size-5 shrink-0 text-[var(--brand-blue)] transition-transform duration-300 ease-out",
                        isOpen && "rotate-45",
                      )}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
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
                    <p className="max-w-2xl pb-5 pr-10 text-[15px] leading-[1.6] sm:pb-6 text-[var(--color-muted-foreground)] sm:text-base">
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
