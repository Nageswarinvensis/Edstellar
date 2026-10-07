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

  // The site-pages CMS splits the hero into `heroLeft` (copy and buttons) and
  // `heroRight` (the right-hand panel); local content keeps it flat.
  const left = data.heroLeft ?? data;
  const right = data.heroRight ?? data;

  // A CMS list-type field arrives as a list; local content sends the object.
  // Pick the first entry that actually has items — the CMS can carry an empty
  // placeholder entry ahead of the real one — and otherwise fall back to the
  // page's own card.
  const firstOf = (value) => (Array.isArray(value) ? value[0] : value);
  const cmsCard = Array.isArray(right.learning_system)
    ? right.learning_system.find((card) => card?.items?.length)
    : right.learning_system;
  const learningSystem = cmsCard?.items?.length ? cmsCard : firstOf(data.learning_system);

  // `…BtnLink` is the site-pages CMS field; `…BtnHref` the local-content one.
  const primaryHref = left.primaryBtnLink || left.primaryBtnHref;
  const secondaryHref = left.secondaryBtnLink || left.secondaryBtnHref;

  // Shown only when the page asks for it — a missing flag means hidden.
  const shouldShowMeta = left.showMeta === true;

  // The consulting designs' meta row: regular weight, muted, wider tracking
  // (HeroMeta's own default is the course hero's semibold ink).
  const weightClass = customWeight || left.fontWeight || "font-normal";
  const colorClass = customColor || left.textColor || "text-ink-muted";

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
                {left.title}
              </Text>
            </Reveal>

            {left.tagline && (
              <Reveal delay={1}>
              <Text
                as="p"
                className="mt-4 max-w-[34ch] font-serif text-[clamp(18px,1.8vw,22px)] font-normal italic leading-[1.3] text-ink"
              >
                {left.tagline}
              </Text>
              </Reveal>
            )}

            {left.description && (
              <Reveal delay={2}>
                <Text
                  as="p"
                  className="mt-6 text-[16px] font-normal leading-relaxed text-ink-muted"
                >
                  {left.description}
                </Text>
              </Reveal>
            )}

            {/* calling HeroMeta comp. & conditionally applying font weight and text color */}
            {shouldShowMeta && (
              <Reveal delay={3}>
                <HeroMeta
                  items={HERO_META}
                  className={cn("mt-6 tracking-[0.12em]", weightClass, colorClass)}
                />
              </Reveal>
            )}

            {/* Action Buttons */}
            <Reveal delay={4}>
              <Box className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {left.primaryBtnText && (
                  <CtaButton
                    arrow
                    render={
                      primaryHref ? (
                        <a href={primaryHref} />
                      ) : undefined
                    }
                  >
                    {left.primaryBtnText}
                  </CtaButton>
                )}

                {left.secondaryBtnText && (
                  <CtaButton
                    variant="ghost"
                    arrow
                    render={
                      secondaryHref ? (
                        <a href={secondaryHref} />
                      ) : undefined
                    }
                  >
                    {left.secondaryBtnText}
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
            ) : learningSystem?.items?.length ? (
              /* Image 2 Card */
              <LearningSystemCard data={learningSystem} />
            ) : right.skill_matrix?.rows?.length ? (
              /* Image 1 Card */
              <SkillMatrix data={right.skill_matrix} />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}