import { BadgeCheck } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import ListingHero from "@/components/blog/common/listing-hero";
import BlogPosts from "@/components/blog/common/blog-posts";
import BlogSidebar from "@/components/blog/common/blog-sidebar";
import { SOCIAL_LINKS } from "@/components/blog/common/social-icon";
import { fetchAuthorPosts } from "@/lib/actions/blog-author";

export default function AuthorHero({ author, slug, categories }) {
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
        <Box className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.45fr]">
          <BlogPosts
            identifier={slug}
            initialPosts={author.blogs?.data || []}
            initialPagination={author.blogs?.pagination}
            fetchAction={fetchAuthorPosts}
            paginationLabel="Author articles pagination"
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
