"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

function slugToLabel(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Hero breadcrumb rail — auto-built from the current URL path.
 * Home > Segment One > Segment Two > Current Page
 *
 * The `items` prop is ignored; breadcrumbs are derived from `usePathname()`.
 */
function Breadcrumbs({ className }) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter((seg) => seg && seg !== "corporate-training");

  const items = [
    { label: "Home", href: "/" },
    ...segments.map((seg, index) => ({
      label: slugToLabel(seg),
      href: index < segments.length - 1 ? "/" + segments.slice(0, index + 1).join("/") : null,
    })),
  ];

  if (items.length <= 1) return null;

  return (
    <Box
      as="nav"
      aria-label="Breadcrumb"
      className={cn(
        "mt-6 flex flex-wrap items-center gap-1.5 font-mono text-[9.5px] tracking-[0.1em] color-ink-muted uppercase",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span
            key={`${item.label}-${index}`}
            className="flex items-center gap-1.5"
          >
            {isLast || !item.href ? (
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? "font-semibold" : undefined}
              >
                {item.label}
              </span>
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
