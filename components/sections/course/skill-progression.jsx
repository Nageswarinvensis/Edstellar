"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

const LEVEL_CODE = {
  None: "N",
  Basic: "B",
  Intermediate: "I",
  Advanced: "A",
  "Very Advanced": "VA",
};

function ProgressionRow({ item, index, filled }) {
  return (
    <Box className="mb-3.75 last:mb-0">
      <Box className="mb-1.75 flex items-baseline justify-between gap-3">
        <Text
          as="span"
          className="font-display text-[13px] font-semibold tracking-[-0.01em] text-ink"
        >
          {item.skill}
        </Text>
        <Text
          as="span"
          className="flex-none font-mono text-[10px] tracking-[0.06em] text-ink/60 uppercase"
        >
          {LEVEL_CODE[item.entry_level]} <span aria-hidden="true">→</span>{" "}
          <b className="font-semibold text-ink">{LEVEL_CODE[item.exit_level]}</b>
        </Text>
      </Box>

      <Box
        role="img"
        aria-label={`${item.skill}: ${item.entry_level} on entry, ${item.exit_level} on completion`}
        className="relative h-2 overflow-visible rounded-full bg-paper-warm"
      >
        <Box
          className="absolute top-0 left-0 h-full rounded-full bg-[linear-gradient(90deg,var(--color-navy-deep),var(--color-lime))] transition-[width] duration-700 ease-out"
          style={{
            width: filled ? `${item.exit_percent}%` : "0%",
            transitionDelay: `${index * 90}ms`,
          }}
        />
        {item.entry_percent > 0 ? (
          <Box
            aria-hidden="true"
            className="absolute top-1/2 h-2 w-0.5 -translate-y-1/2 rounded-xs bg-paper/85 transition-opacity duration-300"
            style={{
              left: `${item.entry_percent}%`,
              opacity: filled ? 1 : 0,
              transitionDelay: `${index * 90 + 500}ms`,
            }}
          />
        ) : null}
        <Box
          aria-hidden="true"
          className="absolute top-1/2 h-3.75 w-0.5 -translate-y-1/2 rounded-xs bg-ink/60 transition-opacity duration-300"
          style={{
            left: `${item.exit_percent}%`,
            opacity: filled ? 1 : 0,
            transitionDelay: `${index * 90 + 500}ms`,
          }}
        />
      </Box>
    </Box>
  );
}

function ProgressionDivider({ label, first }) {
  return (
    <Box
      className={
        first
          ? "mb-4 flex items-center gap-3"
          : "mt-5 mb-4 flex items-center gap-3"
      }
    >
      <Box aria-hidden="true" className="h-px w-5.5 flex-none bg-ink/22" />
      <Text
        as="span"
        className="font-mono text-[10px] tracking-[0.13em] text-ink/60 uppercase"
      >
        {label}
      </Text>
      <Box aria-hidden="true" className="h-px flex-1 bg-ink/12" />
    </Box>
  );
}

/**
 * Skill-progression panel — bars fill from 0 to their exit level once the
 * panel scrolls into view, rather than rendering already-filled. Client-only
 * for the `IntersectionObserver`; `progression` still arrives as a prop from
 * the server-rendered `Audience`, so the text content is unaffected.
 */
export default function SkillProgression({
  progression,
  firstPrerequisiteIndex,
  lastPrerequisiteIndex,
}) {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setFilled(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setFilled(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      className="mt-7 rounded-2xl border border-ink/12 bg-white px-6 pt-6 pb-5.5 max-sm:px-5 max-sm:pt-5 max-sm:pb-4.5"
    >
      <Text
        as="h3"
        className="font-display text-[16.5px] font-semibold tracking-[-0.02em] text-ink"
      >
        {progression.title}
      </Text>
      <Text as="p" className="mt-2 mb-5 text-[12.5px] leading-[1.6] text-ink/60">
        {progression.description}
      </Text>

      {progression.items.map((item, index) => (
        <Box key={item.skill}>
          {index === firstPrerequisiteIndex ? (
            <ProgressionDivider label="Prerequisites" first />
          ) : null}
          <ProgressionRow item={item} index={index} filled={filled} />
          {index === lastPrerequisiteIndex &&
          lastPrerequisiteIndex < progression.items.length - 1 ? (
            <ProgressionDivider label="Taught from the ground up" />
          ) : null}
        </Box>
      ))}

      <Box className="mt-5 flex flex-wrap gap-x-4 gap-y-1.75 border-t border-ink/12 pt-3.75">
        {Object.entries(LEVEL_CODE).map(([label, code]) => (
          <Text
            key={code}
            as="span"
            className="font-mono text-[10px] tracking-[0.04em] text-ink/60"
          >
            <b className="font-semibold text-ink">{code}</b> {label}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
