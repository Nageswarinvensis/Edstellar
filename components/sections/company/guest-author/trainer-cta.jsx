import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";

// Trainer registration, the same target as the trainer-platform page's
// "Join as a Trainer" buttons.
const TRAINER_REGISTER = "https://login.edstellar.com/register";

/** Closing navy band — "Not an Edstellar trainer yet?". The CMS sends the
 * button to `/trainer`, which is not a page, so that href goes to trainer
 * registration instead.
 * Design: become-a-guest-author `.cta`, `.cta-inner`. */
export default function TrainerCta({ data }) {
  if (!data?.heading) return null;
  const href = !data.button?.href || data.button.href === "/trainer" ? TRAINER_REGISTER : data.button.href;

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
        <CtaButton arrow color="lime" render={<Link href={href} />}>
          {data.button.label}
        </CtaButton>
      </Reveal>
    </Section>
  );
}
