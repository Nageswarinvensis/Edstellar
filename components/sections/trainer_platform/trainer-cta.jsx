import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import RichHeading from "@/components/common/rich-heading";
import { SECTION_WIDTH } from "@/components/common/section-head";

/**
 * Closing panel — "Strengthen your career prospects", the join CTA, and a
 * "Reach Us" card of email and phone links, on a navy panel ringed with
 * faint lime circles.
 *
 * Design: Join as a Trainer `.final`, `.panel`, `.reach`.
 */
export default function TrainerCta({ data }) {
  if (!data) return null;
  const links = data.reach?.links ?? [];

  return (
    <Section className="pt-0 pb-17 sm:pb-24 lg:pt-0 lg:pb-24" innerClassName={SECTION_WIDTH}>
      <Reveal className="relative grid items-center gap-12 overflow-hidden rounded-[22px] bg-navy px-6 py-10 text-paper before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-lime before:content-[''] after:pointer-events-none after:absolute after:-right-30 after:-bottom-40 after:size-105 after:rounded-full after:border after:border-lime/18 after:shadow-[0_0_0_60px_rgba(200,241,53,0.04),0_0_0_120px_rgba(200,241,53,0.025)] after:content-[''] min-[901px]:grid-cols-[1.2fr_0.8fr] min-[901px]:px-14 min-[901px]:py-15">
        <Box className="relative z-1">
          <RichHeading
            as="h2"
            heading={data.heading}
            className="text-paper"
            emphasisClassName="font-normal text-lime"
          />
          {data.description ? (
            <Text as="p" className="mt-4 mb-7.5 max-w-[48ch] text-[16.5px] leading-[1.7] text-paper/72">
              {data.description}
            </Text>
          ) : null}
          {data.cta?.href ? (
            <CtaButton color="lime" arrow render={<a href={data.cta.href} />}>
              {data.cta.label}
            </CtaButton>
          ) : null}
        </Box>

        {links.length ? (
          <Box className="relative z-1 rounded-[18px] border border-paper/12 bg-paper/4 p-6.5">
            <Text as="p" className="mb-3.5 font-mono text-[10px] leading-[1.5] tracking-[0.2em] text-lime uppercase">
              {data.reach.label}
            </Text>
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                title={`Click Here to Contact Edstellar (${link.tag})`}
                className={`flex items-center justify-between gap-3 py-3 text-[15px] text-paper transition-colors duration-200 hover:text-lime ${index > 0 ? "border-t border-paper/12" : ""}`}
              >
                {link.label}
                <Text as="span" className="font-mono text-[10.5px] leading-none tracking-[0.14em] text-paper/50 uppercase">
                  {link.tag}
                </Text>
              </a>
            ))}
          </Box>
        ) : null}
      </Reveal>
    </Section>
  );
}
