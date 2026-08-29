import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Form column. On mobile this is the whole page — the marketing panel
          is decorative and should never push the form below the fold. */}
      <div className="flex flex-col px-6 py-8 sm:px-10">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-lg font-extrabold tracking-tight"
        >
          <GraduationCap
            className="size-6 text-[var(--color-primary)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          NextMentor
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
        className="relative hidden overflow-hidden bg-[var(--color-primary)] lg:block"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-end gap-6 p-12 text-[var(--color-on-primary)]">
          <blockquote className="max-w-md text-2xl font-bold leading-snug tracking-tight">
            &ldquo;I finished the Meta Ads track on a Sunday and ran my first
            profitable campaign that Thursday.&rdquo;
          </blockquote>
          <div className="text-sm opacity-90">
            <div className="font-semibold">Priya R.</div>
            <div>Freelance marketer, Pune</div>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-6 border-t border-white/20 pt-6">
            {[
              ["12,000+", "students"],
              ["18", "courses"],
              ["4.8", "avg rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-extrabold tabular">{value}</dt>
                <dd className="text-xs uppercase tracking-wide opacity-80">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
