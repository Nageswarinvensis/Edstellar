import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/*
 * Related consulting services. The TNA design's cards differ from the
 * domain page's `RelatedCategories` (body-size copy, not mono kickers).
 *
 * Each card is a column that spaces its content between top and bottom:
 * title and description at the top, the "Explore" link on its own at the
 * bottom. Grid rows stretch every card to the tallest one, so the links
 * line up across a row even when the descriptions differ in length.
 */
export default function TnaRelated({ data, id = "related" }) {
  if (!data?.items?.length) return null;

  return (
    <Section id={id} className="border-t border-ink/12 bg-paper">
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          <RichHeading heading={data.heading} />
        </Reveal>
      </Box>

      <Reveal delay={1}>
        <Box className="grid grid-cols-3 gap-5 max-[901px]:grid-cols-2 max-[601px]:grid-cols-1">
          {data.items.map((item) => (
            <Box
              key={item.title}
              className="
                flex h-full flex-col justify-between gap-3.5 rounded-[14px] border border-ink/12 bg-white p-[26px]
                transition-[translate,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-lift
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
                <Text as="p" className="text-[15px] leading-[1.7] text-ink/60">
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
    </Section>
  );
}
