import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/** One center column (assessment or development), optionally on a dark fill. */
function CenterColumn({ column }) {
  const dark = column.dark;

  return (
    <Box className={cn("min-w-0 p-10 max-[600px]:p-6", dark ? "bg-navy" : "bg-paper-warm")}>
      <Text
        as="span"
        className={cn("font-mono text-[10px] uppercase tracking-[0.12em]", dark ? "text-lime" : "text-ink-muted")}
      >
        {column.kicker}
      </Text>
      <Text
        as="h3"
        className={cn("mt-2 mb-1 font-display text-[26px] font-medium tracking-[-0.02em]", dark ? "text-paper" : "text-ink")}
      >
        {column.title}
      </Text>
      <Text
        as="p"
        className={cn("mb-6 font-serif text-[21px] italic leading-[1.3]", dark ? "text-paper" : "text-ink")}
      >
        {column.question}
      </Text>

      <Box as="dl" className="m-0 grid grid-cols-2 gap-5 max-[600px]:grid-cols-1">
        {column.meta.map((row) => (
          <Box
            key={row.label}
            className={cn("border-t pt-4", dark ? "border-paper/16" : "border-ink/12")}
          >
            <Box
              as="dt"
              className={cn("font-mono text-[10px] uppercase tracking-[0.12em]", dark ? "text-paper/60" : "text-ink-muted")}
            >
              {row.label}
            </Box>
            <Box as="dd" className={cn("mt-1 text-[15px] leading-[1.5]", dark ? "text-paper" : "text-ink")}>
              {row.value}
            </Box>
          </Box>
        ))}
      </Box>

      {column.examples?.length ? (
        <Box className={cn("mt-6 border-t pt-5", dark ? "border-paper/16" : "border-ink/12")}>
          <Text
            as="span"
            className={cn("mb-3 block font-mono text-[10px] uppercase tracking-[0.12em]", dark ? "text-paper/60" : "text-ink-muted")}
          >
            {column.examples_label}
          </Text>
          <Box as="ul" className="grid list-none gap-2.5 p-0">
            {column.examples.map((example) => (
              <Box
                as="li"
                key={example}
                className={cn(
                  "relative pl-5.5 text-[14.5px] leading-[1.45] before:absolute before:left-0 before:top-[7px] before:h-1.5 before:w-2.5 before:-rotate-45 before:border-b-2 before:border-l-2",
                  dark ? "text-paper before:border-lime" : "text-ink before:border-navy",
                )}
              >
                {example}
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}

      {column.exercises?.length ? (
        <Box className={cn("mt-5.5 border-t pt-5", dark ? "border-paper/16" : "border-ink/12")}>
          <Text
            as="span"
            className={cn("mb-3 block font-mono text-[10px] uppercase tracking-[0.12em]", dark ? "text-paper/60" : "text-ink-muted")}
          >
            {column.exercises_label}
          </Text>
          <Box as="ul" className="flex list-none flex-wrap gap-2 p-0">
            {column.exercises.map((exercise) => (
              <Box
                as="li"
                key={exercise}
                className={cn(
                  "rounded-full border px-3 py-1.75 text-[13px] font-semibold leading-[1.3]",
                  dark
                    ? "border-paper/18 bg-paper/8 text-paper"
                    : "border-ink/12 bg-white text-ink",
                )}
              >
                {exercise}
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

/**
 * Assessment vs development center comparison — two columns (one dark) that
 * contrast purpose, outputs, examples and exercises, with a link to the
 * dedicated centers sub-page.
 *
 * Design: `#centers`, `.acdc`, `.acdc-col`, `.acx-foot`.
 */
export default function Centers({ data }) {
  if (!data?.columns?.length) return null;

  const { section_id, heading, lede, columns, cta } = data;

  return (
    <Section id={section_id} className="bg-paper">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {lede ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[72ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
              {lede}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal>
        <Box className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/12 max-[900px]:grid-cols-1">
          {columns.map((column) => (
            <CenterColumn key={column.title} column={column} />
          ))}
        </Box>
      </Reveal>

      {cta?.href ? (
        <Box className="mt-10">
          <CtaButton variant="ghost" arrow render={<Link href={cta.href} />}>
            {cta.label}
          </CtaButton>
        </Box>
      ) : null}
    </Section>
  );
}
