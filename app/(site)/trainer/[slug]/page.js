import { notFound } from "next/navigation";

import { getTrainer } from "@/lib/content/trainers";
import trainerContent from "@/content/trainer.json";

import TrainerHero from "@/components/sections/trainers details/trainerhero";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import TrainerAbout from "@/components/sections/trainers details/trainerabout";
import OurReach from "@/components/sections/trainers details/ourreach";
import TrainerLocation from "@/components/sections/trainers details/trainerlocation";
import TrainerExpertise from "@/components/sections/trainers details/trainerexperties";
import TrainerExperience from "@/components/sections/trainers details/trainerexperience";
import TrainerRatings from "@/components/sections/trainers details/trainerratings";
import TrainerAccreditations from "@/components/sections/trainers details/traineraccreditations";
import CtaTrainer from "@/components/sections/trainers details/ctatrainer";
import OtherTrainers from "@/components/sections/trainers details/othertrainers";
import Faq from "@/components/sections/shared/faq";

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

  return (
    <>
      <TrainerHero trainer={trainer} />
      <StickyTabs data={trainerContent.stickyNav} />
      <TrainerAbout trainer={trainer} />
      <OurReach trainer={trainer} />
      <TrainerLocation trainer={trainer} />
      <TrainerExpertise trainer={trainer} />
      <TrainerExperience trainer={trainer} />
      <TrainerRatings trainer={trainer} />
      <TrainerAccreditations trainer={trainer} />
      <CtaTrainer trainer={trainer} />
      <OtherTrainers trainer={trainer} />
      <Faq
        faqs={trainerContent.faq}
        innerClassName="max-w-[920px] mx-0"
        showCta={false}
        className="bg-paper-cream"
      />
    </>
  );
}
