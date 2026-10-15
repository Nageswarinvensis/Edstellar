import SchemaOrg from "@/components/seo/schema-org";
import CompanyHero from "@/components/sections/company/company-hero";
import HeroMeta from "@/components/sections/legal/hero-meta";
import LegalBody from "@/components/sections/legal/legal-body";
import LegalContact from "@/components/sections/legal/legal-contact";

/** The CMS title carries the brand suffix the root layout's title template
 * already adds — stripped so it does not render twice. */
export function legalTitle(seo) {
  return seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();
}

/**
 * The one design shared by every legal page (Terms and Conditions, Privacy
 * Policy, Modern Slavery Statement): navy hero with photo and optional meta
 * rows, the sectioned legal body with back-to-top, and the contact band.
 *
 * `page` is the CMS-shaped record (`seo`, `legal_hero`, `legal_body`,
 * `legal_contact_cta`) from `lib/content/legal.js`. The CMS sends no
 * breadcrumbs, so the route passes its `path` and builds the trail here.
 *
 * Design: `Edstellar Static Pages/terms-conditions.html`.
 */
export default function LegalPage({ page, path }) {
  const { seo, legal_hero: hero, legal_body: body, legal_contact_cta: contact } = page;
  const title = legalTitle(seo);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: title, href: null },
  ];

  return (
    <>
      <SchemaOrg
        webpage={{ name: title, description: seo?.Meta_description, path }}
        breadcrumbs={breadcrumbs}
      />

      <CompanyHero
        id="top"
        heading={hero?.heading}
        description={hero?.description}
        breadcrumbs={breadcrumbs}
        image={hero?.image}
      >
        {hero?.meta?.length ? <HeroMeta items={hero.meta} /> : null}
      </CompanyHero>
      <LegalBody sections={body?.sections} backToTop="top" />
      <LegalContact data={contact} />
    </>
  );
}
