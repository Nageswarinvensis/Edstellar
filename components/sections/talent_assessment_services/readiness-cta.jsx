import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { newTabProps } from "@/lib/links";

/**
 * Dark, centered band pointing to the live readiness-check tool, with the five
 * maturity levels shown as chips.
 *
 * Reads the CMS `why_cta_banner` shape (`Points`, `description`, `primary_cta`)
 * and the local shape (`dims`, `lede`, `cta`) interchangeably — no adapter layer
 * (TASTE.md §5.4).
 *
 * Design: `#maturity`, `.mat`, `.mat-dims`.
 */
export default function ReadinessCta({ data }) {
  if (!data) return null;

  const { section_id, heading } = data;
  const lede = data.lede ?? data.description;
  const dims = data.dims ?? data.Points;
  const cta = data.cta ?? data.primary_cta;
  if (!cta?.href) return null;

  return (
    <Section id={section_id} className="bg-navy">
      <Box className="mx-auto max-w-160 text-center">
        <Reveal>
          <RichHeading
            heading={heading}
            className="mx-auto text-paper"
            emphasisClassName="font-normal text-lime"
          />
        </Reveal>
        {lede ? (
          <Reveal delay={1}>
            <Text as="p" className="mx-auto mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/60">
              {lede}
            </Text>
          </Reveal>
        ) : null}

        {dims?.length ? (
          <Reveal delay={2}>
            <Box className="mt-6.5 mb-7.5 flex flex-wrap justify-center gap-2.25">
              {dims.map((dim) => (
                <Text
                  as="span"
                  key={dim}
                  className="rounded-full border border-paper/14 bg-navy-soft px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.05em] text-paper"
                >
                  {dim}
                </Text>
              ))}
            </Box>
          </Reveal>
        ) : null}

        <Reveal delay={3}>
          <CtaButton color="lime" arrow render={<Link href={cta.href} {...newTabProps(cta.href)} />} className="focus-visible:outline-lime">
            {cta.label}
          </CtaButton>
        </Reveal>
      </Box>
    </Section>
  );
}
