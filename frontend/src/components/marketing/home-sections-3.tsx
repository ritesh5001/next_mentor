import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Briefcase,
  CalendarClock,
  Check,
  Clock,
  Hash,
  Headset,
  Landmark,
  Link2,
  ListChecks,
  MonitorPlay,
  MonitorSmartphone,
  Play,
  Share2,
  ShieldCheck,
  User,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { CtaButton } from "./cta-button";
import { SectionHead } from "./home-sections";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------ how it works */

type Step = {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
  points: { icon: LucideIcon; label: string }[];
};

const STEPS: Step[] = [
  {
    n: "01",
    icon: MonitorPlay,
    title: "Pick a course and learn",
    body: "Start with the free preview, buy once, and learn at your own pace.",
    points: [
      { icon: Play, label: "Free preview first" },
      { icon: MonitorSmartphone, label: "Watch on any device" },
      { icon: Clock, label: "Learn at your own pace" },
    ],
  },
  {
    n: "02",
    icon: BadgeCheck,
    title: "Finish and get certified",
    body: "Complete every lesson to unlock a certificate anyone can verify.",
    points: [
      { icon: ListChecks, label: "Complete every lesson" },
      { icon: Hash, label: "Unique serial number" },
      { icon: ShieldCheck, label: "Verifiable on our site" },
    ],
  },
  {
    n: "03",
    icon: Share2,
    title: "Share your link and earn",
    body: "Earn commission on what your referrals actually pay.",
    points: [
      { icon: Link2, label: "Your own referral link" },
      { icon: CalendarClock, label: "Clears after 7 days" },
      { icon: Landmark, label: "Paid to your bank after KYC" },
    ],
  },
];

/**
 * Three steps told through icons: a large icon tile per step joined by a
 * dashed track, and each step's details as small icon rows instead of prose.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-[#f8fafd]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <SectionHead
          align="center"
          eyebrow="How it works"
          title={
            <>
              Three steps.
              <br />
              Then the third one pays.
            </>
          }
          lede="Most course platforms stop at the certificate. The referral link is the part that keeps working after you have finished studying."
        />

        <ol className="relative mt-14 grid gap-6 sm:mt-16 md:grid-cols-3 md:gap-6 lg:gap-8">
          {/* Dashed track behind the icon tiles, desktop only. */}
          <span
            aria-hidden="true"
            className="absolute left-[16.6%] right-[16.6%] top-[52px] hidden border-t-2 border-dashed border-[var(--brand-blue)]/20 md:block"
          />

          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="reveal relative flex flex-col items-center rounded-[24px] border border-[rgb(16_26_71/0.07)] bg-white px-6 pb-7 pt-8 text-center shadow-[0_18px_40px_-28px_rgb(16_26_71/0.35)] sm:px-7"
            >
              <div className="relative">
                <span
                  className={cn(
                    "flex size-[72px] items-center justify-center rounded-[22px] text-white shadow-[0_14px_28px_-12px_rgb(16_26_71/0.55)]",
                    i === 2
                      ? "bg-[linear-gradient(145deg,#12a150,#0b4a34)]"
                      : "bg-[linear-gradient(145deg,#2e6fd4,#101a47)]",
                  )}
                >
                  <step.icon className="size-8" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="tabular absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-[var(--brand-green-bright)] text-[12px] font-bold text-[var(--brand-ink)] ring-4 ring-white">
                  {step.n}
                </span>
              </div>

              <h3 className="mt-6 text-[20px] font-semibold leading-snug tracking-[-0.3px] text-[var(--brand-ink)]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[30ch] text-[15px] leading-[1.55] text-[var(--color-muted-foreground)]">
                {step.body}
              </p>

              <ul className="mt-6 flex w-full flex-col gap-2.5 border-t border-[rgb(16_26_71/0.07)] pt-6 text-left">
                {step.points.map((p) => (
                  <li
                    key={p.label}
                    className="flex items-center gap-3 rounded-[14px] bg-[var(--brand-hero-wash)] px-3.5 py-2.5 text-[14.5px] font-medium text-[var(--brand-ink)]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-white text-[var(--brand-blue)] shadow-[0_2px_6px_-2px_rgb(16_26_71/0.2)]">
                      <p.icon className="size-4" strokeWidth={2} aria-hidden="true" />
                    </span>
                    {p.label}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ why choose us */

/** Six learner nodes around the founder, placed on a circle (percent of box). */
const NODES = [
  { x: 50, y: 6, tone: "#2e6fd4" },
  { x: 91, y: 30, tone: "#12a150" },
  { x: 86, y: 78, tone: "#f59e0b" },
  { x: 50, y: 95, tone: "#7c3aed" },
  { x: 11, y: 76, tone: "#0ea5e9" },
  { x: 9, y: 28, tone: "#ef4444" },
];

function CommunityNetwork() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px]" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
        {NODES.map((n) => (
          <line
            key={`${n.x}-${n.y}`}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="#1b3fa0"
            strokeOpacity="0.25"
            strokeWidth="0.6"
            strokeDasharray="1.6 1.6"
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 size-[38%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-white p-1 shadow-[0_12px_30px_-10px_rgb(16_26_71/0.45)]">
        <Image
          src="/images/founder-saurabh-portrait.jpg"
          alt=""
          width={200}
          height={200}
          className="size-full rounded-full object-cover object-top"
        />
      </div>

      {NODES.map((n) => (
        <span
          key={`${n.x}-${n.y}-node`}
          className="absolute flex size-[17%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_-8px_rgb(16_26_71/0.45)]"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <User className="size-1/2" style={{ color: n.tone }} strokeWidth={2} />
          <span className="absolute -bottom-0.5 -right-0.5 flex size-[38%] items-center justify-center rounded-full bg-[var(--brand-green)] ring-2 ring-white">
            <Check className="size-2/3 text-white" strokeWidth={3.5} />
          </span>
        </span>
      ))}
    </div>
  );
}

/** A phone drawn in CSS, showing a lesson mid-way — "pick up where you left off". */
function PhoneMock() {
  return (
    <div
      className="relative w-[190px] shrink-0 rounded-[30px] bg-[#0f1424] p-[7px] shadow-[0_30px_50px_-24px_rgb(16_26_71/0.6)] sm:w-[205px]"
      aria-hidden="true"
    >
      <div className="overflow-hidden rounded-[24px] bg-white">
        <div className="flex items-center justify-between px-4 pb-1.5 pt-2.5 text-[9px] font-semibold text-[var(--brand-ink)]">
          <span>9:41</span>
          <span className="h-[14px] w-14 rounded-full bg-[#0f1424]" />
          <span>100%</span>
        </div>
        <div className="px-3 pb-3">
          <p className="text-[9px] text-[var(--color-muted-foreground)]">Continue learning</p>
          <p className="text-[11px] font-semibold text-[var(--brand-ink)]">Meta Ads · Lesson 4</p>
          <div className="relative mt-2 overflow-hidden rounded-[12px]">
            <Image
              src="/images/founder-saurabh.jpg"
              alt=""
              width={400}
              height={260}
              className="aspect-[16/10] w-full object-cover object-[50%_25%]"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/95">
                <Play className="ml-0.5 size-3.5 fill-[var(--brand-ink)] text-[var(--brand-ink)]" />
              </span>
            </span>
          </div>
          <div className="mt-2.5 h-1.5 rounded-full bg-[rgb(16_26_71/0.08)]">
            <div className="h-full w-[62%] rounded-full bg-[var(--brand-green)]" />
          </div>
          <p className="mt-1 text-[8.5px] text-[var(--color-muted-foreground)]">62% complete</p>
          <div className="mt-2.5 flex flex-col gap-1.5">
            {["Audiences & retargeting", "Creative testing", "Tracking conversions"].map((l, i) => (
              <div key={l} className="flex items-center gap-2 rounded-[8px] bg-[var(--brand-hero-wash)] px-2 py-1.5">
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full",
                    i === 0 ? "bg-[var(--brand-green)]" : "bg-[rgb(16_26_71/0.1)]",
                  )}
                >
                  {i === 0 && <Check className="size-2.5 text-white" strokeWidth={3} />}
                </span>
                <span className="text-[9px] font-medium text-[var(--brand-ink)]">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const REASONS = [
  {
    icon: BookOpenCheck,
    title: "Follow-along lessons",
    body: "Real setups recorded on screen, so you build it in your own account as you watch.",
  },
  {
    icon: BadgeCheck,
    title: "Certificates that verify",
    body: "Every certificate carries a serial number with its own public verification page.",
  },
  {
    icon: Wallet,
    title: "Earn while you learn",
    body: "Share your referral link and earn commission, paid straight to your bank.",
  },
  {
    icon: Headset,
    title: "Mentorship & support",
    body: "Get your questions answered by mentors and a community that has been there.",
  },
];

/**
 * Why choose us, as a bento: a community card and a device card up top, four
 * compact reasons underneath. Every figure is one the business can stand
 * behind — no invented learner counts.
 */
export function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Why choose us"
            title="We don't just teach. We help you start earning."
          />
          <p className="reveal max-w-md text-pretty text-[15px] leading-[1.6] text-[var(--color-muted-foreground)] sm:text-base lg:pb-2">
            Practical skills, a mentor who has done the work, and a way to earn from day one — not
            just another certificate.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          {/* Community */}
          <article className="reveal grid items-center gap-6 overflow-hidden rounded-[26px] bg-[#eef1f6] p-7 sm:grid-cols-[1fr_1.05fr] sm:p-9">
            <div className="flex flex-col gap-7">
              <div>
                <p className="text-[44px] font-semibold leading-none tracking-[-1.5px] text-[var(--brand-ink)] sm:text-[52px]">
                  14,000+
                </p>
                <p className="mt-2 text-[15px] text-[var(--brand-ink)]/70">People in our community</p>
              </div>
              <div>
                <p className="text-[44px] font-semibold leading-none tracking-[-1.5px] text-[var(--brand-ink)] sm:text-[52px]">
                  6+ yrs
                </p>
                <p className="mt-2 text-[15px] text-[var(--brand-ink)]/70">
                  Of hands-on business experience behind every lesson
                </p>
              </div>
            </div>
            <CommunityNetwork />
          </article>

          {/* Any device */}
          <article className="reveal relative flex items-center gap-6 overflow-hidden rounded-[26px] bg-[#e5f2e3] p-7 sm:p-9">
            <div className="flex min-w-0 flex-col">
              <p className="text-[14px] font-medium text-[#0b4a34]">Learn without limits</p>
              <h3 className="mt-3 text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.6px] text-[var(--brand-ink)] sm:text-[30px]">
                Learn, track progress and pick up anytime, anywhere.
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-[var(--brand-ink)]/70">
                The player remembers where you stopped, on phone or laptop.
              </p>
            </div>
            <div className="-mb-16 hidden self-end sm:block">
              <PhoneMock />
            </div>
          </article>
        </div>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r) => (
            <li
              key={r.title}
              className="reveal group rounded-[22px] border border-[rgb(16_26_71/0.08)] bg-white p-6 transition-shadow duration-200 hover:shadow-[0_20px_40px_-28px_rgb(16_26_71/0.45)]"
            >
              <span className="flex size-12 items-center justify-center rounded-[14px] bg-[var(--brand-hero-wash)] text-[var(--brand-blue)] transition-colors duration-200 group-hover:bg-[var(--brand-blue)] group-hover:text-white">
                <r.icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-[var(--brand-ink)]">{r.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-[var(--color-muted-foreground)]">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- roadmap */

const ROADMAP = [
  {
    image: "/images/roadmap-enroll.webp",
    alt: "A laptop on a desk showing a course dashboard",
    title: "Enroll & begin your journey",
    body: "Pick a pack or a single course and sign up in a few clicks. Your dashboard opens instantly, with every lesson and your progress in one place.",
  },
  {
    image: "/images/roadmap-learn.webp",
    alt: "A learner taking notes while a video lesson plays on a laptop",
    title: "Learn with expert video lessons",
    body: "Follow step-by-step screen recordings at your own pace. Pause, rewatch, and build it in your own account as you go.",
  },
  {
    image: "/images/roadmap-certificate.webp",
    alt: "A framed certificate of completion next to a graduation cap",
    title: "Earn your certification",
    body: "Finish every lesson to unlock a serial-numbered certificate that anyone can verify online. Add it to your profile and portfolio.",
  },
  {
    image: "/images/roadmap-career.webp",
    alt: "A freelancer on a video call with a happy client",
    title: "Apply & grow your income",
    body: "Put the skill to work with real clients, build your portfolio, and share your referral link to keep earning commission.",
  },
];

/** Four photo cards on a deep-green band: the path from signup to income. */
export function Roadmap() {
  return (
    <section className="bg-[linear-gradient(160deg,#0e5a40_0%,#0b4a34_55%,#083826_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <SectionHead
          align="center"
          tone="dark"
          eyebrow="Your roadmap"
          title={
            <>
              A complete roadmap from
              <br className="hidden sm:block" /> skills to success.
            </>
          }
        />

        <ol className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {ROADMAP.map((step, i) => (
            <li key={step.title} className="reveal flex flex-col overflow-hidden rounded-[22px] bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start gap-3.5">
                  <span className="tabular flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0b4a34] text-[14px] font-semibold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-semibold leading-snug text-[var(--brand-ink)]">{step.title}</h3>
                    <span aria-hidden="true" className="mt-2.5 block h-[3px] w-9 rounded-full bg-[var(--brand-green)]" />
                  </div>
                </div>
                <p className="mt-4 text-[14.5px] leading-[1.65] text-[var(--color-muted-foreground)]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- founder */

const EXPERTISE = [
  "Entrepreneurship",
  "Sales",
  "Leadership",
  "Team building",
  "Business development",
  "Digital marketing",
];

/**
 * The founder as a feature spread: a framed portrait with floating fact
 * badges, the bio, his areas of expertise, and a way onward. Every fact comes
 * from his own profile; there is no quote put in his mouth.
 */
export function Founder() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-hero-wash)]">
      <span
        aria-hidden="true"
        className="absolute -right-40 -top-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(46_111_212/0.12),transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[440px_1fr] lg:gap-20 lg:py-28">
        {/* Portrait */}
        <div className="reveal relative mx-auto w-full max-w-[400px] lg:max-w-none">
          <span
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 h-[88%] w-[88%] rounded-[28px] bg-[linear-gradient(145deg,#12a150,#0b4a34)]"
          />
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-3 size-24 rounded-[20px] bg-[radial-gradient(circle,rgb(27_63_160/0.35)_1.5px,transparent_1.6px)] [background-size:12px_12px]"
          />
          <div className="relative overflow-hidden rounded-[28px] bg-[var(--brand-surface-dark)] shadow-[0_30px_60px_-30px_rgb(16_26_71/0.6)]">
            <Image
              src="/images/founder-saurabh-portrait.jpg"
              alt="Saurabh Namdev, founder of NextMentor, in his workspace"
              width={741}
              height={988}
              sizes="(max-width: 1024px) 90vw, 440px"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-[18px] bg-[var(--brand-ink)]/70 px-4 py-3 text-white ring-1 ring-white/15 backdrop-blur-md">
              <div>
                <p className="text-[16px] font-semibold">Saurabh Namdev</p>
                <p className="text-[12.5px] text-white/70">Founder &amp; CEO, NextMentor</p>
              </div>
              <BadgeCheck className="size-6 shrink-0 text-[var(--brand-green-bright)]" strokeWidth={2} aria-hidden="true" />
            </div>
          </div>

          <div className="absolute -right-2 top-10 flex items-center gap-3 rounded-[16px] bg-white px-4 py-3 shadow-[0_18px_36px_-18px_rgb(16_26_71/0.45)] sm:-right-8">
            <span className="flex size-10 items-center justify-center rounded-[12px] bg-[#e5f2e3] text-[#0b4a34]">
              <Users className="size-5" strokeWidth={2} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[18px] font-semibold leading-none text-[var(--brand-ink)]">14,000+</p>
              <p className="mt-1 text-[11.5px] text-[var(--color-muted-foreground)]">community built</p>
            </div>
          </div>
          <div className="absolute -left-2 top-[46%] flex items-center gap-3 rounded-[16px] bg-white px-4 py-3 shadow-[0_18px_36px_-18px_rgb(16_26_71/0.45)] sm:-left-8">
            <span className="flex size-10 items-center justify-center rounded-[12px] bg-[#e8eefb] text-[var(--brand-blue)]">
              <Briefcase className="size-5" strokeWidth={2} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[18px] font-semibold leading-none text-[var(--brand-ink)]">6+ years</p>
              <p className="mt-1 text-[11.5px] text-[var(--color-muted-foreground)]">in business</p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="flex flex-col">
          <SectionHead eyebrow="Meet the founder" title="Taught by the person who built the business." />

          <p className="reveal mt-7 border-l-[3px] border-[var(--brand-green)] pl-5 text-[18px] font-medium leading-[1.55] text-[var(--brand-ink)] sm:text-[19px]">
            His mission: turn real-world business experience into practical skills that help people
            build confidence and earn through freelancing.
          </p>

          <div className="reveal mt-6 flex max-w-[600px] flex-col gap-4 text-[15px] leading-[1.7] text-[var(--color-muted-foreground)] sm:text-base">
            <p>
              With 6+ years of experience in entrepreneurship, sales, leadership and team building,
              Saurabh Namdev has built and led a community of more than 14,000 people — gaining
              hands-on experience in communication, business development and digital marketing.
            </p>
            <p>
              He started NextMentor to turn that experience into career-focused learning: skills that go
              beyond theory and open real opportunities in freelancing and digital entrepreneurship.
            </p>
          </div>

          <ul className="reveal mt-7 flex flex-wrap gap-2.5" aria-label="Areas of expertise">
            {EXPERTISE.map((e) => (
              <li
                key={e}
                className="pill flex items-center gap-2 bg-white px-3.5 py-2 text-[13.5px] font-medium text-[var(--brand-ink)] ring-1 ring-[rgb(16_26_71/0.08)]"
              >
                <Check className="size-3.5 text-[var(--brand-green)]" strokeWidth={3} aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>

          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/courses" size="lg" className="justify-center">
              Learn from Saurabh
            </CtaButton>
            <Link
              href="/about"
              className="group inline-flex min-h-12 items-center justify-center gap-2 px-4 text-[15px] font-semibold text-[var(--brand-blue)]"
            >
              Read our story
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
