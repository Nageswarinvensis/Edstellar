import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import ListingHero from "@/components/blog/common/listing-hero";
import BlogPosts from "@/components/blog/common/blog-posts";
import BlogSidebar from "@/components/blog/common/blog-sidebar";
import { fetchCategoryPosts } from "@/lib/actions/blog-category";

/** Same layout as the author hero (components/blog/author-hero.jsx) — hero +
 * paginated post grid — minus the author-only image and social links, since
 * a category has neither. */
export default function CategoryHero({ category, slug, categories }) {
  const meta = category.meta || {};

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: category.name },
  ];

  return (
    <>
      <ListingHero
        heading={meta.h1 || category.name}
        breadcrumb={breadcrumb}
        description={category.description}
      />

      <Section className="scroll-mt-24 pt-0 lg:pt-0" id="blogs">
        <Box className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.45fr]">
          <BlogPosts
            identifier={slug}
            initialPosts={category.blogs?.data || []}
            initialPagination={category.blogs?.pagination}
            fetchAction={fetchCategoryPosts}
            paginationLabel="Category articles pagination"
          />

          <Box className="hidden lg:block">
            <Box className="sticky top-20">
              <BlogSidebar categories={categories} />
            </Box>
          </Box>
        </Box>
      </Section>
    </>
  );
}
