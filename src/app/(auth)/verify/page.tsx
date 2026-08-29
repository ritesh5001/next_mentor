import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button";
import { VerifyForm } from "./verify-form";

export const metadata: Metadata = {
  title: "Confirm your email",
  robots: { index: false, follow: false },
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; sent?: string; expired?: string }>;
}) {
  const { token, sent, expired } = await searchParams;

  // Token present: render a button rather than consuming it during this GET.
  //
  // Corporate mail scanners (Outlook Safe Links, spam filters, chat unfurlers)
  // fetch every URL in an email before the recipient ever sees it. Consuming a
  // single-use token on GET means those users open the link to "invalid or
  // expired" every time. Requiring an explicit POST keeps the token intact
  // until a human actually clicks.
  if (token) {
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
          <h1 className="text-2xl font-extrabold tracking-tight">Confirm your email</h1>
          <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            One last step — confirm this is your address to activate your account.
          </p>
        </div>

        <VerifyForm token={token} />
      </div>
    );
  }

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
        <h1 className="text-2xl font-extrabold tracking-tight">Check your inbox</h1>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {sent === "1"
            ? "We've sent you a confirmation link. Open it to activate your account."
            : "Open the confirmation link we emailed you to activate your account."}
        </p>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Nothing yet? Check your spam folder — the link is valid for 24 hours.
        </p>
      </div>

      {expired === "1" && (
        <Alert tone="error" className="text-left">
          That confirmation link is invalid or has expired. Sign in to have a new one sent.
        </Alert>
      )}

      <Link
        href="/login"
        className={buttonClasses({ variant: "secondary", size: "lg", className: "w-full" })}
      >
        Back to sign in
      </Link>
    </div>
  );
}
