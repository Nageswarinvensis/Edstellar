import { getGovernmentEnquiryPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import ProgramEnquiryPage from "@/components/templates/program-enquiry-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getGovernmentEnquiryPage();
  // An enquiry form, not a landing page: kept out of search and the sitemap.
  return buildMetadata({ ...seo, noIndex: true });
}

/**
 * Training for Government Enquiry — government program links land here with
 * `?government-program={slug}`. Local JSON
 * (`content/company/government-enquiry.json`); its middle breadcrumb links
 * to the sector's main page.
 */
export default function GovernmentEnquiryPage() {
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/training-for-government-enquiry`;
  const { seo } = getGovernmentEnquiryPage();

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": seo.title,
        ...(seo.description && { "description": seo.description }),
        "inLanguage": "en-US"
      }} />
      <ProgramEnquiryPage page={getGovernmentEnquiryPage()} queryParam="government-program" thankYou="training-for-government" />
    </>
  );
}
