"use client";

import { useRef, useState } from "react";
import { ArrowRight, Clock, Users } from "lucide-react";

import { approxDuration } from "@/lib/duration";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

const ALL = "__all__";
/** Categories shown before the "+N more" chip. */
const VISIBLE_CATEGORIES = 5;

const CHIP =
  "cursor-pointer rounded-full border px-2.5 py-1 font-body text-[11.5px] leading-[1.4] transition-[border-color,background-color,color] duration-200";
const CHIP_OFF = "border-ink/12 bg-white font-medium text-ink hover:border-ink/22";

/** Same hover title as the domain and catalog pages' course links. */
const courseLinkTitle = (name) =>
  `Click here to view the ${String(name).replace(/\s+(Corporate\s+)?Training$/i, "")} training program`;

/**
 * One course in a program's catalog pop-up: name (linked to the course page
 * when it has an `href`), duration + delivery, blurb.
 */
function CatalogCourse({ course, deliveryLabel }) {
  // "Active Listening & Empathy at " + "Work" — the last word goes with the arrow.
  const split = course.name.lastIndexOf(" ") + 1;
  const lead = course.name.slice(0, split);
  const last = course.name.slice(split);
  return (
    <Box className="rounded-xl border border-ink/12 bg-paper px-4 py-3.5">
      <Text
        as="h4"
        className="mb-1.5 text-[15px] leading-[1.3] font-semibold tracking-normal text-navy"
      >
        {course.href ? (
          <a
            href={course.href}
            target="_blank"
            rel="noopener"
            title={courseLinkTitle(course.name)}
            className="group/course hover:underline hover:underline-offset-3"
          >
            {lead}
            {/* Same straight arrow as the site's CTA buttons, glued to the
                name's last word so it never wraps onto a line of its own;
                nudged right on hover. */}
            <span className="whitespace-nowrap">
              {last}
              <ArrowRight
                size={15}
                strokeWidth={2.25}
                aria-hidden="true"
                className="ml-1.5 inline-block align-[-2px] transition-transform duration-200 group-hover/course:translate-x-0.5"
              />
            </span>
          </a>
        ) : (
          course.name
        )}
      </Text>
      {/* Same meta line as the domain page's course cards (domain/topics.jsx):
          clock + approximate duration, a divider, people + delivery. */}
      <Box className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink">
        {course.duration ? (
          <Box as="span" className="inline-flex items-center gap-1">
            <Clock size={13} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-ink-muted" />
            {approxDuration(course.duration)}
          </Box>
        ) : null}
        {course.duration && deliveryLabel ? (
          <Box as="span" aria-hidden="true" className="h-3 w-px shrink-0 bg-ink/22" />
        ) : null}
        {deliveryLabel ? (
          <Box as="span" className="inline-flex items-center gap-1">
            <Users size={13} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-ink-muted" />
            {deliveryLabel}
          </Box>
        ) : null}
      </Box>
      {course.description ? (
        <Text as="p" className="text-[13.5px] leading-[1.55]">
          {course.description}
        </Text>
      ) : null}
    </Box>
  );
}

/**
 * A program's course list inside its catalog pop-up, with category filter
 * chips ("All" plus each `category` its courses carry, with counts) when the
 * courses have more than one category. Server-rendered like any Client
 * Component, so every course is in the page HTML with "All" selected; the
 * filter only hides cards in the browser.
 *
 * Chips are sorted by course count (most first). Only the top few show until
 * "+N more" expands the rest — a program can carry 20+ categories, which would
 * otherwise push the courses out of the pop-up.
 * `data-scroll` stays on the course grid: ProgramCatalog scrolls it to the
 * top on open.
 *
 * Chip style: the domain page's bundle filter (domain/bundles.jsx).
 */
export default function CatalogCourses({ courses, deliveryLabel, label }) {
  const [active, setActive] = useState(ALL);
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef(null);

  const counts = new Map();
  for (const course of courses) {
    if (course.category) counts.set(course.category, (counts.get(course.category) ?? 0) + 1);
  }
  // Biggest categories first; ties keep the data's order (stable sort).
  const categories = [...counts]
    .map(([cat, count]) => ({ cat, label: cat, count }))
    .sort((a, b) => b.count - a.count);
  const hiddenCount = Math.max(0, categories.length - VISIBLE_CATEGORIES);
  // Collapsed: the top few, plus the selected one if it sits further down.
  const visible = expanded
    ? categories
    : categories.filter((filter, i) => i < VISIBLE_CATEGORIES || filter.cat === active);
  const filters = [{ cat: ALL, label: "All", count: courses.length }, ...visible];
  const shown = active === ALL ? courses : courses.filter((course) => course.category === active);

  return (
    <>
      {counts.size > 1 ? (
        <Box
          role="group"
          data-catalog-filter=""
          aria-label={`Filter ${label} courses by category`}
          // Expanded, a long list scrolls inside its own box (mostly on phones)
          // so the courses always keep room below it.
          className="mb-4 flex max-h-[30vh] flex-none flex-wrap gap-1.5 overflow-y-auto"
        >
          {filters.map((filter) => {
            const isActive = active === filter.cat;
            return (
              <button
                key={filter.cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setActive(filter.cat);
                  gridRef.current?.scrollTo(0, 0);
                }}
                className={`${CHIP} ${isActive ? "border-navy bg-navy font-semibold text-lime" : CHIP_OFF}`}
              >
                {filter.label} ({filter.count})
              </button>
            );
          })}
          {hiddenCount > 0 ? (
            <button
              type="button"
              aria-expanded={expanded}
              title={expanded ? "Click here to show fewer categories" : "Click here to show all categories"}
              onClick={() => setExpanded((value) => !value)}
              className={`${CHIP} border-dashed border-ink/22 bg-white font-semibold text-navy hover:border-navy`}
            >
              {expanded ? "Show less" : `+${hiddenCount} more`}
            </button>
          ) : null}
        </Box>
      ) : null}

      <Box
        ref={gridRef}
        data-scroll=""
        className="grid min-h-0 flex-1 content-start gap-3 overflow-auto pr-1 sm:grid-cols-2"
      >
        {shown.map((course, courseIndex) => (
          <CatalogCourse
            key={`${course.name}-${courseIndex}`}
            course={course}
            deliveryLabel={deliveryLabel}
          />
        ))}
      </Box>
    </>
  );
}
