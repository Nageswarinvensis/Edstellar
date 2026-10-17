import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";

/**
 * Trainer profile + "About {name}" — the CMS `meta.about` paragraphs (the
 * first set larger as a lede) beside a sticky "At a glance" card.
 * Design: amol-pune-india `#about`, `.prose`, `.railcard`.
 */
export default function ProfileAbout({ profile, data }) {
  const rows = [
    [data.glance.location, profile.location],
    [data.glance.since, profile.since],
    [data.glance.areas, profile.courses.length || null],
    [data.glance.education, profile.education[0]?.school],
  ].filter(([, value]) => value);

  return (
    <Section id="about" aria-labelledby="about-h" className="scroll-mt-32 bg-paper">
      <Box className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <Box>
          <Reveal>
            <Text as="span" className="mb-3 block font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">
              {data.eyebrow}
            </Text>
            {profile.title ? <RichHeading as="h2" id="about-h" heading={profile.titleHeading} className="mb-8" /> : null}
            <RichHeading as="h3" heading={data.sub_heading} className="mb-5" />
          </Reveal>
          <Reveal delay={1} className="max-w-[68ch]">
            {profile.about.map((paragraph, index) => (
              <Text
                as="p"
                key={index}
                className={index === 0 ? "mb-6 text-[19px] leading-[1.7] text-ink/85" : "mb-5 text-[16px] leading-[1.75] text-ink/75"}
              >
                {paragraph}
              </Text>
            ))}
          </Reveal>
        </Box>

        <Reveal delay={1} className="lg:sticky lg:top-36">
          <Box as="aside" aria-label="Trainer quick facts" className="rounded-[14px] border border-ink/12 bg-white p-6">
            <Text as="p" className="mb-3.5 font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">
              {data.glance.title}
            </Text>
            <Box as="dl" className="m-0">
              {rows.map(([label, value]) => (
                <Box key={label} className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3">
                  <dt className="text-[14px] text-ink/60">{label}</dt>
                  <dd className="m-0 text-right font-display text-[14px] font-semibold text-ink">{value}</dd>
                </Box>
              ))}
            </Box>
            <CtaButton arrow block render={<Link href={data.cta.href} />} className="mt-4">
              {data.cta.label}
            </CtaButton>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
