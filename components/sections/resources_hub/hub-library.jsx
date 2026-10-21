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
 * Every type pill is a tab with its own panel, and every panel is in the
 * server HTML (inactive ones `hidden`), so each tab's resources are in the
 * page source — not only the "All" tab's. Within a panel, pagination stays
 * client-side: a panel renders one page of cards (its first page in the
 * server HTML), because rendering all 500+ cards up front made the page
 * ~2.7 MB. The full list comes in as data, so filtering and paging need no
 * request.
 *
 * A link to `#type-{key}` (the hero's "In the library" rows) or
 * `?tab={key}` (the header menu's links, e.g. `?tab=webinars`) opens that
 * type's tab and scrolls here. Read on the client, not via `searchParams`,
 * so the page stays static (TASTE.md §2.5).
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

  const types = useMemo(() => (data?.types ?? []).filter((t) => t.key === "all" || counts[t.key]), [data, counts]);

  // Each tab's list, month filter applied — every tab renders a panel.
  const lists = useMemo(() => {
    const indexed = items.map((item, index) => ({ item, index }));
    const inMonth = ({ item }) => !month || item.date_label === month;
    return Object.fromEntries(
      types.map((t) => [t.key, indexed.filter((entry) => (t.key === "all" || entry.item.type === t.key) && inMonth(entry))]),
    );
  }, [items, types, month]);

  const matching = lists[type] ?? [];
  const pages = Math.max(1, Math.ceil(matching.length / pageSize));
  const current = Math.min(page, pages);

  useEffect(() => {
    // "webinars", "e-book", "Podcasts" → the CMS keys "webinar", "ebook", "podcast".
    const toKey = (raw = "") => {
      const plain = raw.toLowerCase().replace(/[^a-z]/g, "");
      return [plain, plain.replace(/s$/, "")].find((key) => key in counts);
    };
    function fromLocation() {
      const key =
        toKey(window.location.hash.match(/^#type-([\w-]+)$/)?.[1]) ??
        toKey(new URLSearchParams(window.location.search).get("tab") ?? "");
      if (!key) return;
      setType(key);
      setPage(1);
      document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
    }
    fromLocation();
    window.addEventListener("hashchange", fromLocation);
    return () => window.removeEventListener("hashchange", fromLocation);
  }, [counts, sectionId]);

  function goTo(next) {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Reveal className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter by resource type">
        {types.map((t) => {
          const selected = t.key === type;
          return (
            <button
              key={t.key}
              id={`${sectionId}-tab-${t.key}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${sectionId}-panel-${t.key}`}
              onClick={() => {
                setType(t.key);
                setPage(1);
              }}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2.5 font-mono text-[11px] leading-none tracking-[0.12em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                selected ? "border-navy bg-navy text-lime" : "border-ink/22 text-ink-muted hover:border-navy hover:text-ink",
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
            <Text as="h3" className="mb-2 text-[22px] leading-[1.25] font-medium">
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
              <Text as="span" className="font-mono text-[10.5px] leading-none tracking-[0.14em] text-ink-muted uppercase">
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
          <Text as="span" className="font-mono text-[11px] leading-[1.5] tracking-[0.14em] text-ink-muted uppercase">
            Last resource added on <b className="font-medium text-ink">{data.last_added}</b>
          </Text>
        ) : null}
        <Text as="span" aria-live="polite" className="font-mono text-[11px] leading-[1.5] tracking-[0.14em] text-ink-muted uppercase">
          Page <b className="font-medium text-olive">{current}</b> of <b className="font-medium text-ink">{pages}</b>
        </Text>
        {data?.months?.length ? (
          <Text as="label" className="flex items-center gap-2.5 font-mono text-[11px] leading-[1.5] tracking-[0.14em] text-ink-muted uppercase">
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

      {types.map((t) => {
        const active = t.key === type;
        const list = lists[t.key] ?? [];
        // The active tab shows its current page; the others their first.
        const at = active ? current : 1;
        const shown = list.slice((at - 1) * pageSize, at * pageSize);
        return (
          <Box
            key={t.key}
            id={`${sectionId}-panel-${t.key}`}
            role="tabpanel"
            aria-labelledby={`${sectionId}-tab-${t.key}`}
            hidden={!active}
          >
            <Box className="grid gap-5.5 min-[601px]:grid-cols-2 min-[961px]:grid-cols-3">
              {shown.map(({ item, index }) => (
                <ResourceCard key={`${index}-${item.title}`} item={item} />
              ))}
            </Box>
            {!list.length ? (
              <Text as="p" role="status" className="py-10 text-center text-[15px] leading-[1.6]">
                No resources match this filter yet. Try another type or month.
              </Text>
            ) : null}
          </Box>
        );
      })}

      <ResourcePager current={current} pages={pages} onChange={goTo} />
    </>
  );
}
