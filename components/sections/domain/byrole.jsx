"use client";

import { useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import CtaBanner from "@/components/common/cta-banner";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
export default function ByRole({ data }) {
  const [activeRole, setActiveRole] = useState(0);
  const tabRefs = useRef({});

  if (!data?.roles?.length) return null;

  const activeData = data.roles[activeRole];

  // Below the 787px breakpoint the role list scrolls horizontally instead of
  // stacking, so picking a tab that's partly off-screen should bring it to
  // the left edge — `scrollIntoView` is a no-op on the desktop stacked list
  // since there's no horizontal overflow there.
  function handleSelectRole(index, id) {
    setActiveRole(index);
    tabRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  return (
    <Section id="by-role" className="bg-paper-warm">
      <Box>
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            heading={data.heading}
            className="max-w-175 font-semibold tracking-[-1.8px] text-ink"
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
              <Box className="flex overflow-x-auto border-b border-[#D9DDE1] min-[787px]:block min-[787px]:overflow-visible min-[787px]:border-b-0 min-[787px]:border-r">
                {data.roles.map((role, index) => {
                  const isActive = activeRole === index;

                  return (
                    <button
                      key={role.id}
                      ref={(el) => {
                        tabRefs.current[role.id] = el;
                      }}
                      type="button"
                      onClick={() => handleSelectRole(index, role.id)}
                      className={[
                        "group flex min-h-13 shrink-0 cursor-pointer items-center gap-3 whitespace-nowrap border-r border-[#D9DDE1] px-2.5 text-left transition-all duration-200 min-[787px]:w-full min-[787px]:shrink min-[787px]:border-r-0 min-[787px]:border-b min-[787px]:whitespace-normal min-[787px]:px-5 min-[787px]:last:border-b-0",
                        isActive
                          ? "bg-white shadow-[inset_0_-3px_0_#B8F500] min-[787px]:shadow-[inset_3px_0_0_#B8F500]"
                          : "bg-[#FAFAF8]",
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
                    <Reveal
                      as="a"
                      key={program.label}
                      href={program.href}
                      delay={Math.min(index + 1, 4)}
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
                    </Reveal>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>

      <Reveal delay={5}>
        {data.ctaBannerData?.map((cta, index) => (
          <CtaBanner
            key={index}
            data={cta}
            headingClassName="text-sm font-normal"
          />
        ))}
      </Reveal>
    </Section>
  );
}
