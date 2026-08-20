import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";

function CardCTA({ card }) {
  return (
    <a
      href={card.cta.href}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0F172A] px-5 py-3 text-[14px] font-medium text-[#D4F34A] transition hover:bg-[#1E293B]"
    >
      {card.cta.label}
      <span className="text-[16px]">→</span>
    </a>
  );
}

const cardClass =
  "flex flex-col rounded-[20px] border border-[#E5E7EB] bg-white p-7 shadow-sm transition-shadow duration-200 hover:shadow-md";

const titleClass = "text-[18px] font-semibold text-[#0F172A]";

const introClass =
  "mt-3 text-[14px] leading-[1.6] text-[#64748B]";

export default function LDCards({ data }) {
  if (!data) return null;

  const [cohort, discovery, first30Days] = data.cards;

  return (
    <Section id="hr-ld" className="bg-[#FAF9F6]">
      <Box>
        <Reveal>
          <RichHeading
            as="h2"
            parts={data.heading.parts}
            className="mb-3 max-w-[20ch] text-[32px] leading-[1.1] tracking-tight text-[#0F172A] md:text-[38px] lg:text-[42px]"
          />
        </Reveal>

        <Reveal delay={1}>
          <Text
            as="p"
            className="mt-2 max-w-[620px] text-[15px] leading-[1.7] text-[#64748B] md:text-[16px]"
          >
            {data.description}
          </Text>
        </Reveal>

        <Reveal delay={2}>
          <Box className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* CARD 1 */}
            <Box className={cardClass}>
              <Text className={titleClass}>{cohort.title}</Text>

              <Box className="mt-6 flex items-end gap-3">
                <Text className="text-[52px] font-bold leading-none tracking-tight text-[#0F172A]">
                  {cohort.highlight.number}
                </Text>

                <Text className="mb-1 font-mono text-[10px] uppercase leading-[1.4] tracking-[0.2em] text-[#64748B]">
                  {cohort.highlight.label}
                </Text>
              </Box>

              <Text className="mt-4 text-[14px] leading-[1.6] text-[#64748B]">
                {cohort.body}
              </Text>

              <Box className="mt-5 rounded-[12px] bg-[#F5F3ED] px-4 py-3.5">
                <Text className="text-[13px] font-semibold text-[#0F172A]">
                  {cohort.callout.title}
                </Text>

                <Text className="mt-1.5 text-[13px] leading-[1.5] text-[#64748B]">
                  {cohort.callout.text}
                </Text>
              </Box>

              {/* Diagram */}
              <Box className="mt-5 flex justify-between gap-3 rounded-[12px] border border-[#E5E7EB] bg-white px-4 py-3">
                <Box className="flex flex-col gap-1.5">
                  <Box className="flex gap-[3px]">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Box
                        key={i}
                        className="h-[7px] w-[7px] rounded-full bg-[#CBD5E1]"
                      />
                    ))}
                  </Box>

                  <Text className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#94A3B8]">
                    {cohort.diagram.left}
                  </Text>
                </Box>

                <Text className="text-[16px] text-[#94A3B8]">→</Text>

                <Box className="flex flex-col items-center gap-1.5">
                  <Box className="flex gap-[3px]">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Box
                        key={i}
                        className="h-[7px] w-[7px] rounded-full bg-[#0F172A]"
                      />
                    ))}
                  </Box>

                  <Text className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#0F172A]">
                    {cohort.diagram.right}
                  </Text>
                </Box>
              </Box>

              <Box className="mt-auto pt-6">
                <a
                  href={cohort.link.href}
                  className="text-[13px] font-medium text-[#0F172A] underline underline-offset-2 hover:opacity-70"
                >
                  {cohort.link.text} →
                </a>

                <Box className="mt-4">
                  <CardCTA card={cohort} />
                </Box>
              </Box>
            </Box>

            {/* CARD 2 */}
            <Box className={cardClass}>
              <Text className={titleClass}>{discovery.title}</Text>

              <Text className={introClass}>{discovery.intro}</Text>

              <Box className="mt-6 flex flex-col gap-4">
                {discovery.checklist.map((item, i) => (
                  <Box key={i} className="flex gap-3">
                    <Box className="mt-[3px] flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full bg-[#F2F0E8]">
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="#0A1628"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>

                    <Box>
                      <Text className="text-[14px] font-semibold text-[#0F172A]">
                        {item.title}
                      </Text>

                      <Text className="mt-0.5 text-[13px] leading-[1.5] text-[#64748B]">
                        {item.description}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box className="mt-auto pt-6">
                <CardCTA card={discovery} />
              </Box>
            </Box>

            {/* CARD 3 */}
            <Box className={cardClass}>
              <Text className={titleClass}>{first30Days.title}</Text>

              <Text className={introClass}>{first30Days.intro}</Text>

              <Box className="relative mt-6 space-y-6">
                <Box className="absolute bottom-2 left-[11px] top-2 w-px bg-[#E2E8F0]" />

                {first30Days.timeline.map((step, i) => (
                  <Box key={i} className="relative flex gap-4">
                    <Box className="relative z-10 flex h-[24px] w-[24px] flex-none items-center justify-center rounded-full bg-[#0F172A] text-[10px] font-semibold text-white">
                      {step.number}
                    </Box>

                    <Box className="pt-0.5">
                      <Text className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#94A3B8]">
                        {step.period}
                      </Text>

                      <Text className="mt-1 text-[14px] font-semibold text-[#0F172A]">
                        {step.title}
                      </Text>

                      <Text className="mt-1 text-[13px] leading-[1.5] text-[#64748B]">
                        {step.description}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box className="mt-auto pt-6">
                <CardCTA card={first30Days} />
              </Box>
            </Box>

          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}