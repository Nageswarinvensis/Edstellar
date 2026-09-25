"use client";

import Link from "next/link";
import {
  Search,
  Compass,
  Monitor,
  Edit3,
  BarChart2,
  Zap,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

const ICONS = {
  search: Search,
  compass: Compass,
  monitor: Monitor,
  edit: Edit3,
  "bar-chart": BarChart2,
  zap: Zap,
};

export default function LdServices({ data }) {
  const content = data?.ldServicesData || data;

  if (!content?.items?.length) return null;

  const sectionId = content?.sectionId || content?.id || "services";

  return (
    <Section id={sectionId} className="bg-paper-warm">
      <Box>
        {/* Header Section */}
        <Box className="mb-10 sm:mb-12 max-w-3xl">
          <Reveal>
            {content.heading && (
              <Box>
                <RichHeading heading={content.heading} />
              </Box>
            )}

            {content.showSubheading !== false && content.subheading && (
              <Text
                as="p"
                className="mt-4 text-[16px] text-ink-muted"
                dangerouslySetInnerHTML={{ __html: content.subheading }}
              />
            )}
          </Reveal>
        </Box>

        {/* 2-Column Responsive Grid matching Image */}
        <Reveal delay={0.1}>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.items.map((item) => {
              const IconComponent = ICONS[item.icon] || Search;

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
                    <Box className="mb-5 grid size-10 place-items-center rounded-xl bg-lime text-ink">
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
                      className="text-[14px] text-ink-muted"
                    >
                      {item.description}
                    </Text>

                    {/* Divider */}
                    <Box className="mt-5 mb-3.5 border-t border-ink-[#0a16281f]" />

                    {/* Metadata Section */}
                    <Box>
                      {item.covers && (
                        <Box className="flex items-baseline gap-2  mb-3">
                          <Text className="font-mono text-[10px] uppercase tracking-wider text-ink w-16 shrink-0">
                            COVERS
                          </Text>
                          <Text className="text-ink/80 font-medium text-[12px]">
                            {item.covers}
                          </Text>
                        </Box>
                      )}

                      {item.youGet && (
                        <Box className="flex items-baseline gap-2">
                          <Text className="font-mono text-[10px] uppercase tracking-wider text-ink w-16 shrink-0">
                            YOU GET
                          </Text>
                          <Text className="font-bold text-ink text-[12px]">
                            {item.youGet}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Footer Link */}
                  {item.link && item.href ? (
                    <Box className="mt-4.5">
                      <Link
                        href={item.href}
                        className="
                          inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink
                          transition-opacity hover:opacity-75 focus-visible:outline-none
                        "
                      >
                        {item.link}
                      </Link>
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}