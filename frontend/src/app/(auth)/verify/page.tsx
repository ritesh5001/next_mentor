import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { VerifyForm } from "./verify-form";

export const metadata: Metadata = {
  title: "Verify your email",
  robots: { index: false, follow: false },
};

/**
 * Email verification by 6-digit code.
 *
 * The old flow put a single-use token in a link. Corporate mail scanners
 * (Outlook Safe Links, spam filters, chat unfurlers) fetch every URL in an
 * email before the recipient sees it, which burned the token before the human
 * clicked. A code the user types cannot be consumed by a scanner.
 */
export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-[var(--color-primary-subtle)]">
        <MailCheck
          className="size-7 text-[var(--color-primary)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight">Check your email</h1>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {email ? (
            <>
              We sent a 6-digit code to <strong>{email}</strong>.
            </>
          ) : (
            "Enter your email and the 6-digit code we sent you."
          )}
        </p>
      </div>

      <VerifyForm email={email} />

      <Link
        href="/login"
        className={buttonClasses({ variant: "ghost", size: "sm" })}
      >
        Back to sign in
      </Link>
    </div>
  );
}
