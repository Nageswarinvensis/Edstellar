import CtaBand from "@/components/sections/consulting/cta-band";
import StudyHero from "@/components/sections/case_studies/study-hero";
import StudyArticle from "@/components/sections/case_studies/study-article";
import CourseChips from "@/components/sections/case_studies/course-chips";

/** `/case-study/{slug}` — hero, the article with its promo rail, related
 * courses, then the newsletter band. */
export default function CaseStudyPage({ study, breadcrumbs }) {
  return (
    <>
      <StudyHero title={study.title} data={study.hero} breadcrumbs={breadcrumbs} />
      <StudyArticle title={study.title} body={study.body} promo={study.promo} />
      <CourseChips data={study.courses} />
      <CtaBand data={study.cta} />
    </>
  );
}
