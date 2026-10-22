"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Users,
  Layers,
  Heart,
  Star,
  Network,
  UserRoundCheck,
  ClipboardList,
  Wrench,
  Brain,
  Languages,
  Building2,
  Smile,
  Gauge,
  User,
  Presentation,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

const ICONS = {
  users: Users,
  layers: Layers,
  heart: Heart,
  star: Star,
  network: Network,
  usercheck: UserRoundCheck,
  clipboard: ClipboardList,
  wrench: Wrench,
  brain: Brain,
  languages: Languages,
  building: Building2,
  smile: Smile,
  gauge: Gauge,
  user: User,
  presentation: Presentation,
};

/** Hand-typed CMS names arrive as "user-check", "UserCheck" or " usercheck"
 * — match on letters only. */
const iconKey = (name) => name?.toLowerCase().replace(/[^a-z]/g, "");

const pad = (n) => String(n).padStart(2, "0");

/**
 * Carousel of sibling assessment services — a horizontal scroll-snap track with
 * prev/next controls. Each card fills navy on hover and links to the sibling
 * page, with a "Best for" tag row.
 *
 * Design: `#related`, `.relx`, `.relx-track`, `.rb`, `.rb-tg`.
 */
export default function RelatedAssessments({ data }) {
  const trackRef = useRef(null);
  // Which ends of the track are reached — dims the matching arrow
  // (design: `.relx-btn:disabled`).
  const [edges, setEdges] = useState({ start: true, end: false });
  const items = data?.items ?? [];

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      start: track.scrollLeft <= 2,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  if (!items.length) return null;

  const { section_id, heading, description, hub_link } = data;
  const tagsLabel = data.tags_label ?? "Best for";
  const ctaLabel = data.cta_label ?? "Explore";

  const scrollBy = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const amount = card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <Section id={section_id} className="bg-paper">
      <Box className="mb-5 flex items-end justify-between gap-6 max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:gap-4">
        <Box className="max-w-[760px]">
          <Reveal>
            <RichHeading heading={heading} emphasisClassName="font-normal" />
          </Reveal>
          {description ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}
        </Box>

        <Box className="flex flex-none gap-2.5 max-[760px]:self-end">
          {[
            { dir: -1, label: "Previous assessments", Icon: ChevronLeft },
            { dir: 1, label: "Next assessments", Icon: ChevronRight },
          ].map(({ dir, label, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => scrollBy(dir)}
              aria-label={label}
              disabled={dir < 0 ? edges.start : edges.end}
              className="grid size-10.5 cursor-pointer place-items-center rounded-full border border-ink/22 bg-white text-navy transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-default disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <Icon size={18} aria-hidden="true" />
            </button>
          ))}
        </Box>
      </Box>

      <Box
        ref={trackRef}
        role="region"
        aria-label="Related assessments"
        tabIndex={0}
        onScroll={updateEdges}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-0.5 pt-1 pb-2.5"
      >
        {items.map((item, index) => {
          const Icon = ICONS[iconKey(item.icon)] || Star;
          return (
            <Box
              as={Link}
              href={item.href}
              key={item.title}
              data-card
             
              // Navy fill slides up from the bottom on hover/focus (`.rb::before`),
              // under the content (`isolate` + `-z-10`).
              className="group relative isolate flex shrink-0 basis-[calc((100%-60px)/4)] snap-start flex-col overflow-hidden rounded-[14px] border border-ink/12 bg-white p-7 no-underline transition-[transform,box-shadow] duration-250 ease-[cubic-bezier(.2,.7,.2,1)] before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:bg-navy before:transition-transform before:duration-450 before:ease-[cubic-bezier(.2,.7,.2,1)] before:content-[''] hover:-translate-y-1 hover:shadow-lift hover:before:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lime focus-visible:before:translate-y-0 motion-reduce:before:transition-none max-[1100px]:basis-[calc((100%-20px)/2)] max-[760px]:basis-[78%]"
            >
              <Text
                as="span"
                aria-hidden="true"
                className="pointer-events-none absolute top-3 right-5 font-serif text-[64px] italic leading-none text-ink/8 transition-colors duration-300 group-hover:text-lime/25 group-focus-visible:text-lime/25"
              >
                {pad(index + 1)}
              </Text>

              <Box className="mb-4.5 grid size-11.5 place-items-center rounded-xl bg-lime-soft text-navy transition-colors duration-300 group-hover:bg-lime group-focus-visible:bg-lime">
                <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
              </Box>

              <Text
                as="h3"
                className="mb-2 font-display text-[17px] font-medium leading-[1.3] text-ink transition-colors duration-300 group-hover:text-paper group-focus-visible:text-paper"
              >
                {item.title}
              </Text>
              <Text
                as="p"
                className="mb-5.5 text-[14.5px] leading-[1.5] text-ink-muted transition-colors duration-300 group-hover:text-paper/72 group-focus-visible:text-paper/72"
              >
                {item.description}
              </Text>

              {item.tags?.length ? (
                <Box as="ul" className="mb-0 flex list-none flex-wrap gap-1.5 p-0">
                  <Box
                    as="li"
                    className="py-1 pr-0 font-body text-[12px] font-medium text-ink-muted transition-colors duration-300 group-hover:text-paper/60 group-focus-visible:text-paper/60"
                  >
                    {tagsLabel}
                  </Box>
                  {item.tags.map((tag) => (
                    <Box
                      as="li"
                      key={tag}
                      className="rounded-full border border-ink/12 bg-paper-warm px-2.5 py-1 font-body text-[12px] font-semibold text-navy transition-colors duration-300 group-hover:border-paper/30 group-hover:bg-transparent group-hover:text-paper group-focus-visible:border-paper/30 group-focus-visible:bg-transparent group-focus-visible:text-paper"
                    >
                      {tag}
                    </Box>
                  ))}
                </Box>
              ) : null}

              <Text
                as="span"
                className="mt-auto inline-flex items-center gap-2 pt-5.5 text-[14px] font-semibold text-ink transition-colors duration-300 group-hover:text-lime group-focus-visible:text-lime"
              >
                {ctaLabel}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              </Text>
            </Box>
          );
        })}
      </Box>

      {hub_link?.href ? (
        <Box className="mt-7 text-center">
          <Link
            href={hub_link.href}
            className="inline-flex items-center gap-1.5 border-b-2 border-lime pb-0.5 font-display text-[14px] font-bold text-ink no-underline"
          >
            {hub_link.label}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Box>
      ) : null}
    </Section>
  );
}
