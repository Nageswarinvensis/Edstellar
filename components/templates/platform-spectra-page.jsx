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
 * Template for the Spectra LMS enterprise platform page.
 * Sections: Hero (navy) → Roles → Features → Contact form
 */
export default function PlatformSpectraPage({ page }) {
  const { hero, roles, features, form, breadcrumbs } = page;

  return (
    <>
      {/* ── 1. HERO ── */}
      <Section
        id="top"
        aria-labelledby="spectra-hero-h"
        className="bg-navy py-16 lg:py-24"
        innerClassName="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.3fr)] lg:gap-12 items-center"
      >
        <Box>
          <Breadcrumbs items={breadcrumbs} tone="dark" />

          <Reveal delay={1}>
            <Text
              as="h1"
              id="spectra-hero-h"
              className="mt-6 font-display font-bold text-white text-[clamp(38px,4.4vw,48px)] leading-[1.05] tracking-[-0.035em]"
            >
              <Box as="span" className="block">
                {hero.heading}
              </Box>
              {hero.subheadingLine2 && (
                <Box
                  as="span"
                  className="mt-3 block text-[clamp(24px,2.8vw,30px)] leading-[1.15] tracking-[-0.025em] text-white/92"
                  dangerouslySetInnerHTML={{ __html: hero.subheadingLine2.replace(/<span>(.*?)<\/span>/, '<em class="font-serif font-normal italic text-lime not-italic">$1</em>') }}
                />
              )}
            </Text>
          </Reveal>

          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-5 max-w-[52ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-white/72"
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
        </Box>

        {/* Hero visual placeholder */}
        <Reveal delay={2}>
          <ImagePlaceholder dark />
        </Reveal>
      </Section>

      {/* ── 2. ROLES ── */}
      <Section
        id="roles"
        aria-labelledby="spectra-roles-h"
        className="bg-white py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="spectra-roles-h"
            heading={roles.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>
        {roles.description && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {roles.description}
            </Text>
          </Reveal>
        )}

        <Box className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.items?.map((role, i) => (
            <Reveal key={role.title} delay={(i % 4) + 1}>
              <Box className="flex h-full flex-col rounded-2xl border border-ink/12 bg-paper p-6 shadow-[0_1px_2px_rgba(10,22,40,.07),0_8px_24px_rgba(10,22,40,.07)] transition-transform duration-200 hover:-translate-y-1">
                {/* Icon placeholder */}
                <Box className="mb-4 flex size-12 items-center justify-center rounded-xl bg-navy">
                  <svg
                    width="22"
                    height="22"
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
                <Text as="h3" className="text-ink">
                  {role.title}
                </Text>
                {role.who && (
                  <Text as="p" className="mt-2 text-[15px] leading-[1.6] text-ink/60">
                    {role.who}
                  </Text>
                )}
                {role.points?.length > 0 && (
                  <Box as="ul" className="mt-4 grid gap-2 border-t border-ink/10 pt-4">
                    {role.points.map((point) => (
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
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ── 3. FEATURES ── */}
      <Section
        id="features"
        aria-labelledby="spectra-features-h"
        className="bg-paper-warm py-16 lg:py-24"
      >
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            id="spectra-features-h"
            heading={features.heading}
            className="max-w-[760px] text-ink"
            emphasisClassName="text-olive"
          />
        </Reveal>

        <Box className="mt-10 grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-x-16">
          {features.items?.map((feat, i) => (
            <Reveal key={feat.title} delay={(i % 4) + 1}>
              <Box className="border-t border-ink/15 py-6 pb-10">
                <Text as="h3" className="mb-4 text-ink">
                  {feat.title}
                </Text>
                {feat.points?.length > 0 && (
                  <Box as="ul" className="grid gap-2.5">
                    {feat.points.map((point) => (
                      <Box
                        as="li"
                        key={point}
                        className="relative pl-5 text-[15px] leading-[1.5] text-ink/70"
                      >
                        <Box
                          as="span"
                          aria-hidden="true"
                          className="absolute left-0 top-[9px] block size-2 rounded-full bg-navy"
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

      {/* ── 4. CONTACT / FORM ── */}
      <Section
        id="contact"
        aria-labelledby="spectra-contact-h"
        className="bg-navy py-16 lg:py-24"
      >
        <Box className="mx-auto max-w-[62ch] text-center">
          <Reveal delay={1}>
            <RichHeading
              as="h2"
              id="spectra-contact-h"
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
