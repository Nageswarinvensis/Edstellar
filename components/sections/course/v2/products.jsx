import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { V2_BUTTON, V2ButtonArrow } from "@/components/sections/course/v2/buttons";
import { cn } from "@/lib/utils";

/** Trusted static SVG markup from the design file; `.pd-lime` parts draw in lime. */
function Markup({ html, viewBox, className }) {
  return (
    <svg
      viewBox={viewBox || "0 0 24 24"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("[&_.pd-lime]:stroke-lime", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** The three navy shades the stage cards cycle through. */
const SHADE = ["bg-navy", "bg-navy-soft", "bg-navy-deep", "bg-navy"];

function Product({ p, single }) {
  const rich = p.facts.some((f) => f.icon);
  return (
    <article
      className={cn(
        "flex min-w-0 flex-col rounded-[14px] border border-paper/12 bg-paper/5 p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-lime/45 hover:shadow-[0_12px_28px_rgba(5,13,26,0.45)]",
        single && "min-[761px]:grid min-[761px]:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] min-[761px]:gap-x-8",
      )}
    >
      <Box className="flex items-center gap-3.5">
        <span className="grid size-14 flex-none place-items-center rounded-[14px] border-[1.5px] border-lime bg-navy text-paper shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-lime)_10%,transparent)]">
          <Markup html={p.icon} viewBox={p.icon_viewbox} className="size-8" />
        </span>
        <Box>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-lime">{p.kind}</span>
          <h5 className="mt-[3px] font-display text-[23px] font-medium tracking-[-0.02em] text-white">{p.name}</h5>
        </Box>
      </Box>
      {p.tagline && (
        <p className={cn("mt-3.5 mb-1.5 font-serif text-[20px] italic leading-[1.3] text-white", single && "min-[761px]:col-start-1 min-[761px]:row-start-2")}>“{p.tagline}”</p>
      )}
      <p className={cn("mb-3 text-[14.5px] leading-[1.55] text-paper/78", single && "min-[761px]:col-start-2 min-[761px]:row-span-2 min-[761px]:row-start-1 min-[761px]:m-0 min-[761px]:self-center min-[761px]:text-[16px]")}>
        {p.text}
      </p>
      <ul className={cn("mb-4 grid gap-2", single && "min-[761px]:col-span-full min-[761px]:my-4 min-[761px]:grid-cols-3 min-[761px]:gap-3")}>
        {p.facts.map((f) =>
          rich ? (
            <li key={f.text} className="flex flex-col items-start gap-3 rounded-xl border border-paper/12 bg-paper/5 p-[18px]">
              {f.icon && (
                <span className="grid size-[46px] place-items-center rounded-xl border border-lime/45 bg-navy text-paper">
                  <Markup html={f.icon} viewBox={f.icon_viewbox || "0 0 32 32"} className="size-7" />
                </span>
              )}
              <b className="mt-1 font-display text-[19px] leading-[1.25] font-medium tracking-[-0.01em] text-white">{f.label}</b>
              <span className="text-[14.5px] leading-[1.5] text-paper/80">{f.text}</span>
            </li>
          ) : (
            <li
              key={f.text}
              className="relative pl-5 text-[14px] leading-[1.5] text-paper/90 before:absolute before:top-[0.55em] before:left-0.5 before:size-[7px] before:rounded-full before:bg-lime before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-lime)_20%,transparent)]"
            >
              {f.label && <b className="font-semibold">{f.label}. </b>}
              {f.text}
            </li>
          ),
        )}
      </ul>
      {p.href && (
        <Link
          href={p.href}
          title={p.link_title || `Click here to ${p.link_label}`}
          className={cn(
            V2_BUTTON.lime,
            "mt-auto self-start",
            single && "min-[761px]:col-span-full min-[761px]:justify-self-start",
          )}
        >
          {p.link_label}
          <V2ButtonArrow />
        </Link>
      )}
    </article>
  );
}

/**
 * The "Edstellar products that extend your training" block inside v2 · 10
 * (the design's `#edProducts`): four stage cards in navy shades —
 * Diagnose, Run, Assess, Coach — each with its products.
 */
/**
 * Stacking cards (desktop): each stage card sticks below the site header,
 * 16px lower than the one before, so the next card slides up over it while
 * scrolling and the stack's tops stay visible. Not on phones — a card taller
 * than the screen would hide its own content while stuck.
 */
const STICK_TOP = ["lg:top-[88px]", "lg:top-[104px]", "lg:top-[120px]", "lg:top-[136px]", "lg:top-[152px]"];

export default function V2Products({ data }) {
  if (!data?.stages?.length) return null;
  const { heading, text, stages } = data;

  return (
    <Box id="edProducts" className="mt-16 lg:mt-20">
      <Reveal className="mb-[22px] max-w-[780px]">
        <Text as="h3" className="mb-2 text-[clamp(21px,2.3vw,27px)] leading-[1.2] tracking-[-0.02em]">{heading}</Text>
        {text && <Text className="text-[15.5px] leading-[1.55]">{text}</Text>}
      </Reveal>
      <Box className="grid min-w-0 gap-4">
        {stages.map((s, i) => (
          <Reveal
            as="section"
            key={s.heading}
            aria-labelledby={`pds-${i}`}
            className={cn(
              "flex min-w-0 flex-col gap-3.5 rounded-[18px] p-[22px] text-paper shadow-[0_-18px_40px_rgba(5,13,26,0.18)] lg:sticky",
              STICK_TOP[Math.min(i, STICK_TOP.length - 1)],
              SHADE[i % SHADE.length],
            )}
          >
            {/* The step counter sits beside the heading, not inside it, so the
                heading's text is just the stage name ("Diagnose Needs"). */}
            <Box className="flex items-baseline gap-3">
              <span aria-hidden="true" className="flex-none font-mono text-[11px] tracking-[0.12em] whitespace-nowrap text-lime">
                {String(i + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
              </span>
              <h4 id={`pds-${i}`} className="font-display text-[20px] font-medium tracking-[-0.01em] text-white">
                {s.heading}
              </h4>
            </Box>
            <Box className={cn("grid gap-3.5", s.products.length > 1 && "min-[761px]:grid-cols-2")}>
              {s.products.map((p) => (
                <Product key={p.name} p={p} single={s.products.length === 1} />
              ))}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}
