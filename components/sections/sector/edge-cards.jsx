import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/common/section-head";

/**
 * The design's own line icons for these cards, by `item.icon` — the `.ic`
 * SVG strokes from the sector pages. Anything unmapped gets the chart.
 */
const ICON_PATHS = {
  building: <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />,
  award: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="m8.5 12.5-1.5 8.5 5-3 5 3-1.5-8.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  sliders: (
    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 3 3 4-5" />
    </>
  ),
};

/**
 * "The Edstellar Edge" — a 3-up grid of white cards, each with a lime-soft
 * icon tile, a title and one line of copy. Cards in a row share one height.
 *
 * `data`: `section_id`, `heading` (emphasis in `<span>`), `items`
 * `{ icon, title, description }[]` (`icon`: a key of `ICON_PATHS`).
 *
 * Design: government-employees-training-courses / training-for-universities
 * `[data-cmp="why-assessments"]` `#why .grid.g3`, `.why-card`, `.ic`.
 */
export default function EdgeCards({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, items } = data;

  return (
    <Section id={section_id} className="bg-paper-warm">
      <SectionHead heading={heading} align="start" />

      <Box className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={(index % 3) + 1} className="h-full">
            <Box className="flex h-full flex-col rounded-[14px] border border-ink/12 bg-white p-7 transition-[transform,box-shadow] duration-250 hover:-translate-y-1.25 hover:shadow-lift motion-reduce:hover:translate-y-0">
              <Box
                aria-hidden="true"
                className="mb-4 flex size-10.5 items-center justify-center rounded-[11px] bg-lime-soft text-navy"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5.5"
                >
                  {ICON_PATHS[item.icon] ?? ICON_PATHS.chart}
                </svg>
              </Box>
              <Text as="h3" className="mb-2 text-[16px] leading-[1.3] tracking-[-0.01em]">
                {item.title}
              </Text>
              <Text as="p" className="text-[14px] leading-[1.6]">
                {item.description}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
