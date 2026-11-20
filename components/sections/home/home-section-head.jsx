import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

/** The shared heading block for the home content sections — the design's
 * `.split-head`: a large title in the wider column (1.1fr : 0.9fr) beside a
 * rule-bordered lede, bottom-aligned, 60px apart. Used only by the home
 * sections. */
export default function HomeSectionHead({ id, heading, lede, tone = "light" }) {
  const dark = tone === "dark";
  return (
    <Box className="mb-10 grid items-end gap-x-[60px] gap-y-5 lg:grid-cols-[1.1fr_0.9fr]">
      <Reveal>
        <RichHeading
          as="h2"
          id={id}
          heading={heading}
          className={`m-0 max-w-[900px] text-[clamp(36px,4.6vw,54px)] font-medium leading-[1.04] tracking-[-0.03em] text-balance ${dark ? "text-paper [&_span]:text-lime" : "text-ink"}`}
        />
      </Reveal>
      {lede && (
        <Reveal delay={1}>
          <Text
            as="p"
            className={`m-0 max-w-[520px] border-l-2 pl-5 text-base leading-[1.65] ${dark ? "border-paper/22 text-paper/70" : "border-ink/22 text-ink/65"}`}
          >
            {lede}
          </Text>
        </Reveal>
      )}
    </Box>
  );
}
