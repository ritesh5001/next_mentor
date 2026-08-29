import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { buttonClasses } from "@/frontend/components/ui/button";

/**
 * Placeholder home page.
 *
 * The real marketing site (hero, catalog, pricing, social proof) is Phase 1.6.
 * This exists so the root route is not Next.js boilerplate while the auth and
 * commerce layers are built out.
 */
export default function HomePage() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-8 px-6">
      <div className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
        <GraduationCap
          className="size-6 text-[var(--color-primary)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        NextMentor
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Learn digital skills that actually pay.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          Practical, project-led courses in marketing, AI and design — taught by people who do
          the work. Share what you learn and earn as others join.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/register" className={buttonClasses({ size: "lg" })}>
          Create your account
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </Link>
        <Link href="/login" className={buttonClasses({ variant: "secondary", size: "lg" })}>
          Sign in
        </Link>
      </div>

      <p className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-muted-foreground)]">
        <strong className="font-semibold text-[var(--color-foreground)]">In development.</strong>{" "}
        Accounts, email verification and referral tracking are live. Course catalog, checkout and
        the video player are next.
      </p>
    </main>
  );
}
