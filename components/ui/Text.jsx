import { cn } from "@/lib/utils";

const componentMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  p: "p",
  span: "span",
  div: "div",
};

/**
 * Type scale from the approved designs.
 *
 * Sora carries all display headings, Cormorant Garamond is the italic accent
 * (applied per-word inside a heading, not to the whole heading), DM Sans is
 * body copy, and DM Mono is reserved for the uppercase kickers and meta rows.
 *
 * These are sensible defaults, not per-page truth — a section that needs the
 * design's exact size for its context passes a `className`, which `cn()` merges
 * over the top. See `components/sections/*`.
 */
const tailwindClasses = {
  h1: "font-display font-bold text-ink text-[clamp(30px,3.5vw,47px)] leading-[1.05] tracking-[-0.035em] break-words hyphens-auto",
  h2: "font-display font-bold text-ink text-[clamp(30px,4vw,50px)] leading-[1.08] tracking-[-0.03em] break-words hyphens-auto",
  h3: "font-display font-bold text-ink text-[clamp(20px,2vw,26px)] leading-[1.15] tracking-[-0.02em] break-words hyphens-auto",
  h4: "font-display font-semibold text-ink text-lg leading-snug tracking-[-0.01em] break-words hyphens-auto",
  h5: "font-display font-semibold text-ink text-base leading-snug break-words hyphens-auto",
  p: "font-body text-ink/60 text-base leading-[1.7] break-words hyphens-auto",
  span: "font-body text-ink/60 text-sm break-words",
  div: "font-body text-ink/60 text-base break-words",
};

function Text({ as = "p", children, className, ...props }) {
  const Tag = componentMap[as] || "p";

  return (
    <Tag className={cn(tailwindClasses[as], className)} {...props}>
      {children}
    </Tag>
  );
}

export default Text;
