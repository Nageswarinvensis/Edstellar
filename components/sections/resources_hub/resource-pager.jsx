"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/** "1 … 4 5 6 … 60" — first, last and a window around the current page,
 * the same range as the domain catalog's pagination. */
function pageRange(current, total) {
  const range = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) range.push("ellipsis-start");
  for (let n = start; n <= end; n++) range.push(n);
  if (end < total - 1) range.push("ellipsis-end");
  if (total > 1) range.push(total);
  return range;
}

/** A pagination square — the domain catalog's look (32px, navy / lime when
 * active, faded when disabled). */
function PageButton({ active, disabled, onClick, ariaLabel, children }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-8 items-center justify-center rounded-[7px] border transition-all duration-200",
        active ? "border-navy bg-navy text-lime" : "border-ink/15 bg-white text-navy",
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:border-navy",
      )}
    >
      {children}
    </button>
  );
}

/**
 * Pagination for the resource pages — the domain catalog's squares and
 * range. Renders nothing for a single page.
 */
export default function ResourcePager({ current, pages, onChange }) {
  if (pages <= 1) return null;

  return (
    <Box as="nav" aria-label="Pagination" className="mt-11 flex flex-wrap items-center justify-center gap-1.25">
      <PageButton ariaLabel="Previous page" disabled={current === 1} onClick={() => onChange(current - 1)}>
        <ChevronLeft size={14} strokeWidth={1.5} aria-hidden="true" />
      </PageButton>
      {pageRange(current, pages).map((n) =>
        typeof n === "number" ? (
          <PageButton key={n} active={n === current} onClick={() => onChange(n)}>
            {n}
          </PageButton>
        ) : (
          <Text as="span" key={n} aria-hidden="true" className="flex size-8 items-center justify-center text-[14px] leading-none text-ink-muted">
            &hellip;
          </Text>
        ),
      )}
      <PageButton ariaLabel="Next page" disabled={current === pages} onClick={() => onChange(current + 1)}>
        <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </PageButton>
    </Box>
  );
}
