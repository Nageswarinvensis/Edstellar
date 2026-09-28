"use client";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

// Reusable Feature Item Component
function FeatureItem({ text, isHighlight }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
          isHighlight ? "text-ink" : "text-ink/40"
        }`}
        aria-hidden="true"
      >
        {isHighlight ? "✓" : "✕"}
      </span>
      <Text className="text-[14px] leading-snug font-normal text-ink/80">
        {text}
      </Text>
    </li>
  );
}

// Reusable Card Component
function ManagedCard({ cardData, isHighlight = false }) {
  if (!cardData) return null;

  const { tag, title, items } = cardData;

  return (
    <Box
      className={`w-full flex-1 rounded-[16px] p-5 lg:p-7 transition-all ${
        isHighlight
          ? "bg-white border border-ink shadow-[0_12px_32px_-12px_rgba(10,22,40,0.12)]"
          : "bg-white border border-[#0A1628]/10"
      }`}
    >
      {tag && (
        <span
          className={`inline-block rounded-full px-3 py-1 font-mono text-[12px] tracking-wider uppercase mb-3.5 ${
            isHighlight ? "bg-lime text-ink" : "bg-paper-warm text-ink/60"
          }`}
        >
          {tag}
        </span>
      )}

      {title && (
        <Text as="h3" className="text-lg font-bold tracking-tight text-ink mb-4">
          {title}
        </Text>
      )}

      {items?.length > 0 && (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <FeatureItem key={idx} text={item} isHighlight={isHighlight} />
          ))}
        </ul>
      )}
    </Box>
  );
}

export default function Managed({ data }) {
  const content = data?.managedData || data;

  if (!content) return null;

  const section_id = content.section_id || content.id || "managed";

  return (
    <Section id={section_id} className="bg-paper-warm">
      {/* 1. Header block constrained to centered max-w-2xl */}
      <Box className="mx-auto max-w-3xl text-center mb-5 lg:mb-9">
        <Reveal>
          {content.heading && (
            <Box className="text-ink [&_span]:italic [&_span]:font-serif [&_span]:font-normal">
              <RichHeading heading={content.heading} />
            </Box>
          )}

          {content.description && (
            <Text as="p" className="mt-4 text-base text-ink/60 leading-relaxed font-normal">
              {content.description}
            </Text>
          )}
        </Reveal>
      </Box>

      {/* 2. Cards Grid placed outside header container to span full width layout */}
      <Box>
        <Reveal delay={0.1}>
          <Box className="flex flex-col lg:flex-row items-stretch justify-center gap-6">
            <ManagedCard cardData={content.inHouseCard} isHighlight={false} />
            <ManagedCard cardData={content.managedCard} isHighlight={true} />
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}