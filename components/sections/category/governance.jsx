"use client";

import { useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import CtaBanner from "@/components/shared/ctabanner";

export default function Governance({ data = governanceData, ctaBannerData }) {
  const [activeTab, setActiveTab] = useState(0);

  const activeFramework = data.tabs[activeTab];

  return (
    <Section id="governance" className="relative overflow-hidden bg-[#0B1628] text-white">
    
    {/* Decorative lifecycle arcs */}
      {data.image?.src && (
        <img
          src={data.image.src}
          alt={data.image.alt || ""}
          aria-hidden={!data.image.alt}
          className="
            pointer-events-none
            absolute
            -right-7.5
            top-51.25
            z-0
            hidden
            max-w-none
            lg:block
          "
        />
      )}

      <Box className="relative z-1">
        <Reveal>
            <Text
              as="h2"
              className="max-w-120 mb-4 text-[30px] font-semibold leading-[1.06] tracking-[-0.035em] text-white lg:text-[36px]"
            >
              {data.heading.parts.map((part, index) => (
                <span
                  key={index}
                  className={part.em ? "font-serif font-normal italic" : ""}
                >
                  {part.text}
                </span>
              ))}
            </Text>
          </Reveal>

          <Reveal delay={1}>
            <Text className="max-w-187.5 mb-9 text-[12px] leading-[1.8] text-[#fafaf7c7] md:text-[16px]">
              {data.description}
            </Text>
          </Reveal>

        <Reveal delay={2}>
          <Box className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.pillars.map((pillar) => (
              <Box
                key={pillar.number}
                className="flex min-h-[210px] flex-col rounded-[10px] border border-[#34445D] bg-[#15233D] px-5 py-5"
              >
                <Text className="mb-3 font-mono text-[10px] tracking-[0.16em] text-[#C5E826]">
                  {pillar.number}
                </Text>

                <Text
                  as="h3"
                  className="mb-3 text-[18px] font-semibold leading-none text-paper"
                >
                  {pillar.title}
                </Text>

                <Text className="mb-4 text-[14px] leading-[1.65] text-paper">
                  {pillar.description}
                </Text>

                <Box className="mt-auto border-t border-[#FAFAF724] pt-3">
                  <Text className="font-mono text-[10px] tracking-[0.12em] text-[#FAFAF799]">
                    {pillar.label}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>

        <Reveal delay={3}>
          <Box className="mt-8">
            <Text className="mb-3.5 font-mono text-[10px] tracking-[0.16em] text-[#8C9CB2]">
              {data.frameworkLabel}
            </Text>

            <Box className="mb-7 flex flex-wrap gap-2">
              {data.frameworks.map((framework, index) => (
                <Box
                  key={framework.name}
                  as="button"
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`group rounded-lg border px-3 py-2 transition-all duration-300 ease-out ${
                    activeTab === index
                      ? "border-[#C5E826] bg-[#C5E826] text-[#0B1628]"
                      : "border-[#34445D] bg-[#15233D] text-white hover:border-[#FAFAF766]"
                  }`}
                >
                  <Text
                    as="span"
                    className={`text-[12px] font-medium transition-colors duration-300 ${
                      activeTab === index
                        ? "text-[#0B1628]"
                        : "text-[#FAFAF7]"
                    }`}
                  >
                    {framework.name}
                  </Text>

                  <Text
                    as="span"
                    className={`ml-1.5 font-mono text-[10px] tracking-[0.08em] transition-colors duration-300 ${
                      activeTab === index
                        ? "text-[#435300]"
                        : "text-[#FAFAF780] group-hover:text-[#C5E826]"
                    }`}
                  >
                    {framework.meta}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>

        <Reveal key={activeTab} delay={4}>
          <Box className="mb-6 rounded-[10px] border border-[#FAFAf724] bg-navy-soft px-5 py-5 lg:px-7 lg:py-6">
            <Text
              as="h3"
              className="mb-1.5 text-[18px] font-semibold leading-none text-paper"
            >
              {activeFramework.title}
            </Text>

            <Text className="mb-4 font-mono text-[10px] tracking-[0.14em] text-[#C5E826]">
              {activeFramework.status}
            </Text>

            <Text className="mb-4 max-w-195 text-[14px] leading-[1.7] text-[#FAFAF7B3]">
              {activeFramework.description}
            </Text>

            <Box className="grid grid-cols-1 border-t border-[#34445D] pt-4.5 sm:grid-cols-3 sm:gap-6">
              {activeFramework.points.map((point) => (
                <Box key={point.title} className="py-2 sm:py-0">
                  <Text className="mb-2.5 font-mono text-[10px] tracking-[0.12em] text-[#FAFAF766]">
                    {point.title}
                  </Text>

                  <Text className="text-[12px] leading-[1.55] text-[#FAFAF79E]">
                    {point.description}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={5}>
          <Text className="text-[10px] leading-[1.6] text-[#FAFAF799]">
            {data.footer}
          </Text>
        </Reveal>
      </Box>
      {ctaBannerData?.map((cta, index) => (
         <CtaBanner key={index} data={cta} />
       ))
      }
    </Section>
  );
}