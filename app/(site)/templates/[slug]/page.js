import { notFound } from "next/navigation";

import { getTemplate, getTemplateSlugs } from "@/lib/content/templates";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import TemplateDetailPage from "@/components/templates/template-detail-page";

// Templates come from the CMS (`templates/{slug}` site pages), refreshed
// hourly. Known slugs are prerendered; a template published after the build
// renders on first request, and an unknown slug is a real 404.
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getTemplateSlugs()).map((slug) => ({ slug }));
}

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
 * (`next.config.mjs`).
 */
export default async function TemplateRoute({ params }) {
  const { slug } = await params;
  const template = await getTemplate(slug);
  if (!template) notFound();

  const breadcrumbs = template.breadcrumbs ?? [
    { label: "Home", href: "/" },
    { label: "L&D Templates", href: "/learning-development-templates" },
    { label: template.title, href: null },
  ];

  return (
    <>
      <SchemaOrg
        webpage={{ name: template.title, description: template.seo.description, path: pathOf(slug) }}
        breadcrumbs={breadcrumbs}
        faqs={template.faqs?.items}
      />
      <TemplateDetailPage template={template} breadcrumbs={breadcrumbs} />
    </>
  );
}
