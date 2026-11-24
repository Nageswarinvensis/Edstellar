import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import EnquiryForm from "@/components/forms/enquiry-form";

export default function WwsContact({ data }) {
  if (!data) return null;

  return (
    <Section
      id="contact"
      aria-labelledby="c-h"
      className="scroll-mt-20 bg-navy py-16 lg:py-20"
    >
      <Box className="grid gap-12 max-[900px]:grid-cols-1 min-[901px]:grid-cols-[1fr_1fr] min-[901px]:items-start">

        {/* Left — heading, lede, bullets */}
        <Reveal>
          <Box>
            <RichHeading
              as="h2"
              id="c-h"
              heading={data.heading}
              className="m-0 text-[clamp(32px,4vw,42px)] font-bold leading-[1.08] tracking-[-0.03em] text-paper"
              emphasisClassName="text-lime"
            />
            <Text as="p" className="mt-5 text-[clamp(15px,1.1vw,17px)] leading-[1.7] text-paper/72">
              {data.lede}
            </Text>
            {data.bullets?.length > 0 && (
              <Box as="ul" className="mt-6 flex list-none flex-col gap-3 p-0">
                {data.bullets.map((b) => (
                  <Box as="li" key={b} className="flex items-start gap-3 text-[15px] leading-[1.6] text-paper/72">
                    <Box as="span" className="mt-[7px] size-[6px] shrink-0 rounded-full bg-lime" aria-hidden="true" />
                    {b}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Reveal>

        {/* Right — form */}
        <Reveal delay={1}>
          <EnquiryForm
            data={data.form}
            thankYou="who-we-serve"
            hideHeader
            className="shadow-[0_20px_60px_rgba(5,13,26,.45)]"
          />
        </Reveal>

      </Box>
    </Section>
  );
}
