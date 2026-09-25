import Image from "next/image";

import Box from "@/components/ui/Box";
import { CtaButton } from "@/components/common/cta-button";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/common/breadcrumbs";
import trainerContent from "@/content/trainer.json";

export default function TrainerHero({ trainer, breadcrumbItems }) {

  const visibleSkills = trainer.skills.slice(0, 3);
  const remainingSkills = Math.max(
    trainer.skills.length - visibleSkills.length,
    0,
  );

  const location = [trainer.city, trainer.country].join(", ");

  // Static for now — the CMS doesn't send a delivery reach yet.
  const reach = trainerContent.deliveryReach;
  const deliveryReachText = `Based in ${location}${reach ? ` · Delivering across ${reach}` : ""}`;

  const statsData = [
    { label: "BASE LOCATION", value: location },
    { label: "TRAINER SINCE", value: trainer.training_since },
    {
      label: "LANGUAGES",
      value: trainer.languages
        ? trainer.languages.join(" · ")
        : trainerContent.languages.map((lang) => lang.name).join(" · "),
    },
    {
      label: "DELIVERY",
      value: trainer.delivery_mode || trainerContent.deliveryMode,
    },
  ];

  return (
    <>
      <Section className="pt-0! pb-5!">
        <Breadcrumbs items={breadcrumbItems} tone="white" />
      </Section>
      <Section id="top" className="w-full bg-ink pb-0!">
        <Box className="grid items-center gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <Box className="relative mx-auto w-full max-w-55 lg:mx-0">
            <Box className="relative aspect-square overflow-hidden rounded-[16px]">
              <Image
                src={trainer.profile_image_url}
                alt={trainer.name}
                fill
                priority
                sizes="220px"
                className="object-cover"
              />
            </Box>

            {/* "Available to book" Badge */}
            <Box className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-[11px] font-bold text-ink shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              Available to book
            </Box>
          </Box>

          <Box className="min-w-0">
            {/* Trainer Name */}
            <Text as="h1" className="tracking-tight text-white">
              {trainer.name}
            </Text>

            {/* Profile Title */}
            <Text
              as="p"
              className="mt-2 font-serif text-[18px] italic text-lime sm:text-[24px]"
            >
              {trainer.profile_title}
            </Text>

            {/* Subtitle / Delivery Reach */}
            <Text as="p" className="mt-2 text-[14px] text-white/70">
              {deliveryReachText}
            </Text>

            {/* Skill Tags */}
            {visibleSkills.length > 0 && (
              <Box className="mt-5 flex flex-wrap items-center gap-2">
                {visibleSkills.map((skill) => (
                  <Text
                    as="span"
                    key={skill}
                    className="rounded-full border border-[#ccf244]/30 bg-[#ccf244]/10 px-3.5 py-1.5 text-[12px] font-medium text-lime"
                  >
                    {skill}
                  </Text>
                ))}

                {remainingSkills > 0 && (
                  <Text
                    as="span"
                    className="rounded-full border border-white/20 px-3 py-1.5 text-[12px] font-medium text-white/80"
                  >
                    +{remainingSkills} more
                  </Text>
                )}
              </Box>
            )}

            {/* Buttons */}
            <Box className="mt-6 flex flex-wrap items-center gap-3">
              <CtaButton color="lime" arrow render={<a href="#contact" />}>
                Talk to Edstellar Consultant
              </CtaButton>

              <CtaButton
                variant="ghost"
                arrow
                render={<a href="#trainer-details" />}
                className="border-white/25 text-white hover:border-white hover:bg-white/5"
              >
                See delivery reach
              </CtaButton>
            </Box>
          </Box>
        </Box>

        <Box className="relative left-1/2 mt-10 w-screen -translate-x-1/2 border-t border-white/10 bg-[#050d1a66] px-5 py-5 lg:px-10">
          <Box className="rail-container mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 lg:gap-8">
            {statsData.map((stat, index) => (
              <Box key={index} className="flex flex-col gap-1">
                <Text
                  as="span"
                  className="text-[11px] font-bold uppercase tracking-wider text-white/40"
                >
                  {stat.label}
                </Text>
                <Text as="span" className="text-[16px] font-bold text-white">
                  {stat.value}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Section>
    </>
  );
}
