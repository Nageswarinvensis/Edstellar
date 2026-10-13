import { ArrowRight, Clock3 } from "lucide-react";
import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

function formatDuration(duration) {
  if (!duration) return null;
  const range = String(duration).match(/^(\d+)\s*-\s*(\d+)$/);
  if (range) return `${range[1]} - ${range[2]} hrs`;
  return /^\d+$/.test(String(duration).trim()) ? `${duration} hrs` : duration;
}

function resolveHref(href) {
  if (!href) return "#";
  if (href.startsWith("/") || href.startsWith("http")) return href;
  return `/corporate-training/${href}`;
}

function ProgramCard({ program }) {
  return (
    <Box
      as="a"
      href={resolveHref(program.href)}
      title={`Click Here to View ${program.title}`}
      className={[
        "group relative block min-w-0 overflow-hidden rounded-[16px] border",
        "border-ink/12 bg-white",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-[#0a162838]",
        "hover:shadow-[0_20px_42px_-26px_rgba(10,22,40,0.5)]",
        program.is_featured
          ? "border-navy-soft bg-navy-soft text-white shadow-[0_14px_30px_rgba(10,22,40,0.14)]"
          : "",
      ].join(" ")}
    >
      <Box
        className={[
          "relative mx-3 mt-3 h-27.5 overflow-hidden rounded-[9px]",
          program.is_featured ? "bg-navy-soft" : "bg-[#F0EEE6]",
        ].join(" ")}
      >
        {program.image ? (
          <Image
            src={program.image}
            alt={program.image_alt || program.title || ""}
            title={program.image_title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : null}
      </Box>

      <Box className="flex min-h-51.25 flex-col px-3.5 pb-4 pt-3">
        <Text
          as="p"
          className={[
            "mb-2 font-mono text-[8px] uppercase tracking-[0.15em]",
            program.is_featured ? "text-paper/60" : "text-ink/60",
          ].join(" ")}
        >
          {program.eyebrow}
        </Text>

        <Text
          as="h3"
          className={[
            "max-w-55 text-[15px] font-semibold leading-[1.15] --tw-tracking: -0.025em",
            program.is_featured ? "text-white" : "text-ink",
          ].join(" ")}
        >
          {program.title}
        </Text>

        <Text
          as="p"
          className={[
            "mt-2 text-[11px] --tw-leading: 1.5",
            program.is_featured ? "text-paper/65" : "text-ink/60",
          ].join(" ")}
        >
          {program.description}
        </Text>

        <Box className="mt-auto pt-5">
          <Box
            className={[
              "flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em]",
              program.is_featured ? "text-white/60" : "text-ink/60",
            ].join(" ")}
          >
            <Clock3 size={11} strokeWidth={1.5} className="shrink-0" />

            <span className="text-[10px]">{program.duration}</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function ProgramConnector() {
  return (
    <Box
      aria-hidden="true"
      className="hidden items-center justify-center lg:flex"
    >
      <Box className="flex size-5 items-center justify-center rounded-full border border-ink/12 bg-white text-[10px] text-ink/60">
        →
      </Box>
    </Box>
  );
}

function RelatedCourseCard({ course }) {
  // The CMS does not send durations for related courses yet (`null`), so
  // they fall back to the typical range until it does.
  const duration = formatDuration(course.duration ?? "16 - 24");

  return (
    <Box
      as="a"
      // The CMS sends some slugs with a trailing slash ("ai/"), which would
      // cost a 308 redirect on every click.
      href={`/corporate-training/${String(course.slug).replace(/\/+$/, "")}`}
      title={`Click Here to View ${course.name}`}
      className="group flex h-full flex-col rounded-[14px] border border-ink/12 bg-white p-6 no-underline transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-ink/22 hover:shadow-[0_20px_42px_-26px_rgba(10,22,40,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[600px]:p-5"
    >
      <Text
        as="h3"
        className="text-[16px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink"
      >
        {course.name}
      </Text>

      <Box className="mt-auto pt-4">
        {/* Meta: quiet mono facts, dot-separated */}
        <Box className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase leading-[1.4] tracking-[0.14em] text-ink/60">
          {duration ? (
            <>
              <span>{duration}</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink/30" />
            </>
          ) : null}
          <span>Instructor-led</span>
        </Box>

        {/* Action: body type, ink, set off by a rule — reads as a link,
            not as more meta */}
        <Box className="mt-4 border-t border-ink/12 pt-3.5">
          <Text
            as="span"
            className="inline-flex items-center gap-1.5 font-body text-[14px] font-semibold leading-[1.4] text-ink transition-colors duration-200 group-hover:text-olive"
          >
            View course
            <ArrowRight
              size={15}
              strokeWidth={2.25}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default function WhyEds({ data, relatedCourses }) {
  if (!data) return null;

  const programs = data.dynamic_data ?? data.programs;
  const description = data.subhead ?? data.description;
  const relatedCourseItems = relatedCourses?.dynamic_data;

  if (!programs?.length) return null;

  return (
    <Section
      id="adjacent-programs"
      className="relative border-b border-ink/12 bg-paper-warm"
    >
      <Box>
        <Reveal>
          <RichHeading heading={data.heading} className="mb-4 max-w-[20ch]" />
        </Reveal>

        {description && (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mb-10 max-w-[72ch] text-[15px] leading-[1.65]]"
            >
              {description}
            </Text>
          </Reveal>
        )}

        <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_48px_1fr_48px_1fr_48px_1fr] lg:items-stretch lg:gap-0">
          {programs.map((program, index) => (
            <Box key={program.id} className="contents">
              <Reveal delay={2}>
                <ProgramCard program={program} />
              </Reveal>

              {index < programs.length - 1 && <ProgramConnector />}
            </Box>
          ))}
        </Box>

        {relatedCourseItems?.length > 0 && (
          <Box className="mt-12 sm:mt-14 lg:mt-16">
            <RichHeading
              as="h3"
              heading={relatedCourses.heading}
              className="mb-7 text-[22px] font-bold leading-[1.2] tracking-[-0.02em] max-[600px]:mb-5 max-[600px]:text-[20px] max-[600px]:leading-[1.2]"
            />

            <Box className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCourseItems.map((course) => (
                <Reveal key={course.slug} delay={3} className="h-full">
                  <RelatedCourseCard course={course} />
                </Reveal>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Section>
  );
}
