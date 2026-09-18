"use client";

import { useState } from "react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";

export default function TrainerExpertise({ trainer }) {
  const [showAll, setShowAll] = useState(false);
  const firstName = trainer?.name?.split(" ")[0] || "Amara";

  // Normalize API skills or fall back to image data
  const skillsList = trainer?.skills?.length
    ? trainer.skills.map((item) => ({
        title: typeof item === "string" ? item : item.title || item.name,
        type: item.type || "Core",
        years: item.years || "5 years delivering",
        since: item.since || "Since 2018",
        level: item.level || "70%",
      }))
    : [
        { title: "Leadership Development", type: "Flagship", years: "11 years delivering", since: "Since 2013", level: "95%" },
        { title: "Change Management", type: "Core", years: "10 years delivering", since: "Since 2014", level: "90%" },
        { title: "Team Effectiveness", type: "Core", years: "9 years delivering", since: "Since 2015", level: "85%" },
        { title: "Emotional Intelligence", type: "Established", years: "7 years delivering", since: "Since 2017", level: "75%" },
        { title: "Coaching Skills for Managers", type: "Established", years: "6 years delivering", since: "Since 2018", level: "65%" },
        { title: "Difficult Conversations", type: "Active", years: "5 years delivering", since: "Since 2019", level: "55%" },
      ];

  const displayedSkills = showAll ? skillsList : skillsList.slice(0, 6);

  return (
    <Section id="expertise" className="bg-paper-cream">
      <Box>
        {/* Section Header */}
        <Box className="max-w-2xl">
          <Text as="h2" className="text-[30px] font-bold tracking-tight lg:text-[36px]">
            Areas of{" "}
            <Text as="span" className="font-Cormorant Garamond text-[18px] font-normal text-ink lg:text-[24px]">
              expertise.
            </Text>
          </Text>
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
                  <Text as="span" className="font-mono text-xs text-[#64748b]">
                    {skill.since}
                  </Text>
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