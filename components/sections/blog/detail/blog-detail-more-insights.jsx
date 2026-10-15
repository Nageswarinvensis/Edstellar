import Link from "next/link";
import { format } from "date-fns";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";

import Reveal from "@/components/common/reveal";
/**
 * "More Blog Insights" — the latest posts as a card grid below the article.
 * Fed by the blog listing (`/api/v2/blog`, newest first) with the current post
 * removed; fields read verbatim: `title`, `slug`, `category_name`,
 * `published_at` (CLAUDE.md #10). Renders nothing without posts.
 *
 * Six cards, three per row on desktop (two on tablet, one on phones).
 *
 * Design: Blog Template `.sec`, `.post-grid`, `.post-card`.
 */
export default function BlogDetailMoreInsights({ posts = [] }) {
  if (!posts.length) return null;
  const shown = posts.slice(0, 6); // two rows of three

  return (
    <Section id="more-insights" className="border-t border-ink/12 bg-paper">
      <Reveal>
        <RichHeading
          as="h2"
          heading="More Blog <span>Insights</span>"
          className="mb-8 text-[clamp(24px,3vw,36px)] leading-[1.15] font-bold tracking-[-0.03em]"
          emphasisClassName="font-normal text-olive"
        />

        <Box as="ul" className="m-0 grid list-none grid-cols-3 gap-4.5 p-0 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {shown.map((post) => (
            <Box as="li" key={post.slug} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                title={`Click Here to View ${post.title}`}
                className="flex h-full flex-col rounded-2xl border border-ink/12 bg-white p-6.5 no-underline transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.25 hover:border-ink/22 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {post.category_name ? (
                  <Text
                    as="span"
                    className="mb-3 block font-mono text-[10px] uppercase leading-[1.6] tracking-[0.2em] text-olive"
                  >
                    {post.category_name}
                  </Text>
                ) : null}

                <Text
                  as="h3"
                  className="mb-4 text-[17px] leading-[1.36] font-semibold tracking-[-0.02em] text-ink"
                >
                  {post.title}
                </Text>

                {post.published_at ? (
                  <Text
                    as="span"
                    className="mt-auto block border-t border-ink/12 pt-4 font-mono text-[10.5px] leading-[1.6] tracking-[0.08em] text-ink/45"
                  >
                    <time dateTime={post.published_at}>
                      {format(new Date(post.published_at), "MMMM d, yyyy")}
                    </time>
                  </Text>
                ) : null}
              </Link>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
