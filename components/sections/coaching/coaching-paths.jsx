import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { coachingIcon } from "@/components/sections/coaching/icons";
import { cn } from "@/lib/utils";

/**
 * Coaching paths — one card per path (icon tile, audience, title, line, focus
 * list, "Explore" link); the `featured` card is navy.
 *
 * Design: coaching-hub `#paths`, `.paths`, `.path`, `.path.feature`.
 */
export default function CoachingPaths({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, items } = data;

  return (
    <Section id={section_id} className="pb-10 lg:pb-10">
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

      <Box className="grid grid-cols-3 gap-6 max-[1200px]:grid-cols-2 max-[600px]:grid-cols-1">
        {items.map((item, index) => {
          const Icon = coachingIcon(item.icon);
          const dark = item.featured;
          return (
            <Reveal key={item.title} delay={Math.min((index % 3) + 1, 4)} className="h-full">
              <Box
                as={Link}
                href={item.cta?.href ?? "#contact"}
                title={`Click Here to View ${item.title}`}
                className={cn(
                  "group flex h-full flex-col rounded-[14px] border p-7 no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0 max-[600px]:p-6",
                  dark ? "border-navy bg-navy text-paper focus-visible:outline-lime" : "border-ink/12 bg-white text-ink",
                )}
              >
                <Box className="mb-5 flex items-center justify-between gap-3">
                  <Box
                    as="span"
                    className={cn(
                      "grid size-12 flex-none place-items-center rounded-xl",
                      dark ? "bg-navy-soft text-lime" : "bg-paper-warm text-navy",
                    )}
                  >
                    {Icon ? <Icon size={22} strokeWidth={1.7} aria-hidden="true" /> : null}
                  </Box>
                  <Text
                    as="span"
                    className={cn(
                      "text-right font-mono text-[11px] uppercase leading-[1.4] tracking-[0.12em]",
                      dark ? "text-paper/65" : "text-ink/60",
                    )}
                  >
                    {item.audience}
                  </Text>
                </Box>

                <Text as="h3" className={cn("mb-2.5 text-[20px] leading-[1.3] font-semibold tracking-[-0.01em]", dark ? "text-paper" : "text-ink")}>
                  {item.title}
                </Text>
                <Text as="p" className={cn("mb-5 text-[15px] leading-[1.6]", dark ? "text-paper/65" : "text-ink/60")}>
                  {item.description}
                </Text>

                {item.focus?.length ? (
                  <Box as="ul" className="m-0 mb-6 grid list-none gap-1.5 p-0">
                    {item.focus.map((point) => (
                      <Box
                        as="li"
                        key={point}
                        className={cn(
                          "relative pl-4 text-[13.5px] leading-[1.45] before:absolute before:top-[0.55em] before:left-0 before:size-1.5 before:rounded-full before:content-['']",
                          dark ? "text-paper before:bg-lime" : "text-ink before:bg-navy",
                        )}
                      >
                        {point}
                      </Box>
                    ))}
                  </Box>
                ) : null}

                {item.cta?.label ? (
                  <Text
                    as="span"
                    className={cn("mt-auto inline-flex items-center gap-2 text-[14px] font-semibold", dark ? "text-lime" : "text-navy")}
                  >
                    {item.cta.label}
                    <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Text>
                ) : null}
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
