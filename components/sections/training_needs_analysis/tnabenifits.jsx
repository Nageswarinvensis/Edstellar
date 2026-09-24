import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Section from "@/components/ui/Section";

export default function Benefits({ data }) {
  // Support both wrapped (data.benefitsData) and direct data props
  const content = data?.benefitsData || data || {};

  const sectionId = content.sectionId || "benefits";
  const heading = content.heading || "Why <span>automate</span> your TNA?";
  const subtitle = content.subtitle;
  const columns = content.columns || {};

  const traditional = columns.traditional || {};
  const automated = columns.automated || {};

  return (
    <Section id={sectionId} className="bg-white border-b border-t-[#0a16281f]">
      <Box>
        {/* Header Section */}
        <Box className="mx-auto mb-12 max-w-[62ch] text-center">
          <Reveal>
            <RichHeading heading={heading} />
          </Reveal>

          <Reveal delay={1}>
            {subtitle && (
              <Text as="p" className="mx-auto mt-3 max-w-[60ch] text-[16px] text-ink/70">
                {subtitle}
              </Text>
            )}
          </Reveal>
        </Box>

        {/* Comparison Table Box */}
        <Reveal delay={2}>
          <Box className="grid grid-cols-1 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm md:grid-cols-2">
            {/* Left Column: Traditional TNA */}
            <Box className="flex flex-col bg-[#EFECE6]/70">
              {/* Column Header */}
              <Box className="border-b border-black/5 px-6 py-5">
                <Text as="h3" className="text-base font-bold text-ink/80">
                  {traditional.title || "Traditional TNA"}
                </Text>
              </Box>

              {/* Column Items */}
              <Box className="flex-1 divide-y divide-black/5">
                {(traditional.items || []).map((item, idx) => (
                  <Box
                    key={idx}
                    className="flex items-center gap-3.5 px-6 py-4"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/10 text-[12px] text-ink/60">
                      ✕
                    </span>
                    <Text className="text-sm leading-normal text-ink/70">
                      {item}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right Column: Automated TNA */}
            <Box className="flex flex-col bg-white">
              {/* Column Header */}
              <Box className="flex items-center justify-between bg-ink px-6 py-4">
                <Text as="h3" className="text-base font-bold text-white">
                  {automated.title || "Automated TNA"}
                </Text>
                {automated.badge && (
                  <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-semibold text-ink">
                    {automated.badge}
                  </span>
                )}
              </Box>

              {/* Column Items */}
              <Box className="flex-1 divide-y divide-black/5">
                {(automated.items || []).map((item, idx) => (
                  <Box
                    key={idx}
                    className="flex items-center gap-3.5 px-6 py-4"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-lime">
                      ✓
                    </span>
                    <Text className="text-sm font-medium leading-normal text-ink">
                      {item}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
