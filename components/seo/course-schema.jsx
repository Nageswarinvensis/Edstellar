import JsonLd from "@/components/seo/json-ld";
import { courseUrl, coursePageTitle, coursePageDescription } from "@/lib/seo/course-seo";

const BASE = "https://www.edstellar.com";

/**
 * A course page's structured data, the same for every course design:
 * WebPage, BreadcrumbList, FAQPage, and the CMS's Course and Service.
 *
 * The API sends `course.schema = { Course: {}, Service: {}, faq: [] }`.
 * WebPage / BreadcrumbList are always generated here. `faqItems` overrides the
 * FAQ source — FAQPage must match the questions visible on the page, and the
 * v2 design shows its own.
 */
export default function CourseSchema({ course, slug, courseSlug, faqItems: faqOverride }) {
  const url = courseUrl(slug, courseSlug);
  const pageTitle = coursePageTitle(course);
  const pageDescription = coursePageDescription(course);

  const schema = course.schema ?? null;
  const faqItems = faqOverride?.length
    ? faqOverride
    : schema?.faq?.length
      ? schema.faq
      : (course.faqs ?? course.Faqs)?.items ?? [];
  // Strip mainEntityOfPage — it pulls WebPage into Course as a nested entity.
  const rawCourse = schema?.Course ?? null;
  const schemaCourse = rawCourse ? (({ mainEntityOfPage, ...rest }) => rest)(rawCourse) : null;
  // Strip subjectOf (pulls WebPage into Service) and an empty hasOfferCatalog placeholder.
  const rawService = schema?.Service ?? null;
  const schemaService = rawService
    ? (({ subjectOf, hasOfferCatalog, ...rest }) => (hasOfferCatalog?.["@type"] ? { ...rest, hasOfferCatalog } : rest))(rawService)
    : null;

  return (
    <>
      {/* WebPage (always) */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: pageTitle,
          ...(pageDescription && { description: pageDescription }),
          inLanguage: "en-US",
        }}
      />

      {/* BreadcrumbList (always) */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            { "@type": "ListItem", position: 2, name: "Corporate Training", item: `${BASE}/corporate-training` },
            { "@type": "ListItem", position: 3, name: course.domain_name, item: `${BASE}/corporate-training/${slug}` },
            { "@type": "ListItem", position: 4, name: pageTitle, item: url },
          ],
        }}
      />

      {/* FAQPage */}
      {faqItems.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
      )}

      {/* Course — only when the CMS sends schema.Course */}
      {schemaCourse && <JsonLd data={{ "@context": "https://schema.org", ...schemaCourse }} />}

      {/* Service — only when the CMS sends schema.Service */}
      {schemaService && <JsonLd data={{ "@context": "https://schema.org", ...schemaService }} />}
    </>
  );
}
