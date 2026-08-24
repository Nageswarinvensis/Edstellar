import { ArrowRight, Star } from "lucide-react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";
import SecCta from "@/components/shared/sec-cta";
import CurriculumModules from "@/components/sections/course/curriculum-modules";

const SEGMENT_CLASSES = {
  learn: "bg-lime-soft",
  practice: "bg-lime",
  apply: "bg-navy",
};

const LEGEND_DOT_CLASSES = {
  learn: "border border-ink/22 bg-lime-soft",
  practice: "bg-lime",
  apply: "bg-navy",
};

function MethodStepText({ parts = [] }) {
  return parts.map((part, index) =>
    part.strong ? (
      <strong key={index} className="font-semibold text-ink">
        {part.text}
      </strong>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

/**
 * Course curriculum — heading, the review badge, the Learn / Practice
 * / Apply method breakdown, and the filterable module accordion.
 *
 * Design: `section#curriculum.block.section`, `.cur-head`, `.cur-method`,
 * `.rev-badge`, `.sec-cta`. The reviewed-by avatar strip is not reproduced —
 * it borrows the hero's trainer roster, and this section only receives its
 * own data.
 */
export default function Curriculum({ curriculum }) {
  if (!curriculum?.modules?.length) return null;

  const {
    heading,
    description,
    meta,
    badge,
    method,
    filters,
    modules,
    sectionCta,
  } = curriculum;

  return (
    <Section
      id="curriculum"
      className="scroll-mt-[calc(68px_+_var(--mobile-toc-h,0px)_+_16px)] border-t border-ink/10"
    >
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={heading.parts}
          className="mb-6.5 max-w-[24ch] tracking-[-0.03em]"
        />
      </Reveal>

      <Box className="mb-7">
        <Reveal delay={2}>
          <Text
            as="p"
            className="mb-4 max-w-[64ch] text-[16.5px] leading-[1.7] text-ink/60"
          >
            {description}
          </Text>
        </Reveal>

        {badge ? (
          <Reveal delay={2}>
            <Box className="w-full max-w-[330px] rounded-[14px] border border-ink/12 bg-white p-3.75 transition-[border-color,box-shadow] duration-300 hover:border-ink/20 hover:shadow-[0_16px_36px_-28px_rgba(10,22,40,0.45)]">
              <Box className="mb-2 flex items-center gap-2.5">
                <Box className="flex size-6.5 flex-none items-center justify-center rounded-[8px] bg-lime-soft text-navy">
                  <Star size={12} strokeWidth={0} fill="currentColor" />
                </Box>
                <Text
                  as="h3"
                  className="min-w-0 font-display text-[12.5px] leading-[1.3] font-semibold tracking-[-0.01em] text-ink"
                >
                  {badge.title}
                </Text>
              </Box>
              <Text as="p" className="text-[11.5px] leading-[1.55] text-ink/60">
                {badge.description}
              </Text>
            </Box>
          </Reveal>
        ) : null}
      </Box>

      {meta?.length ? (
        <Reveal delay={2}>
          <Box className="mb-7.5 flex flex-wrap gap-x-5 gap-y-1.5 border-y border-ink/12 py-3.5 font-mono text-[11px] tracking-[0.09em] text-ink/60 uppercase">
            {meta.map((item) => (
              <Text as="span" key={item.label}>
                <b className="font-semibold text-ink">{item.value}</b> {item.label}
              </Text>
            ))}
          </Box>
        </Reveal>
      ) : null}

      {method ? (
        <Reveal delay={2}>
          <Box className="mt-1.5 mb-7.5 rounded-2xl border border-ink/12 bg-white px-7 py-6.5 max-sm:px-5">
            <Box className="flex flex-wrap items-start gap-5 max-md:flex-col">
              {method.steps?.map((step, index) => (
                <Box
                  key={step.label}
                  className="flex flex-1 items-start gap-3.5 max-md:w-full"
                >
                  <Box className="min-w-0 flex-1">
                    <Text
                      as="span"
                      className="mb-1.5 block font-display text-[15px] font-bold tracking-[-0.02em] text-ink"
                    >
                      {step.label}
                    </Text>
                    <Text
                      as="p"
                      className="text-[12.5px] leading-[1.55] text-ink/60"
                    >
                      <MethodStepText parts={step.parts} />
                    </Text>
                  </Box>

                  {index < method.steps.length - 1 ? (
                    <ArrowRight
                      size={18}
                      className="mt-1 flex-none text-ink/22 max-md:hidden"
                      aria-hidden="true"
                    />
                  ) : null}
                </Box>
              ))}
            </Box>

            {method.split?.length ? (
              <Box className="mt-6 border-t border-ink/12 pt-5.5">
                <Box
                  role="img"
                  aria-label={method.split
                    .map(
                      (segment) =>
                        `${segment.label} ${segment.percent} percent`,
                    )
                    .join(", ")}
                  className="flex h-2.5 overflow-hidden rounded-full bg-paper-warm"
                >
                  {method.split.map((segment) => (
                    <Box
                      key={segment.key}
                      className={`${SEGMENT_CLASSES[segment.key]} not-first:border-l not-first:border-navy`}
                      style={{ width: `${segment.percent}%` }}
                    />
                  ))}
                </Box>

                <Box className="mt-3 flex flex-wrap gap-5">
                  {method.split.map((segment) => (
                    <Box
                      key={segment.key}
                      className="flex items-center gap-1.75"
                    >
                      <Box
                        aria-hidden="true"
                        className={`size-2.25 flex-none rounded-[3px] ${LEGEND_DOT_CLASSES[segment.key]}`}
                      />
                      <Text
                        as="span"
                        className="font-mono text-[10.5px] tracking-[0.08em] text-ink/60 uppercase"
                      >
                        {segment.label} {segment.percent}%
                      </Text>
                    </Box>
                  ))}
                </Box>

                {method.note ? (
                  <Text
                    as="p"
                    className="mt-[13px] max-w-[76ch] text-[12px] leading-[1.6] text-ink/60"
                  >
                    {method.note}
                  </Text>
                ) : null}
              </Box>
            ) : null}

            {method.formats?.length ? (
              <Box className="mt-5 flex flex-wrap items-center gap-2.25 border-t border-ink/12 pt-4.5">
                <Text
                  as="span"
                  className="font-mono text-[10px] tracking-[0.14em] text-ink/60 uppercase"
                >
                  Delivered as
                </Text>
                {method.formats.map((format) => (
                  <Text
                    key={format}
                    as="span"
                    className="rounded-full bg-paper-warm px-3.5 py-1.5 text-[12.5px] font-medium text-ink"
                  >
                    {format}
                  </Text>
                ))}

                {method.capsule?.map((item) => (
                  <Text
                    key={item}
                    as="span"
                    className="rounded-full border border-ink/22 bg-white px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.03em] text-ink"
                  >
                    {item}
                  </Text>
                ))}

                {method.capsuleNote ? (
                  <Text as="span" className="ml-auto text-[12px] text-ink/60">
                    {method.capsuleNote}
                  </Text>
                ) : null}
              </Box>
            ) : null}

            {method.tools?.length ? (
              <Box className="mt-5.5 border-t border-ink/12 pt-5">
                <Text
                  as="p"
                  className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink"
                >
                  {method.toolsLabel}
                </Text>

                <Box className="mt-3 flex flex-wrap gap-2">
                  {method.tools.map((tool) => (
                    <Text
                      key={tool}
                      as="span"
                      className="rounded-full bg-paper-warm px-3.5 py-1.5 text-[12.5px] font-medium text-ink"
                    >
                      {tool}
                    </Text>
                  ))}
                </Box>
              </Box>
            ) : null}
          </Box>
        </Reveal>
      ) : null}

      <Reveal delay={3}>
        <Box>
          <CurriculumModules filters={filters} modules={modules} />
        </Box>
      </Reveal>

      <SecCta {...sectionCta} />
    </Section>
  );
}
