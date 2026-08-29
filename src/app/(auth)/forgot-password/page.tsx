import type { Metadata } from "next";
import Link from "next/link";

import { ForgotPasswordForm } from "./forgot-form";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-extrabold tracking-tight">Reset your password</h1>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          Enter your email and we&apos;ll send you a link to choose a new password.
        </p>
      </header>

      <ForgotPasswordForm />

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
