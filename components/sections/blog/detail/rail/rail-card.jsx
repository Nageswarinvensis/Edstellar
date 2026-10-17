import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/** The rail's card shell, eyebrow and heading — shared by every rail card.
 * Design: Blog page v2 `.rcard`, `.eyebrow`, `.rcard h2`, `.rsub`. */
export function RailCard({ className, children, ...props }) {
  return (
    <Box
      as="section"
      className={cn(
        "relative rounded-2xl border border-ink/12 bg-white p-4.5 shadow-rest",
        className,
      )}
      {...props}
    >
      {children}
    </Box>
  );
}

export function RailEyebrow({ children, className }) {
  return (
    <Text
      as="span"
      className={cn(
        "block font-mono text-[10px] font-medium uppercase leading-[1.6] tracking-[0.14em] text-ink/60",
        className,
      )}
    >
      {children}
    </Text>
  );
}

/** Heading with an emphasized phrase (`emphasis`) in bold serif italic. */
export function RailHeading({ id, lead, emphasis, tail = ".", className }) {
  return (
    <Text
      as="h2"
      id={id}
      className={cn(
        "mt-2 text-[18px] leading-[1.25] font-medium tracking-[-0.01em] text-ink",
        className,
      )}
    >
      {lead}{" "}
      <em className="font-serif text-[1.12em] font-bold">{emphasis}</em>
      {tail}
    </Text>
  );
}

export function RailSub({ children, className }) {
  return (
    <Text
      as="p"
      className={cn("mt-2 text-[13px] leading-[1.55] text-ink/60", className)}
    >
      {children}
    </Text>
  );
}
