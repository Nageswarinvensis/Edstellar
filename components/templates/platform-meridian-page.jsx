import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { CtaButton } from "@/components/common/cta-button";
import PlatformEnquiryForm from "@/components/forms/platform-enquiry-form";

/** SVG placeholder visible on dark backgrounds */
function ImagePlaceholder({ className, dark = false }) {
  return (
    <Box
      className={`aspect-video w-full rounded-2xl flex flex-col items-center justify-center gap-3 border ${dark ? "bg-paper/8 border-paper/12" : "bg-navy/6 border-ink/10"} ${className ?? ""}`}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className={dark ? "text-paper/30" : "text-ink/20"}
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <Text
        as="span"
        className={`font-mono text-[10px] tracking-[0.12em] uppercase ${dark ? "text-paper/30" : "text-ink/30"}`}
      >
        Image coming soon
      </Text>
    </Box>
  );
}

/**
 * Template for the Meridian 1:1 Leadership Coaching platform page.
 * Sections: Hero → Partner → How it works → Tracks → Roles → Backed → Contact
 */
export default function PlatformMeridianPage({ page }) {
  const { hero, partner, howItWorks, tracks, roles, backed, form, breadcrumbs } = page;

  return (
    <>
      {/* ── 1. HERO ── */}
      <Section
        id="top"
        aria-labelledby="meridian-hero-h"
        className="bg-navy py-16 lg:py-24"
        innerClassName="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] lg:gap-14 items-center"
      >
        <Box>
          <Breadcrumbs items={breadcrumbs} tone="dark" />

          <Reveal delay={1}>
            <Text
              as="h1"
              id="meridian-hero-h"
              className="mt-6 font-display font-bold text-white text-[clamp(38px,4.4vw,48px)] leading-[1.05] tracking-[-0.035em]"
            >
              <Box as="span" className="block">
                {hero.heading}
              </Box>
              {hero.subheadingLine2 && (
                <Box
                  as="span"
                  className="mt-3 block text-[clamp(24px,2.8vw,30px)] leading-[1.15] tracking-[-0.025em] text-white/92"
                  dangerouslySetInnerHTML={{
                    __html: hero.subheadingLine2.replace(
                      /<span>(.*?)<\/span>/,
                      '<em class="font-serif font-normal italic text-lime">$1</em>'
                    ),
                  }}
                />
              )}
            </Text>
          </Reveal>

          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-5 max-w-[56ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-white/72"
            >
              {hero.subheading}
            </Text>
          </Reveal>

          {hero.notes?.length > 0 && (
            <Reveal delay={3}>
              <Box as="ul" className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {hero.notes.map((note) => (
                  <Box
                    as="li"
                    key={note}
                    className="flex items-center gap-2 text-[14px] text-white/72"
                  >
                    <Box
                      as="span"
                      aria-hidden="true"
                      className="block size-[6px] rounded-full bg-lime flex-none"
                    />
                    {note}
                  </Box>
                ))}
              </Box>
            </Reveal>
          )}

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
        </Box>

        {/* Hero visual placeholder */}
        <Reveal delay={2}>
          <ImagePlaceholder dark className="max-w-[520px] justify-self-center lg:justify-self-end" />
        </Reveal>
      </Section>

      {/* ── 2. ONE PARTNER ── */}
      <Section
        id="partner"
        aria-labelledby="meridian-partner-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="meridian-partner-h"
            heading={partner.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {partner.subheading && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {partner.subheading}
            </Text>
          </Reveal>
        )}

        <Box className="mt-10 grid grid-cols-1 gap-0 sm:grid-cols-3 overflow-hidden rounded-2xl border border-ink/12 bg-navy">
          {partner.columns?.map((col, i) => (
            <Reveal key={col.title} delay={i + 1}>
              <Box className={`p-8 lg:p-10 ${i > 0 ? "border-t border-paper/10 sm:border-t-0 sm:border-l" : ""}`}>
                <Box className="mb-4 flex size-10 items-center justify-center rounded-lg bg-paper/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C8F135"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
                  </svg>
                </Box>
                <Text as="h3" className="text-white">
                  {col.title}
                </Text>
                <Text as="p" className="mt-3 text-[15px] leading-[1.6] text-white/65">
                  {col.body}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 3. HOW IT WORKS ── */}
      <Section
        id="how-it-works"
        aria-labelledby="meridian-how-h"
        className="bg-white py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="meridian-how-h"
            heading={howItWorks.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {howItWorks.subheading && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {howItWorks.subheading}
            </Text>
          </Reveal>
        )}

        <Box className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {howItWorks.stages?.map((stage, si) => (
            <Reveal key={stage.label} delay={si + 1}>
              <Box className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-paper">
                <Box className="flex items-baseline justify-between gap-3 bg-navy px-6 py-4">
                  <Text
                    as="span"
                    className="font-display text-[16px] font-semibold text-white"
                  >
                    {stage.label}
                  </Text>
                  <Text as="span" className="font-mono text-[11px] text-lime tracking-[0.06em]">
                    {stage.stepsRange}
                  </Text>
                </Box>
                <Box as="ol" className="flex flex-col divide-y divide-ink/8">
                  {stage.steps.map((step) => (
                    <Box as="li" key={step.number} className="grid grid-cols-[48px_1fr] gap-4 p-6">
                      <Text
                        as="span"
                        className="font-display text-[34px] font-bold leading-none tracking-[-0.04em] text-ink/25"
                      >
                        {step.number}
                      </Text>
                      <Box>
                        <Text as="span" className="block font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink/40">
                          {step.who}
                        </Text>
                        <Text as="h3" className="mt-1 text-ink">
                          {step.title}
                        </Text>
                        <Text as="p" className="mt-2 text-[14.5px] leading-[1.5] text-ink/60">
                          {step.body}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 4. TRACKS ── */}
      <Section
        id="tracks"
        aria-labelledby="meridian-tracks-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="meridian-tracks-h"
            heading={tracks.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {tracks.subheading && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {tracks.subheading}
            </Text>
          </Reveal>
        )}

        {/* Six phases */}
        {tracks.phases?.length > 0 && (
          <Reveal delay={2}>
            <Box className="mt-8 flex flex-wrap items-center gap-2 text-[14px] text-ink/60">
              <Text as="span" className="font-semibold text-ink">Six phases in every track</Text>
              {tracks.phases.map((phase, pi) => (
                <Box key={phase} className="flex items-center gap-2">
                  {pi > 0 && <Text as="span" className="text-ink/30">&rsaquo;</Text>}
                  <Text
                    as="span"
                    className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[12px] text-ink"
                  >
                    {phase}
                  </Text>
                </Box>
              ))}
            </Box>
          </Reveal>
        )}

        {/* Suites accordion */}
        <Box className="mt-8 border-t border-ink/15">
          {tracks.suites?.map((suite, si) => (
            <Reveal key={suite.title} delay={(si % 3) + 1}>
              <Box
                as="details"
                className="group border-b border-ink/15"
                {...(si === 0 ? { open: true } : {})}
              >
                <Box
                  as="summary"
                  className="flex cursor-pointer list-none items-center gap-4 py-6 [&::-webkit-details-marker]:hidden"
                >
                  <Text as="h3" className="flex-1 text-ink text-[22px] leading-tight">
                    {suite.title}
                  </Text>
                  <Text as="span" className="font-mono text-[12px] uppercase tracking-[0.06em] text-ink/40">
                    {suite.count}
                  </Text>
                  <Box
                    as="span"
                    aria-hidden="true"
                    className="flex size-8 flex-none items-center justify-center rounded-full border border-ink/20 text-[18px] text-ink/60 transition-transform duration-200 group-open:rotate-45 group-open:bg-navy group-open:text-lime group-open:border-navy"
                  >
                    +
                  </Box>
                </Box>
                <Box className="grid grid-cols-1 gap-3 pb-7 sm:grid-cols-2 lg:grid-cols-3">
                  {suite.tracks.map((track) => (
                    <Box
                      key={track.title}
                      className="rounded-xl border border-ink/10 bg-white p-5"
                    >
                      <Text as="h4" className="text-ink font-display text-[16px] font-semibold leading-snug">
                        {track.title}
                      </Text>
                      <Text as="p" className="mt-1.5 text-[14.5px] leading-[1.5] text-ink/55">
                        {track.desc}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 5. ROLES ── */}
      <Section
        id="roles"
        aria-labelledby="meridian-roles-h"
        className="bg-white py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="meridian-roles-h"
            heading={roles.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {roles.subheading && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {roles.subheading}
            </Text>
          </Reveal>
        )}

        {/* Access ladder */}
        <Box className="mt-10 border-t border-ink/15">
          {roles.items?.map((role, i) => (
            <Reveal key={role.title} delay={(i % 3) + 1}>
              <Box className="grid grid-cols-1 gap-5 border-b border-ink/10 py-6 sm:grid-cols-[220px_1fr] sm:gap-7 sm:items-center">
                <Box>
                  <Text as="h3" className="text-ink">
                    {role.title}
                  </Text>
                  <Text as="span" className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40">
                    {role.scope}
                  </Text>
                  {/* Progress bar */}
                  <Box className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-paper-warm">
                    <Box
                      className="h-full rounded-full bg-navy"
                      style={{ width: role.barWidth }}
                      aria-hidden="true"
                    />
                  </Box>
                </Box>
                <Box as="ul" className="flex flex-wrap gap-2">
                  {role.points.map((point) => (
                    <Box
                      as="li"
                      key={point}
                      className="rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-[13.5px] text-ink"
                    >
                      {point}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>

        {/* Leaders card */}
        {roles.leaders && (
          <Reveal delay={2}>
            <Box className="mt-6 grid grid-cols-1 gap-5 rounded-2xl bg-navy px-7 py-6 sm:grid-cols-[220px_1fr] sm:gap-7 sm:items-center">
              <Box>
                <Text as="span" className="font-mono text-[11px] uppercase tracking-[0.08em] text-lime">
                  {roles.leaders.scope}
                </Text>
                <Text as="h3" className="mt-1 text-white">
                  {roles.leaders.title}
                </Text>
              </Box>
              <Box as="ul" className="flex flex-wrap gap-2">
                {roles.leaders.points.map((point) => (
                  <Box
                    as="li"
                    key={point}
                    className="rounded-full border border-white/25 px-3 py-1.5 text-[13.5px] text-white"
                  >
                    {point}
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        )}
      </Section>

      {/* ── 6. BACKED BY EDSTELLAR ── */}
      <Section
        id="edstellar"
        aria-labelledby="meridian-backed-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="meridian-backed-h"
            heading={backed.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {backed.subheading && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {backed.subheading}
            </Text>
          </Reveal>
        )}

        <Box className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {backed.cards?.map((card, i) => (
            <Reveal key={card.title} delay={(i % 4) + 1}>
              <Box className="flex gap-4 rounded-2xl border border-ink/12 bg-white p-6">
                <Box className="flex size-11 flex-none items-center justify-center rounded-xl bg-navy">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C8F135"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </Box>
                <Box>
                  <Text as="h3" className="text-ink">
                    {card.title}
                  </Text>
                  <Text as="p" className="mt-2 text-[14.5px] leading-[1.55] text-ink/60">
                    {card.body}
                  </Text>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 7. CONTACT / FORM ── */}
      <Section
        id="contact"
        aria-labelledby="meridian-contact-h"
        className="bg-navy py-16 lg:py-24"
        innerClassName="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-start"
      >
        {/* Left column */}
        <Box>
          <Reveal delay={1}>
            <RichHeading
              as="h2"
              id="meridian-contact-h"
              heading={form.heading}
              className="max-w-[22ch] text-white"
              emphasisClassName="text-lime"
            />
          </Reveal>
          {form.subheading && (
            <Reveal delay={2}>
              <Text
                as="p"
                className="mt-4 max-w-[52ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-white/70"
              >
                {form.subheading}
              </Text>
            </Reveal>
          )}
        </Box>

        {/* Right column: form */}
        <Reveal delay={2}>
          <PlatformEnquiryForm data={form} />
        </Reveal>
      </Section>
    </>
  );
}
