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
import Trainers from "@/components/sections/course/trainers";
import MapSection from "@/components/sections/course/mapsection";
import Capability from "@/components/sections/category/capability";
import Faq from "@/components/sections/course/faq";
import Domain from "@/components/sections/category/domain";
import StickyFooter from "@/components/sections/course/sticky-footer";

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
      <CategoryAbout
        about={data.about}
        ctaBannerData={data.about?.ctaBannerData}
      />
      <WhyNow whyNow={data.whyNow} ctaBannerData={data.whyNow?.ctaBannerData} />
      <Card data={data.cardData} />
      <Marquee stack={data.marqueeData} />
      <Trainers trainers={data.trainers} />
      <MapSection data={data.mapsectionData} />
      <Capability data={data.capabilityData} />
      <Faq faqs={data.faqs} />
      <Domain data={data.domainData} />
      <StickyFooter data={data.stickyFooter} />
    </>
  );
}
