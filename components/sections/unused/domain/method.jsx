import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

export default function Method({ data }) {
  return (
    <Section className="bg-[#fafaf8] px-5 py-16 md:px-8 lg:px-10 lg:py-24">
      {/* LIFECYCLE */}
      <Box>
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            heading={data.lifecycle.heading}
            className="max-w-[20ch] tracking-[-0.03em]"
            emphasisClassName="font-normal italic text-olive"
          />
        </Reveal>

        <Text
          as="p"
          className="mt-6 max-w-187.5 text-[15px] leading-6 text-[#617086] sm:text-[16px] sm:leading-7"
        >
          {data.lifecycle.description}
        </Text>

        {/* STAGES */}
        <Box className="mt-11 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {data.lifecycle.stages.map((stage, index) => (
            <Box
              key={stage.number}
              className="group relative flex min-w-0 flex-col"
            >
              {/* NUMBER + CONNECTOR */}
              <Box className="relative flex h-8.75 items-center">
                <Text
                  as="span"
                  className="relative z-10 flex h-8.75 w-8.75 shrink-0 items-center justify-center rounded-full bg-[#07162c] font-mono text-[10px] text-[#b9f21d] transition-colors duration-200 group-hover:bg-[#b9f21d] group-hover:text-[#07162c]"
                >
                  {stage.number}
                </Text>

                {index < data.lifecycle.stages.length - 1 && (
                  <Box className="absolute left-[35px] right-[-5px] top-1/2 hidden h-px -translate-y-1/2 bg-[#cbd0d5] lg:block">
                    <Box className="absolute right-0 top-1/2 h-[6px] w-[6px] -translate-y-1/2 rotate-[-45deg] border-b border-r border-[#b8bdc2]" />
                  </Box>
                )}

                {index < data.lifecycle.stages.length - 1 && (
                  <Box className="absolute left-[17px] top-[35px] h-[40px] w-px bg-[#cbd0d5] lg:hidden" />
                )}
              </Box>

              <Text
                as="h3"
                className="mt-5 text-[18px] font-bold leading-[1.2] text-[#07162c] sm:text-[19px]"
              >
                {stage.title}
              </Text>

              <Text
                as="p"
                className="mt-3 text-[13px] leading-[1.6] text-[#617086] sm:text-[14px] lg:h-[112px]"
              >
                {stage.description}
              </Text>

              <Box className="mt-4 border-t border-[#d8dadd] pt-4">
                <Text
                  as="p"
                  className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#617086]"
                >
                  {stage.timing}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>

        {/* FOOTER */}
        <Box className="mt-6 border-t border-[#d8dadd]"></Box>

        <Text
          as="p"
          className="mt-6 mb-9 font-mono text-[10px] uppercase tracking-[1.5px] text-[#617086]"
        >
          ↻ &nbsp;{data.lifecycle.footer}
        </Text>
      </Box>

      <Box className="mt-11 mb-7 border-t border-[#d8dadd]"></Box>

      {/* SERVICES */}
      <Box className="mt-8">
        <Text
          as="p"
          className="mb-4 font-mono text-[10px] uppercase tracking-[2px] text-[#0a162899]"
        >
          {data.services.eyebrow}
        </Text>

        <Box className="grid overflow-hidden rounded-[16px] border border-[#0a16281f] bg-white md:grid-cols-2 lg:grid-cols-3">
          {data.services.items.map((item) => (
            <Box
              key={item.title}
              className="group min-h-[90px] border-b border-[#d9dde1] p-5 transition-all duration-300 hover:bg-[#F2F0E8] md:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <Box className="flex items-start justify-between gap-5">
                <Text as="h3" className="text-[14px] text-[#0A1628]">
                  {item.title}
                </Text>

                <Text
                  as="span"
                  className="text-[13px] text-[#7a838c] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </Text>
              </Box>

              <Text
                as="p"
                className="mt-2 max-w-[350px] text-[12px] leading-[1.5] text-[#687586]"
              >
                {item.description}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
