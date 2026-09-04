import TickerBar from "@/components/layout/ticker-bar";
import Hero from "@/components/sections/shared/hero";
import HeroInfo from "@/components/sections/shared/hero-info";
import Requested from "@/components/sections/domain/requested";
import StickyNavbar from "@/components/sections/domain/sticky-navbar";
import About from "@/components/sections/shared/about";
import Program from "@/components/sections/domain/program";
import ByRole from "@/components/sections/domain/byrole";
import Paths from "@/components/sections/domain/path";
import Trainers from "@/components/sections/shared/trainers";
import MapSection from "@/components/sections/shared/map-section";
import Delivered from "@/components/sections/domain/delivered";
import DeliveryModes from "@/components/sections/course/delivery-modes";
import StickyFooter from "@/components/sections/shared/sticky-footer";
import FromEdstellar from "@/components/sections/domain/from_edstellar";
import RelatedCategories from "@/components/sections/domain/related-categories";
import Faq from "@/components/sections/shared/faq";
import Scope from "@/components/sections/domain/scope";
import LeadForm from "@/components/forms/lead-form";
import Results from "@/components/sections/domain/results";
import Outcome from "@/components/sections/domain/outcome";


/**
 * Domain page design — a training category such as Artificial Intelligence.
 *
 * Shares eight sections with the course template and adds seven of its own.
 * That sharing is only possible because sections take props and carry no
 * page-type assumptions (TASTE.md §6.2); the moment a second template imports
 * a section, it moves to `sections/shared/`.
 */
export default function DomainPage({ domain }) {
  return (
    <>
      <TickerBar />
      <Hero hero={domain.hero} breadcrumbs={domain.breadcrumbs} />
      <HeroInfo
        topics={domain.hero?.topics}
        groupQuote={domain.hero?.group_quote}
        proof={domain.proof}
      />
      <Requested data={domain.requestedData} />
      <StickyNavbar data={domain.sticky_nav} />
      <About
        about={domain.about}
        ctaBannerData={domain.about?.cta_banner}
        showCustomizedTraining={false}
      />
      <Program data={domain.programData} />
      <ByRole data={domain.byRoleData} />
      <Paths data={domain.pathsData} />
      <Outcome data={domain.outcomeData} />
      <DeliveryModes deliveryModes={domain.DeliveryModesdata} />
      <Trainers trainers={domain.trainers} desktopCards={4} />
      <Results data={domain.ResultsData} />
      <MapSection data={domain.map_section} />
      <Delivered data={domain.deliveredData} />
      <FromEdstellar data={domain.fromedstellarData} />
      <RelatedCategories data={domain.relatedCategoriesData} />
      <Faq
        faqs={domain.faqs}
        innerClassName="max-w-[920px] mx-auto"
        showCta={false}
      />
      <Scope data={domain.scopeData} />
      <LeadForm data={domain.lead_form} background="paper-warm" />
      <StickyFooter data={domain.sticky_footer} />
    </>
  );
}
