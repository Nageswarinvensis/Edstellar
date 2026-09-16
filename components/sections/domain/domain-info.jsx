import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import ProofBar from "@/components/common/proof-bar";
import Section from "@/components/ui/Section";

function DomainInfo({ proof }) {
  const topic_tags = proof?.topic_tags ?? [];
  const stats = proof?.stats ?? [];

  return (
    <Section className="pt-0 pb-10 lg:pt-0 lg:pb-10">
      {topic_tags.length ? (
        <Reveal delay={4}>
          <Box
            as="ul"
            aria-label="Included with this course"
            className="mt-4 flex flex-wrap gap-3 max-md:mt-0"
          >
            {topic_tags.map((badge) => (
              <Box
                as="li"
                key={badge}
                className="flex items-center gap-2 rounded-full border border-ink/12 bg-white px-4 py-2 shadow-[0_12px_26px_-18px_rgba(10,22,40,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                <Box
                  as="span"
                  aria-hidden="true"
                  className="grid size-5 flex-none place-items-center rounded-full bg-lime text-ink"
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
          tone={proof?.tone || "dark"}
          stats={stats}
          trainers={proof?.trainers}
          actions={proof?.actions}
          className="mt-0 lg:mt-0"
        />
      </Reveal>
    </Section>
  );
}

export default DomainInfo;
