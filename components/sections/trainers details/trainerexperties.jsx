"use client";

import { useState } from "react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import trainerContent from "@/content/trainer.json";

export default function TrainerExpertise({ trainer }) {
  const [showAll, setShowAll] = useState(false);
  const firstName = trainer.name.split(" ")[0];

  // The API's `skills` is a flat array of names with no per-skill metadata —
  // only the first (the trainer's primary domain) can honestly carry a real
  // "since"/"years" fact, from `training_since`/`meta.years_experience`.
  // The rest get a tier label + bar level by position (`skillTiers`), not a
  // fabricated specific year repeated identically across every skill.
  const skillsList = trainer.skills.length
    ? trainer.skills.map((title, index) => {
        const tier = trainerContent.skillTiers[index] || trainerContent.skillTierDefault;
        const isPrimary = index === 0;

        return {
          title,
          type: tier.type,
          years:
            isPrimary && trainer.meta?.years_experience
              ? `${trainer.meta.years_experience} years delivering`
              : "Active in curriculum",
          since: isPrimary ? trainer.training_since : null,
          level: tier.level,
        };
      })
    : trainerContent.skills;

  const displayedSkills = showAll ? skillsList : skillsList.slice(0, 6);

  return (
    <Section id="expertise" className="bg-paper-cream">
      <Box>
        {/* Section Header */}
        <Box className="max-w-2xl">
          <RichHeading
            heading="Areas of <span>expertise.</span>"
            className="tracking-tight"
            emphasisClassName="text-[18px] font-normal text-ink lg:text-[24px]"
          />
          <Text as="p" className="mt-3 text-[16px] text-ink">
            Topics {firstName} delivers as a corporate trainer, with depth shown by years of active delivery rather than self-rated stars.
          </Text>
        </Box>

        {/* 2-Column Grid */}
        <Box className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {displayedSkills.map((skill, idx) => (
            <Box
              key={idx}
              className="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm"
            >
              <Box>
                <Box className="flex items-center justify-between">
                  <Text as="h3" className="text-lg font-bold text-ink">
                    {skill.title}
                  </Text>
                  {skill.since && (
                    <Text as="span" className="font-mono text-xs text-[#64748b]">
                      {skill.since}
                    </Text>
                  )}
                </Box>
                <Text as="p" className="mt-1 text-xs text-[#64748b]">
                  {skill.type} · {skill.years}
                </Text>
              </Box>

              {/* Depth Bar */}
              <Box className="mt-6 h-1.5 w-full rounded-full bg-paper-cream">
                <Box
                  className="h-full rounded-full bg-ink"
                  style={{ width: skill.level }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        {/* Button with Arrow */}
        {skillsList.length > 6 && (
          <Box className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-lime transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(10,22,40,0.5)]"
            >
              <span>
                {showAll ? "Show less" : `Show all ${skillsList.length} areas of expertise`}
              </span>
              <span className="text-base leading-none">→</span>
            </button>
          </Box>
        )}
      </Box>
    </Section>
  );
}