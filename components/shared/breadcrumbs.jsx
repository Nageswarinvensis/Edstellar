import Link from "next/link";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * Hero breadcrumb rail. Scrolls horizontally rather than wrapping, matching
 * `.crumbs` — deep course paths are long and wrapping breaks the hero rhythm.
 *
 * `items` is `[{ label, href }]`; the last item is the current page and is
 * rendered as plain text, not a link.
 */
function Breadcrumbs({ items = [], className }) {
  if (!items.length) return null;

  return (
    <Box
      as="nav"
      aria-label="Breadcrumb"
      className={cn(
        "no-scrollbar mt-6 flex flex-nowrap items-center gap-1.5 overflow-x-auto font-mono text-[9.5px] tracking-[0.1em] whitespace-nowrap color-ink-muted uppercase",
        className
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {isLast || !item.href ? (
              <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors hover:color-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                {item.label}
              </Link>
            )}
            {!isLast ? (
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
            ) : null}
          </span>
        );
      })}
    </Box>
  );
}

export default Breadcrumbs;
