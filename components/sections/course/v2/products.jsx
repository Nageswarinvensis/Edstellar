import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Heading from "@/components/sections/course/v2/heading";
import { cn } from "@/lib/utils";

/** Trusted static SVG markup from the design file; `.pd-lime` parts draw in lime. */
function Markup({ html, viewBox, className }) {
  return (
    <svg
      viewBox={viewBox || "0 0 32 32"}
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

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="flex-none text-ink-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M5 11l6-6M6 5h5v5" />
    </svg>
  );
}

/** One product row: navy icon tile, name and kind, then ↗ (or "Coming soon"). */
function Product({ p }) {
  const soon = p.coming_soon || !p.href;
  const body = (
    <>
      <span className="grid size-[38px] flex-none place-items-center rounded-[10px] bg-navy text-paper">
        {p.icon && <Markup html={p.icon} viewBox={p.icon_viewbox} className="size-[22px]" />}
      </span>
      <span className="min-w-0 flex-1">
        <b className="block font-display text-[15px] font-medium text-ink">{p.name}</b>
        {p.kind && <small className="mt-0.5 block text-[12.5px] text-ink-muted">{p.kind}</small>}
      </span>
      {soon ? (
        <span className="flex-none rounded-full bg-sand px-2 py-[3px] font-mono text-[9.5px] tracking-[0.08em] whitespace-nowrap text-ink-muted uppercase">
          Coming soon
        </span>
      ) : (
        <Arrow />
      )}
    </>
  );
  const row = "flex items-center gap-3 rounded-xl p-2.5";
  if (soon) return <Box className={cn(row, "cursor-default")}>{body}</Box>;
  return (
    <Link
      href={p.href}
      title={`Click here to explore ${p.name}`}
      className={cn(row, "group transition-colors duration-200 hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-olive")}
    >
      {body}
    </Link>
  );
}

/**
 * Edstellar products, "stage columns" (products-block-options.html, Option
 * B1): the heading and intro, then four numbered stages, each a
 * white column with its products. Data is the shared `course_products` in
 * `content/courses/v2/defaults.json` — the same for every course.
 */
export default function V2Products({ data }) {
  if (!data?.stages?.length) return null;
  const { heading, text, stages } = data;

  return (
    <Reveal className="mt-12">
      <Box className="mb-5">
        <V2Heading
          parts={heading}
          as="h3"
          className="text-[clamp(21px,2.3vw,27px)] leading-[1.2] font-medium tracking-[-0.02em]"
        />
        {text && <Text className="mt-2.5 max-w-[760px] text-[15.5px] leading-[1.55] text-ink-muted">{text}</Text>}
      </Box>

      <Box as="ol" className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 min-[561px]:grid-cols-2 min-[901px]:grid-cols-4">
        {stages.map((s, i) => (
          <Box as="li" key={s.step} className="flex min-w-0 flex-col gap-2 rounded-2xl border border-ink/12 bg-white p-3">
            <Box className="flex items-center gap-2.5 border-b border-ink/12 px-1 pt-0.5 pb-2">
              <span className="grid size-7 flex-none place-items-center rounded-full bg-lime font-mono text-[11px] text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <b className="font-display text-[15px] leading-[1.25] font-medium text-ink">{s.step}</b>
            </Box>
            {s.products.map((p) => (
              <Product key={p.name} p={p} />
            ))}
          </Box>
        ))}
      </Box>
    </Reveal>
  );
}
