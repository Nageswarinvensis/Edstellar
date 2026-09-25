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
import TrainerEngagements from "@/components/sections/trainers details/trainerengagements";
import TrainerRatings from "@/components/sections/trainers details/trainerratings";
import TrainerAccreditations from "@/components/sections/trainers details/traineraccreditations";
import CtaTrainer from "@/components/sections/trainers details/ctatrainer";
import Trainers from "@/components/common/trainers";
import Faq from "@/components/common/faq";
import JsonLd from "@/components/seo/json-ld";
import { parseCoursesWithStart } from "@/lib/trainer-history";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqJsonLd, personJsonLd } from "@/lib/seo/json-ld";

/** "A", "A and B", "A, B, and C". */
function formatList(items) {
  if (items.length <= 2) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function fillTemplate(template, values) {
  return template.replace(/\{(\w+)\}/g, (token, key) => values[key] ?? token);
}

/**
 * The FAQ copy lives in `content/trainer.json` as templates; this fills
 * them with this trainer's CMS facts (name, city, country, topics) and the
 * static delivery languages. The same items feed the visible FAQ and its
 * `FAQPage` JSON-LD.
 */
function buildTrainerFaq(trainer) {
  const { heading, items, topics } = trainerContent.faq;

  // Same topic source and order as the expertise section: courses (oldest
  // first) when the CMS has them, otherwise the flat `skills` list.
  const topicNames = parseCoursesWithStart(
    trainer.meta?.courses_with_start,
  ).map((course) => course.title);
  const allTopics = topicNames.length ? topicNames : (trainer.skills ?? []);
  const core = allTopics.slice(0, 3);
  const related = allTopics.slice(3, 6);

  const values = {
    name: trainer.name.split(" ")[0],
    city: trainer.city,
    country: trainer.country,
    languages: formatList(trainerContent.languages.map((lang) => lang.name)),
    core: formatList(core),
    related: formatList(related),
  };
  values.topics = fillTemplate(
    related.length ? topics.core_and_related : topics.core_only,
    values,
  );

  return {
    heading: fillTemplate(heading, values),
    items: items
      // Without any topics the topics answer would be empty — drop it.
      .filter((item) => item.answer !== "{topics}" || core.length)
      .map((item) => ({
        question: fillTemplate(item.question, values),
        answer: fillTemplate(item.answer, values),
      })),
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trainer = await getTrainer(slug);

  if (!trainer) {
    return {
      title: "Trainer | Edstellar",
    };
  }

  // The CMS's `meta_title` already ends in "| Edstellar", and the root
  // layout's title template appends it again — strip it here once.
  const title = (trainer.meta?.meta_title || trainer.name).replace(
    /\s*\|\s*Edstellar\s*$/i,
    "",
  );

  return buildMetadata({
    title,
    description:
      trainer.meta?.meta_description ||
      trainer.meta?.about ||
      trainer.profile_title,
    path: `/trainer/${trainer.slug}`,
    image: trainer.profile_image_url,
    type: "profile",
  });
}

export default async function TrainerPage({ params }) {
  const { slug } = await params;
  const trainer = await getTrainer(slug);

  if (!trainer) {
    notFound();
  }

  const otherTrainers = {
    heading: "Other <span>trainers</span>.",
    people: trainerContent.otherTrainers.filter(
      (item) => item.slug !== trainer.slug,
    ),
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Trainers", href: "/trainer" },
    { label: trainer.name },
  ];

  const faq = buildTrainerFaq(trainer);

  const jsonLd = [
    personJsonLd({
      name: trainer.name,
      jobTitle: trainer.profile_title,
      image: trainer.profile_image_url,
      path: `/trainer/${trainer.slug}`,
      city: trainer.city,
      country: trainer.country,
      languages: trainerContent.languages.map((lang) => lang.name),
    }),
    breadcrumbJsonLd(breadcrumbItems),
    faqJsonLd(faq.items),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <TrainerHero trainer={trainer} breadcrumbItems={breadcrumbItems} />
      <StickyTabs data={trainerContent.stickyNav} />
      <TrainerAbout trainer={trainer} />
      <OurReach trainer={trainer} />
      <TrainerLocation trainer={trainer} />
      <TrainerExpertise trainer={trainer} />
      <TrainerExperience trainer={trainer} />
      <TrainerEngagements trainer={trainer} />
      <TrainerRatings trainer={trainer} />
      <TrainerAccreditations trainer={trainer} />
      <CtaTrainer trainer={trainer} />
      <Trainers trainers={otherTrainers} desktopCards={4} />
      <Faq
        faqs={faq}
        innerClassName="max-w-[920px]"
        showCta={false}
        className="bg-paper-cream"
      />
    </>
  );
}
