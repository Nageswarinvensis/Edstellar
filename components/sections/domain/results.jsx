"use client";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
export default function Results({ data }) {
  if (!data) return null;

  return (
    <Section id="proof" className="bg-[#071426] text-paper">
      <Box>
        <Reveal delay={1}>
          <Box className="grid grid-cols-1 items-end gap-5 lg:grid-cols-2 lg:gap-16">
            <Box>
              <RichHeading
                as="h2"
                heading={data.heading}
                className="max-w-162.5 text-[30px] font-semibold leading-[0.98] tracking-[-1.8px] text-paper md:text-[36px]"
                emphasisClassName="font-serif font-normal tracking-[-1px] text-[#B8F500]"
              />
            </Box>

            <Box>
              <Text
                as="p"
                className="max-w-155 text-[16px] leading-[1.6] text-[#FAFAF7BF]"
              >
                {data.description}
              </Text>
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={2}>
          <Box className="mt-5 lg:mt-10 grid grid-cols-1 border-t border-[#344052] md:grid-cols-1 min-[769px]:grid-cols-3">
            {data.items?.map((item, index) => (
              <Box
                key={item.id || index}
                className={[
                  "flex flex-col lg:px-6 lg:pt-8 lg:pb-0 pt-5 pl-0 pb-0",
                  "min-[769px]:min-h-64 min-[769px]:px-8 min-[769px]:pt-9 min-[769px]:pb-7",
                  index === 0
                    ? "min-[769px]:pl-0"
                    : "min-[769px]:border-l min-[769px]:border-[#344052]",
                  index === data.items.length - 1 ? "min-[769px]:pr-0" : "",
                  "border-b-0",
                  index === data.items.length - 1
                    ? "min-[769px]:border-b-0"
                    : "",
                ].join(" ")}
              >
                <Text
                  as="p"
                  className="mb-4.5 font-serif text-[30px] font-bold leading-none tracking-[-1.5px] text-[#B8F500] italic lg:text-[42px]"
                >
                  {item.stat}
                </Text>

                <Text
                  as="p"
                  className="text-[14px] leading-[1.65] text-paper"
                >
                  {item.description}
                </Text>

                <Box className="mt-auto pt-6">
                  <Text
                    as="p"
                    className="font-mono text-[10px] font-semibold tracking-[0.14em] text-paper uppercase"
                  >
                    {item.person}
                  </Text>

                  <Text
                    as="p"
                    className="mt-2 font-mono text-[8px] tracking-[0.12em] text-[#8994A3] uppercase"
                  >
                    {item.meta}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
