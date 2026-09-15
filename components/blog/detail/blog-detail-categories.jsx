import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/** Full category tag list shown after the CTA on the blog detail page —
 * same `categories` the blog index sidebar uses (lib/content/blog.js#getBlogMain,
 * `/api/v2/blog`'s `categories`: `{ id, name, slug, tag_title, blogs_count }`). */
export default function BlogDetailCategories({ categories = [] }) {
  if (categories.length === 0) return null;

  return (
    <Section>
      <Text as="h2" className="mb-6">
        Blog Categories
      </Text>

      <Box className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/blog/category/${category.slug}`}
            title={
              category.tag_title ||
              `Click Here to View ${category.name} Related Articles`
            }
            className="inline-flex cursor-pointer items-center rounded-lg border border-ink/15 bg-white px-5 py-2.5 text-[15px] font-medium text-ink transition-colors hover:border-olive hover:text-olive"
          >
            {category.name}
          </Link>
        ))}
      </Box>
    </Section>
  );
}
