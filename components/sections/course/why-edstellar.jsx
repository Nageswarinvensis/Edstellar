import { Clock3 } from "lucide-react";
import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";

function ProgramCard({ program }) {
  return (
    <Box
      as="a"
      href={program.href}
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
        <Image
          src={program.image}
          alt={program.image_alt}
          title={program.image_title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
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
  return (
    <Box
      as="a"
      href={course.href}
      className="group relative flex h-full min-h-27.5 flex-col rounded-[12px] border border-ink/12 bg-white px-4 py-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#0a162838] hover:shadow-[0_20px_42px_-26px_rgba(10,22,40,0.5)]"
    >
      <Text
        as="h3"
        className="pr-4 text-[14px] font-semibold --tw-leading: 1.25 tracking-[-0.02em] text-ink transition-colors duration-200"
      >
        {course.title}
      </Text>

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

      <Text
        as="span"
        className="mt-auto pt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-ink/60"
      >
        {course.cta}
      </Text>
    </Box>
  );
}

export default function WhyEds({ data }) {
  if (!data) return null;

  return (
    <Section
      id="adjacent-programs"
      className="relative border-b border-ink/12 bg-paper-warm"
    >
      <Box>
        <Reveal>
          <Text as="h2" className="mb-4 max-w-[20ch]">
            {(data.heading_parts ?? data.heading?.parts)
              ? (data.heading_parts ?? data.heading.parts).map((p, i) =>
                  (p.is_italic || p.em) ? <em key={i} className="font-serif font-normal italic">{p.text}</em> : p.text
                )
              : (typeof data.heading === "string" ? data.heading : "").split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, i) => {
                  const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
                  return match ? <em key={i} className="font-serif font-normal italic">{match[1]}</em> : fragment;
                })
            }
          </Text>
        </Reveal>

        <Reveal delay={1}>
          <Text
            as="p"
            className="mb-10 max-w-[72ch] text-[15px] leading-[1.65]]"
          >
            {data.description}
          </Text>
        </Reveal>

        <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_48px_1fr_48px_1fr_48px_1fr] lg:items-stretch lg:gap-0">
          {data.programs.map((program, index) => (
            <Box key={program.id} className="contents">
              <Reveal delay={2}>
                <ProgramCard program={program} />
              </Reveal>

              {index < data.programs.length - 1 && <ProgramConnector />}
            </Box>
          ))}
        </Box>

        <Box className="mt-12 sm:mt-14 lg:mt-16">
          <Text
            as="h3"
            className="mb-5 text-[16px] font-semibold tracking-[-0.02em]"
          >
            {data.related_label}
          </Text>

          <Box className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {data.related_courses?.map((course, index) => (
              <Reveal key={course.title} delay={3}>
                <RelatedCourseCard course={course} />
              </Reveal>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
