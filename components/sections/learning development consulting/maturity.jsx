import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { Gauge, Lock, Hourglass, AlertCircle } from "lucide-react";

// Lucide Icon mapping
const ICON_MAP = {
  gauge: Gauge,
  lock: Lock,
  hourglass: Hourglass,
};

export default function Maturity({ data }) {
  const maturityData = data?.maturity || data;
  if (!maturityData) return null;

  const { title, titleItalic, description, cards } = maturityData;

  return (
    <Section className="bg-[#f5f3ef]">
      <Box className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        {/* Left Column: Heading & Description */}
        <Box className="flex-1">
          <Text
            as="h2"
            className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.15]"
          >
            {title}{" "}
            {titleItalic && (
              <span className="font-serif italic font-normal text-slate-700">
                {titleItalic}
              </span>
            )}
          </Text>

          <Box className="mt-6 flex flex-col gap-4 text-[15px] leading-relaxed text-[#64748b]">
            {Array.isArray(description) ? (
              description.map((paragraph, index) => (
                <Text key={index}>{paragraph}</Text>
              ))
            ) : (
              <Text>{description}</Text>
            )}
          </Box>
        </Box>

        {/* Right Column: Cards Stack */}
        <Box className="flex flex-1 flex-col gap-5">
          {cards?.map((card, index) => {
            const IconComponent = ICON_MAP[card.icon?.toLowerCase()] || AlertCircle;

            return (
              <Box
                key={index}
                className="group flex flex-col items-start gap-4 rounded-2xl bg-white p-5 lg:px-7 lg:py-6 border [border-color:rgba(10,22,40,0.06)] shadow-[0_2px_4px_rgba(10,22,40,0.04),0_12px_24px_rgba(10,22,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(10,22,40,0.08),0_20px_32px_rgba(10,22,40,0.12)]"
              >
                <Box className="flex items-start gap-4">
                  {/* Soft Lime Rounded Square Icon Container */}
                  <Box className="flex size-11 flex-none items-center justify-center rounded-xl bg-[#e2f89f] text-ink">
                    <IconComponent className="size-5" strokeWidth={2} />
                  </Box>

                  {/* Text Details */}
                  <Box className="flex flex-col">
                    <Text className="text-[17px] font-bold text-ink leading-snug">
                      {card.title}
                    </Text>
                    <Text className="mt-1.5 text-[14px] leading-normal text-[#64748b]">
                      {card.description}
                    </Text>

                    {/* Impact Pill Badge */}
                    {card.badge && (
                      <Box className="mt-3.5 inline-flex w-fit items-center rounded-full bg-[#edeae3] px-3 py-1">
                        <Text className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-[#5c584e]">
                          {card.badge}
                        </Text>
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