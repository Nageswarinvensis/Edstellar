import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

/**
 * "Blog Categories" — every category as a mono pill; the post's own category
 * (`currentSlug`) is filled navy with lime text.
 *
 * Design: Blog Template `.sec`, `.cats`, `.cat`, `.cat.on`.
 */
export default function BlogDetailCategories({ categories, currentSlug }) {
  // Default params only cover `undefined` — the content layer can also send
  // an explicit `null` when the API omits `categories` on a given response.
  const categoryList = categories || [];

  if (categoryList.length === 0) return null;

  return (
    <Section id="blog-categories" className="border-t border-ink/12 bg-paper">
      <Reveal>
        <RichHeading
          as="h2"
          heading="Blog <span>Categories</span>"
          className="mb-8 text-[clamp(24px,3vw,36px)] leading-[1.15] font-medium tracking-[-0.03em]"
          emphasisClassName="font-normal text-olive"
        />
      </Reveal>

      <Reveal delay={1}>
        <Box className="flex flex-wrap gap-2.5">
          {categoryList.map((category) => {
            const isCurrent = category.slug === currentSlug;
            return (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                title={
                  category.tag_title ||
                  `Click Here to View ${category.name} Related Articles`
                }
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "inline-flex items-center rounded-full border px-4.25 py-2.75 font-mono text-[11px] uppercase leading-none tracking-[0.1em] transition-colors duration-200",
                  isCurrent
                    ? "border-navy bg-navy text-lime"
                    : "border-ink/22 text-ink/60 hover:border-navy hover:bg-ink/4 hover:text-ink",
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
