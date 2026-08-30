import type { Metadata } from "next";

import { ResetForm } from "./reset-form";

export const metadata: Metadata = {
  title: "Choose a new password",
  robots: { index: false, follow: false },
};

/**
 * Password reset by 6-digit code.
 *
 * There is no longer a token in the URL, so there is no "missing token" state
 * to handle — someone can land here directly, type the code from their email
 * and reset. The API scopes the code to the email, so both are required.
 */
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-extrabold tracking-tight">Choose a new password</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Enter the code we emailed you, then pick a new password.
        </p>
      </header>

      <ResetForm email={email} />
    </div>
  );
}
