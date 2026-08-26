import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * Visible mono-uppercase label + input/select/textarea + inline error —
 * the field pattern used by the full-size lead-capture forms (`LeadForm`,
 * the group-quote wizard's contact step).
 */
export const formInputClasses =
  "w-full min-w-0 rounded-xl border border-ink/15 bg-paper px-3.5 py-3 text-[13.5px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-navy focus:bg-white";

export function FormField({ label, required, error, className, children }) {
  return (
    <Box as="label" className={cn("flex flex-col gap-1.75", className)}>
      <Text
        as="span"
        className="font-mono text-[10px] tracking-[0.15em] text-ink/50 uppercase"
      >
        {label}{" "}
        {required ? <Text as="span" className="text-red-600">*</Text> : null}
      </Text>
      {children}
      {error ? (
        <Text as="span" role="alert" className="text-[11.5px] text-red-600">
          {error}
        </Text>
      ) : null}
    </Box>
  );
}
