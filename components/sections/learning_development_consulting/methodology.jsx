"use client";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

export default function Methodology({ data }) {
  const content = data?.methodologyData || data;

  if (!content) return null;

  return (
    <Section id="how-we-work" className="bg-white border-y border-[#0a16281f]">
      <Box className="mx-auto max-w-7xl">
        {/* Header Block */}
        <Reveal>
          <Box className="mb-8 lg:mb-10 max-w-2xl">
            {content.heading && (
              <Box className="[&_span]:italic [&_span]:font-serif [&_span]:font-normal">
                <RichHeading heading={content.heading} />
              </Box>
            )}

            {content.subheading && (
              <Text
                as="p"
                className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: content.subheading }}
              />
            )}
          </Box>
        </Reveal>

        {/* 5-Step Section */}
        {content.steps?.length > 0 && (
          <Box className="relative">
            {/* Vertical Timeline Line (< lg) */}
            <div className="lg:hidden absolute left-4 top-4 bottom-8 w-0.5 bg-[#0a162838]" />

            {/* Steps Container */}
            <Box className="flex flex-col lg:grid lg:grid-cols-5 gap-4 relative z-10">
              {content.steps.map((step, idx) => (
                <Reveal key={idx} delay={idx * 0.1} className="w-full h-full">
                  <Box className="flex flex-row lg:flex-col items-start h-full gap-4 lg:gap-0">
                    
                    {/* Step Number Badge & Connectors Container */}
                    <Box className="relative flex items-center justify-center lg:justify-start lg:mb-6 shrink-0 mt-2 lg:mt-0 w-8 lg:w-full">
                      {/* Horizontal Timeline Line (>= lg) */}
                      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#0a162838] -z-10" />

                      {/* Numbered Circle Badge */}
                      <Box className="size-8 rounded-full bg-ink text-lime font-mono text-xs font-bold flex items-center justify-center shadow-sm z-10 shrink-0">
                        {step.stepNumber || idx + 1}
                      </Box>
                    </Box>

                    {/* Step Card Box */}
                    <Box className="flex-1 w-full h-full flex flex-col justify-between items-start rounded-xl bg-white border border-[#0a16281f] p-5 shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
                      <Box className="w-full">
                        {/* Title */}
                        <Text
                          as="h3"
                          className="font-bold text-lg text-ink tracking-tight"
                        >
                          {step.title}
                        </Text>

                        {/* Duration Pill */}
                        {step.duration && (
                          <Box className="mt-2.5 inline-block rounded-md bg-[#f2efe9] px-2.5 py-1">
                            <Text className="font-mono text-[10px] tracking-widest text-[#0a1628]/60 uppercase font-medium">
                              {step.duration}
                            </Text>
                          </Box>
                        )}

                        {/* Description */}
                        {step.description && (
                          <Text
                            as="p"
                            className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-ink-muted [&_u]:underline [&_u]:decoration-ink-muted/50 [&_u]:underline-offset-2"
                            dangerouslySetInnerHTML={{ __html: step.description }}
                          />
                        )}
                      </Box>

                      {/* Deliverable Box */}
                      {step.deliverable && (
                        <Box className="mt-4 inline-block w-auto lg:w-full lg:block rounded-xl bg-lime-soft px-3 py-2 lg:p-3">
                          <Text className="font-mono text-[8px] tracking-widest text-[#0a1628]/70 uppercase font-bold block mb-1">
                            YOU GET
                          </Text>
                          <Text className="font-bold text-xs sm:text-[12px] text-ink leading-tight block">
                            {step.deliverable}
                          </Text>
                        </Box>
                      )}
                    </Box>

                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Section>
  );
}