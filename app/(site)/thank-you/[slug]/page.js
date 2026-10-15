import { notFound } from "next/navigation";

import { getThankYouPage, getThankYouSlugs } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import ThankYou from "@/components/sections/company/thank-you";

export function generateStaticParams() {
  return getThankYouSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getThankYouPage(slug);
  if (!page) return {};

  return buildMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: `/thank-you/${slug}`,
    noIndex: true,
  });
}

/**
 * Thank-you page per form (`/thank-you/{slug}`), inside the site shell
 * (header and footer). Copy comes from the CMS site page `thank-you/{slug}`;
 * SEO, the CTA and the "Reach Us" links are local
 * (`content/company/thank-you.json`). A slug the CMS has no published page
 * for is a real 404.
 *
 * Design: edstellar.com/thank-you/category.
 */
export default async function ThankYouPage({ params }) {
  const { slug } = await params;
  const page = await getThankYouPage(slug);
  if (!page) notFound();

  return <ThankYou data={page} />;
}
