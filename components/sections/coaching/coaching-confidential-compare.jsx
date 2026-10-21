"use client";

import { useState } from "react";
import { Eye, Lock, Users } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

const POINT_ICONS = { lock: Lock, eye: Eye, users: Users };

/**
 * Team-coaching "confidential" variant — two-column layout with:
 *   Left: heading + description + Team/Sponsor view toggle + bullet points
 *   Right: mock browser window showing what each party sees (rows + tags)
 *
 * The toggle blurs/stripes "stays in team" rows when sponsor view is active.
 */
export default function CoachingConfidentialCompare({ data }) {
  const [sponsorView, setSponsorView] = useState(false);

  if (!data?.window?.rows?.length) return null;

  const { section_id, heading, description, view1, view2, points, window: win } = data;
  const label1 = view1 || "Team\u2019s view";
  const label2 = view2 || "Sponsor\u2019s view";

  return (
    <Section id={section_id} className="bg-paper-warm">
      <Box className="grid grid-cols-[0.85fr_1.15fr] items-center gap-14 max-[1000px]:grid-cols-1 max-[1000px]:gap-8">

        {/* ---- Left: text + toggle + bullets ---- */}
        <Box>
          <Reveal>
            <RichHeading
              heading={heading}
              emphasisClassName="font-serif italic font-normal"
              className="mb-3.5"
            />
          </Reveal>

          {description ? (
            <Reveal delay={1}>
              <Text as="p" className="mb-5 max-w-[52ch] text-[clamp(15px,1.1vw,17px)] leading-[1.7] text-ink-muted">
                {description}
              </Text>
            </Reveal>
          ) : null}

          {/* Toggle switch */}
          <Reveal delay={2}>
            <Box
              as="div"
              role="group"
              aria-label="Choose a view"
              className="mb-6 inline-flex items-center rounded-full border border-ink/12 bg-white p-1"
            >
              <button
                type="button"
                onClick={() => setSponsorView(false)}
                aria-pressed={!sponsorView}
                className={cn(
                  "rounded-full px-5 py-2.5 font-display text-[14px] font-semibold transition-colors duration-200 cursor-pointer border-0",
                  !sponsorView ? "bg-navy text-lime" : "bg-transparent text-ink-muted hover:text-ink",
                )}
              >
                {label1}
              </button>
              <button
                type="button"
                onClick={() => setSponsorView(true)}
                aria-pressed={sponsorView}
                className={cn(
                  "rounded-full px-5 py-2.5 font-display text-[14px] font-semibold transition-colors duration-200 cursor-pointer border-0",
                  sponsorView ? "bg-navy text-lime" : "bg-transparent text-ink-muted hover:text-ink",
                )}
              >
                {label2}
              </button>
            </Box>
          </Reveal>

          {/* Bullet points */}
          {points?.length ? (
            <Box as="ul" className="m-0 list-none flex flex-col gap-3.5 p-0">
              {points.map((pt, i) => {
                const Icon = POINT_ICONS[pt.icon] ?? Lock;
                return (
                  <Reveal as="li" key={pt.title} delay={i + 3} className="flex gap-3.5 text-[14.5px] leading-[1.5] text-ink-muted">
                      <Box
                        as="span"
                        aria-hidden="true"
                        className="flex size-[38px] flex-none items-center justify-center rounded-[11px] bg-lime-soft text-navy"
                      >
                        <Icon size={18} strokeWidth={1.7} />
                      </Box>
                      <Box>
                        <Text as="b" className="mb-0.5 block font-display text-[15px] font-semibold text-ink">
                          {pt.title}
                        </Text>
                        {pt.text}
                      </Box>
                  </Reveal>
                );
              })}
            </Box>
          ) : null}
        </Box>

        {/* ---- Right: window mock ---- */}
        <Reveal delay={1}>
          <Box className="overflow-hidden rounded-[16px] border border-ink/12 bg-white shadow-[0_20px_40px_rgba(10,22,40,.08)]">
            {/* Window title bar */}
            <Box
              aria-hidden="true"
              className="flex items-center gap-1.5 bg-navy px-4 py-2.5"
            >
              <span className="size-[9px] rounded-full bg-lime" />
              <span className="size-[9px] rounded-full bg-paper/25" />
              <span className="size-[9px] rounded-full bg-paper/25" />
              <Text as="span" className="ml-2.5 font-display font-semibold text-[13px] text-paper">
                {win.title ?? "Team's view"}
              </Text>
              <Text as="span" className="ml-auto font-mono text-[11px] uppercase tracking-[0.1em] text-lime">
                {win.session}
              </Text>
            </Box>

            {/* Rows */}
            <Box className="px-5 py-2 max-[600px]:px-3.5">
              {win.rows.map((row, i) => {
                const isPrivate = row.tag === "team";
                const isLast = i === win.rows.length - 1;
                return (
                  <Box
                    key={row.label}
                    className={cn(
                      "grid grid-cols-[150px_minmax(0,1fr)_auto] items-center gap-3 py-2.5 text-[14.5px] transition-colors duration-300",
                      !isLast && "border-b border-ink/8",
                      isPrivate && sponsorView && "bg-[repeating-linear-gradient(-45deg,transparent_0_8px,rgba(10,22,40,.03)_8px_16px)]",
                      "max-[600px]:grid-cols-[1fr_auto] max-[600px]:gap-x-2.5",
                    )}
                  >
                    {/* Label — mono uppercase */}
                    <Text
                      as="b"
                      className="font-mono text-[10.5px] font-normal uppercase tracking-[0.1em] text-ink-muted max-[600px]:col-start-1"
                    >
                      {row.label}
                    </Text>

                    {/* Value or progress bar */}
                    <Box
                      className={cn(
                        "transition-[filter,opacity] duration-300 max-[600px]:col-span-2",
                        isPrivate && sponsorView && "opacity-70 blur-[5px] select-none",
                      )}
                    >
                      {row.progress != null ? (
                        <Box
                          role="img"
                          aria-label={`${row.progress}% progress`}
                          className="h-2 overflow-hidden rounded-full bg-ink/10"
                        >
                          <Box
                            className="h-full rounded-full bg-lime"
                            style={{ width: `${row.progress}%` }}
                          />
                        </Box>
                      ) : (
                        <Text as="span" className="text-[14.5px] text-ink">
                          {row.value}
                        </Text>
                      )}
                    </Box>

                    {/* Tag */}
                    <Box
                      as="span"
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] whitespace-nowrap max-[600px]:col-start-2 max-[600px]:row-start-1",
                        isPrivate
                          ? "bg-navy text-lime"
                          : cn("bg-lime-soft text-navy", sponsorView && "bg-lime"),
                      )}
                    >
                      {isPrivate ? (
                        <Lock size={12} aria-hidden="true" />
                      ) : (
                        <Eye size={12} aria-hidden="true" />
                      )}
                      {isPrivate ? (win.private_label ?? "Stays in the team") : (win.sponsor_label ?? "Sponsor sees")}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
