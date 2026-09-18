"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 7000;

const SLIDES = [
  {
    src: "/images/banner-freedom.webp",
    alt: "Your Skills, Your Freedom — learn Meta Ads, WhatsApp lead generation and freelance skills, get certified, and earn through referrals",
  },
  {
    src: "/images/banner-future.webp",
    alt: "Build Your Skills, Create Your Bright Future — expert-led courses, get certified, freelance from anywhere, lifetime access, and earn through referrals",
  },
];

/**
 * Two-slide banner between the trust bar and "Why NextMentor".
 *
 * The slides are the owner's own pre-made banner images, shown as-is rather
 * than rebuilt as markup — this component is only the slider mechanism
 * (autoplay, arrows, dots), not the slide content.
 */
export function SkillsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = SLIDES.length;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, count]);

  const goTo = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="What you get with NextMentor"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {SLIDES.map((slide, i) => (
          <div key={slide.src} className="w-full shrink-0" aria-hidden={index !== i} inert={index !== i}>
            <Image
              src={slide.src}
              alt={slide.alt}
              width={2172}
              height={724}
              // Slide 0 is on screen at first paint on most viewports; the
              // rest can lazy-load as normal.
              loading={i === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--brand-ink)] shadow-[var(--shadow-raised)] transition-colors hover:bg-white sm:left-6 sm:size-11"
      >
        <ChevronLeft className="size-5" strokeWidth={2} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--brand-ink)] shadow-[var(--shadow-raised)] transition-colors hover:bg-white sm:right-6 sm:size-11"
      >
        <ChevronRight className="size-5" strokeWidth={2} aria-hidden="true" />
      </button>

      {/* A fixed dark capsule regardless of which slide is showing — a
          translucent one nearly vanished against the light slide's pale
          background, which is exactly where losing the controls matters. */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[var(--brand-ink)]/75 px-3 py-2 ring-1 ring-white/15 backdrop-blur-sm">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={index === i}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === i ? "w-6 bg-[var(--brand-green-bright)]" : "w-2 bg-white/45 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}
