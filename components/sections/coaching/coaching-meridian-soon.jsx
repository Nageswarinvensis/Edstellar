import Link from "next/link";
import { Sparkles } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";

/**
 * Team-coaching-only "Meridian coming soon" band.
 *
 * Replaces MeridianShowcase on the team coaching page because team sessions
 * on Meridian are not yet live. Dark navy section, lime "COMING SOON" pill,
 * heading + lede on the left, two CTAs on the right.
 */
export default function CoachingMeridianSoon({ data }) {
  if (!data?.heading) return null;

  const { section_id, heading, description, primary_cta, secondary_cta } = data;

  return (
    <Box
      as="section"
      id={section_id ?? "meridian"}
      aria-labelledby="mer-soon-h"
      className="bg-navy px-5 py-16 lg:px-10"
    >
      <Box className="mx-auto max-w-7xl">
        <Reveal>
          <Box
            as="span"
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-navy"
          >
            <Sparkles size={14} aria-hidden="true" />
            Coming soon
          </Box>
        </Reveal>

        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="mer-soon-h"
            heading={heading}
            className="mt-0 text-paper"
            emphasisClassName="font-serif italic font-normal"
          />
        </Reveal>

        {description ? (
          <Reveal delay={2}>
            <Text as="p" className="mt-3.5 max-w-[60ch] text-[clamp(15px,1.1vw,17px)] leading-[1.7] text-paper/65">
              {description}
            </Text>
          </Reveal>
        ) : null}

        {/* CTAs below description, left-aligned */}
        <Reveal delay={3}>
          <Box className="mt-8 flex flex-wrap gap-4">
            {primary_cta?.href ? (
              <CtaButton color="lime" arrow render={<Link href={primary_cta.href} />} className="px-7 py-4">
                {primary_cta.label}
              </CtaButton>
            ) : null}
            {secondary_cta?.href ? (
              <CtaButton arrow
                variant="secondary"
                render={<Link href={secondary_cta.href} />}
                className="border-[1.5px] border-paper/40 px-7 py-4 text-paper hover:-translate-y-0.5 hover:bg-transparent hover:shadow-lift"
              >
                {secondary_cta.label}
              </CtaButton>
            ) : null}
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
