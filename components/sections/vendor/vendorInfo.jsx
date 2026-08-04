import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import TopicPills from "@/components/shared/topic-pills";
import ProofBar from "@/components/shared/proof-bar";

function VendorInfo({ topics, groupQuote, proof }) {
  return (
    <Section className="overflow-hidden">
      <Reveal delay={4}>
        <TopicPills topics={topics ?? []} label="Topics covered" />
      </Reveal>

      <Reveal delay={4}>
        <ProofBar
          tone={proof?.tone}
          stats={proof?.stats}
          trainers={proof?.trainers}
        />
      </Reveal>

      {groupQuote ? (
        <Reveal delay={4}>
          <Box
            as="p"
            className="mt-4 flex flex-wrap items-center justify-center gap-[9px] max-sm:mt-[13px] max-sm:gap-[7px]"
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
                className="ml-1.5 inline-block transition-transform duration-[250ms] group-hover:translate-x-[3px] motion-reduce:transition-none"
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
