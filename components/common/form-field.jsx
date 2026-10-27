import { cloneElement, isValidElement } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * Visible mono-uppercase label + input/select/textarea + an error that
 * overlays the row gap below the field (no layout shift) —
 * the field pattern used by the full-size lead-capture forms (`LeadForm`,
 * the group-quote wizard's contact step).
 */
export const formInputClasses =
  "w-full min-w-0 rounded-xl border border-ink/15 bg-paper px-3.5 py-3 text-[13.5px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-navy focus:bg-white";

export function FormField({ label, required, error, htmlFor, className, children }) {
  // With `htmlFor`, the wrapper is a div and only the label text is a
  // <label> — for a control like the phone widget, whose <div>s are not
  // allowed inside a <label>.
  //
  // Without it, the wrapping <label> names the field — valid, but audit tools
  // that only check `label[for]` / `aria-label` report it as unlabelled. So a
  // single wrapped control also gets the same visible text as `aria-label`;
  // what a screen reader announces does not change.
  const control =
    !htmlFor &&
    typeof label === "string" &&
    isValidElement(children) &&
    !children.props["aria-label"] &&
    !children.props["aria-labelledby"]
      ? cloneElement(children, { "aria-label": label })
      : children;

  return (
    <Box as={htmlFor ? "div" : "label"} className={cn("relative flex flex-col gap-1.75", className)}>
      <Text
        as={htmlFor ? "label" : "span"}
        htmlFor={htmlFor}
        className="font-mono text-[10px] tracking-[0.15em] text-ink-muted uppercase"
      >
        {label}{" "}
        {required ? <Text as="span" className="text-[10px] leading-none text-red-600">*</Text> : null}
      </Text>
      {control}
      {/* Absolutely placed under the field's right edge, in the gap before
          the next row — so an error appearing never shifts the layout. */}
      {error ? (
        <Text
          as="span"
          role="alert"
          className="absolute top-full right-0 mt-0.5 max-w-full truncate text-right text-[11px] leading-[1.35] text-red-600"
        >
          {error}
        </Text>
      ) : null}
    </Box>
  );
}
