"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/**
 * The assessment explorer — pick one of the assessment families along the top,
 * then switch between "You receive / Audience / Use cases", see the assessments
 * and example instruments in that family, and where it fits in the employee
 * lifecycle.
 *
 * Design: `#services`, `.ax4-tabs`, `.ax4`, `.ax4-seg`, `.ax4-vt`.
 */
export default function AssessmentExplorer({ data }) {
  const tabsRef = useRef(null);
  const [family, setFamily] = useState(0);
  const [segment, setSegment] = useState(0);

  const families = data?.families ?? [];
  if (!families.length) return null;

  const { section_id, heading, lede, lifecycle_stages = [], cta } = data;
  const current = families[family];
  const segments = current.segments ?? [];
  const activeSegment = segments[Math.min(segment, segments.length - 1)];

  const pickFamily = (index) => {
    setFamily(index);
    setSegment(0);
  };

  const scrollTabs = (direction) => {
    const track = tabsRef.current;
    if (!track) return;
    track.scrollBy({ left: 140 * direction, behavior: "smooth" });
  };

  return (
    <Section id={section_id} className="bg-paper">
      <Box className="mb-6 max-w-[820px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {lede ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[72ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
              {lede}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      {/* Scroll controls */}
      <Box className="mb-3 flex justify-end gap-2 max-[600px]:hidden">
        {[
          { dir: -1, label: "Scroll assessment families left", Icon: ChevronLeft },
          { dir: 1, label: "Scroll assessment families right", Icon: ChevronRight },
        ].map(({ dir, label, Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => scrollTabs(dir)}
            aria-label={label}
            className="grid size-10 place-items-center rounded-full border border-ink/22 bg-white text-navy transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Icon size={16} aria-hidden="true" />
          </button>
        ))}
      </Box>

      {/* Family tabs */}
      <Box
        ref={tabsRef}
        role="tablist"
        aria-label="Assessment families"
        className="no-scrollbar mb-1 flex snap-x gap-2 overflow-x-auto pb-3"
      >
        {families.map((fam, index) => {
          const isActive = index === family;
          return (
            <Box
              as="button"
              type="button"
              key={fam.tab}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => pickFamily(index)}
              className={cn(
                "flex min-h-16 w-30 flex-none snap-start cursor-pointer items-center justify-center rounded-xl border px-2.5 py-3 text-center font-body text-[12.5px] font-semibold leading-[1.3] transition-[transform,box-shadow,background-color] duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                isActive
                  ? "border-navy bg-navy text-paper"
                  : "border-ink/12 bg-white text-ink hover:-translate-y-0.5 hover:shadow-lift",
              )}
            >
              {fam.tab}
            </Box>
          );
        })}
      </Box>

      {/* Panel */}
      <Box className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1.25fr)_210px] overflow-hidden rounded-2xl border border-ink/12 bg-paper-warm max-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] max-[900px]:grid-cols-1">
        {/* Left — overview + segments */}
        <Box className="min-w-0 p-6 sm:p-7">
          <Text as="h3" className="font-display text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
            {current.title}
          </Text>
          <Text as="p" className="mt-2 text-[14px] leading-[1.5] text-ink/60">
            {current.description}
          </Text>

          {/* Segment switch */}
          <Box role="tablist" aria-label={`${current.title} details`} className="my-4.5 flex gap-1 rounded-full border border-ink/12 bg-white p-1">
            {segments.map((seg, index) => {
              const isActive = index === Math.min(segment, segments.length - 1);
              return (
                <Box
                  as="button"
                  type="button"
                  key={seg.label}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setSegment(index)}
                  className={cn(
                    "flex-1 cursor-pointer rounded-full px-2 py-1.75 text-center font-body text-[12.5px] font-semibold leading-[1.3] transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-navy",
                    isActive ? "bg-lime-soft text-navy" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {seg.label}
                </Box>
              );
            })}
          </Box>

          <Box as="ul" className="m-0 list-none p-0">
            {activeSegment?.items.map((item, index) => (
              <Box
                as="li"
                key={item}
                className="flex items-center gap-3 border-b border-ink/12 py-2 text-[14px] leading-[1.4] text-ink last:border-b-0"
              >
                <Box
                  as="span"
                  aria-hidden="true"
                  className="grid size-6 flex-none place-items-center rounded-full border border-navy font-mono text-[11px] text-navy"
                >
                  {index + 1}
                </Box>
                {item}
              </Box>
            ))}
          </Box>

          {current.links?.length ? (
            <Box className="mt-4 flex flex-col gap-1.5">
              {current.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-olive no-underline hover:underline"
                >
                  {link.label}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </Box>
          ) : null}
        </Box>

        {/* Middle — assessments + instruments */}
        <Box className="min-w-0 bg-white p-6 sm:p-7 max-[1100px]:border-t max-[1100px]:border-ink/12 max-[900px]:border-t-0">
          <Box className="mb-2 grid grid-cols-[minmax(0,1fr)_168px] gap-3.5 border-b border-ink/22 pb-2 max-[600px]:grid-cols-1" aria-hidden="true">
            <Text as="span" className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60">
              {current.assessments.length} assessments
            </Text>
            <Text as="span" className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60 max-[600px]:hidden">
              Example instrument
            </Text>
          </Box>
          <Box as="ul" className="m-0 list-none p-0">
            {current.assessments.map((assessment) => (
              <Box
                as="li"
                key={assessment.name}
                className="grid grid-cols-[minmax(0,1fr)_168px] items-center gap-3.5 border-b border-ink/12 py-2.25 last:border-b-0 max-[600px]:grid-cols-1 max-[600px]:gap-1.5"
              >
                <Text as="span" className="font-display text-[13.5px] font-semibold leading-[1.3] text-ink">
                  {assessment.name}
                </Text>
                <Box className="flex flex-wrap gap-1">
                  {assessment.instruments?.length ? (
                    assessment.instruments.map((instrument) => (
                      <Text
                        as="span"
                        key={instrument}
                        className="rounded-md bg-lime-soft px-2 py-0.75 text-[11px] font-semibold leading-[1.3] text-navy"
                      >
                        {instrument}
                      </Text>
                    ))
                  ) : (
                    <Text as="span" className="text-[11.5px] italic text-ink/50">
                      Configured per role
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right — lifecycle track */}
        <Box className="min-w-0 bg-navy-soft/0 p-6 sm:p-7 max-[1100px]:col-span-full max-[1100px]:border-t max-[1100px]:border-ink/12">
          <Text as="span" className="mb-3 block font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60">
            Lifecycle stage
          </Text>
          <Box
            as="ol"
            className="m-0 list-none p-0 max-[1100px]:grid max-[1100px]:grid-cols-3 max-[1100px]:gap-x-4 max-[900px]:grid-cols-2"
          >
            {lifecycle_stages.map((stage, index) => {
              const on = current.lifecycle?.[index];
              return (
                <Box
                  as="li"
                  key={stage}
                  className={cn(
                    "relative pb-2.75 pl-6 text-[12.5px] leading-[1.35] max-[1100px]:pb-0",
                    on ? "font-semibold text-ink" : "text-ink/60",
                  )}
                >
                  <Box
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-0.5 size-3 rounded-full border-2",
                      on ? "border-navy bg-navy" : "border-ink/22 bg-paper-warm",
                    )}
                  />
                  {stage}
                  {on ? <span className="sr-only"> (applies)</span> : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {cta?.heading ? (
        <Reveal>
          <Box className="mt-10 flex items-center justify-between gap-6 rounded-2xl border border-ink/12 bg-white px-7 py-6 shadow-[inset_4px_0_0_var(--color-lime)] max-[900px]:flex-col max-[900px]:items-start">
            <Box>
              <Text as="p" className="font-display text-[19px] font-bold tracking-[-0.01em] text-ink">
                {cta.heading}
              </Text>
              {cta.description ? (
                <Text as="p" className="mt-1 text-[15px] leading-[1.5] text-ink/60">
                  {cta.description}
                </Text>
              ) : null}
            </Box>
            {cta.href ? (
              <CtaButton arrow className="flex-none" render={<Link href={cta.href} />}>
                {cta.btn_label}
              </CtaButton>
            ) : null}
          </Box>
        </Reveal>
      ) : null}
    </Section>
  );
}
