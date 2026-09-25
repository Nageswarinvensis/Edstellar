"use client";

import Link from "next/link";
import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

export default function Engagements({ data }) {
  const content = data?.engagementsData || data;

  if (!content) return null;

  return (
    <Section id="engagements" className="bg-paper py-16 lg:py-20">
      <Box className="mx-auto max-w-225 px-4 sm:px-6">
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

        {/* Engagement Comparison Table */}
        <Reveal delay={0.1}>
          <Box className="overflow-hidden rounded-[12px] border border-white bg-transparent">
            {/* Added overflow-x-auto for horizontal scrolling on small screens */}
            <Box className="no-scrollbar overflow-x-auto">
              <table className="w-full min-w-160 border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-[#0a162829]">
                    {/* Empty Feature Header */}
                    <th className="w-[40%] bg-transparent p-0" />

                    {/* Column Headers */}
                    {content.columns?.map((col) => (
                      <th
                        key={col.id}
                        className="bg-transparent p-0 text-center align-bottom"
                      >
                        <Box className="flex min-h-20 flex-col items-center justify-end px-2 py-3.5">
                          <Text className="text-[16px] font-bold leading-4 text-ink">
                            {col.title}
                          </Text>

                          <Text className="mt-1 text-[12px] font-normal leading-3 text-ink-muted">
                            {col.subtitle}
                          </Text>

                          {col.badge && (
                            <span className="mt-2 inline-flex h-5 items-center rounded-full bg-lime px-2.5 py-1 text-[8px] font-normal uppercase tracking-[0.07em] text-ink">
                              {col.badge}
                            </span>
                          )}
                        </Box>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {content.rows?.map((row, idx) => {
                    const isGroupDivider =
                      (idx + 1) % 5 === 0 && idx !== content.rows.length - 1;

                    return (
                      <tr
                        key={idx}
                        className={`h-9 ${
                          isGroupDivider
                            ? "border-b-2 border-[#0a162829]"
                            : "border-b border-[#0a162814]"
                        }`}
                      >
                        {/* Feature */}
                        <td className="bg-white px-1.5 py-1.5 pl-3 text-[12px] font-normal leading-4 text-[#263244]">
                          {row.feature}
                        </td>

                        {/* Availability */}
                        {content.columns?.map((col) => {
                          const isAvailable = row.availability?.[col.id];

                          return (
                            <td
                              key={col.id}
                              className={`p-0 text-center align-middle ${
                                col.highlight ? "bg-[#C8F1351A]" : "bg-white"
                              }`}
                            >
                              {isAvailable ? (
                                <span className="inline-block text-[13px] font-bold leading-none text-[#07182c]">
                                  ✓
                                </span>
                              ) : null}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}

                  {/* Footer */}
                  {content.footer && (
                    <tr className="border-t-2 border-[#0a16281a] bg-transparent">
                      <td className="bg-transparent px-3 py-2.5 align-top text-[10px] font-mono uppercase leading-3 tracking-[0.12em] text-ink">
                        {content.footer.label}
                      </td>

                      {content.columns?.map((col) => (
                        <td
                          key={col.id}
                          className="bg-transparent px-2 py-3.5 text-center align-top text-[12px] font-normal leading-3 text-ink-muted"
                        >
                          {content.footer.takeaways?.[col.id]}
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </Box>
          </Box>
        </Reveal>

        {/* Bottom CTA Card */}
        {content.ctaCard && (
          <Reveal delay={0.2}>
            <Box className="mt-8 lg:mt-11 rounded-xl border border-[#0a16281f] bg-paper-cream p-5 lg:p-9 text-center shadow-sm">
              <Box className="mx-auto flex max-w-xl flex-col items-center">
                {/* Badge */}
                {content.ctaCard.badge && (
                  <span className="inline-block rounded-full bg-lime px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-ink">
                    {content.ctaCard.badge}
                  </span>
                )}

                {/* Heading */}
                {content.ctaCard.heading && (
                  <Box className="mt-4 text-[20px] lg:text-[32px] font-bold text-ink leading-snug [&_span]:italic [&_span]:font-serif [&_span]:font-normal">
                    <RichHeading heading={content.ctaCard.heading} />
                  </Box>
                )}

                {/* Description */}
                {content.ctaCard.description && (
                  <Text className="mt-3 text-[16px] leading-relaxed text-ink-muted font-normal">
                    {content.ctaCard.description}
                  </Text>
                )}

                {/* Action Buttons */}
                <Box className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {content.ctaCard.primaryBtn && (
                    <Link
                      href={content.ctaCard.primaryBtn.href || "#"}
                      className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-[12px] font-semibold text-lime transition-opacity hover:opacity-90"
                    >
                      {content.ctaCard.primaryBtn.text}
                    </Link>
                  )}

                  {content.ctaCard.secondaryBtn && (
                    <Link
                      href={content.ctaCard.secondaryBtn.href || "#"}
                      className="inline-flex items-center justify-center rounded-full border border-ink bg-transparent px-6 py-3 text-[12px] font-semibold text-ink transition-colors hover:bg-ink/5"
                    >
                      {content.ctaCard.secondaryBtn.text}
                    </Link>
                  )}
                </Box>
              </Box>
            </Box>
          </Reveal>
        )}
      </Box>
    </Section>
  );
}