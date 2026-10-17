"use client";

import { useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Delivery formats as tabs — onsite, virtual, hybrid & offsite — each panel
 * a photo beside its copy. Every panel is in the HTML (inactive ones
 * `hidden`). Design: Edstellar_Corporate_Training_Hub `ct-delivery-tabs`.
 */
export default function DeliveryTabs({ data }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const last = data.items.length - 1;

  function onKeyDown(event) {
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <Box className="overflow-hidden rounded-[18px] border border-ink/12 bg-white">
      <Box role="tablist" aria-label="Delivery format" onKeyDown={onKeyDown} className="grid grid-cols-3 border-b border-ink/12">
        {data.items.map((item, index) => (
          <button
            key={item.tab}
            ref={(el) => (tabs.current[index] = el)}
            type="button"
            role="tab"
            id={`dl-t${index}`}
            aria-controls={`dl-p${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            className={cn(
              "flex cursor-pointer items-center gap-3 border-ink/12 px-4 py-5 text-left font-display text-[clamp(15px,1.5vw,19px)] font-semibold transition-colors not-last:border-r sm:px-7",
              active === index ? "bg-navy text-paper" : "text-ink/60 hover:text-ink",
            )}
          >
            <Text as="span" className={cn("font-mono text-[11px]", active === index ? "text-lime" : "text-ink/50")}>
              {pad(index + 1)}
            </Text>
            {item.tab}
          </button>
        ))}
      </Box>
      {data.items.map((item, index) => (
        <Box
          key={item.tab}
          role="tabpanel"
          id={`dl-p${index}`}
          aria-labelledby={`dl-t${index}`}
          tabIndex={0}
          hidden={active !== index}
          className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr]"
        >
          <img src={item.image.src} alt={item.image.alt} width={1672} height={941} loading="lazy" decoding="async" className="aspect-[5/3] size-full object-cover" />
          <Box className="px-7 py-9 lg:px-10">
            <Text as="h3" className="mb-4">
              {item.title}
            </Text>
            <Text as="p" className="mb-6 text-[16.5px] leading-[1.7]">
              {item.text}
            </Text>
            <Box as="dl" className="m-0 border-t border-ink/12">
              {[
                [data.labels.best_for, item.best_for],
                [data.labels.planning, item.planning],
              ].map(([label, value]) => (
                <Box key={label} className="border-b border-ink/12 py-3.5">
                  <dt className="font-mono text-[11px] tracking-[0.14em] text-ink/60 uppercase">{label}</dt>
                  <dd className="m-0 mt-1 text-[15.5px] text-ink">{value}</dd>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
