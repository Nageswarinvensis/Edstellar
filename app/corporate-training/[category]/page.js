import { notFound } from "next/navigation";

import { getCategory } from "@/lib/content/category";
import { buildMetadata } from "@/lib/seo/metadata";

import CategoryHero from "@/components/sections/course/course-hero";
import CategoryInfo from "@/components/sections/course/courseInfo";
import ClientLogos from "@/components/sections/course/client-logo";
import Requested from "@/components/sections/category/requested";
import StickyTabs from "@/components/sections/course/sticky-navbar";
import CategoryAbout from "@/components/sections/course/course-about";
import WhyNow from "@/components/sections/category/why-now";
import Outcomes1 from "@/components/sections/category/outcomes";
import Card from "@/components/sections/category/card";
import Industries from "@/components/sections/category/industries";
import Marquee from "@/components/sections/category/marquee";
import Program from "@/components/sections/category/programs";
import ByRole from "@/components/sections/category/byrole";
import Paths from "@/components/sections/category/paths";
import Outcomes11 from "@/components/sections/category/outcomes11";
import Governance from "@/components/sections/category/governance";
import Trainers from "@/components/sections/course/trainers";
import Proof1 from "@/components/sections/category/proof1";
import MapSection from "@/components/sections/course/mapsection";
import Capability from "@/components/sections/category/capability";
import Method from "@/components/sections/category/method";
import MethodSub from "@/components/sections/category/methodsub";
import LDCards from "@/components/sections/category/ld";
import RelatedCategories from "@/components/sections/category/related-categories";
import Faq from "@/components/sections/course/faq";
import Scope from "@/components/sections/category/scope";

import LeadForm from "@/components/sections/course/lead-form";
import StickyFooter from "@/components/sections/course/sticky-footer";
import ProofBar from "@/components/shared/proof-bar";

export const revalidate = 3600;

function pathFor(category) {
  return `/corporate-training/${category}`;
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const data = await getCategory(category);

  if (!data) {
    return {};
  }

  return buildMetadata({
    title: data.seo.title,
    description: data.seo.description,
    path: pathFor(category),
    image: data.seo.ogImage,
  });
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const data = await getCategory(category);

  if (!data) {
    notFound();
  }

  return (
    <>
      <CategoryHero hero={data.hero} breadcrumbs={data.breadcrumbs} />
      <CategoryInfo
        topics={data.hero?.topics}
        groupQuote={data.hero?.groupQuote}
        proof={data.proof}
      />
     {/** <ClientLogos data={data.ClientsLogosData} /> **/}
      <Requested data={data.requestedData}/>
      <StickyTabs data={data.stickyNavbarData} />
      <CategoryAbout about={data.about}
        ctaBannerData={data.about?.ctaBannerData} />
     {/**  <WhyNow whyNow={data.whyNow} 
        ctaBannerData={data.whyNow?.ctaBannerData} /> **/}
     {/**  <Outcomes1 data={data.outcomesData} 
        ctaBannerData={data.outcomesData?.ctaBannerData} /> **/}
     {/** <Card data={data.cardData} 
        ctaBannerData={data.cardData?.ctaBannerData} /> **/}
     {/** <Industries data={data.industriesData} 
        ctaBannerData={data.industriesData?.ctaBannerData} /> **/}
     {/** <Marquee stack={data.marqueeData} /> **/}
      <Program data={data.programData}/>
      <ByRole data={data.roleData}
      ctaBannerData={data.roleData?.ctaBannerData} />
      <Paths data={data.pathsData}/>
      <Outcomes11 data={data.outcomes11Data}/>
     {/** <Governance data={data.governanceData}
      ctaBannerData={data.governanceData?.ctaBannerData} /> **/}
      <Trainers trainers={data.trainers} />
      <Proof1 data={data.proof1Data}/>
      <MapSection data={data.mapsectionData} />
     {/** <Capability data={data.capabilityData} /> **/}
      <Method data={data.methodData} />
      <MethodSub data={data.methodsubData}/>
     {/** <LDCards data={data.ldData} /> **/}
      <RelatedCategories data={data.relatedCategoriesData} />
      <Faq faqs={data.faqs} />
      <Scope data={data.scopeData}/>
      
      <LeadForm data={data.leadForm} background="paper-warm" />

      <StickyFooter data={data.stickyFooter} />
    </>
  );
}
