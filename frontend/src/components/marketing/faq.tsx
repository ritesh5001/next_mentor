"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

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
    a: "Plans bundle access to multiple courses and set the commission rate you earn on referrals. Higher tiers unlock more of the catalog, a higher rate, and extras like mentorship sessions. See the Pricing page for the current tiers.",
  },
  {
    q: "Are the courses self-paced or on a schedule?",
    a: "Self-paced. Buy once and keep access — watch on any device, pause and pick up where you left off. Live mentorship sessions are scheduled separately and you book a seat.",
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
    <section className="bg-[#0B1437] text-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="mb-10 text-center text-[28px] font-bold tracking-tight sm:text-[40px]">
          Frequently Asked Questions
        </h2>

        <ul className="flex flex-col">
          {ITEMS.map((item, i) => (
            <li key={item.q} className="border-b border-white/15">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  className="flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold uppercase tracking-wide transition-colors hover:text-[var(--brand-green)] sm:text-base"
                >
                  {item.q}
                  {open === i ? (
                    <Minus className="size-5 shrink-0" strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Plus className="size-5 shrink-0" strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </h3>

              <div
                id={`faq-panel-${i}`}
                hidden={open !== i}
                className="pb-6 text-sm leading-relaxed text-white/75"
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
