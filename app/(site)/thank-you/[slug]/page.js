import { notFound } from "next/navigation";

import { getThankYouPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import ThankYou from "@/components/sections/company/thank-you";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getThankYouPage(slug);
  if (!page) return {};

  return buildMetadata({
    title: "Thank You",
    description:
      "Thank you for submitting the form. Your response has been received successfully, and our team will get back to you shortly.",
    path: `/thank-you/${slug}`,
    noIndex: true,
  });
}

/**
 * Thank-you page per form (`/thank-you/{slug}`), inside the site shell
 * (header and footer). Copy comes from the CMS site page `thank-you/{slug}`;
 * the way back and the "Reach Us" links are fixed in the section. A slug the
 * CMS has no published page for is a real 404.
 *
 * Design: edstellar.com/thank-you/category.
 */
export default async function ThankYouPage({ params }) {
  const { slug } = await params;
  const page = await getThankYouPage(slug);
  if (!page) notFound();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/thank-you/${slug}`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": "Thank You",
        "description": "Thank you for submitting the form. Your response has been received successfully, and our team will get back to you shortly.",
        "inLanguage": "en-US"
      }} />
      <ThankYou data={page} />
    </>
  );
}
