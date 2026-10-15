import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

/** Terms and conditions — bulleted list with optional bold lead-ins.
 * Design: become-a-guest-author `.tc-list`. */
export default function Terms({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section aria-labelledby="tc-h" className="bg-paper lg:py-30" innerClassName="max-w-230">
      <Reveal>
        <Text
          as="h2"
          id="tc-h"
          className="mb-8"
        >
          {data.heading}
        </Text>
      </Reveal>
      <Reveal as="ul" delay={1} className="grid max-w-[72ch] list-none gap-4 p-0">
        {data.items.map((item) => (
          <Box as="li" key={item.text} className="relative pl-7 leading-[1.65] text-ink">
            <Box
              aria-hidden="true"
              className="absolute top-2.75 left-1.5 size-1.75 rounded-[2px] bg-lime ring-1 ring-navy"
            />
            {item.lead ? <strong>{item.lead} </strong> : null}
            {item.text}
          </Box>
        ))}
      </Reveal>
      {data.footnote ? (
        <Text as="p" className="mt-8 max-w-[72ch]">
          {data.footnote}
        </Text>
      ) : null}
    </Section>
  );
}
