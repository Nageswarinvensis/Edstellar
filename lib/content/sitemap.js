import "server-only";

import { cache } from "react";

import { getBlogPost } from "@/lib/content/blog";
import { getAllCoursePaths } from "@/lib/content/courses";
import { getDomainSlugs } from "@/lib/content/domains";
import { getIndustrySlugs } from "@/lib/content/industries";
import { getVendorSlugs } from "@/lib/content/vendors";
import { getSitemapIndex, getTrainingDomains, indexTitle } from "@/lib/content/training-catalog";
import { getCaseStudies } from "@/lib/content/case-studies";

/**
 * The HTML sitemap page (`/sitemap`). The link set comes from the CMS's
 * `/api/v2/sitemap` (every published domain, course, site page and blog
 * slug), plus the static pages this repo owns that the CMS does not list.
 *
 * Every entry in that endpoint carries its `name`/`title`, so labels come
 * straight from it (via `indexTitle`); only case-study titles, which the CMS
 * does not list, come from local content.
 */

/** Site-page slugs whose public URL differs from the slug, and slugs with
 * no page on this site at all (`null`), which stay out of the sitemap. */
const SITE_PAGE_PATHS = {
  "book-a-demo": null,
};

/** Each site page's CMS title by slug — a child's group heading is its
 * parent's title. */
const sitePageTitles = (index) =>
  new Map((index?.site_pages ?? []).map((page) => [page.slug, indexTitle(page, page.slug.split("/").pop())]));

/** Static pages this repo owns that the CMS sitemap does not list. */
const STATIC_LINKS = [
  { label: "Corporate Training", href: "/corporate-training" },
  { label: "Corporate Training Catalog", href: "/corporate-training-catalog" },
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Client Experience", href: "/exceptional-customer-experience" },
  { label: "Request for Proposal", href: "/request-for-proposal" },
  { label: "Leadership Retreats", href: "/leadership-retreats" },
  { label: "Corporate Training Pricing", href: "/corporate-training-pricing" },
  { label: "Who We Serve", href: "/who-we-serve" },
  { label: "Training for Universities", href: "/training-for-universities" },
  { label: "Government Employees Training Courses", href: "/government-employees-training-courses" },
  { label: "Partner Program", href: "/partner-program" },
  { label: "Blog", href: "/blog" },
];

/** Local static pages the HTML sitemap leaves out (it lists case studies,
 * and itself, its own way) but the internal page index on the home page
 * still shows. */
const INDEX_ONLY_LINKS = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Training for Universities Enquiry", href: "/training-for-universities-enquiry" },
  { label: "Training for Government Enquiry", href: "/training-for-government-enquiry" },
  { label: "Resources: Articles", href: "/resources/articles" },
  { label: "Resources: Brochures", href: "/resources/brochures" },
  { label: "Resources: Templates", href: "/resources/templates" },
  { label: "Resources: Tools", href: "/resources/tools" },
  { label: "HTML Sitemap", href: "/sitemap" },
];

const byLabel = (a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" });

/**
 * The page's groups, each `{ id, heading, links }` or, for grouped lists,
 * `{ id, heading, groups: [{ heading, href, links }] }`. `null` when the CMS
 * sitemap is unavailable — the route turns that into a 404 rather than an
 * empty page.
 */
export const getSitemapPage = cache(async () => {
  const index = await getSitemapIndex();
  if (!index) return null;

  const domains = await getTrainingDomains();
  const titleOf = sitePageTitles(index);

  // Training categories — one link per domain.
  const categories = domains.map((domain) => ({ label: `${domain.name} Training`, href: domain.href })).sort(byLabel);

  // Courses, grouped under their domain.
  const courseGroups = domains
    .filter((domain) => domain.courses.length)
    .map((domain) => ({ heading: domain.name, href: domain.href, links: domain.courses }));

  // Site pages — a parent with children becomes a group; the rest are
  // quick links alongside this repo's own static pages.
  const sitePages = (index.site_pages ?? [])
    .map(({ slug }) => ({
      slug,
      href: slug in SITE_PAGE_PATHS ? SITE_PAGE_PATHS[slug] : `/${slug}`,
      label: titleOf.get(slug),
    }))
    .filter((page) => page.href);
  const parents = new Set(sitePages.filter((p) => p.slug.includes("/")).map((p) => p.slug.split("/")[0]));
  const serviceGroups = [...parents]
    .map((parent) => ({
      heading: titleOf.get(parent) ?? indexTitle({ slug: parent }),
      href: `/${parent}`,
      links: sitePages
        .filter((p) => p.slug.startsWith(`${parent}/`))
        .map(({ label, href }) => ({ label, href }))
        .sort(byLabel),
    }))
    .sort((a, b) => a.heading.localeCompare(b.heading));

  const seen = new Set([...parents].map((parent) => `/${parent}`));
  const quickLinks = [
    ...sitePages.filter((p) => !p.slug.includes("/") && !parents.has(p.slug)).map(({ label, href }) => ({ label, href })),
    ...STATIC_LINKS,
  ]
    .filter((link) => !seen.has(link.href) && seen.add(link.href))
    .sort(byLabel);

  const blog = (index.blogs ?? [])
    .map((post) => ({ label: indexTitle(post), href: `/blog/${post.slug}` }))
    .sort(byLabel);

  const caseStudies = getCaseStudies().map((study) => ({ label: study.title, href: `/case-study/${study.slug}` }));

  return {
    sections: [
      { id: "categories", heading: "Training Categories", links: categories },
      { id: "courses", heading: "Courses", groups: courseGroups },
      { id: "services", heading: "Consulting & Services", groups: serviceGroups },
      { id: "blog", heading: "Blog", links: blog },
      { id: "case-studies", heading: "Case Studies", links: caseStudies },
      { id: "quick-links", heading: "Quick Links", links: quickLinks },
    ].filter((section) => section.links?.length || section.groups?.length),
  };
});

const byHref = (a, b) => a.href.localeCompare(b.href);

/** The home page's card groups, in its order: a page joins the first group
 * whose prefixes match its URL (a prefix matches the path itself and
 * anything under it). */
const INDEX_GROUPS = [
  { kicker: "Corporate Training", title: "Corporate training & catalog", prefixes: ["/corporate-training"] },
  { kicker: "Trainers", title: "Trainers & trainer platform", prefixes: ["/trainer"] },
  { kicker: "Assessments", title: "Talent assessment services", prefixes: ["/talent-assessment-services"] },
  { kicker: "Consulting", title: "Learning & development consulting", prefixes: ["/learning-development-consulting-services", "/training-needs-analysis-solutions"] },
  { kicker: "Consulting", title: "Organizational development consulting", prefixes: ["/organizational-development-consulting"] },
  { kicker: "Consulting", title: "Managed learning & retreats", prefixes: ["/managed-learning-services", "/leadership-retreats"] },
  { kicker: "Coaching", title: "Coaching services", prefixes: ["/coaching-solutions"] },
  { kicker: "Who We Serve", title: "Sectors & enquiries", prefixes: ["/who-we-serve", "/training-for-universities", "/government-employees-training-courses", "/training-for-government-enquiry"] },
  { kicker: "Resources", title: "Resources, templates & case studies", prefixes: ["/resources", "/learning-development-resources", "/learning-development-templates", "/templates", "/case-studies", "/case-study", "/success-stories"] },
  { kicker: "Blog", title: "Blog & guest authors", prefixes: ["/blog", "/become-a-guest-author"] },
  { kicker: "Legal", title: "Privacy, terms & statements", prefixes: ["/privacy-policy", "/terms-conditions", "/modern-slavery-statement"] },
  { kicker: "Company", title: "About, contact & enquiry", prefixes: ["/"] },
];

const matches = (href, prefix) => prefix === "/" || href === prefix || href.startsWith(`${prefix}/`) || href.startsWith(`${prefix}-`);

/** Pages → the non-empty `INDEX_GROUPS`, each `{ kicker, title, links }`. */
function toGroups(pages) {
  const groups = INDEX_GROUPS.map(({ kicker, title }) => ({ kicker, title, links: [] }));
  for (const page of pages) {
    const at = INDEX_GROUPS.findIndex((group) => group.prefixes.some((prefix) => matches(page.href, prefix)));
    groups[at].links.push(page);
  }
  return groups.filter((group) => group.links.length);
}

/** Detail pages with no index to pick an example from: trainer profiles
 * have no list endpoint, thank-you pages are not in the CMS sitemap. */
const FIXED_EXAMPLES = [
  { kind: "Trainer profile", href: "/trainer/amol-pune-india" },
  { kind: "Thank-you page", href: "/thank-you/category" },
];

/** One real detail page per dynamic route, as `{ kind, href }`, in the home
 * page's card groups. CMS-backed examples (blog, template) are skipped when
 * the CMS sitemap is unavailable. */
async function detailExamples(index) {
  const [domains, industries, vendors, coursePaths] = await Promise.all([
    getDomainSlugs(),
    getIndustrySlugs(),
    getVendorSlugs(),
    getAllCoursePaths(),
  ]);
  const blogSlug = index?.blogs?.[0]?.slug;
  const post = blogSlug ? await getBlogPost(blogSlug).catch(() => null) : null;
  const templateSlug = (index?.site_pages ?? []).find(({ slug }) => slug.startsWith("templates/"))?.slug;
  const course = coursePaths[0];
  const caseStudy = getCaseStudies()[0];

  const examples = [
    domains[0] && { kind: "Domain", href: `/corporate-training/${domains[0]}` },
    industries[0] && { kind: "Industry", href: `/corporate-training/${industries[0]}` },
    vendors[0] && { kind: "Vendor", href: `/corporate-training/${vendors[0]}` },
    course && { kind: "Course", href: `/corporate-training/${course.domain}/${course.course}` },
    post && { kind: "Blog post", href: `/blog/${post.blog.slug}` },
    post?.author?.slug && { kind: "Blog author", href: `/blog/author/${post.author.slug}` },
    post?.category?.slug && { kind: "Blog category", href: `/blog/category/${post.category.slug}` },
    templateSlug && { kind: "Template", href: `/${templateSlug}` },
    caseStudy && { kind: "Case study", href: `/case-study/${caseStudy.slug}` },
    ...FIXED_EXAMPLES,
  ].filter(Boolean);

  return { count: examples.length, groups: toGroups(examples.map((link) => ({ ...link, label: link.kind }))) };
}

/**
 * The internal page index on the home page: every static page, split by
 * where its content lives, then into the home page's card groups, plus one
 * example of each detail page. `cms` is every published CMS site page (from
 * the CMS sitemap, so a new one appears without a code change); `local` is
 * the pages whose content is in this repo. Each is `{ count, groups }`.
 *
 * An internal aid must not take the home page down, so an unreachable CMS
 * gives an empty `cms` list and `cmsUnavailable: true` instead of throwing.
 */
export const getPageIndex = cache(async () => {
  const index = await getSitemapIndex().catch(() => null);

  const titleOf = sitePageTitles(index);
  const cms = (index?.site_pages ?? [])
    .map(({ slug }) => ({
      href: slug in SITE_PAGE_PATHS ? SITE_PAGE_PATHS[slug] : `/${slug}`,
      // "Parent › Child", each segment its own page's title.
      label: slug
        .split("/")
        .map((_, at, parts) => {
          const path = parts.slice(0, at + 1).join("/");
          return titleOf.get(path) ?? indexTitle({ slug: parts[at] });
        })
        .join(" › "),
    }))
    .filter((page) => page.href)
    .sort(byHref);

  const cmsHrefs = new Set(cms.map((page) => page.href));
  const local = [...STATIC_LINKS, ...INDEX_ONLY_LINKS].filter((page) => !cmsHrefs.has(page.href)).sort(byHref);

  return {
    cmsUnavailable: !index,
    cms: { count: cms.length, groups: toGroups(cms) },
    local: { count: local.length, groups: toGroups(local) },
    details: await detailExamples(index),
  };
});
