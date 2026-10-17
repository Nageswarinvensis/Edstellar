import { ChevronRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";
import { RetreatIcon } from "@/components/sections/leadership_retreats/icons";
import { cn } from "@/lib/utils";

const pad = (n) => String(n).padStart(2, "0");

/**
 * "Three steps to your retreat" — numbered step cards joined by chevrons,
 * the last one navy with the call to action.
 * Design: leadership-retreats `.j2-row`, `.j2-c`, `.j2-n`.
 */
export default function JoinSteps({ data }) {
  return (
    <Section id="join" aria-labelledby="jn-h" className="scroll-mt-32 bg-paper-warm">
      <Reveal className="mb-11 text-center">
        <RichHeading as="h2" id="jn-h" heading={data.heading} />
      </Reveal>

      <Box as="ol" className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3">
        {data.items.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index + 1} className="relative">
            {index > 0 ? (
              <ChevronRight
                aria-hidden="true"
                size={26}
                strokeWidth={1.5}
                className="absolute top-20 -left-7.5 hidden text-ink md:block"
              />
            ) : null}
            <Box
              className={cn(
                "relative h-full overflow-hidden rounded-[16px] p-7.5",
                item.highlight ? "bg-navy text-paper" : "bg-white shadow-[0_1px_2px_rgba(10,22,40,0.07),0_4px_16px_rgba(10,22,40,0.07)]",
              )}
            >
              <Text
                as="span"
                aria-hidden="true"
                className={cn(
                  "absolute top-4 right-6 font-display text-[48px] leading-none font-light text-transparent [-webkit-text-stroke:1px_currentColor]",
                  item.highlight ? "text-paper/30" : "text-ink/25",
                )}
              >
                {pad(index + 1)}
              </Text>
              <Box
                as="span"
                aria-hidden="true"
                className={cn("mb-6 grid size-12 place-items-center rounded-xl", item.highlight ? "bg-paper/8 text-gold" : "bg-paper-warm text-navy")}
              >
                <RetreatIcon name={item.icon} size={18} />
              </Box>
              <Text as="h3" className={cn("mb-3", item.highlight && "text-paper")}>
                {item.title}
              </Text>
              <Text as="p" className={cn("text-[15px] leading-[1.6]", item.highlight && "text-paper/75")}>
                {item.description}
              </Text>
              {item.cta ? (
                <CtaButton arrow render={<a href={item.cta.href} />} className="mt-6 bg-gold text-navy">
                  {item.cta.label}
                </CtaButton>
              ) : null}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
