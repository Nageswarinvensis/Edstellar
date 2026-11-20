import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import HomeWrap from "@/components/sections/home/home-wrap";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import CapabilityBriefingForm from "@/components/forms/capability-briefing-form";

/**
 * "Plan your next capability development program." — the closing briefing
 * section on navy: heading, intro and what the visitor gets on the left; the
 * design's briefing form on the right, in the enquiry form's card and field
 * styles (`CapabilityBriefingForm`, posting to the same Zoho TrainingEnquiry
 * form). Replaces the old `mailto:` button.
 *
 * Design: `edstellar-homepage-capability-development.html` → `#contact`
 * (`.contact2`).
 */
export default function HomeCta({ data }) {
  if (!data) return null;
  const { heading, sub, points = [], form } = data;

  return (
    <HomeWrap id="contact" aria-labelledby="cta-heading" className="scroll-mt-16 border-b-[1.5px] border-navy-soft bg-navy py-20 text-paper max-lg:py-16">
      <Box className="grid items-start gap-14 max-lg:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <RichHeading
            as="h2"
            id="cta-heading"
            heading={heading}
            className="m-0 text-[clamp(32px,3.6vw,46px)] font-medium leading-[1.05] tracking-[-0.035em] text-paper text-balance [&_em]:font-normal [&_em]:text-lime [&_span]:font-normal [&_span]:text-lime"
          />
          {sub && (
            <Text as="p" className="mt-[18px] mb-0 max-w-[60ch] text-base leading-[1.65] text-paper/72">
              {sub}
            </Text>
          )}
          {points.length > 0 && (
            <Box as="ul" className="m-0 mt-6 list-none p-0">
              {points.map((point) => (
                <Box
                  as="li"
                  key={point}
                  className="flex gap-3 py-[7px] text-[14.5px] leading-[1.55] text-paper/85 before:mt-2 before:size-1.5 before:flex-none before:rounded-full before:bg-lime before:content-['']"
                >
                  {point}
                </Box>
              ))}
            </Box>
          )}
        </Reveal>

        {form && (
          <CapabilityBriefingForm data={form} className="scroll-mt-20 shadow-[0_18px_50px_rgba(5,13,26,0.28)]" />
        )}
      </Box>
    </HomeWrap>
  );
}
