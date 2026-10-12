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

/**
 * The assessment maturity model: a five-stage ascending bar chart with a point
 * list under each stage, a highlighted note, and an expandable (`<details>`)
 * deep-dive of each level. Server Component — the read-more uses native
 * `<details>`, so no client JS.
 *
 * Design: `#maturity-model`, `.mm`, `.mm-bar`, `.mm-more-panel`.
 */
export default function MaturityModel({ data }) {
  if (!data?.levels?.length) return null;

  const { section_id, heading, lede, axis, levels, note, more_intro, more_levels, more_impact } =
    data;

  return (
    <Section id={section_id} className="bg-paper">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {lede ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
              {lede}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal>
        <Box className="no-scrollbar overflow-x-auto pb-1">
          <Box className="mx-auto min-w-165 max-w-250">
            {axis ? (
              <Text as="p" className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/60">
                {axis}
              </Text>
            ) : null}

            {/* Bars */}
            <Box className="grid h-85 grid-cols-5 items-end gap-4 border-b-2 border-ink/22">
              {levels.map((level) => (
                <Box
                  key={level.name}
                  className={`flex flex-col items-center rounded-t-xl px-2.5 pt-3.5 text-center ${HEIGHT_CLASS[level.height] ?? "h-2/5"} ${TONE_CLASS[level.tone] ?? "bg-navy"} ${level.light ? "text-navy" : "text-lime"}`}
                >
                  <Text as="span" className="font-display text-[14px] font-bold leading-[1.15]">
                    {level.name}
                  </Text>
                </Box>
              ))}
            </Box>

            {/* Point lists */}
            <Box className="mt-4 grid grid-cols-5 gap-4">
              {levels.map((level) => (
                <Box as="ul" key={level.name} className="flex list-none flex-col gap-1.75 p-0">
                  {level.points.map((point) => (
                    <Box
                      as="li"
                      key={point}
                      className="relative pl-4 text-[12.5px] leading-[1.4] text-ink/60 before:absolute before:left-0 before:top-[7px] before:size-1.5 before:rounded-full before:bg-lime"
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

      {more_levels?.length ? (
        <Box as="details" className="group mx-auto mt-4 max-w-225">
          <Box
            as="summary"
            className="flex cursor-pointer list-none justify-end text-[14px] text-ink/60 [&::-webkit-details-marker]:hidden"
          >
            <Text as="span" className="border-b border-lime pb-px group-open:hidden">
              Read more…
            </Text>
            <Text as="span" className="hidden border-b border-lime pb-px group-open:inline">
              Show less
            </Text>
          </Box>

          <Box className="mt-6.5">
            {more_intro ? (
              <Text as="p" className="mb-6 text-[16px] leading-[1.7] text-ink">
                {more_intro}
              </Text>
            ) : null}

            <Box className="mb-6 flex flex-col gap-5">
              {more_levels.map((level) => (
                <Box key={level.name} className="flex items-start gap-4">
                  <Box
                    as="span"
                    aria-hidden="true"
                    className="grid size-7 flex-none place-items-center rounded-lg bg-navy font-display text-[13px] font-bold text-lime"
                  >
                    {level.n}
                  </Box>
                  <Box>
                    <Text as="h3" className="mb-1.25 font-display text-[15px] font-bold tracking-[-0.01em] text-ink">
                      {level.name}
                    </Text>
                    <Text as="p" className="text-[14.5px] leading-[1.65] text-ink/60">
                      {level.description}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>

            {more_impact ? (
              <Text
                as="p"
                className="border-t border-ink/12 pt-5 text-[14.5px] leading-[1.65] text-ink/60 [&_b]:font-semibold [&_b]:text-ink"
                dangerouslySetInnerHTML={{ __html: more_impact }}
              />
            ) : null}
          </Box>
        </Box>
      ) : null}
    </Section>
  );
}
