import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

export default function RelatedCategories({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section>
      <Box className="mx-auto">
        {/* HEADING */}
        <Reveal>
          <RichHeading
            as="h2"
            parts={data.heading.parts}
            emphasisClassName="font-serif italic font-normal"
            className="max-w-[22ch] tracking-[-0.03em]"
          />
        </Reveal>

        {/* DESCRIPTION */}
        <Reveal delay={1}>
          <Text
            as="p"
            className="mt-5 max-w-[65ch] text-[15px] leading-[1.7] text-ink/60"
          >
            {data.description}
          </Text>
        </Reveal>

        {/* CATEGORY CARDS */}
        <Reveal delay={2}>
          <Box className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item) => (
              <Box
                key={item.title}
                className="group flex min-h-[152px] flex-col rounded-[14px] border border-ink/15 bg-white px-5 py-5 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_16px_30px_-18px_rgba(10,22,40,0.35)]"
              >
                <Text
                  as="h3"
                  className="font-display text-[15px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink"
                >
                  {item.title}
                </Text>

                <Text
                  as="p"
                  className="mt-3 font-mono text-[9px] uppercase leading-[1.55] tracking-[0.12em] text-ink/60"
                >
                  {item.description}
                </Text>

                <Text
                  as="p"
                  className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/60"
                >
                  {item.type}
                </Text>

                <a
                  href={item.href}
                  className="mt-2 w-fit font-mono text-[9px] uppercase tracking-[0.12em] text-navy transition-colors duration-200 hover:text-ink"
                >
                  {item.link} →
                </a>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
