import {
  Merge,
  LayoutGrid,
  ShieldCheck,
  Landmark,
  Monitor,
  Cross,
  Factory,
  ShoppingBag,
  Zap,
  Globe,
  ChartLine,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

const ICONS = {
  merge: Merge,
  grid: LayoutGrid,
  shield: ShieldCheck,
  chart: ChartLine,
};

const INDUSTRY_ICONS = {
  landmark: Landmark,
  monitor: Monitor,
  cross: Cross,
  factory: Factory,
  bag: ShoppingBag,
  zap: Zap,
};

const PILL_MONO = "font-mono leading-[1.7] uppercase";

function TrustStrip({ trust }) {
  return (
    <Box className="mt-14 border-t border-ink/12 pt-11 text-center">
      <Text
        as="p"
        className="mb-[26px] font-display text-[22px] leading-[1.7] font-bold tracking-[-0.01em] text-ink"
      >
        {trust.heading}
      </Text>

      <Box className="mx-auto flex max-w-[1000px] flex-wrap justify-center gap-2.5">
        {trust.industries?.map((industry) => {
          const Icon = INDUSTRY_ICONS[industry.icon] || Globe;
          return (
            <Text
              key={industry.label}
              as="span"
              className="inline-flex items-center gap-[9px] rounded-full border border-ink/12 bg-white py-2 pr-4 pl-2 text-[13px] leading-[1.7] font-semibold text-ink"
            >
              <Box
                as="span"
                className="grid size-[30px] flex-none place-items-center rounded-full bg-lime-soft text-navy"
              >
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
              </Box>
              {industry.label}
            </Text>
          );
        })}
        {trust.more_label ? (
          <Text
            as="span"
            className={`${PILL_MONO} inline-flex items-center rounded-full bg-navy px-4 py-2 text-[11px] font-medium tracking-[0.06em] text-lime`}
          >
            {trust.more_label}
          </Text>
        ) : null}
      </Box>

      {trust.regions?.length ? (
        <Box className="mx-auto mt-6 flex max-w-[900px] flex-wrap items-center justify-center gap-2">
          <Globe size={18} strokeWidth={1.7} className="text-navy" aria-hidden="true" />
          <Text
            as="span"
            className={`${PILL_MONO} mr-1 text-[10px] tracking-[0.1em] text-ink/60`}
          >
            {trust.regions_label}
          </Text>
          {trust.regions.map((region) => (
            <Text
              key={region}
              as="span"
              className={`${PILL_MONO} rounded-full bg-lime-soft px-[15px] py-[7px] text-[11px] font-medium tracking-[0.06em] text-ink`}
            >
              {region}
            </Text>
          ))}
        </Box>
      ) : null}

      {trust.caption ? (
        <Text as="p" className="mt-[22px] text-center text-[14px] leading-[1.7] text-ink/60">
          <Box as="strong" className="font-bold text-ink">
            {trust.caption_strong}
          </Box>{" "}
          {trust.caption}
        </Text>
      ) : null}
    </Box>
  );
}

export default function TnaWhyEdstellar({ data }) {
  if (!data) return null;

  const { sectionId, heading, subtitle, items, trust } = data;

  return (
    <Section id={sectionId} className="bg-white border-b border-t-[#0a16281f]">
      <Box className="mb-10 max-w-[62ch]">
        <Reveal>
          <RichHeading heading={heading} />
        </Reveal>

        {subtitle && (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink/70">
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

      {trust ? <TrustStrip trust={trust} /> : null}
    </Section>
  );
}
