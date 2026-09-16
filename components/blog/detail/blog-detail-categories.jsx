import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

export default function BlogDetailCategories({ categories }) {
  // Default params only cover `undefined` — the content layer can also send
  // an explicit `null` when the API omits `categories` on a given response.
  const categoryList = categories || [];

  if (categoryList.length === 0) return null;

  return (
    <Section>
      <Reveal>
        <Text as="h2" className="mb-6">
          Blog Categories
        </Text>
      </Reveal>

      <Reveal delay={1}>
        <Box className="flex flex-wrap gap-3">
          {categoryList.map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              title={
                category.tag_title ||
                `Click Here to View ${category.name} Related Articles`
              }
              className="inline-flex cursor-pointer items-center rounded-lg border border-ink/15 bg-white px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:border-olive hover:text-olive"
            >
              {category.name}
            </Link>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
