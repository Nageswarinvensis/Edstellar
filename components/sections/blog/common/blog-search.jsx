"use client";

import { Search, X } from "lucide-react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * Search box shared by every blog listing page (main, category, author —
 * rendered inside components/sections/blog/common/blog-posts.jsx, so all three get it
 * for free). Purely controlled: `BlogPosts` owns the query string and the
 * debounce, this component only renders the input.
 *
 * The API truncates terms over 200 characters (see `getBlogMain` et al.) —
 * `maxLength` here just saves a round trip for an input that would be
 * truncated anyway.
 */
export default function BlogSearch({
  value,
  onChange,
  placeholder = "Search articles",
  className,
}) {
  return (
    <Box className={cn("relative", className)}>
      <Search
        size={16}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink/40"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={200}
        aria-label={placeholder}
        className="h-11 w-full rounded-lg border border-ink/15 bg-white pl-11 pr-10 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-olive [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
      />

      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          title="Click Here to Clear Search"
          onClick={() => onChange("")}
          className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-ink/40 transition-colors hover:text-ink"
        >
          <X size={16} aria-hidden="true" />
        </button>
      ) : null}
    </Box>
  );
}
