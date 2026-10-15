import { getTermsPage } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import LegalPage from "@/components/templates/legal-page";

export function generateMetadata() {
  return buildMetadata(getTermsPage().seo);
}

/** Terms and Conditions — the shared legal template with `content/legal/terms-and-conditions.json`. */
export default function TermsAndConditionsPage() {
  return <LegalPage page={getTermsPage()} />;
}
