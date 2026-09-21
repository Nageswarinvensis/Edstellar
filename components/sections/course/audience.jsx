import { Info } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import SecCta from "@/components/common/sec-cta";
import SkillProgression from "@/components/sections/course/skill-progression";

const SECTION_CTA = {
  title: "Not sure where your team should start?",
  description:
    "Send us the roles and what they run in production today. We’ll tell you which modules to keep, which prerequisites to close first, and whether to run one program or a pilot batch.",
  cta: { label: "Get a Recommendation", href: "#apply" },
};

/**
 * The role list — one white card, up to three plain bulleted columns
 * divided by rule lines. No per-column heading in the design: the roles
 * speak for themselves.
 */
function RolesCard({ columns }) {
  if (!columns?.length) return null;

  return (
    <Box className="grid grid-cols-1 gap-4 rounded-2xl border border-ink/12 bg-white p-6.5 min-[901px]:grid-cols-3 min-[901px]:gap-0 min-[901px]:p-7.5">
      {columns.map((roles, index) => (
        <Box
          as="ul"
          key={roles.join("-")}
          className={
            index > 0
              ? "flex flex-col gap-3.75 border-t border-ink/10 pt-3.75 min-[901px]:border-t-0 min-[901px]:border-l min-[901px]:pt-0 min-[901px]:pl-6.5"
              : "flex flex-col gap-3.75"
          }
        >
          {roles.map((role) => (
            <Box
              as="li"
              key={role}
              className="relative pl-4.25 text-[14px] font-medium leading-[1.4] text-ink"
            >
              <Box
                aria-hidden="true"
                className="absolute top-[0.45em] left-0 size-1.75 rounded-full bg-lime"
              />
              {role}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

/**
 * Course audience — a three-column role card, a prerequisites callout, and
 * a full-width skill-progression matrix.
 *
 * Design: `#audience`, `.eds-aud-card`, `.eds-aud-note`, `.eds-path`.
 */
export default function Audience({ audience }) {
  if (!audience?.roles?.length) return null;

  const { heading, description, roles, prerequisites, progression } =
    audience;

  return (
    <Section
      id="audience"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10"
    >
      <Reveal delay={1}>
        <RichHeading heading={heading} className="mb-6.5 max-w-[24ch] tracking-[-0.03em]" />
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-6.5 max-w-[64ch] text-[16.5px] leading-[1.7] text-ink/60"
        >
          {description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <RolesCard columns={roles} />
      </Reveal>

      {prerequisites ? (
        <Reveal delay={2}>
          <Box className="mt-4.5 flex items-center gap-5 rounded-2xl border border-ink/10 bg-paper px-6 py-4.5 max-sm:gap-3.5 max-sm:px-4.5">
            <Box className="grid size-10 flex-none place-items-center rounded-full bg-lime text-ink">
              <Info size={19} strokeWidth={2} aria-hidden="true" />
            </Box>
            <Box className="h-full w-px flex-none self-stretch bg-ink/12" aria-hidden="true" />
            <Text as="p" className="text-[13.5px] leading-[1.6] text-ink/65">
              <b className="font-semibold text-ink">Prerequisites:</b>{" "}
              {prerequisites}
            </Text>
          </Box>
        </Reveal>
      ) : null}

      {progression ? (
        <Reveal delay={3}>
          <SkillProgression progression={progression} />
        </Reveal>
      ) : null}

      <SecCta {...SECTION_CTA} />
    </Section>
  );
}
