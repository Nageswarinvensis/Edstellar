import SchemaOrg from "@/components/seo/schema-org";
import CompanyHero from "@/components/sections/company/company-hero";
import HeroMeta from "@/components/sections/legal/hero-meta";
import LegalBody from "@/components/sections/legal/legal-body";
import LegalContact from "@/components/sections/legal/legal-contact";

/**
 * The one design shared by every legal page (Terms and Conditions, Privacy
 * Policy, Modern Slavery Statement): navy hero with photo and optional meta
 * rows, the sectioned legal body with back-to-top, and the contact band.
 * Pages differ only in their content record (`content/legal/*.json`).
 *
 * Design: `Edstellar Static Pages/terms-conditions.html`.
 */
export default function LegalPage({ page }) {
  const { seo, hero, sections, contact } = page;

  return (
    <>
      <SchemaOrg
        webpage={{ name: seo.title, description: seo.description, path: seo.path }}
        breadcrumbs={hero.breadcrumbs}
      />

      <CompanyHero
        id="top"
        heading={hero.heading}
        description={hero.description}
        breadcrumbs={hero.breadcrumbs}
        image={hero.image}
      >
        {hero.meta?.length ? <HeroMeta items={hero.meta} /> : null}
      </CompanyHero>
      <LegalBody sections={sections} backToTop="top" />
      <LegalContact data={contact} />
    </>
  );
}
