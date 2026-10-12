import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * "Where the evidence goes next" — a grid of cross-links to the sibling services
 * that pick up where assessment findings leave off (TNA, training, coaching, OD,
 * L&D).
 *
 * Design: `#related`, `.rel-grid`, `.rel`.
 */
export default function RelatedLinks({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, items } = data;
  // CMS `relatedServices` sends the lede as `Description` and the per-card label
  // as `link`; local content uses `lede` and `cta`. Read both (TASTE.md §5.4).
  const lede = data.lede ?? data.Description;

  return (
    <Section id={section_id} className="bg-paper-warm">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {lede ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
              {lede}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={Math.min((index % 3) + 1, 4)}>
            <Box
              as={Link}
              href={item.href}
              title={`Click Here to View ${item.title}`}
              className="group flex h-full flex-col rounded-2xl border border-ink/12 bg-white p-8 no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              {item.kicker ? (
                <Text as="span" className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60">
                  {item.kicker}
                </Text>
              ) : null}
              <Text as="h3" className="mt-2 mb-2 font-display text-[18px] font-bold leading-[1.3] text-ink">
                {item.title}
              </Text>
              <Text as="p" className="mb-6 text-[15px] leading-[1.5] text-ink/60">
                {item.description}
              </Text>
              <Text
                as="span"
                className="mt-auto inline-flex items-center gap-2 text-[14px] font-semibold text-ink"
              >
                {item.cta ?? item.link}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
