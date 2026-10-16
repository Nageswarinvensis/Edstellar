"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import StrongText from "@/components/sections/resources_hub/strong-text";
import ResourceCard from "@/components/sections/resources_hub/resource-card";
import ResourcePager from "@/components/sections/resources_hub/resource-pager";
import { cn } from "@/lib/utils";

/**
 * The resource library's interactive body: type pills (with live counts),
 * the "browse" note, a meta row (last added, page x of y, month filter), the
 * card grid and pagination, `data.page_size` cards a page.
 *
 * Only the current page's cards are rendered (the first page in the server
 * HTML); the full list comes in as data, so filtering and paging need no
 * request. Rendering all 500+ cards up front made the page ~2.7 MB. A link to
 * `#type-{key}` (the hero's "In the library" rows) opens that type's filter
 * and scrolls here.
 *
 * Design: Learning_Development_Resources `.filters`, `.pill`, `.browse`,
 * `.meta`, `.cards`, `.card`, `.pager`.
 */
export default function HubLibrary({ data, sectionId }) {
  // Each card's `type` matched to a filter key — the CMS sends the plural
  // "videos" for the "video" filter, so a plural is folded onto its key.
  const items = useMemo(() => {
    const keys = new Set((data?.types ?? []).map((t) => t.key));
    const keyOf = (type = "") => (keys.has(type) ? type : keys.has(type.replace(/s$/, "")) ? type.replace(/s$/, "") : type);
    return (data?.items ?? []).map((item) => ({ ...item, type: keyOf(item.type) }));
  }, [data]);
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
  const shown = matching.slice((current - 1) * pageSize, current * pageSize);

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
        {shown.map(({ item, index }) => (
          <ResourceCard key={`${index}-${item.title}`} item={item} />
        ))}
      </Box>

      {!matching.length ? (
        <Text as="p" role="status" className="py-10 text-center text-[15px] leading-[1.6]">
          No resources match this filter yet. Try another type or month.
        </Text>
      ) : null}

      <ResourcePager current={current} pages={pages} onChange={goTo} />
    </>
  );
}
