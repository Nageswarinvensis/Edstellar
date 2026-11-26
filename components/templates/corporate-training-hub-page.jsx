import RetreatForm from "@/components/forms/retreat-form";
import { getHomePage } from "@/lib/content/home";
import {
  HubApproach,
  HubClients,
  HubDefinition,
  HubDelivery,
  HubEffectiveness,
  HubFaqs,
  HubHero,
  HubOrganization,
  HubPricing,
  HubPrograms,
  HubReasons,
  HubServices,
  HubSystem,
  HubTopPrograms,
  HubTrainers,
} from "@/components/sections/corporate_training_hub/hub-sections";

/** `/corporate-training` — the hub, top to bottom as in the design. `domains`
 * is the CMS sitemap API's domain list, as `{ label, href }`. */
export default function CorporateTrainingHubPage({ page, domains }) {
  // Through the loader, not the raw JSON: `clients.logos` there are logo ids
  // that `getHomePage()` resolves to `{ name, src, alt }`.
  const homeData = getHomePage();
  return (
    <>
      <HubHero data={page.hero} proof={page.proof} breadcrumbs={page.breadcrumbs} />
      <HubClients data={page.clients} homeClients={homeData.clients} />
      <HubDefinition data={page.definition} />
      <HubServices data={page.services} />
      <HubTopPrograms data={page.top_programs} />
      <HubPrograms data={page.programs} domains={domains} />
      <HubOrganization data={page.organization} />
      <HubSystem data={page.system} />
      <HubApproach data={page.approach} />
      <HubDelivery data={page.delivery} />
      <HubTrainers data={page.trainers} experts={homeData.why?.experts} />
      <HubEffectiveness data={page.effectiveness} />
      <HubPricing data={page.pricing} />
      <HubReasons data={page.reasons} />
      <HubFaqs data={page.faqs} />
      <RetreatForm data={page.form} accent="lime" split thankYou="corporate-training" />
    </>
  );
}
