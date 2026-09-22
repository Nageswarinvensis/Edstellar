import Image from "next/image";
import { BarChart3, BookOpen, Check, Globe, Truck, Users } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import ReadMore from "@/components/common/read-more";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CustomizedTraining from "@/components/sections/course/customized-training";

/**
 * Course "about" section — richer than the domain page's `shared/about.jsx`:
 * a two-column "what's included" card (numbered program steps + a ticked
 * logistics checklist with a callout banner), a photo, and a closing chip
 * row. Kept as its own component rather than folded into the shared one,
 * since the domain page's simple prose/contrast layout has real callers
 * today and this design does not.
 *
 * `heading`, `body`, `expanded_body` and `inclusions.{label,left_columns,
 * columns}` are CMS-connected (`lib/content/courses.js` merges a real
 * `about` component's response over `COURSE_DEFAULTS.about`) — but
 * `media`, `chips` and `inclusions.banner` are fixed regardless of what
 * that component sends, stripped there before the merge.
 *
 * Design: `#about.eds-rich-sec`, `.eds-rich-grid`, `.eds-rich-incl-card`,
 * `.eds-rich-chips`.
 */

/** Icons are chosen by position, not read from content — same convention as
 * `map-section.jsx`'s `FEATURE_ICONS`. `chips` is always authored as
 * [scope, delivery format, reach], so one short fixed array covers every
 * real case; `left_columns`+`columns` together are always [program,
 * logistics] the same way. */
const INCLUSIONS_COLUMN_ICONS = [BookOpen, Truck];
const CHIP_ICONS = [BarChart3, Users, Globe];

/**
 * The CMS's real `about` component splits this card across two independent
 * arrays — `left_columns` (numbered steps, "In the program") and `columns`
 * (a ticked list, "Delivery & Logistics") — rather than one `columns` array
 * with two entries. Flattened back into one ordered list for rendering,
 * `left_columns` first, so the two-column grid layout doesn't need to know
 * about the split. `inclusions.banner` is a sibling of both arrays (not a
 * field on a column entry) and always renders inside the *last* rendered
 * column, matching where the design places it.
 */
function InclusionsCard({ inclusions }) {
  const columns = [
    ...(inclusions?.left_columns || []),
    ...(inclusions?.columns || []),
  ];
  if (!columns.length) return null;

  return (
    <Box>
      {inclusions.label ? (
        <Reveal delay={1}>
          <Text
            as="h3"
            className="inline-block border-b-[3px] border-lime pb-2.5 font-display text-[19px] leading-tight font-bold tracking-tight text-ink"
          >
            {inclusions.label}
          </Text>
        </Reveal>
      ) : null}

      <Reveal delay={2}>
        <Box className="mt-6 rounded-[20px] border border-ink/8 bg-white p-5.5 shadow-[0_30px_70px_-56px_rgba(10,22,40,0.6)]">
          <Box className="grid grid-cols-1 gap-5.5 sm:grid-cols-[1.06fr_0.94fr]">
            {columns.map((column, index) => {
              const Icon = INCLUSIONS_COLUMN_ICONS[index] || BookOpen;
              const isLast = index === columns.length - 1;

              return (
                <Box
                  key={column.heading}
                  className={[
                    "flex flex-col",
                    index > 0 ? "sm:border-l sm:border-ink/10 sm:pl-5.5" : "",
                  ].join(" ")}
                >
                  <Box className="mb-3.5 flex items-center gap-2">
                    <Box className="grid size-7 flex-none place-items-center rounded-[9px] bg-lime-soft text-ink">
                      <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                    </Box>
                    <Text
                      as="span"
                      className="rounded-[5px] bg-paper-warm px-1.75 py-1 font-mono text-[9px] font-normal tracking-[0.09em] text-ink uppercase"
                    >
                      {column.heading}
                    </Text>
                  </Box>

                  {column.steps?.length ? (
                    <Box as="ol" className="flex flex-col gap-3">
                      {column.steps.map((step, stepIndex) => (
                        <Box
                          key={step.title}
                          className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-2.75 gap-y-0.5"
                        >
                          <Text
                            as="span"
                            className="row-span-2 grid size-5.25 place-items-center rounded-full bg-lime font-mono text-[10.5px] font-semibold text-ink"
                          >
                            {stepIndex + 1}
                          </Text>
                          <Text
                            as="p"
                            className="text-[14px] leading-[1.35] font-semibold text-ink"
                          >
                            {step.title}
                          </Text>
                          <Text
                            as="p"
                            className="col-start-2 text-[13px] leading-[1.4] text-ink/60"
                          >
                            {step.description}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  ) : null}

                  {column.items?.length ? (
                    <Box as="ul" className="flex flex-col gap-2.75">
                      {column.items.map((item) => (
                        <Box
                          as="li"
                          key={item}
                          className="flex items-start gap-2.5 text-[13.5px] leading-normal font-medium text-ink"
                        >
                          <Box className="mt-0.5 grid size-3.75 flex-none place-items-center rounded-[5px] bg-lime-soft text-[#4d6208]">
                            <Check size={10} strokeWidth={3} aria-hidden="true" />
                          </Box>
                          {item}
                        </Box>
                      ))}
                    </Box>
                  ) : null}

                  {isLast && inclusions.banner ? (
                    <Box className="mt-4.5 flex items-center gap-2.5 rounded-xl bg-lime-soft px-3.25 py-2.75">
                      <Globe
                        size={18}
                        strokeWidth={1.9}
                        className="flex-none text-[#4d6208]"
                        aria-hidden="true"
                      />
                      <Text
                        as="p"
                        className="text-[12.5px] leading-[1.35] font-medium text-ink"
                      >
                        {inclusions.banner.text}
                      </Text>
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
}

function AboutChips({ chips }) {
  if (!chips?.length) return null;

  return (
    <Reveal delay={3}>
      <Box
        as="ul"
        className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4"
      >
        {chips.map((chip, index) => {
          const Icon = CHIP_ICONS[index] || Globe;

          return (
            <Box
              as="li"
              key={chip.title}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.75"
            >
              <Box className="row-span-2 grid size-8.5 flex-none place-items-center rounded-[10px] bg-lime-soft text-ink">
                <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
              </Box>
              <Text
                as="p"
                className="self-end text-[13px] font-semibold text-ink"
              >
                {chip.title}
              </Text>
              <Text as="p" className="text-[12px] text-ink/60">
                {chip.subtitle}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Reveal>
  );
}

export default function CourseAbout({ about, showCustomizedTraining = true }) {
  if (!about) return null;

  const inclusions = about.inclusions;
  const media = about.media;
  // The design floats the photo in the gutter between the two columns on a
  // wide viewport (a real grid column here, not the design's absolute+mask
  // trick — same idea, a far more robust implementation) and falls back to
  // an ordinary full-width block above `lg`, same as when there's no photo
  // at all to make room for.
  const threeCol = Boolean(inclusions && media);

  return (
    <Section id="about" className="relative border-b border-ink/12 ">
      <Box
        className={[
          "grid grid-cols-1 items-center gap-y-8.5",
          threeCol
            ? "md:grid-cols-[0.8fr_1fr] md:gap-x-12 lg:grid-cols-[0.6fr_0.42fr_0.84fr] lg:items-center lg:gap-x-9"
            : inclusions
              ? "md:grid-cols-[0.8fr_1fr] md:gap-x-12 lg:gap-x-18"
              : "",
        ].join(" ")}
      >
        <Box>
          <Reveal delay={1}>
            <RichHeading heading={about.heading} className="max-w-[16ch]" />
          </Reveal>

          <Reveal delay={1}>
            <Box className="pt-6">
              {about.body?.map((paragraph, index) => (
                <Text
                  as="p"
                  key={index}
                  className="mb-4.5 text-base leading-[1.75]"
                >
                  {paragraph}
                </Text>
              ))}

              {about.expanded_body?.length ? (
                <ReadMore showIcon>
                  {about.expanded_body.map((paragraph, index) => (
                    <Text
                      as="p"
                      key={index}
                      className="mb-4.5 text-base leading-[1.75] text-[#0A1628]"
                    >
                      {paragraph}
                    </Text>
                  ))}
                </ReadMore>
              ) : null}
            </Box>
          </Reveal>
        </Box>

        {threeCol ? (
          <Reveal delay={2} className="hidden lg:block">
            <Box className="relative mx-auto aspect-[3/4] w-full max-w-65 overflow-hidden rounded-[28px] shadow-[0_30px_70px_-40px_rgba(10,22,40,0.45)]">
              <Image
                src={media.src}
                alt={media.alt || ""}
                fill
                sizes="260px"
                className="object-cover"
              />
            </Box>
          </Reveal>
        ) : null}

        {inclusions ? (
          <Box>
            <InclusionsCard inclusions={inclusions} />
            <AboutChips chips={about.chips} />
          </Box>
        ) : null}
      </Box>

      {media ? (
        <Reveal delay={2}>
          <Box
            className={[
              "relative mt-8.5 aspect-video w-full max-w-155 overflow-hidden rounded-[20px] bg-paper-cream",
              threeCol ? "lg:hidden" : "",
            ].join(" ")}
          >
            <Image
              src={media.src}
              alt={media.alt || ""}
              fill
              sizes="(max-width: 767px) 100vw, 620px"
              className="object-cover"
            />
          </Box>
        </Reveal>
      ) : null}

      {!inclusions ? <AboutChips chips={about.chips} /> : null}

      {showCustomizedTraining ? <CustomizedTraining /> : null}
    </Section>
  );
}
