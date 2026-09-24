import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Clock,
  FileText,
  FlaskConical,
  Layers,
  Lightbulb,
  Settings,
  Target,
  Users,
} from "lucide-react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import SecCta from "@/components/common/sec-cta";
import CurriculumModules from "@/components/sections/course/curriculum-modules";
import { cn } from "@/lib/utils";

// One semantic color per learning phase, used consistently across the step
// icons, the split bar and its legend — the source design actually swaps
// "learn" and "practice" between its method box and its module badges
// (`CurriculumModules`'s own `BAND_CLASSES`), so rather than reproduce that
// inconsistency this picks one mapping and applies it everywhere.
const STEP_ICONS = {
  assess: ClipboardList,
  learn: BookOpen,
  practice: Settings,
  apply: Target,
};

const STEP_ICON_CLASSES = {
  assess: "bg-slate-100 text-slate-500",
  learn: "bg-blue-50 text-blue-600",
  practice: "bg-green-50 text-green-600",
  apply: "bg-violet-50 text-violet-600",
};

const SEGMENT_CLASSES = {
  assess: "bg-slate-400",
  learn: "bg-blue-300",
  practice: "bg-lime",
  apply: "bg-indigo-800",
};

const LEGEND_DOT_CLASSES = {
  assess: "bg-slate-400",
  learn: "bg-blue-300",
  practice: "bg-lime",
  apply: "bg-indigo-800",
};

// Chip icon + tint pairs, assigned by position like `about.jsx`'s
// `CHIP_ICONS` — `method.formats`/`summary_pills` are plain string arrays
// with no per-item metadata. Colors are the source's own (no matching
// token), same rationale as `skill-progression.jsx`'s arbitrary hex.
const FORMAT_CHIP_META = [
  { icon: Users, bg: "bg-[#edf3fe]", iconColor: "text-[#2563eb]" },
  { icon: Calendar, bg: "bg-[#eaf7ee]", iconColor: "text-[#16a34a]" },
  { icon: Layers, bg: "bg-[#f1ebfd]", iconColor: "text-[#7c3aed]" },
];

// Maps backend icon slugs to Lucide components for "Delivered as" chips.
const DELIVERY_ICON_MAP = {
  users: Users,
  calendar: Calendar,
  "calendar-days": CalendarDays,
  "calendar-check": CalendarCheck,
  layers: Layers,
  "file-text": FileText,
  clock: Clock,
};

const SUMMARY_PILL_META = [
  { icon: FlaskConical, bg: "bg-[#f1f3f6]", iconColor: "text-[#64748b]" },
  { icon: FileText, bg: "bg-[#e9f6f1]", iconColor: "text-[#0e9f6e]" },
  { icon: Clock, bg: "bg-[#fdf2e3]", iconColor: "text-[#d97706]" },
];

/**
 * The trailing three "Delivered as" pills (flask/file/clock) are the
 * `curriculum.meta` stats reworded as chips — `modules` is excluded, it's
 * already shown in the meta row above. Sourced from `meta` rather than the
 * CMS's own free-text `method.summary_pills`, which isn't consistently
 * shaped course to course (sometimes delivery-format text, sometimes these
 * same stats again).
 */
const META_PILL_FIELDS = [
  { label: "hands-on labs", format: (value) => `${value} labs` },
  { label: "capstone", format: (value) => `${value} capstone` },
  { label: "hours", format: (value) => `${value} hours` },
];

function MethodChip({ meta, children }) {
  const { icon: Icon, bg, iconColor } = meta;
  return (
    <Text
      as="span"
      className={cn(
        "inline-flex items-center gap-1.25 rounded-full px-2.75 py-1.5 text-[11px] font-medium text-ink",
        bg,
      )}
    >
      <Icon
        size={12}
        strokeWidth={2}
        className={iconColor}
        aria-hidden="true"
      />
      {children}
    </Text>
  );
}

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
 * Plain string with the lead phrase wrapped in `<b>...</b>` — same
 * convention as `RichHeading`'s `<span>` for its italic phrase. Used for
 * the tip note and the "Delivered as" summary note, both of which bold
 * only their opening clause in the design (`.eds-mtr-tip p b`,
 * `.eds-mtr-note b`).
 */
function BoldLead({ text }) {
  if (typeof text !== "string" || !text) return null;

  return text.split(/(<b>[\s\S]*?<\/b>)/g).map((fragment, index) => {
    const match = fragment.match(/^<b>([\s\S]*?)<\/b>$/);
    return match ? (
      <b key={index} className="font-semibold text-ink">
        {match[1]}
      </b>
    ) : (
      fragment
    );
  });
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
    author_credit,
    method,
    modules,
    section_cta,
  } = curriculum;

  return (
    <Section
      id="curriculum"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))]"
    >
      <Reveal delay={1}>
        <RichHeading heading={heading} className="mb-6.5 max-w-[24ch]" />
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

        {author_credit ? (
          <Reveal delay={2}>
            <Box className="w-full max-w-100 rounded-[14px] border border-ink/12 bg-white p-3.75 transition-[border-color,box-shadow] duration-300 hover:border-ink/20 hover:shadow-[0_16px_36px_-28px_rgba(10,22,40,0.45)]">
              <Box className="mb-2 flex items-center gap-2.5">
                <Image
                  src="/course/Avatar.webp"
                  alt=""
                  width={44}
                  height={24}
                  className="h-6.5 w-auto flex-none object-contain"
                />
                <Text
                  as="h3"
                  className="min-w-0 font-display text-[12.5px] leading-[1.3] font-semibold tracking-[-0.01em] text-ink"
                >
                  {author_credit.title}
                </Text>
              </Box>
              <Text as="p" className="text-[11.5px] leading-[1.55] text-ink/60">
                {author_credit.description}
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
                <b className="font-semibold text-ink">{item.value}</b>{" "}
                {item.label}
              </Text>
            ))}
          </Box>
        </Reveal>
      ) : null}

      {method ? (
        <Reveal delay={2}>
          <Box
            className={[
              "mt-1.5 mb-7.5 grid grid-cols-1 gap-6 rounded-2xl border border-ink/12 bg-white p-6.5 max-sm:p-5",
              method.media ? "lg:grid-cols-[1fr_0.46fr] lg:items-stretch" : "",
            ].join(" ")}
          >
            <Box>
              <Box className="flex flex-wrap items-start gap-3.5 max-md:flex-col md:gap-5">
                {method.steps?.map((step, index) => {
                  const phaseKey = step.id ?? step.label?.toLowerCase();
                  const StepIcon = STEP_ICONS[phaseKey];

                  return (
                    <Box
                      key={step.label}
                      className="flex flex-1 items-start gap-3.5 max-md:w-full"
                    >
                      <Box className="flex w-full items-start gap-3 text-left md:flex-col md:items-center md:text-center">
                        {StepIcon ? (
                          <Box
                            className={[
                              "grid size-9 flex-none place-items-center rounded-full md:mb-2.25 md:size-11",
                              STEP_ICON_CLASSES[phaseKey] ||
                                "bg-paper-warm text-ink/60",
                            ].join(" ")}
                          >
                            <StepIcon
                              size={17}
                              strokeWidth={1.9}
                              className="md:hidden"
                              aria-hidden="true"
                            />
                            <StepIcon
                              size={20}
                              strokeWidth={1.9}
                              className="hidden md:block"
                              aria-hidden="true"
                            />
                          </Box>
                        ) : null}
                        <Box className="min-w-0 flex-1">
                          <Text
                            as="span"
                            className="mb-0.5 block font-display text-[15px] font-bold tracking-[-0.02em] text-ink md:mb-1.5"
                          >
                            {step.label}
                          </Text>
                          <Text
                            as="p"
                            className="text-[12.5px] leading-[1.5] text-ink/60 md:leading-[1.55]"
                          >
                            <MethodStepText parts={step.parts} />
                          </Text>
                        </Box>
                      </Box>

                      {index < method.steps.length - 1 ? (
                        <ArrowRight
                          size={18}
                          className="mt-6 flex-none text-ink/22 max-md:hidden"
                          aria-hidden="true"
                        />
                      ) : null}
                    </Box>
                  );
                })}
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
                        key={segment.phase_key}
                        className={`${SEGMENT_CLASSES[segment.phase_key]} not-first:border-l not-first:border-navy`}
                        style={{ width: `${segment.percent}%` }}
                      />
                    ))}
                  </Box>

                  <Box className="mt-3 flex flex-wrap gap-5">
                    {method.split.map((segment) => (
                      <Box
                        key={segment.phase_key}
                        className="flex items-center gap-1.75"
                      >
                        <Box
                          aria-hidden="true"
                          className={`size-2.25 flex-none rounded-[3px] ${LEGEND_DOT_CLASSES[segment.phase_key]}`}
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
                    <Box className="mt-4.5 flex items-center gap-3.25 rounded-xl bg-[#f2f6fb] px-4 py-3.5">
                      <Lightbulb
                        size={20}
                        strokeWidth={1.9}
                        className="flex-none text-[#2563eb]"
                        aria-hidden="true"
                      />
                      <Text
                        as="p"
                        className="text-[13px] leading-[1.55] text-ink/80"
                      >
                        <BoldLead text={method.note} />
                      </Text>
                    </Box>
                  ) : null}
                </Box>
              ) : null}

              {method.formats?.length ? (
                <Box className="mt-5.5 border-t border-ink/12 pt-4.5">
                  <Text
                    as="p"
                    className="mb-2.75 font-mono text-[10.5px] tracking-[0.16em] text-ink/60 uppercase"
                  >
                    Delivered as
                  </Text>

                  <Box className="flex flex-wrap gap-1">
                    {/* `formats` is the static, local set of delivery-shape
                        pills; the lab/capstone/hours pills that follow are
                        `meta` reworded as chips (see `META_PILL_FIELDS`). */}
                    {method.formats.map((item, index) => {
                      const label = typeof item === "object" ? item.label : item;
                      const IconFromApi = typeof item === "object" ? DELIVERY_ICON_MAP[item.icon] : null;
                      const baseMeta = FORMAT_CHIP_META[index] || FORMAT_CHIP_META[0];
                      const chipMeta = IconFromApi ? { ...baseMeta, icon: IconFromApi } : baseMeta;
                      return (
                        <MethodChip key={label} meta={chipMeta}>
                          {label}
                        </MethodChip>
                      );
                    })}

                    {!method.formats_complete &&
                      META_PILL_FIELDS.map((field, index) => {
                        const metaItem = meta?.find(
                          (item) => item.label === field.label,
                        );
                        if (!metaItem) return null;

                        return (
                          <MethodChip
                            key={field.label}
                            meta={SUMMARY_PILL_META[index] || SUMMARY_PILL_META[0]}
                          >
                            {field.format(metaItem.value)}
                          </MethodChip>
                        );
                      })}
                  </Box>

                  {method.summary_note ? (
                    <Text as="p" className="mt-3 text-[12.5px] text-ink/60">
                      <BoldLead text={method.summary_note} />
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
                    {method.tools_label}
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

            {method.media ? (
              <Box className="relative hidden overflow-hidden rounded-[18px] bg-paper-cream lg:block">
                <Image
                  src={method.media.src}
                  alt={method.media.alt || ""}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </Box>
            ) : null}
          </Box>
        </Reveal>
      ) : null}

      <Reveal delay={3}>
        <Box>
          <CurriculumModules modules={modules} />
        </Box>
      </Reveal>

      <SecCta {...section_cta} />
    </Section>
  );
}
