"use client";

import { useId, useState } from "react";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { InlineText } from "@/components/sections/corporate_training_hub/parts";

/**
 * "All training domains" — a search box filtering a four-column A–Z list of
 * domain links. Every link is in the HTML; filtered-out ones are `hidden`,
 * so crawlers always see all of them.
 * Design: Edstellar_Corporate_Training_Hub `#training-programs`, `#domain-q`.
 */
export default function DomainFinder({ data, domains }) {
  const [query, setQuery] = useState("");
  // Plain-ASCII id: React's `«R…»` ids trip checkers that match `label[for]`
  // with a plain selector.
  const inputId = `domain-finder-${useId().replace(/[^\w-]/g, "")}`;
  const needle = query.trim().toLowerCase();
  const matches = (domain) => !needle || domain.label.toLowerCase().includes(needle);
  const count = domains.filter(matches).length;

  return (
    <>
      <Box className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Text as="h3" className="text-[20px]">
          {data.list_title}
        </Text>
        <Box className="flex flex-wrap items-center gap-3">
          <label htmlFor={inputId} className="font-mono text-[11px] tracking-[0.16em] text-ink/70 uppercase">
            {data.search_label}
          </label>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={data.search_placeholder}
            autoComplete="off"
            className="w-70 rounded-full border border-ink/25 bg-white px-4.5 py-2.5 text-[15px] text-ink outline-none placeholder:text-ink/40 focus:border-navy"
          />
          <Text as="span" aria-live="polite" className="font-mono text-[12px] text-ink-muted">
            {count} domains
          </Text>
        </Box>
      </Box>

      <Box as="ul" className="m-0 list-none columns-1 gap-8 p-0 sm:columns-2 lg:columns-4">
        {domains.map((domain) => (
          <li key={domain.href} hidden={!matches(domain)} className="break-inside-avoid border-b border-ink/12">
            <Link href={domain.href} prefetch={false} className="block py-2.5 text-[15.5px] leading-snug text-ink hover:text-olive">
              {domain.label}
            </Link>
          </li>
        ))}
      </Box>

      {count === 0 ? (
        <Text as="p" className="py-6 text-[15px]">
          <InlineText text={data.empty} />
        </Text>
      ) : null}
    </>
  );
}
