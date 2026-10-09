"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/common/cta-button";
import { setHeaderHidden } from "@/lib/client/header-visibility";

const HEADER_OFFSET = 68;

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

  // Scroll-driven: no tab is active until its section reaches the scroll line.
  // Starts null so nothing is highlighted while the reader is still above the
  // first section (e.g. in the hero) — the effect below sets it on mount/scroll.
  const [activeId, setActiveId] = useState(null);

  const sentinelRef = useRef(null);
  const listRef = useRef(null);
  const tabRefs = useRef({});

  // Stable key so the scroll effect below doesn't re-subscribe on every render
  const tabKey = tabs?.map((tab) => tab.id).join(",") ?? "";

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
      // Null until a section's top crosses the line — so while the reader is
      // still above the first section, no tab is highlighted.
      let current = null;
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
        className="sticky top-0 z-40 px-3 sm:px-5 lg:px-10 w-full border-y border-[rgba(10,22,40,0.12)] bg-[rgba(250,250,247,0.94)] backdrop-blur-[14px] shadow-[0_10px_24px_-22px_rgba(10,22,40,0.5)]"
      >
        <Box className="mx-auto flex h-15 w-full max-w-7xl items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Logo */}
          <Box
            as="a"
            href="#about"
            onClick={scrollToHash}
            className="flex shrink-0 items-center pr-1"
          >
            <img
              src={data?.logo?.src}
              alt={data?.logo?.alt || "Edstellar"}
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </Box>

          {/* Navigation Scroll Container */}
          <Box
            ref={listRef}
            className="flex min-w-0 flex-1 items-center overflow-x-auto no-scrollbar py-1 px-1"
          >
            {/* Tabs spread end-to-end across the available width on desktop
                (`sm:w-full sm:justify-between`), whether or not a CTA follows —
                so they never cluster on the left with a gap. On mobile they
                keep their natural width and scroll. */}
            <ul className="flex h-full min-w-max items-center justify-start gap-2 sm:min-w-0 sm:w-full sm:justify-between sm:gap-3">
              {tabs.map((tab) => {
                // Active only when scroll-spy has reached this tab's section.
                const isActive = tab.id === activeId;

                return (
                  <li
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[tab.id] = el;
                    }}
                    className="flex h-full shrink-0 items-center scroll-ml-2"
                  >
                    <Box
                      as="a"
                      href={`#${tab.id}`}
                      onClick={scrollToHash}
                      className={`flex h-8.75 items-center justify-center rounded-[10px] px-3.25 transition-colors duration-200 ${
                        isActive
                          ? "bg-lime"
                          : "bg-transparent hover:bg-[#F1F1EC]"
                      }`}
                    >
                      <Text
                        as="span"
                        className={`whitespace-nowrap text-[12px] font-medium leading-none ${
                          isActive ? "text-ink" : "text-ink-muted"
                        }`}
                      >
                        {tab.label}
                      </Text>
                    </Box>
                  </li>
                );
              })}
            </ul>
          </Box>

          {/* Conditional CTA Button */}
          {data?.cta?.text && (
            <Box className="pl-1 sm:pl-2 flex shrink-0 items-center">
              <CtaButton
                arrow
                render={
                  <a
                    href={`#${(data.cta.targetId || "form").replace(/^#/, "")}`}
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
    </>
  );
}