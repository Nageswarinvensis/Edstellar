import { Check } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * The concept section shared across the talent-assessment family: a decorative
 * illustration beside the principles behind the method. The illustration is
 * chosen by `data.art` so each sub-page shows the right diagram — `behavior-map`
 * (default) for the pillar, `competency-grid` for assessment/development centers.
 * Server Component with inline SVG/markup illustrations (the established
 * pattern — see `organizational_development_consulting/shift-section.jsx`).
 *
 * Design: `#concept`, `.ib`, `.ib-art`, `.ib-list`.
 */

/**
 * Example exercise × competency grid. All of it — column headers, row labels,
 * which cells are observed and the footer caption — comes from the content
 * record (`concept.grid`); nothing is hardcoded here, so each page supplies its
 * own. Renders nothing if the data is absent.
 */
function CompetencyGrid({ grid }) {
  const columns = grid?.columns ?? [];
  const rows = grid?.rows ?? [];
  if (!columns.length || !rows.length) return null;

  // Laid out for a four-competency grid (what this design uses); the labels,
  // cells and caption are all data.
  return (
    <Box className="rounded-[18px] border border-ink/12 bg-white p-5">
      <Box className="grid grid-cols-[88px_repeat(4,1fr)] items-end gap-1.5">
        <span />
        {columns.map((col) => (
          <Text
            as="span"
            key={col}
            className="text-center font-body text-[11px] font-semibold leading-[1.2] text-ink"
          >
            {col}
          </Text>
        ))}
        {rows.map((row) => (
          <Box as="span" key={row.label} className="contents">
            <Text
              as="span"
              className="rounded-md bg-paper-warm px-2 py-2.5 font-display text-[12px] font-bold text-ink"
            >
              {row.label}
            </Text>
            {row.seen.map((seen, index) => (
              <span
                key={columns[index]}
                className="grid place-items-center rounded-md bg-paper-warm py-2.5"
              >
                {seen ? (
                  <span className="grid size-5.5 place-items-center rounded-full bg-navy text-lime">
                    <Check size={13} strokeWidth={3} aria-hidden="true" />
                  </span>
                ) : (
                  <span aria-hidden="true" className="size-2.5 rounded-full bg-paper-cream" />
                )}
              </span>
            ))}
          </Box>
        ))}
      </Box>
      {grid.caption ? (
        <Box className="mt-3.5 rounded-full bg-lime py-2 text-center">
          <Text as="span" className="font-display text-[13px] font-bold text-navy">
            {grid.caption}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}

// Fixed plot geometry; the labels that sit at each point come from the data.
const MAP_POSITIONS = [
  { cx: 150, cy: 100, lx: 106, className: "fill-navy" },
  { cx: 352, cy: 96, lx: 308, className: "fill-lime" },
  { cx: 146, cy: 250, lx: 102, className: "fill-white" },
  { cx: 338, cy: 262, lx: 294, className: "fill-lime-soft" },
];

/**
 * The behavior map illustration. Every label — the two axes, the four plotted
 * points and the caption — comes from `concept.map`; only the plot geometry is
 * fixed here. Renders nothing if the data is absent.
 */
function BehaviorMap({ map }) {
  if (!map?.nodes?.length) return null;

  const axes = map.axes ?? {};
  const nodes = map.nodes
    .slice(0, MAP_POSITIONS.length)
    .map((label, index) => ({ ...MAP_POSITIONS[index], label }));

  return (
    <svg
      viewBox="0 0 460 400"
      role="img"
      aria-labelledby="behavior-map-title"
      className="block h-auto w-full"
    >
      <title id="behavior-map-title">{map.title}</title>
      <rect x="0" y="0" width="460" height="400" rx="18" className="fill-white" />
      <rect x="70" y="36" width="360" height="290" rx="16" className="fill-paper-warm" />
      <line x1="250" y1="48" x2="250" y2="314" className="stroke-ink/22" strokeWidth="1.5" strokeDasharray="5 5" />
      <line x1="82" y1="181" x2="418" y2="181" className="stroke-ink/22" strokeWidth="1.5" strokeDasharray="5 5" />
      {axes.top ? <text x="250" y="28" textAnchor="middle" className="fill-ink/60 font-body text-[12px] font-semibold">{axes.top}</text> : null}
      {axes.bottom ? <text x="250" y="344" textAnchor="middle" className="fill-ink/60 font-body text-[12px] font-semibold">{axes.bottom}</text> : null}
      {axes.left ? <text x="46" y="181" textAnchor="middle" transform="rotate(-90 46 181)" className="fill-ink/60 font-body text-[12px] font-semibold">{axes.left}</text> : null}
      {axes.right ? <text x="452" y="181" textAnchor="middle" transform="rotate(90 452 181)" className="fill-ink/60 font-body text-[12px] font-semibold">{axes.right}</text> : null}
      {nodes.map((dot) => (
        <g key={dot.label}>
          <circle cx={dot.cx} cy={dot.cy} r="11" className={`${dot.className} stroke-navy`} strokeWidth="2" />
          <rect x={dot.lx} y={dot.cy + 16} width="88" height="24" rx="12" className="fill-white" />
          <text x={dot.lx + 44} y={dot.cy + 32} textAnchor="middle" className="fill-ink font-body text-[12px] font-semibold">{dot.label}</text>
        </g>
      ))}
      {map.caption ? (
        <>
          <rect x="120" y="356" width="220" height="34" rx="17" className="fill-navy" />
          <text x="230" y="378" textAnchor="middle" className="fill-white font-display text-[13px] font-bold">{map.caption}</text>
        </>
      ) : null}
    </svg>
  );
}

export default function Concept({ data }) {
  if (!data?.principles?.length) return null;

  const { section_id, heading, description, principles, art, grid, map, svg_image } = data;

  return (
    <Section id={section_id} className="bg-paper-warm">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-[minmax(0,420px)_1fr] items-center gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-7">
        <Reveal>
          <Box as="figure" className="m-0 max-[900px]:mx-auto max-[900px]:max-w-[420px]">
            {/* A page's own diagram from the CMS (`svg_image`) wins over the
                built-in ones picked by `art`. */}
            {svg_image ? (
              <Box
                className="[&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: svg_image }}
              />
            ) : art === "competency-grid" ? (
              <CompetencyGrid grid={grid} />
            ) : (
              <BehaviorMap map={map} />
            )}
          </Box>
        </Reveal>

        <Box as="ol" className="m-0 grid list-none gap-4 p-0">
          {principles.map((item, index) => {
            const isLast = index === principles.length - 1;
            return (
              <Reveal as="li" key={item.title} delay={Math.min(index + 1, 4)}>
                <Box className="flex gap-4.5 rounded-2xl border border-ink/12 bg-white px-6.5 py-6 max-[600px]:gap-3.5 max-[600px]:p-5">
                  <Box
                    as="span"
                    aria-hidden="true"
                    className={`flex size-9 flex-none items-center justify-center rounded-full font-display text-[15px] font-bold ${
                      isLast ? "bg-lime text-navy" : "bg-navy text-lime"
                    }`}
                  >
                    {index + 1}
                  </Box>
                  <Box>
                    <Text
                      as="h3"
                      className="mb-1.5 mt-1 font-display text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-ink"
                    >
                      {item.title}
                    </Text>
                    <Text as="p" className="text-[15px] leading-[1.6] text-ink-muted">
                      {item.description}
                    </Text>
                  </Box>
                </Box>
              </Reveal>
            );
          })}
        </Box>
      </Box>
    </Section>
  );
}
