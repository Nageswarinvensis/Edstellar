"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, X } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const pad = (n, width = 2) => String(n).padStart(width, "0");
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * The A–Z catalog: a search over domain names and course titles, an A–Z
 * jump bar, then one accordion per domain listing its courses as tiles
 * (the first `preview`, then "Show all N courses"). While searching, domains
 * with matching courses open and show only those courses.
 *
 * Every domain and course link is rendered into the HTML — closed panels
 * and filtered-out items are `hidden`, not missing — so all 2,000+ course
 * pages stay linked for crawlers. Link styles sit on the list (`[&_a]:…`)
 * rather than each tile, to keep that HTML small.
 *
 * Design: corporate-training-catalog `#catalog`, `.entries`, `.tiles`.
 */
export default function CatalogBrowser({ data, domains }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(() => new Set(domains[0] ? [domains[0].slug] : []));
  const [expanded, setExpanded] = useState(() => new Set());

  const needle = query.trim().toLowerCase();
  const totalCourses = useMemo(() => domains.reduce((sum, d) => sum + d.courses.length, 0), [domains]);

  // Per domain: does it match, and which of its courses do.
  const results = useMemo(
    () =>
      domains.map((domain) => {
        if (!needle) return { visible: true, courses: null };
        const nameHit = domain.name.toLowerCase().includes(needle);
        const courseHits = new Set(domain.courses.filter((c) => c.label.toLowerCase().includes(needle)).map((c) => c.href));
        return { visible: nameHit || courseHits.size > 0, courses: nameHit ? null : courseHits };
      }),
    [domains, needle],
  );
  const shownCount = results.filter((r) => r.visible).length;

  const firstByLetter = useMemo(() => {
    const map = new Map();
    for (const domain of domains) {
      const letter = domain.name.charAt(0).toUpperCase();
      if (!map.has(letter)) map.set(letter, domain.slug);
    }
    return map;
  }, [domains]);

  const toggle = (setter, slug) =>
    setter((current) => {
      const next = new Set(current);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });

  return (
    <Box>
      <Box className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <Text as="p" role="status" className="text-[15px] text-ink/70">
          Showing <b className="font-semibold text-ink">{shownCount}</b> of {domains.length} domains · {totalCourses.toLocaleString("en-US")} courses
        </Text>
        <Box role="search" className="relative w-full sm:w-105">
          <label htmlFor="catalog-q" className="sr-only">
            {data.search_label}
          </label>
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4.5 -translate-y-1/2 text-ink-muted" />
          <input
            id="catalog-q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={data.search_placeholder}
            autoComplete="off"
            className="w-full rounded-full border border-ink/20 bg-white py-3 pr-11 pl-12 text-[15.5px] text-ink outline-none placeholder:text-ink/45 focus:border-navy [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-ink-muted hover:bg-ink/6"
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}
        </Box>
      </Box>

      <Box as="nav" aria-label={data.letters_label} className="mb-6">
        <Box as="ol" className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {LETTERS.map((letter) => {
            const target = firstByLetter.get(letter);
            return (
              <li key={letter}>
                {target ? (
                  <a
                    href={`#${target}`}
                    aria-label={`Domains starting with ${letter}`}
                    onClick={() => setOpen((current) => new Set(current).add(target))}
                    className="grid h-9 w-9 place-items-center border border-ink/20 bg-white font-mono text-[13px] text-ink hover:border-navy hover:bg-navy hover:text-paper"
                  >
                    {letter}
                  </a>
                ) : (
                  <Text as="span" aria-hidden="true" className="grid h-9 w-9 place-items-center font-mono text-[13px] text-ink/30">
                    {letter}
                  </Text>
                )}
              </li>
            );
          })}
        </Box>
      </Box>

      <Box as="ol" className="m-0 list-none border-t-2 border-ink p-0">
        {domains.map((domain, index) => {
          const result = results[index];
          const isOpen = needle ? result.visible : open.has(domain.slug);
          const showAll = expanded.has(domain.slug) || Boolean(needle);
          const panelId = `p-${domain.slug}`;
          let tileIndex = 0;
          return (
            <li key={domain.slug} id={domain.slug} hidden={!result.visible} className="scroll-mt-32 border-b border-ink/12">
              {/* A heading by role, not an <h3>: the global h1–h3 `span` rule
                  (serif italic emphasis) would otherwise italicise every
                  span in this row. */}
              <Box role="heading" aria-level={3}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(setOpen, domain.slug)}
                  className="flex w-full cursor-pointer items-center gap-2.5 py-5 pr-2 text-left sm:gap-4"
                >
                  <Text as="span" className="w-7 flex-none font-mono text-[11.5px] text-ink-muted sm:w-9">
                    {pad(index + 1)}
                  </Text>
                  {/* `min-w-0` lets a long domain name wrap on a phone instead of
                      pushing the count and chevron past the screen edge. */}
                  <Text as="span" className="min-w-0 font-display text-[clamp(17px,1.6vw,20px)] font-semibold text-ink max-sm:flex-1">
                    {domain.name} training
                  </Text>
                  <Box as="span" aria-hidden="true" className="h-px flex-1 border-t border-dotted border-ink/25 max-sm:hidden" />
                  <Text as="span" className="font-mono text-[12.5px] whitespace-nowrap text-ink-muted">
                    {domain.courses.length} {domain.courses.length === 1 ? "course" : "courses"}
                  </Text>
                  <ChevronDown size={18} aria-hidden="true" className={cn("flex-none text-ink transition-transform", isOpen && "rotate-180")} />
                </button>
              </Box>
              <Box id={panelId} hidden={!isOpen} className="pb-6 pl-0 sm:pl-13">
                <Box
                  as="ol"
                  className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3 [&_a]:flex [&_a]:h-full [&_a]:gap-3 [&_a]:rounded-[10px] [&_a]:border [&_a]:border-ink/12 [&_a]:bg-white [&_a]:px-4 [&_a]:py-3.5 [&_a]:text-[15px] [&_a]:leading-snug [&_a]:text-ink [&_a]:transition-colors [&_a:hover]:border-navy"
                >
                  {domain.courses.map((course) => {
                    const match = !result.courses || result.courses.has(course.href);
                    const position = match ? tileIndex++ : -1;
                    const shown = match && (showAll || position < data.preview);
                    return (
                      <li key={course.href} hidden={!shown}>
                        <Link href={course.href} prefetch={false}>
                          <Text as="span" className="pt-0.5 font-mono text-[11px] text-ink-muted">
                            {pad(position + 1, 3)}
                          </Text>
                          {course.label}
                        </Link>
                      </li>
                    );
                  })}
                </Box>
                <Box className="mt-4 flex flex-wrap items-center gap-3">
                  {!needle && domain.courses.length > data.preview ? (
                    <button
                      type="button"
                      aria-expanded={showAll}
                      aria-controls={panelId}
                      onClick={() => toggle(setExpanded, domain.slug)}
                      className="cursor-pointer rounded-full border border-ink/25 px-5 py-2.5 font-display text-[14px] font-semibold text-ink hover:border-navy"
                    >
                      {showAll ? "Show fewer courses" : `Show all ${domain.courses.length} courses`}
                    </button>
                  ) : null}
                  <Link
                    href={domain.href}
                    prefetch={false}
                    className="rounded-full border border-ink/25 px-5 py-2.5 font-display text-[14px] font-semibold text-ink hover:border-navy"
                  >
                    {data.domain_link.replace("{name}", domain.name)}
                  </Link>
                </Box>
              </Box>
            </li>
          );
        })}
      </Box>

      {shownCount === 0 ? (
        <Box className="rounded-[16px] border border-ink/12 bg-white px-7 py-8 text-center">
          <Text as="p" className="mb-2 font-display text-[20px] font-semibold text-ink">
            {data.empty.heading}
          </Text>
          <Text as="p" className="mx-auto mb-6 max-w-[56ch] text-[15.5px]">
            {data.empty.text}
          </Text>
          <Box className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setQuery("")}
              className="cursor-pointer rounded-full border border-ink/25 px-5 py-2.5 font-display text-[14px] font-semibold text-ink hover:border-navy"
            >
              {data.empty.reset}
            </button>
            <a href={data.empty.cta.href} className="rounded-full bg-navy px-5 py-2.5 font-display text-[14px] font-semibold text-lime">
              {data.empty.cta.label}
            </a>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
