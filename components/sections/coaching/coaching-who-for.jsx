"use client";

import { useState } from "react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { coachingIcon } from "@/components/sections/coaching/icons";
import { cn } from "@/lib/utils";

/**
 * "Who is this coaching for?" — tab list on the left selects the audience
 * panel on the right. Each panel shows a title, description, and a set of
 * track-name pills.
 *
 * "use client" is required for the tab-switching useState.
 */
export default function CoachingWhoFor({ data }) {
  const [active, setActive] = useState(0);

  if (!data?.tabs?.length) return null;

  const { heading, description, tabs, panels } = data;
  const activePanel = panels?.[active];

  return (
    <Section id="who">
      {/* Section heading */}
      <Box className="mb-12 max-w-205 max-[600px]:mb-8">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      {/* Two-column tab layout */}
      <Box className="grid grid-cols-[300px_1fr] items-start gap-6 max-[900px]:grid-cols-1">
        {/* Tab list */}
        <Box
          as="ul"
          role="tablist"
          aria-label="Coaching audience"
          className="m-0 list-none p-0 flex flex-col gap-2"
        >
          {tabs.map((tab, index) => {
            const Icon = coachingIcon(tab.icon);
            const isActive = index === active;

            return (
              <Box as="li" key={tab.label}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`who-panel-${index}`}
                  id={`who-tab-${index}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[10px] border px-4 py-3.5 text-left text-[15px] font-semibold transition-[background,border-color,box-shadow] duration-200 cursor-pointer",
                    isActive
                      ? "bg-navy text-paper border-navy"
                      : "bg-white border-ink/12 text-ink hover:border-ink/30",
                  )}
                >
                  {Icon ? (
                    <Icon
                      size={18}
                      strokeWidth={1.7}
                      aria-hidden="true"
                      className={isActive ? "text-lime" : "text-navy"}
                    />
                  ) : null}
                  {tab.label}
                </button>
              </Box>
            );
          })}
        </Box>

        {/* Tab panels */}
        <Box>
          {panels?.map((panel, index) => (
            <Box
              key={index}
              id={`who-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`who-tab-${index}`}
              hidden={index !== active}
              className="rounded-[14px] bg-paper-warm p-8 max-[600px]:p-6"
            >
              <Text as="h3" className="font-display text-[24px] leading-[1.2] font-medium tracking-[-0.02em] text-ink mb-3">
                {panel.title}
              </Text>
              {panel.description ? (
                <Text as="p" className="text-[16px] leading-[1.7] text-ink/60 mb-6">
                  {panel.description}
                </Text>
              ) : null}

              {panel.tracks?.length ? (
                <>
                  <Box className="my-5 h-px bg-ink/10" />
                  <Text as="p" className="text-[15px] leading-[1.7] text-ink">
                    {panel.tracks_label ? (
                      <span className="text-ink/60">{panel.tracks_label}{" "}</span>
                    ) : null}
                    {panel.tracks.map((track, i) => (
                      <span key={track}>
                        <span className="font-semibold underline decoration-lime underline-offset-[3px]">{track}</span>
                        {i < panel.tracks.length - 1 ? <span className="text-ink/50"> and </span> : null}
                      </span>
                    ))}
                  </Text>
                </>
              ) : null}
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
