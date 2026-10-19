import { Check } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import GuestAuthorForm from "@/components/forms/guest-author-form";

/** "Share your blog ideas" — intro and checklist beside the pitch form.
 * Design: become-a-guest-author `#pitch`, `.form-wrap`, `.form-side`. */
export default function Pitch({ data }) {
  if (!data?.form) return null;

  return (
    <Section
      id={data.section_id}
      aria-labelledby="pitch-h"
      className="scroll-mt-20 bg-paper-warm lg:py-30"
    >
      <Box className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Text
            as="h2"
            id="pitch-h"
            className="mb-4"
          >
            {data.heading}
          </Text>
          <Text as="p" className="max-w-[46ch]">
            {data.description}
          </Text>
          {data.points?.length ? (
            <Box as="ul" className="mt-8 grid list-none gap-4 p-0">
              {data.points.map((point) => (
                <Box as="li" key={point} className="flex items-start gap-3 text-[15px] leading-[1.6] text-ink">
                  <Check size={20} strokeWidth={1.7} aria-hidden="true" className="mt-0.5 flex-none text-navy" />
                  {point}
                </Box>
              ))}
            </Box>
          ) : null}
        </Reveal>

        <Reveal delay={1}>
          <GuestAuthorForm data={data.form} thankYou="enquire" />
        </Reveal>
      </Box>
    </Section>
  );
}
