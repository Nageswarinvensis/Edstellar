import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import IconTile from "@/components/sections/company/icon";

/** "Who can contribute" role tiles, a note, then the focused-area topics.
 * Design: become-a-guest-author `.role-grid`, `.role-tile`, `.topic-grid`. */
export default function Contributors({ data }) {
  if (!data?.roles?.length) return null;

  return (
    <Section aria-labelledby="who-h" className="bg-paper-warm lg:py-30">
      <Reveal className="max-w-[62ch]">
        <Text
          as="h2"
          id="who-h"
          className="mb-4"
        >
          {data.heading}
        </Text>
        <Text as="p" className="text-ink">
          {data.description}
        </Text>
      </Reveal>

      <Box className="mt-8 mb-6 grid grid-cols-1 gap-4 min-[481px]:grid-cols-2 md:grid-cols-5">
        {data.roles.map((role, index) => (
          <Reveal key={role.label} delay={Math.min(index + 1, 4)}>
            <Box className="h-full rounded-[14px] border border-ink/12 bg-white px-4.5 py-6 text-center shadow-[0_1px_2px_rgba(10,22,40,0.06)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.75 hover:shadow-[0_6px_24px_rgba(10,22,40,0.08)]">
              <IconTile name={role.icon} className="mx-auto mb-3.5" />
              <Text as="h3" className="text-[14.5px] leading-[1.3] font-semibold tracking-normal">
                {role.label}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>

      {data.note ? (
        <Text as="p" className="mb-16 max-w-[72ch] text-[15.5px] leading-[1.65]">
          {data.note}
        </Text>
      ) : null}

      {data.topics?.length ? (
        <>
          <Reveal className="max-w-[62ch]">
            <Text
              as="h2"
              className="mb-4"
            >
              {data.topics_heading}
            </Text>
            {data.topics_description ? (
              <Text as="p" className="text-[15.5px] leading-[1.65]">
                {data.topics_description}
              </Text>
            ) : null}
          </Reveal>
          <Reveal as="ul" delay={1} className="mt-8 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5 p-0">
            {data.topics.map((topic) => (
              <Box
                as="li"
                key={topic}
                className="rounded-[10px] border border-l-3 border-ink/12 border-l-lime bg-white px-4 py-3 text-[14px] font-medium text-ink"
              >
                {topic}
              </Box>
            ))}
          </Reveal>
        </>
      ) : null}
    </Section>
  );
}
