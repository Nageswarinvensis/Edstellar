import { getClientsPage } from "@/lib/content/clients";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import ClientsPage from "@/components/templates/clients-page";

export const revalidate = 3600;

export function generateMetadata() {
  const { seo } = getClientsPage();
  return buildMetadata(seo);
}

/**
 * Clients (`/clients`) — local content (`content/company/clients.js`), so the
 * page is fully static (SSG).
 *
 * Design: `Edstellar-New-Lanch SETUP/clients 3.html`.
 */
export default function ClientsRoute() {
  const page = getClientsPage();

  return (
    <>
      <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <ClientsPage page={page} />
    </>
  );
}
