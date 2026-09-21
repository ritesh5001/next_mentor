import Link from "next/link";
import { Award, GraduationCap, IndianRupee, PlayCircle } from "lucide-react";

import { Logo } from "@/components/brand/logo";

/**
 * What the side panel says about NextMentor.
 *
 * Deliberately facts about the product, not a testimonial and not a student
 * count: the panel used to carry an invented quote from an invented person
 * beside invented figures, which is a made-up endorsement on the page where
 * someone hands over money. Real feedback belongs on the homepage, where it
 * comes from the testimonials the owner actually collects.
 */
const POINTS = [
  { icon: PlayCircle, title: "Practical, project-led courses", body: "Ads, AI tools, design and video editing — taught the way the work is actually done." },
  { icon: GraduationCap, title: "Learn from working practitioners", body: "Trainers who run campaigns and studios, not career lecturers." },
  { icon: Award, title: "Certificate when you finish", body: "Issued in your name the moment you complete a course." },
  { icon: IndianRupee, title: "Earn by sharing what works", body: "Every member gets a referral link and earns commission on what it sells." },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Form column. On mobile this is the whole page — the marketing panel
          is decorative and should never push the form below the fold. */}
      <div className="flex min-w-0 flex-col px-6 py-8 sm:px-10">
        <Link href="/" className="w-fit" aria-label="NextMentor home">
          <Logo className="h-8 w-auto" />
        </Link>

        <main id="main" className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </main>

        <p className="text-xs text-[var(--color-muted-foreground)]">
          © {new Date().getFullYear()} NextMentor
        </p>
      </div>

      {/* Decorative panel, desktop only. aria-hidden because it repeats nothing
          a screen-reader user needs and would just be noise before the form. */}
      <div
        aria-hidden="true"
        className="relative hidden overflow-hidden bg-[linear-gradient(150deg,#101a47_0%,#132a6b_55%,#0b4a34_100%)] lg:block"
      >
        <span className="absolute -right-24 -top-24 size-96 rounded-full bg-[radial-gradient(circle,rgb(61_220_114/0.28),transparent_65%)]" />
        <span className="absolute -bottom-32 -left-24 size-96 rounded-full bg-[radial-gradient(circle,rgb(46_111_212/0.32),transparent_65%)]" />
        <span className="absolute bottom-10 right-10 h-28 w-48 bg-[radial-gradient(circle,rgb(255_255_255/0.16)_1.5px,transparent_1.6px)] [background-size:14px_14px]" />

        <div className="relative flex h-full flex-col justify-center gap-10 p-12 text-white xl:p-16">
          <div className="flex flex-col gap-4">
            <span className="pill w-fit bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/20">
              NextMentor
            </span>
            <h2 className="max-w-md text-balance text-[34px] font-bold leading-[1.15] tracking-[-1px] xl:text-[40px]">
              Learn a digital skill. Then earn from it.
            </h2>
          </div>

          <ul className="flex max-w-md flex-col gap-5">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-white/12 ring-1 ring-white/15">
                  <p.icon className="size-5" strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15.5px] font-semibold">{p.title}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-[1.55] text-white/70">{p.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
