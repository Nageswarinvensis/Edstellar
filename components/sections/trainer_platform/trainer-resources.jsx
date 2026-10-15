import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import BlogPostCard from "@/components/common/blog-post-card";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";

/**
 * "Edstellar resources" — three blog posts as the blog index's own cards.
 * Each item is in the blog API's post shape (`slug`, `title`, `cover_image`,
 * `category_name`, `published_at`).
 *
 * Design: Join as a Trainer `#resources`; cards from the blog main page.
 */
export default function TrainerResources({ data }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section id="resources" className={SECTION_PADDING} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} description={data.description} align="start" />

      <Box className="grid gap-5 min-[641px]:grid-cols-2 min-[1021px]:grid-cols-3">
        {items.map((post, index) => (
          <Reveal key={post.slug} delay={index + 1}>
            <BlogPostCard post={post} />
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
