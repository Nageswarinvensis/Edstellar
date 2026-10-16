import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

const TOOL_ICONS = {
  "Spectra LMS":                     <><path d="M3 5h18v11H3zM8 20h8M12 16v4M10 8.5v4l3.5-2z"/></>,
  "Capability Intelligence Platform": <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></>,
  "TNA/TNI Engine":                   <><path d="M3 4h18l-7 8v6l-4 2v-8L3 4Z"/></>,
  "Stellar AI":                       <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></>,
  "Zenith":                           <><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z"/></>,
  "Orbit":                            <><ellipse cx="12" cy="12" rx="9.5" ry="4.5" transform="rotate(-30 12 12)"/><circle cx="12" cy="12" r="2.5"/></>,
  "Polaris":                          <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .8 3.5 2.8 3.5 5.5"/></>,
  "Meridian":                         <><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 11h7M8.5 14h4"/></>,
};

export default function WwsTools({ data }) {
  if (!data) return null;

  return (
    <Section
      id="tools"
      aria-labelledby="tools-h"
      className="scroll-mt-20 bg-navy text-paper"
    >
      {/* Section heading */}
      <Reveal>
        <Box className="mb-10 max-w-[760px]">
          <RichHeading
            as="h2"
            id="tools-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-paper"
            emphasisClassName="text-lime"
          />
          <Text as="p" className="mt-5 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/72">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      {/* Two-column grid with vertical divider */}
      <Box className="grid grid-cols-2 gap-0 max-[1200px]:grid-cols-1">
        {data.cols.map((col, ci) => (
          <Reveal
            key={col.heading}
            delay={ci + 1}
            className={
              ci === 0
                ? "flex flex-col pr-8 border-r border-paper/[0.12] max-[1200px]:pr-0 max-[1200px]:pb-8 max-[1200px]:border-r-0 max-[1200px]:border-b"
                : "flex flex-col pl-8 max-[1200px]:pl-0 max-[1200px]:pt-8"
            }
          >
            <Text
              as="h3"
              className="m-0 font-display text-[24px] font-bold leading-[1.25] tracking-[-0.02em] text-paper"
            >
              {col.heading}
            </Text>
            <Text as="p" className="mt-2 mb-6 text-[15px] leading-[1.6] text-paper/72">
              {col.sub}
            </Text>

            {/* 2×2 tool cards */}
            <Box className="grid flex-1 grid-cols-2 gap-4 max-[900px]:grid-cols-1">
              {col.tools.map((tool) => (
                <Box
                  key={tool.name}
                  className="flex flex-col rounded-[14px] border border-paper/[0.12] bg-navy-soft p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(5,13,26,.6)] max-[600px]:p-5"
                >
                  {/* Card top: icon + stage badge */}
                  <Box className="mb-5 flex items-start justify-between gap-3">
                    <Box className="flex size-[52px] shrink-0 items-center justify-center rounded-[12px] bg-lime/10 text-lime">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-[26px]"
                        aria-hidden="true"
                      >
                        {TOOL_ICONS[tool.name] ?? <><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8"/></>}
                      </svg>
                    </Box>
                    <Text
                      as="span"
                      className="rounded-full border border-paper/[0.22] px-[10px] py-1 text-[12px] font-semibold leading-[1.4] text-paper/72"
                    >
                      {tool.stage}
                    </Text>
                  </Box>

                  <Text
                    as="h4"
                    className="m-0 mb-2 font-display text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-paper"
                  >
                    {tool.name}
                  </Text>
                  <Text as="p" className="m-0 flex-1 text-[15px] leading-[1.6] text-paper/72">
                    {tool.desc}
                  </Text>

                  {tool.href && (
                    <Link
                      href={tool.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-lime no-underline hover:underline hover:underline-offset-[4px]"
                    >
                      Explore {tool.name}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4 transition-transform duration-200 hover:translate-x-[3px]"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  )}
                </Box>
              ))}
            </Box>
          </Reveal>
        ))}
      </Box>

      {/* Note */}
      <Reveal delay={3}>
        <Text as="p" className="mt-6 text-[13px] text-paper/60">
          {data.note}
        </Text>
      </Reveal>
    </Section>
  );
}
