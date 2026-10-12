"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Inbox,
  MessageSquare,
  FileText,
  Users,
  Presentation,
  Search,
  LineChart,
  UserRoundCheck,
  MapPin,
  Monitor,
  Link2,
  Check,
} from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

const ICONS = {
  inbox: Inbox,
  message: MessageSquare,
  file: FileText,
  users: Users,
  presentation: Presentation,
  search: Search,
  "line-chart": LineChart,
  "user-check": UserRoundCheck,
  "map-pin": MapPin,
  monitor: Monitor,
  link: Link2,
};

/** A grid of exercise/format cards, each with a "Reveals:" / "Best for:" line. */
function CardGrid({ items, lineLabel, cols }) {
  return (
    <Box
      as="ul"
      className={cn(
        "grid list-none gap-4 p-0",
        cols === 3
          ? "grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
          : "grid-cols-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1",
      )}
    >
      {items.map((item) => {
        const Icon = ICONS[item.icon] || FileText;
        return (
          <Box
            as="li"
            key={item.title}
            className="flex flex-col rounded-2xl border border-ink/12 bg-white p-6"
          >
            <Box className="mb-4 grid size-10.5 place-items-center rounded-[11px] bg-lime-soft text-navy">
              <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
            </Box>
            <Text as="h3" className="mb-1.5 font-display text-[17px] font-bold leading-[1.3] text-ink">
              {item.title}
            </Text>
            <Text as="p" className="text-[14px] leading-[1.55] text-ink/60">
              {item.description}
            </Text>
            {item.line ? (
              <Text
                as="p"
                className="mt-3 border-t border-ink/12 pt-3 text-[13px] leading-[1.5] text-ink"
              >
                <Box as="b" className="font-semibold">{lineLabel} </Box>
                {item.line}
              </Text>
            ) : null}
          </Box>
        );
      })}
    </Box>
  );
}

/** The example competency matrix — competencies (rows) × exercises (columns). */
function Matrix({ data }) {
  return (
    <Box>
      {data.intro ? (
        <Text as="p" className="mb-6 max-w-[80ch] text-[16px] leading-[1.7] text-ink">
          {data.intro}
        </Text>
      ) : null}

      <Box
        role="region"
        aria-label="Example competency matrix"
        tabIndex={0}
        className="no-scrollbar overflow-x-auto rounded-2xl border border-ink/12 bg-white"
      >
        <table className="w-full min-w-200 border-collapse">
          <caption className="sr-only">
            Example matrix for a leadership center: which exercises observe each
            competency
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="border-b border-ink/12 bg-paper-warm px-4 py-3.5 text-left font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-ink/60"
              >
                Competency
              </th>
              {data.columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="border-b border-ink/12 bg-paper-warm px-3 py-3.5 text-center font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-ink/60"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.competency} className="hover:bg-paper">
                <th
                  scope="row"
                  className="min-w-45 border-b border-ink/12 px-4 py-3 text-left font-display text-[14px] font-semibold text-ink"
                >
                  {row.competency}
                </th>
                {row.observed.map((seen, index) => (
                  <td
                    key={data.columns[index]}
                    className="border-b border-ink/12 px-3 py-3 text-center"
                  >
                    {seen ? (
                      <>
                        <span className="inline-grid size-5.5 place-items-center rounded-full bg-lime text-navy align-middle">
                          <Check size={13} strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="sr-only">Observed</span>
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-ink/20 align-middle" />
                        <span className="sr-only">Not observed</span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {data.note ? (
        <Text as="p" className="mt-4 text-[14px] leading-[1.6] text-ink/60">
          {data.note}
        </Text>
      ) : null}
    </Box>
  );
}

/**
 * "Inside a center" — a tabbed look at the exercises, the competency matrix and
 * the three delivery formats of an assessment/development center.
 *
 * Design: `#inside`, `.ix-tabs`, `.ix-grid`, `.cm` (matrix).
 */
export default function Inside({ data }) {
  const tabs = data?.tabs ?? [];
  const [active, setActive] = useState(0);

  if (!tabs.length) return null;

  const { section_id, heading, description, cta } = data;
  const current = tabs[active];

  return (
    <Section id={section_id} className="bg-paper">
      <Box className="mb-8 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box
        role="tablist"
        aria-label="Inside an Edstellar center"
        className="mb-7 flex flex-wrap gap-2"
      >
        {tabs.map((tab, index) => {
          const isActive = index === active;
          return (
            <Box
              as="button"
              type="button"
              key={tab.label}
              role="tab"
              id={`ix-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`ix-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "cursor-pointer rounded-full border px-5 py-2.5 font-body text-[14px] font-semibold transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                isActive
                  ? "border-navy bg-navy text-paper"
                  : "border-ink/12 bg-white text-ink hover:border-navy",
              )}
            >
              {tab.label}
            </Box>
          );
        })}
      </Box>

      <Box role="tabpanel" id={`ix-panel-${active}`} aria-labelledby={`ix-tab-${active}`}>
        {current.kind === "matrix" ? (
          <Matrix data={current} />
        ) : (
          <CardGrid
            items={current.items}
            lineLabel={current.line_label}
            cols={current.kind === "formats" ? 3 : 4}
          />
        )}
      </Box>

      {cta?.href ? (
        <Box className="mt-8">
          <CtaButton arrow render={<Link href={cta.href} />}>
            {cta.label}
          </CtaButton>
        </Box>
      ) : null}
    </Section>
  );
}
