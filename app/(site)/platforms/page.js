import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";
import SchemaOrg from "@/components/seo/schema-org";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Platforms",
  description:
    "Edstellar's technology platforms: Orbit 360-degree feedback, Spectra LMS, Polaris Team Effectiveness, Meridian 1:1 coaching and the TNA/TNI Engine.",
  path: "/platforms",
});

const PLATFORMS = [
  {
    slug: "orbit",
    name: "Orbit",
    tagline: "AI-Empowered 360-Degree Feedback",
    description:
      "Anonymous multi-rater surveys, AI-drafted reports reviewed by Edstellar consultants, development plans and recurring 360 series with trend tracking.",
    cta: "Learn about Orbit",
    badge: "360 Feedback",
  },
  {
    slug: "spectra-lms",
    name: "Spectra LMS",
    tagline: "Enterprise Learning Management",
    description:
      "One enterprise LMS for courses, SCORM, live training, learning paths, surveys and AI insights, backed by Edstellar's training and consulting services.",
    cta: "Explore Spectra LMS",
    badge: "LMS",
  },
  {
    slug: "polaris",
    name: "Polaris",
    tagline: "Team Effectiveness Suite",
    description:
      "In one facilitated session, your leadership team brings its untold issues into the open, discusses them honestly and commits to change in a Compact every member affirms.",
    cta: "Discover Polaris",
    badge: "Team Effectiveness",
  },
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "1:1 Leadership Coaching for Cohorts",
    description:
      "Run individual coaching for a group of 20 to 50 leaders as one program. Each leader works 1:1 with an independent coach, matched to their needs, with Edstellar as your one partner.",
    cta: "Explore Meridian",
    badge: "Leadership Coaching",
  },
  {
    slug: "tna-tni-engine",
    name: "TNA/TNI Engine",
    tagline: "Training Needs Analysis Tool",
    description:
      "The full TNA/TNI cycle in one platform — from employee data and four-source validation to a prioritized training roadmap, calendar and individual development plans.",
    cta: "Discover TNA/TNI Engine",
    badge: "Training Needs Analysis",
  },
];

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Platforms", href: null },
];

export default function PlatformsPage() {
  return (
    <>
      <SchemaOrg
        webpage={{
          name: "Platforms",
          description:
            "Edstellar's technology platforms: Orbit 360-degree feedback, Spectra LMS, Polaris Team Effectiveness, Meridian 1:1 coaching and the TNA/TNI Engine.",
          path: "/platforms",
        }}
        breadcrumbs={BREADCRUMBS}
      />

      {/* Hero */}
      <Section
        aria-labelledby="platforms-hero-h"
        className="bg-navy py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <Text
            as="span"
            className="font-mono text-[11px] tracking-widest text-lime/70 uppercase"
          >
            Edstellar Platforms
          </Text>
        </Reveal>
        <Reveal delay={2}>
          <RichHeading
            as="h1"
            id="platforms-hero-h"
            heading="Purpose-built tools for <span>people development.</span>"
            className="mt-4 max-w-[22ch] text-white"
            emphasisClassName="text-lime"
          />
        </Reveal>
        <Reveal delay={3}>
          <Text
            as="p"
            className="mt-5 max-w-[56ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-white/72"
          >
            Five platforms &mdash; 360-degree feedback, enterprise LMS, team effectiveness,
            leadership coaching and training needs analysis &mdash; all backed by
            Edstellar&rsquo;s consultants and trainers.
          </Text>
        </Reveal>
      </Section>

      {/* Platform cards */}
      <Section
        aria-label="Platform listing"
        className="bg-paper py-16 lg:py-24"
      >
        <Box className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((platform, i) => (
            <Reveal key={platform.slug} delay={i + 1}>
              <Box className="flex h-full flex-col rounded-2xl border border-ink/12 bg-white p-7 shadow-[0_1px_2px_rgba(10,22,40,.07),0_8px_24px_rgba(10,22,40,.07)]">
                {/* Badge */}
                <Text
                  as="span"
                  className="inline-block rounded-full border border-ink/15 px-3 py-1 font-mono text-[10px] tracking-widest text-ink/50 uppercase"
                >
                  {platform.badge}
                </Text>

                <Text as="h2" className="mt-5 text-ink">
                  {platform.name}
                </Text>
                <Text as="p" className="mt-1 text-[14px] font-medium text-ink/50">
                  {platform.tagline}
                </Text>

                <Text as="p" className="mt-4 flex-1 text-[15px] leading-[1.65] text-ink/60">
                  {platform.description}
                </Text>

                <Box className="mt-6 border-t border-ink/10 pt-5">
                  <CtaButton
                    variant="ghost"
                    arrow
                    render={<Link href={`/platforms/${platform.slug}`} />}
                    className="w-full justify-center"
                  >
                    {platform.cta}
                  </CtaButton>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>
    </>
  );
}
