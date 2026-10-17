import SectionNav from "@/components/common/section-nav";
import ProfileHero from "@/components/sections/trainer_profile/profile-hero";
import ProfileAbout from "@/components/sections/trainer_profile/profile-about";
import {
  Education,
  Projects,
  SkillCloud,
  TrainerFor,
  WorkExperience,
} from "@/components/sections/trainer_profile/profile-sections";
import Trainers from "@/components/common/trainers";
import { ProfileCta } from "@/components/sections/trainer_profile/profile-closing";
import ProgramLinks from "@/components/sections/trainer_profile/program-links";
import { fillTemplate } from "@/lib/template";

/**
 * `/trainer/{slug}` — a trainer's profile, top to bottom as in the design.
 * `profile` is the trainer's CMS record already parsed into display shape
 * (see the route); `page` is the static copy from
 * `content/trainers/trainer-page.js`.
 */
export default function TrainerProfilePage({ profile, page, breadcrumbs, otherTrainers, programs }) {
  const firstName = { name: profile.firstName };

  // The bar lists only sections this trainer has content for.
  const hasSection = {
    about: profile.about.length > 0,
    "trainer-for": profile.courses.length > 0,
    experience: profile.experience.length > 0,
    skills: profile.skills.length > 0,
    education: profile.education.length > 0,
    projects: profile.projects.length > 0,
  };

  return (
    <>
      <ProfileHero profile={profile} data={page.hero} breadcrumbs={breadcrumbs} />
      <SectionNav data={{ items: page.section_nav.filter((item) => hasSection[item.id]) }} />
      {hasSection.about ? (
        <ProfileAbout
          profile={profile}
          data={{ ...page.about, sub_heading: fillTemplate(page.about.sub_heading, firstName) }}
        />
      ) : null}
      <TrainerFor profile={profile} data={page.trainer_for} heading={fillTemplate(page.trainer_for.heading, firstName)} />
      <WorkExperience profile={profile} data={page.experience} />
      <SkillCloud profile={profile} data={page.skills} />
      <Education profile={profile} data={page.education} />
      <Projects profile={profile} data={page.projects} />
      <ProfileCta heading={fillTemplate(page.cta.heading, firstName)} button={page.cta.button} />
      {/* The same trainer carousel as domain pages, fed the same way: the
          section copy plus `dynamic_data`, a list of raw CMS trainer records. */}
      <Trainers trainers={{ heading: page.other_trainers.heading, dynamic_data: otherTrainers }} desktopCards={4} />
      <ProgramLinks heading={page.programs.heading} items={programs} />
    </>
  );
}
