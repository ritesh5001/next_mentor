import type { Metadata } from "next";
import Link from "next/link";

import { SignupForm } from "@/components/auth/signup-form";
import { toSignupPlans } from "@/lib/packages";
import { getActivePlans, getReferrer } from "@/lib/queries";
import { resolveSignupReferral } from "@/lib/referral";

export const metadata: Metadata = {
  title: "Create your account",
  robots: { index: false, follow: false },
};

/**
 * Paid signup. No OTP and no free account: the details and the package are
 * taken together, and the ID only exists once Razorpay confirms the payment.
 * `?plan=` preselects a package and `?ref=` credits the member who shared the
 * link.
 */
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; ref?: string }>;
}) {
  const [{ plan, ref }, plans] = await Promise.all([searchParams, getActivePlans()]);
  const referralCode = await resolveSignupReferral(ref);

  // A member may only introduce someone to a package they own themselves, so
  // the ones above their level are not offered at all. The API enforces the
  // same rule — this only keeps the form from showing a choice that would be
  // refused at payment.
  const referrer = referralCode ? await getReferrer(referralCode).catch(() => null) : null;
  const sponsor = referrer?.found ? referrer : null;
  const offered = sponsor ? plans.filter((p) => p.tier <= sponsor.maxTier) : plans;
  const cappedBy = sponsor && offered.length < plans.length ? sponsor : null;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--brand-ink)]">Create your account</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Fill in your details, choose a package and pay — your ID and password are emailed to you
          as soon as the payment goes through.
        </p>
      </header>

      {offered.length === 0 ? (
        <p className="rounded-[14px] bg-[var(--brand-hero-wash)] px-4 py-3 text-sm text-[var(--color-muted-foreground)]">
          {sponsor
            ? "The member who referred you does not hold a package yet, so they cannot introduce one. Ask them for a new link, or "
            : "Packages are unavailable right now. Please try again shortly."}
          {sponsor && (
            <Link href="/register" className="font-semibold text-[var(--brand-blue)] underline">
              sign up without a referral ID
            </Link>
          )}
        </p>
      ) : (
        <SignupForm
          plans={toSignupPlans(offered)}
          initialPlan={plan}
          referralCode={referralCode}
          referrerName={sponsor?.name ?? null}
          cappedPlanName={cappedBy ? offered[offered.length - 1]?.name ?? null : null}
        />
      )}

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[var(--brand-blue)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
