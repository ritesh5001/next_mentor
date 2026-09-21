import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  MessageSquareText,
  Palette,
  PlayCircle,
  Sparkles,
  Target,
} from "lucide-react";

/**
 * The three skill packs sold on the homepage.
 *
 * Each pack is a marketing view over an existing plan — `slug` is the plan's
 * slug, so checkout, pricing and access all run through the plan the backend
 * already knows about. `fallbackPriceInPaise` only shows if the plans API is
 * unreachable; the live plan price wins whenever it is available.
 */
export type PackCourse = {
  title: string;
  summary: string;
  icon: LucideIcon;
  topics: string[];
};

export type Pack = {
  slug: string;
  name: string;
  /** Short word printed on the box art. */
  boxLabel: string;
  /** Line on the box's bottom band. */
  boxBand: string;
  tagline: string;
  fallbackPriceInPaise: number;
  courses: PackCourse[];
};

export const PACKS: Pack[] = [
  {
    slug: "starter",
    name: "Starter",
    boxLabel: "STARTER",
    boxBand: "Lead Generation",
    tagline: "Run your first ads and turn them into WhatsApp leads that actually reply.",
    fallbackPriceInPaise: 99_900,
    courses: [
      {
        title: "Ads & WhatsApp Lead Generation",
        summary:
          "Set up a campaign, send the clicks to WhatsApp, and follow up until a lead becomes a paying client.",
        icon: MessageSquareText,
        topics: [
          "Setting up a business account and ad account",
          "Click-to-WhatsApp campaigns, start to finish",
          "Writing ad copy and creatives that get replies",
          "Quick replies, labels and follow-up flows",
          "Reading results and cutting wasted spend",
        ],
      },
    ],
  },
  {
    slug: "pro",
    name: "Pro",
    boxLabel: "PRO",
    boxBand: "Performance Ads",
    tagline: "Run paid campaigns on the two biggest ad platforms, for yourself or for clients.",
    fallbackPriceInPaise: 499_900,
    courses: [
      {
        title: "Meta Ads",
        summary:
          "Plan, launch and scale Facebook and Instagram campaigns with a clear process for testing and budgets.",
        icon: Target,
        topics: [
          "Campaign structure and choosing the right objective",
          "Audiences, lookalikes and retargeting",
          "Creative testing without burning budget",
          "Pixel, events and tracking conversions",
          "Scaling winners and reporting to clients",
        ],
      },
      {
        title: "YouTube Ads",
        summary:
          "Get video ads in front of the right viewers and measure what they actually bring back.",
        icon: PlayCircle,
        topics: [
          "Setting up campaigns in Google Ads",
          "In-stream, in-feed and Shorts formats",
          "Targeting by intent, topic and audience",
          "Scripting a hook for the first five seconds",
          "Measuring views, clicks and conversions",
        ],
      },
    ],
  },
  {
    slug: "premium-pro",
    name: "Premium Pro",
    boxLabel: "PREMIUM",
    boxBand: "Creator Skills",
    tagline: "Edit video, design graphics and put AI to work — the skills clients pay for every week.",
    fallbackPriceInPaise: 999_900,
    courses: [
      {
        title: "Video Editing",
        summary:
          "Cut reels, shorts and long-form video on your phone or laptop, from raw clips to a finished edit.",
        icon: Clapperboard,
        topics: [
          "Cuts, pacing and story structure",
          "Text, captions and motion basics",
          "Colour, audio clean-up and music",
          "Editing reels and shorts for reach",
          "Exporting and delivering to clients",
        ],
      },
      {
        title: "AI Tools",
        summary:
          "Use AI assistants to research, write, plan and produce faster — and know where they fall short.",
        icon: Sparkles,
        topics: [
          "Writing prompts that give usable answers",
          "Scripts, captions and ad copy with AI",
          "AI for images, research and planning",
          "Building a repeatable AI workflow",
          "Checking and correcting AI output",
        ],
      },
      {
        title: "Graphics Design",
        summary:
          "Design posts, thumbnails and brand graphics that look professional, without a design degree.",
        icon: Palette,
        topics: [
          "Layout, typography and colour basics",
          "Social posts, carousels and thumbnails",
          "Simple brand kits for small businesses",
          "Templates you can reuse for clients",
          "Building a portfolio that wins work",
        ],
      },
    ],
  },
];

export const getPack = (slug: string) => PACKS.find((p) => p.slug === slug);

/** Live plans shaped for the signup form, with each pack's course names. */
export function toSignupPlans(
  plans: { slug: string; name: string; priceInPaise: number }[],
): { slug: string; name: string; priceInPaise: number; courses: string[] }[] {
  return plans.map((p) => ({
    slug: p.slug,
    name: p.name,
    priceInPaise: p.priceInPaise,
    courses: getPack(p.slug)?.courses.map((c) => c.title) ?? [],
  }));
}
