"use client";

import Link from "next/link";
import {
  Search,
  Compass,
  Monitor,
  Edit3,
  BarChart2,
  Zap,
  Network,
  Heart,
  Smile,
  Users,
  RefreshCw,
  TrendingUp,
  UserCheck,
  Target,
  Share2,
  ArrowRight,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import LdSoftCta from "@/components/common/ld-soft-cta";

const ICONS = {
  search: Search,
  compass: Compass,
  monitor: Monitor,
  edit: Edit3,
  "bar-chart": BarChart2,
  zap: Zap,
  network: Network,
  heart: Heart,
  smile: Smile,
  users: Users,
  refresh: RefreshCw,
  trending: TrendingUp,
  "user-check": UserCheck,
  target: Target,
  share: Share2,
};

export default function LdServices({ data }) {
  const content = data?.ldServicesData || data;

  if (!content?.items?.length) return null;

  const sectionId = content?.section_id || content?.id || "services";

  // Dynamic grid configuration: Defaults to 2 columns unless columns === 3
  const isThreeColumns = Number(content?.columns) === 3;
  const gridColsClass = isThreeColumns
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2";

  // Check if soft_cta exists
  const softCtaData = content?.soft_cta;

  return (
    <Section id={sectionId} className="bg-paper-warm">
      <Box className="space-y-10 sm:space-y-12">
        {/* Header Section */}
        <Reveal>
          <Box className="max-w-3xl">
            {content.heading && (
              <Box>
                <RichHeading heading={content.heading} />
              </Box>
            )}

            {content.show_subheading !== false && content.subheading && (
              <Text
                as="p"
                className="mt-4 text-[16px] text-ink-muted leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: content.subheading }}
              />
            )}
          </Box>
        </Reveal>

        {/* Dynamic Column Grid */}
        <Reveal delay={0.1}>
          <Box className={`grid ${gridColsClass} gap-5`}>
            {content.items.map((item) => {
              const IconComponent = ICONS[item.icon] || Search;
              const linkHref = item.href || item.primary_cta?.href || item.cta?.href || "#";
              const linkLabel = item.link || item.primary_cta?.label || item.cta?.label || "EXPLORE";

              return (
                <Box
                  key={item.title}
                  className="
                    flex h-full flex-col justify-between rounded-xl bg-white p-5 lg:p-6
                    border border-[#0a16281f] shadow-sm transition-all duration-200
                    hover:-translate-y-1
                  "
                >
                  {/* Upper Section */}
                  <Box>
                    {/* Icon Badge */}
                    <Box className="mb-5 grid size-10 place-items-center rounded-xl bg-lime-soft text-ink">
                      <IconComponent size={20} strokeWidth={1.8} aria-hidden="true" />
                    </Box>

                    {/* Title */}
                    <Text
                      as="h3"
                      className="mb-2.5 text-[18px] font-bold text-ink"
                    >
                      {item.title}
                    </Text>

                    {/* Description */}
                    <Text
                      as="p"
                      className="text-[14px] text-ink-muted leading-relaxed"
                    >
                      {item.description}
                    </Text>

                    {/* Divider */}
                    <Box className="mt-5 mb-3.5 border-t border-[#0a16281f]" />

                    {/* Metadata Section */}
                    <Box>
                      {item.covers && (
                        <Box className="flex items-baseline gap-2 mb-3">
                          <Text className="font-mono text-[10px] uppercase tracking-wider text-ink w-16 shrink-0">
                            COVERS
                          </Text>
                          <Text className="text-ink/80 font-medium text-[12px]">
                            {item.covers}
                          </Text>
                        </Box>
                      )}

                      {item.you_get && (
                        <Box className="flex items-baseline gap-2">
                          <Text className="font-mono text-[10px] uppercase tracking-wider text-ink w-16 shrink-0">
                            YOU GET
                          </Text>
                          <Text className="font-bold text-ink text-[12px]">
                            {item.you_get}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Card Bottom Link / CTA Button */}
                  <Box className="mt-5 pt-2">
                    <Link
                      href={linkHref}
                      className="
                        inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink
                        transition-opacity hover:opacity-75 focus-visible:outline-none
                      "
                    >
                      {linkLabel} <ArrowRight size={12} />
                    </Link>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Reveal>

        {/* Soft CTA Component */}
        {softCtaData && (
          <LdSoftCta 
            data={softCtaData.soft_cta ? softCtaData : { soft_cta: softCtaData, ...softCtaData }} 
          />
        )}
      </Box>
    </Section>
  );
}