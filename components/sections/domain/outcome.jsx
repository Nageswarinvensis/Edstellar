import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
export default function Outcomes({ data }) {
  if (!data) return null;

  return (
    <Section id="outcomes" className="bg-paper">
      <Box>
        <Reveal delay={1}>
          <Box className="mb-10">
            <Box>
              <RichHeading
                as="h2"
                heading={data.heading}
                className="max-w-155 mb-10 font-semibold tracking-[-1.8px] text-ink"
                emphasisClassName="font-serif font-normal tracking-[-1px]"
              />

              <Text
                as="p"
                className="max-w-155 text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-ink-muted"
              >
                {data.description}
              </Text>
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={2}>
          <Box className="grid grid-cols-1 border-l border-t border-[#D9DDE1] sm:grid-cols-2 lg:grid-cols-4">
            {data.items?.map((item, index) => (
              <Box
                key={item.id || index}
                className={[
                  "min-h-45 border-r border-b border-[#D9DDE1] p-5",
                  "lg:p-6",
                  "lg:min-h-45 lg:p-6",
                ].join(" ")}
              >
                <Text
                  as="span"
                  className="block font-mono text-[10px] tracking-[0.18em] text-ink-muted"
                >
                  {item.number}
                </Text>

                <Text
                  as="h3"
                  className="mt-3.5 text-[16px] font-semibold leading-[1.15] tracking-[-0.45px] text-ink"
                >
                  {item.title}
                </Text>

                <Text
                  as="p"
                  className="mt-2.5 max-w-67.5 text-[14px] leading-[1.6] text-ink-muted"
                >
                  {item.description}
                </Text>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
