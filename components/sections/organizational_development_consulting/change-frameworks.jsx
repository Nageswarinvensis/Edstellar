"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

/**
 * "The frameworks and models behind Edstellar's change management consulting" —
 * one accordion row per established change model. Each row opens to the model's
 * one-line summary and the three phases Edstellar puts to work, each with a
 * subtitle and three worked examples. Every row's body is in the initial HTML
 * (base-ui keeps closed panels mounted), so it stays crawlable.
 *
 * Change-management-specific, so it lives in this page's own section folder
 * (TASTE.md §6.1).
 *
 * Design: `change-management-consulting (18).html` → `#frameworks`, `.mcards`,
 * `.acc`, `.acc-head`, `.acc-meta`, `.acc-panel`, `.muse-grid`, `.muse`.
 */

const MONO_LABEL = "font-mono text-[10px] leading-[1.7] tracking-[0.14em] uppercase";

/**
 * The design's own line icon per model, by `item.id` — the `.acc-ic` SVG from
 * each page's frameworks section. These are the designs' bespoke strokes, not a
 * library set, so each model shows exactly what its design draws. Anything
 * unmapped gets a neutral default.
 */
const ICON_PATHS = {
  // change-management-consulting
  lewin: (
    <>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
      <path d="M20 3v5h-5" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
      <path d="M4 21v-5h5" />
    </>
  ),
  kotter: <path d="M4 20h4v-4h4v-4h4v-4h4" />,
  bridges: (
    <>
      <path d="M3 16v-3M21 16v-3M3 13a9 5 0 0 1 18 0" />
      <path d="M3 16h18M8 16v-3M16 16v-3M12 13v3" />
    </>
  ),
  "kubler-ross": (
    <>
      <path d="M3 6C6 6 6 18 12 18s6-12 9-12" />
      <circle cx="3" cy="6" r="1" />
      <circle cx="21" cy="6" r="1" />
    </>
  ),
  rogers: (
    <>
      <circle cx="8" cy="9" r="2.6" />
      <circle cx="16" cy="9" r="2.6" />
      <path d="M3.5 19a4.5 4.5 0 0 1 9 0M11.5 19a4.5 4.5 0 0 1 9 0" />
    </>
  ),
  nudge: (
    <path d="M14 11V6a2 2 0 0 0-4 0v7l-2-1.5a1.8 1.8 0 0 0-2.4 2.6l3.4 4.2a4 4 0 0 0 3.1 1.5H16a3 3 0 0 0 3-3v-3a2 2 0 0 0-2-2z" />
  ),

  // culture-transformation-consulting
  schein: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5M3 16.5l9 5 9-5" />
    </>
  ),
  "competing-values": (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M12 3.5v17M3.5 12h17" />
    </>
  ),
  hofstede: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  "cultural-web": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  handy: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M9 3.5v17M15 3.5v17M3.5 9h17M3.5 15h17" />
    </>
  ),
  trompenaars: (
    <>
      <circle cx="9.2" cy="10" r="4.8" />
      <circle cx="14.8" cy="10" r="4.8" />
      <circle cx="12" cy="14.6" r="4.8" />
    </>
  ),

  // dei-consulting
  "thomas-ely": (
    <>
      <circle cx="9.2" cy="10" r="4.8" />
      <circle cx="14.8" cy="10" r="4.8" />
      <circle cx="12" cy="14.6" r="4.8" />
    </>
  ),
  gdib: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-4M12 20v-8.5M17 20v-13" />
    </>
  ),
  "diversity-wheel": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  "psychological-safety": (
    <>
      <path d="M12 3l7 2.5v5.6c0 4.4-3 7.8-7 9.4-4-1.6-7-5-7-9.4V5.5z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  intersectionality: (
    <>
      <ellipse cx="9.6" cy="12" rx="3.9" ry="7.6" />
      <ellipse cx="14.4" cy="12" rx="3.9" ry="7.6" />
    </>
  ),
  "implicit-bias": (
    <>
      <path d="M12 4.6v15M6.5 19.6h11M4.6 8.6h14.8" />
      <path d="M4.6 8.6 2.5 13a2.1 2.1 0 0 0 4.2 0z" />
      <path d="M19.4 8.6 17.3 13a2.1 2.1 0 0 0 4.2 0z" />
      <circle cx="12" cy="5" r="1.25" />
    </>
  ),
};

const DEFAULT_ICON = (
  <>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="1.6" />
  </>
);

/**
 * The custom trigger: the shadcn `AccordionTrigger` bakes in its own chevrons
 * and layout, so this composes the base-ui primitive directly (as the FAQ
 * does) to lay out the icon, model number, title and author.
 */
function FrameworkTrigger({ item }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        title={`Click Here to View ${item.name}`}
        className="group/acc flex w-full cursor-pointer items-center gap-4 px-[22px] py-[17px] text-left outline-none hover:bg-paper-warm focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy max-[640px]:gap-3.25 max-[640px]:px-4"
      >
        <Box
          as="span"
          aria-hidden="true"
          className="grid size-10 flex-none place-items-center rounded-[11px] bg-navy text-lime"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[22px]"
          >
            {ICON_PATHS[item.id] ?? DEFAULT_ICON}
          </svg>
        </Box>

        <Box className="flex min-w-0 flex-1 flex-col gap-0.5">
          {item.model_no ? (
            <Text as="span" className={`${MONO_LABEL} text-ink/45`}>
              {item.model_no}
            </Text>
          ) : null}
          <Text
            as="span"
            className="font-display text-[16px] leading-[1.22] font-semibold text-ink"
          >
            {item.name}
          </Text>
          {item.author ? (
            <Text
              as="span"
              className="font-mono text-[10.5px] leading-[1.4] tracking-[0.03em] text-ink/60 uppercase"
            >
              {item.author}
            </Text>
          ) : null}
        </Box>

        <ChevronDown
          size={20}
          strokeWidth={2}
          aria-hidden="true"
          className="flex-none text-ink/55 transition-transform duration-300 group-aria-expanded/acc:rotate-180 group-aria-expanded/acc:text-navy"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/** One phase: a lime top rule, title, subtitle and lime-bulleted examples. */
function PhaseColumn({ phase }) {
  return (
    <Box className="border-t-2 border-lime pt-2.75">
      <Text
        as="p"
        className="mb-0.75 font-display text-[12.5px] leading-[1.25] font-semibold text-ink"
      >
        {phase.title}
      </Text>
      {phase.subtitle ? (
        <Text as="p" className="text-[12px] leading-[1.45] text-ink/60">
          {phase.subtitle}
        </Text>
      ) : null}
      {phase.examples?.length ? (
        <Box as="ul" className="mt-2.25 flex flex-col gap-1.25">
          {phase.examples.map((example) => (
            <Box
              as="li"
              key={example}
              className="relative pl-3.5 text-[11.5px] leading-[1.5] text-ink/60"
            >
              <Box
                aria-hidden="true"
                className="absolute top-1.5 left-0 size-[5px] rounded-[1px] bg-lime"
              />
              {example}
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

export default function ChangeFrameworks({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, items } = data;

  return (
    <Section
      id={section_id ?? "frameworks"}
      className="scroll-mt-20 border-t border-ink/12 bg-paper-warm"
    >
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          <RichHeading
            heading={heading}
            className="text-[clamp(32px,4vw,40px)] leading-[1.08] hyphens-none"
            emphasisClassName="font-normal"
          />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60 hyphens-none"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal delay={2}>
        <Accordion
          defaultValue={items[0] ? [items[0].id] : []}
          className="mx-auto flex max-w-[970px] flex-col gap-3"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="overflow-hidden rounded-[14px] border border-ink/12 border-l-[3px] border-l-lime bg-white shadow-sm"
            >
              <FrameworkTrigger item={item} />

              <AccordionContent className="pt-0.5 pr-6 pb-5.5 pl-[78px] max-[640px]:px-4">
                {item.description ? (
                  <Text
                    as="p"
                    className="mb-4.5 max-w-[660px] text-[13.5px] leading-[1.55] text-ink/60"
                  >
                    {item.description}
                  </Text>
                ) : null}

                {item.phases?.length ? (
                  <Box className="grid grid-cols-3 gap-6 max-[640px]:grid-cols-1 max-[640px]:gap-3.5">
                    {item.phases.map((phase) => (
                      <PhaseColumn key={phase.title} phase={phase} />
                    ))}
                  </Box>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
