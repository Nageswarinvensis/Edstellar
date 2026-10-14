import Link from "next/link";
import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import CtaButton from "@/components/common/cta-button";
import { RailCard, RailEyebrow, RailHeading, RailSub } from "./rail-card";

const TICKS = [
  "Onsite, virtual or blended",
  "Customized to your tools and roles",
  "Instructor-led, in 100+ countries",
];

/**
 * "Training requirement" rail card: short pitch, three ticks and a quote
 * button. Design: Blog page v2 `.rq`, `.rq-ticks`.
 */
export default function QuoteRail() {
  return (
    <RailCard aria-labelledby="rail-quote-h" className="border-ink/22 shadow-lift">
      <RailEyebrow>Training requirement</RailEyebrow>
      <RailHeading id="rail-quote-h" lead="Scope training for" emphasis="your team" />
      <RailSub>
        Share the skills, the audience and the timeline. A training consultant
        replies within 24 hours.
      </RailSub>

      <Box as="ul" className="mt-3 mb-4 flex list-none flex-col gap-1.75 p-0">
        {TICKS.map((tick) => (
          <Box as="li" key={tick} className="flex items-center gap-2 text-[13px] leading-[1.4] text-ink">
            <Check size={14} strokeWidth={2} className="flex-none text-navy" aria-hidden="true" />
            {tick}
          </Box>
        ))}
      </Box>

      <CtaButton arrow block render={<Link href="/contact-us" />} className="py-3.5 text-[13px]">
        Request a quote
      </CtaButton>
    </RailCard>
  );
}
