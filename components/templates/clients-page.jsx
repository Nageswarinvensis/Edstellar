import ClientsHero from "@/components/sections/company/clients/clients-hero";
import ClientsGlance from "@/components/sections/company/clients/clients-glance";
import SectionNav from "@/components/common/section-nav";
import ClientsExplorer from "@/components/sections/company/clients/clients-explorer";
import ClientsRegions from "@/components/sections/company/clients/clients-regions";
import ClientsSectors from "@/components/sections/company/clients/clients-sectors";
import ClientsCtaBand from "@/components/sections/company/clients/clients-cta-band";
import ClientsWhy from "@/components/sections/company/clients/clients-why";
import ClientsRelated from "@/components/sections/company/clients/clients-related";
import ClientsFaq from "@/components/sections/company/clients/clients-faq";
import ClientsContact from "@/components/sections/company/clients/clients-contact";

/**
 * `/clients` — the client showcase. Server Component; the only interactive
 * leaf is the explorer (search, sector filter, expandable cards).
 *
 * Design: `Edstellar-New-Lanch SETUP/clients 9.html`.
 */
export default function ClientsPage({ page }) {
  return (
    <>
      <ClientsHero data={page.hero} breadcrumbs={page.breadcrumbs} />
      <ClientsGlance data={page.glance} />
      <SectionNav data={page.section_nav} />
      <ClientsExplorer data={page.explorer} />
      <ClientsRegions data={page.regions} />
      <ClientsSectors data={page.sectors} />
      <ClientsCtaBand data={page.cta_band} />
      <ClientsWhy data={page.why} />
      <ClientsRelated data={page.related} />
      <ClientsFaq data={page.faqs} />
      <ClientsContact data={page.contact} />
    </>
  );
}
