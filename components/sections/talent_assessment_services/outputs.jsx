import Link from "next/link";
import {
  FileText,
  ListChecks,
  LayoutGrid,
  Users,
  UserCog,
  TrendingUp,
  Target,
  Layers,
} from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { newTabProps } from "@/lib/links";

const ICONS = {
  file: FileText,
  "list-check": ListChecks,
  grid: LayoutGrid,
  users: Users,
  "user-cog": UserCog,
  "trending-up": TrendingUp,
  target: Target,
  layers: Layers,
};

/**
 * Ready-to-use outputs, grouped by audience (individuals, teams/managers,
 * HR & L&D), each row tagged with the process step that produces it, closed by
 * a centered CTA.
 *
 * Design: `#outputs`, `.og`, `.og-col`, `.og-r`, `.cta-row.cta-center`.
 */
export default function Outputs({ data }) {
  if (!data?.columns?.length) return null;

  const { section_id, heading, description, columns, cta } = data;

  return (
    <Section id={section_id} className="bg-paper">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-3 gap-5 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
        {columns.map((col, index) => (
          <Reveal key={col.title} delay={Math.min(index + 1, 4)} className="h-full max-[1100px]:last:col-span-2 max-[600px]:last:col-auto">
            <Box className="h-full overflow-hidden rounded-2xl border border-ink/12 bg-white">
              <Box className="bg-navy px-6.5 py-5.5 max-[600px]:px-5 max-[600px]:py-4.5">
                <Text as="h3" className="font-display text-[18px] font-bold text-paper">
                  {col.title}
                </Text>
                <Text as="p" className="mt-0.5 text-[13.5px] text-lime-soft">
                  {col.subtitle}
                </Text>
              </Box>

              {col.items?.map((item) => {
                const Icon = ICONS[item.icon] || FileText;
                return (
                  <Box
                    key={item.title}
                    // Below 600px the icon stacks above the title so the text
                    // gets the card's full width.
                    className="flex gap-3.5 border-t border-ink/12 px-6.5 py-5.5 max-[600px]:flex-col max-[600px]:gap-3 max-[600px]:px-5 max-[600px]:py-4.5"
                  >
                    <Box className="grid size-10 flex-none place-items-center rounded-[10px] bg-lime-soft text-navy">
                      <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                    </Box>
                    <Box>
                      <Text
                        as="h4"
                        className="mb-1 font-display text-[16px] font-bold leading-[1.3] text-ink"
                      >
                        {item.title}
                      </Text>
                      <Text as="p" className="text-[14.5px] leading-[1.55] text-ink/60">
                        {item.description}
                      </Text>
                      {item.stage ? (
                        <Text
                          as="span"
                          className="mt-2.5 inline-block rounded-full bg-paper-warm px-2.5 py-0.75 text-[12px] font-semibold text-ink"
                        >
                          {item.stage}
                        </Text>
                      ) : null}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Reveal>
        ))}
      </Box>

      {cta?.heading ? (
        <Reveal>
          <Box className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-ink/12 bg-white px-7 py-9 text-center">
            <Box>
              <Text
                as="p"
                className="font-display text-[24px] font-bold tracking-[-0.01em] text-ink"
              >
                {cta.heading}
              </Text>
              {cta.description ? (
                <Text as="p" className="mt-1 text-[15px] leading-[1.5] text-ink/60">
                  {cta.description}
                </Text>
              ) : null}
            </Box>
            <Box className="flex flex-wrap justify-center gap-3">
              {cta.primary?.href ? (
                <CtaButton arrow render={<Link href={cta.primary.href} />}>
                  {cta.primary.label}
                </CtaButton>
              ) : null}
              {cta.secondary?.href ? (
                <CtaButton
                  variant="ghost"
                  arrow
                  // The readiness check — opens the tool in a new tab.
                  render={<Link href={cta.secondary.href} {...newTabProps(cta.secondary.href)} />}
                >
                  {cta.secondary.label}
                </CtaButton>
              ) : null}
            </Box>
          </Box>
        </Reveal>
      ) : null}
    </Section>
  );
}
