"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import StrongText from "@/components/sections/resources_hub/strong-text";
import { cn } from "@/lib/utils";

/** "1 … 4 5 6 … 12" — first, last and a window around the current page. */
function pageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const range = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) range.push("…start");
  for (let n = start; n <= end; n++) range.push(n);
  if (end < total - 1) range.push("…end");
  range.push(total);
  return range;
}

function ResourceCard({ item, hidden }) {
  const external = item.cta?.external;
  return (
    <Box
      as="article"
      className={cn(
        // A class, not the `hidden` attribute: `flex` would override the
        // attribute's `display: none`.
        hidden ? "hidden" : "flex",
        "group flex-col overflow-hidden rounded-[18px] border border-ink/12 bg-white transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.5 hover:border-ink/22 hover:shadow-[0_26px_54px_-30px_rgba(10,22,40,0.45)]",
      )}
    >
      <Box className="aspect-video overflow-hidden border-b border-ink/12 bg-paper-warm">
        <Image
          src={item.image}
          alt={item.image_alt || item.title}
          width={640}
          height={360}
          sizes="(min-width: 961px) 380px, (min-width: 601px) 50vw, 100vw"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-104"
        />
      </Box>
      <Box className="flex flex-1 flex-col px-5.5 pt-5 pb-5.5">
        <Text
          as="span"
          className="mb-3.5 self-start rounded-full bg-lime/22 px-2.75 py-1.25 font-mono text-[10px] leading-none tracking-[0.14em] text-olive uppercase"
        >
          {item.tag}
        </Text>
        <Text as="h3" className="text-[17.5px] leading-[1.35] font-semibold tracking-[-0.02em]">
          {item.title}
        </Text>
        <Text as="p" className="mt-2.5 line-clamp-3 text-[14px] leading-[1.65]">
          {item.description}
        </Text>
        <Box className="mt-auto flex items-center justify-between gap-3 pt-4.5">
          <Text as="span" className="font-mono text-[10.5px] leading-none tracking-[0.12em] text-ink/45 uppercase">
            {item.date_label}
          </Text>
          {item.cta?.href ? (
            <CtaButton
              variant="ghost"
              render={<a href={item.cta.href} {...(external ? { target: "_blank", rel: "noopener" } : {})} />}
              title={`Click Here to ${item.cta.label}: ${item.title}`}
              className="px-4.5 py-2.5 text-[13px] leading-none"
            >
              {item.cta.label}
            </CtaButton>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

/**
 * The resource library's interactive body: type pills (with live counts),
 * the "browse" note, a meta row (last added, page x of y, month filter), the
 * card grid and pagination, `data.page_size` cards a page.
 *
 * Every card is in the server-rendered HTML — cards off the current page
 * are only `hidden` — so the whole library stays crawlable. A link to
 * `#type-{key}` (the hero's "In the library" rows) opens that type's filter
 * and scrolls here.
 *
 * Design: Learning_Development_Resources `.filters`, `.pill`, `.browse`,
 * `.meta`, `.cards`, `.card`, `.pager`.
 */
export default function HubLibrary({ data, sectionId }) {
  const items = useMemo(() => data?.items ?? [], [data]);
  const pageSize = data?.page_size ?? 9;
  const [type, setType] = useState("all");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);
  const topRef = useRef(null);

  const counts = useMemo(() => {
    const byType = { all: items.length };
    items.forEach((item) => (byType[item.type] = (byType[item.type] ?? 0) + 1));
    return byType;
  }, [items]);

  const matching = useMemo(
    () =>
      items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => (type === "all" || item.type === type) && (!month || item.date_label === month)),
    [items, type, month],
  );
  const pages = Math.max(1, Math.ceil(matching.length / pageSize));
  const current = Math.min(page, pages);
  const visible = new Set(matching.slice((current - 1) * pageSize, current * pageSize).map(({ index }) => index));

  useEffect(() => {
    function fromHash() {
      const key = window.location.hash.match(/^#type-([\w-]+)$/)?.[1];
      if (!key || !(key in counts)) return;
      setType(key);
      setPage(1);
      document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [counts, sectionId]);

  function goTo(next) {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const types = (data?.types ?? []).filter((t) => t.key === "all" || counts[t.key]);

  return (
    <>
      <Reveal className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter by resource type">
        {types.map((t) => {
          const selected = t.key === type;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setType(t.key);
                setPage(1);
              }}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2.5 font-mono text-[11px] leading-none tracking-[0.12em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                selected ? "border-navy bg-navy text-lime" : "border-ink/22 text-ink/60 hover:border-navy hover:text-ink",
              )}
            >
              {t.label}
              <sup className="ml-0.75 align-baseline text-[9.5px] opacity-70">{counts[t.key] ?? 0}</sup>
            </button>
          );
        })}
      </Reveal>

      {data?.browse ? (
        <Reveal className="mb-7 grid items-center gap-6 rounded-[18px] bg-paper-cream px-7 py-6.5 min-[761px]:grid-cols-[1fr_auto]">
          <Box>
            <Text as="h3" className="mb-2 text-[22px] leading-[1.25] font-semibold">
              {data.browse.heading}
            </Text>
            <Text as="p" className="max-w-[72ch] text-[15px] leading-[1.7]">
              <StrongText text={data.browse.description} />
            </Text>
          </Box>
          {data.browse.new_count ? (
            <Box className="border-t border-ink/22 pt-4.5 min-[761px]:border-t-0 min-[761px]:border-l min-[761px]:pt-0 min-[761px]:pl-6 min-[761px]:text-right">
              <Text as="span" className="block font-display text-[32px] leading-none font-bold tracking-[-0.03em] text-olive">
                {data.browse.new_count}
              </Text>
              <Text as="span" className="font-mono text-[10.5px] leading-none tracking-[0.14em] text-ink/60 uppercase">
                {data.browse.new_label}
              </Text>
            </Box>
          ) : null}
        </Reveal>
      ) : null}

      <Box
        ref={topRef}
        className="mb-7.5 flex scroll-mt-24 flex-wrap items-center justify-between gap-x-6 gap-y-3.5 border-y border-ink/12 py-4"
      >
        {data?.last_added ? (
          <Text as="span" className="font-mono text-[11px] leading-[1.5] tracking-[0.14em] text-ink/60 uppercase">
            Last resource added on <b className="font-medium text-ink">{data.last_added}</b>
          </Text>
        ) : null}
        <Text as="span" aria-live="polite" className="font-mono text-[11px] leading-[1.5] tracking-[0.14em] text-ink/60 uppercase">
          Page <b className="font-medium text-olive">{current}</b> of <b className="font-medium text-ink">{pages}</b>
        </Text>
        {data?.months?.length ? (
          <Text as="label" className="flex items-center gap-2.5 font-mono text-[11px] leading-[1.5] tracking-[0.14em] text-ink/60 uppercase">
            Filter by month
            <select
              value={month}
              onChange={(event) => {
                setMonth(event.target.value);
                setPage(1);
              }}
              className="cursor-pointer appearance-none rounded-full border border-ink/22 bg-white bg-[linear-gradient(45deg,transparent_50%,var(--color-olive)_50%),linear-gradient(135deg,var(--color-olive)_50%,transparent_50%)] bg-[length:5px_5px] bg-[position:calc(100%-18px)_55%,calc(100%-13px)_55%] bg-no-repeat py-2.25 pr-9 pl-4 font-body text-[14px] tracking-normal text-ink normal-case transition-colors duration-200 outline-none hover:border-navy focus:border-navy"
            >
              <option value="">Select Month</option>
              {data.months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Text>
        ) : null}
      </Box>

      <Box className="grid gap-5.5 min-[601px]:grid-cols-2 min-[961px]:grid-cols-3">
        {items.map((item, index) => (
          <ResourceCard key={`${item.type}-${item.title}`} item={item} hidden={!visible.has(index)} />
        ))}
      </Box>

      {!matching.length ? (
        <Text as="p" role="status" className="py-10 text-center text-[15px] leading-[1.6]">
          No resources match this filter yet. Try another type or month.
        </Text>
      ) : null}

      {pages > 1 ? (
        <Box as="nav" aria-label="Pagination" className="mt-11 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled={current === 1}
            onClick={() => goTo(current - 1)}
            className="grid size-10.5 cursor-pointer place-items-center rounded-full border border-ink/22 text-ink/60 transition-colors hover:border-navy hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          {pageRange(current, pages).map((n) =>
            typeof n === "number" ? (
              <button
                key={n}
                type="button"
                aria-current={n === current ? "page" : undefined}
                onClick={() => goTo(n)}
                className={cn(
                  "grid size-10.5 cursor-pointer place-items-center rounded-full border font-mono text-[12px] transition-colors",
                  n === current ? "border-navy bg-navy text-lime" : "border-ink/22 text-ink/60 hover:border-navy hover:text-ink",
                )}
              >
                {n}
              </button>
            ) : (
              <Text as="span" key={n} aria-hidden="true" className="px-1 font-mono text-[12px] text-ink/60">
                …
              </Text>
            ),
          )}
          <button
            type="button"
            aria-label="Next page"
            disabled={current === pages}
            onClick={() => goTo(current + 1)}
            className="grid size-10.5 cursor-pointer place-items-center rounded-full border border-ink/22 text-ink/60 transition-colors hover:border-navy hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </Box>
      ) : null}
    </>
  );
}
