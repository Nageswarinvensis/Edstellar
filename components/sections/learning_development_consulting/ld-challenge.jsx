import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * "Learning strategy that unlocks your fullest capability" — centred heading
 * and lede over a two-column numbered ledger of outcomes (one column below
 * 760px). Numbers come from each outcome's position, 01 onwards.
 *
 * Design: `learning-strategy-design (48).html` → `#challenge`, `.ch-head`,
 * `.ob-grid`, `.ob`.
 */
export default function LdChallenge({ data }) {
  if (!data?.outcomes?.length) return null;

  const { section_id, heading, description, outcomes } = data;

  return (
    <Section id={section_id} className="border-t border-ink/12 bg-paper-warm">
      <Box className="mx-auto mb-6.5 max-w-[60ch] text-center">
        <Reveal>
          <RichHeading
            heading={heading}
            className="mb-4"
            emphasisClassName="font-normal"
          />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mx-auto text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="mt-1.5 grid grid-cols-2 gap-x-14 max-[760px]:grid-cols-1 max-[760px]:gap-x-0">
        {outcomes.map((outcome, index) => (
          <Reveal key={outcome.title} delay={Math.min((index % 2) + 1, 4)}>
            <Box className="flex items-baseline gap-5.5 border-b border-ink/12 py-6 max-[760px]:gap-4 max-[760px]:py-5">
              <Text
                as="span"
                className="min-w-7 font-mono text-[15px] leading-none font-semibold text-navy opacity-40"
              >
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Box>
                <Text
                  as="h3"
                  className="mb-1.75 font-display text-[20px] leading-[1.2] font-semibold text-navy max-[760px]:text-[18px]"
                >
                  {outcome.title}
                </Text>
                <Text as="p" className="text-[15px] leading-[1.55] text-ink/60">
                  {outcome.description}
                </Text>
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
