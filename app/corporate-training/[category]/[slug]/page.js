import { notFound } from "next/navigation";
import RichHeading from "@/components/shared/rich-heading";
import courses from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import Certificate from "@/components/sections/course/certificate";
import Faq from "@/components/sections/course/faq";

export async function generateStaticParams() {
  return courses.map((course) => ({
    category: course.category,
    slug: course.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return buildMetadata({
      title: "Course Not Found",
      path: `/corporate-training/${category}/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: course.title,
    path: `/corporate-training/${category}/${course.slug}`,
  });
}

export default async function CoursePage({ params }) {
  const { slug } = await params;

  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <RichHeading
        as="h1"
        parts={[{ text: course.title }]}
        emphasisClassName="color-ink"
        className="mb-10 text-center"
      />
      <Certificate certificate={course.certificate} />
      <Faq faqs={course.faqs} />
    </>
  );
}
