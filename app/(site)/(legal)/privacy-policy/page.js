import { notFound } from "next/navigation";

import { getPrivacyPage } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import LegalPage, { legalTitle } from "@/components/templates/legal-page";

export const revalidate = 300;

const PATH = "/privacy-policy";

export async function generateMetadata() {
  const page = await getPrivacyPage();
  if (!page) return {};
  const { seo } = page;

  return buildMetadata({
    title: legalTitle(seo),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/** Privacy Policy — the shared legal template with the CMS page
 * `site-pages/privacy-policy`. */
export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPage();
  if (!page) notFound();

  return <LegalPage page={page} path={PATH} />;
}
