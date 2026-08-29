"use client";

import { useTransition } from "react";
import { signIn } from "next-auth/react";

import { Button } from "./button";

/** Google's official mark. Do not recolour it — brand guidelines forbid it. */
function GoogleMark() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.06 12.25c0-.85-.08-1.67-.22-2.45H12v4.64h6.2a5.3 5.3 0 0 1-2.3 3.48v2.9h3.72c2.18-2 3.44-4.96 3.44-8.57Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.11 0 5.72-1.03 7.62-2.79l-3.72-2.89c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.54-2.02-6.45-4.75H1.7v2.98A11.5 11.5 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.55 14.67a6.9 6.9 0 0 1 0-4.4V7.29H1.7a11.5 11.5 0 0 0 0 10.36l3.85-2.98Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.69 0 3.21.58 4.4 1.72l3.3-3.3C17.71 1.2 15.1 0 12 0 7.44 0 3.5 2.6 1.7 6.4l3.85 2.98c.91-2.73 3.45-4.63 6.45-4.63Z"
      />
    </svg>
  );
}

export function GoogleButton({
  callbackUrl,
  label = "Continue with Google",
}: {
  callbackUrl: string;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      loading={pending}
      className="w-full"
      onClick={() => startTransition(() => void signIn("google", { callbackUrl }))}
    >
      {!pending && <GoogleMark />}
      {label}
    </Button>
  );
}
