"use client";

import { useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import CtaBanner from "@/components/common/cta-banner";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
export default function ByRole({ data, ctaBannerData }) {
  const [activeRole, setActiveRole] = useState(0);

  if (!data?.roles?.length) return null;

  const activeData = data.roles[activeRole];

  return (
    <Section id="by-role" className="bg-[#F5F2EA]">
      <Box>
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            heading={data.heading}
            className="max-w-175 text-[34px] font-semibold leading-none tracking-[-1.8px] text-ink md:text-[40px]"
            emphasisClassName="font-serif font-normal tracking-[-1px]"
          />
        </Reveal>

        <Reveal delay={1}>
          <Text
            as="p"
            className="mt-6 max-w-175 text-[15px] leading-[1.65] text-ink-muted md:text-[16px]"
          >
            {data.description}
          </Text>
        </Reveal>

        <Reveal delay={2}>
          <Box className="mt-10 overflow-hidden rounded-[16px] border border-[#D9DDE1] bg-white">
            <Box className="grid grid-cols-1 min-[787px]:grid-cols-[300px_1fr]">
              <Box className="border-b border-[#D9DDE1] min-[787px]:border-b-0 min-[787px]:border-r">
                {data.roles.map((role, index) => {
                  const isActive = activeRole === index;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setActiveRole(index)}
                      className={[
                        "group flex min-h-13 w-full cursor-pointer items-center gap-3 border-b border-[#D9DDE1] px-2.5 text-left transition-all duration-200 last:border-b-0 min-[787px]:px-5",
                        isActive
                          ? "border-b border-b-[#B8F500] bg-white"
                          : "border-b border-b-[#D9DDE1] bg-[#FAFAF8]",
                      ].join(" ")}
                    >
                      <Text
                        as="span"
                        className={[
                          "shrink-0 font-mono text-[9px] tracking-[1.2px] transition-colors duration-200",
                          isActive
                            ? "text-[#07182C]"
                            : "text-[#7C858F] group-hover:text-ink",
                        ].join(" ")}
                      >
                        {role.number}
                      </Text>

                      <Text
                        as="span"
                        className={[
                          "text-[16px] font-bold leading-[1.15] transition-colors duration-200",
                          isActive
                            ? "text-[#07182C]"
                            : "text-[#66717F] group-hover:text-ink",
                        ].join(" ")}
                      >
                        {role.title}
                      </Text>
                    </button>
                  );
                })}
              </Box>

              <Box className="min-h-0 bg-white p-5 min-[769px]:min-h-100 min-[769px]:px-10 min-[769px]:py-10">
                <Text
                  as="span"
                  className="font-mono text-[12px] tracking-[1.2px] text-ink-muted"
                >
                  {activeData.number}
                </Text>

                <Text
                  as="h3"
                  className="mt-3 text-[23px] font-semibold leading-[1.05] tracking-[-1px] text-ink md:text-[25px]"
                >
                  {activeData.title}
                </Text>

                <Text
                  as="p"
                  className="mt-3 max-w-162 text-[14px] leading-[1.6] text-ink-muted"
                >
                  {activeData.description}
                </Text>

                <Box className="mt-6">
                  {activeData.programs?.map((program, index) => (
                    <a
                      key={program.label}
                      href={program.href}
                      className="group flex min-h-12 items-center justify-between border-t border-[#D9DDE1] text-ink transition-colors duration-200 last:border-b hover:text-[#4D5D00]"
                    >
                      <Text as="span" className="text-[14px] leading-[1.3]">
                        {program.label}
                      </Text>

                      <Text
                        as="span"
                        className="text-[12px] text-ink-muted transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </Text>
                    </a>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>

      <Reveal delay={5}>
        {ctaBannerData?.map((cta, index) => (
          <CtaBanner key={index} data={cta} />
        ))}
      </Reveal>
    </Section>
  );
}
