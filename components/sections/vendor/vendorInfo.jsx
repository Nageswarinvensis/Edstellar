import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import TopicPills from "@/components/shared/topic-pills";
import ProofBar from "@/components/shared/proof-bar";

function VendorInfo({ topics, groupQuote, proof }) {
  const badges = proof?.badges ?? [];

  return (
    <Section className="overflow-hidden">
      {badges.length ? (
        <Reveal delay={4}>
          <Box
            as="ul"
            aria-label="Included with this course"
            className="mt-4 flex flex-wrap gap-3 max-md:mt-3"
          >
            {badges.map((badge) => (
              <Box
                as="li"
                key={badge}
                className="flex items-center gap-2 rounded-full border border-ink/12 bg-white px-4 py-2 shadow-[0_12px_26px_-18px_rgba(10,22,40,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                <Box
                  as="span"
                  aria-hidden="true"
                  className="grid size-5 flex-none place-items-center rounded-full bg-lime text-navy"
                >
                  ✓
                </Box>
                <Text
                  as="span"
                  className="text-sm leading-none font-medium text-ink"
                >
                  {badge}
                </Text>
              </Box>
            ))}
          </Box>
        </Reveal>
      ) : null}

      <Reveal delay={4}>
        <ProofBar
          tone={proof?.tone}
          stats={proof?.stats}
          trainers={proof?.trainers}
          actions={proof?.actions}
        />
      </Reveal>

      {groupQuote ? (
        <Reveal delay={4}>
          <Box
            as="p"
            className="mt-4 flex flex-wrap items-center justify-center gap-[9px] max-sm:mt-[13px] max-sm:gap-2"
          >
            <Box
              as="span"
              className="font-mono text-[10px] tracking-[0.13em] text-ink/60 uppercase max-sm:text-[9.5px]"
            >
              {groupQuote.prompt}
            </Box>

            <a
              href={groupQuote.href}
              className="group border-b border-lime/55 pb-0.5 font-mono text-[10px] font-medium tracking-[0.13em] text-olive uppercase transition-colors hover:border-navy hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy max-sm:text-[9.5px]"
            >
              {groupQuote.label}

              <span
                aria-hidden="true"
                className="ml-1.5 inline-block transition-transform duration-[250ms] group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </a>
          </Box>
        </Reveal>
      ) : null}
    </Section>
  );
}

export default VendorInfo;
