import { notFound } from "next/navigation";

import { getThankYouPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import ThankYou from "@/components/sections/company/thank-you";

/** The CMS has no index of its thank-you pages, so none are listed here:
 * each published one renders on its first visit and is then cached (ISR). */
export function generateStaticParams() {
  return [];
}

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

  return <ThankYou data={page} />;
}
