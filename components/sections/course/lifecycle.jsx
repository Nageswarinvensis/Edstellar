import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";
import LifecycleStages from "@/components/sections/course/lifecycle-stages";

/**
 * Vendor course monitoring lifecycle — dark, interactive: pick a stage on
 * the left, its detail renders on the right. The section's eyebrow/roman
 * mark above the heading is intentionally omitted here.
 *
 * Design: `section#lifecycle.block.section.dark.arcs`, `.life-wrap`
 * (the decorative `.arcs` radial-gradient background is not reproduced —
 * it uses off-palette colors and adds no information).
 */
export default function Lifecycle({ lifecycle }) {
  if (!lifecycle?.stages?.length) return null;

  return (
    <Section id="lifecycle" className="border-t border-paper/10 bg-navy">
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={lifecycle.heading.parts}
          className="mb-6.5 max-w-[20ch] text-paper tracking-[-0.03em]"
        />
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-15 max-w-[64ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-paper/78"
        >
          {lifecycle.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <LifecycleStages stages={lifecycle.stages} />
      </Reveal>
    </Section>
  );
}
