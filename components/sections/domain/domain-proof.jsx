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
 * figures, muted mono-caps labels, `--rule` (ink/12) dividers. `DomainInfo`
 * (TNA page) is a separate component and stays as-is.
 *
 * Driven by `proof.stats`: a stat carrying a `photo`/`photos` renders as the
 * avatar-stack trainers cell; every other stat as a figure + label.
 */
function StatValue({ children }) {
  return (
    <b className="font-display text-[24px] leading-none font-bold tracking-[-0.03em] text-ink">
      {children}
    </b>
  );
}

function StatLabel({ children }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.14em] whitespace-nowrap text-ink-muted uppercase">
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
              const photos = stat.photos ?? (stat.photo ? [stat.photo] : []);
              const cell = cn(
                "flex min-w-0 flex-1 flex-col gap-[5px]",
                index > 0 && "border-l border-ink/12 pl-[26px]",
                "max-md:flex-[1_1_44%] max-md:py-2",
                "max-md:[&:nth-child(odd)]:border-l-0 max-md:[&:nth-child(odd)]:pl-0",
              );

              if (photos.length) {
                return (
                  <Box
                    key={index}
                    className={cn(cell, "flex-row items-center gap-3")}
                  >
                    <Box aria-hidden="true" className="flex flex-none">
                      {photos.slice(0, 4).map((src, i) => (
                        <Box
                          as="span"
                          key={i}
                          className="relative size-[30px] flex-none overflow-hidden rounded-full border-2 border-white shadow-[0_1px_3px_rgba(10,22,40,0.22)] [&:not(:first-child)]:-ml-[9px]"
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="30px"
                            className="object-cover"
                          />
                        </Box>
                      ))}
                    </Box>
                    <Box className="flex flex-col gap-[5px]">
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
