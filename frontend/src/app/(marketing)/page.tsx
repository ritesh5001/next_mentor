import type { Metadata } from "next";
import { envUrl } from "@nextmentor/shared";

import { getActivePlans, getCatalog } from "@/lib/queries";
import {
  WhyNextMentor,
  Hero,
  TrustBar,
  HowItWorks,
  WhatYouGet,
  EarnBand,
  Founder,
  ClosingCta,
} from "@/components/marketing/home-sections";
import {
  FeaturedCourses,
  Packages,
  Testimonials,
  Faq,
} from "@/components/marketing/home-sections-2";

export const metadata: Metadata = {
  title: "Learn the skill, freelance with confidence | NextMentor",
  description:
    "Practical, project-based courses that help you build in-demand skills, create real work, and start your freelancing journey.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Learn the skill, freelance with confidence | NextMentor",
    description:
      "Practical, project-based courses that help you build in-demand skills and start freelancing.",
    type: "website",
  },
};

export default async function HomePage() {
  // Both are cached public reads that fall back to an empty list, so a cold
  // API cannot take the homepage down with it.
  const [plans, courses] = await Promise.all([getActivePlans(), getCatalog()]);

  return (
    <>
      {/* Organisation markup so the brand is eligible for a knowledge panel. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "NextMentor",
            description:
              "Project-led courses in digital marketing, AI and design, with a referral program.",
            url: envUrl(process.env.NEXT_PUBLIC_APP_URL, "http://localhost:3000"),
          }),
        }}
      />

      {/* Section order is a funnel, not a list: what this is, how it works,
          what it costs, who runs it, whether to believe them, then the ask.
          The dark EarnBand sits in the middle to break a long light scroll. */}
      <Hero courses={courses} />
      <TrustBar />
      <WhyNextMentor />
      <FeaturedCourses courses={courses} />
      <HowItWorks />
      <EarnBand />
      <WhatYouGet />
      <Packages
        plans={plans.map((p) => ({
          slug: p.slug,
          name: p.name,
          tagline: p.tagline,
          priceInPaise: p.priceInPaise,
          mrpInPaise: p.mrpInPaise,
          durationDays: p.durationDays,
          features: p.features,
          isFeatured: p.isFeatured,
        }))}
      />
      <Founder />
      <Testimonials />
      <Faq />
      <ClosingCta />
    </>
  );
}
