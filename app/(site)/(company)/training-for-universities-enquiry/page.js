import { getUniversityEnquiryPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import ProgramEnquiryPage from "@/components/templates/program-enquiry-page";

export const revalidate = 3600;

export function generateMetadata() {
  const { seo } = getUniversityEnquiryPage();
  return buildMetadata(seo);
}

/**
 * Training for University Enquiry — university program links land here with
 * `?university-program={slug}`. Local JSON
 * (`content/company/university-enquiry.json`); its middle breadcrumb links
 * to the sector's main page.
 */
export default function UniversityEnquiryPage() {
  return <ProgramEnquiryPage page={getUniversityEnquiryPage()} queryParam="university-program" />;
}
