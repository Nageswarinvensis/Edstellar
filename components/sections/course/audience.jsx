import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";
import AudienceRoles from "@/components/sections/course/audience-roles";

const LEVEL_CODE = {
  None: "N",
  Basic: "B",
  Intermediate: "I",
  Advanced: "A",
  "Very Advanced": "VA",
};

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
          {LEVEL_CODE[item.entryLevel]} <span aria-hidden="true">→</span>{" "}
          <b className="font-semibold text-ink">{LEVEL_CODE[item.exitLevel]}</b>
        </Text>
      </Box>

      <Box
        role="img"
        aria-label={`${item.skill}: ${item.entryLevel} on entry, ${item.exitLevel} on completion`}
        className="relative h-2 overflow-visible rounded-full bg-paper-warm"
      >
        <Box
          className="absolute top-0 left-0 h-full rounded-full bg-[linear-gradient(90deg,var(--color-navy-deep),var(--color-lime))]"
          style={{ width: `${item.exitPercent}%` }}
        />
        {item.entryPercent > 0 ? (
          <Box
            aria-hidden="true"
            className="absolute top-1/2 h-2 w-0.5 -translate-y-1/2 rounded-[2px] bg-paper/85"
            style={{ left: `${item.entryPercent}%` }}
          />
        ) : null}
        <Box
          aria-hidden="true"
          className="absolute top-1/2 h-3.75 w-0.5 -translate-y-1/2 rounded-[2px] bg-ink/60"
          style={{ left: `${item.exitPercent}%` }}
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
 * Course audience — role filter on the left, skill-progression panel
 * on the right.
 *
 * Design: `section#audience.block.section.warm`, `.aud-split`, `.prog-wrap`.
 */
export default function Audience({ audience }) {
  if (!audience?.roles?.length) return null;

  const {
    heading,
    description,
    filters,
    roles,
    groupLabels,
    prerequisites,
    progression,
  } = audience;

  const prerequisiteFlags = progression?.items?.map((item) =>
    Boolean(item.prerequisite),
  );
  const firstPrerequisiteIndex = prerequisiteFlags?.indexOf(true) ?? -1;
  const lastPrerequisiteIndex = prerequisiteFlags?.lastIndexOf(true) ?? -1;

  return (
    <Section id="audience" className="border-t border-ink/10 bg-paper-warm">
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

      <Box className="aud-split grid grid-cols-1 items-start gap-6.5 lg:grid-cols-[minmax(0,.86fr)_minmax(0,1.14fr)] lg:gap-8">
        <Reveal delay={2}>
          <Box>
            <AudienceRoles
              filters={filters}
              roles={roles}
              groupLabels={groupLabels}
            />

            {prerequisites ? (
              <Text
                as="p"
                className="mt-4.5 rounded-[10px] border border-ink/12 border-l-3 border-l-lime bg-white px-3.75 py-3 text-[12.5px] leading-[1.6] text-ink/60"
              >
                <b className="font-semibold text-ink">Prerequisites:</b>{" "}
                {prerequisites}
              </Text>
            ) : null}
          </Box>
        </Reveal>

        {progression?.items?.length ? (
          <Reveal delay={2}>
            <Box className="rounded-2xl border border-ink/12 bg-white px-6 pt-6 pb-5.5 max-sm:px-5 max-sm:pt-5 max-sm:pb-4.5">
              <Text
                as="h3"
                className="font-display text-[16.5px] font-semibold tracking-[-0.02em] text-ink"
              >
                {progression.title}
              </Text>
              <Text
                as="p"
                className="mt-2 mb-5 text-[12.5px] leading-[1.6] text-ink/60"
              >
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
      </Box>
    </Section>
  );
}
