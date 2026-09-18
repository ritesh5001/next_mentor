import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Award, Check, CheckCircle2, ChevronRight, Users, Wallet } from "lucide-react";

import { BuyButton } from "@/components/marketing/buy-button";
import { PackBox } from "@/components/marketing/pack-box";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { discountPercent, formatPrice } from "@/lib/format";
import { getPack, PACKS } from "@/lib/packages";
import { getActivePlans, getActiveSubscription, getSessionUser } from "@/lib/queries";
import { createCheckoutAction, pollOwnershipAction, previewCouponAction } from "@/actions";

type Params = { params: Promise<{ slug: string }> };
type PageProps = Params & { searchParams: Promise<{ buy?: string }> };

// Spelled out so Tailwind sees every class; one course reads best narrower.
const GRID: Record<number, string> = {
  1: "max-w-3xl",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pack = getPack(slug);
  if (!pack) return { title: "Pack not found" };

  return {
    title: `${pack.name} pack`,
    description: `${pack.tagline} Includes: ${pack.courses.map((c) => c.title).join(", ")}.`,
    alternates: { canonical: `/packages/${pack.slug}` },
  };
}

function term(durationDays: number | null): string {
  if (durationDays == null) return "One-time payment, lifetime access";
  if (durationDays === 365) return "One payment, 1 year of access";
  return `One payment, ${durationDays} days of access`;
}

export default async function PackPage({ params, searchParams }: PageProps) {
  const [{ slug }, { buy }] = await Promise.all([params, searchParams]);
  const pack = getPack(slug);
  if (!pack) notFound();

  const [plans, user] = await Promise.all([getActivePlans(), getSessionUser()]);
  const plan = plans.find((p) => p.slug === pack.slug);
  const subscription = user ? await getActiveSubscription() : null;
  const owned = subscription?.planSlug === pack.slug;

  const price = plan?.priceInPaise ?? pack.fallbackPriceInPaise;
  const off = plan ? discountPercent(plan.priceInPaise, plan.mrpInPaise) : null;
  const others = PACKS.filter((p) => p.slug !== pack.slug);

  const extras = [
    { icon: Award, title: "Certificate on completion", body: "A certificate with its own serial number that anyone can verify." },
    { icon: Users, title: "Community access", body: "Ask questions and share work with a community of 14,000+ learners." },
    ...(plan && plan.commissionRateBps > 0
      ? [
          {
            icon: Wallet,
            title: `${plan.commissionRateBps / 100}% referral commission`,
            body: "Earn on every enrolment you refer, paid out to your bank account.",
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--brand-surface-dark)] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pt-12">
          <div className="flex flex-col items-start">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-white/60">
              <Link href="/#packs-heading" className="hover:text-white">
                Skill packs
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className="text-white/90">{pack.name}</span>
            </nav>

            <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-green-bright)]">
              {pack.courses.length} {pack.courses.length === 1 ? "course" : "courses"} in this pack
            </p>
            <h1 className="mt-3 text-[40px] font-semibold leading-[1.05] tracking-[-1px] sm:text-[56px]">
              {pack.name} pack
            </h1>
            <p className="mt-4 max-w-[44ch] text-[16px] leading-[1.6] text-white/75 sm:text-[17px]">
              {pack.tagline}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {pack.courses.map((c) => (
                <li
                  key={c.title}
                  className="pill flex items-center gap-2 bg-white/8 px-3.5 py-1.5 text-[13px] font-medium ring-1 ring-white/15"
                >
                  <c.icon className="size-3.5 text-[var(--brand-green-bright)]" strokeWidth={2} aria-hidden="true" />
                  {c.title}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-baseline gap-3">
              <span className="tabular text-[40px] font-semibold leading-none tracking-[-1px]">
                {formatPrice(price)}
              </span>
              {off !== null && plan?.mrpInPaise && (
                <>
                  <span className="tabular text-[17px] text-white/50 line-through">
                    {formatPrice(plan.mrpInPaise)}
                  </span>
                  <span className="pill bg-[var(--brand-green-bright)] px-2.5 py-0.5 text-[12px] font-semibold text-[var(--brand-ink)]">
                    {off}% off
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-[13px] text-white/60">{term(plan?.durationDays ?? null)}</p>

            <div className="mt-7 w-full max-w-sm">
              {owned ? (
                <Link href="/dashboard" className={buttonClasses({ size: "lg", className: "w-full" })}>
                  <CheckCircle2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  You own this pack — go to dashboard
                </Link>
              ) : !plan ? (
                <p className="rounded-[14px] bg-white/8 px-4 py-3 text-[14px] text-white/80 ring-1 ring-white/15">
                  This pack can&apos;t be bought right now. Please try again in a little while.
                </p>
              ) : user ? (
                <div className="rounded-[18px] bg-white p-4 text-[var(--brand-ink)]">
                  <BuyButton
                    itemType="plan"
                    slug={plan.slug}
                    priceInPaise={plan.priceInPaise}
                    razorpayKeyId={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
                    successPath="/dashboard"
                    // Set when a signed-out visitor pressed Buy Now and has just
                    // signed in: pick up where they left off.
                    autoStart={buy === "1"}
                    createCheckout={createCheckoutAction}
                    previewCoupon={previewCouponAction}
                    pollOwnership={pollOwnershipAction}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/register?plan=${pack.slug}`}
                    className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[var(--brand-green-bright)] py-1.5 pl-1.5 pr-6 text-[15px] font-semibold text-[var(--brand-ink)] transition-colors hover:bg-[#5ce68b]"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-[var(--brand-ink)] text-white">
                      <ArrowUpRight className="size-4" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    Get started
                  </Link>
                  <p className="text-center text-[13px] text-white/60">
                    Already have an account?{" "}
                    <Link
                      href={`/login?callbackUrl=${encodeURIComponent(`/packages/${pack.slug}?buy=1`)}`}
                      className="font-semibold text-white underline-offset-4 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="relative flex items-center justify-center py-6">
            <div className="absolute size-[300px] rounded-full bg-[radial-gradient(circle,rgb(61_220_114/0.28),transparent_68%)] sm:size-[380px]" />
            <PackBox label={pack.boxLabel} band={pack.boxBand} width={160} className="sm:hidden" />
            <PackBox label={pack.boxLabel} band={pack.boxBand} width={230} className="hidden sm:block" />
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="bg-[var(--brand-hero-wash)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
            What&apos;s inside
          </p>
          <h2 className="mt-3 text-[30px] font-semibold leading-[1.1] tracking-[-0.8px] text-[var(--brand-ink)] sm:text-[40px]">
            The skills you&apos;ll learn
          </h2>

          <div className={cn("mt-10 grid gap-5", GRID[pack.courses.length] ?? GRID[3])}>
            {pack.courses.map((course, i) => (
              <article
                key={course.title}
                className="reveal flex flex-col rounded-[22px] border border-[rgb(16_26_71/0.08)] bg-white p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-[14px] bg-[#0b4a34] text-[var(--brand-green-bright)]">
                    <course.icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-ink)]/45">
                    Course {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.3px] text-[var(--brand-ink)]">
                  {course.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[var(--brand-ink)]/70">{course.summary}</p>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-[rgb(16_26_71/0.08)] pt-5">
                  {course.topics.map((t) => (
                    <li key={t} className="flex gap-3 text-[14.5px] leading-[1.45] text-[var(--brand-ink)]/85">
                      <Check className="mt-[3px] size-4 shrink-0 text-[var(--brand-green)]" strokeWidth={2.4} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Also included */}
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {extras.map((x) => (
              <div key={x.title} className="flex gap-4 rounded-[18px] bg-white p-5 ring-1 ring-[rgb(16_26_71/0.06)]">
                <x.icon className="size-6 shrink-0 text-[var(--brand-blue)]" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <p className="text-[15px] font-semibold text-[var(--brand-ink)]">{x.title}</p>
                  <p className="mt-1 text-[13.5px] leading-[1.5] text-[var(--brand-ink)]/65">{x.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other packs */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-[24px] font-semibold tracking-[-0.5px] text-[var(--brand-ink)] sm:text-[28px]">
            Other packs
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/packages/${o.slug}`}
                className="group flex min-w-0 items-center gap-5 rounded-[22px] bg-[var(--brand-surface-dark)] p-5 text-white transition-transform duration-200 hover:-translate-y-0.5 sm:p-6"
              >
                <PackBox label={o.boxLabel} band={o.boxBand} width={70} />
                <div className="min-w-0 flex-1">
                  <p className="text-[19px] font-semibold">{o.name}</p>
                  <p className="mt-1 truncate text-[13.5px] text-white/65">
                    {o.courses.map((c) => c.title).join(" · ")}
                  </p>
                  <p className="tabular mt-2 text-[15px] font-semibold text-[var(--brand-green-bright)]">
                    {formatPrice(plans.find((p) => p.slug === o.slug)?.priceInPaise ?? o.fallbackPriceInPaise)}
                  </p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-white/60 transition-colors group-hover:text-white" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
