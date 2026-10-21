import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/**
 * "Signs your training is ready" on navy: the signs, a note and a CTA on the
 * left; on the right a readiness card whose rows carry a status pill ("Done"
 * on navy/lime, otherwise dashed). The card is decorative — the same points
 * are made in the text beside it.
 *
 * Design: managed-training-services `#ready`, `.rd`, `.rd-card`, `.rd-row`, `.rd-st`.
 */
export default function ReadinessStatus({ data }) {
  if (!data?.heading) return null;

  const { section_id, heading, points, cta, checklist } = data;
  // `description` is the CMS field; `note` the local-content one.
  const note = data.description || data.note;

  return (
    <Section id={section_id} className="bg-navy">
      <Box className="grid grid-cols-2 items-stretch gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <Box>
          <Reveal>
            <RichHeading
              heading={heading}
              className="mb-3.5 text-paper"
              emphasisClassName="font-normal text-lime"
            />
          </Reveal>

          {note ? (
            <Reveal delay={1}>
              <Text as="p" className="mb-5.5 text-[14px] leading-[1.6] text-paper/72">
                {note}
              </Text>
            </Reveal>
          ) : null}

          {points?.length ? (
            <Reveal delay={2}>
              <Box as="ul" className="mb-6.5 flex list-none flex-col gap-2.75 p-0">
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

        {checklist?.items?.length ? (
          <Reveal delay={1} className="h-full">
            <Box
              aria-hidden="true"
              className="flex h-full w-full flex-col justify-center rounded-[14px] bg-white px-9 py-8 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7)] max-[600px]:px-5.5 max-[600px]:py-6"
            >
              <Text
                as="p"
                className="mb-2.5 border-b border-ink/12 pb-4 font-display text-[16px] leading-[1.4] font-bold text-ink"
              >
                {checklist.title}
              </Text>

              {checklist.items.map((item) => (
                <Box
                  key={item.label}
                  className="flex items-center gap-3.25 border-b border-ink/12 py-3.5 last:border-b-0"
                >
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
                      "flex-1 text-[15px] leading-[1.3]",
                      item.done ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {item.label}
                  </Text>
                  {item.status ? (
                    <Text
                      as="span"
                      className={cn(
                        "ml-auto flex-none rounded-full px-2.5 py-1 font-mono text-[10px] leading-[1.3] tracking-[0.1em] uppercase",
                        item.done
                          ? "bg-navy text-lime"
                          : "border border-dashed border-ink/22 text-ink-muted",
                      )}
                    >
                      {item.status}
                    </Text>
                  ) : null}
                </Box>
              ))}
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}
