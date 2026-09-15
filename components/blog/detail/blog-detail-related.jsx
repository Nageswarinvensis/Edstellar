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
    <Box>
      <Box className="relative w-full px-2 py-0">
        <Text as="h2" className="mb-4 text-2xl font-bold text-[#3b3b3b]">
          Related Posts
        </Text>

        <Box className="space-y-5">
          {blogs.map((post) => (
            <Box
              as="article"
              key={post.id}
              className="border-l border-black pl-4"
            >
              {categoryName && (
                <Text className=" mb-0.5 text-sm text-[#333]">
                  {categoryName}
                </Text>
              )}

              <Link
                href={`/blog/${post.slug}`}
                title={`Click Here to View ${post.name}`}
                className="cursor-pointer"
              >
                <Text
                  as="h3"
                  className="text-[16px] font-semibold leading-[1.35] text-[#202020] transition-colors duration-300 hover:text-blue-600"
                >
                  {post.name}
                </Text>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
