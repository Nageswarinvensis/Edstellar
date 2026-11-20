import V2Hero from "@/components/sections/course/v2/hero";
import V2Gap from "@/components/sections/course/v2/gap";
import V2Lab from "@/components/sections/course/v2/lab";
import V2Overview from "@/components/sections/course/v2/overview";
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
import V2Path from "@/components/sections/course/v2/path";
import V2GroupQuote from "@/components/sections/course/v2/group-quote";
import V2Quote from "@/components/sections/course/v2/quote";

/**
 * Course page — NEW v2 design (testing).
 *
 * Separate from the old `course-page.jsx`: every section here is its own
 * component in `components/sections/course/v2/`, even where an old section
 * covers similar ground, so nothing in the old layout changes. The data is
 * the course's local JSON (`content/courses/v2/`), not the CMS. Which
 * courses use it is the switch in `content/courses/v2/index.js`.
 *
 * Section order follows the design: 1–8 are the program's own story,
 * 9–14 the fixed Edstellar closing sections.
 */
export default function CoursePageV2({ course }) {
  return (
    <>
      <V2Hero hero={course.course_hero} breadcrumbs={course.course_breadcrumbs} />
      <V2Gap data={course.course_gap} />
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
      <V2Why data={course.course_why} />
      <V2Certificate data={course.course_certificate} />
      <V2Faq data={course.course_faq} />
      <V2Path data={course.course_path} />
      <V2GroupQuote data={course.course_group_quote} />
      <V2Quote data={course.course_quote} courseName={course.name} />
    </>
  );
}
