"use client";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

export default function Capability({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section className="bg-navy">
      <Box className="mx-auto">
        <Reveal>
          <RichHeading
            as="h2"
            parts={data.heading?.parts}
            className="max-w-[20ch] tracking-[-0.03em] text-white"
            emphasisClassName="font-normal italic text-lime"
          />
        </Reveal>

        <Reveal delay={1}>
          <Text
            as="p"
            className="mt-6 max-w-[700px] text-[15px] leading-[1.7] text-white/70"
          >
            {data.description}
          </Text>
        </Reveal>

        <Box className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((card) => (
            <Reveal key={card.title}>
              <Box
                className="flex h-full flex-col rounded-[12px] border border-white/15 bg-[#162642] p-5 transition-transform duration-500 ease-out hover:-translate-y-1
                "
              >
                <Text
                  as="p"
                  className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50"
                >
                  {card.eyebrow}
                </Text>

                <Text
                  as="h3"
                  className="mt-3 text-[16px] font-semibold leading-[1.35] text-white"
                >
                  {card.title}
                </Text>

                <Text
                  as="p"
                  className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50"
                >
                  {card.problem_label}
                </Text>

                <Text
                  as="p"
                  className="mt-1 text-[13px] leading-[1.6] text-white/75"
                >
                  {card.problem}
                </Text>

                <Text
                  as="p"
                  className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50"
                >
                  {card.work_label}
                </Text>

                <Text
                  as="p"
                  className="mt-1 text-[13px] leading-[1.6] text-white/75"
                >
                  {card.work}
                </Text>

                <Box className="mt-4 rounded-[8px] bg-[#293b5a] p-3">
                  <Text
                    as="p"
                    className="text-[25px] font-semibold leading-none text-lime"
                  >
                    {card.result}
                  </Text>

                  <Text
                    as="p"
                    className="mt-2 text-[12px] leading-[1.5] text-white/75"
                  >
                    {card.result_description}
                  </Text>

                  <Text
                    as="p"
                    className="mt-2 font-mono text-[10px] tracking-[0.05em] text-white/60"
                  >
                    {card.result_note}
                  </Text>
                </Box>

                <Box className="mt-auto pt-6">
                  <a
                    href={card.case_study_href}
                    className="inline-block border-b border-lime/60 pb-1 text-[11px] font-semibold text-lime transition-colors duration-300 hover:border-lime hover:text-lime"
                  >
                    {card.case_study_label} →
                  </a>

                  <Box className="mt-3">
                    <a
                      href={card.training_href}
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-navy"
                    >
                      {card.training_label}
                      <span>→</span>
                    </a>
                  </Box>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>

        {data.note && (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-7 max-w-[650px] text-[12px] leading-[1.7] text-white/60"
            >
              {data.note}
            </Text>
          </Reveal>
        )}
      </Box>
    </Section>
  );
}