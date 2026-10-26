import RetreatForm from "@/components/forms/retreat-form";
import BrochureGate from "@/components/common/brochure-gate";
import { CatalogBody, CatalogFaqs, CatalogHero, CatalogProof } from "@/components/sections/catalog/catalog-sections";

/** `/corporate-training-catalog` — hero, proof card, the A–Z catalog beside
 * the brief builder, FAQs, and the shared navy quote form. `domains` comes
 * from the CMS sitemap API. The full-catalog PDF opens the gated-download
 * drawer, the same form as the blog rail's catalog card. */
export default function CorporateTrainingCatalogPage({ page, domains }) {
  return (
    <BrochureGate brochure={page.brochure} title="Edstellar training catalog">
      <CatalogHero data={page.hero} breadcrumbs={page.breadcrumbs} />
      <CatalogProof data={page.proof} />
      <CatalogBody catalog={page.catalog} brief={page.brief} domains={domains} />
      <CatalogFaqs data={page.faqs} />
      <RetreatForm data={page.form} accent="lime" thankYou="corporate-training-catalog" />
    </BrochureGate>
  );
}
