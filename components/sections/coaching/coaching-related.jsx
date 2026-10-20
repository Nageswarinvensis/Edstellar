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
 * "More Edstellar coaching for every leadership stage" — a grid of cards,
 * one per coaching path, linking to sibling sub-pages.
 *
 * Server Component: no interactivity needed; every card is a plain link.
 */
export default function CoachingRelated({ data }) {
  if (!data?.items?.length) return null;

  const { section_id = "related", heading, description, items } = data;

  return (
    <Section id={section_id} className="bg-white">
      {/* Centered heading block */}
      <Box className="text-center mx-auto max-w-205">
        <Reveal>
          <RichHeading
            heading={heading}
            emphasisClassName="font-normal"
            className="text-center"
          />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted text-center mt-4 max-w-[68ch] mx-auto"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      {/* Card grid */}
      <Box className="mt-12 grid grid-cols-3 gap-5 max-[1200px]:grid-cols-2 max-[600px]:grid-cols-1">
        {items.map((item, index) => {
          const Icon = coachingIcon(item.icon);

          return (
            <Reveal key={item.href ?? item.title} delay={Math.min(index + 1, 4)}>
              <Box
                as={Link}
                href={item.href}
                className={cn(
                  "group flex h-full flex-col gap-3 rounded-[14px] border border-ink/12 bg-paper p-7 text-ink no-underline",
                  "transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift",
                )}
              >
                {/* Audience kicker */}
                {item.audience ? (
                  <Text as="span" className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                    {item.audience}
                  </Text>
                ) : null}

                {/* Icon tile */}
                {Icon ? (
                  <Box
                    as="span"
                    className="size-12 rounded-xl bg-lime-soft grid place-items-center text-navy"
                  >
                    <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                  </Box>
                ) : null}

                {/* Title */}
                <Text as="h3" className="font-display text-[20px] leading-[1.3] font-medium tracking-[-0.01em] text-ink">
                  {item.title}
                </Text>

                {/* Description */}
                {item.description ? (
                  <Text as="p" className="text-[14.5px] leading-[1.6] text-ink-muted m-0">
                    {item.description}
                  </Text>
                ) : null}

                {/* CTA label row */}
                {item.cta_label ? (
                  <Box
                    as="span"
                    className="mt-auto pt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-navy"
                  >
                    {item.cta_label}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Box>
                ) : null}
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
