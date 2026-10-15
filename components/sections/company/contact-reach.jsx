import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import EnquiryForm from "@/components/forms/enquiry-form";

/**
 * Contact page body: regional phone lines and office addresses on the left,
 * the enquiry form on the right.
 *
 * Design: contact-us `.contact-grid`, `.phones`, `.phone-row`, `.offices`.
 */
export default function ContactReach({ data, form }) {
  if (!data) return null;

  return (
    <Section aria-labelledby="reach-h" className="bg-paper lg:py-30">
      <Box className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Text
            as="h2"
            id="reach-h"
            className="mb-4"
          >
            {data.heading}
          </Text>
          <Text as="p" className="mb-10 max-w-[44ch]">
            {data.description}
          </Text>

          <Box className="mb-12 grid gap-3">
            {data.phones.map((phone) => (
              <a
                key={phone.tel}
                href={`tel:${phone.tel}`}
                title={`Click Here to Call Edstellar ${phone.region}`}
                className="flex items-center gap-3.5 rounded-[10px] border border-ink/12 bg-white px-4.5 py-3.5 text-ink transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(10,22,40,0.08)]"
              >
                <Text as="span" className="w-12 flex-none font-mono text-[11px] tracking-[0.1em] text-ink/60 uppercase">
                  {phone.region}
                </Text>
                <Text as="span" className="text-base font-medium text-ink">
                  {phone.number}
                </Text>
              </a>
            ))}
          </Box>

          <Box className="grid gap-6">
            {data.offices.map((office) => (
              <Box
                key={office.name}
                className="rounded-[14px] border border-l-3 border-ink/12 border-l-lime bg-paper-warm p-8"
              >
                <Text as="span" className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-ink/60 uppercase">
                  {office.label}
                </Text>
                <Text as="h3" className="mb-1.5 text-base leading-[1.3] font-semibold tracking-normal">
                  {office.name}
                </Text>
                <Box as="address" className="text-[15px] leading-[1.6] text-ink not-italic">
                  {office.address}
                  <br />
                  <a href={`tel:${office.phone.tel}`} title={`Click Here to Call ${office.name}`} className="font-mono text-[13px] text-ink/60 hover:text-ink">
                    {office.phone.label}
                  </a>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>

        <Reveal delay={1} id="form" className="scroll-mt-20">
          <EnquiryForm data={form} inlineIdentity />
        </Reveal>
      </Box>
    </Section>
  );
}
