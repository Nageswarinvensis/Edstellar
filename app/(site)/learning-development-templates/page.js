import { notFound } from "next/navigation";

import { getTemplatesPage } from "@/lib/content/resources";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import TemplatesHubPage from "@/components/templates/templates-hub-page";

export const revalidate = 3600;

const PATH = "/learning-development-templates";

export async function generateMetadata() {
  const page = await getTemplatesPage();
  if (!page) return {};
  const { seo } = page;

  return buildMetadata({
    title: stripSiteSuffix(seo?.meta_title),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/**
 * Free L&D Tools and Templates — from the CMS site page
 * `learning-development-templates` (see `getTemplatesPage`).
 *
 * Design: `Learning_Development_Templates_Template.html`.
 */
export default async function LearningDevelopmentTemplatesPage() {
  const page = await getTemplatesPage();
  if (!page) notFound();

  return (
    <>
      <SchemaOrg
        webpage={{
          name: stripSiteSuffix(page.seo?.meta_title),
          description: page.seo?.Meta_description,
          path: PATH,
        }}
        breadcrumbs={page.breadcrumbs?.items}
      />

      <TemplatesHubPage page={page} />
    </>
  );
}
