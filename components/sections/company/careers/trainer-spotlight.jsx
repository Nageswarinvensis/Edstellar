import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";

/** Dark "If you are a Trainer, Join us Today!" band — copy and two buttons
 * on the left, photo on the right.
 * Design: careers `[data-cmp="tool-spotlight"]`, `.tsp-g`, `.tsp-photo`. */
export default function TrainerSpotlight({ data }) {
  if (!data?.heading) return null;

  return (
    <Section
      id="tool"
      aria-labelledby="trainer-h"
      className="bg-navy bg-[image:radial-gradient(900px_420px_at_85%_0%,rgba(200,241,53,0.14),transparent_60%)] text-paper"
    >
      <Box className="grid grid-cols-1 items-center gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <Reveal>
          <RichHeading
            as="h2"
            id="trainer-h"
            heading={data.heading}
            className="text-[clamp(32px,4vw,40px)] leading-[1.08] font-bold text-paper"
            emphasisClassName="text-[1.08em] tracking-[-0.01em] text-lime"
          />
          {data.subheading ? (
            <Text as="h3" className="mt-4.5 mb-2 text-[20px] leading-[1.2] font-bold text-lime">
              {data.subheading}
            </Text>
          ) : null}
          <Text as="p" className="mt-4 mb-8 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/80">
            {data.description}
          </Text>
          <Box className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {data.primary?.href ? (
              <CtaButton color="lime" arrow render={<a href={data.primary.href} />}>
                {data.primary.label}
              </CtaButton>
            ) : null}
            {data.secondary?.href ? (
              <CtaButton arrow
                variant="ghost"
                className="border-paper/35 text-paper hover:border-lime hover:bg-transparent hover:text-lime"
                render={<Link href={data.secondary.href} />}
              >
                {data.secondary.label}
              </CtaButton>
            ) : null}
          </Box>
        </Reveal>

        {data.image?.src ? (
          <Reveal delay={1} className="w-full max-w-105 justify-self-center">
            <Box className="rounded-[20px] border border-lime/28 bg-navy-soft p-3.5 lg:p-6">
              <img
                src={data.image.src}
                alt={data.image.alt}
                width={data.image.width}
                height={data.image.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-2xl"
              />
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}
