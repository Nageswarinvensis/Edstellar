import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import CtaButton from "@/components/common/cta-button";

/**
 * L&D Hub band below the article: a navy panel with the kicker, heading and
 * line on the left and the lime button on the right (stacks on narrow
 * screens).
 *
 * Design: Blog Template "L&D HUB BAND" — `.sec.warm`, `.cta`, `.cta-lab`,
 * `.cta-h`, `.cta-p`, `.btn-primary`.
 */
export default function BlogDetailSubscribeCta() {
  return (
    <Section className="bg-paper-warm">
      <Reveal>
        <Box className="flex flex-wrap items-center justify-between gap-6.5 rounded-[22px] bg-navy px-10 py-9.5 max-[600px]:px-6 max-[600px]:py-8">
          <Box className="max-w-[52ch]">
            <Text
              as="span"
              className="mb-2.5 block font-mono text-[10px] uppercase leading-[1.6] tracking-[0.2em] text-lime"
            >
              L&amp;D Hub
            </Text>

            <Text
              as="h2"
              className="max-w-[30ch] text-[22px] leading-[1.3] font-semibold tracking-[-0.02em] text-paper"
            >
              Transform Your L&amp;D Strategy Today
            </Text>

            <Text
              as="p"
              className="mt-2.5 text-[14.5px] leading-[1.7] text-paper/75"
            >
              Unlock premium resources, tools, and frameworks designed for HR and
              learning professionals. Our L&amp;D Hub gives you everything needed
              to elevate your organization&apos;s training approach.
            </Text>
          </Box>

          <CtaButton
            render={
              <Link
                href="/learning-development-resources"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            color="lime"
            title="Click Here to Access L&D Hub Resources"
            arrow
            className="flex-none px-7 py-4 leading-[1.4] max-[600px]:w-full"
          >
            Access L&amp;D Hub Resources
          </CtaButton>
        </Box>
      </Reveal>
    </Section>
  );
}
