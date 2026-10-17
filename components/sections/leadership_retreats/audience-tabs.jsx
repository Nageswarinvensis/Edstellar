"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { RetreatIcon, SEAT_CLASSES } from "@/components/sections/leadership_retreats/icons";
import { cn } from "@/lib/utils";

/**
 * "Built for the leaders who set direction" — a vertical tablist of attendee
 * types beside the selected type's navy panel. Every panel is in the HTML
 * (inactive ones `hidden`), so crawlers see all three.
 * Design: leadership-retreats `.ua-tabs`, `.ua-panel`.
 */
export default function AudienceTabs({ data }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
  function onKeyDown(event) {
    const last = data.items.length - 1;
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id="audience" aria-labelledby="aud-h" className="scroll-mt-32 bg-paper">
      <Reveal className="mb-10 max-w-[62ch]">
        <RichHeading as="h2" id="aud-h" heading={data.heading} className="mb-4" />
        <Text as="p" className="text-[clamp(16px,1.2vw,18px)] leading-[1.7]">
          {data.description}
        </Text>
      </Reveal>

      <Reveal delay={1} className="grid grid-cols-1 gap-6 lg:grid-cols-[0.72fr_1fr]">
        <Box role="tablist" aria-label="Who attends" aria-orientation="vertical" className="flex flex-col gap-2.5" onKeyDown={onKeyDown}>
          {data.items.map((item, index) => (
            <button
              key={item.title}
              ref={(el) => (tabRefs.current[index] = el)}
              type="button"
              role="tab"
              id={`ua-t${index}`}
              aria-controls={`ua-p${index}`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "grid cursor-pointer grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 rounded-[14px] border bg-white px-6 py-5 text-left transition-[border-color,box-shadow]",
                active === index ? "border-2 border-navy shadow-[0_8px_32px_rgba(10,22,40,0.12)]" : "border-ink/12 hover:border-ink/30",
              )}
            >
              <Box as="span" aria-hidden="true" className={cn("size-4 rounded-full border-2", SEAT_CLASSES[item.seat])} />
              <Text as="span" className="font-display text-[19px] font-medium text-ink">
                {item.title}
              </Text>
              <Text as="span" className="col-start-2 text-[14px] leading-normal">
                {item.description}
              </Text>
            </button>
          ))}
        </Box>

        {data.items.map((item, index) => (
          <Box
            key={item.title}
            role="tabpanel"
            id={`ua-p${index}`}
            aria-labelledby={`ua-t${index}`}
            tabIndex={0}
            hidden={active !== index}
            className="rounded-[18px] bg-navy p-8 text-paper lg:p-10"
          >
            <Box as="span" className="mb-7 grid size-14 place-items-center rounded-xl bg-paper/8 text-gold">
              <RetreatIcon name={item.icon} size={22} />
            </Box>
            <Text as="h3" className="mb-3 text-paper">
              {item.title}
            </Text>
            <Text as="p" className="mb-8 text-[16px] leading-[1.7] text-paper/75">
              {item.description}
            </Text>
            <Text as="span" className="mb-1.5 block text-[13px] font-medium text-paper/60">
              {data.leaves_with_label}
            </Text>
            <Text as="p" className="mb-7 font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.3] text-gold italic">
              {item.leaves_with}
            </Text>
            <a
              href={data.cta.href}
              className="inline-flex items-center gap-2 font-display text-[15px] font-semibold text-paper underline underline-offset-4 hover:text-gold"
            >
              {data.cta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </Box>
        ))}
      </Reveal>
    </Section>
  );
}
