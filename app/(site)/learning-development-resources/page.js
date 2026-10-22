import { notFound } from "next/navigation";

import { getResourcesHub } from "@/lib/content/resources";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import ResourcesHubPage from "@/components/templates/resources-hub-page";

export const revalidate = 300;

const PATH = "/learning-development-resources";

export async function generateMetadata() {
  const page = await getResourcesHub();
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
 * Learning and Development Resources — the free L&D resource hub, from the
 * CMS site page `learning-development-resources` (see `getResourcesHub`).
 * The library's filters and pagination run on the client; the server HTML
 * carries its first page.
 *
 * Design: `Learning_Development_Resources_Template.html`.
 */
export default async function LearningDevelopmentResourcesPage() {
  const page = await getResourcesHub();
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
        faqs={page.faqs?.items?.length ? page.faqs.items : undefined}
      />

      <ResourcesHubPage page={page} />
    </>
  );
}
