import Section from "@/components/ui/Section";
import ListingHero from "@/components/sections/blog/common/listing-hero";
import BlogPostsPanel from "@/components/sections/blog/common/blog-posts-panel";
import { fetchCategoryPosts } from "@/lib/actions/blog-category";

/** Same layout as the author page (components/sections/blog/author-page.jsx) — hero +
 * paginated, searchable post grid — minus the author-only image and social
 * links, since a category has neither. */
export default function CategoryPageContent({ category, slug, categories }) {
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
        <BlogPostsPanel
          identifier={slug}
          initialPosts={category.blogs?.data || []}
          initialPagination={category.blogs?.pagination}
          fetchAction={fetchCategoryPosts}
          categories={categories}
          paginationLabel="Category articles pagination"
        />
      </Section>
    </>
  );
}
