import Link from "next/link";
import { format } from "date-fns";
import { ArrowUpRight, Eye } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/**
 * The blog article card (Blog Author Template `.acard`): 2:1 cover with a
 * lime bar that draws in on hover, optional category tag, Sora title,
 * ↗ arrow, then the "Updated on" date with the view count on the right.
 *
 * Used by the blog index / author / category grids and the trainer-platform
 * resources row. `post` is the blog API's shape: `slug`, `title`,
 * `cover_image`, `category_name?`, `published_at?`, `views?`.
 */
export default function BlogPostCard({ post }) {
  const href = `/blog/${post.slug}`;
  const linkTitle = `Click Here to Read ${post.title}`;
  const title = post.title?.trim() ?? "";
  const lastSpace = title.lastIndexOf(" ");
  const titleHead = title.slice(0, lastSpace + 1);
  const titleTail = title.slice(lastSpace + 1);

  return (
    <Box
      as="article"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-white transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.5 hover:border-ink/22 hover:shadow-[0_18px_40px_-18px_rgba(10,22,40,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Not a link: only the title is clickable. */}
      <Box className="relative block aspect-[2/1] flex-none overflow-hidden bg-paper-cream after:absolute after:inset-x-0 after:bottom-0 after:h-0.75 after:origin-left after:scale-x-0 after:bg-lime after:transition-transform after:duration-300 after:content-[''] group-hover:after:scale-x-100">
        {post.cover_image ? (
          <img decoding="async"
            src={post.cover_image}
            alt={post.title}
            title={post.title}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : null}
      </Box>

      <Box className="flex flex-1 flex-col gap-2.5 px-5.5 pt-5 pb-5.5">
        {post.category_name ? (
          <Text
            as="span"
            className="self-start rounded-full border border-olive/25 bg-lime/22 px-2.75 py-1 font-mono text-[9.5px] uppercase leading-none tracking-[0.16em] text-olive"
          >
            {post.category_name}
          </Text>
        ) : null}

        {/* A card title, not a section heading — a <p> styled as the h3 it
            replaced (`font-display` is an h3 default in Text). */}
        <Text
          as="p"
          className="font-display text-[16.5px] leading-[1.35] font-medium tracking-[-0.02em] text-ink"
        >
          <Link href={href} title={linkTitle} target="_blank" rel="noopener" className="transition-colors hover:text-olive">
            {titleHead}
            {/* The arrow is glued to the last word so it never wraps onto a
                line by itself. */}
            <Box as="span" className="whitespace-nowrap">
              {titleTail}
              <ArrowUpRight
                size={18}
                strokeWidth={2}
                aria-hidden="true"
                className="ml-1 inline-block align-[-0.15em] text-navy transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Box>
          </Link>
        </Text>

        <Box className="mt-auto flex items-center justify-between gap-3 pt-6">
          {post.published_at ? (
            <Text as="span" className="text-[13px] leading-[1.5] text-ink-muted">
              Updated on:{" "}
              <time dateTime={post.published_at}>
                {format(new Date(post.published_at), "MMMM d, yyyy")}
              </time>
            </Text>
          ) : (
            <Box as="span" />
          )}

          {typeof post.views === "number" ? (
            <Text
              as="span"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-muted"
              aria-label={`${post.views.toLocaleString()} views`}
            >
              <Eye size={17} aria-hidden="true" />
              {post.views.toLocaleString()}
            </Text>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
