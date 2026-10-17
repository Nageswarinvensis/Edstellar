import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

/*
 * The trainer profile's CMS-driven sections, in page order. Each renders
 * nothing when the trainer record has no data for it, so a sparse profile
 * collapses cleanly instead of showing empty headings.
 */

/** "{name} is a Corporate Trainer For" — a card per course with its start
 * date. Design: amol-pune-india `.trainfor-grid`, `.tf-card`. */
export function TrainerFor({ profile, data, heading }) {
  if (!profile.courses.length) return null;

  return (
    <Section id="trainer-for" aria-labelledby="tf-h" className="scroll-mt-32 bg-paper-warm">
      <Reveal className="mb-7">
        <RichHeading as="h2" id="tf-h" heading={heading} />
      </Reveal>
      <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {profile.courses.map((course, index) => (
          <Reveal key={course.title} delay={(index % 5) * 0.5}>
            <Box className="h-full rounded-[14px] border border-ink/12 bg-white p-5.5">
              <Text as="h3" className="mb-2.5 text-[18px] leading-[1.25]">
                {course.title}
              </Text>
              {course.since ? (
                <Text as="p" className="text-[14px]">
                  <Text as="span" className="block font-mono text-[10.5px] tracking-[0.1em] text-ink/55 uppercase">
                    {data.since_label}
                  </Text>
                  <Text as="span" className="mt-1 block font-display text-[15px] font-semibold text-ink">
                    {course.since}
                  </Text>
                </Text>
              ) : null}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}

/** "Work Experience" — a timeline of roles with their responsibilities, the
 * current one marked lime. Design: amol-pune-india `.timeline`, `.tl-item`. */
export function WorkExperience({ profile, data }) {
  if (!profile.experience.length) return null;

  return (
    <Section id="experience" aria-labelledby="xp-h" className="scroll-mt-32 bg-paper">
      <Reveal className="mb-8">
        <RichHeading as="h2" id="xp-h" heading={data.heading} />
      </Reveal>
      <Box as="ol" className="m-0 max-w-[780px] list-none border-l-2 border-ink/12 p-0 pl-7">
        {profile.experience.map((item, index) => (
          <Reveal as="li" key={`${item.role}-${index}`} className="relative pb-10 last:pb-0">
            <Box
              as="span"
              aria-hidden="true"
              className={cn(
                "absolute top-1.5 -left-[37px] size-4 rounded-full border-2 border-navy",
                item.is_current ? "bg-lime" : "bg-paper",
              )}
            />
            <Text as="h3" className="text-[clamp(18px,1.8vw,21px)] leading-[1.3]">
              {item.role}
            </Text>
            <Text as="p" className="mt-1.5 font-mono text-[13px] tracking-[0.02em] text-ink/55">
              {[item.company_or_industry, item.duration].filter(Boolean).join(" · ")}
            </Text>
            {item.highlights.length ? (
              <>
                <Text as="p" className="mt-5 mb-2.5 font-mono text-[10.5px] tracking-[0.14em] text-ink/55 uppercase">
                  {data.responsibilities_label}
                </Text>
                <Box as="ul" className="m-0 list-disc space-y-2.5 pl-5 text-[15px] leading-[1.65] text-ink/80 marker:text-ink/25">
                  {item.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </Box>
              </>
            ) : null}
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}

/** "Skills" — every CMS skill as a pill, the first few highlighted lime.
 * Design: amol-pune-india `.skill-cloud`. */
export function SkillCloud({ profile, data }) {
  if (!profile.skills.length) return null;

  return (
    <Section id="skills" aria-labelledby="sk-h" className="scroll-mt-32 bg-paper-warm">
      <Reveal className="mb-6">
        <Text as="h2" id="sk-h">
          {data.heading}
        </Text>
      </Reveal>
      <Reveal delay={1}>
        <Box as="ul" className="m-0 flex list-none flex-wrap gap-2.5 p-0">
          {profile.skills.map((skill, index) => (
            <Box
              as="li"
              key={skill}
              className={cn(
                "rounded-full border px-4 py-2 text-[14.5px] font-medium text-ink",
                index < data.highlighted ? "border-lime-soft bg-lime-soft" : "border-ink/12 bg-white",
              )}
            >
              {skill}
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}

/** "Education" — a card per school. Design: amol-pune-india `.edu-grid`. */
export function Education({ profile, data }) {
  if (!profile.education.length) return null;

  return (
    <Section id="education" aria-labelledby="edu-h" className="scroll-mt-32 bg-paper">
      <Reveal className="mb-6">
        <Text as="h2" id="edu-h">
          {data.heading}
        </Text>
      </Reveal>
      <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {profile.education.map((item, index) => (
          <Reveal key={`${item.school}-${index}`} delay={index * 0.5}>
            <Box className="h-full rounded-[14px] border border-ink/12 bg-white px-6 py-5.5">
              <Text as="h3" className="text-[19px] leading-[1.3]">
                {item.school}
              </Text>
              {item.field ? (
                <Text as="p" className="mt-1.5 text-[15px]">
                  {item.field}
                </Text>
              ) : null}
              {item.years ? (
                <Text as="p" className="mt-2.5 font-mono text-[12.5px] text-ink/55">
                  {item.years}
                </Text>
              ) : null}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}

/** "Projects" — a card per CMS project with its sector and dates.
 * Design: amol-pune-india `.eng-grid`, `.eng-card`. */
export function Projects({ profile, data }) {
  if (!profile.projects.length) return null;

  return (
    <Section id="projects" aria-labelledby="proj-h" className="scroll-mt-32 bg-paper-warm">
      <Reveal className="mb-6">
        <Text as="h2" id="proj-h">
          {data.heading}
        </Text>
      </Reveal>
      <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profile.projects.map((project, index) => (
          <Reveal key={`${project.role}-${index}`} delay={(index % 3) * 0.5}>
            <Box className="flex h-full flex-col rounded-[14px] border border-ink/12 bg-white p-6">
              {project.company_or_industry ? (
                <Text as="span" className="mb-3 self-start rounded-full bg-lime-soft px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
                  {project.company_or_industry}
                </Text>
              ) : null}
              <Text as="h3" className="mb-4 flex-1 text-[18px] leading-[1.3]">
                {project.role}
              </Text>
              {project.duration ? (
                <Text as="p" className="border-t border-ink/10 pt-4 font-mono text-[12.5px] text-ink/55">
                  {project.duration}
                </Text>
              ) : null}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
