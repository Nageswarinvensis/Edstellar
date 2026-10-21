import { format } from "date-fns";
import Link from "next/link";
import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { SocialIcon } from "@/components/sections/blog/common/social-icon";

/** Share targets for the hero's share row, built from the post's URL. */
function shareLinks(url) {
  const u = encodeURIComponent(url);
  return [
    { key: "linkedin", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { key: "twitter", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}` },
    { key: "facebook", label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { key: "whatsapp", label: "Share on WhatsApp", href: `https://wa.me/?text=${u}` },
    { key: "pinterest", label: "Save to Pinterest", href: `https://pinterest.com/pin/create/button/?url=${u}` },
  ];
}

/**
 * Blog post hero: a plain navy band with the brand's arc rings bleeding off
 * the right edge (`arc-rings-hero`, app/globals.css) — no photography. The
 * copy column carries the category, title, excerpt, byline with date and
 * read time and share row.
 *
 * Design: Blog page v2 `.art-hero`, `.art-h1`, `.art-ask`, `.art-byline`,
 * `.art-meta`, `.share`, `.arcs`.
 */
export default function BlogDetailHero({
  category,
  categorySlug,
  title,
  excerpt,
  authorName,
  authorSlug,
  authorAvatar,
  authorDesignation,
  authorVerifiedExpert,
  publishedAt,
  readMinutes,
  showsWhatsNew,
  layoutVariant,
  shareUrl,
}) {
  const publishedLabel = publishedAt
    ? format(new Date(publishedAt), "d MMMM yyyy")
    : null;

  return (
    <Box
      as="header"
      className="arc-rings-hero relative overflow-hidden bg-navy px-5 pt-8 pb-16 text-paper lg:px-10 max-[1000px]:pb-10 max-[600px]:pb-7"
    >
      <Box className="relative mx-auto max-w-7xl">
        <Box className="relative z-2 max-w-[960px]">
          {category ? (
            <Reveal>
              {categorySlug ? (
                <Link
                  href={`/blog/category/${categorySlug}`}
                  title={`Click Here to View ${category} Related Articles`}
                  className="inline-flex rounded-full border border-paper/28 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-lime transition-colors hover:border-lime"
                >
                  {category}
                </Link>
              ) : (
                <Text as="span" className="font-mono text-[10px] uppercase tracking-[0.14em] text-lime">
                  {category}
                </Text>
              )}
            </Reveal>
          ) : null}

          <Reveal delay={1}>
            <Text
              as="h1"
              className="mt-4.5 text-paper"
            >
              {title}
            </Text>
          </Reveal>

          {excerpt && layoutVariant ? (
            <Reveal delay={2}>
              <Text
                as="p"
                className="mt-5.5 font-serif text-[clamp(18px,1.8vw,22px)] leading-[1.35] italic text-paper/92"
              >
                {excerpt}
              </Text>
            </Reveal>
          ) : null}

          {authorName || publishedLabel || readMinutes ? (
            <Reveal delay={2}>
              <Box className="mt-7.5 flex flex-wrap items-center gap-3.5 border-t border-paper/14 pt-5.5">
                {authorAvatar ? (
                  <img loading="eager"
                    src={authorAvatar}
                    alt={authorName || "Blog author"}
                    width={44}
                    height={44}
                    className="size-11 flex-none rounded-full bg-navy-soft object-cover"
                  />
                ) : null}

                {authorName ? (
                  <span className="flex min-w-0 flex-col gap-0.75">
                    {authorSlug ? (
                      <Link
                        href={`/blog/author/${authorSlug}`}
                        title={authorName}
                        className="font-display text-[15px] font-semibold tracking-[-0.01em] text-paper hover:underline hover:underline-offset-3"
                      >
                        {authorName}
                      </Link>
                    ) : (
                      <b className="font-display text-[15px] font-semibold tracking-[-0.01em] text-paper">
                        {authorName}
                      </b>
                    )}
                    {authorDesignation ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.11em] text-paper/60">
                        {authorDesignation}
                      </span>
                    ) : null}
                  </span>
                ) : null}

                <span className="ml-auto flex flex-wrap items-center gap-x-4.5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60 max-[1000px]:ml-0 max-[1000px]:w-full">
                  {publishedLabel ? (
                    <span>
                      Updated <b className="font-medium text-lime">{publishedLabel}</b>
                    </span>
                  ) : null}
                  {readMinutes ? (
                    <span>
                      <b className="font-medium text-lime">{readMinutes} min</b> read
                    </span>
                  ) : null}
                </span>
              </Box>
            </Reveal>
          ) : null}

          {authorVerifiedExpert ? (
            <Reveal delay={3}>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-lime/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-lime">
                <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                Edstellar Verified SME
              </span>
            </Reveal>
          ) : null}

          {shareUrl ? (
            <Reveal delay={3}>
              <Box className="mt-6.5 flex flex-wrap items-center gap-2.5">
                <Text as="span" className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60">
                  Share
                </Text>
                {shareLinks(shareUrl).map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="grid size-9 place-items-center rounded-full border border-paper/28 text-paper transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-lime"
                  >
                    <SocialIcon platform={link.key} className="size-4" />
                  </a>
                ))}
                {showsWhatsNew ? (
                  <a
                    href="#whats-new"
                    title="Click Here to Check Whats New"
                    className="inline-flex min-h-8 items-center rounded-full border border-paper/28 px-3.5 py-1.75 font-mono text-[10px] font-medium uppercase tracking-[0.11em] text-lime transition-colors hover:border-lime"
                  >
                    What&apos;s new
                  </a>
                ) : null}
              </Box>
            </Reveal>
          ) : null}

        </Box>

      </Box>
    </Box>
  );
}
