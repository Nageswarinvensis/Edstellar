import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

/**
 * The navy proof strip under the sector hero: a "Why Choose Edstellar?"
 * prompt followed by the headline stats, split by thin dividers. Stats only —
 * unlike the consulting proof strip, this design has no CTA row.
 *
 * `data`: `heading`, `stats` `{ value, label }[]`.
 *
 * Design: government-employees-training-courses / training-for-universities
 * `[data-cmp="proof-strip"]` `.cf`, `.cf-top`, `.cf-q`, `.cf-stat`.
 */
export default function SectorProof({ data }) {
  if (!data?.stats?.length) return null;

  return (
    <Section aria-label={data.heading} className="py-8 lg:py-8">
      <Reveal>
        <Box className="flex flex-wrap items-center justify-between gap-y-4.5 rounded-[20px] bg-navy px-8.5 py-6.5 shadow-lift max-sm:p-5.5">
          {data.heading ? (
            <Text
              as="p"
              className="font-display text-[20px] leading-[1.2] font-bold tracking-[-0.01em] text-paper max-sm:w-full"
            >
              {data.heading}
            </Text>
          ) : null}

          {data.stats.map((stat) => (
            <Box
              key={stat.label}
              className="border-l border-paper/15 px-6.5 max-sm:border-l-0 max-sm:px-0 max-sm:basis-1/2"
            >
              <Text
                as="span"
                className="block font-display text-[20px] leading-[1.05] font-bold tracking-[-0.02em] text-lime"
              >
                {stat.value}
              </Text>
              <Text
                as="span"
                className="mt-1.5 block font-mono text-[10px] leading-[1.4] tracking-[0.12em] text-paper/55 uppercase"
              >
                {stat.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
