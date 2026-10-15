import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

/** "Talk to our team directly" — email and regional phone pills under the
 * enquiry form. Design: enquiry-form `.fallback`. */
export default function EnquiryFallback({ data }) {
  if (!data?.heading) return null;

  return (
    <Section aria-labelledby="fallback-h" className="bg-paper py-10 lg:py-16">
      <Reveal className="flex flex-wrap items-center justify-between gap-6">
        <Box>
          <Text
            as="h2"
            id="fallback-h"
            className="mb-1"
          >
            {data.heading}
          </Text>
          <Text as="p">
            Email{" "}
            <a href={`mailto:${data.email}`} title="Click Here to Email Edstellar" className="text-ink hover:underline">
              {data.email}
            </a>{" "}
            or call the team closest to you.
          </Text>
        </Box>
        <Box className="flex flex-wrap gap-2.5">
          {data.phones.map((phone) => (
            <a
              key={phone.tel}
              href={`tel:${phone.tel}`}
              title={`Click Here to Call ${phone.label}`}
              className="inline-flex min-h-9 items-center rounded-full border border-ink/22 px-3.5 py-2 font-mono text-[13px] text-ink hover:bg-paper-warm"
            >
              {phone.label}
            </a>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
