import {
  HubApproach,
  HubDelivery,
  HubFaqs,
  HubHero,
  HubOrganization,
  HubPrograms,
  HubReasons,
  HubServices,
  HubSystem,
} from "@/components/sections/corporate_training_hub/hub-sections";

/** `/corporate-training` — the hub, top to bottom as in the design. `domains`
 * is the CMS sitemap API's domain list, as `{ label, href }`. */
export default function CorporateTrainingHubPage({ page, domains }) {
  return (
    <>
      <HubHero data={page.hero} proof={page.proof} breadcrumbs={page.breadcrumbs} />
      <HubServices data={page.services} />
      <HubPrograms data={page.programs} domains={domains} />
      <HubOrganization data={page.organization} />
      <HubSystem data={page.system} />
      <HubApproach data={page.approach} />
      <HubDelivery data={page.delivery} />
      <HubReasons data={page.reasons} />
      <HubFaqs data={page.faqs} />
    </>
  );
}
