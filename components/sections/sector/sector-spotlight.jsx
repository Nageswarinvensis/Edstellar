import Image from "next/image";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";

/**
 * "Customized Skilling Solutions Tailored to Your Needs" — the navy band with
 * the heading, lede and an Enquire Now button on the left and a photo on the
 * right. Same band as the talent-assessment tool spotlight, but that one
 * carries a tool's use cases and an inline diagram; this one a photo and a
 * button, so it is its own section.
 *
 * `data`: `section_id`, `heading` (emphasis in `<span>`), `description`,
 * `cta` `{ label, href }`, `image` `{ src, alt, width, height }`.
 *
 * Design: government-employees-training-courses / training-for-universities
 * `[data-cmp="tool-spotlight"]` `.tsp`, `.tsp-g`, `.tsp-btn`, `.tsp-photo`.
 */
export default function SectorSpotlight({ data }) {
  if (!data?.heading) return null;

  const { section_id, heading, description, cta, image } = data;

  return (
    <Section
      id={section_id}
      className="bg-navy bg-[radial-gradient(900px_420px_at_85%_0%,rgba(200,241,53,0.14),transparent_60%)]"
    >
      <Box className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-7">
        <Box>
          <Reveal>
            <RichHeading
              heading={heading}
              className="text-paper"
              emphasisClassName="font-normal text-lime"
            />
          </Reveal>

          {description ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/80"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}

          {cta?.href ? (
            <Reveal delay={2}>
              <Box className="mt-6.5">
                <CtaButton arrow color="lime" render={<a href={cta.href} />}>
                  {cta.label}
                </CtaButton>
              </Box>
            </Reveal>
          ) : null}
        </Box>

        {image?.src ? (
          <Reveal delay={2}>
            <Box as="figure" className="m-0">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 900px) 100vw, 560px"
                className="block h-auto w-full rounded-2xl"
              />
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}
