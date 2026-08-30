import type { Metadata } from "next";
import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; reset?: string; verified?: string; error?: string }>;
}) {
  const params = await searchParams;

  // Only accept relative callbacks. An absolute URL here would turn the login
  // page into an open redirect that phishing links could bounce through.
  const callbackUrl =
    params.callbackUrl && params.callbackUrl.startsWith("/") && !params.callbackUrl.startsWith("//")
      ? params.callbackUrl
      : "/dashboard";

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-extrabold tracking-tight">Welcome back</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Sign in to pick up where you left off.
        </p>
      </header>

      {params.verified === "1" && (
        <Alert tone="success">Email confirmed. Sign in to get started.</Alert>
      )}
      {params.reset === "1" && (
        <Alert tone="success">Password updated. Sign in with your new password.</Alert>
      )}
      {params.error && (
        <Alert tone="error">We could not complete that sign-in. Try again.</Alert>
      )}

      <LoginForm callbackUrl={callbackUrl} />

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        New here?{" "}
        <Link
          href="/register"
          className="font-semibold text-[var(--color-primary)] hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
