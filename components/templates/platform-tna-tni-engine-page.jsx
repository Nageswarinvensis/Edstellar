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
 * Template for the TNA/TNI Engine platform page.
 * Sections: Hero → Evidence → How it works → AI → Roles → Features → Deliverables → Contact
 */
export default function PlatformTnaTniEnginePage({ page }) {
  const { hero, evidence, howItWorks, ai, roles, features, deliverables, form, breadcrumbs } = page;

  return (
    <>
      {/* ── 1. HERO ── */}
      <Section
        id="top"
        aria-labelledby="tna-hero-h"
        className="bg-navy py-16 lg:py-24"
        innerClassName="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-14 items-center"
      >
        <Box>
          <Breadcrumbs items={breadcrumbs} tone="dark" />

          <Reveal delay={1}>
            <Text
              as="h1"
              id="tna-hero-h"
              className="mt-6 font-display font-bold text-white text-[clamp(38px,4.4vw,48px)] leading-[1.05] tracking-[-0.035em]"
            >
              <Box as="span" className="block">
                {hero.heading}
              </Box>
              {hero.subheadingLine2 && (
                <Box
                  as="span"
                  className="mt-3 block text-[clamp(24px,2.8vw,30px)] leading-[1.15] tracking-[-0.025em] font-semibold text-white/92"
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

          {hero.points?.length > 0 && (
            <Reveal delay={3}>
              <Box as="ul" className="mt-6 grid gap-3">
                {hero.points.map((point) => (
                  <Box
                    as="li"
                    key={point}
                    className="flex items-start gap-3 text-[15px] leading-[1.5] text-white"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C8F135"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-[2px] flex-none"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {point}
                  </Box>
                ))}
              </Box>
            </Reveal>
          )}

          <Reveal delay={4}>
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
          <ImagePlaceholder dark />
        </Reveal>
      </Section>

      {/* ── 2. EVIDENCE ── */}
      <Section
        id="evidence"
        aria-labelledby="tna-evidence-h"
        className="bg-white py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="tna-evidence-h"
            heading={evidence.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {evidence.subheading && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {evidence.subheading}
            </Text>
          </Reveal>
        )}

        {/* Sources → Outcomes */}
        <Box className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Column 1: 4 sources */}
          <Box>
            <Text as="p" className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40">
              Four sources
            </Text>
            <Box className="grid gap-3">
              {evidence.sources?.map((src) => (
                <Reveal key={src.title}>
                  <Box className="flex items-center gap-4 rounded-xl border border-ink/12 bg-paper p-4">
                    <Box className="flex size-10 flex-none items-center justify-center rounded-full border-[1.5px] border-navy">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="text-navy"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21a8 8 0 0 1 16 0" />
                      </svg>
                    </Box>
                    <Box>
                      <Text as="h3" className="text-ink text-[16px] leading-tight">
                        {src.title}
                      </Text>
                      <Text as="p" className="mt-0.5 text-[13px] leading-[1.45] text-ink/55">
                        {src.desc}
                      </Text>
                    </Box>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>

          {/* Column 2: one validated need */}
          <Reveal delay={2}>
            <Text as="p" className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40">
              One need
            </Text>
            <Box className="rounded-xl bg-navy p-7 text-white">
              <Text
                as="span"
                className="font-display text-[22px] font-semibold leading-tight tracking-[-0.02em]"
              >
                One validated need
              </Text>
              <Text as="p" className="mt-3 text-[14px] text-white/65">
                Reconciled per person and traced to every source that raised it.
              </Text>
              <Box className="mt-5 grid grid-cols-2 gap-3 border-t border-white/12 pt-5">
                {[
                  { label: "Gap", value: "1.5" },
                  { label: "Criticality", value: "C1" },
                  { label: "Headcount", value: "186" },
                  { label: "Verdict", value: "Corroborated", accent: true },
                ].map((kv) => (
                  <Box key={kv.label}>
                    <Text as="dt" className="text-[11px] text-white/45">
                      {kv.label}
                    </Text>
                    <Text
                      as="dd"
                      className={`mt-0.5 font-semibold text-[15px] ${kv.accent ? "text-lime" : "text-white"}`}
                    >
                      {kv.value}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>

          {/* Column 3: 3 outcomes */}
          <Box>
            <Text as="p" className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40">
              Three outcomes
            </Text>
            <Box className="grid gap-3">
              {evidence.outcomes?.map((outcome) => (
                <Reveal key={outcome.tag}>
                  <Box className="rounded-xl border border-ink/12 bg-paper p-5">
                    <Box
                      as="span"
                      className={`inline-block rounded-full px-3.5 py-1 text-[13px] font-semibold ${
                        outcome.style === "dark"
                          ? "bg-navy text-white"
                          : outcome.style === "lime"
                          ? "bg-lime-soft text-ink shadow-[inset_0_0_0_1px_rgba(10,22,40,.15)]"
                          : "bg-white text-ink shadow-[inset_0_0_0_1.5px_var(--navy)]"
                      }`}
                    >
                      {outcome.tag}
                    </Box>
                    <Text as="h3" className="mt-3 text-ink text-[16px] leading-snug">
                      {outcome.title}
                    </Text>
                    <Text as="p" className="mt-1.5 text-[14px] leading-[1.55] text-ink/55">
                      {outcome.desc}
                    </Text>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Safeguards */}
        {evidence.safeguards?.length > 0 && (
          <Box className="mt-10 grid grid-cols-1 gap-5 border-t border-ink/12 pt-10 sm:grid-cols-2">
            {evidence.safeguards.map((s) => (
              <Reveal key={s.title}>
                <Box className="flex items-start gap-4">
                  <Box className="flex size-10 flex-none items-center justify-center rounded-full border-[1.5px] border-navy">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-navy"
                    >
                      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
                      <circle cx="16" cy="7" r="2" />
                      <circle cx="10" cy="17" r="2" />
                    </svg>
                  </Box>
                  <Box>
                    <Text as="h3" className="text-ink">
                      {s.title}
                    </Text>
                    <Text as="p" className="mt-2 text-[14.5px] leading-[1.55] text-ink/60">
                      {s.body}
                    </Text>
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Box>
        )}
      </Section>

      {/* ── 3. HOW IT WORKS ── */}
      <Section
        id="how-it-works"
        aria-labelledby="tna-how-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="tna-how-h"
            heading={howItWorks.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {howItWorks.subheading && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {howItWorks.subheading}
            </Text>
          </Reveal>
        )}

        {/* Phase accordion using <details> */}
        <Box className="mt-10">
          {howItWorks.phases?.map((phase, pi) => (
            <Reveal key={phase.id} delay={(pi % 3) + 1}>
              <Box
                as="details"
                className="group border-t border-ink/15 last:border-b"
                {...(pi === 0 ? { open: true } : {})}
              >
                <Box
                  as="summary"
                  className="flex cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden"
                >
                  <Text
                    as="span"
                    className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40 w-[72px] flex-none"
                  >
                    Phase {pi + 1}
                  </Text>
                  <Text as="h3" className="flex-1 text-ink text-[20px] leading-tight">
                    {phase.label}
                  </Text>
                  <Text as="span" className="font-mono text-[11px] tracking-[0.06em] text-ink/40 hidden sm:block">
                    {phase.stepsRange}
                  </Text>
                  <Box
                    as="span"
                    aria-hidden="true"
                    className="flex size-8 flex-none items-center justify-center rounded-full border border-ink/20 text-[18px] text-ink/60 transition-transform duration-200 group-open:rotate-45 group-open:bg-navy group-open:text-lime group-open:border-navy"
                  >
                    +
                  </Box>
                </Box>

                <Box className="grid grid-cols-1 gap-6 pb-8 lg:grid-cols-[280px_1fr] lg:gap-10">
                  {/* Phase intro */}
                  <Box>
                    <Text
                      as="h4"
                      className="font-display text-[20px] font-semibold leading-snug tracking-[-0.02em] text-ink"
                    >
                      {phase.intro.heading}
                    </Text>
                    <Text as="p" className="mt-3 text-[15px] leading-[1.6] text-ink/60">
                      {phase.intro.body}
                    </Text>
                    <Box className="mt-5 border-t border-ink/12 pt-4">
                      <Text as="span" className="block font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40">
                        Hands over
                      </Text>
                      <Text as="p" className="mt-1.5 text-[15px] font-semibold leading-snug text-ink">
                        {phase.intro.handover}
                      </Text>
                    </Box>
                  </Box>

                  {/* Steps */}
                  <Box as="ol" className="grid gap-0">
                    {phase.steps.map((step, si) => (
                      <Box
                        as="li"
                        key={step.number}
                        className={`grid grid-cols-[48px_1fr] gap-4 py-5 ${si < phase.steps.length - 1 ? "border-b border-ink/10" : ""} ${si === 0 ? "pt-0" : ""}`}
                      >
                        <Box className="flex size-11 flex-none items-center justify-center rounded-full border-[1.5px] border-navy font-display text-[15px] font-semibold text-navy">
                          {step.number}
                        </Box>
                        <Box>
                          <Text as="h4" className="font-display text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                            {step.title}
                          </Text>
                          <Text as="p" className="mt-2 text-[15px] leading-[1.6] text-ink/60">
                            {step.body}
                          </Text>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 4. AI-ASSISTED ── */}
      <Section
        id="ai"
        aria-labelledby="tna-ai-h"
        className="bg-navy py-16 lg:py-24"
      >
        <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-14 items-end mb-10">
          <Reveal delay={1}>
            <RichHeading
              as="h2"
              id="tna-ai-h"
              heading={ai.heading}
              className="text-white"
              emphasisClassName="text-lime"
            />
          </Reveal>
          {ai.subheading && (
            <Reveal delay={2}>
              <Text
                as="p"
                className="text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-white/70"
              >
                {ai.subheading}
              </Text>
            </Reveal>
          )}
        </Box>

        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ai.actions?.map((action, i) => (
            <Reveal key={action.key} delay={i + 1}>
              <Box
                className={`rounded-xl border p-6 ${action.highlight ? "border-lime/40 bg-paper/8" : "border-white/14"}`}
              >
                <Box
                  as="span"
                  className={`inline-block rounded-full border-[1.5px] px-4 py-1.5 text-[14px] font-semibold ${action.highlight ? "border-lime bg-lime text-navy" : "border-lime text-lime"}`}
                >
                  {action.key}
                </Box>
                <Text as="p" className="mt-4 text-[15px] leading-[1.6] text-white/70">
                  {action.body}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>

        {ai.chips?.length > 0 && (
          <Reveal delay={2}>
            <Box className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/12 pt-7">
              <Text as="span" className="text-[14px] font-semibold text-white">
                AI-assisted steps
              </Text>
              {ai.chips.map((chip) => (
                <Box
                  as="span"
                  key={chip}
                  className="rounded-full bg-navy-soft border border-white/14 px-3 py-1 text-[13px] text-white/70"
                >
                  {chip}
                </Box>
              ))}
            </Box>
          </Reveal>
        )}
        {ai.note && (
          <Reveal delay={3}>
            <Text as="p" className="mt-4 text-[14px] text-white/50">
              {ai.note}
            </Text>
          </Reveal>
        )}
      </Section>

      {/* ── 5. ROLES ── */}
      <Section
        id="roles"
        aria-labelledby="tna-roles-h"
        className="bg-white py-16 lg:py-24"
      >
        <Box className="text-center">
          <Reveal delay={1}>
            <RichHeading
              as="h2"
              id="tna-roles-h"
              heading={roles.heading}
              className="mx-auto max-w-[28ch] text-ink"
              emphasisClassName="text-olive"
            />
          </Reveal>
          {roles.subheading && (
            <Reveal delay={2}>
              <Text
                as="p"
                className="mx-auto mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
              >
                {roles.subheading}
              </Text>
            </Reveal>
          )}
        </Box>

        <Box className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {roles.items?.map((role, i) => (
            <Reveal key={role.title} delay={(i % 4) + 1}>
              <Box className="rounded-2xl border border-ink/12 bg-paper p-7">
                <Text as="span" className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40">
                  {role.scope}
                </Text>
                <Text as="h3" className="mt-2 text-ink">
                  {role.title}
                </Text>
                <Box as="ul" className="mt-4 grid gap-2 border-t border-ink/10 pt-4">
                  {role.points.map((point) => (
                    <Box
                      as="li"
                      key={point}
                      className="flex items-start gap-2 text-[14.5px] leading-[1.5] text-ink/70"
                    >
                      <Box
                        as="span"
                        aria-hidden="true"
                        className="mt-[9px] block size-1.5 flex-none rounded-full bg-navy"
                      />
                      {point}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 6. FEATURES ── */}
      <Section
        id="features"
        aria-labelledby="tna-features-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="tna-features-h"
            heading={features.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>

        <Box className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
          {features.modules?.map((mod, i) => (
            <Reveal key={mod.title} delay={(i % 4) + 1}>
              <Box className="border-t border-ink/15 py-6">
                <Box className="flex items-baseline gap-3">
                  <Text as="h3" className="flex-1 text-ink">
                    {mod.title}
                  </Text>
                  <Text as="span" className="font-mono text-[11px] text-ink/35">
                    {mod.count}
                  </Text>
                </Box>
                <Box as="ul" className="mt-3 grid gap-2">
                  {mod.points.map((point) => (
                    <Box
                      as="li"
                      key={point}
                      className="relative pl-4 text-[15px] leading-[1.5] text-ink/65"
                    >
                      <Box
                        as="span"
                        aria-hidden="true"
                        className="absolute left-0 top-[10px] block h-[1.5px] w-[6px] bg-navy"
                      />
                      {point}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>

        {/* Features CTA */}
        <Reveal delay={2}>
          <Box className="mt-10 flex flex-wrap items-center gap-5 rounded-2xl border border-ink/12 bg-white p-7">
            <Text as="p" className="flex-1 basis-64 font-display text-[16px] font-medium text-ink">
              See all eight modules run on a sample cycle.
            </Text>
            <CtaButton render={<Link href="#contact" />} arrow>
              Request a demo
            </CtaButton>
          </Box>
        </Reveal>
      </Section>

      {/* ── 7. DELIVERABLES ── */}
      <Section
        id="deliverables"
        aria-labelledby="tna-deliv-h"
        className="bg-white py-16 lg:py-24"
        innerClassName="grid grid-cols-1 gap-10 lg:grid-cols-[366px_1fr] lg:gap-11 items-start"
      >
        {/* Rail (sticky on lg) */}
        <Reveal delay={1}>
          <Box className="lg:sticky lg:top-8">
            <RichHeading
              as="h2"
              id="tna-deliv-h"
              heading={deliverables.heading}
              className="text-ink"
              emphasisClassName="text-olive"
            />
            {deliverables.subheading && (
              <Text
                as="p"
                className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
              >
                {deliverables.subheading}
              </Text>
            )}
            <Box className="mt-7">
              <CtaButton render={<Link href="#contact" />} arrow>
                Request a demo
              </CtaButton>
            </Box>
          </Box>
        </Reveal>

        {/* Ledger */}
        <Box className="border-t border-ink/15">
          {deliverables.items?.map((item, i) => (
            <Reveal key={item.number} delay={(i % 4) + 1}>
              <Box className="grid grid-cols-[56px_1fr] gap-5 border-b border-ink/10 py-6 sm:grid-cols-[56px_1fr_minmax(0,.9fr)] sm:gap-6 items-start">
                <Text
                  as="span"
                  className="font-display text-[38px] font-bold leading-none tracking-[-0.04em] text-ink/22"
                  aria-hidden="true"
                >
                  {item.number}
                </Text>
                <Box>
                  <Text as="h3" className="text-ink">
                    {item.title}
                  </Text>
                  <Text as="p" className="mt-2 text-[15px] leading-[1.55] text-ink/60">
                    {item.body}
                  </Text>
                </Box>
                <Text
                  as="p"
                  className="pl-4 text-[15px] leading-[1.55] text-ink/80 border-l-2 border-navy sm:col-start-3 col-start-2 sm:col-auto"
                >
                  <Text as="span" className="block font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40 mb-1">
                    Lets you
                  </Text>
                  {item.use}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 8. CONTACT / FORM ── */}
      <Section
        id="contact"
        aria-labelledby="tna-contact-h"
        className="bg-navy py-16 lg:py-24"
        innerClassName="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-start"
      >
        {/* Left column */}
        <Box>
          <Reveal delay={1}>
            <RichHeading
              as="h2"
              id="tna-contact-h"
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
          {form.nextSteps?.length > 0 && (
            <Reveal delay={3}>
              <Box as="ol" className="mt-10 grid gap-0" style={{ listStyle: "none", padding: 0 }}>
                {form.nextSteps.map((step) => (
                  <Box
                    as="li"
                    key={step.number}
                    className="grid grid-cols-[44px_1fr] gap-4 items-start border-t border-white/12 py-5"
                  >
                    <Box className="flex size-9 items-center justify-center rounded-full border border-lime font-display text-[14px] font-semibold text-lime">
                      {step.number}
                    </Box>
                    <Box>
                      <Text as="h3" className="text-[16px] font-semibold leading-snug tracking-tight text-white">
                        {step.title}
                      </Text>
                      <Text as="p" className="mt-1 text-[14px] leading-[1.6] text-white/65">
                        {step.desc}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
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
