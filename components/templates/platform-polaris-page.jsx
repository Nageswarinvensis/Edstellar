import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { CtaButton } from "@/components/common/cta-button";
import PlatformEnquiryForm from "@/components/forms/platform-enquiry-form";

/** SVG placeholder image block — visible on both light and dark backgrounds */
function ImagePlaceholder({ className, dark = false }) {
  return (
    <Box
      className={`aspect-video w-full rounded-2xl flex flex-col items-center justify-center gap-3 border ${dark ? "bg-paper/8 border-paper/12" : "bg-navy/6 border-ink/10"} ${className ?? ""}`}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        className={dark ? "text-paper/30" : "text-ink/20"} strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <Text as="span" className={`font-mono text-[10px] tracking-[0.12em] uppercase ${dark ? "text-paper/30" : "text-ink/30"}`}>
        Image coming soon
      </Text>
    </Box>
  );
}

/**
 * Template for the Polaris Team Effectiveness Suite platform page.
 * Sections: Hero (navy) → Problem → How it works → Decks → Phases → Virtual → Reports → Form
 */
export default function PlatformPolarisPage({ page }) {
  const {
    hero,
    problem,
    howItWorks,
    decks,
    phases,
    virtual: virtualSection,
    reports,
    form,
    breadcrumbs,
  } = page;

  return (
    <>
      {/* ── 1. HERO ── */}
      <Section
        id="top"
        aria-labelledby="polaris-hero-h"
        className="bg-navy py-16 lg:py-24"
      >
        <Breadcrumbs items={breadcrumbs} tone="dark" />

        <Box className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14 lg:items-center">
          <Box>
            <Reveal delay={1}>
              <RichHeading
                as="h1"
                id="polaris-hero-h"
                heading={hero.heading}
                className="text-white text-[clamp(38px,4.4vw,48px)] leading-[1.05]"
                emphasisClassName="text-lime"
              />
            </Reveal>

            <Reveal delay={2}>
              <Text
                as="p"
                className="mt-5 max-w-[56ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-white/72"
              >
                {hero.subheading}
              </Text>
            </Reveal>

            <Reveal delay={3}>
              <Box className="mt-8 flex flex-wrap gap-4">
                {hero.ctas?.map((cta) => (
                  <CtaButton
                    key={cta.href}
                    variant={cta.variant === "secondary" ? "ghost" : "primary"}
                    color={cta.variant === "secondary" ? undefined : "lime"}
                    render={<Link href={cta.href} />}
                    className={
                      cta.variant === "secondary"
                        ? "border-white/40 text-white hover:border-white"
                        : undefined
                    }
                  >
                    {cta.label}
                  </CtaButton>
                ))}
              </Box>
            </Reveal>

            {/* Fact badges */}
            {hero.facts?.length > 0 && (
              <Reveal delay={4}>
                <Box
                  as="ul"
                  aria-label="Polaris at a glance"
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {hero.facts.map((fact) => (
                    <Box
                      as="li"
                      key={fact.label}
                      className="rounded-full border border-white/20 px-4 py-2 font-mono text-[12px] tracking-wide text-white/80 uppercase"
                    >
                      {fact.label}
                    </Box>
                  ))}
                </Box>
              </Reveal>
            )}
          </Box>

          {/* Hero visual placeholder */}
          <Reveal delay={2}>
            <ImagePlaceholder dark />
          </Reveal>
        </Box>
      </Section>

      {/* ── 2. PROBLEM ── */}
      <Section
        id="problem"
        aria-labelledby="polaris-problem-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Box className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <Box>
            <Reveal delay={1}>
              <RichHeading
                as="h2"
                id="polaris-problem-h"
                heading={problem.heading}
                className="text-ink"
                emphasisClassName="text-olive"
              />
            </Reveal>
            {problem.description && (
              <Reveal delay={2}>
                <Text
                  as="p"
                  className="mt-4 max-w-[52ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
                >
                  {problem.description}
                </Text>
              </Reveal>
            )}
          </Box>

          <Box as="ul" className="grid gap-5">
            {problem.items?.map((item, i) => (
              <Reveal key={item.title} delay={i + 1}>
                <Box
                  as="li"
                  className="flex gap-4 rounded-2xl border border-ink/12 bg-white p-5"
                >
                  <Box className="mt-0.5 flex size-8 flex-none items-center justify-center rounded-lg bg-navy/8">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-navy"
                      aria-hidden="true"
                    >
                      <path d="M12 1.5 13.95 10.05 22.5 12 13.95 13.95 12 22.5 10.05 13.95 1.5 12 10.05 10.05Z" />
                    </svg>
                  </Box>
                  <Box>
                    <Text as="h3" className="text-[16px] font-semibold leading-snug text-ink">
                      {item.title}
                    </Text>
                    <Text as="p" className="mt-1 text-[15px] leading-[1.6] text-ink/60">
                      {item.description}
                    </Text>
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>
      </Section>

      {/* ── 3. HOW IT WORKS ── */}
      <Section
        id="why"
        aria-labelledby="polaris-how-h"
        className="bg-white py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="polaris-how-h"
            heading={howItWorks.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {howItWorks.description && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {howItWorks.description}
            </Text>
          </Reveal>
        )}

        <Box className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {howItWorks.cards?.map((card, i) => (
            <Reveal key={card.title} delay={i + 1}>
              <Box className="rounded-2xl border border-ink/12 bg-paper p-6">
                <Box className="mb-4 flex size-10 items-center justify-center rounded-lg bg-paper-warm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-navy"
                    aria-hidden="true"
                  >
                    <circle cx="9" cy="8" r="3.5" />
                    <path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
                    <circle cx="17" cy="9" r="2.5" />
                    <path d="M16.5 14.6c2.6.2 4.4 1.9 5 4.9" />
                  </svg>
                </Box>
                <Text as="h3" className="text-ink">
                  {card.title}
                </Text>
                <Text as="p" className="mt-2 text-[15px] leading-[1.6] text-ink/60">
                  {card.description}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>

        {/* Rhythm block */}
        {howItWorks.rhythm && (
          <Reveal delay={2}>
            <Box className="mt-10 rounded-2xl bg-navy p-8 lg:p-10">
              <RichHeading
                as="h3"
                heading={howItWorks.rhythm.heading}
                className="text-white text-[clamp(20px,2vw,26px)]"
                emphasisClassName="text-lime"
              />
              <Box
                as="ol"
                className="mt-6 grid gap-4 sm:grid-cols-3"
                style={{ listStyle: "none", padding: 0 }}
              >
                {howItWorks.rhythm.steps?.map((step, i) => (
                  <Box as="li" key={step.title} className="flex gap-3">
                    <Text
                      as="span"
                      className="font-mono text-[13px] text-lime/60"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </Text>
                    <Box>
                      <Text as="span" className="block font-display font-semibold text-[15px] text-white">
                        {step.title}
                      </Text>
                      <Text as="p" className="mt-1 text-[14px] leading-[1.6] text-white/60">
                        {step.description}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        )}
      </Section>

      {/* ── 4. DECKS ── */}
      <Section
        id="decks"
        aria-labelledby="polaris-decks-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="polaris-decks-h"
            heading={decks.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {decks.description && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {decks.description}
            </Text>
          </Reveal>
        )}

        {/* Stats row */}
        {decks.stats?.length > 0 && (
          <Reveal delay={2}>
            <Box
              as="ul"
              aria-label="Polaris at a glance"
              className="mt-8 flex flex-wrap gap-6 rounded-2xl border border-ink/12 bg-white p-6"
            >
              {decks.stats.map((stat) => (
                <Box as="li" key={stat.label} className="flex-1 basis-36">
                  <Text
                    as="span"
                    className="block font-display text-[28px] font-bold tracking-tight text-ink"
                  >
                    {stat.value}
                  </Text>
                  <Text as="span" className="mt-1 block text-[13px] leading-[1.4] text-ink/60">
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </Box>
          </Reveal>
        )}

        <Box className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {decks.items?.map((deck, i) => (
            <Reveal key={deck.title} delay={(i % 3) + 1}>
              <Box className="overflow-hidden rounded-2xl border border-ink/12 bg-white">
                <ImagePlaceholder />
                <Box className="p-5">
                  <Text as="h3" className="text-ink">
                    {deck.title}
                  </Text>
                  {deck.question && (
                    <Text as="p" className="mt-1 text-[14px] leading-[1.5] text-ink/50 italic">
                      &ldquo;{deck.question}&rdquo;
                    </Text>
                  )}
                  <Text as="p" className="mt-3 text-[15px] leading-[1.6] text-ink/70">
                    {deck.description}
                  </Text>
                  {deck.compact && (
                    <Text as="p" className="mt-3 font-mono text-[11px] tracking-wide text-ink/50 uppercase">
                      Compact:{" "}
                      <Text as="span" className="font-semibold text-ink/70 normal-case tracking-normal text-[11px]">
                        {deck.compact}
                      </Text>
                      {deck.compactDescription && (
                        <Text as="span" className="block mt-0.5 font-normal normal-case tracking-normal text-[12px] text-ink/50">
                          {deck.compactDescription}
                        </Text>
                      )}
                    </Text>
                  )}
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 5. PHASES ── */}
      <Section
        id="phases"
        aria-labelledby="polaris-phases-h"
        className="bg-navy py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="polaris-phases-h"
            heading={phases.heading}
            className="max-w-[760px] text-white"
            emphasisClassName="text-lime"
          />
        </Reveal>
        {phases.description && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-white/70"
            >
              {phases.description}
            </Text>
          </Reveal>
        )}

        <Box
          as="ol"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ listStyle: "none", padding: 0 }}
        >
          {phases.items?.map((phase, i) => (
            <Reveal key={phase.title} delay={(i % 3) + 1}>
              <Box as="li" className="rounded-2xl border border-white/12 p-6">
                <Box className="flex items-center gap-3">
                  <Text as="span" className="font-mono text-[13px] text-lime/60">
                    {phase.number}
                  </Text>
                  <Text as="h3" className="text-white text-[20px]">
                    {phase.title}
                  </Text>
                </Box>
                {phase.time && (
                  <Text as="span" className="mt-2 block font-mono text-[11px] tracking-wide text-white/40 uppercase">
                    {phase.time}
                  </Text>
                )}
                {/* Card number minis */}
                <Box className="mt-3 flex gap-1.5" aria-hidden="true">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <Box
                      key={j}
                      className="flex size-7 items-center justify-center rounded-md border border-white/15 font-mono text-[10px] text-white/50"
                    >
                      {i * 6 + j + 1}
                    </Box>
                  ))}
                </Box>
                <Text as="p" className="mt-4 text-[15px] leading-[1.6] text-white/60">
                  {phase.description}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>

        {/* Session outcomes */}
        {phases.outcomes && (
          <Reveal delay={2}>
            <Box className="mt-12 rounded-2xl border border-white/12 p-8">
              <RichHeading
                as="h3"
                heading={phases.outcomes.heading}
                className="text-white text-[clamp(20px,2vw,26px)]"
                emphasisClassName="text-lime"
              />
              <Box as="ul" className="mt-6 grid gap-4 sm:grid-cols-2">
                {phases.outcomes.items?.map((outcome) => (
                  <Box as="li" key={outcome.title} className="flex gap-3">
                    <Box className="mt-0.5 flex size-7 flex-none items-center justify-center rounded-md bg-white/8">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#C8F135"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    </Box>
                    <Box>
                      <Text as="span" className="block font-display font-semibold text-[15px] text-white">
                        {outcome.title}
                      </Text>
                      <Text as="p" className="mt-0.5 text-[14px] leading-[1.5] text-white/60">
                        {outcome.description}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        )}
      </Section>

      {/* ── 6. VIRTUAL ── */}
      <Section
        id="virtual"
        aria-labelledby="polaris-virtual-h"
        className="bg-white py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="polaris-virtual-h"
            heading={virtualSection.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {virtualSection.description && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {virtualSection.description}
            </Text>
          </Reveal>
        )}

        <Box className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {virtualSection.points?.map((point, i) => (
            <Reveal key={point.title} delay={i + 1}>
              <Box className="rounded-2xl border border-ink/12 bg-paper p-6">
                <Box className="mb-4 flex size-10 items-center justify-center rounded-lg bg-paper-warm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-navy"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M8 20h8M12 16v4" />
                  </svg>
                </Box>
                <Text as="h3" className="text-ink">
                  {point.title}
                </Text>
                <Text as="p" className="mt-2 text-[15px] leading-[1.6] text-ink/60">
                  {point.description}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>

        {virtualSection.note && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-8 rounded-2xl border border-ink/10 bg-paper px-6 py-4 text-[15px] leading-[1.6] text-ink/70"
            >
              {virtualSection.note}
            </Text>
          </Reveal>
        )}
      </Section>

      {/* ── 7. REPORTS ── */}
      <Section
        id="reports"
        aria-labelledby="polaris-reports-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="polaris-reports-h"
            heading={reports.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {reports.description && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {reports.description}
            </Text>
          </Reveal>
        )}

        <Box className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reports.items?.map((report, i) => (
            <Reveal key={report.title} delay={(i % 2) + 1}>
              <Box className="rounded-2xl border border-ink/12 bg-white p-6">
                <Box className="mb-4 flex size-10 items-center justify-center rounded-lg bg-paper-warm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-navy"
                    aria-hidden="true"
                  >
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
                  </svg>
                </Box>
                <Text as="h3" className="text-ink">
                  {report.title}
                </Text>
                {report.for && (
                  <Text as="p" className="mt-1 text-[14px] leading-[1.5] text-ink/50">
                    For <strong className="text-ink/70">{report.for}</strong>
                  </Text>
                )}
                {report.points?.length > 0 && (
                  <Box as="ul" className="mt-4 grid gap-2 border-t border-ink/10 pt-4">
                    {report.points.map((point) => (
                      <Box
                        as="li"
                        key={point}
                        className="flex gap-2 text-[14px] leading-[1.5] text-ink/70"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-0.5 flex-none text-navy"
                          aria-hidden="true"
                        >
                          <path d="m5 12.5 4.5 4.5L19 7.5" />
                        </svg>
                        {point}
                      </Box>
                    ))}
                  </Box>
                )}
                {report.access && (
                  <Text as="p" className="mt-4 font-mono text-[11px] tracking-wide text-ink/40 uppercase">
                    {report.access}
                  </Text>
                )}
              </Box>
            </Reveal>
          ))}
        </Box>

        {/* Report timeline */}
        {reports.timeline?.length > 0 && (
          <Reveal delay={2}>
            <Box
              as="ol"
              className="mt-10 grid grid-cols-1 gap-5 rounded-2xl border border-ink/12 bg-white p-6 sm:grid-cols-3"
              style={{ listStyle: "none", padding: "1.5rem" }}
            >
              {reports.timeline.map((item) => (
                <Box as="li" key={item.when}>
                  <Text as="span" className="block font-display font-semibold text-[15px] text-ink">
                    {item.when}
                  </Text>
                  <Text as="p" className="mt-1 text-[14px] leading-[1.6] text-ink/60">
                    {item.description}
                  </Text>
                </Box>
              ))}
            </Box>
          </Reveal>
        )}

        {/* Confidentiality note */}
        {reports.confidentiality && (
          <Reveal delay={3}>
            <Box className="mt-6 flex gap-4 rounded-2xl border border-ink/12 bg-white p-5">
              <Box className="mt-0.5 flex size-8 flex-none items-center justify-center rounded-lg bg-paper-warm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-navy"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
                  <circle cx="17" cy="9" r="2.5" />
                  <path d="M16.5 14.6c2.6.2 4.4 1.9 5 4.9" />
                </svg>
              </Box>
              <Text as="p" className="text-[15px] leading-[1.6] text-ink/70">
                {reports.confidentiality}
              </Text>
            </Box>
          </Reveal>
        )}
      </Section>

      {/* ── 8. FORM ── */}
      <Section
        id="contact"
        aria-labelledby="polaris-contact-h"
        className="bg-navy py-16 lg:py-24"
      >
        <Box className="mx-auto max-w-[62ch] text-center">
          <Reveal delay={1}>
            <RichHeading
              as="h2"
              id="polaris-contact-h"
              heading={form.heading}
              className="text-white"
              emphasisClassName="text-lime"
            />
          </Reveal>
          {form.subheading && (
            <Reveal delay={2}>
              <Text
                as="p"
                className="mx-auto mt-4 max-w-[60ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-white/70"
              >
                {form.subheading}
              </Text>
            </Reveal>
          )}
        </Box>

        <Reveal delay={2}>
          <Box className="mx-auto mt-10 max-w-[1040px]">
            <PlatformEnquiryForm data={form} />
          </Box>
        </Reveal>
      </Section>
    </>
  );
}
