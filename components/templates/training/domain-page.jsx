import Hero from "@/components/sections/shared/hero";
import HeroInfo from "@/components/sections/shared/hero-info";
import ClientLogos from "@/components/sections/shared/client-logos";
import About from "@/components/sections/shared/about";
import Trainers from "@/components/sections/shared/trainers";
import Faq from "@/components/sections/shared/faq";
import MapSection from "@/components/sections/shared/map-section";
import StickyFooter from "@/components/sections/shared/sticky-footer";

import StickyNavbar from "@/components/sections/domain/sticky-navbar";
import WhyNow from "@/components/sections/domain/why-now";
import Card from "@/components/sections/domain/card";
import Marquee from "@/components/sections/domain/marquee";
import Capability from "@/components/sections/domain/capability";
import Method from "@/components/sections/domain/method";
import RelatedCategories from "@/components/sections/domain/related-categories";

import LeadForm from "@/components/forms/lead-form";

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
      <Hero hero={domain.hero} breadcrumbs={domain.breadcrumbs} />
      <HeroInfo
        topics={domain.hero?.topics}
        groupQuote={domain.hero?.group_quote}
        proof={domain.proof}
      />
      <ClientLogos data={domain.client_logos} />
      <StickyNavbar data={domain.sticky_nav} />
      <About about={domain.about} ctaBannerData={domain.about?.cta_banner} />
      <WhyNow whyNow={domain.why_now} ctaBannerData={domain.why_now?.cta_banner} />
      <Card data={domain.card} ctaBannerData={domain.card?.cta_banner} />
      <Marquee stack={domain.marquee} />
      <Trainers trainers={domain.trainers} />
      <MapSection data={domain.map_section} />
      <Capability data={domain.capability} />
      <Method data={domain.method} />
      <Faq faqs={domain.faqs} />
      <RelatedCategories data={domain.related_domains} />
      <LeadForm data={domain.lead_form} background="paper-warm" />
      <StickyFooter data={domain.sticky_footer} />
    </>
  );
}
