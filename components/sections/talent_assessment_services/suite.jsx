import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/** The dark emblem panel at the top of each tool card: monogram + stat badges + extras. */
function ToolEmblem({ tool }) {
  return (
    <Box
      aria-hidden="true"
      className="mb-5 flex flex-col gap-3.5 rounded-2xl bg-navy p-5"
    >
      <Box className="flex items-center gap-3">
        <Box className="grid size-12 flex-none place-items-center rounded-full bg-lime font-display text-[20px] font-bold text-navy">
          {tool.mark}
        </Box>
        {tool.badges?.length ? (
          <Box className="flex flex-wrap gap-2">
            {tool.badges.map((badge) => (
              <Box
                key={badge.label}
                className="inline-flex items-baseline gap-1.5 rounded-full border border-paper/16 bg-navy-soft px-3 py-1.5"
              >
                <Text as="span" className="font-display text-[14px] font-bold text-lime">
                  {badge.n}
                </Text>
                <Text as="span" className="text-[11.5px] text-paper">
                  {badge.label}
                </Text>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>

      {tool.extras?.length ? (
        <Box className="flex flex-wrap gap-2">
          {tool.extras.map((extra) => (
            <Text
              as="span"
              key={extra}
              className="rounded-full border border-lime/50 px-2.75 py-1.25 text-[10px] font-semibold text-paper"
            >
              {extra}
            </Text>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

/**
 * The Edstellar assessment suite — three proprietary tools (Zenith, Orbit,
 * Polaris) as cards on a dark band, each with a decorative emblem, description,
 * use cases, audience and a product link.
 *
 * Design: `#suite`, `.oA`, `.suite-grid`, `.pc`.
 */
export default function Suite({ data }) {
  if (!data?.tools?.length) return null;

  const { section_id, heading, lede, tools } = data;

  return (
    <Section id={section_id} className="bg-navy">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} className="text-paper" emphasisClassName="font-normal text-lime" />
        </Reveal>
        {lede ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[70ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/70">
              {lede}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1" role="list">
        {tools.map((tool, index) => (
          <Reveal key={tool.name} delay={Math.min(index + 1, 4)} role="listitem">
            <Box className="flex h-full flex-col rounded-2xl border border-ink/12 bg-white p-7">
              <ToolEmblem tool={tool} />

              <Box className="mb-4.5 flex items-center gap-3.5">
                <Box className="grid size-11 flex-none place-items-center rounded-full bg-lime-soft font-display text-[18px] font-bold text-navy">
                  {tool.mark}
                </Box>
                <Box>
                  <Text as="h3" className="font-display text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
                    {tool.name}
                  </Text>
                  <Text as="span" className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                    {tool.kicker}
                  </Text>
                </Box>
              </Box>

              <Text as="p" className="mb-4 text-[14px] leading-[1.6] text-ink">
                {tool.description}
              </Text>

              <Box as="dl" className="mb-5.5 grid gap-3 border-t border-ink/12 pt-3.5">
                <Box>
                  <Box as="dt" className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60">
                    Use cases
                  </Box>
                  <Box as="dd" className="m-0 flex flex-wrap gap-1.5">
                    {tool.use_cases.map((useCase) => (
                      <Text
                        as="span"
                        key={useCase}
                        className="rounded-full bg-lime-soft px-2.5 py-1 text-[12px] text-navy"
                      >
                        {useCase}
                      </Text>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Box as="dt" className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60">
                    Audience
                  </Box>
                  <Box as="dd" className="m-0 text-[13.5px] leading-[1.5] text-ink">
                    {tool.audience}
                  </Box>
                </Box>
              </Box>

              {tool.cta?.href ? (
                <Box
                  as={Link}
                  href={tool.cta.href}
                  title={`Click Here to View ${tool.name}`}
                  className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-navy px-5.5 py-3 text-[13px] font-semibold text-lime no-underline transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {tool.cta.label}
                  <ArrowRight size={15} aria-hidden="true" />
                </Box>
              ) : null}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
