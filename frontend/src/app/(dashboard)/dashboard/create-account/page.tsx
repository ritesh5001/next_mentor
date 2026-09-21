import type { Metadata } from "next";
import { UserPlus } from "lucide-react";

import { SignupForm } from "@/components/auth/signup-form";
import { PageHeader } from "@/components/dashboard/panels";
import { toSignupPlans } from "@/lib/packages";
import { getActivePlans, getActiveSubscription, getProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: false },
};

/**
 * A member signs someone else up under their own referral: the same paid
 * signup as the public form, with the signed-in member recorded as sponsor by
 * the API. The new member receives their ID and password by email once the
 * payment succeeds.
 */
export default async function CreateAccountPage() {
  const [profile, plans, plan] = await Promise.all([
    getProfile(),
    getActivePlans(),
    getActiveSubscription(),
  ]);
  // The same rule as the affiliate links: a member signs people up on
  // packages they own, not above.
  const sellable = plans.filter((p) => p.tier <= (plan?.planTier ?? 0));
  const locked = plans.filter((p) => p.tier > (plan?.planTier ?? 0));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Create an account"
        subtitle="Sign up a new member under your referral. Their ID is created once the package is paid."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,560px)_1fr]">
        <section className="min-w-0 rounded-[22px] bg-white p-5 shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)] ring-1 ring-[rgb(16_26_71/0.07)] sm:p-7">
          <SignupForm
            plans={toSignupPlans(sellable)}
            mode="sponsor"
            cappedPlanName={locked.length > 0 ? sellable[sellable.length - 1]?.name ?? null : null}
          />
        </section>

        <aside className="h-fit rounded-[22px] bg-[linear-gradient(145deg,#12a150,#0b4a34)] p-6 text-white">
          <span className="flex size-12 items-center justify-center rounded-[14px] bg-white/15">
            <UserPlus className="size-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <p className="mt-4 text-[18px] font-semibold">Sponsored by you</p>
          <p className="mt-1 text-[14px] text-white/75">
            Referral ID <strong className="font-semibold text-white">{profile.referralCode}</strong> is
            applied automatically.
          </p>
          <ul className="mt-5 flex flex-col gap-2.5 text-[14px] text-white/85">
            <li>1. Fill in the new member&apos;s details</li>
            <li>2. Choose their package and pay</li>
            <li>3. They get their ID &amp; password by email</li>
          </ul>
          {locked.length > 0 && (
            <p className="mt-5 border-t border-white/20 pt-4 text-[13px] text-white/75">
              You can sign people up on the packages you own. {locked.map((p) => p.name).join(" and ")}{" "}
              {locked.length === 1 ? "needs" : "need"} an upgrade of your own package first.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
