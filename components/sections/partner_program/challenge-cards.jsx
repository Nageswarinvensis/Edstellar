import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/common/section-head";

/** A card's description with its `email` (when it has one) as a mailto link. */
function Description({ text, email }) {
  if (!email || !text.includes(email)) return text;

  const [before, after] = text.split(email);
  return (
    <>
      {before}
      <a
        href={`mailto:${email}`}
        title="Click Here to Email Edstellar"
        className="border-b-[1.5px] border-lime text-ink"
      >
        {email}
      </a>
      {after}
    </>
  );
}

/**
 * What partners get: three numbered cards, each topped with a lime bar.
 * Two columns below 900px, one below 560px.
 *
 * Not the OD `ChallengeGrid`: that one has no lime bar and renders its
 * descriptions as plain text, and here the support card links an email.
 *
 * Design: partner-program.html `[data-cmp="challenge-cards"]` `.ch-head`,
 * `.chx-grid`, `.chx-card`, `.chx-top`, `.chx-n`, `.chx-h`, `.chx-p`.
 */
export default function ChallengeCards({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section id={data.section_id} className="border-t border-ink/12 bg-paper-warm">
      <SectionHead heading={data.heading} />

      <Box className="grid grid-cols-3 gap-4.5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {data.items.map((item, index) => (
          <Reveal key={item.title} delay={index + 1} className="h-full">
            <Box className="relative h-full overflow-hidden rounded-[14px] border border-ink/12 bg-white px-6 pt-6.5 pb-5.5 shadow-rest">
              <Box aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-lime" />
              <Box className="mb-3 flex items-center gap-3">
                <Text as="span" className="font-mono text-[13px] leading-none font-semibold text-navy opacity-42">
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text as="h3" className="font-display text-[19px] leading-[1.2] font-medium tracking-normal text-navy">
                  {item.title}
                </Text>
              </Box>
              <Text as="p" className="mb-4 text-[14px] leading-[1.55]">
                <Description text={item.description} email={item.email} />
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
