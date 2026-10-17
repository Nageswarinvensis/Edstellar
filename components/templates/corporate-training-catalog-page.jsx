import RetreatForm from "@/components/forms/retreat-form";
import { CatalogBody, CatalogFaqs, CatalogHero, CatalogProof } from "@/components/sections/catalog/catalog-sections";

/** `/corporate-training-catalog` — hero, proof card, the A–Z catalog beside
 * the brief builder, FAQs, and the shared navy quote form. `domains` comes
 * from the CMS sitemap API. */
export default function CorporateTrainingCatalogPage({ page, domains }) {
  return (
    <>
      <CatalogHero data={page.hero} breadcrumbs={page.breadcrumbs} />
      <CatalogProof data={page.proof} />
      <CatalogBody catalog={page.catalog} brief={page.brief} domains={domains} />
      <CatalogFaqs data={page.faqs} />
      <RetreatForm data={page.form} accent="lime" />
    </>
  );
}
