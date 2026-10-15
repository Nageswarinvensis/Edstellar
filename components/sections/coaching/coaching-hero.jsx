import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { coachingIcon } from "@/components/sections/coaching/icons";

/**
 * Coaching hub hero: breadcrumb, heading, lede, two CTAs and an icon row on
 * the left, the session illustration on the right.
 *
 * `cms` is the CMS `consulting_Hero`, read verbatim: `heroLeft.title` +
 * `tagline` make the heading, then `description`, the two buttons, the
 * `Icons_box` row (`icon` + `text`) and the `hero_right_image` illustration.
 * `breadcrumbs` come from the page.
 *
 * Design: coaching-hub `.hero`, `.hero-grid`, `.hero-meta`, `.hero-art`,
 * `.hero-foot`.
 */
export default function CoachingHero({ cms, breadcrumbs }) {
  const left = cms?.heroLeft;
  if (!left?.title) return null;

  const heading = left.tagline
    ? `${left.title} <span>${left.tagline}</span>`
    : left.title;
  const { description } = left;
  const primary_cta = left.primaryBtnText
    ? { label: left.primaryBtnText, href: left.primaryBtnLink }
    : null;
  const secondary_cta = left.secondaryBtnText
    ? { label: left.secondaryBtnText, href: left.secondaryBtnLink }
    : null;
  const icons = cms.Icons_box ?? [];
  const image = cms.hero_right_image;

  return (
    <Box
      as="header"
      id="top"
      className="bg-paper px-5 pt-8 pb-6 lg:px-10 lg:pt-16 lg:pb-8"
    >
      <Box className="mx-auto grid max-w-7xl grid-cols-[1.1fr_0.9fr] items-center gap-14 max-[1200px]:grid-cols-1 max-[1200px]:gap-10">
        <Box>
          <Reveal>
            {breadcrumbs?.length ? (
              <Box className=" my-6">
                <Breadcrumbs items={breadcrumbs} />
              </Box>
            ) : null}
            <RichHeading
              as="h1"
              heading={heading}
              className="text-[clamp(38px,4.4vw,48px)] leading-[1.05]"
              emphasisClassName="font-normal"
            />
          </Reveal>

          {description ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-6 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}

          <Reveal delay={2}>
            <Box className="mt-8 flex flex-wrap gap-4">
              {primary_cta?.href ? (
                <CtaButton
                  arrow
                  render={<Link href={primary_cta.href} />}
                  className="px-7 py-4"
                >
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

          {icons.length ? (
            <Reveal delay={3}>
              <Box className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink/60">
                {icons.map((item) => {
                  const Icon = coachingIcon(item.icon);
                  return (
                    <Text
                      as="span"
                      key={item.text}
                      className="inline-flex items-center gap-2 text-[14px] text-ink/60"
                    >
                      {Icon ? (
                        <Icon
                          size={18}
                          strokeWidth={1.7}
                          className="text-navy"
                          aria-hidden="true"
                        />
                      ) : null}
                      {item.text}
                    </Text>
                  );
                })}
              </Box>
            </Reveal>
          ) : null}
        </Box>

        {image ? (
          <Reveal delay={2}>
            <Box as="figure" className="m-0">
              <img
                src={image}
                alt="Leader and coach in a Meridian coaching session"
                width={586}
                height={517}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full"
              />
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Box>
  );
}
