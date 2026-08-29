"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/**
 * Newsletter sign-up.
 *
 * Not yet wired to a mailing list — it validates and confirms locally so the
 * section is not a dead control. Point `onSubmit` at a Server Action when the
 * list exists; that is a deliberate placeholder, not an oversight.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
      <h2 className="text-[26px] font-bold leading-tight tracking-tight text-[var(--brand-ink)] sm:text-[36px]">
        Want to get special offers
        <br />
        and <span className="brand-gradient-text">course updates?</span>
      </h2>

      {done ? (
        <p
          role="status"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-success)]"
        >
          <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
          Thanks — we&apos;ll be in touch.
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
          className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
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
    </section>
  );
}
