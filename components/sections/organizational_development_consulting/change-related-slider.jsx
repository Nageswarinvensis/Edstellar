"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesColumn,
  ChevronLeft,
  ChevronRight,
  Heart,
  Network,
  RefreshCw,
  Smile,
  Sparkles,
  Target,
  UserCheck,
  Users,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * "Other organizational development services" — a horizontal slider of related
 * services with prev/next controls, matching the design's `.relx` carousel
 * (rather than the static grid the shared `RelatedServices` renders). Each card
 * is a link with an icon, title, description and an "Explore" affordance; the
 * track scroll-snaps and the arrows nudge it by roughly one card.
 *
 * Change-management-specific, so it lives in this page's own section folder
 * (TASTE.md §6.1).
 *
 * Design: `change-management-consulting (18).html` → `#related`, `.relx`,
 * `.relx-nav`, `.relx-btn`, `.relx-track`, `.rel`, `.rel-ic`, `.go`.
 */

const ICONS = {
  network: Network,
  heart: Heart,
  smile: Smile,
  users: Users,
  chart: ChartNoAxesColumn,
  succession: UserCheck,
  target: Target,
  dei: Users,
  change: RefreshCw,
};

export default function ChangeRelatedSlider({ id, data }) {
  const trackRef = useRef(null);

  if (!data?.items?.length) return null;

  const sectionId = id || data.sectionId || "related";

  // The site-pages CMS sends the intro as `Description` and the footer link as
  // a one-entry `hub_link` list; local content sends `subheading` and a
  // `hub_link` object.
  const subheading = data.subheading || data.Description;
  const hubLink = Array.isArray(data.hub_link) ? data.hub_link[0] : data.hub_link;

  function scrollByCards(direction) {
    const track = trackRef.current;
    if (!track) return;
    // One card plus its gap — close enough to page the row by a card.
    const first = track.querySelector("[data-rel-card]");
    const step = first ? first.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <Section
      id={sectionId}
      className="border-t border-ink/12 bg-paper-warm"
    >
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          <RichHeading heading={data.heading} emphasisClassName="font-normal" />
        </Reveal>
        {subheading ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {subheading}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal delay={1}>
        <Box className="relative">
          {/* Prev / next controls */}
          <Box className="mb-4 flex justify-end gap-2">
            <SliderButton label="Previous services" onClick={() => scrollByCards(-1)}>
              <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
            </SliderButton>
            <SliderButton label="Next services" onClick={() => scrollByCards(1)}>
              <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
            </SliderButton>
          </Box>

          {/* Track */}
          <Box
            ref={trackRef}
            className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-smooth px-0.5 pt-0.5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {data.items.map((item) => {
              const Icon = ICONS[item.icon] || Sparkles;

              return (
                <Link
                  key={item.title}
                  data-rel-card
                  href={item.href || "#"}
                  title={`Click Here to View ${item.title}`}
                  className="
                    group/rel flex shrink-0 basis-[clamp(250px,78vw,300px)] snap-start flex-col rounded-[14px] border border-ink/12 bg-white p-6.5
                    transition-[transform,box-shadow] duration-200 hover:-translate-y-0.75 hover:shadow-lift
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-reduce:hover:translate-y-0
                  "
                >
                  <Box
                    aria-hidden="true"
                    className="mb-4.5 grid size-11.5 place-items-center rounded-[12px] bg-lime-soft text-navy"
                  >
                    <Icon size={24} strokeWidth={1.7} />
                  </Box>

                  <Text
                    as="h3"
                    className="mb-2 font-display text-[18px] leading-[1.3] font-bold text-ink"
                  >
                    {item.title}
                  </Text>
                  <Text as="p" className="mb-4.5 text-[15px] leading-[1.55] text-ink/60">
                    {item.description}
                  </Text>

                  {item.link ? (
                    <Text
                      as="span"
                      className="mt-auto inline-flex items-center gap-1.75 font-body text-[14px] font-semibold text-navy"
                    >
                      {item.link}
                      <ArrowRight
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover/rel:translate-x-1"
                      />
                    </Text>
                  ) : null}
                </Link>
              );
            })}
          </Box>
        </Box>
      </Reveal>

      {hubLink?.href ? (
        <Text as="p" className="mt-7 text-center">
          <Link
            href={hubLink.href}
            className="border-b-2 border-lime pb-0.5 font-display text-[14px] leading-normal font-bold text-ink focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            {hubLink.label}
          </Link>
        </Text>
      ) : null}
    </Section>
  );
}

function SliderButton({ label, onClick, children }) {
  return (
    <Box
      as="button"
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="
        grid size-10.5 flex-none cursor-pointer place-items-center rounded-full border border-ink/12 bg-white text-ink
        transition-[border-color,background-color] duration-150 hover:border-ink/22 hover:bg-paper-warm
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy
      "
    >
      {children}
    </Box>
  );
}
