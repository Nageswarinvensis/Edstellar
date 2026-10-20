import Link from "next/link";
import { Check, Lock } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { coachingIcon } from "@/components/sections/coaching/icons";
import { cn } from "@/lib/utils";

/**
 * What the organization sees vs. what stays between leader and coach — two
 * columns (the `private` one navy) with a lock between them, a note and a
 * link.
 *
 * Design: coaching-hub `#confidential`, `.conf`, `.conf-col`, `.conf-mid`.
 */
export default function CoachingConfidential({ data }) {
  if (!data?.columns?.length) return null;

  const { section_id, heading, description, columns, note, link } = data;

  return (
    <Section id={section_id} className="bg-paper-warm">
      <Box className="mx-auto mb-12 max-w-205 text-center max-[600px]:mb-8">
        <Reveal>
          <RichHeading heading={heading} className="mx-auto" emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text as="p" className="mx-auto mt-4 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-[1fr_64px_1fr] items-stretch max-[900px]:grid-cols-1 max-[900px]:gap-4">
        {columns.map((column, index) => {
          const Icon = coachingIcon(column.icon);
          const dark = column.private;
          return (
            <Box key={column.title} className="contents">
              {index === 1 ? (
                <Box aria-hidden="true" className="flex items-center justify-center max-[900px]:hidden">
                  <span className="grid size-11 place-items-center rounded-full border border-ink/22 bg-paper-warm text-navy">
                    <Lock size={18} aria-hidden="true" />
                  </span>
                </Box>
              ) : null}
              <Reveal
                delay={index + 1}
                className={cn(
                  "rounded-[14px] border p-8 max-[600px]:p-6",
                  dark ? "border-navy bg-navy text-paper" : "border-ink/12 bg-white text-ink",
                )}
              >
                <Text as="h3" className={cn("mb-2 flex items-center gap-3 text-[20px] leading-[1.3] font-medium", dark ? "text-paper" : "text-ink")}>
                  {Icon ? <Icon size={22} strokeWidth={1.7} className={dark ? "text-lime" : "text-navy"} aria-hidden="true" /> : null}
                  {column.title}
                </Text>
                {column.subtitle ? (
                  <Text as="p" className={cn("mb-6 text-[14px] leading-[1.6]", dark ? "text-paper/65" : "text-ink-muted")}>
                    {column.subtitle}
                  </Text>
                ) : null}
                <Box as="ul" className="m-0 grid list-none gap-3.5 p-0">
                  {column.items.map((item) => (
                    <Box as="li" key={item} className="flex gap-3 text-[15px] leading-normal">
                      <Check size={20} strokeWidth={1.8} className={cn("mt-0.5 flex-none", dark ? "text-lime" : "text-navy")} aria-hidden="true" />
                      {item}
                    </Box>
                  ))}
                </Box>
              </Reveal>
            </Box>
          );
        })}
      </Box>

      {note ? (
        <Text as="p" className="mt-6 text-center text-[14px] text-ink-muted">
          {note}
        </Text>
      ) : null}
      {link?.href ? (
        <Text as="p" className="mt-2 text-center">
          <Link href={link.href} className="text-[16px] font-semibold text-navy underline-offset-3 hover:underline">
            {link.label} <span aria-hidden="true">&rarr;</span>
          </Link>
        </Text>
      ) : null}
    </Section>
  );
}
