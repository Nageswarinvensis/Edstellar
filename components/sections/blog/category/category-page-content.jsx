import Section from "@/components/ui/Section";
import CategoryHero from "@/components/sections/blog/category/category-hero";
import BlogPostsPanel from "@/components/sections/blog/common/blog-posts-panel";
import { fetchCategoryPosts } from "@/lib/actions/blog-category";

/** Same layout as the author page (author/author-page-content.jsx) — navy
 * hero + paginated, searchable post grid with the same cards and pagination
 * (`variant="author"`) — minus the author-only avatar and social links. */
export default function CategoryPageContent({ category, slug, categories }) {
  const meta = category.meta || {};

  return (
    <>
      <CategoryHero
        name={category.name}
        heading={meta.h1}
        description={category.description}
      />

      <Section className="scroll-mt-24" id="blogs">
        <BlogPostsPanel
          identifier={slug}
          initialPosts={category.blogs?.data || []}
          initialPagination={category.blogs?.pagination}
          fetchAction={fetchCategoryPosts}
          categories={categories}
          paginationLabel="Category articles pagination"
          variant="author"
        />
      </Section>
    </>
  );
}
