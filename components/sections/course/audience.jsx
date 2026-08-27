import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import SecCta from "@/components/common/sec-cta";
import { cn } from "@/lib/utils";

const LEVEL_CODE = {
  None: "N",
  Basic: "B",
  Intermediate: "I",
  Advanced: "A",
  "Very Advanced": "VA",
};

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

function ProgressionRow({ item }) {
  return (
    <Box className="mb-3.75 last:mb-0">
      <Box className="mb-1.75 flex items-baseline justify-between gap-3">
        <Text
          as="span"
          className="font-display text-[13px] font-semibold tracking-[-0.01em] text-ink"
        >
          {item.skill}
        </Text>
        <Text
          as="span"
          className="flex-none font-mono text-[10px] tracking-[0.06em] text-ink/60 uppercase"
        >
          {LEVEL_CODE[item.entry_level]} <span aria-hidden="true">→</span>{" "}
          <b className="font-semibold text-ink">{LEVEL_CODE[item.exit_level]}</b>
        </Text>
      </Box>

      <Box
        role="img"
        aria-label={`${item.skill}: ${item.entry_level} on entry, ${item.exit_level} on completion`}
        className="relative h-2 overflow-visible rounded-full bg-paper-warm"
      >
        <Box
          className="absolute top-0 left-0 h-full rounded-full bg-[linear-gradient(90deg,var(--color-navy-deep),var(--color-lime))]"
          style={{ width: `${item.exit_percent}%` }}
        />
        {item.entry_percent > 0 ? (
          <Box
            aria-hidden="true"
            className="absolute top-1/2 h-2 w-0.5 -translate-y-1/2 rounded-xs bg-paper/85"
            style={{ left: `${item.entry_percent}%` }}
          />
        ) : null}
        <Box
          aria-hidden="true"
          className="absolute top-1/2 h-3.75 w-0.5 -translate-y-1/2 rounded-xs bg-ink/60"
          style={{ left: `${item.exit_percent}%` }}
        />
      </Box>
    </Box>
  );
}

function ProgressionDivider({ label, first }) {
  return (
    <Box
      className={
        first
          ? "mb-4 flex items-center gap-3"
          : "mt-5 mb-4 flex items-center gap-3"
      }
    >
      <Box aria-hidden="true" className="h-px w-5.5 flex-none bg-ink/22" />
      <Text
        as="span"
        className="font-mono text-[10px] tracking-[0.13em] text-ink/60 uppercase"
      >
        {label}
      </Text>
      <Box aria-hidden="true" className="h-px flex-1 bg-ink/12" />
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
        <RichHeading
          as="h2"
          parts={heading.parts}
          className="mb-6.5 max-w-[24ch] tracking-[-0.03em]"
        />
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
        <Reveal delay={2}>
          <Box className="mt-7 rounded-2xl border border-ink/12 bg-white px-6 pt-6 pb-5.5 max-sm:px-5 max-sm:pt-5 max-sm:pb-4.5">
            <Text
              as="h3"
              className="font-display text-[16.5px] font-semibold tracking-[-0.02em] text-ink"
            >
              {progression.title}
            </Text>
            <Text as="p" className="mt-2 mb-5 text-[12.5px] leading-[1.6] text-ink/60">
              {progression.description}
            </Text>

            {progression.items.map((item, index) => (
              <Box key={item.skill}>
                {index === firstPrerequisiteIndex ? (
                  <ProgressionDivider label="Prerequisites" first />
                ) : null}
                <ProgressionRow item={item} />
                {index === lastPrerequisiteIndex &&
                lastPrerequisiteIndex < progression.items.length - 1 ? (
                  <ProgressionDivider label="Taught from the ground up" />
                ) : null}
              </Box>
            ))}

            <Box className="mt-5 flex flex-wrap gap-x-4 gap-y-1.75 border-t border-ink/12 pt-3.75">
              {Object.entries(LEVEL_CODE).map(([label, code]) => (
                <Text
                  key={code}
                  as="span"
                  className="font-mono text-[10px] tracking-[0.04em] text-ink/60"
                >
                  <b className="font-semibold text-ink">{code}</b> {label}
                </Text>
              ))}
            </Box>
          </Box>
        </Reveal>
      ) : null}

      <SecCta {...SECTION_CTA} />
    </Section>
  );
}
