import VerifiedTrainer from "@/components/sections/company/trainers-platform/verified-trainer";
import ReviewCards from "@/components/sections/company/trainers-platform/reviewcards";


import pageData from "@/content/company/trainers-platform.json"

export default function Page() {
  return (
    <>
      <VerifiedTrainer data={pageData.verified_trainer_Data} />
      <ReviewCards data={pageData.review_cards_Data} />
    </>
  );
}