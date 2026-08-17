import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";

export default function Card({ data }) {
  if (!data) return null;

  return (
    <Section id="capability" className="bg-white">
      <Box>
        <Reveal>
          <RichHeading
            as="h2"
            parts={data.heading.parts}
            emphasisClassName="font-serif italic font-normal"
            className="mb-6.5 max-w-[20ch]"
          />
        </Reveal>

        <Reveal delay={1}>
          <Text
            as="p"
            className="mt-5 max-w-[650px] text-[15px] leading-[1.7] text-[#64748B]"
          >
            {data.description}
          </Text>
        </Reveal>

        <Reveal delay={2}>
          <Box className="mt-10 overflow-hidden rounded-[14px] border border-[#D9DDE3]">
            <Box className="grid grid-cols-1 md:grid-cols-2">
              <Box className="border-b border-[#D9DDE3] bg-[#F5F3ED] px-5 py-3 md:border-r">
                <Text className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#64748B]">
                  {data.beforeLabel}
                </Text>
              </Box>

              <Box className="border-b border-[#D9DDE3] bg-[#F5F3ED] px-5 py-3">
                <Text className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#07162C]">
                  {data.afterLabel}
                </Text>
              </Box>

              {data.rows.map((row, index) => (
                <Box
                  key={index}
                  className="contents"
                >
                  <Box className="border-b border-[#D9DDE3] px-5 py-[18px] md:border-r">
                    <Text className="text-[13px] leading-[1.7] text-[#64748B]">
                      {row.before}
                    </Text>
                  </Box>

                  <Box className="border-b border-[#D9DDE3] px-5 py-[18px]">
                    <Box className="flex gap-2.5">
                      <Box className="mt-[7px] h-[7px] w-[7px] flex-none rounded-full bg-lime" />

                      <Text className="text-[13px] leading-[1.7] text-ink">
                        {row.after}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={3}>
          <Text className="mt-5 max-w-[650px] text-[12px] leading-[1.7] text-[#64748B]">
            {data.note}
          </Text>
        </Reveal>
      </Box>
    </Section>
  );
}