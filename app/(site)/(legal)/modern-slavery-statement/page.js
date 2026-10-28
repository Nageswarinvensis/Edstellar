import { notFound } from "next/navigation";

import { getModernSlaveryPage } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import LegalPage, { legalTitle } from "@/components/templates/legal-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

const PATH = "/modern-slavery-statement";

export async function generateMetadata() {
  const page = await getModernSlaveryPage();
  if (!page) return {};
  const { seo } = page;

  return buildMetadata({
    title: legalTitle(seo),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/** Modern Slavery Statement — the shared legal template with the CMS page
 * `site-pages/modern-slavery-statement`. */
export default async function ModernSlaveryStatementPage() {
  const page = await getModernSlaveryPage();
  if (!page) notFound();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/modern-slavery-statement`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": legalTitle(page.seo),
        ...(page.seo?.Meta_description && { "description": page.seo?.Meta_description }),
        "inLanguage": "en-US"
      }} />
      <LegalPage page={page} path={PATH} />
    </>
  );
}
