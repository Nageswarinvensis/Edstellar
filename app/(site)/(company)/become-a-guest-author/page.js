import { notFound } from "next/navigation";

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

export const revalidate = 300;

const PATH = "/become-a-guest-author";

// The CMS `breadcrumbs` component on this page currently names the wrong page
// ("Coaching Solutions"), so the trail is set here.
const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Become a Guest Author", href: null },
];

/** The CMS title carries the brand suffix the root layout's title template
 * already adds — stripped so it does not render twice. */
const titleOf = (seo) => seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();

export async function generateMetadata() {
  const page = await getGuestAuthorPage();
  if (!page) return {};
  const { seo } = page;

  return buildMetadata({
    title: titleOf(seo),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/**
 * Become a Guest Author — every section from the CMS page
 * `site-pages/become-a-guest-author`, read in its own component names.
 *
 * Design: `Edstellar Static Pages/become-a-guest-author.html`.
 */
export default async function BecomeAGuestAuthorPage() {
  const page = await getGuestAuthorPage();
  if (!page) notFound();

  const hero = page["guest-author_hero"];

  return (
    <>
      <SchemaOrg
        webpage={{ name: titleOf(page.seo), description: page.seo?.Meta_description, path: PATH }}
        breadcrumbs={BREADCRUMBS}
      />

      <CompanyHero
        heading={hero?.heading}
        description={hero?.description}
        breadcrumbs={BREADCRUMBS}
        image={hero?.image}
      >
        {hero?.cta?.href ? (
          <CtaButton arrow color="lime" render={<a href={hero.cta.href} />}>
            {hero.cta.label}
          </CtaButton>
        ) : null}
      </CompanyHero>
      <Benefits data={page["guest-author_benifits"]} />
      <Contributors data={page.guest_author_contributors} />
      <Steps data={page["guest-author_steps"]} />
      <Guidelines data={page.guest_author_guidelines} />
      <Terms data={page.guest_author_terms} />
      <Pitch data={page["guest-author_form"]} />
      <TrainerCta data={page["guest-author_cta"]} />
    </>
  );
}
