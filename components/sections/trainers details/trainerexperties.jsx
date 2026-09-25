"use client";

import { useState } from "react";
import Box from "@/components/ui/Box";
import { CtaButton } from "@/components/common/cta-button";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import { fillTemplate } from "@/lib/template";
import { parseCoursesWithStart, yearsSince } from "@/lib/trainer-history";

function yearsDelivering(years) {
  if (years === null) return "Active in curriculum";
  if (years === 0) return "Under a year delivering";
  return `${years} ${years === 1 ? "year" : "years"} delivering`;
}

export default function TrainerExpertise({ trainer, data }) {
  const [showAll, setShowAll] = useState(false);
  const firstName = trainer.name.split(" ")[0];

  // Real per-topic start dates come from `meta.courses_with_start`, oldest
  // first — each card gets its own "Since YYYY" and years of delivery. The
  // tier label + bar level (`skillTiers`) is by that rank.
  const courses = parseCoursesWithStart(trainer.meta?.courses_with_start);

  // Fallback for a trainer with no courses: `skills` is a flat array of
  // names with no per-skill metadata, so only the first (the primary domain)
  // can honestly carry a real "since"/"years" fact, from `training_since` /
  // `meta.years_experience` — not a fabricated year repeated on every skill.
  const skillsList = courses.length
    ? courses.map((course, index) => {
        const tier = data.skillTiers[index] || data.skillTierDefault;

        return {
          title: course.title,
          type: tier.type,
          years: yearsDelivering(yearsSince(course.start)),
          since: course.start ? `Since ${course.start.getFullYear()}` : null,
          level: tier.level,
        };
      })
    : trainer.skills.length
      ? trainer.skills.map((title, index) => {
          const tier = data.skillTiers[index] || data.skillTierDefault;
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
      : data.skills;

  const displayedSkills = showAll ? skillsList : skillsList.slice(0, 6);

  return (
    <Section id="expertise" className="bg-paper-cream">
      <Box>
        {/* Section Header */}
        <Box className="max-w-2xl">
          <RichHeading
            heading={data.heading}
            className="tracking-tight"
            emphasisClassName="font-normal"
          />
          <Text as="p" className="mt-3 text-[16px] text-ink">
            {fillTemplate(data.description, { name: firstName })}
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
                    <Text
                      as="span"
                      className="font-mono text-xs text-[#64748b]"
                    >
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
            <CtaButton type="button" arrow onClick={() => setShowAll(!showAll)}>
              {showAll
                ? data.show_less_label
                : fillTemplate(data.show_all_label, {
                    count: skillsList.length,
                  })}
            </CtaButton>
          </Box>
        )}
      </Box>
    </Section>
  );
}
