"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { RAIL_CATEGORY_ICONS } from "./rail-icons";
import { RailCard, RailEyebrow, RailHeading } from "./rail-card";

const fmt = (n) => n.toLocaleString("en-US");

/**
 * "Explore training" rail card: delivery chips, an optional "From this
 * article" domain, then the six category groups — each opens to its domains
 * with course counts — and a "Browse all" link.
 *
 * Design: Blog page v2 `.rx`, `.rx-chips`, `.rx-feat`, `.rx-list`,
 * `.rx-row`, `.rx-panel`, `.rx-all`.
 */
export default function CategoryExplorer({ categories = [], featuredDomain }) {
  const [open, setOpen] = useState(null);

  const allDomains = categories.flatMap((group) =>
    group.domains.map((domain) => ({ ...domain, group: group.key })),
  );
  const featured = featuredDomain
    ? allDomains.find((domain) => domain.name === featuredDomain)
    : null;
  const totalCourses = allDomains.reduce((sum, d) => sum + d.course_count, 0);

  if (!categories.length) return null;

  return (
    <RailCard aria-labelledby="rail-explore-h">
      <RailEyebrow>Explore training</RailEyebrow>
      <RailHeading
        id="rail-explore-h"
        lead="Instructor-led training for"
        emphasis="your teams"
      />

      <Box as="ul" aria-label="Delivery options" className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
        {["Onsite", "Virtual", "Customized"].map((chip) => (
          <Box
            as="li"
            key={chip}
            className="rounded-full border border-ink/22 px-2.25 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.1em] text-ink"
          >
            {chip}
          </Box>
        ))}
      </Box>

      {featured ? (
        <a
          href={featured.href}
          className="mt-3.5 flex items-center gap-3 rounded-xl bg-navy p-3 text-paper no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lift"
        >
          <GroupIcon group={featured.group} dark />
          <span className="flex min-w-0 flex-1 flex-col">
            <small className="font-mono text-[10px] uppercase tracking-[0.12em] text-lime">
              From this article
            </small>
            <b className="mt-0.5 font-display text-[14px] leading-[1.3] font-semibold">
              {featured.name}
            </b>
            <span className="text-[12px] text-paper/70">
              {fmt(featured.course_count)} courses
            </span>
          </span>
          <ArrowUpRight size={16} className="flex-none text-lime" aria-hidden="true" />
        </a>
      ) : null}

      <Box as="ul" className="mt-2.5 flex list-none flex-col gap-1.5 p-0">
        {categories.map((group) => {
          const isOpen = open === group.key;
          const count = group.domains.reduce((sum, d) => sum + d.course_count, 0);
          const panelId = `rail-cat-${group.key}`;

          return (
            <Box
              as="li"
              key={group.key}
              className={cn(
                "rounded-xl border transition-colors duration-300",
                isOpen ? "border-ink/22 bg-white" : "border-ink/12 bg-paper",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : group.key)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl py-2 pr-2.5 pl-2 text-left transition-transform duration-200 hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <GroupIcon group={group.key} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <b className="font-display text-[14px] leading-[1.3] font-semibold text-ink">
                    {group.label}
                  </b>
                  <span className="text-[12px] leading-[1.4] text-ink/60">
                    {group.domains.length}{" "}
                    {group.domains.length === 1 ? "domain" : "domains"} ·{" "}
                    {fmt(count)} courses
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={cn(
                    "flex-none text-ink transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              <Box
                id={panelId}
                hidden={!isOpen}
                className="mx-2 border-t border-ink/12 pt-1.5 pb-2"
              >
                <Box as="ul" className="m-0 max-h-56 list-none overflow-auto p-0 pr-1 [scrollbar-width:thin]">
                  {group.domains.map((domain) => (
                    <Box as="li" key={domain.name} className="border-b border-dashed border-ink/12 last:border-b-0">
                      <a
                        href={domain.href}
                        className="group flex justify-between gap-2.5 px-1 py-1.75 text-[13px] leading-[1.35] text-ink no-underline"
                      >
                        <span className="group-hover:underline group-hover:underline-offset-3">
                          {domain.name}
                        </span>
                        <i className="font-mono text-[11px] not-italic text-ink/60">
                          {domain.course_count}
                        </i>
                      </a>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <a
        href="/corporate-training-catalog"
        className="mt-3 flex items-center gap-2 border-t border-ink/12 pt-3 text-[13px] font-semibold text-navy no-underline"
      >
        <span className="flex-1 underline decoration-1 underline-offset-3">
          Browse all {allDomains.length} domains
        </span>
        <i className="font-mono text-[11px] font-normal not-italic text-ink/60">
          {fmt(totalCourses)} courses
        </i>
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </RailCard>
  );
}

function GroupIcon({ group, dark = false }) {
  const Icon = RAIL_CATEGORY_ICONS[group];
  if (!Icon) return null;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 flex-none place-items-center rounded-[10px]",
        dark ? "bg-lime/14 text-lime" : "bg-paper-warm text-navy",
      )}
    >
      <Icon size={20} strokeWidth={1.6} />
    </span>
  );
}
