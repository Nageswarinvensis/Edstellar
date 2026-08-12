import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * The uppercase kicker that opens every section — an optional roman numeral,
 * a serif italic keyword, then a plain-language label.
 *
 * Design: `.sec-mark` / `.sec-mark .roman` / `.sec-mark .kw`
 */
function SectionMark({ roman, keyword, label, tone = "light", className }) {
  const dark = tone === "dark";

  return (
    <Box
      className={cn(
        "flex flex-wrap items-baseline gap-3 font-mono text-[11px] tracking-[0.24em] uppercase",
        dark ? "text-paper/60" : "text-ink/60",
        className,
      )}
    >
      {roman ? (
        <span className={dark ? "text-paper" : "text-ink"}>{roman}</span>
      ) : null}
      {keyword ? (
        <span
          className={cn(
            "font-serif text-base tracking-normal normal-case italic",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {keyword}
        </span>
      ) : null}
      {label ? <span>· {label}</span> : null}
    </Box>
  );
}

export default SectionMark;
