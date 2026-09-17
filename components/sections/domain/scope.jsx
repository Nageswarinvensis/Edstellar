"use client";

import { useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import CtaButton from "@/components/common/cta-button";
export default function Scope({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!data?.tabs?.length) return null;

  const activeData = data.tabs[activeTab];

  return (
    <Section id="scope" className="bg-paper">
      <Box>
        <Box className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT COLUMN */}
          <Box className="mt-5 max-w-162">
            <Reveal delay={1}>
              <RichHeading
                as="h2"
                heading={data.heading}
                className="max-w-[22ch] tracking-[-0.03em] text-ink"
                emphasisClassName="font-normal italic"
              />

              <Text
                as="p"
                className="mt-6 text-[16px] leading-[1.65] text-ink-muted"
              >
                {data.description}
              </Text>
            </Reveal>

            <Reveal delay={2}>
              <Box className="mt-9">
                <Text
                  as="p"
                  className="mb-3.5 font-mono text-[9px] tracking-[0.15em] text-ink-muted uppercase"
                >
                  {data.tabLabel}
                </Text>

                <Box className="flex flex-wrap gap-2">
                  {data.tabs.map((tab, index) => {
                    const isActive = activeTab === index;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(index)}
                        className={[
                          "h-11 rounded-[10px] border px-4 text-[13px] font-semibold transition-all duration-200",
                          isActive
                            ? "border-ink bg-ink text-white"
                            : "border-[#C7CDD3] bg-white text-ink hover:border-ink",
                        ].join(" ")}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </Box>
              </Box>
            </Reveal>
          </Box>

          {/* RIGHT COLUMN */}
          <Reveal delay={2}>
            <Box className="w-full rounded-2xl border border-[#D9DDE1] bg-white p-5 lg:p-8 shadow-[0_22px_35px_rgba(7,24,44,0.12)]">
              <Text
                as="p"
                className="font-mono text-[9px] tracking-[0.16em] text-ink-muted uppercase"
              >
                {activeData.participants}
              </Text>

              <Text
                as="h3"
                className="mt-5 font-serif text-[24px] font-bold leading-none tracking-[-0.8px] text-ink italic"
              >
                {activeData.title}
              </Text>

              <Text
                as="p"
                className="mt-5 text-[15px] leading-[1.65] text-ink-muted"
              >
                {activeData.description}
              </Text>

              <Box as="ul" className="mt-6 flex flex-col gap-4">
                {activeData.items?.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item}
                    delay={Math.min(index + 1, 4)}
                    className="relative pl-6 text-[14px] leading-normal text-ink before:absolute before:top-[0.52em] before:left-0 before:size-1.75 before:bg-ink"
                  >
                    {item}
                  </Reveal>
                ))}
              </Box>

              <Box className="mt-7 flex flex-wrap gap-3">
                {activeData.actions?.map((action, index) => (
                  <CtaButton
                    key={action.label}
                    render={<a href={action.href} />}
                    variant={index === 0 ? "primary" : "ghost"}
                    color="navy"
                    arrow
                    className="text-[12px] font-semibold"
                  >
                    {action.label}
                  </CtaButton>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Box>
    </Section>
  );
}
