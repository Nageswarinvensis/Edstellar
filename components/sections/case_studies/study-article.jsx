import { Fragment } from "react";
import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";

/** A paragraph's `text` may wrap a phrase in `<em>` — split it into nodes
 * rather than injecting HTML. */
function inline(text) {
  return text.split(/(<em>[\s\S]*?<\/em>)/g).map((fragment, index) => {
    const match = fragment.match(/^<em>([\s\S]*?)<\/em>$/);
    return match ? (
      <em key={index} className="text-ink italic">
        {match[1]}
      </em>
    ) : (
      <Fragment key={index}>{fragment}</Fragment>
    );
  });
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <Text
          as="h2"
          className="relative mt-11 mb-3.5 pt-1.5 text-navy before:mb-3.5 before:block before:h-0.75 before:w-9 before:bg-lime before:content-[''] first:mt-0"
        >
          {block.text}
        </Text>
      );
    case "p":
      return (
        <Text as="p" className="mb-4 text-[16.5px] leading-[1.8]">
          {inline(block.text)}
        </Text>
      );
    case "quote":
      return (
        <Box as="blockquote" className="my-6.5 rounded-[14px] border-l-4 border-lime bg-navy px-6.5 py-5.5">
          <Text as="p" className="font-serif text-[22px] leading-[1.4] text-paper italic">
            {block.text}
          </Text>
        </Box>
      );
    case "facts":
      return (
        <Box as="dl" className="mt-5 mb-1.5 overflow-hidden rounded-[14px] border border-ink/12 bg-white">
          {block.items.map((item) => (
            <Box
              key={item.label}
              className="grid grid-cols-1 items-baseline gap-0.5 border-b border-ink/12 px-4.5 py-3.25 last:border-b-0 odd:bg-paper sm:grid-cols-[200px_1fr] sm:gap-4"
            >
              {/* <dt>/<dd> must be direct children here, so they stay raw
                  elements — <Text> has no definition-list tags. */}
              <dt className="font-mono text-[10.5px] tracking-[0.12em] text-ink-muted uppercase">{item.label}</dt>
              <dd className="m-0 font-body text-[15px] leading-normal font-semibold text-ink">{item.value}</dd>
            </Box>
          ))}
        </Box>
      );
    default:
      return null;
  }
}

/** The case study body beside a sticky "managed training services" promo.
 * Design: case-study `.cs-layout`, `.cs-article`, `.cs-side`, `.cs-promo`. */
export default function StudyArticle({ title, body, promo }) {
  return (
    <Section aria-label={title} className="bg-paper">
      <Box className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-14">
        <Box as="article" className="max-w-190">
          {body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </Box>

        {promo?.heading ? (
          <Box as="aside" className="lg:sticky lg:top-24">
            <Box className="relative overflow-hidden rounded-[22px] bg-navy px-7 py-8 before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-lime before:content-['']">
              <RichHeading as="h2" heading={promo.heading} className="mb-3 text-[24px] leading-[1.2] text-paper" emphasisClassName="text-lime" />
              <Text as="p" className="mb-5.5 text-[15px] leading-[1.65] text-paper/75">
                {promo.description}
              </Text>
              <CtaButton arrow
                block
                className="bg-paper text-navy hover:bg-white"
                render={<Link href={promo.button.href} />}
              >
                {promo.button.label}
              </CtaButton>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Section>
  );
}
