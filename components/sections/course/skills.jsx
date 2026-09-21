import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * Course skills — a two-column ticked checklist, one row per capability.
 * No interaction: a static list reads better here than a click-to-reveal
 * card, and it's what the approved design shows.
 *
 * Design: `#skills`, `.eds-skl-list`, `.eds-skl-item`.
 */
export default function Skills({ skills }) {
  if (!skills?.items?.length) return null;

  return (
    <Section
      id="skills"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10"
    >
      <Reveal delay={1}>
        <RichHeading heading={skills.heading} className="mb-3.5 max-w-[20ch]" />
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-6.5 max-w-[62ch] text-[16.5px] leading-[1.7] text-ink/60"
        >
          {skills.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Box
          as="ul"
          className="grid grid-cols-1 gap-x-13 min-[860px]:grid-flow-col min-[860px]:grid-cols-2 min-[860px]:grid-rows-4"
        >
          {skills.items.map((item) => (
            <Box
              as="li"
              key={item.title}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.25 border-t border-ink/12 py-3.75"
            >
              <Box className="row-span-2 mt-0.75 grid size-4.25 flex-none place-items-center rounded-[6px] bg-lime-soft text-[#4d6208]">
                <Check size={10} strokeWidth={3} aria-hidden="true" />
              </Box>
              <Text
                as="p"
                className="text-[15px] font-semibold tracking-[-0.015em] text-ink min-[860px]:text-[16.5px]"
              >
                {item.title}
              </Text>
              <Text as="p" className="text-[13.5px] leading-[1.55] text-ink/60">
                {item.description}
              </Text>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
