import V2Hero from "@/components/sections/course/v2/hero";
import CourseInfo from "@/components/sections/course/course-info";
import BrochureGate from "@/components/common/brochure-gate";
import V2Gap from "@/components/sections/course/v2/gap";
import V2Lab from "@/components/sections/course/v2/lab";
import V2Overview from "@/components/sections/course/v2/overview";
import V2Customized from "@/components/sections/course/v2/customized";
import V2Outcomes from "@/components/sections/course/v2/outcomes";
import V2Outline from "@/components/sections/course/v2/outline";
import V2Toolkit from "@/components/sections/course/v2/toolkit";
import V2Fit from "@/components/sections/course/v2/fit";
import V2Audience from "@/components/sections/course/v2/audience";
import V2RealWorld from "@/components/sections/course/v2/realworld";
import V2Delivery from "@/components/sections/course/v2/delivery";
import V2Instructor from "@/components/sections/course/v2/instructor";
import V2Why from "@/components/sections/course/v2/why";
import V2Certificate from "@/components/sections/course/v2/certificate";
import V2Faq from "@/components/sections/course/v2/faq";
import WhyEdstellar from "@/components/sections/course/why-edstellar";
import AlsoFromEdstellar from "@/components/sections/course/also-from-edstellar";
import GroupQuote from "@/components/forms/group-quote";
import StickyFooter from "@/components/common/sticky-footer";
import V2QuoteForm from "@/components/sections/course/v2/quote-form";

/**
 * Course page — NEW v2 design (testing).
 *
 * Separate from the old `course-page.jsx`: every section here is its own
 * component in `components/sections/course/v2/`, even where an old section
 * covers similar ground, so nothing in the old layout changes. The data is
 * the CMS `course_*` components over the local JSON (`content/courses/v2/`).
 * `cmsCourse` is the page's own CMS course (as the old layout reads it): its
 * breadcrumbs, name, `learning_path` and `related_courses` feed the hero
 * crumbs and the live sections reused here. Which courses use it is the CMS flag `page.meta.is_new_design`.
 *
 * Section order follows the design: 1–8 are the program's own story,
 * 9–14 the fixed Edstellar closing sections.
 */
/** Every `{course}` in the page data's strings, filled with the course name. */
function fillCourseName(value, name) {
  if (typeof value === "string") return value.replaceAll("{course}", name);
  if (Array.isArray(value)) return value.map((item) => fillCourseName(item, name));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, fillCourseName(item, name)]));
  }
  return value;
}

export default function CoursePageV2({ course: data, cmsCourse }) {
  // Same as the old layout: "ETL Testing Training" → "ETL Testing".
  const topic = String(cmsCourse?.name ?? "").replace(/\s+(Corporate\s+)?Training$/i, "");
  const trainersImage = { src: cmsCourse?.trainers_thumbnail, alt: `Expert ${topic} trainers` };
  // The shared local defaults name the course as `{course}`:
  // "ETL Testing Training" → "ETL Testing Corporate Training".
  const course = fillCourseName(data, topic ? `${topic} Corporate Training` : "This training");

  // Every brochure button (proof bar, sticky footer) opens the gated-download
  // drawer, exactly as on the old layout.
  return (
    <BrochureGate
      brochureKey={cmsCourse?.brochure ? `course:${cmsCourse.slug}` : null}
      title={cmsCourse?.domain_name ? `${cmsCourse.domain_name} training brochure` : "Training brochure"}
    >
      <V2Hero hero={course.course_hero} breadcrumbs={cmsCourse?.breadcrumbs?.items} />
      {/* The live course's proof bar (CMS `proof`), as on the old layout. */}
      <CourseInfo proof={cmsCourse?.proof} capabilityModel={cmsCourse?.CapabilityModel} trainersImage={trainersImage} />
      <V2Gap data={course.course_gap} />
      <V2Customized data={course.course_customized} />
      <V2Lab data={course.course_lab} />
      <V2Overview data={course.course_overview} />
      <V2Outcomes data={course.course_outcomes} />
      <V2Outline data={course.course_outline} />
      <V2Toolkit data={course.course_toolkit} />
      <V2Fit data={course.course_fit} />
      <V2Audience data={course.course_audience} />
      <V2RealWorld data={course.course_realworld} />
      <V2Delivery data={course.course_delivery} />
      <V2Instructor data={course.course_instructor} />
      <V2Why data={course.course_why} credentials={course.course_credentials} products={course.course_products} />
      <V2Certificate data={course.course_certificate} />
      <V2Faq data={course.course_faq} />
      {/* The live site's sections, shared with the old layout (not v2 sections),
          fed from the page's own CMS course as live is. */}
      <WhyEdstellar data={cmsCourse?.learning_path ?? cmsCourse?.WhyEds} relatedCourses={cmsCourse?.related_courses} />
      <AlsoFromEdstellar />
      <GroupQuote courseName={cmsCourse?.name} />
      {/* The v2 quote section with the live lead form's fields (same Zoho form):
          heading/text from CMS `leadForm`, packages/note from local `course_quote`. */}
      <V2QuoteForm data={cmsCourse?.leadForm} quote={course.course_quote} />
      <StickyFooter data={cmsCourse?.stickyFooter} />
    </BrochureGate>
  );
}
