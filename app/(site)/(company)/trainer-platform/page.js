import { getTrainerPlatformPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import TrainerPlatformPage from "@/components/templates/trainer-platform-page";

export function generateMetadata() {
  const { seo } = getTrainerPlatformPage();
  return buildMetadata(seo);
}

/**
 * Join as a Trainer — a static page built from local JSON
 * (`content/company/trainer-platform.json`, via `lib/content/company.js`).
 *
 * Design: `Join as a Trainer.html`.
 */
export default function TrainerPlatformRoute() {
  const page = getTrainerPlatformPage();

  return (
    <>
      <SchemaOrg
        webpage={{
          name: page.seo.title,
          description: page.seo.description,
          path: page.seo.path,
        }}
        breadcrumbs={page.breadcrumbs}
      />

      <TrainerPlatformPage page={page} />
    </>
  );
}
