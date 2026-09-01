import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SecCta from "@/components/common/sec-cta";
import SkillProgression from "@/components/sections/course/skill-progression";
import { cn } from "@/lib/utils";

const SECTION_CTA = {
  title: "Mixed cohort, or several teams at once?",
  description:
    "We can tailor the training to different teams, roles, and experience levels within the same program.",
  cta: { label: "Share Your Requirements", href: "#apply" },
};

const GROUP_VARIANT = {
  light: {
    card: "border-ink/12 bg-white",
    divider: "border-ink/12",
    title: "text-ink",
    subtitle: "text-ink/50",
    role: "text-ink",
    dot: "border border-ink/25 bg-lime",
  },
  dark: {
    card: "border-navy bg-navy",
    divider: "border-paper/18",
    title: "text-lime",
    subtitle: "text-paper/70",
    role: "text-paper",
    dot: "bg-lime",
  },
};

function AudienceGroup({ group }) {
  const variant = GROUP_VARIANT[group.variant] || GROUP_VARIANT.light;

  return (
    <Box className={cn("rounded-[14px] border px-5 pt-5 pb-4.5", variant.card)}>
      <Box className={cn("mb-3.5 border-b pb-3", variant.divider)}>
        <Text
          as="p"
          className={cn(
            "font-display text-[16.5px] font-semibold tracking-[-0.02em]",
            variant.title,
          )}
        >
          {group.title}
        </Text>
        <Text as="p" className={cn("mt-1 text-[12.5px] leading-[1.5]", variant.subtitle)}>
          {group.subtitle}
        </Text>
      </Box>

      <Box as="ul" className="flex flex-col gap-2">
        {group.roles.map((role) => (
          <Box
            as="li"
            key={role}
            className={cn(
              "relative pl-4.25 text-[13.5px] font-medium leading-[1.45]",
              variant.role,
            )}
          >
            <Box
              aria-hidden="true"
              className={cn(
                "absolute top-[0.55em] left-0 size-1.5 rounded-full",
                variant.dot,
              )}
            />
            {role}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/**
 * Course audience — two role-group cards (participants vs. training buyers)
 * stacked above a full-width skill-progression panel.
 *
 * Design: `section#audience.block.section.warm`, `.aud-two`, `.aud-side`,
 * `.prog-wrap`.
 */
export default function Audience({ audience }) {
  if (!audience?.groups?.length) return null;

  const { heading, description, groups, prerequisites, progression } =
    audience;

  const prerequisiteFlags = progression?.items?.map((item) =>
    Boolean(item.is_prerequisite),
  );
  const firstPrerequisiteIndex = prerequisiteFlags?.indexOf(true) ?? -1;
  const lastPrerequisiteIndex = prerequisiteFlags?.lastIndexOf(true) ?? -1;

  return (
    <Section
      id="audience"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10"
    >
      <Reveal delay={1}>
        <Text as="h2" className="mb-6.5 max-w-[24ch] tracking-[-0.03em]">
          {heading?.parts
            ? heading.parts.map((p, i) =>
                (p.is_italic || p.em) ? <em key={i} className="font-serif font-normal italic">{p.text}</em> : p.text
              )
            : (typeof heading === "string" ? heading : "").split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, i) => {
                const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
                return match ? <em key={i} className="font-serif font-normal italic">{match[1]}</em> : fragment;
              })
          }
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-15 max-w-[64ch] text-[16.5px] leading-[1.7] text-ink/60"
        >
          {description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {groups.map((group) => (
            <AudienceGroup key={group.id} group={group} />
          ))}
        </Box>
      </Reveal>

      {prerequisites ? (
        <Reveal delay={2}>
          <Text
            as="p"
            className="mt-4.5 rounded-[10px] border border-ink/12 border-l-3 border-l-lime bg-white px-3.75 py-3 text-[12.5px] leading-[1.6] text-ink/60"
          >
            <b className="font-semibold text-ink">Prerequisites:</b>{" "}
            {prerequisites}
          </Text>
        </Reveal>
      ) : null}

      {progression?.items?.length ? (
        <SkillProgression
          progression={progression}
          firstPrerequisiteIndex={firstPrerequisiteIndex}
          lastPrerequisiteIndex={lastPrerequisiteIndex}
        />
      ) : null}

      <SecCta {...SECTION_CTA} />
    </Section>
  );
}
