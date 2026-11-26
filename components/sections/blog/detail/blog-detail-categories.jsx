import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

/**
 * "Blog Categories" — every category as a plain text link; the post's own category
 * (`currentSlug`) is olive and medium weight.
 *
 * Design: Blog Template `.sec`, `.cats`, `.cat`, `.cat.on`.
 */
export default function BlogDetailCategories({ categories, currentSlug }) {
  // Default params only cover `undefined` — the content layer can also send
  // an explicit `null` when the API omits `categories` on a given response.
  const categoryList = categories || [];

  if (categoryList.length === 0) return null;

  return (
    <Section id="blog-categories" className="border-t border-ink/12 bg-paper py-6 lg:py-8">
      <Reveal>
        <RichHeading
          as="h2"
          heading="Blog <span>Categories</span>"
          className="mb-3 text-[16px] leading-[1.3] font-medium tracking-[-0.02em]"
          emphasisClassName="font-normal text-olive"
        />
      </Reveal>

      <Reveal delay={1}>
        <Box className="flex flex-wrap gap-x-5 gap-y-2">
          {categoryList.map((category) => {
            const isCurrent = category.slug === currentSlug;
            return (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                target="_blank"
                rel="noopener"
                title={
                  category.tag_title ||
                  `Click here to view ${category.name} related articles`
                }
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "text-[14px] leading-[1.5] transition-colors duration-200 hover:text-olive hover:underline hover:underline-offset-3",
                  isCurrent ? "font-medium text-olive" : "text-ink-muted",
                )}
              >
                {category.name}
              </Link>
            );
          })}
        </Box>
      </Reveal>
    </Section>
  );
}
