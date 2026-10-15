import { getContactPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";

import CompanyHero from "@/components/sections/company/company-hero";
import ContactReach from "@/components/sections/company/contact-reach";

export function generateMetadata() {
  const { seo } = getContactPage();
  return buildMetadata(seo);
}

/**
 * Contact Us — a static page built from local JSON
 * (`content/company/contact-us.json`, via `lib/content/company.js`).
 *
 * Design: `Edstellar Static Pages/contact-us.html`.
 */
export default function ContactUsPage() {
  const page = getContactPage();
  const { hero } = page;

  return (
    <>
      <SchemaOrg
        webpage={{
          name: page.seo.title,
          description: page.seo.description,
          path: page.seo.path,
        }}
        breadcrumbs={hero.breadcrumbs}
      />

      <CompanyHero
        heading={hero.heading}
        description={hero.description}
        breadcrumbs={hero.breadcrumbs}
        image={hero.image}
      >
        <a
          href={`mailto:${hero.email}`}
          title="Click Here to Email Edstellar"
          className="border-b-2 border-transparent font-display text-[clamp(20px,2.4vw,28px)] font-semibold text-lime transition-colors hover:border-lime"
        >
          {hero.email}
        </a>
      </CompanyHero>
      <ContactReach data={page.reach} form={page.form} />
    </>
  );
}
