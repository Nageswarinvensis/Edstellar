import Link from "next/link";
import { ArrowUpRight, User } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CopyLinkButton from "@/components/blog/copy-link-button";
import { SITE } from "@/lib/constants";

export default function AuthorCard({ name, slug, avatar, shortDescription }) {
  if (!name) return null;

  const authorUrl = slug ? `${SITE.url}/blog/author/${slug}` : null;

  return (
    <Box className="rounded-2xl border border-ink/10 bg-white p-4">
      <Box className="flex items-center justify-between gap-4">
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
            <Text
              as="p"
              className="font-display text-base font-semibold text-ink"
            >
              By {name}
            </Text>

            {slug && (
              <Link
                href={`/blog/author/${slug}`}
                title={`View ${name}'s full bio and articles`}
                className="mt-1 inline-flex cursor-pointer items-center gap-1 rounded-full bg-olive/10 px-3 py-1 text-[13px] leading-none font-medium text-olive transition-colors hover:bg-olive/15"
              >
                View Full Bio &amp; Articles
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            )}
          </Box>
        </Box>

        {authorUrl && <CopyLinkButton url={authorUrl} />}
      </Box>

      {shortDescription && (
        <Text as="p" className="mt-3 text-sm leading-[1.6] text-ink/60">
          {shortDescription}
        </Text>
      )}
    </Box>
  );
}
