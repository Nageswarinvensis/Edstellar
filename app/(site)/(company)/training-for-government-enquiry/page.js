import { getGovernmentEnquiryPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import ProgramEnquiryPage from "@/components/templates/program-enquiry-page";

export function generateMetadata() {
  const { seo } = getGovernmentEnquiryPage();
  return buildMetadata(seo);
}

/**
 * Training for Government Enquiry — government program links land here with
 * `?government-program={slug}`. Local JSON
 * (`content/company/government-enquiry.json`); its middle breadcrumb links
 * to the sector's main page.
 */
export default function GovernmentEnquiryPage() {
  return <ProgramEnquiryPage page={getGovernmentEnquiryPage()} queryParam="government-program" thankYou="training-for-government" />;
}
