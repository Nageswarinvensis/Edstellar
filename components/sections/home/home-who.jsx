import Box from "@/components/ui/Box";
import Reveal from "@/components/common/reveal";
import HomeWrap from "@/components/sections/home/home-wrap";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";

/**
 * "Capability development for every kind of organization." — a short intro
 * and one plain-text card per kind of organization Edstellar serves. Five across on
 * desktop, two on tablets, one on phones.
 *
 * Design: `edstellar-homepage-capability-development.html` → `#who`
 * (`h2.sh`, `.lead`, `.serve`).
 */
export default function HomeWho({ data }) {
  if (!data?.items?.length) return null;
  const { heading, lede, items } = data;

  return (
    <HomeWrap id="who" aria-labelledby="who-heading" className="scroll-mt-16 bg-paper-warm py-16 lg:py-16">
      {/* The design's own head here (`h2.sh` + `.lead`), not the split head:
          a smaller 38px title with the intro below it. */}
      <Reveal>
        <RichHeading
          as="h2"
          id="who-heading"
          heading={heading}
          className="m-0 max-w-[720px] text-[clamp(30px,3vw,38px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
        />
        {lede && (
          <Text as="p" className="mt-[18px] mb-0 max-w-[680px] text-base leading-[1.65] text-ink-muted">
            {lede}
          </Text>
        )}
      </Reveal>

      <Box as="ul" className="m-0 mt-[30px] grid list-none grid-cols-1 gap-3 p-0 min-[600px]:grid-cols-2 lg:grid-cols-5">
        {items.map((item, i) => (
          <Reveal
            key={item.label}
            as="li"
            delay={i % 5}
            className="flex h-full items-center rounded-xl border border-ink/12 bg-white p-4 font-display text-[15px] font-medium text-ink"
          >
            {item.label}
          </Reveal>
        ))}
      </Box>
    </HomeWrap>
  );
}
