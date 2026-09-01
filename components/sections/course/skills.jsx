import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import SkillCards from "@/components/sections/course/skill-cards";

/**
 * Course skills grid — seven flippable cards, one per capability area.
 *
 * Design: `section#skills.block.section`, `.skill-grid`.
 */
export default function Skills({ skills }) {
  if (!skills?.items?.length) return null;

  return (
    <Section
      id="skills"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10"
    >
      <Reveal delay={1}>
        <RichHeading heading={skills.heading} className="mb-6.5 max-w-[20ch] tracking-[-0.03em]" />
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-15 max-w-[64ch] text-[16.5px] leading-[1.7] text-ink/60"
        >
          {skills.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <SkillCards items={skills.items} />
      </Reveal>
    </Section>
  );
}
