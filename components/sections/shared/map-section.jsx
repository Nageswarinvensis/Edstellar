import Image from "next/image";
import {
  MessageCircle,
  Route,
  UserCheck,
  Wrench,
  Rocket,
  Award,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * Fixed regardless of which domain sends `feature.icon` — the icon on each
 * of the eight FEATURE CARDS is chosen by position, not by CMS/content data.
 */
const FEATURE_ICONS = ["✏️", "⚙️", "🧪", "👤", "👥", "🌐", "🗓️", "📊"];

const APPROACH_ICONS = [MessageCircle, Route, UserCheck, Wrench, Rocket, Award];

const STATS = [
  { value: "10,000+", label: "EXPERT TRAINERS" },
  { value: "13+", label: "YEARS DELIVERING" },
  { value: "1,000+", label: "ORGANIZATIONS TRAINED" },
  {
    value: "ISO 9001",
    connector: "&",
    secondary_value: "27001",
    label: "CERTIFIED",
  },
];

const APPROACH_STEPS = [
  {
    number: "01",
    title: "Consult",
    description:
      "We start with your monitoring reality: what is in production, what broke last quarter, and which teams own the response.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "A scoped roadmap with module sequence, cohort split and the dates that fit around your release calendar.",
  },
  {
    number: "03",
    title: "Align",
    description:
      "A practitioner trainer matched to your stack, briefed on your tooling before the first session.",
  },
  {
    number: "04",
    title: "Customize",
    description:
      "Exercises rebuilt around your models and your alerting, so the practice transfers on Monday.",
  },
  {
    number: "05",
    title: "Execute",
    description:
      "Instructor-led delivery, on-site, virtual or blended, with hands-on labs rather than slideware.",
  },
  {
    number: "06",
    title: "Evaluate",
    description:
      "Impact measured against a number you already track, plus competency evidence for every participant.",
  },
];

function ApproachStep({ step, Icon }) {
  return (
    <Box as="li" className="flex min-w-0 flex-col gap-2">
      <Box className="relative z-10 flex size-12 flex-none items-center justify-center rounded-full border border-lime/65 bg-navy text-lime">
        <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
      </Box>
      <Text
        as="span"
        className="mt-4 font-mono text-[10px] font-medium tracking-[0.12em] text-lime uppercase"
      >
        Step {step.number}
      </Text>
      <Text
        as="h4"
        className="font-display text-base font-semibold tracking-[-0.01em] text-paper"
      >
        {step.title}
      </Text>
      <Text as="p" className="text-[14px] leading-[1.6] text-paper/60">
        {step.description}
      </Text>
    </Box>
  );
}

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
          <Box className="max-w-162">
            {/* Heading */}
            <Reveal>
              <RichHeading
                heading={data.heading}
                className="mb-6.5 max-w-[20ch]"
              />
            </Reveal>

            {/* Description */}
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-7 text-[16px] leading-[1.75] text-ink-muted"
              >
                {data.description}
              </Text>
            </Reveal>
          </Box>

          {/* World map — static asset, not CMS-driven */}
          <Box className="flex w-full items-start justify-center lg:justify-end">
            <Box className="relative mt-1 h-37.5 w-full max-w-97.5 overflow-hidden">
              <Image
                src="/course/map1.png"
                alt="Global delivery map"
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
            {STATS.map((stat, index) => (
              <Box
                key={index}
                className="min-h-22.5 border-[#D9DCE0] p-5 sm:px-6 lg:border-r lg:last:border-r-0"
              >
                <Box className="flex items-baseline gap-2">
                  <Text
                    as="span"
                    className="text-[24px] font-bold leading-none tracking-[-0.035em] text-[#0A1628]"
                  >
                    {stat.value}
                  </Text>

                  {stat.connector && (
                    <>
                      <Text
                        as="span"
                        className="text-[12px] text-ink-muted"
                      >
                        {stat.connector}
                      </Text>

                      <Text
                        as="span"
                        className="text-[24px] font-bold leading-none tracking-[-0.035em] text-[#0A1628]"
                      >
                        {stat.secondary_value}
                      </Text>
                    </>
                  )}
                </Box>

                <Text
                  as="p"
                  className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted"
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
                  className={`min-h-48 rounded-[16px] border border-[#D9DDE1] bg-white p-7 transition-all duration-300 ease-out
                    ${
                      feature.hover
                        ? "hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(10,22,40,0.16)]"
                        : "hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(10,22,40,0.08)]"
                    }
                  `}
                >
                  {/* Icon — static by position, not read from content */}
                  <Box className="flex size-10.5 items-center justify-center rounded-[11px] bg-[#F0F9D3] text-[20px]">
                    {FEATURE_ICONS[index]}
                  </Box>

                  {/* Title */}
                  <Text
                    as="h3"
                    className="mt-5 text-[18px] font-semibold leading-[1.2] tracking-tight text-ink"
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
            APPROACH — six-stage process rail
            Only render when approach data exists
        ========================================================== */}
        {data.approach?.heading && (
          <Reveal delay={4}>
            <Box className="mt-9 rounded-[18px] bg-ink p-10 max-[600px]:p-6">
              <RichHeading
                as="h3"
                heading={data.approach.heading}
                emphasisClassName="font-serif font-normal italic text-lime"
                className="max-w-[36ch] font-display text-[clamp(20px,2vw,24px)] leading-tight font-semibold tracking-[-0.02em] text-paper"
              />
              <Text
                as="p"
                className="mt-4 max-w-[66ch] text-base leading-[1.7] text-paper/60"
              >
                {data.approach.description}
              </Text>

              <Box
                as="ol"
                className="relative mt-10 grid grid-cols-1 gap-8 min-[541px]:grid-cols-2 min-[761px]:grid-cols-3 min-[1081px]:grid-cols-6"
              >
                <Box
                  aria-hidden="true"
                  className="pointer-events-none absolute top-6 left-6 hidden h-px bg-paper/12 min-[1081px]:block"
                  style={{ right: "calc((100% - 5 * 2rem) / 6 - 1.5rem)" }}
                />

                {APPROACH_STEPS.map((step, index) => (
                  <ApproachStep
                    key={step.number}
                    step={step}
                    Icon={APPROACH_ICONS[index] || MessageCircle}
                  />
                ))}
              </Box>
            </Box>
          </Reveal>
        )}

        {/* =========================================================
            RELATED SERVICES
            Only render when related_services data exists
        ========================================================== */}
        {data.related_services?.length > 0 && (
          <Reveal delay={4}>
            <Box className="mt-12 border-t border-[#D6D5CF] pt-8">
              {data.related_label && (
                <Text
                  as="p"
                  className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted"
                >
                  {data.related_label}
                </Text>
              )}

              <Box className="grid grid-cols-1 overflow-hidden rounded-[14px] border border-[#D9DDE1] bg-white md:grid-cols-2 lg:grid-cols-3">
                {data.related_services.map((service, index) => (
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
                      ${index % 3 !== 2 ? "lg:border-r" : ""}
                      ${index < 3 ? "lg:border-b" : ""}
                      ${index % 2 === 0 ? "md:border-r lg:border-r" : ""}
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
                      className="pr-7 text-[14px] font-medium leading-tight text-ink"
                    >
                      {service.title}
                    </Text>

                    {/* Description */}
                    <Text
                      as="p"
                      className="mt-2 max-w-82.5 text-[11px] leading-tight text-ink-muted"
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
