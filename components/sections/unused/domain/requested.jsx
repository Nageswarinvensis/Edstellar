"use client";

import { useEffect, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
export default function Requested({ data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to ensure the DOM has painted
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  if (!data) return null;

  return (
    <Section id="most-requested" className="bg-ink text-white">
      <Box className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-20">
        <Reveal delay={1}>
          <Box>
            <RichHeading
              as="h2"
              heading={data.heading}
              emphasisClassName="font-serif italic font-normal"
              className="max-w-[22ch] tracking-[-0.03em] text-white"
            />

            <Text className="mt-5 max-w-[55ch] text-[16px] leading-[1.65] text-white/80">
              {data.description}
            </Text>

            {data.note && (
              <Text className="mt-6 max-w-[58ch] text-[13.5px] leading-[1.65] text-white/50">
                {data.note}
              </Text>
            )}
          </Box>
        </Reveal>

        <Reveal delay={2}>
          <Box>
            <Text className="mb-6 font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
              {data.label}
            </Text>

            <Box className="space-y-6">
              {data.items.map((item) => (
                <Box key={item.label}>
                  <Box className="mb-2 flex items-center justify-between gap-4">
                    <Text className="font-display text-[18px] font-bold leading-tight text-white">
                      {item.label}
                    </Text>

                    <Text className="font-mono text-[12px] text-white/50">
                      {item.value}%
                    </Text>
                  </Box>

                  <Box className="h-1.5 overflow-hidden rounded-full bg-white/15">
                    <Box
                      className="h-full rounded-full bg-lime transition-[width] duration-1200 ease-out"
                      style={{
                        width: visible ? `${item.value}%` : "0%",
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
