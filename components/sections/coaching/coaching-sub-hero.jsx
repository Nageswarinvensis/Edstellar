import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { coachingIcon } from "@/components/sections/coaching/icons";

/**
 * Sub-page coaching hero — identical layout to CoachingHero but always renders
 * breadcrumbs (auto-built from the URL path when no CMS items are provided).
 *
 * Design: coaching sub-pages `.hero`, `.hero-grid`, `.hero-art`, `.hero-foot`.
 */
export default function CoachingSubHero({ data }) {
  if (!data?.heading) return null;

  const { heading, description, primary_cta, secondary_cta, meta, art_svg, art_label } = data;

  return (
    <Box as="header" id="top" className="bg-paper px-5 pt-8 pb-6 lg:px-10 lg:pt-16 lg:pb-8">
      <Box className="mx-auto grid max-w-7xl grid-cols-[1.1fr_0.9fr] items-center gap-14 max-[1200px]:grid-cols-1 max-[1200px]:gap-10">
        <Box>
          <Reveal>
            <RichHeading
              as="h1"
              heading={heading}
              className="text-[clamp(38px,4.4vw,48px)] leading-[1.05]"
              emphasisClassName="font-normal"
            />
          </Reveal>

          {description ? (
            <Reveal delay={1}>
              <Text as="p" className="mt-6 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
                {description}
              </Text>
            </Reveal>
          ) : null}

          <Reveal delay={2}>
            <Box className="mt-8 flex flex-wrap gap-4">
              {primary_cta?.href ? (
                <CtaButton arrow render={<Link href={primary_cta.href} />} className="px-7 py-4">
                  {primary_cta.label}
                </CtaButton>
              ) : null}
              {secondary_cta?.href ? (
                <CtaButton
                  variant="secondary"
                  render={<Link href={secondary_cta.href} />}
                  className="border-[1.5px] border-navy px-7 py-4 text-navy hover:-translate-y-0.5 hover:bg-transparent hover:shadow-lift"
                >
                  {secondary_cta.label}
                </CtaButton>
              ) : null}
            </Box>
          </Reveal>

          {meta?.length ? (
            <Reveal delay={3}>
              <Box className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {meta.map((item) => {
                  const Icon = coachingIcon(item.icon);
                  return (
                    <Text as="span" key={item.label} className="inline-flex items-center gap-2 text-[14px] text-ink/60">
                      {Icon ? <Icon size={18} strokeWidth={1.7} className="text-navy" aria-hidden="true" /> : null}
                      {item.label}
                    </Text>
                  );
                })}
              </Box>
            </Reveal>
          ) : null}
        </Box>

        {art_svg ? (
          <Reveal delay={2}>
            <Box
              as="figure"
              role="img"
              aria-label={art_label}
              className="m-0 [&_svg]:block [&_svg]:aspect-[560/500] [&_svg]:h-auto [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: art_svg }}
            />
          </Reveal>
        ) : null}
      </Box>

      {/* Always render breadcrumbs — auto-built from the URL path */}
      <Box className="mx-auto mt-14 max-w-7xl">
        <Breadcrumbs />
      </Box>
    </Box>
  );
}
