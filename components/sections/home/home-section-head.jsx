import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

/** The shared heading block for the home content sections — a large display
 * title beside a rule-bordered lede. Used only by the home sections. */
export default function HomeSectionHead({ id, heading, lede, tone = "light" }) {
  const dark = tone === "dark";
  return (
    <Box className="mb-[72px] grid items-end gap-x-[60px] gap-y-5 max-lg:mb-12 lg:grid-cols-[1fr_1.4fr]">
      <Reveal>
        <RichHeading
          as="h2"
          id={id}
          heading={heading}
          className={`m-0 text-[clamp(36px,4.6vw,60px)] font-medium leading-[1.04] tracking-[-0.02em] text-balance ${dark ? "text-paper [&_span]:text-lime" : "text-ink"}`}
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
