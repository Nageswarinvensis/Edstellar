"use client";

import { useState } from "react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";

export default function Marquee({ stack }) {
  const [isPaused, setIsPaused] = useState(false);

  if (!stack) return null;

  return (
    <Section
      id="stack"
      className="relative overflow-hidden border-b border-ink/12 bg-white"
    >
      {/* Header */}
      <Reveal delay={1}>
        <Box className="mx-auto max-w-155 text-center">
          <Text className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
            {stack.eyebrow}
          </Text>

          <Text className="text-[14px] leading-[1.7] text-ink/70">
            {stack.heading.highlight}
          </Text>

          <Text className="text-[14px] leading-[1.7] text-ink/70">
            {stack.description}
          </Text>
        </Box>
      </Reveal>

      {/* Marquee */}
      <Box className="relative left-1/2 mt-7 w-screen -translate-x-1/2 overflow-hidden">
        <div
          className="flex w-max gap-2.5 animate-stack-marquee"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {[...stack.items, ...stack.items].map((item, index) => (
            <Box
              key={`${item}-${index}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex h-12.5 shrink-0 cursor-default items-center rounded-[10px] border border-ink/12 bg-paper px-5 transition-colors duration-200 hover:bg-paper-warm"
            >
              <Text className="whitespace-nowrap text-[14px] font-bold text-[#0A1628]">
                {item}
              </Text>
            </Box>
          ))}
        </div>
      </Box>

      {/* Disclaimer */}
      <Reveal delay={1}>
        <Text className="mx-auto mt-6 max-w-155 text-center text-[11px] leading-[1.6] text-ink/50">
          {stack.disclaimer}
        </Text>
      </Reveal>
    </Section>
  );
}
