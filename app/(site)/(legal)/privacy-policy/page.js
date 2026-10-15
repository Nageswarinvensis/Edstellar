import { getPrivacyPage } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import LegalPage from "@/components/templates/legal-page";

export function generateMetadata() {
  return buildMetadata(getPrivacyPage().seo);
}

/** Privacy Policy — the shared legal template with `content/legal/privacy-policy.json`. */
export default function PrivacyPolicyPage() {
  return <LegalPage page={getPrivacyPage()} />;
}
