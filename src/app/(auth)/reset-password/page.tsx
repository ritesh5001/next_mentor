import type { Metadata } from "next";
import Link from "next/link";

import { Alert } from "@/frontend/components/ui/alert";
import { buttonClasses } from "@/frontend/components/ui/button";
import { ResetPasswordForm } from "./reset-form";

export const metadata: Metadata = {
  title: "Choose a new password",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Link not valid</h1>
        <Alert tone="error">
          This reset link is missing its token. Request a new one and use the most recent email.
        </Alert>
        <Link
          href="/forgot-password"
          className={buttonClasses({ size: "lg", className: "w-full" })}
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-extrabold tracking-tight">Choose a new password</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Pick something you have not used here before.
        </p>
      </header>

      <ResetPasswordForm token={token} />
    </div>
  );
}
