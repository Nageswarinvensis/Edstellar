import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

export default function WwsFaq({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section
      id="faq"
      aria-labelledby="faq-h"
      className="scroll-mt-20 bg-paper"
    >
      {/* Centered heading */}
      <Reveal>
        <Box className="mb-10 text-center">
          <RichHeading
            as="h2"
            id="faq-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
          />
        </Box>
      </Reveal>

      {/* FAQ list */}
      <Reveal delay={1}>
        <Box className="mx-auto max-w-[880px] border-t border-ink/[0.12]">
          {data.items.map((item, i) => (
            <Box
              key={i}
              as="details"
              className="group border-b border-ink/[0.12]"
              open={i === 0 ? true : undefined}
            >
              <Box
                as="summary"
                className="flex cursor-pointer select-none list-none items-center justify-between gap-6 py-6 text-[18px] font-semibold leading-[1.4] tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-navy focus-visible:outline-offset-[3px] focus-visible:rounded-md max-[600px]:py-5 max-[600px]:text-[16px]"
              >
                {item.q}

                {/* +/− pill indicator */}
                <Box
                  as="span"
                  aria-hidden="true"
                  className="relative size-8 shrink-0 rounded-full border border-ink/[0.22] text-ink transition-[background,border-color,color] duration-200 group-open:border-ink group-open:bg-ink group-open:text-lime"
                >
                  {/* Horizontal bar (always visible) */}
                  <Box
                    as="span"
                    className="absolute left-1/2 top-1/2 h-[1.7px] w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-current"
                  />
                  {/* Vertical bar (rotates to 0° when open, overlapping horizontal = minus sign) */}
                  <Box
                    as="span"
                    className="absolute left-1/2 top-1/2 h-[1.7px] w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-current rotate-90 transition-transform duration-200 group-open:rotate-0"
                  />
                </Box>
              </Box>

              {/* Answer */}
              <Box className="pb-6 pr-14 text-[16px] leading-[1.7] text-ink-muted max-[600px]:pr-0">
                {item.link ? (
                  <Text as="p" className="m-0">
                    {item.a.split(item.link.text)[0]}
                    <Link
                      href={item.link.href}
                      className="font-semibold text-navy underline-offset-[3px] hover:underline"
                    >
                      {item.link.text}
                    </Link>
                    {item.a.split(item.link.text)[1] ?? ""}
                  </Text>
                ) : (
                  <Text as="p" className="m-0">{item.a}</Text>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
