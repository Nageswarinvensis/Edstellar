import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import HomeWrap from "@/components/sections/home/home-wrap";
import HomeSectionHead from "@/components/sections/home/home-section-head";
import { cn } from "@/lib/utils";

/** The design's solution-card icons (24px grid, 1.8 stroke), keyed by the content's `icon`. */
const ICONS = {
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="1" />
      <circle cx="4.5" cy="12" r="1" />
      <circle cx="4.5" cy="18" r="1" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2a5 5 0 0 1 5.5 5.8" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  sliders: (
    <>
      <path d="M6 3v18M12 3v18M18 3v18" />
      <circle cx="6" cy="8" r="2" className="fill-lime-soft" />
      <circle cx="12" cy="15" r="2" className="fill-lime-soft" />
      <circle cx="18" cy="10" r="2" className="fill-lime-soft" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  cycle: (
    <>
      <path d="M4 12a8 8 0 0 1 14-5.3L20 9" />
      <path d="M20 4v5h-5" />
      <path d="M20 12a8 8 0 0 1-14 5.3L4 15" />
      <path d="M4 20v-5h5" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
};

/** Card grid per stage: a stage of 3 cards uses 3 columns (the design's `.cards.c3`), otherwise 4. */
const GRID = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

/**
 * "Capability development solutions, from first measure to lasting change."
 * — every Edstellar solution as a card, grouped by the stage of a program
 * that uses it: 01 · Measure, 02 · Build, 03 · Embed. Each stage is a row:
 * its label column (number, title, one line) beside its cards.
 *
 * Design: `edstellar-homepage-capability-development.html` → `#solutions`
 * (`.split-head`, `.stage`, `.sl`, `.cards`, `.sc`). Replaces the old
 * four-pillar block.
 */
export default function HomeSolutions({ data }) {
  if (!data?.stages?.length) return null;
  const { heading, lede, stages } = data;

  return (
    <HomeWrap id="solutions" aria-labelledby="solutions-heading" className="scroll-mt-16 bg-paper py-20 max-lg:py-16">
      <HomeSectionHead id="solutions-heading" heading={heading} lede={lede} />

      <Box>
        {stages.map((stage, si) => (
          <Box
            key={stage.label}
            as="section"
            aria-labelledby={`solutions-stage-${si}`}
            className="grid gap-x-6 gap-y-6 border-t border-ink/12 py-[34px] last:border-b lg:grid-cols-[260px_minmax(0,1fr)]"
          >
            <Reveal>
              <Text as="span" className="block font-mono text-[10.5px] leading-[1.4] font-medium uppercase tracking-[0.07em] text-ink-muted">
                {stage.label}
              </Text>
              <RichHeading
                as="h3"
                id={`solutions-stage-${si}`}
                heading={stage.title}
                className="mt-2.5 mb-2 text-[30px] font-medium leading-[1.1] tracking-[-0.03em] text-ink"
              />
              {stage.text && (
                <Text as="p" className="m-0 max-w-[220px] text-[14px] leading-[1.55] text-ink-muted max-lg:max-w-[520px]">
                  {stage.text}
                </Text>
              )}
            </Reveal>

            <Box
              as="ul"
              className={cn(
                "m-0 grid list-none grid-cols-1 border-l border-ink/12 p-0 min-[600px]:grid-cols-2 max-[599px]:border-l-0",
                GRID[stage.cards.length] ?? GRID[4],
              )}
            >
              {stage.cards.map((card, ci) => (
                <Reveal
                  key={card.title}
                  as="li"
                  delay={Math.min(ci, 3)}
                  className="flex flex-col border-r border-ink/12 px-[22px] pt-1.5 pb-1 last:border-r-0 max-lg:py-5 max-[599px]:border-r-0 max-[599px]:border-b max-[599px]:px-0 max-[599px]:last:border-b-0"
                >
                  <span aria-hidden="true" className="grid size-[34px] place-items-center rounded-lg bg-lime-soft text-navy">
                    <svg viewBox="0 0 24 24" className="size-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                      {ICONS[card.icon] ?? ICONS.target}
                    </svg>
                  </span>
                  <Text as="h4" className="mt-4 mb-2 text-[19px] leading-[1.25] font-medium tracking-[-0.02em] text-ink">
                    {card.title}
                  </Text>
                  <Text as="p" className="m-0 text-[14px] leading-[1.55] text-ink-muted">
                    {card.text}
                  </Text>
                  {card.href && card.cta && (
                    <Link
                      href={card.href}
                      title={`Click here to view the ${card.cta.replace(/^Explore\s+/i, "")}`}
                      className="mt-auto inline-flex items-center gap-2 pt-[18px] font-mono text-[10.5px] font-medium uppercase tracking-[0.07em] text-ink no-underline transition-colors hover:text-olive"
                    >
                      {card.cta}
                      <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  )}
                </Reveal>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </HomeWrap>
  );
}
