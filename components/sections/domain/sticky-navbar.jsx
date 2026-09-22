"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/common/cta-button";
import { setHeaderHidden } from "@/lib/client/header-visibility";

const HEADER_OFFSET = 68;

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

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderHidden(entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      setHeaderHidden(false);
    };
  }, []);

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

        const current = sections.find((section) => visibleIds.has(section.id));
        if (current) setActiveId(current.id);
      },
      {
        rootMargin: `-${HEADER_OFFSET + 60}px 0px -65% 0px`,
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [tabs]);

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
          </Box>

          {/* Conditional CTA Button */}
          {data?.cta?.text && (
            <Box className="flex shrink-0 items-center">
              <CtaButton
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
    </>
  );
}
