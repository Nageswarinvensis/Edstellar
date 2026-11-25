import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import AuthorHero from "@/components/sections/blog/author/author-hero";
import BlogPostsPanel from "@/components/sections/blog/common/blog-posts-panel";
import { SOCIAL_LINKS } from "@/components/sections/blog/common/social-icon";
import { fetchAuthorPosts } from "@/lib/actions/blog-author";
import { splitAuthorName } from "@/components/sections/blog/author/split-author-name";

/** The CMS sends these flags as strings ("True" / "False"), so a plain
 * truthiness check would treat "False" as true. */
const isTrue = (value) => value === true || String(value).toLowerCase() === "true";

/** "Subbaiah M U" → "Subbaiah <span>M U</span>" for `RichHeading` — the
 * same words the author hero emphasizes (`splitAuthorName`). */
function emphasizeSurname(name) {
  const { lead, accent } = splitAuthorName(name);
  return accent ? `${lead} <span>${accent}</span>` : lead;
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
        tags={meta.author_tags}
      />

      <Section className="scroll-mt-24" id="blogs">
        <RichHeading
          as="h2"
          heading={`Articles By ${emphasizeSurname(author.name)}`}
          className="mb-6.5"
          emphasisClassName="font-normal text-olive"
        />

        <BlogPostsPanel
          identifier={slug}
          initialPosts={author.blogs?.data || []}
          initialPagination={author.blogs?.pagination}
          fetchAction={fetchAuthorPosts}
          allPostsInHtml
          categories={categories}
          paginationLabel="Author articles pagination"
          variant="author"
        />
      </Section>
    </>
  );
}
