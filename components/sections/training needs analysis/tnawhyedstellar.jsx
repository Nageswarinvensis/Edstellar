import { Merge, LayoutGrid, ShieldCheck } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

const ICONS = {
  merge: Merge,
  grid: LayoutGrid,
  shield: ShieldCheck,
};

export default function TnaWhyEdstellar({ data }) {
  if (!data) return null;

  const { sectionId, heading, subtitle, items } = data;

  return (
    <Section id={sectionId} className="bg-white border-b border-t-[#0a16281f]">
      <Box className="mb-10 max-w-[62ch]">
        <Reveal>
          <RichHeading heading={heading} />
        </Reveal>

        {subtitle && (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 text-[16px] leading-relaxed text-ink/70">
              {subtitle}
            </Text>
          </Reveal>
        )}
      </Box>

      <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item, index) => {
          const Icon = ICONS[item.icon] || Merge;

          return (
            <Reveal key={item.title} delay={Math.min(index + 2, 4)}>
              <Box className="h-full rounded-2xl border border-ink/12 bg-paper-warm px-6 py-6">
                <Box className="grid size-10 place-items-center rounded-full bg-lime text-ink">
                  <Icon size={19} strokeWidth={2} aria-hidden="true" />
                </Box>

                <Text as="h3" className="mt-4 text-[16px] font-bold text-ink">
                  {item.title}
                </Text>

                <Text as="p" className="mt-2 text-[14px] leading-relaxed text-ink/70">
                  {item.description}
                </Text>
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
