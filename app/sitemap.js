import { SITE } from "@/lib/constants";
import { getTrainingSlugs } from "@/lib/content/taxonomy";
import { getAllCoursePaths } from "@/lib/content/courses";
import {
  CONSULTING_PILLARS,
  getConsultingServiceSlugs,
} from "@/lib/content/consulting";
import { getTalentAssessmentServiceSlugs } from "@/lib/content/talent-assessment";
import { RESOURCE_TYPES } from "@/lib/content/resources";
import { getCaseStudySlugs } from "@/lib/content/case-studies";
import { getTemplateSlugs } from "@/lib/content/templates";

/**
 * Generated from the content layer, never hand-maintained — a new course must
 * appear here without anyone remembering to add it (TASTE.md §4.3).
 *
 * **Courses come from `getAllCoursePaths`, not the prerendered subset.**
 * Catalog pagination is client-side, so page two of a listing is a query
 * string on a static page and gives crawlers no link path to the courses on
 * it. This file is the only discovery route for the long tail; building it
 * from the prerender cutoff would make most of the catalog invisible
 * (TASTE.md §2.3).
 */
export const revalidate = 3600;

export default async function sitemap() {
  const entry = (path, priority, changeFrequency = "weekly") => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  const [trainingSlugs, coursePaths, servicePaths, talentAssessmentSlugs] =
    await Promise.all([
      getTrainingSlugs(),
      getAllCoursePaths(),
      Promise.all(
        CONSULTING_PILLARS.map(async ({ slug: pillar }) =>
          (await getConsultingServiceSlugs(pillar)).map(
            (slug) => `/${pillar}/${slug}`,
          ),
        ),
      ).then((paths) => paths.flat()),
      getTalentAssessmentServiceSlugs(),
    ]);

  return [
    entry("/", 1, "daily"),
    entry("/corporate-training", 0.8, "daily"),
    entry("/corporate-training-catalog", 0.8, "daily"),
    ...trainingSlugs.map((slug) => entry(`/corporate-training/${slug}`, 0.7)),
    ...coursePaths.map(({ domain, course }) =>
      entry(`/corporate-training/${domain}/${course}`, 0.8),
    ),
    ...CONSULTING_PILLARS.map(({ slug }) => entry(`/${slug}`, 0.7)),
    ...servicePaths.map((path) => entry(path, 0.6)),
    ...talentAssessmentSlugs.map((slug) =>
      entry(`/talent-assessment-services/${slug}`, 0.6),
    ),
    entry("/learning-development-resources", 0.6, "weekly"),
    entry("/learning-development-templates", 0.5, "weekly"),
    ...RESOURCE_TYPES.map(({ slug }) => entry(`/resources/${slug}`, 0.5)),
    entry("/blog", 0.6, "daily"),
    entry("/about-us", 0.4, "monthly"),
    entry("/contact-us", 0.4, "monthly"),
    entry("/become-a-guest-author", 0.4, "monthly"),
    entry("/careers", 0.4, "monthly"),
    entry("/leadership-retreats", 0.6),
    entry("/sitemap", 0.3, "weekly"),
    ...(await getTemplateSlugs()).map((slug) => entry(`/templates/${slug}`, 0.5, "monthly")),
    entry("/success-stories", 0.5, "monthly"),
    entry("/exceptional-customer-experience", 0.5, "monthly"),
    entry("/request-for-proposal", 0.5, "monthly"),
    entry("/case-studies", 0.5),
    ...getCaseStudySlugs().map((slug) => entry(`/case-study/${slug}`, 0.5, "monthly")),
    entry("/corporate-training-pricing", 0.6, "monthly"),
    entry("/trainer-platform", 0.5, "monthly"),
    entry("/training-for-universities-enquiry", 0.4, "monthly"),
    entry("/training-for-government-enquiry", 0.4, "monthly"),
    entry("/government-employees-training-courses", 0.6, "monthly"),
    entry("/training-for-universities", 0.6, "monthly"),
    entry("/partner-program", 0.5, "monthly"),
    entry("/privacy-policy", 0.1, "yearly"),
    entry("/terms-conditions", 0.1, "yearly"),
    entry("/modern-slavery-statement", 0.1, "yearly"),
  ];
}
