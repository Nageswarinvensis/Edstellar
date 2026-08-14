"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { setHeaderHidden } from "@/lib/header-visibility";

// SiteHeader is h-17 (68px) tall — this bar's scroll-spy offset accounts for
// that plus its own height, even though the bar itself now sticks at top-0
// (the header hides itself once this bar is pinned, see below).
const HEADER_OFFSET = 68;

export default function StickyTabs({ data }) {
  const tabs = data?.tabs;

  const [activeId, setActiveId] = useState(
    () => tabs?.find((tab) => tab.active)?.id ?? tabs?.[0]?.id
  );

  const sentinelRef = useRef(null);
  const listRef = useRef(null);
  const tabRefs = useRef({});

  // Once this bar reaches the top of the viewport it takes over the header's
  // slot, so the header should hide rather than sit underneath it. A zero-
  // height sentinel placed right before the bar flips out of view at exactly
  // the moment the bar becomes pinned — the standard sticky-detection trick.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // `!isIntersecting` is true both once the sentinel has scrolled
        // above the viewport (past it — hide the header) AND before it's
        // ever been reached at all (still in the hero, below the fold —
        // header must stay visible). Only the sign of its top edge tells
        // those two apart.
        setHeaderHidden(entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      setHeaderHidden(false);
    };
  }, []);

  // Scroll-spy: track which section is currently under the sticky bars and
  // keep the matching tab highlighted as the user scrolls.
  useEffect(() => {
    if (!tabs?.length || typeof window === "undefined") return;

    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter(Boolean);

    if (!sections.length) return;

    const visibleIds = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleIds.add(entry.target.id);
          else visibleIds.delete(entry.target.id);
        });

        if (!visibleIds.size) return;

        // Sections are observed in document order, so the first one that's
        // currently visible is the one nearest the top of the viewport.
        const current = sections.find((section) => visibleIds.has(section.id));
        if (current) setActiveId(current.id);
      },
      {
        // A section counts as "current" once it has cleared the sticky
        // header + this bar, and before it's mostly scrolled past — that's
        // what makes the highlight track scroll position instead of only
        // flipping at a section's exact top edge.
        rootMargin: `-${HEADER_OFFSET + 60}px 0px -65% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [tabs]);

  // Keep the active tab centered in the scrollable strip so it's always in
  // view on tablet/mobile without the user having to scroll the bar by hand.
  useEffect(() => {
    const activeEl = tabRefs.current[activeId];
    const container = listRef.current;
    if (!activeEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const delta =
      activeRect.left -
      containerRect.left -
      containerRect.width / 2 +
      activeRect.width / 2;

    container.scrollBy({ left: delta, behavior: "smooth" });
  }, [activeId]);

  if (!tabs?.length) return null;

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
      <Box
      as="nav"
      aria-label="Course navigation"
      className="
        sticky top-0 z-40
        w-full
        border-y
        border-[rgba(10,22,40,0.12)]
        bg-[rgba(250,250,247,0.94)]
        backdrop-blur-[14px]
        shadow-[0_10px_24px_-22px_rgba(10,22,40,0.5)]
      "
    >
      <Box
        className="
          mx-auto
          flex
          h-13
          w-full
          max-w-[1800px]
          items-center
          px-5
          lg:px-12.5
        "
      >
        {/* Logo */}
        <Box as="a" href="#about" className="flex shrink-0 items-center">
          <img
            src={data?.logo?.src}
            alt={data?.logo?.alt || "Edstellar"}
            className="h-7 w-auto object-contain"
          />
        </Box>

        {/* Navigation */}
        <ul
          ref={listRef}
          className="
            ml-8
            flex
            h-full
            flex-1
            items-center
            justify-between
            gap-2
            overflow-x-auto
            no-scrollbar
          "
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;

            return (
              <li
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                className="flex h-full shrink-0 items-center"
              >
                <Box
                  as="a"
                  href={`#${tab.id}`}
                  className={`
                    flex
                    h-8.75
                    items-center
                    justify-center
                    rounded-[10px]
                    px-3.25
                    transition-colors
                    duration-200
                    ${
                      isActive
                        ? "bg-[#E8F6B4]"
                        : "bg-transparent hover:bg-[#F1F1EC]"
                    }
                  `}
                >
                  <Text
                    as="span"
                    className={`
                      whitespace-nowrap
                      text-[13px]
                      font-normal
                      leading-none
                      ${isActive ? "text-[#0A1628]" : "text-[#626875]"}
                    `}
                  >
                    {tab.label}
                  </Text>
                </Box>
              </li>
            );
          })}
        </ul>
      </Box>
      </Box>
    </>
  );
}
