import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { Gauge, Lock, Hourglass, AlertCircle } from "lucide-react";

// Lucide Icon mapping
const ICON_MAP = {
  gauge: Gauge,
  lock: Lock,
  hourglass: Hourglass,
};

export default function WhyLandD({ data, heading }) {
  const maturityData = data?.WhyLandDData || data?.maturity || data;
  if (!maturityData) return null;

  // Uses the passed heading prop OR falls back to heading inside JSON
  const finalHeading = heading || maturityData.heading;
  const { description, cards } = maturityData;

  return (
    <Section id="why-ld" className="bg-paper-warm border-y border-[#0a16281f]">
      <Box className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        {/* Left Column: Heading & Description */}
        <Box className="flex-1">
          {finalHeading && (
            <Reveal>
              <RichHeading heading={finalHeading} />
            </Reveal>
          )}

          <Reveal delay={1}>
            <Box className="mt-6 flex flex-col gap-4 text-[16px] leading-relaxed text-ink-muted">
              {Array.isArray(description) ? (
                description.map((paragraph, index) => (
                  <Text
                    key={index}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))
              ) : (
                <Text dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </Box>
          </Reveal>
        </Box>

        {/* Right Column: Cards Stack */}
        <Box className="flex flex-1 flex-col gap-5">
          {cards?.map((card, index) => {
            const IconComponent =
              ICON_MAP[card.icon?.toLowerCase()] || AlertCircle;

            return (
              <Box
                key={index}
                className="group flex flex-col items-start gap-4 rounded-xl bg-white p-5 lg:px-6 lg:py-5 border border-[#0a16281F] shadow-[0_2px_4px_rgba(10,22,40,0.04),0_12px_24px_rgba(10,22,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(10,22,40,0.08),0_20px_32px_rgba(10,22,40,0.12)]"
              >
                <Box className="flex items-start gap-4">
                  {/* Soft Lime Rounded Square Icon Container */}
                  <Box className="flex size-11 flex-none items-center justify-center rounded-xl bg-lime-soft text-ink">
                    <IconComponent className="size-5" strokeWidth={2} />
                  </Box>

                  {/* Text Details */}
                  <Box className="flex flex-col">
                    <Text
                      className="text-[16px] font-bold text-ink leading-snug"
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    />
                    <Text
                      className="mt-1.5 text-[14px] leading-normal text-ink-muted"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />

                    {/* Impact Pill Badge */}
                    {card.badge && (
                      <Box className="mt-3 inline-flex w-fit items-center rounded-full bg-[#edeae3] px-3 py-1">
                        <Text
                          className="font-mono text-[10px] uppercase tracking-widest text-ink"
                          dangerouslySetInnerHTML={{ __html: card.badge }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Section>
  );
}