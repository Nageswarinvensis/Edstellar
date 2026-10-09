import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import CapabilitySignal from "./capability-signal";

/**
 * "The platform behind the work" — the OD hub's Capability Intelligence
 * Platform band: a dark card with the pitch on the left, the live
 * "Capability signal" carousel on the right, and a centred CTA beneath.
 *
 * Server Component; only the carousel (`CapabilitySignal`) is interactive, so
 * the `"use client"` boundary stays in that leaf.
 *
 * CMS: the `ld_Platform` component —
 * `{ eyebrow, heading, description, section_id, terminal_title,
 *    cta: { href, label }, tabs: [{ id, label, metrics: [{ title, value, subtitle }] }] }`.
 *
 * Design: `organizational-development-consulting-hub.html` → `#platform`,
 * `.plat`, `.plat-txt`, `.plat-viz`, `.cip`, `.plat-cta`.
 */
export default function Platform({ data }) {
  if (!data?.heading) return null;

  const { section_id, eyebrow, heading, description, terminal_title, tabs } =
    data;
  const cta = data.cta || data.primary_cta;

  return (
    <Section id={section_id ?? "platform"} className="bg-paper-warm">
      <Box className="rounded-[24px] bg-navy p-[clamp(24px,3vw,34px)] shadow-lift">
        <Box className="grid items-center gap-x-9 gap-y-6 min-[821px]:grid-cols-[1.1fr_0.9fr]">
          {/* Pitch */}
          <Box>
            {eyebrow ? (
              <Reveal>
                <Text
                  as="p"
                  className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-lime"
                >
                  {eyebrow}
                </Text>
              </Reveal>
            ) : null}

            <Reveal delay={1}>
              <RichHeading
                heading={heading}
                className="mb-2.5 text-paper"
                emphasisClassName="font-serif font-normal italic text-lime"
              />
            </Reveal>

            {description ? (
              <Reveal delay={1}>
                <Text
                  as="p"
                  className="max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/74"
                >
                  {description}
                </Text>
              </Reveal>
            ) : null}
          </Box>

          {/* Live capability signal */}
          <Reveal delay={2}>
            <CapabilitySignal tabs={tabs} signalLabel={terminal_title} />
          </Reveal>
        </Box>

        {/* CTA — centred beneath both columns */}
        {cta?.href ? (
          <Reveal delay={2}>
            <Box className="mt-6 flex justify-center">
              <CtaButton
                color="lime"
                arrow
                render={<Link href={cta.href} />}
                className="focus-visible:outline-lime"
              >
                {cta.label}
              </CtaButton>
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}
