import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";

/**
 * Dark mid-page conviction CTA — centred heading, lede and a primary plus a
 * secondary button, with optional tag items.
 */
export default function CtaBand({ data }) {
  if (!data?.heading) return null;

  const { tag, heading, description, items, primary_cta, secondary_cta } = data;

  return (
    <Section aria-label="Book a consultation" className="bg-navy">
      <Box className="mx-auto max-w-230 text-center">
        {/* Optional Subtitle Tag above heading */}
        {tag ? (
          <Reveal>
            <Text
              as="p"
              className="mb-3 font-mono text-[11px] font-medium tracking-[0.12em] text-lime uppercase"
            >
              {tag}
            </Text>
          </Reveal>
        ) : null}

        <Reveal>
          <RichHeading
            heading={heading}
            className="mx-auto mb-4 text-paper"
            emphasisClassName="font-normal text-lime"
          />
        </Reveal>

        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mx-auto mb-7 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/72"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}

        {/* Render Points/Pills when present in JSON */}
        {items?.length ? (
          <Reveal delay={1.5}>
            <Box className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {items.map((item, idx) => (
                <Text
                  key={idx}
                  as="span"
                  className="rounded-full border border-paper/15 bg-navy-soft px-3 py-2 font-mono text-[12px] font-medium tracking-wider text-paper/80 uppercase"
                >
                  {item}
                </Text>
              ))}
            </Box>
          </Reveal>
        ) : null}

        <Reveal delay={2}>
          <Box className="flex flex-wrap justify-center gap-3.5">
            {primary_cta?.href ? (
              <CtaButton
                color="lime"
                arrow
                render={<Link href={primary_cta.href} />}
                className="focus-visible:outline-lime"
              >
                {primary_cta.label}
              </CtaButton>
            ) : null}
            {secondary_cta?.href ? (
              <CtaButton
                variant="ghost"
                arrow
                render={<Link href={secondary_cta.href} />}
                className="border-paper/50 text-paper hover:border-paper hover:bg-paper/5 focus-visible:outline-lime"
              >
                {secondary_cta.label}
              </CtaButton>
            ) : null}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}