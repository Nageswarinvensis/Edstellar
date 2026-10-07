"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

export default function LdPlatformSection({ data }) {
  const content = data?.ldPlatformData || data;

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = content?.tabs || [];
  const currentTab = tabs[activeTabIndex] || tabs[0];

  // Auto-switch tabs every 4 seconds
  useEffect(() => {
    if (!tabs.length) return;

    const interval = setInterval(() => {
      setActiveTabIndex((prevIndex) => (prevIndex + 1) % tabs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [tabs.length]);

  if (!content) return null;

  return (
    <Section id={content.section_id || "platform"} className="bg-paper-warm py-12 sm:py-16">
      <Reveal>
        <Box className="rounded-2xl bg-[#0B1321] p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
          <Box className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <Box className="lg:col-span-6 flex flex-col justify-between h-full">
              <Box>
                {/* Eyebrow Label */}
                {content.eyebrow && (
                  <Text className="font-mono text-[11px] font-semibold tracking-widest uppercase text-lime mb-3 block">
                    {content.eyebrow}
                  </Text>
                )}

                {/* Heading (White main text & Yellow Span Accent) */}
                {content.heading && (
                  <Box className="
                    text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight
                    [&_*]:!text-white
                    [&_span]:!text-[#E2FF00] [&_span]:italic [&_span]:font-serif [&_span]:font-normal
                  ">
                    <RichHeading heading={content.heading} />
                  </Box>
                )}

                {/* Description */}
                {content.description && (
                  <Text className="mt-5 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                    {content.description}
                  </Text>
                )}
              </Box>

              {/* Bottom CTA Button */}
              {content.cta && (
                <Box className="mt-8 sm:mt-10">
                  <Link
                    href={content.cta.href || "#"}
                    className="
                      inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3
                      text-sm font-semibold text-ink transition-all duration-200
                      hover:bg-lime/90 hover:scale-105 focus-visible:outline-none
                    "
                  >
                    {content.cta.label} &rarr;
                  </Link>
                </Box>
              )}
            </Box>

            {/* Right Signal Terminal / Tabs Box */}
            <Box className="lg:col-span-6">
              <Box className="rounded-xl border border-white/10 bg-[#121D2F] p-5 sm:p-6 shadow-inner">
                
                {/* Signal Terminal Header */}
                <Box className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <Text className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                    {content.terminal_title || "CAPABILITY SIGNAL"}
                  </Text>
                  
                  {/* LIVE Indicator Badge */}
                  <Box className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-lime">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-lime"></span>
                    </span>
                    LIVE
                  </Box>
                </Box>

                {/* Tabs Row */}
                <Box className="flex flex-wrap items-center gap-2 mb-6">
                  {tabs.map((tab, idx) => {
                    const isActive = idx === activeTabIndex;
                    return (
                      <button
                        key={tab.id || tab.label}
                        onClick={() => setActiveTabIndex(idx)}
                        className={`
                          rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-200
                          ${
                            isActive
                              ? "bg-lime text-ink font-bold shadow-md"
                              : "border border-white/15 text-gray-300 hover:border-lime/50 hover:text-white"
                          }
                        `}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </Box>

                {/* Active Tab Progress Metrics */}
                <Box className="space-y-5 min-h-[180px]">
                  {currentTab?.metrics?.map((metric) => (
                    <Box key={metric.title}>
                      <Box className="flex items-center justify-between mb-1.5 font-mono text-xs">
                        <Text className="font-medium text-white text-sm">
                          {metric.title}
                        </Text>
                        {metric.subtitle && (
                          <Text className="text-[10px] text-gray-400 uppercase tracking-widest">
                            {metric.subtitle}
                          </Text>
                        )}
                      </Box>

                      {/* Progress Bar Container */}
                      <Box className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <Box
                          className="h-full bg-lime transition-all duration-700 ease-out rounded-full"
                          style={{ width: `${metric.value}%` }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Continuous Animating Dot Indicators at Bottom */}
                <Box className="mt-6 flex items-center gap-2 pt-2">
                  {tabs.map((_, idx) => {
                    const isActive = idx === activeTabIndex;
                    return (
                      <span
                        key={idx}
                        className={`
                          size-2 rounded-full transition-all duration-300
                          ${
                            isActive
                              ? "bg-lime scale-125 animate-pulse"
                              : "bg-white/20"
                          }
                        `}
                      />
                    );
                  })}
                </Box>

              </Box>
            </Box>

          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}