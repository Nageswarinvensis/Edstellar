import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { coachingIcon } from "@/components/sections/coaching/icons";

export default function CoachingMoreRelated({ data }) {
  // Unwraps config if nested under DevCMS object, or uses data directly
  const contentData = data?.config || data;

  if (!contentData?.items?.length) return null;

  const {
    section_id,
    heading,
    description,
    items,
    footer_cta,
  } = contentData;

  return (
    <Section id={section_id} className="bg-white">
      <Box>
        {/* Header Section */}
        <Box className="max-w-3xl">
          {heading && (
            <Reveal>
              <RichHeading
                heading={heading}
                emphasisClassName="font-serif italic font-normal text-slate-900"
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              />
            </Reveal>
          )}
          {description && (
            <Reveal delay={1}>
              <Text as="p" className="mt-3 text-sm text-slate-500 sm:text-base">
                {description}
              </Text>
            </Reveal>
          )}
        </Box>

        {/* Cards Grid */}
        <Box className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const iconName = item.icon || item.card_icon;
            const Icon = iconName ? coachingIcon(iconName) : null;
            const title = item.title || item.card_title;
            const itemDesc = item.description || item.card_description;
            const audience = item.audience || item.card_audience;
            const href = item.href || item.card_href || "#";
            const ctaLabel = item.cta_label || item.card_cta_label;
            const isFirstCard = index === 0;

            return (
              <Reveal key={href || index} delay={Math.min(index + 1, 4)}>
                <Box
                  as={Link}
                  href={href}
                  className={`group flex h-full flex-col justify-between rounded-2xl border p-5 lg:p-7 no-underline transition-all duration-300 ease-in-out ${
                    isFirstCard
                      ? "border-[#0a16281f] bg-white shadow-xl shadow-slate-200/60 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl"
                      : "border-[#0a16281f] bg-white hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
                  }`}
                >
                  {/* Card Content Top */}
                  <Box>
                    {/* Header Row: Icon & Audience Badge */}
                    <Box className="flex items-center justify-between gap-3">
                      {Icon ? (
                        <Box className="flex h-12 w-12 items-center justify-center rounded-lg bg-paper-warm text-slate-700 transition-colors group-hover:bg-slate-100">
                          <Icon size={18} strokeWidth={1.75} />
                        </Box>
                      ) : (
                        <Box />
                      )}
                      {audience && (
                        <Text
                          as="span"
                          className="font-mono text-[10px] font-medium tracking-wider uppercase text-slate-400"
                        >
                          {audience}
                        </Text>
                      )}
                    </Box>

                    {/* Card Title */}
                    {title && (
                      <Text
                        as="h3"
                        className="mt-5 text-base font-bold text-slate-900 transition-colors group-hover:text-black"
                      >
                        {title}
                      </Text>
                    )}

                    {/* Card Description */}
                    {itemDesc && (
                      <Text
                        as="p"
                        className="mt-2 text-xs leading-relaxed text-slate-500"
                      >
                        {itemDesc}
                      </Text>
                    )}
                  </Box>

                  {/* Card Link CTA */}
                  {ctaLabel && (
                    <Box
                      as="span"
                      className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-slate-900"
                    >
                      {ctaLabel}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Box>
                  )}
                </Box>
              </Reveal>
            );
          })}
        </Box>

        {/* Footer Link */}
        {footer_cta && (
          <Reveal delay={5}>
            <Box className="mt-12 flex justify-center">
              <Box
                as={Link}
                href={footer_cta.href || "#"}
                className="group flex items-center gap-2 text-xs font-bold text-slate-900 no-underline"
              >
                <Box as="span" className="border-b-2 border-lime-400 pb-0.5">
                  {footer_cta.label}
                </Box>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Box>
            </Box>
          </Reveal>
        )}
      </Box>
    </Section>
  );
}