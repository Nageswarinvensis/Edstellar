import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/sections/company/guest-author/section-head";

/** Guest author guidelines — lime-edged rule cards.
 * Design: become-a-guest-author `.rules`, `.rule-item`. */
export default function Guidelines({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section aria-labelledby="guide-h" className="bg-paper-warm lg:py-30">
      <Reveal>
        <SectionHead id="guide-h" heading={data.heading} />
      </Reveal>
      <Box className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {data.items.map((item, index) => (
          <Reveal
            key={item.title}
            delay={(index % 4) + 1}
            className="rounded-[14px] border border-l-3 border-ink/12 border-l-lime bg-white px-8 py-6"
          >
            <Text as="h3" className="mb-1.5 text-[15.5px] leading-[1.35] font-medium tracking-normal">
              {item.title}
            </Text>
            <Text as="p" className="text-[14.5px] leading-[1.6]">
              {item.description}
            </Text>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
