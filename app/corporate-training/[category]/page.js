import { notFound } from "next/navigation";

import { getCategory } from "@/lib/content/category";
import { buildMetadata } from "@/lib/seo/metadata";

import CategoryHero from "@/components/sections/course/course-hero";
import CategoryInfo from "@/components/sections/course/courseInfo";
import ClientLogos from "@/components/sections/course/client-logo";
import StickyTabs from "@/components/sections/course/sticky-navbar";
import CategoryAbout from "@/components/sections/course/course-about";
import WhyNow from "@/components/sections/category/why-now";
import Card from "@/components/sections/category/card";
import Marquee from "@/components/sections/category/marquee";
import Governence from "@/components/sections/category/governence";
import Trainers from "@/components/sections/course/trainers";
import MapSection from "@/components/sections/course/mapsection";
import Capability from "@/components/sections/category/capability";
import Method from "@/components/sections/category/method";
import LDCards from "@/components/sections/category/ld";
import Faq from "@/components/sections/course/faq";
import RelatedCategories from "@/components/sections/category/related-categories";
import LeadForm from "@/components/sections/course/lead-form";
import StickyFooter from "@/components/sections/course/sticky-footer";
import { headers } from "next/headers";

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
      <ClientLogos data={data.ClientsLogosData} />
      <StickyTabs data={data.stickyNavbarData} />
      <CategoryAbout about={data.about}
        ctaBannerData={data.about?.ctaBannerData} />
      <WhyNow whyNow={data.whyNow} 
        ctaBannerData={data.whyNow?.ctaBannerData} />
      <Card data={data.cardData} 
        ctaBannerData={data.cardData?.ctaBannerData} />
      <Marquee stack={data.marqueeData} />
      <Governence data={data.governenceData}/>
      <Trainers trainers={data.trainers} />
      <MapSection data={data.mapsectionData} />
      <Capability data={data.capabilityData} />
      <Method data={data.methodData} />
      <LDCards data={data.ldData} />
      <Faq faqs={data.faqs} />
      <RelatedCategories data={data.relatedCategoriesData} />
      <LeadForm data={data.leadForm} background="paper-warm" />

      <StickyFooter data={data.stickyFooter} />
    </>
  );
}
