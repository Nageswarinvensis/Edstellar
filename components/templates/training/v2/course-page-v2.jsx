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
      <V2Hero hero={course.hero} breadcrumbs={course.breadcrumbs} />
      <V2Gap data={course.gap} />
      <V2Lab data={course.lab} />
      <V2Overview data={course.overview} />
      <V2Outcomes data={course.outcomes} />
      <V2Outline data={course.outline} />
      <V2Toolkit data={course.toolkit} />
      <V2Fit data={course.fit} />
      <V2Audience data={course.audience} />
      <V2RealWorld data={course.realworld} />
      <V2Delivery data={course.delivery} />
      <V2Instructor data={course.instructor} />
      <V2Why data={course.why} />
      <V2Certificate data={course.certificate} />
      <V2Faq data={course.faq} />
      <V2Path data={course.path} />
      <V2GroupQuote data={course.group_quote} />
      <V2Quote data={course.quote} courseName={course.name} />
    </>
  );
}
