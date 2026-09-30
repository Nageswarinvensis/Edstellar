"use client";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

// Module Feature Item Component
function FeatureItem({ feature }) {
  const { label, active } = feature;

  return (
    <li className="flex items-center gap-2.5 py-1">
      <span
        className={`flex size-4 shrink-0 items-center justify-center text-[12px] font-bold ${
          active ? "text-ink" : "text-ink/25"
        }`}
        aria-hidden="true"
      >
        {active ? "✓" : "—"}
      </span>
      <Text
        className={`text-[14px] leading-tight ${
          active ? "text-ink" : "font-normal text-ink/35"
        }`}
      >
        {label}
      </Text>
    </li>
  );
}

// Module Pricing/Tier Card Component
function ModuleCard({ cardData }) {
  if (!cardData) return null;

  const { title, description, badge, features, ctaText, ctaTextLink, isPopular } = cardData;

  return (
    <Box
      className={`relative flex flex-col justify-between rounded-[14px] p-5 lg:p-6 transition-all ${
        isPopular
          ? "bg-white border border-navy shadow-[0_16px_36px_-12px_rgba(10,22,40,0.12)] z-1"
          : "bg-white border border-[#0A16281f]"
      }`}
    >
      {/* Most Popular Badge */}
      {badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-navy uppercase shadow-sm">
          {badge}
        </span>
      )}

      {/* Card Header & Features */}
      <Box>
        <Text as="h3" className="font-display text-[18px] font-bold tracking-tight text-ink">
          {title}
        </Text>

        <Text as="p" className="mt-2 min-h-9 text-[12px] leading-normal text-ink/55">
          {description}
        </Text>

        {features?.length > 0 && (
          <ul className="space-y-1.5 pt-3">
            {features.map((feature, idx) => (
              <FeatureItem key={idx} feature={feature} />
            ))}
          </ul>
        )}
      </Box>

      {/* Action Button */}
      <Box className="mt-auto pt-4">
        <a
          href={ctaTextLink || "#apply"}
          className={`block w-full rounded-full py-3 px-4 text-center font-display text-[12px] font-bold transition-all duration-200 cursor-pointer ${
            isPopular
              ? "bg-navy text-lime hover:bg-navy/90 shadow-md"
              : "bg-transparent border border-ink/80 text-ink hover:bg-ink hover:text-white"
          }`}
        >
          {ctaText || "Request a proposal"}
        </a>
      </Box>
    </Box>
  );
}

export default function EngModules({ data }) {
  const content = data?.engModulesData || data;

  if (!content) return null;

  const section_id = content.section_id || content.id || "eng-modules";

  return (
    <Section id={section_id} className="bg-paper-warm border border-y-[#0a16281f]">
      <Box>
        {/* Header Block */}
        <Box className="mb:5 lg:mb-9 max-w-2xl">
          <Reveal>
            {content.heading && (
              <Box className="text-ink [&_span]:italic [&_span]:font-serif [&_span]:font-normal">
                <RichHeading heading={content.heading} />
              </Box>
            )}

            {content.description && (
              <Text as="p" className="mt-4 text-[16px] text-ink/60 leading-relaxed font-normal max-w-[58ch]">
                {content.description}
              </Text>
            )}
          </Reveal>
        </Box>

        {/* 4 Tier Cards Grid */}
        <Reveal delay={0.1}>
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {content.modules?.map((module, idx) => (
              <ModuleCard key={idx} cardData={module} />
            ))}
          </Box>
        </Reveal>

        {/* Bottom Helper Caption */}
        {content.footerNote && (
          <Reveal delay={0.2}>
            <Text as="p" className="mt-6 text-center font-mono text-[12px] text-ink/50 tracking-tight">
              {content.footerNote}
            </Text>
          </Reveal>
        )}
      </Box>
    </Section>
  );
}