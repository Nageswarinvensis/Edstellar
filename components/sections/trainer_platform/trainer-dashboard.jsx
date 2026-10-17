import { LayoutDashboard, MessageSquare, ShieldCheck, UserRound } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";
import { cn } from "@/lib/utils";

const ICONS = {
  profile: UserRound,
  verified: ShieldCheck,
  dashboard: LayoutDashboard,
  chat: MessageSquare,
};

const EMAIL = /([\w.+-]+@[\w-]+\.[\w.]*\w)/;

/**
 * "Dashboard to a world of global opportunities" — four feature cards on
 * navy, then a footer row with the join CTA and the demo / call-back note
 * (its email address linked).
 *
 * Design: Join as a Trainer `#dashboard`, `.dash-grid`, `.dcard`, `.dash-foot`.
 */
export default function TrainerDashboard({ data }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section id="dashboard" className={cn("bg-navy text-paper", SECTION_PADDING)} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} description={data.description} align="start" dark />

      <Box className="grid gap-5 min-[561px]:grid-cols-2 min-[1021px]:grid-cols-4">
        {items.map((item, index) => {
          const Icon = ICONS[item.icon] ?? LayoutDashboard;
          return (
            <Reveal
              key={item.title}
              delay={Math.min(index + 1, 4)}
              className="rounded-[18px] border border-paper/12 bg-navy-soft px-6.5 py-7.5 transition-[transform,border-color] duration-250 hover:-translate-y-1.5 hover:border-lime/40"
            >
              <Box className="mb-5.5 grid size-11.5 place-items-center rounded-xl bg-lime text-navy">
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </Box>
              <Text as="p" className="mb-2 font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-lime uppercase">
                {item.kicker}
              </Text>
              <Text as="h3" className="mb-2.5 text-[18px] leading-[1.3] font-medium text-paper">
                {item.title}
              </Text>
              <Text as="p" className="text-[14.5px] leading-[1.7] text-paper/72">
                {item.text}
              </Text>
            </Reveal>
          );
        })}
      </Box>

      {data.cta || data.note ? (
        <Reveal className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-paper/12 pt-8">
          {data.cta?.href ? (
            <CtaButton color="lime" arrow render={<a href={data.cta.href} />}>
              {data.cta.label}
            </CtaButton>
          ) : null}
          {data.note ? (
            <Text as="p" className="min-w-65 flex-1 text-[15px] leading-[1.7] text-paper/72">
              {data.note.split(EMAIL).map((part, index) =>
                index % 2 ? (
                  <a
                    key={index}
                    href={`mailto:${part}`}
                    title="Click Here to Email Edstellar"
                    className="border-b border-lime/40 text-lime"
                  >
                    {part}
                  </a>
                ) : (
                  part
                ),
              )}
            </Text>
          ) : null}
        </Reveal>
      ) : null}
    </Section>
  );
}
