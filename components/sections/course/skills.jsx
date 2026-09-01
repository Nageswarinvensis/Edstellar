import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
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
        <Text as="h2" className="mb-6.5 max-w-[20ch] tracking-[-0.03em]">
          {(typeof skills.heading === "string" ? skills.heading : "").split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, i) => {
            const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
            return match ? <em key={i} className="font-serif font-normal italic">{match[1]}</em> : fragment;
          })}
        </Text>
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
