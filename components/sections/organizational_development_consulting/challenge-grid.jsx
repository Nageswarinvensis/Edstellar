import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * The OD sub-pages' "what this unlocks" section: a centred heading and lede over
 * a three-column grid of numbered cards, each with a claim, a short paragraph
 * and a bold payoff line pinned to the bottom behind a rule. Two columns below
 * 900px, one below 560px.
 *
 * Shared by more than one OD sub-page, so it lives in the OD section folder
 * (TASTE.md §6.1).
 *
 * Design: `change-management-consulting (18).html` /
 * `culture-transformation-consulting (4).html` → `#challenge`, `.ch-head`,
 * `.chx-grid`, `.chx-card`, `.chx-top`, `.chx-n`, `.chx-h`, `.chx-p`,
 * `.chx-close`.
 */
export default function ChallengeGrid({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, items } = data;

  return (
    <Section
      id={section_id ?? "challenge"}
      className="border-t border-ink/12 bg-paper-warm"
    >
      <Box className="mx-auto mb-6.5 max-w-[60ch] text-center">
        <Reveal>
          <RichHeading heading={heading} className="mb-4" emphasisClassName="font-normal" />
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

      <Box className="mt-2.5 grid grid-cols-3 gap-4.5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={Math.min((index % 3) + 1, 4)}>
            <Box className="flex h-full flex-col rounded-[14px] border border-ink/12 bg-white px-6 pt-6.5 pb-5.5 shadow-sm">
              <Box className="mb-3 flex items-center gap-3">
                <Text
                  as="span"
                  className="font-mono text-[13px] leading-none font-semibold text-navy opacity-40"
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text
                  as="h3"
                  className="font-display text-[19px] leading-[1.2] font-semibold text-navy"
                >
                  {item.title}
                </Text>
              </Box>

              <Text as="p" className="mb-4 text-[14px] leading-[1.55] text-ink/60">
                {item.description}
              </Text>

              {item.close ? (
                <Box className="mt-auto flex items-center gap-2.25 border-t border-ink/12 pt-3.5">
                  <Box
                    aria-hidden="true"
                    className="size-[7px] flex-none rounded-[2px] bg-lime"
                  />
                  <Text
                    as="span"
                    className="font-display text-[14px] leading-[1.3] font-semibold text-navy"
                  >
                    {item.close}
                  </Text>
                </Box>
              ) : null}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
