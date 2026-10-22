import { notFound } from "next/navigation";

import { getTrainerPlatformPage } from "@/lib/content/company";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import TrainerPlatformPage from "@/components/templates/trainer-platform-page";

export const revalidate = 300;

const PATH = "/trainer-platform";

export async function generateMetadata() {
  const page = await getTrainerPlatformPage();
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
 * Join as a Trainer — every section from the CMS site page
 * `trainer-platform`; see `getTrainerPlatformPage`.
 *
 * Design: `Join as a Trainer.html`.
 */
export default async function TrainerPlatformRoute() {
  const page = await getTrainerPlatformPage();
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

      <TrainerPlatformPage page={page} />
    </>
  );
}
