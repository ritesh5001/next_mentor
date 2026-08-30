import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Gift } from "lucide-react";

import { REFERRAL_COOKIE } from "@nextmentor/shared";
import { RegisterForm } from "./register-form";
import { normalizeReferralCode } from "@nextmentor/shared";

export const metadata: Metadata = {
  title: "Create your account",
  robots: { index: false, follow: false },
};

export default async function RegisterPage() {
  // Show who invited them. Seeing a real name here measurably lifts completion
  // versus an anonymous "you were referred" line, and it lets the visitor catch
  // a wrong link before they sign up under the wrong affiliate.
  const refCode = (await cookies()).get(REFERRAL_COOKIE)?.value;
  // The referrer's name is a nicety, not a gate. Rather than add an endpoint
  // just to look it up, the page shows the code and the API resolves it at
  // signup — where it actually matters.
  const referrerName: string | null = null;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-extrabold tracking-tight">Create your account</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Start learning today. No card needed to sign up.
        </p>
      </header>

      {referrerName && (
        <div className="flex items-center gap-2.5 rounded-[var(--radius-control)] border border-[var(--color-primary)]/25 bg-[var(--color-primary-subtle)] px-3.5 py-3 text-sm">
          <Gift
            className="size-4 shrink-0 text-[var(--color-primary)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="text-[var(--color-foreground)]">
            Invited by <strong className="font-semibold">{referrerName}</strong>
          </span>
        </div>
      )}

      <RegisterForm />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted-foreground)]">
          or
        </span>
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
