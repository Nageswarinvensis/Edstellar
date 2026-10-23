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

/** The hero meta row on every page that shows it (`showMeta: true`). The
 * first item is overridden per page by `heroLeft.small_text`. */
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
    label: "100+ countries",
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
  className,
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
    // 60px above and below on the consulting pages; the sector and partner
    // heroes, which reuse this one, pass their own `className` padding.
    <Section id="top" className={cn("bg-[#f8f7f4] py-[60px] lg:py-[60px]", className)}>
      <Box>
        <Box className="grid grid-cols-[1.05fr_1fr] items-center gap-12 max-[901px]:grid-cols-1 max-[901px]:gap-9">
          {/* Left Side Content */}
          <Box className="min-w-0">
            <Reveal>
              <Text as="h1">
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
                  // A page can replace the whole row (`heroLeft.meta_items`,
                  // HeroMeta's own item shape) or just its first item
                  // (`heroLeft.small_text`); otherwise the default row.
                  items={
                    left.meta_items?.length
                      ? left.meta_items
                      : left.small_text
                        ? [left.small_text, ...HERO_META.slice(1)]
                        : HERO_META
                  }
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

            {/* Below the buttons, as in the course and domain heroes. */}
            {breadcrumbItems ? (
              <Reveal delay={4}>
                <Breadcrumbs items={breadcrumbItems} />
              </Reveal>
            ) : null}
          </Box>

          {/* Right Side Conditional Rendering per page. Each panel needs actual
              content — the CMS sends empty placeholders (e.g. `learning_system: []`
              on the TNA page) that would otherwise win and render blank.
              When the CMS sends `hero_right_image`, show that image alone. */}
          <Box
            className={cn(
              "min-w-0",
              // The CMS image fills the row's full height (set by the copy on
              // the left) from 901px; stacked, it keeps its natural size.
              data.hero_right_image && "min-[901px]:relative min-[901px]:self-stretch",
            )}
          >
            {data.hero_right_image ? (
              <img
                src={data.hero_right_image}
                alt={data.hero_right_image_alt || left.title || "Edstellar consulting"}
                width={800}
                height={600}
                loading="eager"
                className="h-auto w-full rounded-xl object-contain min-[901px]:absolute min-[901px]:inset-0 min-[901px]:size-full"
              />
            ) : rightSideComponent ? (
              rightSideComponent
            ) : learningSystem?.items?.length ? (
              <LearningSystemCard data={learningSystem} />
            ) : right.skill_matrix?.rows?.length ? (
              <SkillMatrix data={right.skill_matrix} />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}