import {
  siteGraphJsonLd,
  webPageJsonLd,
  courseJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
  blogPostingJsonLd,
  personJsonLd,
} from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";

/**
 * Unified schema emitter — one component for every page.
 *
 * Pass only the props relevant to the page; everything else is ignored.
 * Nullish builders are filtered before render so no empty script tags appear.
 *
 * Prop reference
 * ──────────────
 * website      boolean                 Organization + WebSite @graph (root layout only)
 * course       object                  { name, description, path, image, audience }
 * breadcrumbs  { label, href }[]       Same array the visible breadcrumb rail renders
 * faqs         { question, answer }[]  Same .items the visible FAQ section renders
 * service      object                  { name, description, path, serviceType? }
 * webpage      object                  { name, description, path }
 * blogPosting  object                  { title, description, path, image, datePublished, dateModified, authorName? }
 * person       object                  { name, jobTitle, image, path, city?, country?, languages? }
 *
 * Usage examples
 * ──────────────
 * Root layout:    <SchemaOrg website />
 * Course page:    <SchemaOrg course={c} breadcrumbs={b} faqs={f} />
 * Category page:  <SchemaOrg service={s} breadcrumbs={b} faqs={f} />
 * Catalog page:   <SchemaOrg webpage={w} />
 * Blog post:      <SchemaOrg blogPosting={p} breadcrumbs={b} />
 * Trainer page:   <SchemaOrg person={p} breadcrumbs={b} />
 */
export default function SchemaOrg({
  website,
  course,
  breadcrumbs,
  faqs,
  service,
  webpage,
  blogPosting,
  person,
}) {
  const schemas = [
    website ? siteGraphJsonLd() : null,
    webpage ? webPageJsonLd(webpage) : null,
    course ? courseJsonLd(course) : null,
    service ? serviceJsonLd(service) : null,
    blogPosting ? blogPostingJsonLd(blogPosting) : null,
    person ? personJsonLd(person) : null,
    breadcrumbs ? breadcrumbJsonLd(breadcrumbs) : null,
    faqs ? faqJsonLd(faqs) : null,
  ];

  return <JsonLd data={schemas} />;
}
