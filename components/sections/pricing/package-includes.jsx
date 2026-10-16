import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_WIDTH, SECTION_PADDING } from "@/components/common/section-head";

/**
 * "What every package includes" — a ruled three-column checklist.
 *
 * Design: corporate-training-pricing-v2 `#included`, `.inc`.
 */
export default function PackageIncludes({ data }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section id="included" className={SECTION_PADDING} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} />

      <Reveal>
        <Box as="ul" className="grid list-none border-t border-ink/12 min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
          {items.map((item) => (
            <Box
              as="li"
              key={item}
              className="flex items-center gap-3.5 border-b border-ink/12 px-2 py-5 font-display text-[16px] leading-[1.4] font-semibold tracking-[-0.015em] text-ink"
            >
              <Box aria-hidden="true" className="grid size-7 flex-none place-items-center rounded-full bg-navy text-lime">
                <Check size={14} strokeWidth={2.5} />
              </Box>
              {item}
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
