import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import IconTile from "@/components/sections/company/icon";
import SectionHead from "@/components/sections/company/guest-author/section-head";

/** "Why contribute to our blog" — three icon cards.
 * Design: become-a-guest-author `.cards`, `.card`. */
export default function Benefits({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section aria-labelledby="benefits-h" className="bg-paper lg:py-30">
      <Reveal>
        <SectionHead id="benefits-h" heading={data.heading} description={data.description} />
      </Reveal>
      <Box className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {data.items.map((item, index) => (
          <Reveal key={item.title} delay={index + 1}>
            <Box className="h-full rounded-[14px] border border-ink/12 bg-white p-10 shadow-[0_1px_2px_rgba(10,22,40,0.06)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.75 hover:shadow-[0_6px_24px_rgba(10,22,40,0.08)]">
              <IconTile name={item.icon} className="mb-6" />
              <Text as="h3" className="mb-2 text-[19px] leading-[1.3] font-medium">
                {item.title}
              </Text>
              <Text as="p" className="text-[15.5px] leading-[1.65]">
                {item.description}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
