import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
export default function Delivered({ data }) {
  if (!data) return null;

  return (
    <Section className="bg-paper">
      <Box>
        <Reveal delay={1}>
          <Box className="max-w-175">
            <Text
              as="h2"
              className="max-w-150 text-[30px] font-semibold leading-[1.02] tracking-[-1.8px] text-[#07182C] lg:text-[36px]"
            >
              {data.heading.before}{" "}
              <em className="font-serif font-normal tracking-[-1px]">
                {data.heading.emphasis}
              </em>
              {data.heading.after}
            </Text>

            <Text
              as="p"
              className="mt-5 lg:mt-7 max-w-170 text-[16px] leading-[1.65] text-[#66717F]"
            >
              {data.description}
            </Text>
          </Box>
        </Reveal>

        <Reveal delay={2}>
          <Box className="mt-7 lg:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {data.stages?.map((stage, index) => (
              <Box
                key={stage.id || index}
                className="relative flex lg:min-h-78 min-h-auto flex-col rounded-[14px] border border-[#D9DDE1] bg-white p-5 shadow-[0_18px_35px_rgba(7,24,44,0.06)]"
              >
                <Box className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#071426]">
                  <Text
                    as="span"
                    className="font-mono text-[10px] font-medium tracking-[0.5px] text-[#B8F500]"
                  >
                    {stage.number}
                  </Text>
                </Box>

                <Text
                  as="h3"
                  className="mt-4 text-[18px] font-semibold leading-[1.1] tracking-[-0.6px] text-[#07182C]"
                >
                  {stage.title}
                </Text>

                <Text
                  as="p"
                  className="mt-3 text-[14px] leading-[1.52] text-[#66717F]"
                >
                  {stage.description}
                </Text>

                <Box className="mt-auto pt-5">
                  <Box className="border-t border-[#D9DDE1] pt-4">
                    <Text
                      as="p"
                      className="font-mono text-[9px] font-normal tracking-[0.13em] text-[#66717F] uppercase"
                    >
                      {stage.meta}
                    </Text>
                  </Box>
                </Box>

                {index < data.stages.length - 1 ? (
                  <Text
                    as="span"
                    className="pointer-events-none absolute -right-5 top-9 z-10 hidden text-[14px] font-normal text-[#C5CBD1] lg:block"
                  >
                    →
                  </Text>
                ) : null}
              </Box>
            ))}
          </Box>
        </Reveal>

        {data.note ? (
          <Reveal delay={3}>
            <Box className="mt-10 flex items-center gap-3">
              <Text
                as="span"
                className="text-[13px] font-medium text-[#07182C]"
              >
                ↻
              </Text>

              <Text
                as="p"
                className="font-mono text-[9px] tracking-[0.13em] text-[#66717F] uppercase"
              >
                {data.note}
              </Text>
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}
