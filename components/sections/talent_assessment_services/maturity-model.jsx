import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

const HEIGHT_CLASS = {
  20: "h-1/5",
  40: "h-2/5",
  60: "h-3/5",
  80: "h-4/5",
  100: "h-full",
};

const TONE_CLASS = {
  "navy-deep": "bg-navy-deep",
  navy: "bg-navy",
  "navy-soft": "bg-navy-soft",
  "lime-soft": "bg-lime-soft",
  lime: "bg-lime",
};

// Bar height and tone ascend by position. Used when the record does not carry
// its own `height`/`tone`/`light` (the CMS `maturity_model` sends only content
// and non-token hex colors, which the component does not use — it owns the
// presentation, TASTE.md §9).
const DERIVED_HEIGHT = [20, 40, 60, 80, 100];
const DERIVED_TONE = ["navy-deep", "navy", "navy-soft", "lime-soft", "lime"];

/**
 * The assessment maturity model: a five-stage ascending bar chart with a point
 * list under each stage, a highlighted note, and an expandable (`<details>`)
 * deep-dive of each level. Server Component — the read-more uses native
 * `<details>`, so no client JS.
 *
 * Reads the CMS `maturity_model` shape (`levels[].title`/`description`,
 * `subheading`, `badge_text`, `expand_title`, `business_meaning.text`) and the
 * local shape (`levels[].name`/`height`/`tone`, `lede`, `note`, `more_levels`,
 * `more_impact`) interchangeably — no adapter layer (TASTE.md §5.4). When a
 * level has no `height`/`tone`, they ascend by position.
 *
 * Design: `#maturity-model`, `.mm`, `.mm-bar`, `.mm-more-panel`.
 */
export default function MaturityModel({ data }) {
  if (!data?.levels?.length) return null;

  const { section_id, heading, axis, levels } = data;
  const lede = data.lede ?? data.subheading;
  const note = data.note ?? data.badge_text;
  const moreIntro = data.more_intro ?? data.expand_title;
  const moreLevels = data.more_levels ?? data.levels;
  const moreImpact =
    data.more_impact ??
    (typeof data.business_meaning === "string"
      ? data.business_meaning
      : data.business_meaning?.text);

  return (
    <Section id={section_id} className="bg-paper">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {lede ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
              {lede}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal>
        <Box className="no-scrollbar overflow-x-auto pb-1">
          <Box className="mx-auto min-w-165 max-w-250">
            {axis ? (
              <Text as="p" className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                {axis}
              </Text>
            ) : null}

            {/* Bars */}
            <Box className="grid h-85 grid-cols-5 items-end gap-4 border-b-2 border-ink/22">
              {levels.map((level, i) => {
                const name = level.name ?? level.title;
                const height = level.height ?? DERIVED_HEIGHT[Math.min(i, 4)];
                const tone = level.tone ?? DERIVED_TONE[Math.min(i, 4)];
                const light = level.light ?? i >= 3;
                return (
                  <Box
                    key={name ?? i}
                    className={`flex flex-col items-center rounded-t-xl px-2.5 pt-3.5 text-center ${HEIGHT_CLASS[height] ?? "h-2/5"} ${TONE_CLASS[tone] ?? "bg-navy"} ${light ? "text-navy" : "text-lime"}`}
                  >
                    <Text as="span" className="font-display text-[14px] font-bold leading-[1.15]">
                      {name}
                    </Text>
                  </Box>
                );
              })}
            </Box>

            {/* Point lists */}
            <Box className="mt-4 grid grid-cols-5 gap-4">
              {levels.map((level, i) => (
                <Box as="ul" key={level.name ?? level.title ?? i} className="flex list-none flex-col gap-1.75 p-0">
                  {level.points.map((point) => (
                    <Box
                      as="li"
                      key={point}
                      className="relative pl-4 text-[12.5px] leading-[1.4] text-ink-muted before:absolute before:left-0 before:top-[7px] before:size-1.5 before:rounded-full before:bg-lime"
                    >
                      {point}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Reveal>

      {note ? (
        <Text as="p" className="mt-6 text-center text-[15px] text-ink">
          <Box as="mark" className="rounded-lg bg-lime-soft px-3 py-1 font-semibold text-ink">
            {note}
          </Box>
        </Text>
      ) : null}

      {moreLevels?.length ? (
        <Box as="details" className="group mx-auto mt-4 max-w-225">
          <Box
            as="summary"
            className="flex cursor-pointer list-none justify-end text-[14px] text-ink-muted [&::-webkit-details-marker]:hidden"
          >
            <Text as="span" className="border-b border-lime pb-px group-open:hidden">
              Read more…
            </Text>
            <Text as="span" className="hidden border-b border-lime pb-px group-open:inline">
              Show less
            </Text>
          </Box>

          <Box className="mt-6.5">
            {moreIntro ? (
              <Text as="p" className="mb-6 text-[16px] leading-[1.7] text-ink">
                {moreIntro}
              </Text>
            ) : null}

            <Box className="mb-6 flex flex-col gap-5">
              {moreLevels.map((level, i) => {
                const name = level.name ?? level.title;
                return (
                  <Box key={name ?? i} className="flex items-start gap-4">
                    <Box
                      as="span"
                      aria-hidden="true"
                      className="grid size-7 flex-none place-items-center rounded-lg bg-navy font-display text-[13px] font-bold text-lime"
                    >
                      {level.n ?? i + 1}
                    </Box>
                    <Box>
                      <Text as="h3" className="mb-1.25 font-display text-[15px] font-medium tracking-[-0.01em] text-ink">
                        {name}
                      </Text>
                      <Text as="p" className="text-[14.5px] leading-[1.65] text-ink-muted">
                        {level.description}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {moreImpact ? (
              <Text
                as="p"
                className="border-t border-ink/12 pt-5 text-[14.5px] leading-[1.65] text-ink-muted [&_b]:font-semibold [&_b]:text-ink"
                dangerouslySetInnerHTML={{ __html: moreImpact }}
              />
            ) : null}
          </Box>
        </Box>
      ) : null}
    </Section>
  );
}
