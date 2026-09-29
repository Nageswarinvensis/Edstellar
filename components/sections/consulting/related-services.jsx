"use client";

import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

export default function RelatedServices({ id, bgColor, data }) {
  if (!data?.items?.length) return null;

  // Section ID and background: the page's props first, then local-content
  // fields (`sectionId`, `bgColor`), then the defaults.
  const sectionId = id || data?.sectionId || data?.id || "services";
  const sectionBg = bgColor || data.bgColor || "bg-paper";

  // `Description` is the site-pages CMS field; `subheading` the local-content one.
  const subheading = data.Description || data.subheading;

  return (
    <Section id={sectionId} className={`border-t border-ink/12 ${sectionBg}`}>
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          {data.heading && (
            <Box className="[&_span]:italic [&_span]:font-serif [&_span]:font-normal">
              <RichHeading heading={data.heading} />
            </Box>
          )}

          {data.showSubheading !== false && subheading && (
            <Text
              as="p"
              className="mt-4 text-[16px] leading-[1.7] text-ink/60"
              dangerouslySetInnerHTML={{ __html: subheading }}
            />
          )}
        </Reveal>
      </Box>

      <Reveal delay={0.1}>
        <Box className="grid grid-cols-3 gap-5 max-[901px]:grid-cols-2 max-[601px]:grid-cols-1">
          {data.items.map((item) => (
            <Box
              key={item.title}
              className="
                flex h-full flex-col justify-between gap-3.5 rounded-[14px] border border-ink/12 bg-white p-5 lg:p-6.5
                transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift
                motion-reduce:hover:translate-y-0
              "
            >
              <Box>
                <Text
                  as="h3"
                  className="mb-2 text-[18px] leading-[1.3] tracking-[-0.01em]"
                >
                  {item.title}
                </Text>
                <Text as="p" className="text-[16px] leading-[1.7] text-ink/60">
                  {item.description}
                </Text>
              </Box>

              {item.link && item.href ? (
                <Link
                  href={item.href}
                  className="
                    w-fit font-body text-[14px] leading-[1.7] font-semibold text-navy
                    underline-offset-4 hover:underline
                    focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy
                  "
                >
                  {item.link}
                </Link>
              ) : null}
            </Box>
          ))}
        </Box>
      </Reveal>

      {/* Optional link to the full services hub — only when content sets it. */}
      {data.hub_link?.href ? (
        <Text as="p" className="mt-7 text-center">
          <Link
            href={data.hub_link.href}
            className="border-b-2 border-lime pb-0.5 font-display text-[14px] leading-normal font-bold text-ink focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            {data.hub_link.label}
          </Link>
        </Text>
      ) : null}
    </Section>
  );
}
