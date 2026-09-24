"use client";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

export default function LandDCTA({ data, emphasisClassName }) {
  // Support passing either data directly OR data.landdctaData wrapper
  const ctaData = data?.landdctaData || data || {};

  if (!ctaData.heading && !ctaData.description) return null;

  const sectionId = ctaData.sectionId || "assessment";

  // Build button object from JSON data or set fallback
  const button = {
    text: ctaData.buttonText || ctaData.button?.text || "Start the free 5-minute assessment",
    href: ctaData.buttonHref || ctaData.button?.href || "#assessment",
    showArrow: ctaData.button?.showArrow ?? true,
  };

  return (
    <Section id={sectionId} className="bg-ink py-16 lg:py-20">
      <Box className="mx-auto max-w-4xl text-center flex flex-col items-center px-4">
        {/* Main Heading & Description */}
          <Box className="flex flex-col items-center">
            {ctaData.heading && (
              <Box className="max-w-2xl text-center">
                <Reveal>
                <RichHeading
                  heading={ctaData.heading}
                  className="text-white"
                  emphasisClassName={cn("text-lime italic font-serif", emphasisClassName)}
                />
                </Reveal>
              </Box>
            )}

            <Reveal delay={1}>
            {ctaData.description && (
              <Text
                as="p"
                className="mt-4 sm:mt-5 max-w-xl text-center text-paper/80 text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: ctaData.description }}
              />
            )}
            </Reveal>
          </Box>
        
        {/* 5 Stage Pill Badges */}
        {ctaData.pills?.length > 0 && (
          <Reveal delay={2}>
            <Box className="mt-6 flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 max-w-full">
              {ctaData.pills.map((pill, index) => (
                <Box
                  key={index}
                  className="whitespace-nowrap rounded-full bg-[#132035] border border-slate-700/80 px-3 py-2 text-[10px] font-mono tracking-wider text-slate-200 uppercase shadow-sm shrink-0"
                >
                  <Text 
                    className="text-slate-200 font-mono text-[10px]"
                    dangerouslySetInnerHTML={{ __html: pill }} 
                  />
                </Box>
              ))}
            </Box>
          </Reveal>
        )}

        {/* Primary CTA Button */}
        <Reveal delay={3}>
          {button.text && (
            <Box className="mt-6 flex justify-center">
              <CtaButton
                render={<a href={button.href} />}
                arrow={button.showArrow}
                color="lime"
                className="px-7 py-3.5 text-sm font-bold"
              >
                {button.text}
              </CtaButton>
            </Box>
          )}
        </Reveal>
      </Box>
    </Section>
  );
}