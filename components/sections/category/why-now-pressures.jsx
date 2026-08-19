"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

export default function WhyNowPressures({ pressures, note }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [position, setPosition] = useState(1);

  const syncState = () => {
    const track = trackRef.current;
    if (!track) return;

    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);

    const cards = Array.from(track.children);
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - track.scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    setPosition(nearestIndex + 1);
  };

  useEffect(() => {
    syncState();
    window.addEventListener("resize", syncState);
    return () => window.removeEventListener("resize", syncState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollByCards(direction) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[0];
    const step = card ? card.getBoundingClientRect().width + 14 : 300;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollBy({
      left: direction * step,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setTimeout(syncState, 320);
  }

  if (!pressures?.length) return null;

  return (
    <Box>
      <Box className="mb-3.5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          disabled={!canPrev}
          aria-label="Previous pressure"
          className={cn(
            "grid size-7.5 flex-none place-items-center rounded-full border border-ink/20 bg-white text-ink transition-colors duration-200",
            canPrev
              ? "hover:border-navy hover:bg-navy hover:text-lime"
              : "opacity-30",
          )}
        >
          <ChevronLeft size={15} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => scrollByCards(1)}
          disabled={!canNext}
          aria-label="Next pressure"
          className={cn(
            "grid size-7.5 flex-none place-items-center rounded-full border border-ink/20 bg-white text-ink transition-colors duration-200",
            canNext
              ? "hover:border-navy hover:bg-navy hover:text-lime"
              : "opacity-30",
          )}
        >
          <ChevronRight size={15} aria-hidden="true" />
        </button>

        <Text
          as="span"
          className="font-mono text-[10px] tracking-[0.12em] text-ink/40"
        >
          {position} / {pressures.length}
        </Text>
      </Box>

      <Box
        ref={trackRef}
        onScroll={syncState}
        tabIndex={0}
        role="group"
        aria-label="Pressures, scroll sideways"
        className="flex gap-3.5 overflow-x-auto pb-3 [scroll-snap-type:x_mandatory] scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {pressures.map((pressure) => (
          <Box
            key={pressure.kicker}
            className="relative flex min-w-62.5 flex-none basis-[85%] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white p-6.5 snap-start before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-linear-to-r before:from-navy before:to-lime before:content-[''] sm:basis-[46%] lg:basis-[31.5%]"
          >
            <Text
              as="span"
              className="mb-4 font-mono text-[10px] tracking-[0.15em] text-ink/50 uppercase"
            >
              {pressure.kicker}
            </Text>

            <Text
              as="p"
              className="font-display text-[clamp(28px,3.2vw,38px)] leading-none font-bold tracking-[-0.04em] text-ink"
            >
              {pressure.figure}
            </Text>

            <Text
              as="p"
              className="mt-1.5 mb-3.5 text-[13px] leading-[1.4] font-semibold text-ink"
            >
              {pressure.unit}
            </Text>

            <Text
              as="p"
              className="mb-4.5 text-[13.5px] leading-[1.7] text-ink/60"
            >
              {pressure.description}
            </Text>

            <Text
              as="span"
              className="mt-auto border-t border-ink/10 pt-3.5 font-mono text-[10px] tracking-[0.11em] text-ink/40 uppercase"
            >
              {pressure.source}
            </Text>
          </Box>
        ))}
      </Box>

      {note ? (
        <Text
          as="p"
          className="mt-4.5 max-w-[84ch] text-[12.5px] leading-[1.65] text-ink/45"
        >
          {note}
        </Text>
      ) : null}
    </Box>
  );
}
