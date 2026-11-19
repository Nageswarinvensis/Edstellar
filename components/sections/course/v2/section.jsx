import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * A v2 section: the design's `section.sec` — paper by default, a hairline
 * top border, 44px padding on phones and 80px on desktop, 1280px content.
 * `tone` picks the background: "paper" (default), "warm" or "navy".
 */
const TONE = {
  paper: "bg-paper",
  warm: "bg-paper-warm",
  navy: "border-t-0 bg-navy text-white",
};

export default function V2Section({ id, tone = "paper", className, children, ...props }) {
  return (
    <Section
      id={id}
      className={cn("scroll-mt-[76px] border-t border-ink/10 py-11 lg:py-20", TONE[tone], className)}
      {...props}
    >
      {children}
    </Section>
  );
}
