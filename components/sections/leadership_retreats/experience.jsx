import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";
import { RetreatIcon } from "@/components/sections/leadership_retreats/icons";

/**
 * "Every detail is handled" — three ruled feature rows beside the navy
 * "Included in every retreat" checklist.
 * Design: leadership-retreats `.ex-grid`, `.ex-list`, `.ex-inc`.
 */
export default function Experience({ data }) {
  return (
    <Section id="experience" aria-labelledby="ex-h" className="scroll-mt-32 bg-paper">
      <Box className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <Reveal>
          <RichHeading as="h2" id="ex-h" heading={data.heading} className="mb-8" />
          <Box as="ul" className="m-0 list-none border-t border-ink/12 p-0">
            {data.items.map((item) => (
              <Box as="li" key={item.title} className="flex gap-5 border-b border-ink/12 py-6">
                <Box as="span" className="grid size-12 flex-none place-items-center rounded-xl bg-paper-warm text-navy">
                  <RetreatIcon name={item.icon} size={19} />
                </Box>
                <Box>
                  <Text as="h3" className="mb-2">
                    {item.title}
                  </Text>
                  <Text as="p" className="text-[15.5px] leading-[1.6]">
                    {item.description}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>

        <Reveal delay={1}>
          <Box as="aside" aria-labelledby="inc-h" className="rounded-[18px] bg-navy p-8 shadow-[0_8px_32px_rgba(10,22,40,0.12)]">
            <Text as="h3" id="inc-h" className="mb-5 text-paper">
              {data.included.title}
            </Text>
            <Box as="ul" className="m-0 mb-8 flex list-none flex-col gap-3.5 p-0">
              {data.included.items.map((item) => (
                <Box as="li" key={item} className="flex items-center gap-3 text-[15.5px] text-paper/90">
                  <RetreatIcon name="check" size={17} className="flex-none text-gold" />
                  {item}
                </Box>
              ))}
            </Box>
            <CtaButton block arrow render={<a href={data.included.cta.href} />} className="bg-gold text-navy hover:shadow-[0_14px_28px_-14px_rgba(195,163,111,0.65)]">
              {data.included.cta.label}
            </CtaButton>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
