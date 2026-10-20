"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const SELECT =
  "w-full cursor-pointer appearance-none rounded-full border border-ink/25 bg-white py-2.5 pr-10 pl-4.5 text-[15px] text-ink outline-none focus:border-navy";

/** A pill `<select>` with a chevron (the native arrow is hidden). */
function Select({ id, label, value, onChange, placeholder, options, className }) {
  return (
    <Box className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select id={id} value={value} onChange={onChange} className={SELECT}>
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink" />
    </Box>
  );
}

const uniqueSorted = (items, key) => [...new Set(items.map((item) => item[key]))].sort((a, b) => a.localeCompare(b));

/** Two-column label/value rows, as on each story card. */
function Facts({ rows }) {
  return (
    <Box as="dl" className="m-0 grid grid-cols-2 gap-x-5 gap-y-3.5">
      {rows.map(([label, value]) => (
        <Box key={label}>
          <dt className="mb-1 text-[12.5px] text-ink-muted">{label}</dt>
          <dd className="m-0 text-[15px] font-semibold text-ink">{value}</dd>
        </Box>
      ))}
    </Box>
  );
}

function StoryCard({ story }) {
  return (
    <Box as="article" className="flex h-full flex-col overflow-hidden rounded-[16px] border border-ink/12 bg-white">
      <Box className="relative">
        <img src={story.image} alt={story.title} width={300} height={200} loading="lazy" decoding="async" className="aspect-[2/1] w-full object-cover" />
        <Text as="span" className="absolute top-3 left-3 rounded-full bg-navy px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-lime uppercase">
          Success Story
        </Text>
      </Box>
      <Box className="flex flex-1 flex-col px-5.5 pt-6 pb-5">
        <Text as="p" className="mb-1 font-mono text-[10.5px] tracking-[0.16em] text-ink-muted uppercase">
          Training Program
        </Text>
        <Text as="h3" className="mb-4 text-[19px] leading-snug">
          <Link href={story.href} className="underline underline-offset-3 hover:text-olive">
            {story.title}
          </Link>
        </Text>
        <Box as="dl" className="m-0 grid grid-cols-2 gap-x-5 gap-y-3.5">
          <Box>
            <dt className="mb-1 text-[12.5px] text-ink-muted">Location:</dt>
            <dd className="m-0 flex items-start gap-2 text-[15px] font-semibold text-ink">
              {story.flag ? <img decoding="async" loading="lazy" src={story.flag} alt={`${story.location} flag`} width={20} height={14} className="mt-1 h-3.5 w-5 flex-none" /> : null}
              {story.location}
            </dd>
          </Box>
          {[
            ["Company Size", story.company_size],
            ["Industry:", story.industry],
            ["Training Duration:", story.duration],
          ].map(([label, value]) => (
            <Box key={label}>
              <dt className="mb-1 text-[12.5px] text-ink-muted">{label}</dt>
              <dd className="m-0 text-[15px] font-semibold text-ink">{value}</dd>
            </Box>
          ))}
          <Box>
            <dt className="mb-1 text-[12.5px] text-ink-muted">Training Score:</dt>
            <dd className="m-0 flex items-center gap-1.5 text-[15px] font-semibold text-ink">
              <Star size={14} aria-hidden="true" className="fill-olive text-olive" />
              {story.score}
            </dd>
          </Box>
        </Box>

        <Text as="p" className="mt-5 mb-2.5 font-mono text-[10.5px] tracking-[0.16em] text-ink-muted uppercase">
          Participants’ Job Roles
        </Text>
        <Box as="ul" className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {story.roles.map((role) => (
            <li key={role} className="rounded-full border border-ink/15 px-3 py-1 text-[13px] text-ink">
              {role}
            </li>
          ))}
        </Box>

        <Text as="p" className="mt-5 mb-3 font-mono text-[10.5px] tracking-[0.16em] text-ink-muted uppercase">
          Training Details
        </Text>
        <Box className="border-b border-ink/12 pb-4">
          <Facts
            rows={[
              ["Training Type", story.training_type],
              ["Training Delivered in", story.language],
              ["No of Learners", story.learners],
              ["Delivery Mode", story.delivery_mode],
            ]}
          />
        </Box>

        <Box as="blockquote" className="m-0 mt-4 flex flex-1 flex-col">
          <Text as="p" className="font-serif text-[18px] leading-[1.45] text-ink italic">
            “{story.quote}”
          </Text>
          <Text as="p" className="mt-auto pt-3 text-[13.5px] text-ink-muted">
            <b className="font-semibold text-ink">{story.author}</b>, {story.author_role}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

/**
 * The story cards with Training Type and Region filters (built from the
 * stories themselves, so no option ever leads to zero results), a live
 * result count, and Previous / Next pagination. Every card is rendered into
 * the HTML; filtered-out and off-page cards are `hidden`, so all stories
 * stay crawlable. Design: success-stories `.ss-filters`, `.ss-card`, `.ss-pager`.
 */
export default function StoryGrid({ data }) {
  const [type, setType] = useState("");
  const [region, setRegion] = useState("");
  const [page, setPage] = useState(0);

  const types = useMemo(() => uniqueSorted(data.items, "training_type"), [data.items]);
  const regions = useMemo(() => uniqueSorted(data.items, "region"), [data.items]);

  const matches = (story) => (!type || story.training_type === type) && (!region || story.region === region);
  const visible = data.items.filter(matches);
  const pages = Math.max(1, Math.ceil(visible.length / data.per_page));
  const current = Math.min(page, pages - 1);
  const onPage = new Set(visible.slice(current * data.per_page, (current + 1) * data.per_page));

  const change = (setter) => (event) => {
    setter(event.target.value);
    setPage(0);
  };
  const go = (next) => {
    setPage(next);
    document.getElementById("stories")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box id="stories" className="scroll-mt-24">
      <Box className="mb-3.5 flex flex-wrap items-center gap-3">
        <Text as="span" className="font-mono text-[11px] tracking-[0.16em] text-ink/70 uppercase">
          {data.filter_label}
        </Text>
        <Select id="ss-type" label={data.type_placeholder} value={type} onChange={change(setType)} placeholder={data.type_placeholder} options={types} className="w-full sm:w-70" />
        <Select id="ss-region" label={data.region_placeholder} value={region} onChange={change(setRegion)} placeholder={data.region_placeholder} options={regions} className="w-full sm:w-52" />
        <button
          type="button"
          onClick={() => {
            setType("");
            setRegion("");
            setPage(0);
          }}
          className="cursor-pointer rounded-full border border-ink px-4.5 py-2.5 font-display text-[14px] font-semibold text-ink hover:bg-ink hover:text-paper"
        >
          {data.clear_label}
        </button>
      </Box>
      <Text as="p" role="status" className="mb-6 font-mono text-[12px] tracking-[0.06em] text-ink-muted">
        {type || region ? "Filters Applied: " : ""}Showing {visible.length} {visible.length === 1 ? "Result" : "Results"}
      </Text>

      <Box className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.items.map((story) => (
          <Box key={story.title + story.location} hidden={!onPage.has(story)}>
            <StoryCard story={story} />
          </Box>
        ))}
      </Box>

      {visible.length === 0 ? (
        <Text as="p" className="py-8 text-center text-[16px]">
          {data.empty}
        </Text>
      ) : null}

      {pages > 1 ? (
        <Box as="nav" aria-label="Pagination" className="mt-9 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={current === 0}
            onClick={() => go(current - 1)}
            className="cursor-pointer rounded-full border border-ink/25 px-5 py-2.5 font-display text-[14px] font-semibold text-ink hover:border-navy disabled:cursor-default disabled:opacity-40"
          >
            Previous
          </button>
          <Text as="span" className="font-mono text-[12.5px] text-ink-muted">
            Page {current + 1} of {pages}
          </Text>
          <button
            type="button"
            disabled={current === pages - 1}
            onClick={() => go(current + 1)}
            className="cursor-pointer rounded-full bg-navy px-5 py-2.5 font-display text-[14px] font-semibold text-lime disabled:cursor-default disabled:opacity-40"
          >
            Next
          </button>
        </Box>
      ) : null}
    </Box>
  );
}
