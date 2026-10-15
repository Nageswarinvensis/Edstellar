import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

/** The enquiry hero's checklist and ISO badges, under the lede.
 * Design: enquiry-form `.points`, `.trust`. */
export default function EnquiryIntro({ points = [], badges = [] }) {
  return (
    <>
      {points.length ? (
        <Reveal as="ul" delay={1} className="mb-10 grid list-none gap-3.5 p-0">
          {points.map((point) => (
            <Box as="li" key={point} className="flex items-start gap-3 text-[15.5px] leading-[1.6] text-white/88">
              <Check size={22} strokeWidth={1.7} aria-hidden="true" className="mt-px flex-none text-lime" />
              {point}
            </Box>
          ))}
        </Reveal>
      ) : null}
      {badges.length ? (
        <Reveal delay={2} className="flex flex-wrap gap-3 border-t border-white/16 pt-8">
          {badges.map((badge) => (
            <Text
              as="span"
              key={badge}
              className="inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.06em] text-white/76"
            >
              <Box as="span" aria-hidden="true" className="size-1.75 rounded-[2px] bg-lime" />
              {badge}
            </Text>
          ))}
        </Reveal>
      ) : null}
    </>
  );
}
