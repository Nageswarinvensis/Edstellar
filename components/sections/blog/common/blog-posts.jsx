"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { Spinner } from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

/** First page, last page, and a window around the current page — everything
 * else collapses to an "ellipsis" marker so a large `last_page` doesn't render
 * dozens of number buttons. */
function getPaginationRange(current, total) {
  const range = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) range.push("ellipsis-start");
  for (let n = start; n <= end; n++) range.push(n);
  if (end < total - 1) range.push("ellipsis-end");
  if (total > 1) range.push(total);

  return range;
}

/** Same pagination look as the domain page's course catalog
 * (components/sections/domain/program.jsx) — small square buttons, navy/lime
 * active state, always-visible prev/next arrows disabled at the edges. */
function PaginationButton({
  disabled,
  active,
  onClick,
  title,
  ariaLabel,
  children,
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-[7px] border transition-all duration-200",
        active
          ? "border-[#07182C] bg-[#07182C] text-[#B8F500]"
          : "border-[#D7DADF] bg-white text-[#07182C]",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer hover:border-[#07182C]",
      )}
    >
      {children}
    </button>
  );
}

/**
 * The author page's article card (Blog Author Template `.acard`): 2:1 cover
 * with a lime bar that draws in on hover, optional category tag, Sora title,
 * "Updated on" date, then "Read More ↗" with the view count on the right.
 */
function AuthorPostCard({ post }) {
  const href = `/blog/${post.slug}`;
  const linkTitle = `Click Here to Read ${post.title}`;

  return (
    <Box
      as="article"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-white transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.5 hover:border-ink/22 hover:shadow-[0_18px_40px_-18px_rgba(10,22,40,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <Link
        href={href}
        title={linkTitle}
        className="relative block aspect-[2/1] flex-none overflow-hidden bg-paper-cream after:absolute after:inset-x-0 after:bottom-0 after:h-0.75 after:origin-left after:scale-x-0 after:bg-lime after:transition-transform after:duration-300 after:content-[''] group-hover:after:scale-x-100"
      >
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : null}
      </Link>

      <Box className="flex flex-1 flex-col gap-2.5 px-5.5 pt-5 pb-5.5">
        {post.category_name ? (
          <Text
            as="span"
            className="self-start rounded-full border border-olive/25 bg-lime/22 px-2.75 py-1 font-mono text-[9.5px] uppercase leading-none tracking-[0.16em] text-olive"
          >
            {post.category_name}
          </Text>
        ) : null}

        <Text
          as="h3"
          className="text-[16.5px] leading-[1.35] font-semibold tracking-[-0.02em] text-ink"
        >
          <Link href={href} title={linkTitle} className="transition-colors hover:text-olive">
            {post.title}
          </Link>
        </Text>

        {post.published_at ? (
          <Text as="span" className="text-[13px] leading-[1.5] text-ink/60">
            Updated on:{" "}
            <time dateTime={post.published_at}>
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </time>
          </Text>
        ) : null}

        <Box className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Link
            href={href}
            title={linkTitle}
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-navy transition-colors hover:text-olive"
          >
            Read More
            <ArrowUpRight
              size={18}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {typeof post.views === "number" ? (
            <Text
              as="span"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink/60"
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

/**
 * Post grid + pagination — purely presentational. `BlogPostsPanel` (the
 * state owner, since the search box next to it needs the same
 * `posts`/`pagination` state) passes everything in and reacts to
 * `onPageChange`.
 */
export default function BlogPosts({
  posts,
  pagination,
  isPending,
  onPageChange,
  paginationLabel = "Blog articles pagination",
  searchQuery = "",
  onClearSearch,
  variant = "default",
}) {
  const trimmedQuery = searchQuery.trim();
  const isAuthor = variant === "author";

  return (
    <Box>
      {posts.length === 0 ? (
        trimmedQuery ? (
          <Box className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-ink/15 bg-white p-8">
            <Text as="p" className="text-center text-ink/60">
              No articles match &quot;{trimmedQuery}&quot;.
            </Text>

            <button
              type="button"
              onClick={onClearSearch}
              className="mt-3 cursor-pointer text-[13px] font-medium text-olive underline underline-offset-2 hover:text-olive/80"
            >
              Clear search
            </button>
          </Box>
        ) : (
          <Text as="p" className="text-center text-ink/60">
            No published articles yet.
          </Text>
        )
      ) : (
        <Box className="relative">
          {isPending && (
            <Box className="absolute inset-0 z-10 flex items-start justify-center bg-paper/60 pt-24">
              <Spinner className="size-8 text-olive" />
            </Box>
          )}

          <Box
            aria-busy={isPending}
            className={cn(
              "grid grid-cols-1 transition-opacity sm:grid-cols-2",
              isAuthor ? "gap-6" : "gap-8",
              isPending && "opacity-40",
            )}
          >
            {posts.map((post, index) =>
              isAuthor ? (
                // Staggered per card, by column, so a new page of results
                // reveals in reading order.
                <Reveal key={post.slug} delay={(index % 2) + 1} className="h-full">
                  <AuthorPostCard post={post} />
                </Reveal>
              ) : (
              <Box
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[1px_4px_10px_rgba(0,0,0,0.06)]"
              >
                {post.cover_image && (
                  <Link
                    href={`/blog/${post.slug}`}
                    title={`Click Here to Read ${post.title}`}
                    className="block h-50 flex-none overflow-hidden"
                  >
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                )}

                <Box className="flex h-full flex-col rounded-b-lg border-b-[6px] border-lime p-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    title={`Click Here to Read ${post.title}`}
                    className="group"
                  >
                    <Text
                      as="h3"
                      className="mb-3 text-[20px] leading-tight text-ink transition-colors group-hover:text-olive"
                    >
                      {post.title}
                    </Text>
                  </Link>

                  {post.published_at && (
                    <Box className="mb-5 flex items-center gap-1">
                      <Text as="span" className="text-[12px] text-ink/60">
                        Updated On:
                      </Text>
                      <Text as="span" className="text-[12px] text-ink/60">
                        {format(new Date(post.published_at), "MMMM d, yyyy")}
                      </Text>
                    </Box>
                  )}

                  <Box className="mt-auto flex items-end justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      title={`Click Here to Read ${post.title}`}
                      className="inline-flex items-center gap-3 text-[14px] font-medium text-olive"
                    >
                      Read More
                      <ArrowRight size={12} aria-hidden="true" />
                    </Link>

                    {typeof post.views === "number" && (
                      <Text
                        as="span"
                        className="flex items-center gap-1.5 text-[13px] text-ink/60"
                      >
                        <Eye size={15} aria-hidden="true" />
                        {post.views.toLocaleString()}
                      </Text>
                    )}
                  </Box>
                </Box>
              </Box>
              ),
            )}
          </Box>
        </Box>
      )}

      {pagination && pagination.last_page > 1 && (
        <Pagination aria-label={paginationLabel} className="mt-15 justify-center">
          <PaginationContent className="flex-wrap gap-1.25">
            <PaginationItem>
              <PaginationButton
                disabled={isPending || pagination.current_page === 1}
                onClick={() => onPageChange(pagination.current_page - 1)}
                title="Click Here to View Previous Page"
                ariaLabel="Go to previous page"
              >
                <ChevronLeft size={14} strokeWidth={1.5} />
              </PaginationButton>
            </PaginationItem>

            {getPaginationRange(
              pagination.current_page,
              pagination.last_page,
            ).map((n) =>
              typeof n === "number" ? (
                <PaginationItem key={n}>
                  <PaginationButton
                    active={n === pagination.current_page}
                    disabled={isPending}
                    onClick={() => onPageChange(n)}
                    title={`Click Here to View Page ${n}`}
                  >
                    {n}
                  </PaginationButton>
                </PaginationItem>
              ) : (
                <PaginationItem key={n}>
                  <PaginationEllipsis />
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationButton
                disabled={
                  isPending || pagination.current_page === pagination.last_page
                }
                onClick={() => onPageChange(pagination.current_page + 1)}
                title="Click Here to View Next Page"
                ariaLabel="Go to next page"
              >
                <ChevronRight size={14} strokeWidth={1.5} />
              </PaginationButton>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </Box>
  );
}
