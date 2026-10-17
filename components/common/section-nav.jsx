"use client";

import { useEffect, useState } from "react";

import Box from "@/components/ui/Box";
import { CtaButton } from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/**
 * Sticky "On this page" bar under the site header. The links are plain
 * anchors, so it works without JavaScript; the effect only marks the section
 * currently in view. `data`: `{ items: { id, label }[], cta? }`.
 * Design: leadership-retreats `.secnav` (also used by `/sitemap`).
 */
export default function SectionNav({ data, ctaClassName }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const ids = data.items.map((item) => item.id);

    function onScroll() {
      // The last section whose top has passed a line 30% down the viewport.
      const line = window.scrollY + window.innerHeight * 0.3;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) current = id;
      }
      setActiveId(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [data.items]);

  return (
    <Box
      as="nav"
      aria-label="On this page"
      className="sticky top-17 z-30 border-b border-ink/12 bg-paper/95 px-5 py-2.5 backdrop-blur-md lg:px-10"
    >
      <Box className="mx-auto flex max-w-7xl items-center gap-4">
        <Box as="ul" className="no-scrollbar m-0 flex flex-1 list-none gap-1 overflow-x-auto p-0 lg:justify-between">
          {data.items.map((item) => (
            <Box as="li" key={item.id} className="flex-none">
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "true" : undefined}
                className={cn(
                  "block rounded-full px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                  activeId === item.id ? "bg-navy text-paper" : "text-ink/60 hover:text-ink",
                )}
              >
                {item.label}
              </a>
            </Box>
          ))}
        </Box>
        {data.cta ? (
          <CtaButton arrow render={<a href={data.cta.href} />} className={cn("hidden lg:inline-flex", ctaClassName)}>
            {data.cta.label}
          </CtaButton>
        ) : null}
      </Box>
    </Box>
  );
}
