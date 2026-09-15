import Link from "next/link";
import { ArrowUpRight, User } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import BlogDetailCopyLinkButton from "@/components/blog/detail/blog-detail-copy-link-button";
import { SOCIAL_LINKS, SocialIcon } from "@/components/blog/common/social-icon";
import { SITE } from "@/lib/constants";

export default function BlogDetailAuthorCard({
  name,
  slug,
  avatar,
  shortDescription,
  linkedin,
  twitter,
  facebook,
  medium,
}) {
  if (!name) return null;

  const authorUrl = slug ? `${SITE.url}/blog/author/${slug}` : null;

  // Flat on this endpoint (blog detail), unlike the nested `author.meta.*`
  // shape the author-hero page's API sends — read verbatim either way.
  const socials = { linkedin, twitter, facebook, medium };
  const socialLinks = SOCIAL_LINKS.filter(({ key }) => socials[key]).map(
    ({ key, label }) => ({ key, label: `${name} on ${label}`, href: socials[key] }),
  );

  return (
    <Box className="rounded-2xl border border-ink/10 bg-white p-4">
      <Box className="flex items-center gap-4">
        <Box className="flex size-14 flex-none items-center justify-center overflow-hidden rounded-full bg-navy text-lime">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              title={name}
              className="size-full object-cover"
            />
          ) : (
            <User size={24} strokeWidth={1.75} aria-hidden="true" />
          )}
        </Box>

        <Box>
          <Box className="flex flex-wrap items-center gap-4">
            <Text
              as="p"
              className="font-display text-base font-semibold text-ink"
            >
              By {name}
            </Text>

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
                <SocialIcon platform={key} className="size-[15px]" />
              </Link>
            ))}

            {authorUrl && <BlogDetailCopyLinkButton url={authorUrl} />}
          </Box>

          {slug && (
            <Link
              href={`/blog/author/${slug}`}
              title={`View ${name}'s full bio and articles`}
              className="mt-1 inline-flex cursor-pointer items-center gap-1 text-[13px] font-medium text-olive underline-offset-2 transition-colors hover:underline"
            >
              View Full Bio &amp; Articles
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          )}
        </Box>
      </Box>

      {shortDescription && (
        <Text as="p" className="mt-3 text-sm leading-[1.6] text-ink/60">
          {shortDescription}
        </Text>
      )}
    </Box>
  );
}
