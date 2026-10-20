import { cn } from "@/lib/utils";

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute left-3.5 size-4 text-ink-muted">
      <circle cx="9" cy="9" r="6" />
      <path d="M13.5 13.5L17 17" />
    </svg>
  );
}

/**
 * "Search Edstellar" — a plain GET form to `/search?q=…`, so it works before
 * (and without) JavaScript. `mobile` is the full-width drawer version, with a
 * 16px input so iOS does not zoom on focus.
 *
 * Design: edstellar-main-menu 25 `.srch`, `.mn-search`, `.dr-search`.
 */
export default function SiteSearch({ id, mobile = false, defaultValue, className }) {
  return (
    <form role="search" aria-label="Site" action="/search" method="get" className={cn("relative flex items-center", className)}>
      <label htmlFor={id} className="sr-only">
        Search Edstellar
      </label>
      <SearchIcon />
      <input
        id={id}
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search Edstellar"
        autoComplete="off"
        enterKeyHint="search"
        className={cn(
          "w-full appearance-none rounded-full border border-ink/22 bg-white py-[11px] pr-4 pl-[38px] font-body leading-[1.2] text-navy transition-[border-color,box-shadow] duration-200 placeholder:text-ink/60 hover:border-navy focus:border-navy focus:shadow-[0_0_0_1px_var(--color-navy),0_0_0_4px_rgba(10,22,40,0.10)] focus:outline-none [&::-webkit-search-decoration]:appearance-none",
          mobile ? "min-h-12 text-[16px]" : "min-h-10 text-[14px]",
        )}
      />
    </form>
  );
}
