import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";

/** Closing navy band — "Not an Edstellar trainer yet?".
 * Design: become-a-guest-author `.cta`, `.cta-inner`. */
export default function TrainerCta({ data }) {
  if (!data?.heading) return null;

  return (
    <Section aria-labelledby="cta-h" className="bg-navy py-10 lg:py-18">
      <Reveal className="flex flex-wrap items-center justify-between gap-8">
        <Box>
          <Text
            as="h2"
            id="cta-h"
            className="mb-2 text-white"
          >
            {data.heading}
          </Text>
          <Text as="p" className="max-w-[48ch] text-white/80">
            {data.description}
          </Text>
        </Box>
        <CtaButton arrow color="lime" render={<Link href={data.button.href} />}>
          {data.button.label}
        </CtaButton>
      </Reveal>
    </Section>
  );
}
