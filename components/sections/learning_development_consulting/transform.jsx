"use client";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

// Reusable List Item Component
function ComparisonItem({ text, isDark }) {
  return (
    <li className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
      <span
        className={`size-5 rounded-full flex items-center justify-center shrink-0 text-xs ${
          isDark
            ? "bg-lime text-ink font-bold"
            : "bg-[#0a16280d] text-[#0a1628]/60"
        }`}
      >
        {isDark ? "✓" : "✕"}
      </span>
      <Text
        className={`text-sm sm:text-[16px] leading-snug ${
          isDark ? "text-white/90 font-medium" : "text-[#0a1628]/80 font-normal"
        }`}
      >
        {text}
      </Text>
    </li>
  );
}

// Reusable Card Component
function ComparisonCard({ cardData, isDark = false }) {
  if (!cardData) return null;

  return (
    <Box
      className={`w-full flex-1 rounded-xl p-5 sm:p-7 ${
        isDark
          ? "bg-ink text-white shadow-xl"
          : "bg-paper-warm border border-[#0a16280a]"
      }`}
    >
      <Text
        className={`font-mono text-[12px] tracking-widest uppercase block mb-6 ${
          isDark ? "text-lime" : "text-[#0a1628]/60"
        }`}
      >
        {cardData.tag}
      </Text>

      <ul className={`divide-y ${isDark ? "divide-white/10" : "divide-[#0a162814]"}`}>
        {cardData.items?.map((item, idx) => (
          <ComparisonItem key={idx} text={item} isDark={isDark} />
        ))}
      </ul>
    </Box>
  );
}

export default function Transform({ data }) {
  const content = data?.transformationData || data;

  if (!content) return null;

  return (
    <Section id="transformation" className="bg-paper">
      <Box>
        {/* Header Block */}
        <Reveal>
          <Box className="mb-10 lg:mb-14 max-w-2xl">
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

        {/* Comparison Section */}
        <Reveal delay={0.1}>
          <Box className="flex flex-col lg:flex-row items-center justify-between gap-5">
            {/* Before Card */}
            <ComparisonCard cardData={content.beforeCard} isDark={false} />

            {/* Transition Arrow Indicator */}
            <Box className="shrink-0 flex items-center justify-center text-[#0a1628]/40">
              <span className="hidden lg:block text-xl">→</span>
              <span className="lg:hidden text-xl rotate-90">→</span>
            </Box>

            {/* After Card */}
            <ComparisonCard cardData={content.afterCard} isDark={true} />
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}