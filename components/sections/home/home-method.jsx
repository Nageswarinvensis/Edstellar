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
    <Text as="p" className="mt-0 mb-3.5 text-[13.5px] leading-[1.55] text-ink-muted">
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <Link key={i} href={part.href} title={`Click here to explore ${part.text}`} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
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
    <HomeWrap id="method" aria-labelledby="method-heading" className="scroll-mt-16 border-y border-ink/12 bg-white py-20 max-lg:py-16">
      <HomeSectionHead id="method-heading" heading={data.heading} lede={data.lede} />

      {/* The design's `.steps5`: five columns between top and bottom rules,
          divided by thin lines; each step reads label → title → description →
          output → duration → tools, top to bottom. */}
      <Box
        role="list"
        aria-label="The Edstellar 5A methodology"
        className="mt-11 grid grid-cols-5 border-y border-ink/12 max-lg:grid-cols-2 max-sm:grid-cols-1"
      >
        {data.steps.map((step, i) => (
          <Reveal
            key={step.n}
            delay={i % 4}
            role="listitem"
            className="flex flex-col border-l border-ink/12 px-[22px] py-[26px] first:border-l-0 max-lg:border-b max-lg:[&:nth-child(2n+1)]:border-l-0 max-sm:border-l-0 max-sm:px-0 max-sm:last:border-b-0"
          >
            <Text as="span" className="font-mono text-[10px] leading-[1.4] uppercase tracking-[0.07em] text-ink-muted">
              {step.n} · {step.name}
            </Text>
            <RichHeading
              as="h3"
              heading={step.title}
              className="mt-3.5 mb-2.5 font-display text-[21px] font-normal leading-[1.25] tracking-[-0.02em] text-ink [&_em]:text-[1.08em] [&_span]:text-[1.08em]"
            />
            <Desc parts={step.desc} />
            <Text as="p" className="m-0 text-[13px] leading-[1.5] text-ink">
              <Text as="span" className="mr-2 font-mono text-[9px] uppercase tracking-[0.07em] text-ink-muted">Output</Text>
              {step.output}
            </Text>
            {step.tag && (
              <Box className="mt-3 flex flex-wrap items-center gap-2">
                <Text
                  as="span"
                  className="rounded-md bg-paper-warm px-[9px] py-1.5 font-mono text-[10px] leading-none font-medium uppercase tracking-[0.07em] whitespace-nowrap text-ink"
                >
                  {step.tag}
                </Text>
              </Box>
            )}
            {step.uses && (
              <Text as="p" className="mt-3 mb-0 border-t border-dashed border-ink/22 pt-2.5 text-[12px] leading-[1.5] text-ink-muted">
                <Text as="span" className="text-[12px] font-medium text-ink">Uses:</Text> {step.uses}
              </Text>
            )}
          </Reveal>
        ))}
      </Box>

      {data.note && (
        <Text as="p" className="mx-auto mt-3.5 mb-0 max-w-[760px] text-center font-mono text-[11px] leading-[1.6] tracking-[0.02em] text-ink-muted">
          {data.note}
        </Text>
      )}
    </HomeWrap>
  );
}
