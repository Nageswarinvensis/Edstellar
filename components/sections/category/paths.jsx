"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Sparkles,
  Workflow,
  PackageCheck,
  ShieldCheck,
  LockKeyhole,
  ServerCog,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";

const icons = {
  brain: BrainCircuit,
  sparkles: Sparkles,
  workflow: Workflow,
  package: PackageCheck,
  shield: ShieldCheck,
  lock: LockKeyhole,
  server: ServerCog,
};

export default function Paths({ data }) {
  const [page, setPage] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!data) return null;

  const cardsPerView = 3;
  const totalPages = data.paths.length;
  const maxPage = Math.max(data.paths.length - cardsPerView, 0);

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, maxPage));
  };

  const previousPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };
  
  const navigationButtonClass =
  "grid h-8 w-8 place-items-center rounded-full border border-[#53647b] text-white transition-all duration-200 hover:bg-[#C8F135] hover:border-[#C8F135] hover:text-[#0A1628] disabled:pointer-events-none disabled:opacity-30";
  return (
    <Section
      id="governance"
      className="relative overflow-hidden bg-[#0b1729] text-white"
    >
      <Box>
        {/* Header */}
        <Box>
          <Reveal>
            <Text
              as="h2"
              className="max-w-135 mb-4 text-[30px] font-semibold leading-[1.06] tracking-[-0.035em] text-white lg:text-[36px]"
            >
              {data.heading.parts.map((part, index) => (
                <span
                  key={index}
                  className={part.em ? "font-serif font-normal italic" : ""}
                >
                  {part.text}
                </span>
              ))}
            </Text>
          </Reveal>

          <Reveal delay={1}>
            <Text className="max-w-187.5 mb-9 text-[12px] leading-[1.8] text-[#fafaf7c7] md:text-[16px]">
              {data.description}
            </Text>
          </Reveal>
        </Box>

        {/* Controls */}
        <Reveal delay={1}>
          <Box className="mb-3 flex items-center justify-between">
            <Text className="text-[10px] tracking-[0.2em] text-[#fafaf799]">
              {data.mark.label}
            </Text>

            <Box className="flex items-center gap-2">
              <button
                type="button"
                onClick={previousPage}
                disabled={page === 0}
                aria-label="Previous"
                className={navigationButtonClass}
              >
                <ArrowLeft size={11} strokeWidth={1.3} />
              </button>

              <button
                type="button"
                onClick={nextPage}
                disabled={page === maxPage}
                aria-label="Next"
                className={navigationButtonClass}
              >
                <ArrowRight size={11} strokeWidth={1.3} />
              </button>

              <Text className="ml-1 text-[10px] tracking-[0.2em] text-[#8996a8]">
                {page + 1} / {maxPage + 1}
              </Text>
            </Box>
          </Box>
        </Reveal>

        {/* Cards */}
        <Box className="relative mt-3 overflow-hidden">
          <Box
            className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(-${page * (100 / cardsPerView)}%)`,
            }}
          >
            {data.paths.map((path, cardIndex) => {
              const Icon = icons[path.icon];
              const isHovered = hoveredCard === path.id;

              return (
                <Box
                  key={path.id}
                  className="w-1/3 shrink-0 px-1.5"
                  onMouseEnter={() => setHoveredCard(path.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Reveal delay={2}>
                    <Box className="rounded-[12px] bg-white p-4.5 text-[#0b1729]">
                      {/* Card Header */}
                      <Box className="flex items-start gap-3">
                        <Box
                          className={`grid h-11 w-11 shrink-0 place-items-center rounded-[8px] bg-[#0A1628] text-[#c8ef32] transition-colors duration-300 ${
                            isHovered
                              ? "bg-[#c8ef32] text-[#0b1729]"
                              : ""
                          }`}
                        >
                          <Icon size={18} strokeWidth={1.5} />
                        </Box>

                        <Box className="min-w-0">
                          <Text
                            as="h3"
                            className="text-[16px] font-semibold leading-none text-[#0A1628]"
                          >
                            {path.title}
                          </Text>

                          <Text className="mt-1 truncate text-[12px] tracking-[0.12em] text-[#0A162899]">
                            {path.subtitle}
                          </Text>
                        </Box>
                      </Box>

                      {/* Meta */}
                      <Text className="mt-3 text-[10px] tracking-[0.14em] text-[#84909e]">
                        {path.meta}
                      </Text>

                      <Box className="my-3 h-px bg-[#dfe2e4]" />

                      {/* Timeline */}
                      <Box className="relative">
                        {/* Base Timeline */}
                        <span className="absolute bottom-2.5 left-1.75 top-1.5 w-0.5 bg-[#d0d5da]" />

                        {/* Animated Timeline */}
                        <span
                          className={`absolute bottom-2.5 left-1.75 top-1.5 w-0.5 origin-top bg-[#c8ef32] ${
                            isHovered
                              ? "scale-y-100 transition-transform duration-1200 ease-linear"
                              : "scale-y-0 transition-none"
                          }`}
                        />

                        {path.items.map((item, index) => (
                          <Box
                            key={item.title}
                            className="relative mb-3 min-h-11 pl-6.5"
                          >
                            {/* Timeline Point */}
                            <span
                              className={`absolute left-0 top-0.5 z-10 h-4 w-4 rounded-full border-[1.5px] ${
                                isHovered
                                  ? "border-[#0b1729] bg-[#c8ef32] transition-colors duration-200"
                                  : "border-[#c8ced5] bg-white transition-none"
                              }`}
                              style={{
                                transitionDelay: isHovered
                                  ? `${index * 350}ms`
                                  : "0ms",
                              }}
                            />

                            <Text
                              as="h4"
                              className="text-[14px] font-medium leading-[1.3] text-[#0b1729]"
                            >
                              {item.title}
                            </Text>

                            {item.tag && (
                              <Text className="mt-0.5 block text-[10px] tracking-[0.12em] text-[#8e98a3]">
                                {item.tag}
                              </Text>
                            )}

                            <Text className="mt-0.75 text-[12px] leading-[1.4] text-[#7b8490]">
                              {item.description}
                            </Text>
                          </Box>
                        ))}

                        {/* Outcome */}
                        <Box className="relative pl-5">
                          {/* Diamond */}
                          <span
                            className={`absolute left-0.5 top-1.25 h-3 w-3 rotate-45 border border-[#0b1729] ${
                              isHovered
                                ? "bg-[#c8ef32] transition-colors duration-200"
                                : "bg-white transition-none"
                            }`}
                            style={{
                              transitionDelay: isHovered
                                ? "1200ms"
                                : "0ms",
                            }}
                          />

                          {/* Outcome Badge */}
                          <Text
                            className={`inline-flex rounded-[6px] ml-1.5 px-2 py-1.5 text-[9px] font-semibold ${
                              isHovered
                                ? "bg-[#e7f3ad] transition-colors duration-200"
                                : "bg-[#f1efe9] transition-none"
                            }`}
                            style={{
                              transitionDelay: isHovered
                                ? "1200ms"
                                : "0ms",
                            }}
                          >
                            {path.outcome}
                          </Text>
                        </Box>
                      </Box>

                      {/* Footer */}
                      <Box className="mt-3 border-t border-[#dfe2e4] pt-3">
                        <Text className="min-h-9.5 text-[12px] leading-[1.45] text-[#7b8490]">
                          {path.footer}
                        </Text>

                        {/* CTA */}
                        <button
                          type="button"
                          className="mt-2 h-6.5 w-full rounded-full border border-[#cbd0d5] bg-white text-[7px] font-medium tracking-[0.13em] text-[#0b1729] transition-colors duration-200 hover:border-[#0b1729] hover:bg-[#0b1729] hover:text-white"
                        >
                          {path.button}
                        </button>
                      </Box>
                    </Box>
                  </Reveal>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Note */}
        <Reveal delay={3}>
          <Text className="mt-7 max-w-175 text-[12px] leading-normal text-[#FAFAF799]">
            {data.note}
          </Text>
        </Reveal>
      </Box>
    </Section>
  );
}