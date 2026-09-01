import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the NextMentor team.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact details.
 *
 * Deliberately real links rather than a form: a form needs somewhere to send
 * mail and a spam defence, and a mailto that works today beats a form that
 * silently drops messages. Swap in a form once the inbox is settled.
 */
const CHANNELS = [
  {
    Icon: Mail,
    label: "Email",
    value: "hello@nextmentor.in",
    href: "mailto:hello@nextmentor.in",
    note: "Best for course, billing and payout questions. We reply within a working day.",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+91 12345 67890",
    href: "tel:+911234567890",
    note: "Monday to Saturday, 10am – 7pm IST.",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 12345 67890",
    href: "https://wa.me/911234567890",
    note: "Quick questions and support for existing students.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--brand-ink)] sm:text-4xl">
        Contact <span className="brand-gradient-text">us</span>
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--color-muted-foreground)]">
        Questions about a course, a payment or the affiliate programme? Reach us
        any of these ways.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {CHANNELS.map(({ Icon, label, value, href, note }) => (
          <li
            key={label}
            className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5"
          >
            <Icon
              className="size-5 text-[var(--brand-blue)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              {label}
            </span>
            <a href={href} className="font-bold hover:text-[var(--brand-blue)]">
              {value}
            </a>
            <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">{note}</p>
          </li>
        ))}

        <li className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
          <MapPin className="size-5 text-[var(--brand-blue)]" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            Address
          </span>
          <span className="font-bold">India</span>
          <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            Replace with your registered business address — Razorpay requires it
            for merchant verification.
          </p>
        </li>
      </ul>
    </div>
  );
}
