import { getLeadershipRetreatsPage } from "@/lib/content/leadership-retreats";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import LeadershipRetreatsPage from "@/components/templates/leadership-retreats-page";

export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata(getLeadershipRetreatsPage().seo);
}

/**
 * Leadership Retreats — local content
 * (`content/leadership-retreats/index.js`), so fully static.
 *
 * Design: `Edstellar-New-Lanch SETUP/leadership-retreats 8.html`.
 */
export default function LeadershipRetreatsRoute() {
  const page = getLeadershipRetreatsPage();

  return (
    <>
      {/* <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items}
      /> */}
      <LeadershipRetreatsPage page={page} />
    </>
  );
}
