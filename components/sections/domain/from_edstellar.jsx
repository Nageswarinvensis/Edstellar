"use client";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
export default function FromEdstellar({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section id="from-edstellar" className="bg-[#F0EDE3]">
      <Box>
        <Reveal delay={1}>
          <Text
            as="p"
            className="font-mono text-[10px] font-normal tracking-[0.25em] text-[#66717F] uppercase"
          >
            {data.label}
          </Text>
        </Reveal>

        <Reveal delay={2}>
          <Box className="mt-6 grid grid-cols-1 border-l border-t border-[#D2CEC3] sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item, index) => (
              <a
                key={item.id || index}
                href={item.href}
                className="group relative block border-r border-b border-[#D2CEC3] p-5 lg:p-6 transition-colors duration-300 hover:bg-white"
              >
                <Box className="flex items-start justify-between gap-5">
                  <Text
                    as="h3"
                    className="text-[16px] font-semibold leading-[1.2] tracking-[-0.35px] text-[#07182C]"
                  >
                    {item.title}
                  </Text>

                  <Text
                    as="span"
                    className="shrink-0 pt-px text-[12px] font-normal text-[#66717F] transition-transform duration-500 ease-out group-hover:translate-x-1.5"
                  >
                    →
                  </Text>
                </Box>

                <Text
                  as="p"
                  className="mt-3 text-[14px] leading-[1.55] text-[#66717F]"
                >
                  {item.description}
                </Text>
              </a>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
