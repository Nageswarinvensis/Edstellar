import Hero from "@/components/common/hero";
import DomainProof from "@/components/sections/domain/domain-proof";
import ClientLogos from "@/components/common/client-logos";
import StickyNavbar from "@/components/sections/domain/sticky-navbar";
import About from "@/components/sections/domain/about";
import Topics from "@/components/sections/domain/topics";
import Program from "@/components/sections/domain/program";
import Bundles from "@/components/sections/domain/bundles";
import ByRole from "@/components/sections/domain/byrole";
import ExploreCategories from "@/components/sections/domain/explore-categories";
import Trainers from "@/components/common/trainers";
import DomainMapSection from "@/components/sections/domain/domain-map-section";
import Delivered from "@/components/sections/domain/delivered";
import DeliveryModes from "@/components/common/delivery-modes";
import StickyFooter from "@/components/common/sticky-footer";
import FromEdstellar from "@/components/sections/domain/from_edstellar";
import Faq from "@/components/common/faq";
import Scope from "@/components/sections/domain/scope";
import LeadForm from "@/components/forms/lead-form";

import Outcome from "@/components/sections/domain/outcome";

/**
 * Domain page design — a training category such as Artificial Intelligence.
 *
 * Shares eight sections with the course template and adds seven of its own.
 * That sharing is only possible because sections take props and carry no
 * page-type assumptions (TASTE.md §6.2); the moment a second template
 * imports a section, it moves to `components/common/` — the one folder for
 * anything reused beyond its own template, section-sized or not (there is
 * no separate `sections/shared/` anymore).
 */
export default function DomainPage({ domain }) {
  // Mirrors trainers.jsx's own `dynamic_data ?? people` precedence, so this
  // agrees with whether `<Trainers>` below actually renders anything.
  const hasTrainers = Boolean(
    (domain.trainers?.dynamic_data ?? domain.trainers?.people)?.length,
  );

  // Use the CMS image if provided; fall back to the shared category banner.
  // Video is suppressed — banners are image-only on domain pages.
  const hero = {
    ...domain.hero,
    media: {
      ...domain.hero?.media,
      video: undefined,
      image:
        domain.hero?.media?.image ??
        "https://media.edstellar.com/Category-banner.webp",
    },
  };

  return (
    <>
      <Hero hero={hero} breadcrumbs={domain.breadcrumbs} />
      <DomainProof proof={domain.proof} />
      <ClientLogos heading="Trusted as a Leading Corporate Training Provider by" />

      <StickyNavbar data={domain.sticky_nav} />
      <About about={domain.about} ctaBannerData={domain.about?.cta_banner} />
      <Topics
        data={domain.topicsData}
        courses={domain.coursesData}
        courseCount={domain.coursesData?.courses?.length ?? domain.programData?.catalog?.courseCount}
      />
      {/* Catalog heading and intro: the CMS `programData`, else the `courses`
          config (`programs_heading` / `programs_desc`); neither → not rendered. */}
      <Program
        data={{
          heading: domain.coursesData?.programs_heading,
          description: domain.coursesData?.programs_desc,
          ...domain.programData,
          defaultDelivery: domain.delivery,
        }}
        courses={domain.coursesData}
      />
      <Bundles
        data={domain.bundlesData}
        courses={domain.coursesData}
      />
      <ByRole data={domain.byRoleData} />
      <ExploreCategories data={domain.exploreCategoriesData} />
      <Outcome data={domain.outcomeData} />
      <DeliveryModes
        deliveryModes={domain.deliveryModes}
        className="bg-paper-cream"
        showSectionCta={false}
      />
      <Trainers trainers={domain.trainers} desktopCards={4} />

      <DomainMapSection data={domain.mapsectionData} className="bg-paper-warm" />
      <Delivered data={domain.deliveredData} />
      <FromEdstellar data={domain.fromedstellarData} />
      <Faq
        faqs={domain.faqs}
        innerClassName="max-w-[920px] mx-auto"
        showCta={false}
        className="bg-paper-warm"
      />
      <Scope data={domain.scopeData} />
      <LeadForm data={domain.leadForm} background="paper-warm" thankYou="category" />
      <StickyFooter data={domain.stickyFooter} />
    </>
  );
}
