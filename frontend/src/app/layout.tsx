import type { Metadata, Viewport } from "next";
import { envUrl } from "@nextmentor/shared";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";

// Self-hosted by next/font — no render-blocking request to fonts.googleapis.com.
// Weights are limited to the five the design system actually uses; each extra
// weight is bytes on the critical path for no visual gain.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  // envUrl, not ??: an env var set to "" is not undefined, so ?? never fired
  // and new URL("") threw during the Vercel build.
  metadataBase: new URL(envUrl(process.env.NEXT_PUBLIC_APP_URL, "http://localhost:3000")),
  title: {
    default: "NextMentor — Learn digital skills that pay",
    template: "%s — NextMentor",
  },
  description:
    "Practical, project-led courses in digital marketing, AI and design. Learn from working practitioners and earn by sharing what works.",
  openGraph: {
    type: "website",
    siteName: "NextMentor",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Deliberately NOT setting maximumScale or userScalable — disabling zoom is
  // an accessibility failure.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--color-card)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
