import Image from "next/image";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function TrainerHero({ trainer }) {
  const skills = trainer?.skills || [];
  const visibleSkills = skills.slice(0, 3);
  const remainingSkills = Math.max(skills.length - visibleSkills.length, 0);

  const location = [trainer?.city, trainer?.country]
    .filter(Boolean)
    .join(", ");

  // Map API fields with static fallbacks matching image details
  const statsData = [
    {
      label: "BASE LOCATION",
      value: location || "Delhi, India",
    },
    {
      label: "TRAINER SINCE",
      value: trainer?.training_since || "May 201",
    },
    {
      label: "LANGUAGES",
      value: trainer?.languages
        ? trainer.languages.join(" • ")
        : "English • French",
    },
    {
      label: "DELIVERY",
      value: trainer?.delivery_mode || "Onsite & Virtual",
    },
  ];

  return (
    <Box className="bg-ink text-white">
      {/* Hero Content Section */}
      <Box className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-14">
        <Box className="grid items-center gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          <Box className="relative mx-auto w-full max-w-70">
            <Box className="relative aspect-square overflow-hidden rounded-[12px]">
              {trainer?.profile_image_url ? (
                <Image
                  src={trainer.profile_image_url}
                  alt={trainer?.name || "Trainer"}
                  fill
                  priority
                  sizes="280px"
                  className="object-cover"
                />
              ) : (
                <Box className="flex h-full w-full items-center justify-center bg-ink text-sm text-white/60">
                  No image
                </Box>
              )}
            </Box>

            <Box className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-[12px] font-semibold text-ink">
              <Box className="h-2 w-2 rounded-full bg-[#081528]" />
              Available to book
            </Box>
          </Box>

          <Box className="min-w-0">
            <Text
              as="h1"
              className="text-[42px] font-bold leading-[1.05] tracking-[-0.035em] text-white sm:text-[48px] lg:text-[50px]"
            >
              {trainer?.name}
            </Text>

            {trainer?.profile_title && (
              <Text
                as="p"
                className="mt-5 font-serif text-[20px] italic leading-[1.3] text-lime sm:text-[22px]"
              >
                {trainer.profile_title}
              </Text>
            )}

            {location && (
              <Text as="p" className="mt-4 text-[16px] leading-6 text-paper-cream">
                Based in {location}
              </Text>
            )}

            {visibleSkills.length > 0 && (
              <Box className="mt-6 flex flex-wrap gap-2">
                {visibleSkills.map((skill) => (
                  <Text
                    as="span"
                    key={skill}
                    className="rounded-full border border-[#c8f13547] bg-[#c8f1351f] px-3 py-1.5 text-[12px] font-medium text-lime"
                  >
                    {skill}
                  </Text>
                ))}

                {remainingSkills > 0 && (
                  <Text
                    as="span"
                    className="rounded-full border border-[#FAFAF738] px-3 py-1.5 text-[12px] font-medium text-white"
                  >
                    +{remainingSkills} more
                  </Text>
                )}
              </Box>
            )}

            <Box className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="inline-flex min-h-12.5 items-center justify-center rounded-full bg-lime px-7 text-[14px] font-semibold text-ink transition-opacity hover:opacity-90"
              >
                Talk to Edstellar Consultant
              </Link>

              <a
                href="#trainer-details"
                className="inline-flex min-h-12.5 items-center justify-center rounded-full border border-[#697589] px-7 text-[14px] font-semibold text-white transition-colors hover:border-white"
              >
                See trainer details
              </a>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Stats/Details Bar Section */}
      <Box className="border-t border-b border-[#263246] bg-[#070e1b] py-6">
        <Box className="mx-auto max-w-7xl px-5 lg:px-8">
          <Box className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-4 md:gap-8">
            {statsData.map((stat, index) => (
              <Box key={index} className="flex flex-col gap-1">
                <Text
                  as="span"
                  className="text-[12px] font-semibold uppercase tracking-wider text-[#8fa0b5]"
                >
                  {stat.label}
                </Text>
                <Text
                  as="span"
                  className="text-[16px] font-bold text-white sm:text-[16px]"
                >
                  {stat.value}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}