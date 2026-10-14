import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import AuthorHero from "@/components/sections/blog/author/author-hero";
import BlogPostsPanel from "@/components/sections/blog/common/blog-posts-panel";
import { SOCIAL_LINKS } from "@/components/sections/blog/common/social-icon";
import { fetchAuthorPosts } from "@/lib/actions/blog-author";

/** The CMS sends these flags as strings ("True" / "False"), so a plain
 * truthiness check would treat "False" as true. */
const isTrue = (value) => value === true || String(value).toLowerCase() === "true";

/** "Vanessa R Bruno" → "Vanessa R <span>Bruno</span>" for `RichHeading`. */
function emphasizeLastWord(name) {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return name;
  const last = words.pop();
  return `${words.join(" ")} <span>${last}</span>`;
}

export default function AuthorPageContent({ author, slug, categories }) {
  const meta = author.meta || {};

  const socialLinks = SOCIAL_LINKS.filter(({ key }) => meta[key]).map(
    ({ key, label }) => ({
      key,
      label: `${author.name} on ${label}`,
      href: meta[key],
    }),
  );

  return (
    <>
      <AuthorHero
        name={author.name}
        image={author.avatar || meta.detail_page_image}
        bio={meta.bio || author.short_description}
        verified={isTrue(meta.verified_expert)}
        socialLinks={socialLinks}
        articleCount={author.blogs?.pagination?.total}
      />

      <Section className="scroll-mt-24 pt-10 lg:pt-10" id="blogs">
        <RichHeading
          as="h2"
          heading={`Articles By ${emphasizeLastWord(author.name)}`}
          className="mb-6.5 text-[22px] leading-[1.25] tracking-[-0.02em]"
          emphasisClassName="font-normal text-olive"
        />

        <BlogPostsPanel
          identifier={slug}
          initialPosts={author.blogs?.data || []}
          initialPagination={author.blogs?.pagination}
          fetchAction={fetchAuthorPosts}
          categories={categories}
          paginationLabel="Author articles pagination"
          variant="author"
        />
      </Section>
    </>
  );
}
