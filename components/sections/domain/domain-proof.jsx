import Image from "next/image";

import Reveal from "@/components/common/reveal";
import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * Domain page proof bar — the light stat card under the hero (`#proofBar` in
 * the design): a white card with the figures spread edge to edge, split by
 * hairline dividers (Organizations trained / Years delivering / Certified),
 * plus a trainers cell with an overlapping avatar stack.
 *
 * Matches the design's *effective* `.proof-bar` — the light-card variant (a
 * later rule in the design overrides the earlier navy one): white card, ink
 * figures, muted mono-caps labels, `--rule` (ink/12) dividers. `TnaInfo`
 * (TNA page) is a separate component and stays as-is.
 *
 * Driven by `proof.stats`: the stat whose label names the trainers renders as
 * the avatar-stack cell; every other stat as a figure + label. The avatar
 * strip itself is a fixed asset (`AVATAR_SRC`), not CMS data.
 */
// Pre-composed avatar strip, shown on the trainers stat. Static — the CMS
// `stats` only carry the figures and labels.
const AVATAR_SRC = "/course/Avatar.webp";

function StatValue({ children }) {
  return (
    <b className="font-display text-[24px] leading-none font-bold tracking-[-0.03em] text-ink">
      {children}
    </b>
  );
}

function StatLabel({ children }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.14em] text-ink-muted uppercase max-md:tracking-[0.1em]">
      {children}
    </span>
  );
}

function DomainProof({ proof }) {
  const stats = proof?.stats ?? [];
  if (!stats.length) return null;

  return (
    <Section className="pt-0 pb-10 lg:pt-0 lg:pb-10">
      <Reveal delay={4}>
        <Box className="rounded-[14px] border border-ink/12 bg-white px-6 py-[18px] shadow-[0_18px_44px_-34px_rgba(10,22,40,0.45)]">
          <Box
            aria-label="Edstellar at a glance"
            className="flex w-full min-w-0 items-stretch max-md:flex-wrap"
          >
            {stats.map((stat, index) => {
              // The avatar strip is a fixed asset on the trainers stat, chosen
              // by label rather than any CMS `photo` field.
              const showAvatar = /trainer/i.test(stat.label ?? "");
              const cell = cn(
                "flex min-w-0 flex-1 flex-col gap-[5px]",
                index > 0 && "border-l border-ink/12 pl-[26px]",
                // Tablet: two per row. Phone: one per row, full width.
                "max-md:flex-[1_1_44%] max-md:py-2",
                "max-md:[&:nth-child(odd)]:border-l-0 max-md:[&:nth-child(odd)]:pl-0",
                "max-sm:flex-[1_1_100%] max-sm:border-l-0 max-sm:pl-0",
              );

              if (showAvatar) {
                return (
                  <Box
                    key={index}
                    className={cn(cell, "flex-row items-center gap-3")}
                  >
                    <Box
                      aria-hidden="true"
                      className="flex flex-none items-center"
                    >
                      {/* `Avatar.webp` is a wide, pre-composed avatar strip, so
                          it's rendered at a fixed size with `object-contain` —
                          the same way the course page shows it — rather than
                          cropped into a circle. */}
                      <Image
                        src={AVATAR_SRC}
                        alt=""
                        width={44}
                        height={24}
                        className="h-7 w-auto flex-none object-contain"
                      />
                    </Box>
                    <Box className="flex min-w-0 flex-col gap-[5px]">
                      <StatValue>{stat.value}</StatValue>
                      <StatLabel>{stat.label}</StatLabel>
                    </Box>
                  </Box>
                );
              }

              return (
                <Box key={index} className={cell}>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}

export default DomainProof;
