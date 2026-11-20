import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import CountUp from "@/components/common/count-up";

/** Key-statistics strip — a bordered, warm-sand band of four figures, on the
 * same `Section` container as the course pages. */
export default function HomeStats({ data }) {
  if (!data?.length) return null;

  return (
    <Section
      aria-label="Key statistics"
      className="mt-[88px] border-y-[1.5px] border-ink/12 bg-paper-warm py-11 max-lg:mt-16 lg:py-11"
      innerClassName="grid grid-cols-4 items-center gap-12 max-lg:grid-cols-2 max-lg:gap-x-8 max-lg:gap-y-10 max-sm:grid-cols-1"
    >
      {data.map((stat, i) => (
        <Reveal key={stat.label} delay={i}>
          <Box className="stat">
            <Text as="div" className="font-display text-[52px] font-normal leading-none tracking-[-0.022em] text-ink max-md:text-[44px]">
              <CountUp value={stat.value} className="tabular-nums" />
              <Text as="span" className="text-[28px] leading-none text-ink max-md:text-[24px]">{stat.suffix}</Text>
            </Text>
            <Text as="div" className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
              {stat.label}
            </Text>
          </Box>
        </Reveal>
      ))}
    </Section>
  );
}
