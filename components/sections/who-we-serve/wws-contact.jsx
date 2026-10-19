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
      className="scroll-mt-20 bg-navy"
    >
      {/* Centered heading */}
      <Reveal>
        <Box className="mb-10 text-center">
          <RichHeading
            as="h2"
            id="c-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-paper"
            emphasisClassName="text-lime"
          />
          <Text as="p" className="mx-auto mt-5 max-w-[56ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/72">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      {/* White card wrapping the form */}
      <Box className="mx-auto max-w-[960px]">
        <EnquiryForm
          data={data.form}
          thankYou="contact-us"
          className="shadow-[0_20px_60px_rgba(5,13,26,.45)]"
        />
      </Box>
    </Section>
  );
}
