import { notFound } from "next/navigation";

import { getTemplate } from "@/lib/content/templates";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import JsonLd from "@/components/seo/json-ld";
import { schemaNodes } from "@/lib/seo/prune";
import TemplateDetailPage from "@/components/templates/template-detail-page";
import TemplateToolPage from "@/components/templates/template-tool-page";

export const revalidate = 300;

const pathOf = (slug) => `/templates/${slug}`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const template = await getTemplate(slug);
  if (!template) return {};

  // The SEO title carries its own suffix ("| No Signup Required"), so the
  // root layout's "| Edstellar" template is bypassed.
  return {
    ...buildMetadata({ ...template.seo, path: pathOf(slug), image: template.hero?.image?.src }),
    title: { absolute: template.seo.title },
  };
}

/**
 * An L&D template / free tool page, at the live site's own URL
 * (`/templates/{slug}`). The CMS templates hub (`/learning-development-templates`)
 * links its cards here; `/resources/templates/{slug}` redirects here
 * (`next.config.mjs`). With `hero.tool.direct_tool` set in the CMS, the URL
 * opens the tool itself instead of the landing page.
 */
export default async function TemplateRoute({ params }) {
  const { slug } = await params;
  const template = await getTemplate(slug);
  if (!template) notFound();

  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/templates/${slug}`;
  const breadcrumbs = template.breadcrumbs ?? [
    { label: "Home", href: "/" },
    { label: "L&D Templates", href: "/learning-development-templates" },
    { label: template.title, href: null },
  ];

  // A direct-tool URL renders the tool alone, so the CMS schema (HowTo steps,
  // FAQs) would describe a landing page the visitor never sees — it is only
  // emitted on the landing page. There, `WebApplication.subjectOf` points at
  // `#faq`; with no FAQs the reference is dropped rather than left dangling.
  const faqItems = template.directTool ? [] : (template.faqs?.items ?? []);
  const faqId = `${pageUrl}#faq`;
  const nodes = (template.directTool ? [] : schemaNodes(template.schema)).map((node) =>
    faqItems.length || !Array.isArray(node.subjectOf)
      ? node
      : { ...node, subjectOf: node.subjectOf.filter((ref) => ref?.["@id"] !== faqId) },
  );

  return (
    <>
      {/* WebPage */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": template.seo.title,
        ...(template.seo.description && { "description": template.seo.description }),
        "inLanguage": "en-US"
      }} />

      {/* BreadcrumbList */}
      {breadcrumbs?.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": breadcrumbs.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.label,
            "item": item.href === "/" ? BASE : item.href?.startsWith("http") ? item.href : item.href ? `${BASE}${item.href}` : pageUrl
          }))
        }} />
      )}

      {/* FAQPage */}
      {faqItems.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${pageUrl}#faq`,
          "mainEntity": faqItems.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
          }))
        }} />
      )}

      {/* <SchemaOrg
        webpage={{ name: template.title, description: template.seo.description, path: pathOf(slug) }}
        breadcrumbs={breadcrumbs}
        faqs={template.faqs?.items}
      /> */}
      {/* CMS schema nodes (Service, HowTo, etc.) — each emitted separately */}
      {nodes.map((node, i) => (
        <JsonLd key={i} data={{ "@context": "https://schema.org", ...node }} />
      ))}
      {template.directTool ? (
        <TemplateToolPage template={template} />
      ) : (
        <TemplateDetailPage template={template} breadcrumbs={breadcrumbs} />
      )}
    </>
  );
}
