import type { Metadata } from "next";
import { envUrl } from "@nextmentor/shared";

import { getActivePlans, getCatalog, getTestimonials } from "@/lib/queries";
import { Hero, TrustBar } from "@/components/marketing/home-sections";
import {
  HowItWorks,
  WhyChooseUs,
  Roadmap,
  Founder,
  Trainers,
  StudentFeedback,
  EarnBand,
  ClosingCta,
} from "@/components/marketing/home-sections-3";
import { Faq } from "@/components/marketing/faq";
import { SkillsCarousel } from "@/components/marketing/skills-carousel";
import { PackShowcase } from "@/components/marketing/pack-showcase";

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
  const [plans, courses, testimonials] = await Promise.all([
    getActivePlans(),
    getCatalog(),
    getTestimonials(),
  ]);

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
          Backgrounds alternate navy / green / white / wash from one palette. */}
      <Hero courses={courses} />
      <TrustBar />
      <SkillsCarousel />
      <PackShowcase prices={Object.fromEntries(plans.map((p) => [p.slug, p.priceInPaise]))} />
      <HowItWorks />
      <WhyChooseUs />
      <Roadmap />
      <Founder />
      <Trainers />
      <StudentFeedback items={testimonials} />
      <EarnBand
        rates={plans
          .filter((p) => p.commissionRateBps > 0)
          .sort((x, y) => x.commissionRateBps - y.commissionRateBps)
          .map((p) => ({ name: p.name, rateBps: p.commissionRateBps }))}
      />
      <Faq />
      <ClosingCta />
    </>
  );
}
