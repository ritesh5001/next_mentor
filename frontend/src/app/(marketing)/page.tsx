import type { Metadata } from "next";
import { envUrl } from "@nextmentor/shared";
import { getActivePlans } from "@/lib/queries";

import {
  Hero,
  FeatureStrip,
  Stats,
  WhyChooseUs,
} from "@/components/marketing/home-sections";
import {
  Packages,
  Founders,
  Instructors,
  FeaturedTraining,
  Testimonials,
  SkillsCloud,
  Faq,
  Newsletter,
} from "@/components/marketing/home-sections-2";

export const metadata: Metadata = {
  title: "NextMentor — Learn, Create, Monetize",
  description:
    "Master AI, freelancing and design with practical, project-led learning. Zero fluff — only skills that get you paid.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "NextMentor — Learn, Create, Monetize",
    description:
      "Practical, project-led courses in marketing, AI and design. Learn the skill, then earn from it.",
    type: "website",
  },
};

export default async function HomePage() {
  const plans = await getActivePlans();

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
              "Practical, project-led courses in digital marketing, AI and design.",
            url: envUrl(process.env.NEXT_PUBLIC_APP_URL, "http://localhost:3000"),
          }),
        }}
      />

      <Hero />
      <FeatureStrip />
      <Stats />
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
      <WhyChooseUs />
      <Founders />
      <Instructors />
      <FeaturedTraining />
      <Testimonials />
      <SkillsCloud />
      <Faq />
      <Newsletter />
    </>
  );
}
