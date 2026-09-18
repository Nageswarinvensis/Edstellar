import { notFound } from "next/navigation";

import { TRAINERS_DATA } from "@/content/trainers/trainersdata";
import TrainerProfile from "@/components/sections/trainers details/trainerprofile";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import TrainerAbout from "@/components/sections/trainers details/trainerabout";
import OurReach from "@/components/sections/trainers details/ourreach";
import TrainerLocation from "@/components/sections/trainers details/trainerlocation";
import TrainerExpertise from "@/components/sections/trainers details/trainerexperties";
import TrainerExperience from "@/components/sections/trainers details/trainerexperience";
import CtaTrainer from "@/components/sections/trainers details/ctatrainer";
async function getTrainer(slug) {
  const response = await fetch(
    `https://devcms.edstellar.com/api/v2/trainer/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data?.trainer || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trainer = await getTrainer(slug);

  if (!trainer) {
    return {
      title: "Trainer | Edstellar",
    };
  }

  return {
    title: trainer?.meta?.meta_title || trainer?.name || "Trainer",
    description:
      trainer?.meta?.meta_description ||
      trainer?.meta?.about ||
      trainer?.profile_title ||
      "",
  };
}

export default async function TrainerPage({ params }) {
  const { slug } = await params;
  const trainer = await getTrainer(slug);

  if (!trainer) {
    notFound();
  }

  const stickyNavbarData = TRAINERS_DATA.stickyNavbarData;
  const experienceData = TRAINERS_DATA.experienceData;

  return (
    <>
      <TrainerProfile trainer={trainer} />
      <StickyTabs data={stickyNavbarData} />
      <TrainerAbout trainer={trainer} />
      <OurReach trainer={trainer} />
      <TrainerLocation trainer={trainer} />
      <TrainerExpertise trainer={trainer} />
      <TrainerExperience trainer={trainer} experienceData={experienceData} />
      <CtaTrainer trainer={trainer}/>
    </>
  );
}