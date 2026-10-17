import "server-only";

import { cache } from "react";

import { getAllBlogPosts } from "@/lib/content/blog";
import { getSitemapIndex, getTrainingDomains, labelFromSlug } from "@/lib/content/training-catalog";
import { getCaseStudies } from "@/lib/content/case-studies";
import { decodeEntities } from "@/lib/decode-entities";

/**
 * The HTML sitemap page (`/sitemap`). The link set comes from the CMS's
 * `/api/v2/sitemap` (every published domain, course, site page and blog
 * slug), plus the static pages this repo owns that the CMS does not list.
 *
 * That endpoint sends slugs only. Labels therefore come from the best source
 * available per group: domain names from each domain record, blog titles
 * from the blog listing, case-study titles from local content — and, for
 * courses and site pages, which have no title source short of one request
 * each (2,000+), from the slug itself via `labelFromSlug`.
 */

/** Site-page slugs whose public URL differs from the slug, and slugs with
 * no page on this site at all (`null`), which stay out of the sitemap. */
const SITE_PAGE_PATHS = {
  "enquiry-form": "/enquiry-now",
  "book-a-demo": null,
};

/** Site-page slug segments whose slug-built label reads wrong. */
const SITE_PAGE_LABELS = {
  "learning-development-consulting-services": "Learning & Development Consulting Services",
  "learning-development-resources": "Learning & Development Resources",
  "learning-development-templates": "Learning & Development Templates",
  "diversity-equity-inclusion": "Diversity, Equity & Inclusion",
  "360-degree-feedback": "360-Degree Feedback",
  "terms-conditions": "Terms & Conditions",
  "enquiry-form": "Enquire Now",
};
const pageLabel = (segment) => SITE_PAGE_LABELS[segment] ?? labelFromSlug(segment);

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
  { label: "Training Management Software", href: "/training-management-software" },
  { label: "Who We Serve", href: "/who-we-serve" },
  { label: "Training for Universities", href: "/training-for-universities" },
  { label: "Government Employees Training Courses", href: "/government-employees-training-courses" },
  { label: "Partner Program", href: "/partner-program" },
  { label: "Trainers", href: "/trainer" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
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

  const [domains, blogPosts] = await Promise.all([getTrainingDomains(), getAllBlogPosts().catch(() => [])]);

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
      label: pageLabel(slug.split("/").pop()),
    }))
    .filter((page) => page.href);
  const parents = new Set(sitePages.filter((p) => p.slug.includes("/")).map((p) => p.slug.split("/")[0]));
  const serviceGroups = [...parents]
    .map((parent) => ({
      heading: pageLabel(parent),
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

  // Blog — real titles from the listing where it has the post, else the slug.
  const titleOf = new Map(blogPosts.map((post) => [post.slug, post.title]));
  const blog = (index.blogs ?? [])
    .map(({ slug }) => ({
      label: decodeEntities(titleOf.get(slug) || labelFromSlug(slug)),
      href: `/blog/${slug}`,
    }))
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
