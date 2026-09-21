"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Gift, Loader2, PartyPopper } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordField } from "@/components/ui/password-field";
import { signupCheckoutAction, signupStatusAction, type SignupInput } from "@/actions/auth";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { loadCheckoutScript } from "@/lib/use-razorpay-checkout";
import { INDIAN_STATES as STATES } from "@/lib/indian-states";


export type SignupPlan = { slug: string; name: string; priceInPaise: number; courses: string[] };

type Done = { email: string; name: string; confirmed: boolean };

/**
 * Paid signup, in one form: details, package, then Razorpay. No OTP — the
 * account is activated by the payment webhook, which emails the member ID and
 * password. Also used from the dashboard ("sponsor" mode) by a member creating
 * an account for someone else under their own referral.
 */
export function SignupForm({
  plans,
  initialPlan,
  referralCode,
  mode = "self",
}: {
  plans: SignupPlan[];
  initialPlan?: string;
  referralCode?: string;
  mode?: "self" | "sponsor";
}) {
  const sponsor = mode === "sponsor";
  const [plan, setPlan] = useState(
    plans.find((p) => p.slug === initialPlan)?.slug ?? plans[plans.length - 1]?.slug ?? "",
  );
  const [phase, setPhase] = useState<"idle" | "paying" | "confirming">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Done | null>(null);

  async function waitForActivation(orderId: string, info: Omit<Done, "confirmed">) {
    setPhase("confirming");
    for (let i = 0; i < 20; i++) {
      if ((await signupStatusAction(orderId)).paid) {
        setDone({ ...info, confirmed: true });
        return;
      }
      await new Promise((r) => setTimeout(r, 1500));
    }
    // Paid, but the webhook is slow: the email will still arrive.
    setDone({ ...info, confirmed: false });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (phase !== "idle") return;
    const f = new FormData(e.currentTarget);
    const input: SignupInput = {
      name: String(f.get("name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      email: String(f.get("email") ?? ""),
      state: String(f.get("state") ?? ""),
      password: String(f.get("password") ?? ""),
      confirmPassword: String(f.get("confirmPassword") ?? ""),
      acceptedTerms: f.get("acceptedTerms") === "on",
      planSlug: plan,
      referralCode: sponsor ? undefined : referralCode,
    };

    setError(null);
    setFields({});
    setPhase("paying");

    const res = await signupCheckoutAction(input);
    if (!res.ok) {
      const fieldErrors = res.fields ?? {};
      setError(Object.keys(fieldErrors).length ? "Please fix the highlighted fields." : res.error);
      setFields(fieldErrors);
      setPhase("idle");
      return;
    }

    const ready = await loadCheckoutScript();
    if (!ready || !window.Razorpay) {
      setError("Could not load the payment window. Check your connection and try again.");
      setPhase("idle");
      return;
    }

    const info = { email: res.data.prefill.email, name: res.data.prefill.name };
    new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
      order_id: res.data.razorpayOrderId,
      amount: res.data.amountInPaise,
      currency: res.data.currency,
      name: "NextMentor",
      description: res.data.itemTitle,
      prefill: res.data.prefill,
      theme: { color: "#1b3fa0" },
      handler: () => void waitForActivation(res.data.orderId, info),
      modal: { ondismiss: () => setPhase("idle") },
    }).open();
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[24px] bg-white p-7 text-center ring-1 ring-[rgb(16_26_71/0.08)]">
        <span className="flex size-16 items-center justify-center rounded-full bg-[linear-gradient(145deg,#12a150,#0b4a34)] text-white">
          <PartyPopper className="size-8" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <h2 className="text-[24px] font-bold tracking-[-0.5px] text-[var(--brand-ink)]">
          {sponsor ? `ID created for ${done.name.split(" ")[0]}!` : "Congratulations! Your ID is ready"}
        </h2>
        <p className="max-w-sm text-[15px] leading-[1.6] text-[var(--color-muted-foreground)]">
          {done.confirmed ? "Payment confirmed. " : "Payment received — activation takes a moment. "}
          The Member ID and password have been emailed to{" "}
          <strong className="text-[var(--brand-ink)]">{done.email}</strong>.
        </p>
        {sponsor ? (
          <Button onClick={() => { setDone(null); setPhase("idle"); }} className="mt-2">
            Create another account
          </Button>
        ) : (
          <Link
            href={`/login?callbackUrl=${encodeURIComponent("/dashboard")}`}
            className="mt-2 inline-flex min-h-12 items-center rounded-full bg-[var(--brand-blue)] px-7 text-[15px] font-semibold text-white"
          >
            Log in to your dashboard
          </Link>
        )}
      </div>
    );
  }

  const selected = plans.find((p) => p.slug === plan);

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-5" noValidate>
      {error && <Alert tone="error">{error}</Alert>}

      {!sponsor && referralCode && (
        <div className="flex items-center gap-2.5 rounded-[14px] bg-[#e5f2e3] px-4 py-3 text-sm text-[#0b4a34]">
          <Gift className="size-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
          Referral ID <strong className="font-semibold">{referralCode}</strong> applied
        </div>
      )}

      {/* Package */}
      {/* min-w-0: a fieldset defaults to min-content width and would push the
          page sideways on a phone. */}
      <fieldset className="flex min-w-0 flex-col gap-2">
        <legend className="mb-2 text-sm font-medium text-[var(--color-foreground)]">
          Choose a package <span className="text-[var(--color-destructive)]">*</span>
        </legend>
        {plans.map((p) => {
          const active = p.slug === plan;
          return (
            <label
              key={p.slug}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-[14px] px-4 py-3 ring-1 transition-colors",
                active
                  ? "bg-[var(--brand-hero-wash)] ring-2 ring-[var(--brand-blue)]"
                  : "bg-white ring-[rgb(16_26_71/0.1)] hover:ring-[rgb(16_26_71/0.2)]",
              )}
            >
              <input
                type="radio"
                name="plan"
                value={p.slug}
                checked={active}
                onChange={() => setPlan(p.slug)}
                className="size-4 accent-[var(--brand-blue)]"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-[var(--brand-ink)]">{p.name}</span>
                {p.courses.length > 0 && (
                  <span className="block truncate text-[12.5px] text-[var(--color-muted-foreground)]">
                    {p.courses.join(" · ")}
                  </span>
                )}
              </span>
              <span className="tabular text-[15px] font-semibold text-[var(--brand-ink)]">
                {formatPrice(p.priceInPaise)}
              </span>
            </label>
          );
        })}
      </fieldset>

      <Field label="Full name" name="name" required autoComplete="name" placeholder="Full name" error={fields.name} />
      <Field
        label="Contact number"
        name="phone"
        type="tel"
        inputMode="numeric"
        required
        autoComplete="tel-national"
        placeholder="10-digit mobile number"
        maxLength={14}
        error={fields.phone}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        inputMode="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        hint={sponsor ? "Their Member ID and password are emailed here." : "Your Member ID and password are emailed here."}
        error={fields.email}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="state" className="text-sm font-medium text-[var(--color-foreground)]">
          State <span className="text-[var(--color-destructive)]">*</span>
        </label>
        <select
          id="state"
          name="state"
          required
          defaultValue=""
          aria-invalid={fields.state ? true : undefined}
          className={cn(
            "min-h-11 rounded-[var(--radius-control)] border bg-[var(--color-card)] px-3 text-[16px] text-[var(--color-foreground)]",
            fields.state ? "border-[var(--color-destructive)]" : "border-[var(--color-border)]",
          )}
        >
          <option value="" disabled>
            Select state
          </option>
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {fields.state && (
          <p role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
            {fields.state}
          </p>
        )}
      </div>

      <PasswordField
        label="Password"
        name="password"
        required
        autoComplete="new-password"
        placeholder="••••••••"
        hint="At least 8 characters, with an uppercase letter and a number."
        error={fields.password}
      />
      <PasswordField
        label="Confirm password"
        name="confirmPassword"
        required
        autoComplete="new-password"
        placeholder="••••••••"
        error={fields.confirmPassword}
      />

      <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-[var(--color-muted-foreground)]">
        <input
          type="checkbox"
          name="acceptedTerms"
          required
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--brand-blue)]"
        />
        <span>
          I accept the{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--brand-blue)] underline underline-offset-2">
            Terms &amp; Conditions
          </a>
          ,{" "}
          <a href="/refund" target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--brand-blue)] underline underline-offset-2">
            Refund Policy
          </a>{" "}
          and{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--brand-blue)] underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {fields.acceptedTerms && (
        <p role="alert" className="-mt-3 text-xs font-medium text-[var(--color-destructive)]">
          {fields.acceptedTerms}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={phase !== "idle"}>
        {phase === "idle" ? (
          <>
            <CheckCircle2 className="size-4" strokeWidth={2} aria-hidden="true" />
            Create ID &amp; pay {selected ? formatPrice(selected.priceInPaise) : ""}
          </>
        ) : (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {phase === "paying" ? "Opening payment…" : "Confirming payment…"}
          </>
        )}
      </Button>
      <p className="-mt-2 text-center text-xs text-[var(--color-muted-foreground)]">
        The ID is created only after the payment succeeds. Secure payment via Razorpay.
      </p>
    </form>
  );
}
