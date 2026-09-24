"use client";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

export default function Engagements({ data}) {
  const content = data?.engagementsData || data;

  if (!content) return null;

  return (
    <Section id="engagements">
      <Box>
        
        {/* Header Block */}
        <Reveal>
          <Box className="mb-8 lg:mb-10 max-w-2xl">
            {content.heading && (
              <Box className="[&_span]:italic [&_span]:font-serif [&_span]:font-normal">
                <RichHeading heading={content.heading} />
              </Box>
            )}

            {content.showSubheading !== false && content.subheading && (
              <Text
                as="p"
                className="mt-3.5 text-sm sm:text-base text-ink/60 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: content.subheading }}
              />
            )}
          </Box>
        </Reveal>

        {/* Outer Card Wrapper */}
        <Reveal delay={0.1}>
            
            {/* Table Horizontal Scroll Container */}
            <Box className="w-full overflow-x-auto no-scrollbar rounded-xl bg-white border border-ink/10">
              <table className="w-full min-w-[720px] border-collapse text-left">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b-2 border-[#0a16281a] bg-[#f9f8f5]">
                    {/* Empty Left Label Cell */}
                    <th className="w-[34%] p-5 sm:p-6 text-left" />

                    {/* Dynamic Column Headers */}
                    {content.columns?.map((col) => (
                      <th
                        key={col.id}
                        className={`w-[16.5%] p-4 sm:p-6 text-center align-bottom transition-colors ${
                          col.highlight ? "bg-[#f4fae2]" : "bg-[#f9f8f5]"
                        }`}
                      >
                        <Box className="flex flex-col items-center justify-end">
                          <Text className="font-bold text-[17px] text-ink leading-tight">
                            {col.title}
                          </Text>
                          <Text className="text-[12px] text-ink/50 font-normal mt-1 leading-snug">
                            {col.subtitle}
                          </Text>

                          {/* "MOST POPULAR" Pill Badge */}
                          {col.badge && (
                            <span className="mt-2.5 inline-block rounded-full bg-[#d6fc27] px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-ink uppercase">
                              {col.badge}
                            </span>
                          )}
                        </Box>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white">
                  {content.rows?.map((row, idx) => {
                    // Adds a thicker section border every 5 rows (at idx 4, 9, 14, etc.)
                    const isGroupDivider = (idx + 1) % 5 === 0 && idx !== content.rows.length - 1;

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors hover:bg-ink/[0.01] ${
                          isGroupDivider
                            ? "border-b-2 border-[#0a16281a]"
                            : "border-b border-[#0a16280d]"
                        }`}
                      >
                        {/* Feature Label */}
                        <td className="p-3.5 sm:p-4 px-6 text-[13px] sm:text-[14px] font-normal text-ink/80 leading-snug">
                          {row.feature}
                        </td>

                        {/* Column Checkmark Cells */}
                        {content.columns?.map((col) => {
                          const isAvailable = row.availability?.[col.id];
                          return (
                            <td
                              key={col.id}
                              className={`p-3.5 sm:p-4 text-center align-middle ${
                                col.highlight ? "bg-[#f4fae2]/70" : "bg-white"
                              }`}
                            >
                              {isAvailable ? (
                                <span className="text-ink font-bold text-sm">
                                  ✓
                                </span>
                              ) : null}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}

                  {/* Bottom "YOU WALK AWAY WITH" Footer Row */}
                  {content.footer && (
                    <tr className="border-t-2 border-[#0a16281a] bg-[#f9f8f5]">
                      <td className="p-5 sm:p-6 text-[11px] font-mono tracking-widest text-ink/50 uppercase font-semibold leading-relaxed align-top">
                        {content.footer.label}
                      </td>
                      {content.columns?.map((col) => (
                        <td
                          key={col.id}
                          className={`p-5 sm:p-6 text-center align-top text-[12px] text-ink/70 leading-relaxed ${
                            col.highlight ? "bg-[#f4fae2]" : "bg-[#f9f8f5]"
                          }`}
                        >
                          {content.footer.takeaways?.[col.id]}
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>

              </table>
            </Box>
        </Reveal>

      </Box>
    </Section>
  );
}