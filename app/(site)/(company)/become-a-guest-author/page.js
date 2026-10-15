import { getGuestAuthorPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import { CtaButton } from "@/components/common/cta-button";

import CompanyHero from "@/components/sections/company/company-hero";
import Benefits from "@/components/sections/company/guest-author/benefits";
import Contributors from "@/components/sections/company/guest-author/contributors";
import Steps from "@/components/sections/company/guest-author/steps";
import Guidelines from "@/components/sections/company/guest-author/guidelines";
import Terms from "@/components/sections/company/guest-author/terms";
import Pitch from "@/components/sections/company/guest-author/pitch";
import TrainerCta from "@/components/sections/company/guest-author/trainer-cta";

export function generateMetadata() {
  const { seo } = getGuestAuthorPage();
  return buildMetadata(seo);
}

/**
 * Become a Guest Author — a static page built from local JSON
 * (`content/company/become-a-guest-author.json`, via `lib/content/company.js`).
 *
 * Design: `Edstellar Static Pages/become-a-guest-author.html`.
 */
export default function BecomeAGuestAuthorPage() {
  const page = getGuestAuthorPage();
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
        <CtaButton color="lime" render={<a href={hero.cta.href} />}>
          {hero.cta.label}
        </CtaButton>
      </CompanyHero>
      <Benefits data={page.benefits} />
      <Contributors data={page.contributors} />
      <Steps data={page.steps} />
      <Guidelines data={page.guidelines} />
      <Terms data={page.terms} />
      <Pitch data={page.pitch} />
      <TrainerCta data={page.cta} />
    </>
  );
}
