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
 * (`content/company/government-enquiry.json`); the "Training for Government"
 * breadcrumb is plain text until the government page exists.
 */
export default function GovernmentEnquiryPage() {
  return <ProgramEnquiryPage page={getGovernmentEnquiryPage()} queryParam="government-program" />;
}
