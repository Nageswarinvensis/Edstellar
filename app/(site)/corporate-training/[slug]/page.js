import { notFound } from "next/navigation";

import { resolveTrainingSlug } from "@/lib/content/taxonomy";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import DomainPage from "@/components/templates/training/domain-page";

/** Same fix as the blog author page: the CMS's `meta_title` already ends in
 * "| Edstellar" — the root layout's title template (`%s | Edstellar`) would
 * otherwise double it up. */
function stripSiteSuffix(title) {
  return title?.replace(new RegExp(`\\s*\\|\\s*${SITE.name}\\s*$`, "i"), "");
}

/**
 * `/corporate-training/{slug}` — industry, vendor, or domain.
 *
 * One route serves all three because route groups create no separate URL
 * namespace, so two `[slug]` folders at this depth is a build error. The type
 * is resolved by `lib/content/taxonomy.js` and the design is chosen by picking
 * a template (TASTE.md §1.2).
 */

export const revalidate = 300;

/**
 * One template per entity type. Industry and vendor content is not modeled
 * yet, so those types resolve to nothing and 404 — adding one is a line here
 * plus a registry in `lib/content/`, with no change to this route.
 */
const TEMPLATES = {
  domain: DomainPage,
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = await resolveTrainingSlug(slug);

  if (!entry) return {};

  return buildMetadata({
    title: stripSiteSuffix(entry.data.seo.meta_title),
    description: entry.data.seo.Meta_description,
    path: `/corporate-training/${slug}`,
    image: entry.data.seo.og_image_url || entry.data.banner_image,
  });
}

export default async function TrainingPage({ params }) {
  const { slug } = await params;
  const entry = await resolveTrainingSlug(slug);

  if (!entry) notFound();

  const Template = TEMPLATES[entry.type];

  if (!Template) notFound();

  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/corporate-training/${slug}`;
  const rawTitle = entry.data.seo?.meta_title ?? entry.data.name;
  const pageTitle = stripSiteSuffix(rawTitle) ?? rawTitle;
  const pageDescription = entry.data.seo?.Meta_description;
  const breadcrumbs = entry.data.breadcrumbs ?? [];
  const faqItems = entry.data.faqs?.items ?? [];

  return (
    <>
      {/* 1 — WebSite + WebPage */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${BASE}/#website`,
            "url": BASE,
            "name": "Edstellar"
          },
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            "url": pageUrl,
            "name": pageTitle,
            ...(pageDescription && { "description": pageDescription }),
            "inLanguage": "en-US",
            "isPartOf": { "@id": `${BASE}/#website` },
            "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
            ...(faqItems.length && { "hasPart": { "@id": `${pageUrl}#faq` } })
          }
        ]
      }} />

      {/* 2 — BreadcrumbList + FAQPage */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          ...(breadcrumbs.length ? [{
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": breadcrumbs.map((item, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": item.label,
              "item": item.href?.startsWith("http") ? item.href : `${BASE}${item.href}`
            }))
          }] : []),
          ...(faqItems.length ? [{
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            "isPartOf": { "@id": `${pageUrl}#webpage` },
            "inLanguage": "en-US",
            "mainEntity": faqItems.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          }] : [])
        ]
      }} />

      <Template domain={entry.data} />
    </>
  );
}
