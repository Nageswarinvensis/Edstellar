import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/sections/company/guest-author/section-head";

/** "How to contribute" — numbered steps on a vertical rule.
 * Design: become-a-guest-author `.steps`, `.step`. */
export default function Steps({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section aria-labelledby="how-h" className="bg-paper lg:py-30">
      <Reveal>
        <SectionHead id="how-h" heading={data.heading} description={data.description} />
      </Reveal>
      <Box as="ol" className="relative ml-0.5 max-w-230 list-none p-0">
        <Box aria-hidden="true" className="absolute top-3.5 bottom-3.5 left-4.75 w-0.5 bg-ink/22" />
        {data.items.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            className="relative grid grid-cols-[40px_1fr] items-start gap-6 pb-10 last:pb-0"
          >
            <Box
              as="span"
              aria-hidden="true"
              className="relative z-1 grid size-10 place-items-center rounded-full bg-navy font-mono text-[13px] font-medium text-lime shadow-[0_0_0_4px_var(--color-paper)]"
            >
              {String(index + 1).padStart(2, "0")}
            </Box>
            <Box className="pt-1.75">
              <Text as="h3" className="mb-1.5 text-[17px] leading-[1.3] font-medium tracking-normal">
                {step.title}
              </Text>
              <Text as="p" className="max-w-[68ch] text-[15.5px] leading-[1.65]">
                {step.description}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
