import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2ScrollLink from "@/components/sections/course/v2/scroll-link";
import { V2_BUTTON } from "@/components/sections/course/v2/buttons";
import { cn } from "@/lib/utils";

/**
 * The CTA block that closes most v2 sections (the design's `.cta-block`):
 * cream panel, 4px lime rule on the left, heading, line and one button.
 * `cta` = `{ heading, text, label, href }`. `tone="dark"` for navy sections.
 */
export default function V2CtaBand({ cta, className, tone = "paper", buttonClassName }) {
  if (!cta?.label) return null;
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "mt-[34px] rounded-r-[18px] border-l-4 border-lime px-[18px] pt-5 pb-[22px] sm:px-7 sm:pt-6 sm:pb-[26px]",
        dark ? "bg-navy-soft" : "bg-paper-cream",
        className,
      )}
    >
      {cta.heading && (
        <Text as="h3" className={cn("mb-1.5 text-[19px] leading-[1.3]", dark && "text-white")}>
          {cta.heading}
        </Text>
      )}
      {cta.text && (
        <Text className={cn("mb-[18px] max-w-[900px] text-[15px] leading-[1.65]", dark && "text-white/75")}>
          {cta.text}
        </Text>
      )}
      <V2ScrollLink href={cta.href || "#quote"} topic={cta.heading} className={cn(dark ? V2_BUTTON.lime : V2_BUTTON.primary, buttonClassName)}>
        {cta.label}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </V2ScrollLink>
    </Reveal>
  );
}
