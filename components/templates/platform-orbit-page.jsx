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
 * Template for the Orbit 360-degree feedback platform page.
 * Sections: Hero (navy) → Roles → Features → Contact form
 */
export default function PlatformOrbitPage({ page }) {
  const { hero, roles, features, form, breadcrumbs } = page;

  return (
    <>
      {/* ── 1. HERO ── */}
      <Section
        id="top"
        aria-labelledby="orbit-hero-h"
        className="bg-navy py-16 lg:py-24"
        innerClassName="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] lg:gap-14 items-center"
      >
        <Box>
          <Breadcrumbs items={breadcrumbs} tone="dark" />

          <Reveal delay={1}>
            <RichHeading
              as="h1"
              id="orbit-hero-h"
              heading={hero.heading}
              className="mt-6 text-white text-[clamp(38px,4.4vw,48px)] leading-[1.05]"
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

          {hero.points?.length > 0 && (
            <Reveal delay={3}>
              <Box as="ul" className="mt-6 grid gap-3">
                {hero.points.map((point) => (
                  <Box
                    as="li"
                    key={point}
                    className="relative pl-7 text-[15px] leading-[1.5] text-white"
                  >
                    <Box
                      as="span"
                      aria-hidden="true"
                      className="absolute left-0.5 top-[6px] block h-[7px] w-[12px] rotate-[-45deg] border-b-2 border-l-2 border-lime"
                    />
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
          <ImagePlaceholder dark className="max-w-[520px] justify-self-center lg:justify-self-end" />
        </Reveal>
      </Section>

      {/* ── 2. ROLES ── */}
      <Section
        id="roles"
        aria-labelledby="orbit-roles-h"
        className="bg-white py-16 lg:py-24"
      >
        <Box className="text-center">
          <Reveal delay={1}>
            <RichHeading
              as="h2"
              id="orbit-roles-h"
              heading={roles.heading}
              className="mx-auto max-w-[28ch] text-ink"
              emphasisClassName="text-olive"
            />
          </Reveal>
          {roles.description && (
            <Reveal delay={2}>
              <Text
                as="p"
                className="mx-auto mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
              >
                {roles.description}
              </Text>
            </Reveal>
          )}
        </Box>

        <Box className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {roles.items?.map((role, i) => (
            <Reveal key={role.title} delay={(i % 4) + 1}>
              <Box className="rounded-2xl border border-ink/12 bg-paper p-7">
                <Text as="h3" className="text-ink">
                  {role.title}
                </Text>
                {role.who && (
                  <Text as="p" className="mt-1 text-sm text-ink/50">
                    {role.who}
                  </Text>
                )}
                {role.points?.length > 0 && (
                  <Box as="ul" className="mt-4 grid gap-2 border-t border-ink/10 pt-4">
                    {role.points.map((point) => (
                      <Box
                        as="li"
                        key={point}
                        className="relative pl-5 text-[15px] leading-[1.5] text-ink/70"
                      >
                        <Box
                          as="span"
                          aria-hidden="true"
                          className="absolute left-0 top-[7px] block h-[6px] w-[10px] rotate-[-45deg] border-b-2 border-l-2 border-navy"
                        />
                        {point}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 3. FEATURES ── */}
      <Section
        id="features"
        aria-labelledby="orbit-features-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="orbit-features-h"
            heading={features.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>

        <Box className="mt-12 grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-x-16">
          {features.items?.map((feat, i) => (
            <Reveal key={feat.title} delay={(i % 4) + 1}>
              <Box className="border-t border-ink/12 py-8">
                <Box className="flex items-baseline gap-4">
                  <Text
                    as="span"
                    className="w-6 flex-none font-mono text-[13px] text-ink/40"
                  >
                    {feat.number}
                  </Text>
                  <Text as="h3" className="text-ink">
                    {feat.title}
                  </Text>
                </Box>
                {feat.points?.length > 0 && (
                  <Box as="ul" className="mt-4 ml-10 grid gap-2">
                    {feat.points.map((point) => (
                      <Box
                        as="li"
                        key={point}
                        className="relative pl-4 text-[15px] leading-[1.55] text-ink/70"
                      >
                        <Box
                          as="span"
                          aria-hidden="true"
                          className="absolute left-0 top-[9px] block size-1.5 rounded-full bg-navy"
                        />
                        {point}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Reveal>
          ))}
        </Box>

        {/* Features CTA band */}
        <Reveal delay={2}>
          <Box className="mt-12 flex flex-wrap items-center gap-5 rounded-2xl border border-ink/12 bg-white p-8">
            <Text
              as="p"
              className="flex-1 basis-80 font-display text-[20px] font-semibold leading-[1.35] tracking-tight text-ink"
            >
              Bring Orbit to your next 360,{" "}
              <em className="font-serif font-normal italic">ready to deploy.</em>
            </Text>
            <CtaButton render={<Link href="#contact" />} arrow>
              Deploy Orbit
            </CtaButton>
          </Box>
        </Reveal>
      </Section>

      {/* ── 4. CONTACT / FORM ── */}
      <Section
        id="contact"
        aria-labelledby="orbit-contact-h"
        className="bg-navy py-16 lg:py-24"
        innerClassName="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-start"
      >
        {/* Left column */}
        <Box>
          <Reveal delay={1}>
            <RichHeading
              as="h2"
              id="orbit-contact-h"
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
              <Box as="ol" className="mt-10 grid gap-5" style={{ listStyle: "none", padding: 0 }}>
                {form.nextSteps.map((step) => (
                  <Box as="li" key={step.number} className="grid grid-cols-[40px_1fr] gap-4 items-start">
                    <Text
                      as="span"
                      className="flex size-10 items-center justify-center rounded-full border border-lime font-mono text-[13px] text-lime"
                    >
                      {step.number}
                    </Text>
                    <Box>
                      <Text as="h3" className="text-[16px] font-semibold leading-snug tracking-tight text-white">
                        {step.title}
                      </Text>
                      <Text as="p" className="mt-1 text-[15px] leading-[1.6] text-white/72">
                        {step.description}
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
