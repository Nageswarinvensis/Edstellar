"use client";

import { useEffect, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * The global training footprint — a world map with a pin per location
 * (lime: onsite, white: virtual). Hovering or focusing a pin shows its card;
 * on touch screens a tap opens it and a tap elsewhere closes it. Pin
 * positions are percentages, set as CSS custom properties so no inline
 * layout styles are needed beyond the two coordinates.
 * Design: success-stories `.map`, `.pin`, `.pin-card`.
 */
export default function FootprintMap({ data }) {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return undefined;
    const close = () => setOpen(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <Box>
      <Box className="relative">
        <img
          src={data.map.src}
          alt={data.map.alt}
          width={data.map.width}
          height={data.map.height}
          decoding="async"
          className="block h-auto w-full opacity-28 brightness-0 invert"
        />
        {data.pins.map((pin, index) => (
          <button
            key={pin.place}
            type="button"
            aria-label={pin.place}
            aria-expanded={open === index}
            onClick={(event) => {
              event.stopPropagation();
              setOpen((current) => (current === index ? null : index));
            }}
            // Position is data: two percentages read from content.
            style={{ "--x": `${pin.left}%`, "--y": `${pin.top}%` }}
            className={cn(
              "group absolute top-(--y) left-(--x) -mt-1.5 -ml-1.5 size-3 cursor-pointer rounded-full border-2 border-navy p-0 transition-transform hover:z-10 hover:scale-130 focus-visible:z-10 focus-visible:scale-130 focus-visible:outline-none",
              pin.mode === "onsite" ? "bg-lime shadow-[0_0_0_3px_rgba(200,241,53,0.22)]" : "bg-paper shadow-[0_0_0_3px_rgba(250,250,247,0.18)]",
              open === index && "z-10 scale-130",
            )}
          >
            <Box
              as="span"
              role="tooltip"
              className={cn(
                "pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-20 hidden w-50 -translate-x-1/2 rounded-xl bg-white p-2.5 text-left text-ink shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] group-hover:block group-focus-visible:block",
                open === index && "block",
              )}
            >
              {pin.image ? (
                <img src={pin.image} alt="" width={120} height={120} loading="lazy" decoding="async" className="mb-2 block h-24 w-full rounded-lg object-cover" />
              ) : null}
              <Text as="span" className="block font-display text-[14px] font-semibold text-ink">
                {pin.place}
              </Text>
              <Text as="span" className="mt-1 block text-[12.5px] text-ink/70">
                {data.labels.trainings} <b className="text-ink">{pin.trainings}</b>
              </Text>
              <Text as="span" className="block text-[12.5px] text-ink/70">
                {data.labels.learners} <b className="text-ink">{pin.learners}</b>
              </Text>
            </Box>
          </button>
        ))}
      </Box>
      <Box as="ul" className="m-0 mt-4.5 flex list-none flex-wrap gap-x-5.5 gap-y-2 p-0 font-mono text-[11px] tracking-[0.08em] text-paper/70 uppercase">
        <li className="flex items-center gap-2">
          <Box as="span" aria-hidden="true" className="size-3 rounded-full border-2 border-navy bg-lime" />
          {data.legend.onsite}
        </li>
        <li className="flex items-center gap-2">
          <Box as="span" aria-hidden="true" className="size-3 rounded-full border-2 border-navy bg-paper" />
          {data.legend.virtual}
        </li>
      </Box>
    </Box>
  );
}
