"use client";

import { useState } from "react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

export default function Maturity({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const content = data?.maturityData || data;

  if (!content) return null;

  return (
    <Section id="maturity-model" className="bg-paper-warm">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Box className="mb-8 md:mb-10 flex flex-col">
            {/* Heading with responsive max width */}
            {content.heading && (
              <Box className="max-w-full sm:max-w-lg md:max-w-xl">
                <RichHeading heading={content.heading} />
              </Box>
            )}

            {/* Subheading with responsive max width */}
            {content.subheading && (
              <Box className="max-w-full sm:max-w-xl md:max-w-2xl mt-3 md:mt-4">
                <Text
                  as="p"
                  className="text-ink-muted text-sm sm:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content.subheading }}
                />
              </Box>
            )}
          </Box>
        </Reveal>

        {content.levels?.length > 0 && (
          <Box className="w-full">
            {/* Scrollable Container for Chart & Points */}
            <Box className="overflow-x-auto pb-4 custom-scrollbar">
              <Box className="min-w-170 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
                <Text className="font-mono text-[10px] tracking-widest text-ink/50 uppercase mb-4">
                  ↑ CAPABILITY & BUSINESS IMPACT
                </Text>

                <Box className="relative">
                  <Box 
                    className="relative w-full"
                    style={{ height: "320px" }}
                  >
                    {/* Bottom base line starting after gap */}
                    <div className="absolute bottom-0 left-8 right-0 border-b border-solid border-ink/10 pointer-events-none" />

                    {/* Grid Lines & L1-L5 Labels */}
                    <Box className="absolute inset-0 pointer-events-none text-[11px] sm:text-[12px] font-mono text-ink/40 z-0">
                      <Box className="absolute top-0 left-0 w-full">
                        <span className="absolute -top-2.5 left-0 font-medium">
                          L5
                        </span>
                        <div className="ml-7.5 border-t border-dashed border-ink/20 w-[calc(100%-30px)]" />
                      </Box>

                      <Box className="absolute top-[20%] left-0 w-full">
                        <span className="absolute -top-2.5 left-0 font-medium">
                          L4
                        </span>
                        <div className="ml-7.5 border-t border-dashed border-ink/20 w-[calc(100%-30px)]" />
                      </Box>

                      <Box className="absolute top-[40%] left-0 w-full">
                        <span className="absolute -top-2.5 left-0 font-medium">
                          L3
                        </span>
                        <div className="ml-7.5 border-t border-dashed border-ink/20 w-[calc(100%-30px)]" />
                      </Box>

                      <Box className="absolute top-[60%] left-0 w-full">
                        <span className="absolute -top-2.5 left-0 font-medium">
                          L2
                        </span>
                        <div className="ml-7.5 border-t border-dashed border-ink/20 w-[calc(100%-30px)]" />
                      </Box>

                      <Box className="absolute top-[80%] left-0 w-full">
                        <span className="absolute -top-2.5 left-0 font-medium">
                          L1
                        </span>
                        <div className="ml-7.5 border-t border-dashed border-ink/20 w-[calc(100%-30px)]" />
                      </Box>
                    </Box>

                    {/* Bars Container */}
                    <Box className="absolute bottom-0 left-0 right-0 grid grid-cols-5 gap-2 sm:gap-4 items-end ml-7.5 h-full z-10">
                      {content.levels.map((item, idx) => {
                        const barHeights = [
                          "h-[20%]",
                          "h-[40%]",
                          "h-[60%]",
                          "h-[80%]",
                          "h-[100%]",
                        ];

                        return (
                          <Box
                            key={item.level || idx}
                            className={cn(
                              "w-full flex flex-col items-center justify-start text-center rounded-t-xl rounded-b-none px-1.5 sm:px-2 pt-4 sm:pt-6 transition-all duration-300",
                              item.color || "bg-ink",
                              barHeights[idx]
                            )}
                          >
                            <Text
                              className={cn(
                                "font-bold text-[11px] sm:text-xs md:text-sm leading-tight",
                                item.textColor || "text-white"
                              )}
                              dangerouslySetInnerHTML={{ __html: item.title }}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>

                  {/* Point Lists Below Bars */}
                  <Box className="grid grid-cols-5 gap-2 sm:gap-4 pt-4 ml-7.5">
                    {content.levels.map((item, idx) => (
                      <ul
                        key={item.level || idx}
                        className="space-y-1.5 text-[11px] sm:text-[12px] leading-tight text-ink-muted"
                      >
                        {item.points?.map((pt, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-1 sm:gap-1.5"
                          >
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-lime shrink-0 mt-1" />
                            <span dangerouslySetInnerHTML={{ __html: pt }} />
                          </li>
                        ))}
                      </ul>
                    ))}
                  </Box>
                </Box>

                {content.badgeText && (
                  <Box className="flex justify-center mt-6">
                    <Box 
                      className="bg-lime-soft text-ink text-xs font-bold px-4 sm:px-5 py-1.5 rounded-sm shadow-sm"
                      dangerouslySetInnerHTML={{ __html: content.badgeText }}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            {/* Read More button strictly outside scrollable container */}
            <Box className="flex justify-end mt-4 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs sm:text-sm text-ink/70 hover:text-ink border-b border-ink/60 pb-0.5 cursor-pointer transition-colors"
              >
                {isExpanded ? "Read less..." : "Read more..."}
              </button>
            </Box>
          </Box>
        )}

        {isExpanded && (
          <Box className="mt-8 space-y-6 sm:space-y-8 animate-fadeIn max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
            {content.expandTitle && (
              <Text 
                className="text-xs sm:text-sm md:text-base text-ink/80 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: content.expandTitle }}
              />
            )}

            {content.levels?.length > 0 && (
              <Box className="space-y-5 sm:space-y-6">
                {content.levels.map((item, index) => (
                  <Box
                    key={item.level || index}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <Box className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-ink text-lime font-bold text-[11px] sm:text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </Box>

                    <Box className="space-y-1 max-w-3xl">
                      <Text 
                        className="font-bold text-xs sm:text-sm md:text-base text-ink"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />

                      <Text 
                        className="text-xs sm:text-sm text-ink/70 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            {content.businessMeaning && (
              <Box className="pt-5 sm:pt-6 border-t border-ink/10">
                <Text className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                  <span 
                    className="font-bold text-ink"
                    dangerouslySetInnerHTML={{ __html: content.businessMeaning.title }}
                  />{" "}
                  <span dangerouslySetInnerHTML={{ __html: content.businessMeaning.text }} />
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Section>
  );
}