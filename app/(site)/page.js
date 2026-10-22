import { getHomePage } from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import HomePage from "@/components/templates/home-page";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getHomePage();
  return buildMetadata(seo);
}

/**
 * Home (`/`) — local content (`content/home.js`), rendered as ISR (§2.2).
 *
 * Design: `Edstellar-New-Lanch SETUP/edstellar-homepage 51.html`.
 */
export default function HomeRoute() {
  const page = getHomePage();

  return (
    <>
      <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
      />
      <HomePage page={page} />
    </>
  );
}
