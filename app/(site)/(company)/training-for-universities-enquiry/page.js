import { getUniversityEnquiryPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import ProgramEnquiryPage from "@/components/templates/program-enquiry-page";

export function generateMetadata() {
  const { seo } = getUniversityEnquiryPage();
  return buildMetadata(seo);
}

/**
 * Training for University Enquiry — university program links land here with
 * `?university-program={slug}`. Local JSON
 * (`content/company/university-enquiry.json`); the "Training for University"
 * breadcrumb is plain text until the universities page exists.
 */
export default function UniversityEnquiryPage() {
  return <ProgramEnquiryPage page={getUniversityEnquiryPage()} queryParam="university-program" />;
}
