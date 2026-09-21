import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

import { REFERRAL_COOKIE, normalizeReferralCode } from "@nextmentor/shared";
import { SignupForm } from "@/components/auth/signup-form";
import { toSignupPlans } from "@/lib/packages";
import { getActivePlans } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Create your account",
  robots: { index: false, follow: false },
};

/**
 * Paid signup. No OTP and no free account: the details and the package are
 * taken together, and the ID only exists once Razorpay confirms the payment.
 * `?plan=` preselects a package and `?ref=` (captured into a cookie by the
 * proxy) credits the member who shared the link.
 */
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; ref?: string }>;
}) {
  const [{ plan, ref }, plans, jar] = await Promise.all([searchParams, getActivePlans(), cookies()]);
  // First-touch attribution: the cookie wins; the link's own ?ref covers a
  // browser that blocked the cookie.
  const raw = jar.get(REFERRAL_COOKIE)?.value ?? ref;
  const referralCode = raw ? normalizeReferralCode(raw) : undefined;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--brand-ink)]">Create your account</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Fill in your details, choose a package and pay — your ID and password are emailed to you
          as soon as the payment goes through.
        </p>
      </header>

      {plans.length === 0 ? (
        <p className="rounded-[14px] bg-[var(--brand-hero-wash)] px-4 py-3 text-sm text-[var(--color-muted-foreground)]">
          Packages are unavailable right now. Please try again shortly.
        </p>
      ) : (
        <SignupForm plans={toSignupPlans(plans)} initialPlan={plan} referralCode={referralCode} />
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
