import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";


/** Fallback stat cards, used only when the CMS `mapsectionData` has no `stats`. */
const STATS = [
  { value: "5000+", label: "EXPERT TRAINERS" },
  { value: "5+", label: "YEARS DELIVERING" },
  { value: "1,000+", label: "ORGANIZATIONS TRAINED" },
  {
    value: "ISO 9001",
    connector: "&",
    secondary_value: "27001",
    label: "CERTIFIED",
  },
];



/**
 * Domain page "why Edstellar" map section: heading, description, the map
 * image on the right and the stat cards below — nothing else. The map is the
 * same static asset as the course page's
 * `components/sections/course/course-map-section.jsx`; unlike it, every domain
 * sends its own `mapsectionData.stats` from the CMS — the fixed four only when
 * a domain sends none.
 */
export default function DomainMapSection({ data, className }) {
  if (!data) return null;

  // The CMS `stats`; the fixed four only when a domain sends none.
  const stats = data?.stats?.length ? data.stats : STATS;

  return (
    <Section
      as="section"
      id="why-edstellar"
      className={cn(
        "w-full bg-paper-warm px-5 py-10 lg:px-10",
        className,
      )}
    >
      <Box>
        <Box className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center lg:gap-12">
          {/* Left content */}
          <Box className="max-w-162">
            {/* Heading */}
            <Reveal>
              <RichHeading
                heading={data.heading}
                className="mb-6.5 max-w-[20ch]"
              />
            </Reveal>

            {/* Description */}
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-7 text-[16px] leading-[1.75] text-ink-muted"
              >
                {data.description}
              </Text>
            </Reveal>
          </Box>

          {/* World map — static asset, not CMS-driven (same as the course page) */}
          <Box className="flex w-full items-center justify-center lg:justify-end">
            <Box className="relative aspect-[719/292] w-full max-w-[560px] overflow-hidden">
              <Image
                src="/course/world-map.webp"
                alt="Global delivery map"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="
                  object-contain
                  object-center
                  opacity-[0.55]
                  lg:object-top-right
                "
              />
            </Box>
          </Box>
        </Box>

        {/* =========================================================
            STATS
        ========================================================== */}
        <Reveal delay={2}>
          {/* 1px gaps over the border colour draw the grid lines, so any
              number of cards (4 or 8) lines up without per-cell borders. */}
          <Box className="mt-11 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-[#D9DCE0] bg-[#D9DCE0] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              // A number ("5,000+") sets large; a phrase ("Role-Specific AI
              // Skills") a size down so it wraps cleanly.
              const isPhrase = /[a-z]{3,}/i.test(stat.value ?? "") && (stat.value ?? "").length > 12;
              const isSentence = (stat.label ?? "").length > 32;
              return (
                <Box key={index} className="min-h-22.5 bg-white p-5 sm:px-6">
                  <Box className="flex items-baseline gap-2">
                    <Text
                      as="span"
                      className={cn(
                        "font-bold tracking-[-0.035em] text-[#0A1628]",
                        isPhrase ? "text-[18px] leading-[1.25]" : "text-[24px] leading-none",
                      )}
                    >
                      {stat.value}
                    </Text>

                    {stat.connector && (
                      <>
                        <Text as="span" className="text-[12px] text-ink-muted">
                          {stat.connector}
                        </Text>

                        <Text
                          as="span"
                          className="text-[24px] font-bold leading-none tracking-[-0.035em] text-[#0A1628]"
                        >
                          {stat.secondary_value}
                        </Text>
                      </>
                    )}
                  </Box>

                  <Text
                    as="p"
                    className={cn(
                      "mt-3",
                      isSentence
                        ? "text-[13px] leading-[1.5] text-ink-muted"
                        : "font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted",
                    )}
                  >
                    {stat.label}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Reveal>

      </Box>
    </Section>
  );
}
