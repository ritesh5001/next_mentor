"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/**
 * Newsletter sign-up.
 *
 * Not yet wired to a mailing list. It validates and confirms locally so the
 * section is not a dead control. Point `onSubmit` at a Server Action when the
 * list exists; that is a deliberate placeholder, not an oversight.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-[var(--brand-ink)]">
            New courses, in your inbox
          </h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Occasional. Only when something new opens.
          </p>
        </div>

      {done ? (
        <p
          role="status"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-success)]"
        >
          <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
          Thanks, we&apos;ll be in touch.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
              setError("Enter a valid email address.");
              return;
            }
            setError(null);
            setDone(true);
          }}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "newsletter-error" : undefined}
            className="pill min-h-12 flex-1 border-2 border-[var(--color-border)] bg-[var(--color-card)] px-5 text-[16px] focus:border-[var(--brand-blue)]"
          />
          <button
            type="submit"
            className="pill brand-gradient-bg inline-flex min-h-12 items-center justify-center gap-2 px-7 text-[15px] font-semibold text-white transition-[filter] hover:brightness-110"
          >
            Subscribe
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </form>
      )}

      {error && (
        <p id="newsletter-error" role="alert" className="mt-3 text-sm font-medium text-[var(--color-destructive)]">
          {error}
        </p>
      )}
      </div>
    </section>
  );
}
