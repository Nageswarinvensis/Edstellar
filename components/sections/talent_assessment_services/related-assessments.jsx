"use client";

import { useRef } from "react";
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
  "user-check": UserRoundCheck,
  clipboard: ClipboardList,
  wrench: Wrench,
  brain: Brain,
  languages: Languages,
  building: Building2,
  smile: Smile,
};

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
  const items = data?.items ?? [];

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
      <Box className="mb-5 flex items-end justify-between gap-6">
        <Box className="max-w-[760px]">
          <Reveal>
            <RichHeading heading={heading} emphasisClassName="font-normal" />
          </Reveal>
          {description ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}
        </Box>

        <Box className="flex flex-none gap-2.5 max-[760px]:hidden">
          {[
            { dir: -1, label: "Previous assessments", Icon: ChevronLeft },
            { dir: 1, label: "Next assessments", Icon: ChevronRight },
          ].map(({ dir, label, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => scrollBy(dir)}
              aria-label={label}
              className="grid size-10.5 place-items-center rounded-full border border-ink/22 bg-white text-navy transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lift"
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
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-0.5 pt-1 pb-2.5"
      >
        {items.map((item, index) => {
          const Icon = ICONS[item.icon] || Star;
          return (
            <Box
              as={Link}
              href={item.href}
              key={item.title}
              data-card
              title={`Click Here to View ${item.title}`}
              className="group relative flex shrink-0 basis-[calc((100%-60px)/4)] snap-start flex-col overflow-hidden rounded-[14px] border border-ink/12 bg-white p-7 no-underline transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:bg-navy hover:shadow-lift max-[1100px]:basis-[calc((100%-40px)/3)] max-[760px]:basis-[78%]"
            >
              <Text
                as="span"
                aria-hidden="true"
                className="pointer-events-none absolute top-3 right-5 font-serif text-[64px] italic leading-none text-ink/8 transition-colors duration-300 group-hover:text-lime/25"
              >
                {pad(index + 1)}
              </Text>

              <Box className="mb-4.5 grid size-11.5 place-items-center rounded-xl bg-lime-soft text-navy transition-colors duration-300 group-hover:bg-lime">
                <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
              </Box>

              <Text
                as="h3"
                className="mb-2 font-display text-[17px] font-bold leading-[1.3] text-ink transition-colors duration-300 group-hover:text-paper"
              >
                {item.title}
              </Text>
              <Text
                as="p"
                className="mb-5.5 text-[14.5px] leading-[1.5] text-ink/60 transition-colors duration-300 group-hover:text-paper/72"
              >
                {item.description}
              </Text>

              {item.tags?.length ? (
                <Box as="ul" className="mb-0 flex list-none flex-wrap gap-1.5 p-0">
                  <Box
                    as="li"
                    className="py-1 pr-0 font-body text-[12px] font-medium text-ink/60 transition-colors duration-300 group-hover:text-paper/60"
                  >
                    {tagsLabel}
                  </Box>
                  {item.tags.map((tag) => (
                    <Box
                      as="li"
                      key={tag}
                      className="rounded-full border border-ink/12 bg-paper-warm px-2.5 py-1 font-body text-[12px] font-semibold text-navy transition-colors duration-300 group-hover:border-paper/30 group-hover:bg-transparent group-hover:text-paper"
                    >
                      {tag}
                    </Box>
                  ))}
                </Box>
              ) : null}

              <Text
                as="span"
                className="mt-auto inline-flex items-center gap-2 pt-5.5 text-[14px] font-semibold text-ink transition-colors duration-300 group-hover:text-lime"
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
