import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import BlogMainHero from "@/components/blog/blog-main-hero";
import BlogPosts from "@/components/blog/common/blog-posts";
import BlogSidebar from "@/components/blog/common/blog-sidebar";
import { fetchMainPosts } from "@/lib/actions/blog-main";

/** Same layout as author-hero.jsx/category-hero.jsx — hero + paginated post
 * grid, backed by the real blog index API (lib/content/blog.js#getBlogMain,
 * `/api/v2/blog`). */
export default function BlogMain({ posts, categories }) {
  return (
    <>
      <BlogMainHero />

      <Section className="scroll-mt-24" id="blogs">
        <Box className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.45fr]">
          <BlogPosts
            identifier={null}
            initialPosts={posts?.data || []}
            initialPagination={posts?.pagination}
            fetchAction={fetchMainPosts}
            paginationLabel="Blog articles pagination"
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
