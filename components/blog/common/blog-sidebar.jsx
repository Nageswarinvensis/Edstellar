import Link from "next/link";
import { Search } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/**
 * Right-rail sidebar for the blog listing pages — search box + the category
 * list from the blog index API (lib/content/blog.js#getBlogMain's
 * `categories`, each `{ id, name, slug, tag_title, blogs_count }`).
 *
 * The search input is visual only for now — there's no search endpoint yet
 * to wire it to.
 */
export default function BlogSidebar({ categories = [] }) {
  return (
    <Box className="rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_12px_30px_-18px_rgba(10,22,40,0.15)]">
      <Box className="relative">
        <input
          type="search"
          placeholder="Search Blog"
          className="h-11 w-full rounded-lg border border-ink/15 bg-white pl-4 pr-10 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-olive"
        />
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink/40"
          aria-hidden="true"
        />
      </Box>

      {categories.length > 0 && (
        <Box className="mt-5 border-t border-ink/10 pt-5">
          <Text as="h3" className="mb-4">
            Blog Categories
          </Text>

          <Box as="ul" className="flex flex-col gap-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/blog/category/${category.slug}`}
                  title={
                    category.tag_title ||
                    `Click Here to View ${category.name} Related Articles`
                  }
                  className="text-ink transition-colors hover:text-olive"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
