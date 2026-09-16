import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Breadcrumbs from "@/components/common/breadcrumbs";
import Reveal from "@/components/common/reveal";
import { SocialIcon } from "@/components/blog/common/social-icon";

/**
 * Hero shared by the author and category listing pages —
 * components/blog/author-hero.jsx, components/blog/category-hero.jsx:
 * heading + description on the left, an optional square image on the right.
 * A category has no `image` or `socialLinks`, so those sections simply don't
 * render — same component, no author-only fields required.
 */
export default function ListingHero({
  heading,
  breadcrumb,
  badge,
  description,
  image,
  socialLinks = [],
}) {
  return (
    <Section>
      <Box className="grid grid-cols-1 gap-15 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Box>
          {breadcrumb && breadcrumb.length > 0 && (
            <Reveal>
              <Breadcrumbs items={breadcrumb} className="mt-0 mb-3" />
            </Reveal>
          )}

          <Reveal delay={1}>
            <Box className="mb-4 flex items-center gap-2">
              <Text as="h1">{heading}</Text>
              {badge}
            </Box>
          </Reveal>

          {description && (
            <Reveal delay={2}>
              <Text as="p">{description}</Text>
            </Reveal>
          )}

          {socialLinks.length > 0 && (
            <Reveal delay={2}>
              <Box className="mt-5 flex flex-wrap items-center gap-3">
                {socialLinks.map(({ key, label, href }) => (
                  <Link
                    key={key}
                    href={href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    title={label}
                    aria-label={label}
                    className="inline-flex size-9 flex-none cursor-pointer items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
                  >
                    <SocialIcon platform={key} className="size-4" />
                  </Link>
                ))}
              </Box>
            </Reveal>
          )}
        </Box>

        {image && (
          <Reveal delay={2} className="flex items-center justify-start lg:justify-end">
            <Box className="size-60 flex-none overflow-hidden rounded-2xl ring-4 ring-ink/5">
              <img
                src={image.src}
                alt={image.alt}
                className="size-full object-cover"
              />
            </Box>
          </Reveal>
        )}
      </Box>
    </Section>
  );
}
