import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";

export default function MapSection({ data }) {
  if (!data) return null;

  return (
    <Section
      as="section"
      id="why-edstellar"
      className="w-full bg-[#F3F1E8] px-5 py-10 lg:px-10 lg:py-20"
    >
      <Box>
        {/* =========================================================
            TOP / HERO
        ========================================================== */}
        <Box className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-12">
          {/* Left content */}
          <Box className="max-w-[650px]">
            {/* Heading */}
            <Reveal>
              <RichHeading
                as="h2"
                parts={data.headlineParts}
                className="mb-6.5 max-w-[20ch]"
              />
            </Reveal>

            {/* Description */}
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-7 text-[16px] leading-[1.75] text-[#617087] sm:text-[17px]"
              >
                {data.description}
              </Text>
            </Reveal>
          </Box>

          {/* World map */}
          <Box className="flex w-full items-start justify-center lg:justify-end">
            <Box className="relative mt-1 h-37.5 w-full max-w-97.5 overflow-hidden">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                priority
                sizes="390px"
                className="
                  object-contain
                  object-center
                  opacity-[0.55]
                  lg:object-top-right
                "
              />
            </Box>
          </Box>
        </Box>

        {/* =========================================================
            STATS
        ========================================================== */}
        <Reveal delay={2}>
          <Box className="mt-11 grid grid-cols-1 overflow-hidden rounded-[14px] border border-[#D9DCE0] bg-white sm:grid-cols-2 lg:grid-cols-4">
            {data.stats?.map((stat, index) => (
              <Box
                key={index}
                className="min-h-22.5 border-[#D9DCE0] px-5 py-5 sm:px-6 lg:border-r lg:last:border-r-0"
              >
                <Box className="flex items-baseline gap-2">
                  <Text
                    as="span"
                    className="text-[25px] font-bold leading-none tracking-[-0.035em] text-[#07162C]"
                  >
                    {stat.value}
                  </Text>

                  {stat.connector && (
                    <>
                      <Text
                        as="span"
                        className="text-[11px] text-[#687383]"
                      >
                        {stat.connector}
                      </Text>

                      <Text
                        as="span"
                        className="text-[25px] font-bold leading-none tracking-[-0.035em] text-[#07162C]"
                      >
                        {stat.secondaryValue}
                      </Text>
                    </>
                  )}
                </Box>

                <Text
                  as="p"
                  className="mt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[#697487]"
                >
                  {stat.label}
                </Text>
              </Box>
            ))}
          </Box>
        </Reveal>

        {/* =========================================================
            FEATURE CARDS
            Only render when features data exists
        ========================================================== */}
        {data.features?.length > 0 && (
          <Reveal delay={3}>
            <Box className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.features.map((feature, index) => (
                <Box
                  key={index}
                  className={`
                    min-h-[195px]
                    rounded-[16px]
                    border
                    border-[#D9DDE1]
                    bg-white
                    p-7
                    transition-all
                    duration-300
                    ease-out
                    ${
                      feature.hover
                        ? "hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(10,22,40,0.16)]"
                        : "hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(10,22,40,0.08)]"
                    }
                  `}
                >
                  {/* Icon */}
                  <Box className="flex size-10.5 items-center justify-center rounded-[11px] bg-[#F0F9D3] text-[20px]">
                    {feature.icon}
                  </Box>

                  {/* Title */}
                  <Text
                    as="h3"
                    className="mt-5 text-[18px] font-semibold leading-[1.2] tracking-[-0.025em] text-[#07162C]"
                  >
                    {feature.title}
                  </Text>

                  {/* Description */}
                  <Text
                    as="p"
                    className="mt-3 max-w-85 text-[14px] leading-[1.65] text-[#65738A]"
                  >
                    {feature.description}
                  </Text>
                </Box>
              ))}
            </Box>
          </Reveal>
        )}

        {/* =========================================================
            RELATED SERVICES
            Only render when relatedServices data exists
        ========================================================== */}
        {data.relatedServices?.length > 0 && (
          <Reveal delay={4}>
            <Box className="mt-12 border-t border-[#D6D5CF] pt-8">
              {data.relatedLabel && (
                <Text
                  as="p"
                  className="mb-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#667084]"
                >
                  {data.relatedLabel}
                </Text>
              )}

              <Box className="grid grid-cols-1 overflow-hidden rounded-[14px] border border-[#D9DDE1] bg-white md:grid-cols-2 lg:grid-cols-3">
                {data.relatedServices.map((service, index) => (
                  <Box
                    as="a"
                    href={service.href}
                    key={index}
                    className={`
                      group
                      relative
                      min-h-23
                      border-[#D9DDE1]
                      px-5
                      py-4
                      transition-colors
                      duration-200
                      ${
                        index % 3 !== 2
                          ? "lg:border-r"
                          : ""
                      }
                      ${
                        index < 3
                          ? "lg:border-b"
                          : ""
                      }
                      ${
                        index % 2 === 0
                          ? "md:border-r lg:border-r"
                          : ""
                      }
                      hover:bg-[#F5F3EB]
                    `}
                  >
                    {/* Arrow */}
                    <Text
                      as="span"
                      className="absolute right-5 top-4 text-[12px] text-[#7A8491] transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </Text>

                    {/* Title */}
                    <Text
                      as="h4"
                      className="pr-7 text-[14px] font-medium leading-[1.25] text-[#07162C]"
                    >
                      {service.title}
                    </Text>

                    {/* Description */}
                    <Text
                      as="p"
                      className="mt-2 max-w-82.5 text-[11px] leading-[1.25] text-[#6A7587]"
                    >
                      {service.description}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        )}
      </Box>
    </Section>
  );
}