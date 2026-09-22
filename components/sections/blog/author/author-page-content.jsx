import { BadgeCheck } from "lucide-react";

import Section from "@/components/ui/Section";
import ListingHero from "@/components/sections/blog/common/listing-hero";
import BlogPostsPanel from "@/components/sections/blog/common/blog-posts-panel";
import { SOCIAL_LINKS } from "@/components/sections/blog/common/social-icon";
import { fetchAuthorPosts } from "@/lib/actions/blog-author";

export default function AuthorPageContent({ author, slug, categories }) {
  const meta = author.meta || {};

  const socialLinks = SOCIAL_LINKS.filter(({ key }) => meta[key]).map(
    ({ key, label }) => ({
      key,
      label: `${author.name} on ${label}`,
      href: meta[key],
    }),
  );

  const image = author.avatar || meta.detail_page_image;

  return (
    <>
      <ListingHero
        heading={`Articles by ${author.name}`}
        badge={
          meta.verified_expert && (
            <BadgeCheck
              size={22}
              className="flex-none text-olive"
              aria-label="Verified expert"
            />
          )
        }
        description={meta.bio || author.short_description}
        image={image && { src: image, alt: author.name }}
        socialLinks={socialLinks}
      />

      <Section className="scroll-mt-24 pt-0 lg:pt-0" id="blogs">
        <BlogPostsPanel
          identifier={slug}
          initialPosts={author.blogs?.data || []}
          initialPagination={author.blogs?.pagination}
          fetchAction={fetchAuthorPosts}
          categories={categories}
          paginationLabel="Author articles pagination"
        />
      </Section>
    </>
  );
}
