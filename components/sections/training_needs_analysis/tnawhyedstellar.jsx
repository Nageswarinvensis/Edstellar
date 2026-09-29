import { Link2, Cpu, ShieldCheck, ChartLine } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { TrustStrip } from "@/components/sections/consulting/trust-strip";

// Keys are the CMS's `icon` values, read verbatim.
const ICONS = {
  merge: Link2,
  grid: Cpu,
  shield: ShieldCheck,
  chart: ChartLine,
};

export default function TnaWhyEdstellar({ id, data }) {
  if (!data) return null;

  const { heading, subtitle, items, trust } = data;

  return (
    <Section id={id} className="border-t border-ink/12 bg-paper">
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          <RichHeading
            heading={heading}
            className="text-[clamp(32px,4vw,40px)] leading-[1.08] hyphens-none"
            emphasisClassName="font-normal"
          />
        </Reveal>

        {subtitle && (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60 hyphens-none">
              {subtitle}
            </Text>
          </Reveal>
        )}
      </Box>

      <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item, index) => {
          const Icon = ICONS[item.icon] || Link2;

          return (
            <Reveal key={item.title} delay={Math.min(index + 2, 4)}>
              <Box className="h-full rounded-[14px] border border-ink/12 bg-white p-7 transition-[translate,box-shadow] duration-250 hover:-translate-y-[5px] hover:shadow-lift motion-reduce:hover:translate-y-0">
                <Box className="mb-4 grid size-[42px] place-items-center rounded-[11px] bg-lime-soft text-navy">
                  <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                </Box>

                <Text
                  as="h3"
                  className="mb-2 text-[16px] leading-[1.3] font-bold tracking-[-0.01em] text-ink hyphens-none"
                >
                  {item.title}
                </Text>

                <Text as="p" className="text-[14px] leading-[1.6] text-ink/60 hyphens-none">
                  {item.description}
                </Text>
              </Box>
            </Reveal>
          );
        })}
      </Box>

      {trust ? <TrustStrip trust={trust} /> : null}
    </Section>
  );
}
