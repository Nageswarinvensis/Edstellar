"use client";

import { useState } from "react";
import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import CtaButton from "@/components/common/cta-button";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

const ORG_ICONS = {
  startup:    <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 13l-3-1 2-4h5M11 15l1 3 4-2v-5M9 13l2 2M14.5 4.5C17 3 21 3 21 3s0 4-1.5 6.5L13 16l-5-5 6.5-6.5Z" />,
  smb:        <path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M10 20v-5h4v5" />,
  midmarket:  <path d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17.5l9 4.5 9-4.5" />,
  enterprise: <path d="M3 21h18M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M15 9h3a1 1 0 0 1 1 1v11M8 8h4M8 12h4M8 16h4" />,
  nonprofit:  <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  education:  <path d="M2 9l10-5 10 5-10 5L2 9ZM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6" />,
  government: <path d="M3 21h18M4 18h16M12 3l9 5H3l9-5ZM6 8v10M10 8v10M14 8v10M18 8v10" />,
};

const BIZ = ["startup", "smb", "midmarket", "enterprise"];
const PUB = ["nonprofit", "education", "government"];

const FIT_LABELS = { 3: "Strong fit", 2: "Good fit", 1: "On request" };

function FitMeter({ value }) {
  return (
    <Box className="flex gap-[3px]" role="img" aria-label={FIT_LABELS[value] ?? ""}>
      {[1, 2, 3].map((i) => (
        <Box
          key={i}
          className={`h-2 w-[26px] rounded-[2px] ${
            value === 3
              ? "bg-lime"
              : value === 2
              ? i <= 2 ? "bg-lime/65" : "bg-paper/[0.12]"
              : i === 1 ? "bg-lime/22" : "bg-paper/[0.12]"
          }`}
        />
      ))}
    </Box>
  );
}

function SpectrumTrack({ label, subtitle, types, activeId, onSelect, cols }) {
  return (
    <Box className="rounded-[14px] border border-ink/[0.12] bg-white px-6 pb-[14px] pt-4">
      <Box className="mb-3 flex items-baseline justify-between gap-3">
        <Text as="p" className="m-0 text-[15px] font-semibold text-ink">
          {label}{subtitle && <span className="ml-2 font-normal text-ink-muted">{subtitle}</span>}
        </Text>
      </Box>

      {/* Dot stops on a track line */}
      <Box
        as="ul"
        role="tablist"
        className={`relative m-0 grid list-none p-0 ${cols === 4 ? "grid-cols-4" : "grid-cols-3"}`}
      >
        {/* Horizontal connector line */}
        <Box
          aria-hidden="true"
          className={`pointer-events-none absolute top-4 h-[2px] ${cols === 4 ? "bg-gradient-to-r from-ink/12 to-ink" : "bg-ink/20"}`}
          style={{ left: "12%", right: "12%" }}
        />

        {types.map((type) => {
          const isActive = type.id === activeId;
          return (
            <Box as="li" key={type.id} role="none">
              <button
                role="tab"
                id={`tab-${type.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${type.id}`}
                onClick={() => onSelect(type.id)}
                className="flex w-full flex-col items-center gap-3 px-1 py-0 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:rounded-[10px]"
              >
                {/* Dot */}
                <Box className={`relative z-10 flex size-8 items-center justify-center rounded-full border-2 transition-[transform,box-shadow] duration-200 ${
                  isActive
                    ? "border-ink bg-ink shadow-[0_0_0_6px_rgba(10,22,40,.10)]"
                    : "border-ink/30 bg-white hover:scale-105 hover:shadow-[0_1px_2px_rgba(10,22,40,.07),0_4px_16px_rgba(10,22,40,.07)]"
                }`}>
                  {isActive && (
                    <Box className="size-[10px] rounded-full bg-lime" />
                  )}
                </Box>
                <Text as="b" className={`block text-[14px] font-semibold leading-snug ${isActive ? "text-ink" : "text-ink-muted"}`}>
                  {type.label}
                </Text>
              </button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function WwsOrgExplorer({ data }) {
  const [activeId, setActiveId] = useState(data?.types?.[0]?.id ?? "startup");

  if (!data?.types?.length) return null;

  // A stale id falls back to the first type, as before.
  const shownId = data.types.some((t) => t.id === activeId) ? activeId : data.types[0].id;
  const bizTypes = data.types.filter((t) => BIZ.includes(t.id));
  const pubTypes = data.types.filter((t) => PUB.includes(t.id));

  return (
    <Section
      id="types"
      aria-labelledby="types-h"
      className="scroll-mt-20 bg-paper py-14 lg:py-14"
    >
      {/* xhead — 2-column on desktop */}
      <Box className="mb-6 grid max-[900px]:grid-cols-1 max-[900px]:gap-4 min-[901px]:grid-cols-[1.15fr_1fr] min-[901px]:items-end min-[901px]:gap-6">
        <RichHeading
          as="h2"
          id="types-h"
          heading={data.heading}
          className="m-0 text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
        />
        <Text as="p" className="m-0 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
          {data.lede}
        </Text>
      </Box>

      {/* Two spectrum tracks */}
      <Box className="grid gap-6 max-[900px]:grid-cols-1 min-[901px]:grid-cols-[1.15fr_1fr]">
        <SpectrumTrack
          label="Businesses"
          subtitle="Start-up to enterprise"
          types={bizTypes}
          activeId={activeId}
          onSelect={setActiveId}
          cols={4}
        />
        <SpectrumTrack
          label="Social and public sector"
          types={pubTypes}
          activeId={activeId}
          onSelect={setActiveId}
          cols={3}
        />
      </Box>

      {/* One panel per organization type, all in the server HTML (inactive
          ones `hidden`), so every type's copy is in the page source. */}
      {data.types.map((activeType) => (
        <Box
          key={activeType.id}
          role="tabpanel"
          id={`panel-${activeType.id}`}
          aria-labelledby={`tab-${activeType.id}`}
          hidden={activeType.id !== shownId}
          tabIndex={0}
          className="mt-6 grid items-stretch gap-6 max-[1200px]:grid-cols-1 min-[1201px]:grid-cols-[1.15fr_1fr]"
        >
          {/* Left: text content */}
          <Box className="flex flex-col rounded-[14px] bg-white px-8 py-6 shadow-[0_1px_2px_rgba(10,22,40,.07),0_4px_16px_rgba(10,22,40,.07)] max-[600px]:px-6">
            {/* Header */}
            <Box as="header" className="mb-2 flex items-center gap-4">
              <Box className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-ink text-lime">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-[18px]"
                  aria-hidden="true"
                >
                  {ORG_ICONS[activeType.id]}
                </svg>
              </Box>
              <Text as="h3" className="m-0 font-display text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
                {activeType.heading}
              </Text>
            </Box>

            <Text as="p" className="mb-5 mt-1 text-[15px] leading-[1.6] text-ink-muted">
              {activeType.tagline}
            </Text>

            {/* Tick list */}
            <Box as="ul" className="m-0 grid list-none gap-2 p-0">
              {activeType.ticks.map((tick) => (
                <Box as="li" key={tick} className="flex gap-3 leading-[1.55]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-5 shrink-0 text-olive" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" />
                  </svg>
                  <Text as="span" className="text-[15px] text-ink">{tick}</Text>
                </Box>
              ))}
            </Box>

            {/* Tools row */}
            <Box className="mb-5 mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <Text as="span" className="m-0 shrink-0 text-[14px] font-semibold text-ink">
                Edstellar tools
              </Text>
              <Box className="flex flex-wrap gap-2">
                {activeType.tools.map((tool) => (
                  <Box
                    key={tool}
                    as="span"
                    className="inline-flex items-center rounded-full border border-ink/[0.12] bg-paper-warm px-3 py-1 text-[13px] font-semibold"
                  >
                    {tool}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Footer */}
            <Box className="mt-auto border-t border-ink/[0.12] pt-4">
              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border-[1.5px] border-transparent bg-ink px-7 text-[14px] font-semibold text-lime transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(10,22,40,.12)]"
              >
                Talk to an Edstellar expert
              </a>
            </Box>
          </Box>

          {/* Right: service fit */}
          <Box className="flex flex-col rounded-[14px] bg-ink px-8 py-5 shadow-[0_1px_2px_rgba(10,22,40,.07),0_4px_16px_rgba(10,22,40,.07)] max-[600px]:px-6">
            {/* Header */}
            <Box className="mb-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <Text as="p" className="m-0 text-[15px] font-semibold text-paper">
                How each Edstellar service fits
              </Text>
              {/* Legend */}
              <Box className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-paper/72" aria-hidden="true">
                {[{ v: 3, label: "Strong fit" }, { v: 2, label: "Good fit" }, { v: 1, label: "On request" }].map(({ v, label }) => (
                  <Box key={v} className="inline-flex items-center gap-2">
                    <Box className="flex gap-[2px]">
                      {[1,2,3].map((i) => (
                        <Box key={i} className={`h-[10px] w-[10px] rounded-[2px] ${v===3?"bg-lime":v===2&&i<=2?"bg-lime/65":"bg-paper/[0.12]"}`} />
                      ))}
                    </Box>
                    {label}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Fit rows — show all services; grey bars for 0 */}
            <Box className="flex flex-1 flex-col">
              {data.services.map((service, i) => {
                const fitValue = activeType.fit[i] ?? 0;
                const row = "flex min-h-[36px] items-center justify-between gap-4 border-b border-paper/[0.12] py-[6px] last:border-0";
                const content = (
                  <>
                    <span className="text-[15px] font-semibold text-paper">{service.label}</span>
                    <FitMeter value={fitValue} />
                  </>
                );
                // A service without a page yet (Academies) is a plain row.
                return service.href ? (
                  <Link
                    key={service.label}
                    href={service.href}
                    className={cn(row, "no-underline hover:underline hover:underline-offset-[4px]")}
                  >
                    {content}
                  </Link>
                ) : (
                  <Box key={service.label} className={row}>
                    {content}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      ))}
    </Section>
  );
}
