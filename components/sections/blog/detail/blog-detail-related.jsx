import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/** Other posts in the same category — `related_blogs` from `getBlogPost`
 * (`/api/v2/blog/{slug}`'s top-level sibling of `blog`): a single shared
 * `category_name` plus each post's own `{ id, name, slug }` (CLAUDE.md #10,
 * read verbatim — note `name`, not `title`, here). */
export default function BlogDetailRelated({ categoryName, blogs = [] }) {
  if (blogs.length === 0) return null;

  return (
    <Box className="rounded-2xl border border-ink/12 bg-white p-6">
      <Text
        as="h2"
        className="mb-3.5 border-b border-ink/12 pb-3 font-mono text-[10px] font-normal uppercase leading-[1.6] tracking-[0.2em] text-ink/45"
      >
        Related Posts
      </Text>

      <Box>
        {blogs.map((post) => (
          <Box as="article" key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              title={`Click Here to View ${post.name}`}
              className="block cursor-pointer border-l-2 border-ink/12 py-3 pl-3.75 transition-colors duration-250 hover:border-lime"
            >
              {categoryName && (
                <Text
                  as="span"
                  className="mb-1.25 block font-mono text-[9.5px] uppercase leading-[1.5] tracking-[0.18em] text-olive"
                >
                  {categoryName}
                </Text>
              )}

              <Text
                as="h3"
                className="text-[14px] leading-[1.4] font-semibold tracking-[-0.01em] text-ink"
              >
                {post.name}
              </Text>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
