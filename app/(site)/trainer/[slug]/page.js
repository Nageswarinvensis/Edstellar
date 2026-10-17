import { notFound } from "next/navigation";

import { getTrainer, getTrainersBySlugs } from "@/lib/content/trainers";
import { TRAINER_PAGE } from "@/content/trainers/trainer-page";
import { LATEST_COURSES } from "@/content/latest-courses";
import SchemaOrg from "@/components/seo/schema-org";
import TrainerProfilePage from "@/components/templates/trainer-profile-page";
import {
  countryFlag,
  formatDuration,
  formatMonthYear,
  parseCoursesWithStart,
  parseEducation,
  parseTrainerHistory,
  tidyPlaceName,
} from "@/lib/trainer-history";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

// The CMS has no trainer index, so the trainers this page already knows
// (the "Other trainers" list) are prerendered; any other profile renders on
// first request and is cached from then on (`dynamicParams` stays on).
export function generateStaticParams() {
  return TRAINER_PAGE.other_trainers.slugs.map((slug) => ({ slug }));
}

/** "Emotional Intelligence Trainer in Pune" → the city as the heading's
 * italic accent. Titles without a trailing "in {city}" stay plain. */
function titleHeading(title, city) {
  const suffix = ` in ${city}`;
  return city && title?.endsWith(suffix) ? `${title.slice(0, -city.length)}<span>${city}</span>` : title;
}

/**
 * The CMS trainer record in display shape. The record packs its lists into
 * `||`-separated strings (`meta.about`, `courses_with_start`, `work_history`,
 * `projects`, `education`); `lib/trainer-history.js` unpacks them.
 */
function toProfile(trainer) {
  const meta = trainer.meta ?? {};
  const city = tidyPlaceName(trainer.city);
  const location = [city, trainer.country].filter(Boolean).join(", ");

  return {
    slug: trainer.slug,
    name: trainer.name,
    firstName: trainer.name.split(" ")[0],
    title: trainer.profile_title,
    titleHeading: titleHeading(trainer.profile_title, city),
    image: trainer.profile_image_url,
    location,
    flag: countryFlag(trainer.country),
    since: formatMonthYear(trainer.training_since),
    // Courses keep the CMS's order, which is the order the designs show.
    courses: parseCoursesWithStart(meta.courses_with_start, { sort: false }).map((course) => ({
      title: course.title,
      since: course.since ? formatMonthYear(course.since) : null,
    })),
    about: (meta.about ?? "").split(/\s*\|\|\s*/).filter(Boolean),
    experience: parseTrainerHistory(meta.work_history).map((item) => ({
      ...item,
      duration: formatDuration(item.duration),
    })),
    skills: trainer.skills ?? [],
    education: parseEducation(meta.education),
    projects: parseTrainerHistory(meta.projects).map((item) => ({
      ...item,
      duration: formatDuration(item.duration, {
        comma: false,
        present: TRAINER_PAGE.projects.present_label,
      }),
    })),
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trainer = await getTrainer(slug);
  if (!trainer) return {};

  // The CMS's `meta_title` already ends in "| Edstellar", and the root
  // layout's title template appends it again — strip it here once.
  const title = (trainer.meta?.meta_title || trainer.name).replace(/\s*\|\s*Edstellar\s*$/i, "");

  return buildMetadata({
    title,
    description: trainer.meta?.meta_description || trainer.profile_title,
    path: `/trainer/${trainer.slug}`,
    image: trainer.profile_image_url,
    type: "profile",
    // Trainer profiles are kept out of search (noindex, nofollow).
    noIndex: true,
  });
}

/**
 * Trainer profile — every fact from `GET /api/v2/trainer/{slug}`, the static
 * copy from `content/trainers/trainer-page.js`. "Other trainers" are real
 * CMS profiles too, read by slug and shown in the shared trainer carousel.
 */
export default async function TrainerPage({ params }) {
  const { slug } = await params;
  const trainer = await getTrainer(slug);
  if (!trainer) notFound();

  const profile = toProfile(trainer);
  const { slugs, limit } = TRAINER_PAGE.other_trainers;
  const otherTrainers = await getTrainersBySlugs(slugs, trainer.slug, limit);
  const breadcrumbs = [...TRAINER_PAGE.breadcrumbs, { label: trainer.name, href: null }];

  return (
    <>
      <SchemaOrg
        person={{
          name: trainer.name,
          jobTitle: trainer.profile_title,
          image: trainer.profile_image_url,
          path: `/trainer/${trainer.slug}`,
          city: profile.location.split(",")[0],
          country: trainer.country,
        }}
        breadcrumbs={breadcrumbs}
      />
      <TrainerProfilePage
        profile={profile}
        page={TRAINER_PAGE}
        breadcrumbs={breadcrumbs}
        otherTrainers={otherTrainers}
        programs={LATEST_COURSES}
      />
    </>
  );
}
