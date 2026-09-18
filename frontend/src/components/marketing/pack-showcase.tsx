import Link from "next/link";

import { PackBox } from "@/components/marketing/pack-box";
import { QuickBuyButton } from "@/components/marketing/quick-buy-button";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { PACKS, type Pack } from "@/lib/packages";

/** `green` is the dark featured card; the others are light. */
type Tone = "green" | "white" | "mint";

/**
 * The card's actions: a one-click Buy Now straight into Razorpay, and a
 * quieter link to the pack page for anyone who wants the course list first.
 */
function BuyNow({ slug, name, tone }: { slug: string; name: string; tone: Tone }) {
  const onDark = tone === "green";
  return (
    <div className="flex flex-wrap items-start gap-x-5 gap-y-2">
      <QuickBuyButton slug={slug} name={name} onDark={onDark} />
      <Link
        href={`/packages/${slug}`}
        className={cn(
          "inline-flex min-h-12 items-center text-[14px] font-semibold underline-offset-4 hover:underline",
          onDark ? "text-white/85" : "text-[#0b4a34]",
        )}
      >
        What&apos;s inside
      </Link>
    </div>
  );
}

function Meta({ price, count, tone }: { price: number; count: number; tone: Tone }) {
  return (
    <p
      className={cn(
        "flex items-baseline gap-2 text-[13px] font-medium",
        tone === "green" ? "text-white/75" : "text-[var(--brand-ink)]/70",
      )}
    >
      <span
        className={cn(
          "tabular text-[26px] font-semibold leading-none tracking-[-0.6px]",
          tone === "green" ? "text-white" : "text-[var(--brand-ink)]",
        )}
      >
        {formatPrice(price)}
      </span>
      · {count} {count === 1 ? "course" : "courses"}
    </p>
  );
}

const WIDE_TONES: Record<"white" | "mint", string> = {
  white: "bg-white text-[var(--brand-ink)]",
  // The same mint as the "Learn without limits" card, so the page shares one palette.
  mint: "bg-[#e5f2e3] text-[var(--brand-ink)]",
};

/** Landscape card: copy on the left, box on the right. */
function WideCard({ pack, price, tone }: { pack: Pack; price: number; tone: "white" | "mint" }) {
  return (
    <article
      className={cn(
        "reveal flex items-center justify-between gap-4 rounded-[26px] p-6 sm:gap-6 sm:p-8 lg:px-9",
        WIDE_TONES[tone],
      )}
    >
      <div className="flex min-w-0 flex-col items-start gap-4">
        <h3 className="text-[26px] font-semibold tracking-[-0.5px] sm:text-[28px]">{pack.name}</h3>
        <p
          className={cn(
            "max-w-[34ch] text-[14px] leading-[1.55] sm:text-[15px]",
            "text-[var(--brand-ink)]/75",
          )}
        >
          {pack.tagline}
        </p>
        <Meta price={price} count={pack.courses.length} tone={tone} />
        <BuyNow slug={pack.slug} name={pack.name} tone={tone} />
      </div>
      <PackBox
        label={pack.boxLabel}
        band={pack.boxBand}
        width={96}
        className="mr-1 sm:hidden"
      />
      <PackBox
        label={pack.boxLabel}
        band={pack.boxBand}
        width={128}
        className="mr-3 hidden sm:block"
      />
    </article>
  );
}

/** Portrait card for the top pack, lit up so it reads as the one to pick. */
function TallCard({ pack, price }: { pack: Pack; price: number }) {
  return (
    <article className="reveal relative flex flex-col items-center gap-6 rounded-[26px] bg-[linear-gradient(165deg,#12a150_0%,#0e5a40_45%,#0b3a2e_100%)] px-6 py-8 text-center text-white shadow-[0_0_0_1.5px_rgb(61_220_114/0.55),0_0_48px_-6px_rgb(61_220_114/0.5)] sm:px-8 sm:py-10">
      <span className="pill absolute right-4 top-4 bg-[var(--brand-green-bright)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-ink)]">
        Best value
      </span>
      <h3 className="text-[28px] font-semibold tracking-[-0.5px] sm:text-[30px]">{pack.name}</h3>
      <PackBox label={pack.boxLabel} band={pack.boxBand} width={150} className="my-2" />
      <p className="max-w-[30ch] text-[15px] font-medium leading-[1.55] text-white/85">
        {pack.tagline}
      </p>
      <Meta price={price} count={pack.courses.length} tone="green" />
      <BuyNow slug={pack.slug} name={pack.name} tone="green" />
    </article>
  );
}

/**
 * Fourth homepage section: the three skill packs as a bento grid — two
 * landscape cards stacked on the left, the top pack as a tall card on the
 * right.
 */
export function PackShowcase({ prices }: { prices: Record<string, number> }) {
  const priceOf = (p: Pack) => prices[p.slug] ?? p.fallbackPriceInPaise;
  const [first, second, top] = PACKS;

  return (
    <section className="bg-[var(--brand-surface-dark)]" aria-labelledby="packs-heading">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-green-bright)]">
            Skill packs
          </p>
          <h2
            id="packs-heading"
            className="mt-3 text-[32px] font-semibold leading-[1.1] tracking-[-0.8px] text-white sm:text-[44px]"
          >
            Pick a pack. Learn the skill.
            <br className="hidden sm:block" /> Start earning.
          </h2>
          <p className="mt-4 text-balance text-[15px] leading-[1.6] text-white/70 sm:text-base">
            Each pack bundles the courses for one kind of client work. One payment gets you all of them.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:mt-14 lg:grid-cols-[1.7fr_1fr]">
          <div className="flex flex-col gap-5">
            <WideCard pack={first} price={priceOf(first)} tone="white" />
            <WideCard pack={second} price={priceOf(second)} tone="mint" />
          </div>
          <TallCard pack={top} price={priceOf(top)} />
        </div>
      </div>
    </section>
  );
}
