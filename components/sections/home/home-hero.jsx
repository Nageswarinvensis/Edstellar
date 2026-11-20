import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import HomeWrap from "@/components/sections/home/home-wrap";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import Reveal from "@/components/common/reveal";
import InlineHtml from "@/components/common/inline-html";
import { cn } from "@/lib/utils";

// Heatmap value → navy opacity (navy === ink), matching the design's exact
// rgba(10,22,40, …) steps: .05 / .12 / .28 / .52 / solid navy.
const CELL_BG = ["bg-navy/5", "bg-navy/[0.12]", "bg-navy/[0.28]", "bg-navy/[0.52]", "bg-navy"];
// A priority gap is a solid lime cell with an inset navy border.
const GAP_CELL = "bg-lime shadow-[inset_0_0_0_1.5px_var(--color-navy)]";

function CapabilityMap({ panel }) {
  return (
    <Box aria-hidden="true" className="my-2 grid grid-cols-[108px_repeat(8,minmax(0,1fr))] items-center gap-[3px]">
      <span />
      {panel.cols.map((c) => (
        <Text as="span" key={c} className="text-center font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-muted">
          {c}
        </Text>
      ))}
      {panel.rows.map((row) => (
        <Box key={row.label} className="contents">
          <Text as="span" className="pr-1.5 font-body text-[10.5px] leading-tight text-ink/65">
            {row.label}
          </Text>
          {row.cells.map((v, i) => {
            const isGap = row.gaps.includes(i);
            return <span key={i} className={`relative aspect-square ${isGap ? GAP_CELL : CELL_BG[v]}`} />;
          })}
        </Box>
      ))}
    </Box>
  );
}

/** Home hero — headline, lede and CTAs on the left; the illustrative Capability
 * Map and the 5A methodology panels on the right. */
export default function HomeHero({ data }) {
  if (!data) return null;
  const { panel, methodology } = data;

  return (
    <HomeWrap aria-labelledby="hero-headline" className="bg-paper pt-20 pb-0 max-lg:pt-16 lg:pb-0">
      <Box className="grid items-center gap-10 lg:grid-cols-[1fr_460px]">
        <Box>
          {/* Eyebrow: small mono kicker above the H1. */}
          {data.eyebrow && (
            <Text
              as="p"
              className="m-0 font-mono text-[11px] leading-none font-medium uppercase tracking-[0.1em] text-ink-muted"
            >
              {data.eyebrow}
            </Text>
          )}
          <RichHeading
            as="h1"
            id="hero-headline"
            heading={data.heading}
            emphasisClassName="text-[1.18em] text-ink"
            className="mx-0 mb-0 mt-3 text-[clamp(48px,5.6vw,76px)] font-medium leading-[1.04] tracking-[-0.025em] text-ink text-balance"
          />
          {/* One or more intro paragraphs; `<strong>` marks the key phrase
              (ink, semibold — the design's `.lead2 b`). */}
          {(Array.isArray(data.sub) ? data.sub : [data.sub]).filter(Boolean).map((paragraph, i) => (
            <Text
              key={i}
              as="p"
              className={cn("max-w-[560px] text-[17px] leading-[1.6] text-ink-muted [&_strong]:font-bold [&_strong]:text-ink", i === 0 ? "mt-[26px]" : "mt-3")}
            >
              <InlineHtml text={paragraph} />
            </Text>
          ))}

          <Box className="mt-8 flex flex-wrap gap-3">
            {data.actions?.map((action) => (
              <CtaButton
                key={action.label}
                variant={action.variant === "primary" ? "primary" : "ghost"}
                color="navy"
                arrow={Boolean(action.arrow)}
                render={<a href={action.href} />}
              >
                {action.label}
              </CtaButton>
            ))}
          </Box>

          {/* Trust line (the design's `.trustline`): small mono facts, each
              behind a lime dot, wrapping under the buttons. */}
          {data.trust_line?.length > 0 && (
            <Box as="ul" aria-label="Edstellar at a glance" className="mt-[26px] flex list-none flex-wrap gap-x-[18px] gap-y-2 p-0">
              {data.trust_line.map((item) => (
                <Box
                  key={item}
                  as="li"
                  className="flex items-center gap-[7px] font-mono text-[10.5px] leading-none font-medium tracking-[0.07em] text-ink uppercase before:size-[5px] before:flex-none before:rounded-full before:bg-lime before:content-['']"
                >
                  {item}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right rail — two panels */}
        <Reveal className="flex flex-col gap-6 max-lg:mx-auto max-lg:w-full max-lg:max-w-[520px]">
          <Box as="aside" aria-label="Illustrative capability heatmap" className="border border-ink/12 bg-paper px-6 py-5">
            <Box className="flex items-center justify-between">
              <Text as="span" className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">
                {panel.label}
              </Text>
              <Text as="span" className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">
                <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
                {panel.live}
              </Text>
            </Box>
            <RichHeading as="p" heading={panel.title} className="mb-4 mt-3 font-serif text-lg font-normal leading-[1.25] text-ink" />
            <CapabilityMap panel={panel} />
            <Box className="flex items-center justify-between border-t border-ink/12 pt-3">
              <Text as="span" className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
                {panel.legend}
              </Text>
              <Box className="flex flex-wrap items-center gap-x-2.5 gap-y-1" aria-hidden="true">
                <Box className="flex items-center gap-1.5">
                  <Text as="span" className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">Low</Text>
                  <Box className="flex gap-[2px]">
                    {["bg-navy/5", "bg-navy/[0.28]", "bg-navy/[0.52]", "bg-navy"].map((c) => (
                      <span key={c} className={`size-[9px] ${c}`} />
                    ))}
                  </Box>
                  <Text as="span" className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">High</Text>
                </Box>
                <Box className="flex items-center gap-1.5 border-l border-ink/22 pl-2.5">
                  <span className={`size-[9px] ${GAP_CELL}`} />
                  <Text as="span" className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">Priority gap</Text>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box as="aside" aria-label="The Edstellar 5A methodology" className="border border-ink/12 bg-paper px-6 pb-5 pt-4 max-sm:px-4">
            <Box className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <Text as="span" className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">
                {methodology.label}
              </Text>
              <Text as="span" className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">
                {methodology.live}
              </Text>
            </Box>
            <Box as="ol" className="relative mt-4 grid list-none grid-cols-5 gap-x-1">
              {methodology.steps.map((s) => (
                <Box as="li" key={s.n} className="flex min-w-0 flex-col items-center gap-2 text-center">
                  <Text as="span" className="flex size-8 items-center justify-center rounded-full border border-ink/22 font-mono text-[11px] text-ink">
                    {s.n}
                  </Text>
                  <Text as="span" className="max-w-full break-words font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/65 max-sm:text-[8px] max-sm:tracking-normal">{s.name}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </HomeWrap>
  );
}
