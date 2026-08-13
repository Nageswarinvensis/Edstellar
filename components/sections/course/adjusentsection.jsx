import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";

function ProgramCard({ program }) {
  return (
    <Box
      as="a"
      href={program.href}
      className={[
        "group relative block min-w-0 overflow-hidden rounded-[14px] border",
        "border-ink/12 bg-white",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-[#07162C]",
        "hover:bg-[#07162C] hover:shadow-[0_18px_35px_rgba(10,22,40,0.18)]",
        program.featured
          ? "border-[#07162C] bg-[#07162C] text-white shadow-[0_14px_30px_rgba(10,22,40,0.14)]"
          : "",
      ].join(" ")}
    >
      {/* Image */}
      <Box className="relative mx-3 mt-3 h-[110px] overflow-hidden rounded-[9px] bg-[#F0EEE6]">
        <Image
          src={program.image}
          alt={program.imageAlt}
          title={program.imageTitle}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </Box>

      {/* Content */}
      <Box className="flex min-h-[205px] flex-col px-3.5 pb-4 pt-3">
        {/* Eyebrow */}
        <Text
          as="p"
          className={[
            "mb-2 font-mono text-[8px] uppercase tracking-[0.15em]",
            program.featured
              ? "text-paper/60"
              : "text-ink/60 group-hover:text-paper/60",
          ].join(" ")}
        >
          {program.eyebrow}
        </Text>

        {/* Title */}
        <Text
          as="h3"
          className={[
            "max-w-[220px] text-[15px] font-semibold leading-[1.15] tracking-[-0.025em]",
            program.featured
              ? "text-white"
              : "text-ink group-hover:text-white",
          ].join(" ")}
        >
          {program.title}
        </Text>

        {/* Description */}
        <Text
          as="p"
          className={[
            "mt-2 text-[11px] leading-[1.5]",
            program.featured
              ? "text-paper/65"
              : "text-ink/60 group-hover:text-paper/65",
          ].join(" ")}
        >
          {program.description}
        </Text>

        {/* Duration */}
        <Box className="mt-auto pt-5">
          <Text
            as="span"
            className={[
              "font-mono text-[8px] uppercase tracking-[0.14em]",
              program.featured
                ? "text-paper/60"
                : "text-ink/60 group-hover:text-paper/60",
            ].join(" ")}
          >
            ◷&nbsp;&nbsp;{program.duration}
          </Text>
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
      <Box className="flex size-[20px] items-center justify-center rounded-full border border-ink/12 bg-white text-[10px] text-ink/60">
        →
      </Box>
    </Box>
  );
}

function RelatedCourseCard({ course }) {
  return (
    <Box
      as="a"
      href={course.href}
      className="group relative flex min-h-[110px] flex-col rounded-[12px] border border-ink/12 bg-white px-4 py-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#07162C] hover:shadow-[0_14px_28px_rgba(10,22,40,0.12)]"
    >
      {/* Title */}
      <Text
        as="h3"
        className="pr-4 text-[14px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink transition-colors duration-200"
      >
        {course.title}
      </Text>

      {/* Meta */}
      <Box className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <Text
          as="span"
          className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/60"
        >
          {course.meta}
        </Text>

        <Text
          as="span"
          className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/60"
        >
          {course.type}
        </Text>
      </Box>

      {/* View course */}
      <Text
        as="span"
        className="mt-auto pt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-ink/60 transition-transform duration-200 group-hover:translate-x-1"
      >
        VIEW COURSE →
      </Text>
    </Box>
  );
}

export default function AdjacentSection({ data }) {
  if (!data) return null;

  return (
    <Section
      id="adjacent-programs"
      className="relative border-b border-ink/12 bg-[#F3F1E8] py-20 sm:py-24 lg:py-[120px]"
    >
      <Box className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">

        {/* =========================================================
            HEADING
        ========================================================== */}
        <Reveal delay={0}>
          <RichHeading
            as="h2"
            parts={data.headingParts}
            className="mb-4 max-w-[20ch]"
          />
        </Reveal>

        {/* =========================================================
            DESCRIPTION
        ========================================================== */}
        <Reveal delay={1}>
          <Text
            as="p"
            className="mb-10 max-w-[72ch] text-[15px] leading-[1.65] text-ink/60 sm:text-[16px]"
          >
            {data.description}
          </Text>
        </Reveal>

        {/* =========================================================
            ADJACENT PROGRAMS
        ========================================================== */}
        <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_24px_1fr_24px_1fr_24px_1fr] lg:items-stretch lg:gap-0">
          {data.programs.map((program, index) => (
            <Box key={program.id} className="contents">
              <Reveal delay={index + 1}>
                <ProgramCard program={program} />
              </Reveal>

              {index < data.programs.length - 1 && (
                <ProgramConnector />
              )}
            </Box>
          ))}
        </Box>

        {/* =========================================================
            RELATED COURSES
        ========================================================== */}
        <Box className="mt-12 sm:mt-14 lg:mt-16">
          <Text
            as="h3"
            className="mb-5 text-[16px] font-semibold tracking-[-0.02em] text-ink"
          >
            {data.relatedLabel}
          </Text>

          <Box className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {data.relatedCourses?.map((course, index) => (
              <Reveal key={course.title} delay={(index % 3) + 1}>
                <RelatedCourseCard course={course} />
              </Reveal>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}