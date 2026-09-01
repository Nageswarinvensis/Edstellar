import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";

export default function Outcomes({ outcomes }) {
  if (!outcomes?.items?.length) return null;

  return (
    <Section id="outcomes" className="border-t border-ink/10 bg-paper-warm">
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={outcomes.heading.parts}
          className="mb-6.5 max-w-[20ch] tracking-[-0.03em]"
        />
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-15 max-w-[64ch] text-[16.5px] leading-[1.7] text-ink/60"
        >
          {outcomes.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Box as="ul" className="flex flex-col gap-3">
          {outcomes.items.map((item) => (
            <Box
              as="li"
              key={item}
              className="flex items-start gap-4 rounded-[14px] border border-ink/12 bg-white px-5 py-4.5"
            >
              <Box
                aria-hidden="true"
                className="mt-2 size-1.75 flex-none rounded-full bg-lime"
              />
              <Text as="p" className="text-[15px] leading-normal text-ink">
                {item}
              </Text>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
