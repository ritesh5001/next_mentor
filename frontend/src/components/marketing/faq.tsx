"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { SectionHead } from "./home-sections";

const ITEMS = [
  {
    q: "What is NextMentor?",
    a: "A creator-first learning platform. You buy a course or a membership, watch project-led video lessons from people who actually do the work, and earn a verifiable certificate when you finish. If you refer others, you earn commission on what they buy.",
  },
  {
    q: "What kind of skills does NextMentor offer?",
    a: "Practical digital skills: Meta and Google Ads, SEO, web development, UI/UX, video editing, AI automation, funnel building and freelancing. Every track ends in something you have built, not just watched.",
  },
  {
    q: "Are the courses suitable for beginners?",
    a: "Yes. Every course states its level, and beginner tracks assume no prior experience. You can also watch the free preview lessons on any course before you buy.",
  },
  {
    q: "What are the membership plans?",
    a: "Plans bundle access to multiple courses and set the commission rate you earn on referrals. Higher tiers open more of the catalogue, pay a higher rate, and add extras like mentorship sessions. See the Pricing page for the current tiers.",
  },
  {
    q: "Are the courses self-paced or on a schedule?",
    a: "Self-paced. Buy once and keep access. Watch on any device, pause and pick up where you left off. Live mentorship sessions are scheduled separately and you book a seat.",
  },
  {
    q: "How does the referral program pay out?",
    a: "You get a personal link. When someone buys through it, you earn commission at your plan's rate. It clears after a short refund window, then you can withdraw to your bank account once your KYC is verified.",
  },
];

/**
 * FAQ accordion.
 *
 * Native <details>/<summary> so it works with keyboard, screen readers and
 * in-page find before any JavaScript loads. The icon is the only thing React
 * is doing here.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div>
        <SectionHead eyebrow="Questions" title="Things people ask before buying." className="mb-10" />

        <ul className="flex flex-col">
          {ITEMS.map((item, i) => (
            <li key={item.q} className="border-b border-[var(--color-border)]">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-[15px] font-bold text-[var(--brand-ink)] transition-colors hover:text-[var(--brand-blue)]"
                >
                  {item.q}
                  {open === i ? (
                    <Minus className="size-4 shrink-0 text-[var(--brand-blue)]" strokeWidth={2.2} aria-hidden="true" />
                  ) : (
                    <Plus className="size-4 shrink-0 text-[var(--color-muted-foreground)]" strokeWidth={2.2} aria-hidden="true" />
                  )}
                </button>
              </h3>

              <div
                id={`faq-panel-${i}`}
                hidden={open !== i}
                className="pb-6 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]"
              >
                {item.a}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
