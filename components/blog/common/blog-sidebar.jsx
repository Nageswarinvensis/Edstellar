import Link from "next/link";
import { ChevronDown } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import BlogSearch from "@/components/blog/common/blog-search";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

function CategoryList({ categoryList }) {
  return (
    <Box as="ul" className="flex flex-col gap-3">
      {categoryList.map((category) => (
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
            {typeof category.blogs_count === "number" && (
              <Text as="span" className="text-ink/50">
                {" "}
                ({category.blogs_count})
              </Text>
            )}
          </Link>
        </li>
      ))}
    </Box>
  );
}

/**
 * Sidebar for the blog listing pages — search box + the category list from
 * the blog index API (lib/content/blog.js#getBlogMain's `categories`, each
 * `{ id, name, slug, tag_title, blogs_count }`). Renders at every width now
 * (BlogPostsPanel no longer keeps a separate mobile-only search box), with
 * the category list collapsed behind a "Blog Categories" dropdown on narrow
 * screens and shown as a plain list at `lg` and up, where there's room for
 * both this card and the post grid side by side.
 *
 * The search box itself is controlled from outside: `BlogPostsPanel` owns
 * the query/post-list state (it's the shared parent of this sidebar and the
 * post grid), and hands `searchValue`/`onSearchChange` in here so the input
 * can live inside this card without this component owning any state of its
 * own.
 */
export default function BlogSidebar({
  categories,
  searchValue,
  onSearchChange,
  searchPlaceholder,
}) {
  // Default params only cover `undefined` — the content layer can also send
  // an explicit `null` when the API omits `categories` on a given response.
  const categoryList = categories || [];

  return (
    <>
      {/* Mobile/tablet: search and the categories dropdown are each their
          own bordered box, stacked with a gap — not one shared card. */}
      <Box className="flex flex-col gap-4 lg:hidden">
        {onSearchChange ? (
          <BlogSearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        ) : null}

        {categoryList.length > 0 && (
          <Collapsible className="rounded-lg border border-ink/15 bg-white px-4">
            <CollapsibleTrigger
              title="Click Here to View Blog Categories"
              className="group/cat-trigger flex h-11 w-full cursor-pointer items-center justify-between text-left outline-none"
            >
              <Text as="span" className="font-display text-base font-semibold text-ink">
                Blog Categories
              </Text>

              <ChevronDown
                size={18}
                aria-hidden="true"
                className="text-ink/50 transition-transform duration-200 group-aria-expanded/cat-trigger:rotate-180"
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <Box className="border-t border-ink/10 pt-4 pb-4">
                <CategoryList categoryList={categoryList} />
              </Box>
            </CollapsibleContent>
          </Collapsible>
        )}
      </Box>

      {/* Desktop: one unified card, same as before. */}
      <Box className="hidden rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_12px_30px_-18px_rgba(10,22,40,0.15)] lg:block">
        {onSearchChange ? (
          <BlogSearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            className={categoryList.length > 0 ? "mb-5" : undefined}
          />
        ) : null}

        {categoryList.length > 0 && (
          <Box>
            <Text as="h3" className="mb-4">
              Blog Categories
            </Text>

            <CategoryList categoryList={categoryList} />
          </Box>
        )}
      </Box>
    </>
  );
}
