import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Heading from "@/components/sections/course/v2/heading";
import { cn } from "@/lib/utils";

/** The v2 eyebrow (the design's `.eyebrow`): olive mono caps with the lime dot. */
export function V2Eyebrow({ children, className }) {
  if (!children) return null;
  return (
    <Box
      as="p"
      className={cn(
        "mb-3.5 inline-flex items-center gap-[9px] font-mono text-[11px] uppercase tracking-[0.18em] text-olive",
        className,
      )}
    >
      <span aria-hidden="true" className="inline-block size-1.5 shrink-0 rounded-full bg-lime ring-[3px] ring-lime/25" />
      {children}
    </Box>
  );
}

/**
 * Eyebrow + H2 + lead — the design's `.sec-head` (max 820px, 34px below).
 * `align="center"` centers it; `aside` renders beside it on desktop.
 */
export default function V2SectionHead({ eyebrow, heading, lead, align = "left", aside, className, headingClassName, emClassName, eyebrowClassName, leadClassName }) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "mb-[34px]",
        centered ? "mx-auto max-w-[900px] text-center" : !aside && "max-w-[820px]",
        aside && "flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <Box className={cn(aside && "max-w-[820px]")}>
        <V2Eyebrow className={eyebrowClassName}>{eyebrow}</V2Eyebrow>
        <V2Heading parts={heading} className={cn("mb-3.5", headingClassName)} emClassName={emClassName} />
        {lead && (
          <Text className={cn("max-w-[760px] text-[16.5px] leading-[1.7]", centered && "mx-auto", leadClassName)}>
            {lead}
          </Text>
        )}
      </Box>
      {aside}
    </Reveal>
  );
}

/** The small "sample" badge some v2 sections carry beside their head. */
export function V2Badge({ children }) {
  if (!children) return null;
  return (
    <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-ink/12 bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)] lg:self-auto">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-olive" />
      {children}
    </span>
  );
}
