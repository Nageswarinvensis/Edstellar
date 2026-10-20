import Link from "next/link";
import { Fragment } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import HomeWrap from "@/components/sections/home/home-wrap";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import HomeSectionHead from "@/components/sections/home/home-section-head";

/** Renders a step description that may carry inline links (an array of strings
 * and `{text, href}` objects). */
function Desc({ parts }) {
  return (
    <Text as="p" className="m-0 text-sm leading-[1.6] text-ink/65">
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <Link key={i} href={part.href} className="font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
            {part.text}
          </Link>
        ),
      )}
    </Text>
  );
}

/** The Edstellar 5A methodology — five bordered steps with outputs and timing. */
export default function HomeMethod({ data }) {
  if (!data?.steps?.length) return null;

  return (
    <HomeWrap id="method" aria-labelledby="method-heading" className="scroll-mt-16 bg-paper py-20 max-lg:py-16">
      <HomeSectionHead id="method-heading" heading={data.heading} lede={data.lede} />

      <Box role="list" aria-label="The Edstellar 5A methodology" className="grid grid-cols-5 border-y-[1.5px] border-ink/12 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {data.steps.map((step, i) => (
          <Reveal key={step.n} delay={i % 4} role="listitem" className="flex flex-col border-r border-ink/22 px-8 pb-11 pt-9 last:border-r-0 max-lg:border-b max-lg:[&:nth-child(2n)]:border-r-0 max-sm:border-r-0">
            <Box className="flex items-center gap-2.5">
              <Text as="span" className="font-mono text-[11px] text-ink/45">{step.n}</Text>
              <Text as="b" className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink">{step.name}</Text>
            </Box>
            <RichHeading as="h3" heading={step.title} className="mb-3 mt-4 font-serif text-[22px] font-normal leading-[1.15] text-ink" />
            <Desc parts={step.desc} />
            <Text as="p" className="mt-5 flex items-baseline gap-2 text-sm text-ink">
              <Text as="span" className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/45">Output</Text>
              <Text as="span" className="font-medium text-ink">{step.output}</Text>
            </Text>
            <Box className="mt-auto flex items-center justify-between gap-2 pt-6">
              <Text as="span" className="rounded-full bg-ink/[0.06] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/65">
                {step.tag}
              </Text>
              {step.mark && (
                <Text as="span" className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/65">
                  <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
                  {step.mark}
                </Text>
              )}
            </Box>
          </Reveal>
        ))}
      </Box>
    </HomeWrap>
  );
}
