import { getModernSlaveryPage } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import LegalPage from "@/components/templates/legal-page";

export function generateMetadata() {
  return buildMetadata(getModernSlaveryPage().seo);
}

/** Modern Slavery Statement — the shared legal template with `content/legal/modern-slavery-statement.json`. */
export default function ModernSlaveryStatementPage() {
  return <LegalPage page={getModernSlaveryPage()} />;
}
