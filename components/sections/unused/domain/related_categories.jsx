"use client";

import { useState } from "react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";

export default function RelatedCategories({ data }) {
  const [showAll, setShowAll] = useState(false);

  if (!data?.items?.length) return null;

  const visibleItems = showAll ? data.items : data.items.slice(0, 6);

  return (
    <Section>
      <Box className="mx-auto">
        <Reveal>
          <RichHeading
            as="h2"
            parts={data.heading.parts}
            emphasisClassName="font-serif italic font-normal"
            className="max-w-[22ch] tracking-[-0.03em]"
          />
        </Reveal>

        {/* DESCRIPTION */}
        <Reveal delay={1}>
          <Text
            as="p"
            className="mt-5 max-w-[65ch] text-[15px] leading-[1.7] text-ink/60"
          >
            {data.description}
          </Text>
        </Reveal>

        {/* CATEGORY CARDS */}
        <Reveal delay={2}>
          <Box
            className={`mt-7 grid grid-cols-1 gap-4 transition-all duration-700 ease-in-out md:grid-cols-2 lg:grid-cols-3 ${
              showAll ? "opacity-100" : "opacity-100"
            }`}
          >
            {visibleItems.map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                className={`group flex min-h-38 flex-col rounded-[14px] border border-ink/15 bg-white px-5 py-5 transition-[transform,box-shadow,border-color,opacity] duration-700 ease-in-out hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_16px_30px_-18px_rgba(10,22,40,0.35)] ${
                  showAll && index >= 6
                    ? "animate-[fadeIn_0.8s_ease-in-out]"
                    : ""
                }`}
              >
                <Text
                  as="h3"
                  className="font-display text-[15px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink"
                >
                  {item.title}
                </Text>

                <Text
                  as="p"
                  className="mt-3 font-mono text-[9px] uppercase leading-[1.55] tracking-[0.12em] text-ink/60"
                >
                  {item.description}
                </Text>

                <Text
                  as="p"
                  className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/60"
                >
                  {item.type}
                </Text>

                <Text
                  as="span"
                  className="mt-2 w-fit font-mono text-[9px] uppercase tracking-[0.12em] text-navy transition-colors duration-200 group-hover:text-ink"
                >
                  {item.link} →
                </Text>
              </a>
            ))}
          </Box>
        </Reveal>

        {/* VIEW MORE */}
        {!showAll && data.items.length > 6 && (
          <Reveal delay={3}>
            <Box className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="group flex items-center gap-2 rounded-full border border-navy/20 bg-navy/4 px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-navy transition-all duration-300 hover:border-navy/40 hover:bg-navy hover:text-white hover:shadow-[0_8px_20px_-10px_rgba(10,22,40,0.5)]"
              >
                View more
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </Box>
          </Reveal>
        )}
      </Box>
    </Section>
  );
}
