import type { Metadata } from "next";
import { envUrl } from "@nextmentor/shared";

import { getActivePlans, getCatalog } from "@/lib/queries";
import {
  Hero,
  HowItWorks,
  WhatYouGet,
  EarnBand,
  People,
  ClosingCta,
} from "@/components/marketing/home-sections";
import {
  FeaturedCourses,
  Packages,
  Founders,
  Testimonials,
  Faq,
  Newsletter,
} from "@/components/marketing/home-sections-2";

export const metadata: Metadata = {
  title: "Learn the skill, then get paid for it | NextMentor",
  description:
    "Short, project-led courses in marketing, AI and design. Finish with something you built, a certificate anyone can check, and a referral link that pays.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Learn the skill, then get paid for it | NextMentor",
    description:
      "Project-led courses in marketing, AI and design. Learn the skill, then earn from it.",
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
      <Hero courseCount={courses.length} />
      <HowItWorks />
      <FeaturedCourses courses={courses} />
      <WhatYouGet />
      <EarnBand />
      <Packages
        plans={plans.map((p) => ({
          slug: p.slug,
          name: p.name,
          tagline: p.tagline,
          priceInPaise: p.priceInPaise,
          mrpInPaise: p.mrpInPaise,
          features: p.features,
          isFeatured: p.isFeatured,
        }))}
      />
      <People />
      <Founders />
      <Testimonials />
      <Faq />
      <Newsletter />
      <ClosingCta />
    </>
  );
}
