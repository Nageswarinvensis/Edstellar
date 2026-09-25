import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import { fillTemplate } from "@/lib/template";

export default function TrainerRatings({ trainer, data }) {
  const trainerFirstName = trainer.name.split(" ")[0];

  return (
    <Section id="ratings" className="bg-ink">
      <Box>
        {/* Section Header */}
        <RichHeading
          heading={data.heading}
          className="tracking-tight text-white"
          emphasisClassName="font-normal text-lime"
        />

        <Text as="p" className="mt-2 max-w-2xl text-[16px] text-white/70">
          {fillTemplate(data.description, { name: trainerFirstName })}
        </Text>

        {/* Ratings Card */}
        <Box className="mt-8 rounded-2xl border border-white/10 bg-ink p-5 lg:p-6">
          <Box className="flex flex-col gap-8 md:flex-row md:items-center">
            {/* Left Score Box */}
            <Box className="flex flex-col items-center justify-center border-b border-white/10 pb-6 md:w-48 md:border-b-0 md:border-r md:pb-0 md:pr-8">
              <Text
                as="span"
                className="text-[42px] text-white font-bold leading-none"
              >
                {data.ratingSummary.score}
              </Text>
              <Box className="mt-3 flex gap-1 text-lime">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm">
                    ★
                  </span>
                ))}
              </Box>
              <Text as="span" className="mt-2 text-[12px] text-white/50">
                {fillTemplate(data.evaluations_label, {
                  count: data.ratingSummary.evaluations,
                })}
              </Text>
            </Box>

            {/* Right Metric Bars */}
            <Box className="flex-1 space-y-3.5">
              {data.ratingMetrics.map((metric) => (
                <Box
                  key={metric.label}
                  className="grid grid-cols-[130px_1fr_32px] items-center gap-4 text-[12spx]"
                >
                  <Text as="span" className="text-white/70">
                    {metric.label}
                  </Text>
                  <Box className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <Box
                      className="h-full rounded-full bg-[#a3e635]"
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </Box>
                  <Text
                    as="span"
                    className="text-right font-medium text-white/90"
                  >
                    {metric.score}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Testimonials Grid */}
        <Box className="mt-6 grid gap-6 md:grid-cols-2">
          {data.testimonials.map((item, index) => (
            <Box
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-ink p-5 lg:p-6"
            >
              <Box>
                <Text
                  as="span"
                  className="font-serif text-[28px] leading-none text-lime"
                >
                  “
                </Text>
                <Text
                  as="p"
                  className="mt-2 text-[14px] leading-relaxed text-white/80"
                >
                  {item.quote}
                </Text>
              </Box>

              <Box className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <Box className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[13px] font-semibold text-[#a3e635]">
                  {item.initial}
                </Box>
                <Text as="p" className="text-[12px] text-white/60">
                  <Text as="span" className="font-bold text-white">
                    [Client name pending consent]
                  </Text>
                  {item.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom Disclaimer */}
        <Box className="mt-6 flex items-start gap-2.5 rounded-xl border border-dashed border-white/20 bg-[#081220] p-4 text-[12px]">
          <span className="mt-0.5 text-[14px]">🛡️</span>
          <Text as="p" className="text-white/60">
            {data.note}
          </Text>
        </Box>
      </Box>
    </Section>
  );
}
