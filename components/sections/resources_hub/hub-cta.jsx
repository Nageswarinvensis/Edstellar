import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";
import { SECTION_WIDTH } from "@/components/common/section-head";

/**
 * Closing panel on navy — "Ready to go beyond free resources?", the enquiry
 * button and two text links, under a slowly pulsing lime glow.
 *
 * Design: Learning_Development_Resources `.cta`.
 */
export default function HubCta({ data }) {
  if (!data?.heading) return null;

  return (
    <Section
      aria-label="Work with Edstellar"
      className="relative overflow-hidden bg-navy py-18 text-paper before:pointer-events-none before:absolute before:-top-45 before:-right-35 before:size-130 before:rounded-full before:bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-lime)_22%,transparent),transparent_70%)] before:content-[''] motion-safe:before:animate-[pulse_4s_ease-in-out_infinite] sm:py-23"
      innerClassName={SECTION_WIDTH}
    >
      <Box className="relative grid items-center gap-12 min-[861px]:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <RichHeading as="h2" heading={data.heading} className="text-paper" emphasisClassName="font-normal text-lime" />
          {data.description ? (
            <Text as="p" className="mt-4.5 max-w-[60ch] text-[17px] leading-[1.75] text-paper/72">
              {data.description}
            </Text>
          ) : null}
        </Reveal>
        <Reveal delay={1} className="flex flex-col items-start gap-3">
          {data.primary_cta?.href ? (
            <CtaButton color="lime" arrow render={<Link href={data.primary_cta.href} />}>
              {data.primary_cta.label}
            </CtaButton>
          ) : null}
          {data.links?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={`Click Here to ${link.label}`}
              className="border-b border-paper/12 text-[14px] text-paper/72 transition-colors duration-200 hover:border-lime hover:text-lime"
            >
              {link.label}
            </Link>
          ))}
        </Reveal>
      </Box>
    </Section>
  );
}
