import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import Breadcrumbs from "@/components/common/breadcrumbs";
import HeroMeta from "@/components/common/hero-meta";
import CtaButton from "@/components/common/cta-button";
import SkillMatrix from "./skill-matrix";
import LearningSystemCard from "./learning-system-card";
import { cn } from "@/lib/utils";

/** The hero meta row — the same on every page that shows it (`showMeta: true`). */
const HERO_META = [
  "Consulting & delivery",
  "Onsite / virtual / hybrid",
  {
    label: "20+ industries",
    tooltip: {
      heading: "Industries we serve",
      body: "Technology, healthcare, financial services, manufacturing, retail, energy and more",
    },
  },
  {
    label: "100+ locations",
    tooltip: {
      heading: "Global delivery",
      body: "Global delivery across APAC, the Middle East, Europe, North America and India",
    },
  },
];

export default function ConsultingHero({
  data,
  breadcrumbItems,
  customWeight,
  customColor,
  rightSideComponent,
}) {
  if (!data) return null;

  // `…BtnLink` is the site-pages CMS field; `…BtnHref` the local-content one.
  const primaryHref = data?.primaryBtnLink || data?.primaryBtnHref;
  const secondaryHref = data?.secondaryBtnLink || data?.secondaryBtnHref;

  // Shown only when the page asks for it — a missing flag means hidden.
  const shouldShowMeta = data?.showMeta === true;

  // READ FROM JSON DATA/HERO OBJECT OR PROPS
  const weightClass = customWeight || data?.fontWeight;
  const colorClass = customColor || data?.textColor;

  return (
    <Section id="top" className="bg-[#f8f7f4]">
      <Reveal>
        {breadcrumbItems ? <Breadcrumbs items={breadcrumbItems} /> : null}
      </Reveal>
      <Box>
        <Box className="grid grid-cols-[1.15fr_0.85fr] items-center gap-14 max-[901px]:grid-cols-1 max-[901px]:gap-9">
          {/* Left Side Content */}
          <Box className="min-w-0">
            <Reveal>
              <Text as="h1" className="mt-4">
                {data.title}
              </Text>
            </Reveal>

            {data.tagline && (
              <Reveal delay={1}>
              <Text
                as="p"
                className="mt-4 font-serif text-[18px] font-normal italic text-ink"
              >
                {data.tagline}
              </Text>
              </Reveal>
            )}

            {data.description && (
              <Reveal delay={2}>
                <Text
                  as="p"
                  className="mt-6 text-[16px] font-normal leading-relaxed text-ink-muted"
                >
                  {data.description}
                </Text>
              </Reveal>
            )}

            {/* calling HeroMeta comp. & conditionally applying font weight and text color */}
            {shouldShowMeta && (
              <Reveal delay={3}>
                <HeroMeta
                  items={HERO_META}
                  className={cn("mt-6", weightClass, colorClass)}
                />
              </Reveal>
            )}

            {/* Action Buttons */}
            <Reveal delay={4}>
              <Box className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {data.primaryBtnText && (
                  <CtaButton
                    arrow
                    render={
                      primaryHref ? (
                        <a href={primaryHref} />
                      ) : undefined
                    }
                  >
                    {data.primaryBtnText}
                  </CtaButton>
                )}

                {data.secondaryBtnText && (
                  <CtaButton
                    variant="ghost"
                    arrow
                    render={
                      secondaryHref ? (
                        <a href={secondaryHref} />
                      ) : undefined
                    }
                  >
                    {data.secondaryBtnText}
                  </CtaButton>
                )}
              </Box>
            </Reveal>
          </Box>

          {/* Right Side Conditional Rendering per page. Each panel needs actual
              content — the CMS sends empty placeholders (e.g. `learning_system: []`
              on the TNA page) that would otherwise win and render blank. */}
          <Box className="min-w-0">
            {rightSideComponent ? (
              rightSideComponent
            ) : data.learning_system?.items?.length ? (
              /* Image 2 Card */
              <LearningSystemCard data={data.learning_system} />
            ) : data.skill_matrix?.rows?.length ? (
              /* Image 1 Card */
              <SkillMatrix data={data.skill_matrix} />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}