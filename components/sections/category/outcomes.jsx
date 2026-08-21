"use client";

import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";
import CtaBanner from "@/components/shared/ctabanner";

function OutcomeStage({ stage, index }) {
  return (
    <Box className="relative pl-[22px]">
      {/* TIMELINE POINT */}
      <Box
        className={`absolute left-[-5px] top-[4px] z-20 h-[11px] w-[11px] rounded-full border ${
          stage.active
            ? "border-[#C8EF3B] bg-[#C8EF3B]"
            : "border-[#536176] bg-[#0B1628]"
        }`}
      />

      {/* STAGE CONTENT */}
      <Box>
        {stage.label && (
          <Text
            as="p"
            className={`mb-[10px] font-mono text-[9px] font-medium uppercase leading-none tracking-[1.5px] ${
              stage.active ? "text-[#C8EF3B]" : "text-[#738099]"
            }`}
          >
            {stage.label}
          </Text>
        )}

        <Text
          as="h3"
          className="mb-[8px] text-[16px] font-semibold leading-[1.15] text-[#F5F7FA]"
        >
          {stage.title}
        </Text>

        <Text
          as="p"
          className="max-w-[650px] text-[11px] font-normal leading-[1.65] text-[#A2AEC0] sm:text-[12px]"
        >
          {stage.description}
        </Text>

        {/* TAGS */}
        {stage.tags?.length > 0 && (
          <Box className="mt-[10px] flex max-w-[720px] flex-wrap gap-[5px]">
            {stage.tags.map((tag) => {
              const isProposed = tag
                .toLowerCase()
                .includes("(proposed)");

              return (
                <Box
                  key={tag}
                  className={`rounded-[4px] px-[7px] py-[4px] ${
                    isProposed
                      ? "border border-dashed border-[#526176] bg-transparent"
                      : "border border-solid border-[#33445E] bg-[#101F34]"
                  }`}
                >
                  <Text
                    as="span"
                    className={`font-mono text-[8px] font-medium leading-none tracking-[0.3px] sm:text-[9px] ${
                      isProposed
                        ? "text-[#718096]"
                        : "text-[#A9B7CB]"
                    }`}
                  >
                    {tag}
                  </Text>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default function Outcomes1({ data, ctaBannerData }) {
  return (
    <Section className="relative overflow-hidden bg-[#0B1628]">
      {/* RIGHT DECORATIVE IMAGE */}
      {data.image?.src && (
        <Box className="pointer-events-none absolute right-[-225px] top-[245px] z-0 h-[545px] w-[545px] md:right-[-190px] md:top-[255px] md:h-[560px] md:w-[560px] lg:right-[-185px] lg:top-[245px] lg:h-[570px] lg:w-[570px] xl:right-[-175px]">
          <Image
            src={data.image.src}
            alt={data.image.alt || ""}
            fill
            priority
            className="object-contain"
          />
        </Box>
      )}

      {/* MAIN CONTENT */}
      <Box className="relative z-10">
        {/* HEADING */}
        <Reveal>
          <Box className="max-w-145">
            <RichHeading
              parts={data.heading.parts}
              as="h2"
              className="text-[30px] font-semibold leading-[0.98] tracking-[-1px] text-[#F5F7FA] lg:text-[36px]"
            />
          </Box>
        </Reveal>

        {/* DESCRIPTION */}
        <Reveal delay={1}>
          <Text
            as="p"
            className="mt-5 max-w-150 text-[12px] font-normal leading-[1.9] text-[#A2AEC0] sm:text-[13px] md:text-[14px]"
          >
            {data.description}
          </Text>
        </Reveal>

        {/* OUTCOME TIMELINE */}
        <Reveal delay={2}>
          <Box className="relative mt-9 max-w-180">
            {/* =================================================
                EXACT POINT-TO-POINT CONNECTING LINE
                Top alignment starts at first dot center (9px)
                Bottom alignment stops at last dot center (9px)
                ================================================= */}
            <Box className="pointer-events-none absolute left-[0px] top-[9px] bottom-[9px] z-0 w-[1px] bg-[#35435A]" />

            {/* TIMELINE STAGES */}
            <Box className="relative z-10 flex flex-col gap-7">
              {data.stages.map((stage, index) => (
                <OutcomeStage
                  key={`${stage.title}-${index}`}
                  stage={stage}
                  index={index}
                />
              ))}
            </Box>
          </Box>
        </Reveal>
        {/* Note */}
        <Reveal delay={4}>
          <Text className="mt-7 max-w-175 text-[12px] leading-normal text-[#FAFAF799]">
            {data.note}
          </Text>
        </Reveal>
      </Box>

      {/* CTA BANNER */}
      <Reveal delay={5}>
      {ctaBannerData?.map((cta, index) => (
        <CtaBanner key={index} data={cta} />
      ))}
      </Reveal>
    </Section>
  );
}