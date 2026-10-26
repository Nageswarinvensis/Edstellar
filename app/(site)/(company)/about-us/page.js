import { getAboutUsPage } from "@/lib/content/about-us";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import AboutUsPage from "@/components/templates/about-us-page";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getAboutUsPage();
  // The SEO title is "About Edstellar" exactly — the root layout's
  // `%s | Edstellar` template would repeat the brand, so it is bypassed.
  return { ...buildMetadata(seo), title: { absolute: seo.title } };
}

/**
 * About Us — local content (`content/company/about-us.js`), so fully
 * static.
 *
 * Design: `Edstellar-New-Lanch SETUP/about-us 59.html`.
 */
export default function AboutUsRoute() {
  const page = getAboutUsPage();

  return (
    <>
      {/* <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items}
      /> */}
      <AboutUsPage page={page} />
    </>
  );
}
