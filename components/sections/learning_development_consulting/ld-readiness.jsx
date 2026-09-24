import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/** Decorative only — the same points are made in real text beside it. */
function ChecklistCard({ checklist }) {
  if (!checklist?.items?.length) return null;

  return (
    <Box
      aria-hidden="true"
      className="w-full max-w-95 rounded-[14px] bg-white p-6 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7)] max-[900px]:mx-auto"
    >
      <Text
        as="p"
        className="mb-4 border-b border-ink/12 pb-3.5 font-display text-[14px] leading-[1.4] font-bold text-ink"
      >
        {checklist.title}
      </Text>

      {checklist.items.map((item) => (
        <Box key={item.label} className="flex items-center gap-3.25 py-2.25">
          <Box
            className={cn(
              "relative size-5.5 flex-none rounded-md border-2",
              item.done ? "border-lime bg-lime" : "border-ink/22",
            )}
          >
            {item.done ? (
              <Box className="absolute top-0.5 left-1.5 h-2.5 w-1.5 rotate-40 border-r-2 border-b-2 border-navy" />
            ) : null}
          </Box>
          <Text
            as="span"
            className={cn(
              "flex-1 text-[12.5px] leading-[1.3]",
              item.done ? "text-ink" : "text-ink/60",
            )}
          >
            {item.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

/**
 * Readiness lead magnet on navy: a decorative L&D checklist card beside the
 * pitch for the free checklist, its three focus points and a lime CTA.
 *
 * Design: `#readiness`, `.rd`, `.rd-card`, `.rd-row`, `.rd-list`.
 */
export default function LdReadiness({ data }) {
  if (!data) return null;

  const { section_id, heading, description, points, cta, checklist } = data;

  return (
    <Section id={section_id} className="bg-navy">
      <Box className="grid grid-cols-[0.9fr_1.1fr] items-center gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <Reveal>
          <ChecklistCard checklist={checklist} />
        </Reveal>

        <Box>
          <Reveal>
            <RichHeading
              heading={heading}
              className="mb-3.5 text-paper"
              emphasisClassName="font-normal text-lime"
            />
          </Reveal>

          {description ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="mb-5 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/72"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}

          {points?.length ? (
            <Reveal delay={2}>
              <Box as="ul" className="mb-6.5 flex flex-col gap-2.75">
                {points.map((point) => (
                  <Box
                    as="li"
                    key={point}
                    className="relative pl-5.5 text-[14.5px] leading-[1.5] text-paper"
                  >
                    <Box
                      aria-hidden="true"
                      className="absolute top-2 left-0 size-1.75 rounded-full bg-lime"
                    />
                    {point}
                  </Box>
                ))}
              </Box>
            </Reveal>
          ) : null}

          {cta?.href ? (
            <Reveal delay={3}>
              <CtaButton
                color="lime"
                arrow
                render={<Link href={cta.href} />}
                className="focus-visible:outline-lime"
              >
                {cta.label}
              </CtaButton>
            </Reveal>
          ) : null}
        </Box>
      </Box>
    </Section>
  );
}
