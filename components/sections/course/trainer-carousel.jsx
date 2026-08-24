"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/shared/CtaButton";
import { cn } from "@/lib/utils";

const AUTO_COLS =
  "auto-cols-[max(214px,calc((100%-40px)/3))] max-lg:auto-cols-[max(214px,calc((100%-20px)/2))] max-sm:auto-cols-[100%]";

/**
 * Instructors carousel: three cards visible at once (two below `lg`, one
 * below `sm`), scrolling one card at a time via the prev/next arrows. The
 * nav hides itself once the whole roster already fits without scrolling —
 * a short roster shouldn't show dead controls.
 *
 * Design: `.tr-grid` (grid-auto-flow: column, scroll-snap-x) + `.tr-car-nav`.
 */
export default function TrainerCarousel({ people }) {
  const trackRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncState = () => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    setCanScroll(max > 2);
    setCanPrev(track.scrollLeft > 2);
    setCanNext(track.scrollLeft < max - 2);
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
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    const step = card ? card.getBoundingClientRect().width + gap : 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  }

  if (!people?.length) return null;

  return (
    <Box>
      {canScroll ? (
        <Box className="mb-3.75 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            aria-label="Previous instructors"
            aria-controls="trainer-grid"
            className={cn(
              "grid size-9.5 place-items-center rounded-full border border-ink/20 bg-white text-ink transition-colors duration-200",
              canPrev ? "hover:border-navy hover:bg-navy hover:text-lime" : "opacity-30",
            )}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            aria-label="Next instructors"
            aria-controls="trainer-grid"
            className={cn(
              "grid size-9.5 place-items-center rounded-full border border-ink/20 bg-white text-ink transition-colors duration-200",
              canNext ? "hover:border-navy hover:bg-navy hover:text-lime" : "opacity-30",
            )}
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </Box>
      ) : null}

      <Box
        id="trainer-grid"
        ref={trackRef}
        onScroll={syncState}
        role="group"
        aria-label="Instructors"
        className={cn(
          "grid grid-flow-col gap-5 overflow-x-auto pt-1.5 pb-3 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          AUTO_COLS,
        )}
      >
        {people.map((trainer, index) => (
          <Box
            key={trainer.name ?? index}
            className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white px-5.5 py-6 [scroll-snap-align:start] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.25 hover:border-ink/20 hover:shadow-[0_28px_58px_-34px_rgba(10,22,40,0.5)]"
          >
            <Box className="mb-4 flex size-16 flex-none items-center justify-center overflow-hidden rounded-full bg-navy text-lime transition-transform duration-500 group-hover:scale-[1.06]">
              {trainer.image ? (
                <img
                  src={trainer.image}
                  alt={trainer.name || ""}
                  className="size-full object-cover"
                />
              ) : (
                <User size={26} strokeWidth={1.75} aria-hidden="true" />
              )}
            </Box>

            <Text
              as="h4"
              className="mb-1 font-display text-base leading-tight font-semibold tracking-[-0.02em] text-ink"
            >
              {trainer.name}
            </Text>

            {trainer.role ? (
              <Text as="p" className="mb-2.75 text-[13px] leading-[1.45] text-ink/60">
                {trainer.role}
              </Text>
            ) : null}

            {trainer.years ? (
              <Text
                as="p"
                className="mb-3.5 font-mono text-[10px] tracking-[0.13em] text-ink/60 uppercase"
              >
                {trainer.years}
              </Text>
            ) : null}

            {trainer.rating ? (
              <Box className="mt-0.5 mb-4 flex items-center gap-2.5 rounded-[9px] bg-paper-warm px-2.75 py-2.25">
                <Box className="inline-flex items-center gap-1.25 font-display text-sm font-bold tracking-[-0.01em] text-ink">
                  <Star size={13} strokeWidth={0} fill="currentColor" />
                  {trainer.rating}
                </Box>

                <Box className="h-3.25 w-px flex-none bg-ink/20" />

                <Text
                  as="span"
                  className="font-mono text-[10px] leading-[1.3] tracking-[0.07em] text-ink/60 uppercase"
                >
                  {trainer.sessions} sessions delivered
                </Text>
              </Box>
            ) : null}

            {trainer.spec?.length ? (
              <Box className="mt-auto flex flex-wrap gap-1.5">
                {trainer.spec.map((topic) => (
                  <Text
                    key={topic}
                    as="span"
                    className="rounded-[7px] bg-paper-warm px-2.5 py-1.25 text-[11.5px] font-medium text-ink"
                  >
                    {topic}
                  </Text>
                ))}
              </Box>
            ) : null}

            <CtaButton
              variant="ghost"
              arrow
              render={<a href="#apply" />}
              className="mt-4 w-full justify-center border-ink/22 px-4 py-2.5 text-[12.5px] hover:border-navy hover:bg-navy hover:text-lime"
            >
              View trainer profile
            </CtaButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
