import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

// Descending navy tints so the four adjacent segments stay distinguishable
// (the design draws them all in navy, separated only by gaps).
const SEG_FILL = ["fill-navy", "fill-navy/70", "fill-navy/45", "fill-navy/25"];

/** Clients by headquarters region — a donut and a ranked bar list. The donut
 * geometry is copied verbatim from the approved design; only the colours are
 * swapped for tokens. */
export default function ClientsRegions({ data }) {
  if (!data?.segments?.length) return null;

  return (
    <Section id="regions" aria-labelledby="regions-h" className="scroll-mt-16 bg-paper">
      <Reveal>
        <Box className="max-w-[640px]">
          <RichHeading
            as="h2"
            id="regions-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
          />
          <Text as="p" className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      <Reveal delay={1}>
        <Box className="mt-10 grid items-center gap-14 max-lg:gap-10 lg:grid-cols-[minmax(0,520px)_1fr]">
          <Box>
            <svg viewBox="-110 -30 540 380" role="img" aria-labelledby="donut-title" className="block h-auto w-full overflow-visible">
              <title id="donut-title">
                Edstellar clients by headquarters region: Asia Pacific 61, Americas 39, Europe and Africa 15, Middle East and North Africa 6
              </title>
              <path className={SEG_FILL[0]} d="M161.8,30.0 A130,130 0 0 1 158.4,290.0 L159.0,244.0 A84,84 0 0 0 161.2,76.0Z" />
              <path className={SEG_FILL[1]} d="M154.8,289.9 A130,130 0 0 1 43.9,101.5 L85.0,122.2 A84,84 0 0 0 156.6,243.9Z" />
              <path className={SEG_FILL[2]} d="M45.6,98.3 A130,130 0 0 1 118.4,36.8 L133.1,80.4 A84,84 0 0 0 86.1,120.1Z" />
              <path className={SEG_FILL[3]} d="M121.9,35.7 A130,130 0 0 1 158.2,30.0 L158.8,76.0 A84,84 0 0 0 135.4,79.7Z" />
              <text x="312.0" y="162.0" textAnchor="start">
                <tspan className="fill-ink font-display text-[18px] font-bold">50%</tspan>
                <tspan x="312.0" dy="1.15em" className="fill-ink/60 font-body text-[13px]">Asia Pacific</tspan>
              </text>
              <text x="29.0" y="237.1" textAnchor="end">
                <tspan className="fill-ink font-display text-[18px] font-bold">32%</tspan>
                <tspan x="29.0" dy="1.15em" className="fill-ink/60 font-body text-[13px]">Americas</tspan>
              </text>
              <text x="62.0" y="43.8" textAnchor="end">
                <tspan className="fill-ink font-display text-[18px] font-bold">12%</tspan>
                <tspan x="62.0" dy="1.15em" className="fill-ink/60 font-body text-[13px]">Europe and Africa</tspan>
              </text>
              <text x="136.4" y="9.8" textAnchor="middle">
                <tspan className="fill-ink/60 font-body text-[13px]" dy="-1.4em">MENA</tspan>
                <tspan x="136.4" dy="1.4em" className="fill-ink font-display text-[18px] font-bold">5%</tspan>
              </text>
              <text x="160" y="156" textAnchor="middle" className="fill-ink font-display text-[44px] font-bold tracking-[-0.03em]">121</text>
              <text x="160" y="180" textAnchor="middle" className="fill-ink/60 font-body text-[14px] font-medium">clients</text>
            </svg>
          </Box>

          <Box as="ul" className="m-0 list-none p-0">
            {data.segments.map((seg) => (
              <Box as="li" key={seg.key} className="mb-7 last:mb-0">
                <Box className="flex items-baseline justify-between gap-4">
                  <Text as="h3" className="m-0 font-body text-[17px] font-semibold text-ink">
                    {seg.label}
                  </Text>
                  <Text as="span" className="whitespace-nowrap font-display text-2xl font-bold tracking-[-0.02em] text-ink">
                    {seg.count}
                    <Text as="span" className="ml-1 text-sm font-medium text-ink/60">{seg.percent}%</Text>
                  </Text>
                </Box>
                <Box className="my-3 h-2 overflow-hidden rounded-full bg-ink/12">
                  <Box className="h-full rounded-full bg-navy" style={{ width: `${seg.bar}%` }} />
                </Box>
                <Text as="p" className="m-0 text-sm leading-[1.5] text-ink/60">{seg.names}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Reveal>

      {data.basis && (
        <Text as="p" className="mt-6 text-[13px] text-ink/60">{data.basis}</Text>
      )}
    </Section>
  );
}
