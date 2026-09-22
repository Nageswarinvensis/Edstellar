import Section from "@/components/ui/Section";
import BlogMainHero from "@/components/sections/blog/main/blog-main-hero";
import BlogPostsPanel from "@/components/sections/blog/common/blog-posts-panel";
import { fetchMainPosts } from "@/lib/actions/blog-main";

/** Same layout as blog/author/author-page-content.jsx and
 * blog/category/category-page-content.jsx — hero +
 * paginated, searchable post grid, backed by the real blog index API
 * (lib/content/blog.js#getBlogMain, `/api/v2/blog`). */
export default function BlogMainPageContent({ posts, categories }) {
  return (
    <>
      <BlogMainHero />

      <Section className="scroll-mt-24" id="blogs">
        <BlogPostsPanel
          identifier={null}
          initialPosts={posts?.data || []}
          initialPagination={posts?.pagination}
          fetchAction={fetchMainPosts}
          categories={categories}
          paginationLabel="Blog articles pagination"
        />
      </Section>
    </>
  );
}
