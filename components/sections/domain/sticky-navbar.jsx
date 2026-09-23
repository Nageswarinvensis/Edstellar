"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/common/cta-button";
import { setHeaderHidden } from "@/lib/client/header-visibility";

const HEADER_OFFSET = 68;

/**
 * A section becomes active once its top rises above this line: 35% of the
 * way down the viewport, and never closer to the top than just below the
 * bar. A section whose heading is plainly in view is the one being read.
 */
const ACTIVE_LINE_RATIO = 0.35;
const ACTIVE_LINE_MIN = HEADER_OFFSET + 60;

function scrollToHash(event) {
  const id = event.currentTarget.getAttribute("href")?.slice(1);
  const target = id && document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}

export default function StickyTabs({ data, hasTrainers }) {
  const tabs = data?.tabs?.filter(
    (tab) => tab.id !== "trainers" || hasTrainers,
  );

  const [activeId, setActiveId] = useState(
    () => tabs?.find((tab) => tab.active)?.id ?? tabs?.[0]?.id,
  );

  const sentinelRef = useRef(null);
  const listRef = useRef(null);
  const tabRefs = useRef({});

  // Stable key so the scroll effect below doesn't re-subscribe on every
  // render — `tabs` is a freshly filtered array each time.
  const tabKey = tabs?.map((tab) => tab.id).join(",") ?? "";

  /*
   * One scroll handler drives both jobs, measured from positions rather than
   * from intersection changes. IntersectionObserver only reports *crossings*,
   * so a jump that skips over the sentinel (an in-page link, a reload
   * mid-page, a fast mobile fling, scroll restoration) never fired and left
   * the site header covering this bar.
   *
   * - The site header hides whenever the sentinel above this bar has passed
   *   the top of the viewport, i.e. whenever this bar is pinned.
   * - The active tab is the last section whose top has crossed the active
   *   line (see ACTIVE_LINE_RATIO). (Picking the first section still inside a band, as
   *   before, lagged one section behind while scrolling.) At the very bottom
   *   of the page the last tab wins, since a short final section may never
   *   reach the line.
   */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const ids = tabKey ? tabKey.split(",") : [];
    let frame = 0;

    const update = () => {
      frame = 0;
      setHeaderHidden(sentinel.getBoundingClientRect().top < 0);

      const sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      if (!sections.length) return;

      const line = Math.max(
        ACTIVE_LINE_MIN,
        window.innerHeight * ACTIVE_LINE_RATIO,
      );
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;

      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      setHeaderHidden(false);
    };
  }, [tabKey]);

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
        className="sticky top-0 z-40 px-5 lg:px-10 w-full border-y border-[rgba(10,22,40,0.12)] bg-[rgba(250,250,247,0.94)] backdrop-blur-[14px] shadow-[0_10px_24px_-22px_rgba(10,22,40,0.5)]
      "
      >
        <Box
          className="mx-auto flex h-15 w-full max-w-7xl items-center justify-between gap-8
        "
        >
          {/* Logo */}
          <Box
            as="a"
            href="#about"
            onClick={scrollToHash}
            className="flex shrink-0 items-center"
          >
            <img
              src={data?.logo?.src}
              alt={data?.logo?.alt || "Edstellar"}
              className="h-7 w-auto object-contain"
            />
          </Box>

          {/* Navigation Container - takes remaining space and stretches tabs end-to-end */}
          <Box className="flex flex-1 items-center overflow-x-auto no-scrollbar">
            <ul
              ref={listRef}
              className="flex h-full w-full items-center justify-between gap-2
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
                      onClick={scrollToHash}
                      className={`flex h-8.75 items-center justify-center rounded-[10px] px-3.25 transition-colors duration-200
                      ${
                        isActive
                          ? "bg-lime"
                          : "bg-transparent hover:bg-[#F1F1EC]"
                      }
                    `}
                    >
                      <Text
                        as="span"
                        className={`whitespace-nowrap text-[12px] font-medium leading-none
                        ${isActive ? "text-ink" : "text-ink-muted"}
                      `}
                      >
                        {tab.label}
                      </Text>
                    </Box>
                  </li>
                );
              })}
            </ul>
            {/* Conditional CTA Button */}
            {data?.cta?.text && (
              <Box className="ml-6 flex shrink-0 items-center">
                <CtaButton
                  arrow
                  render={
                    <a
                      href={`#${data.cta.targetId || "form"}`}
                      onClick={scrollToHash}
                    />
                  }
                  title={data.cta.title}
                >
                  {data.cta.text}
                </CtaButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
