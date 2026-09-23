import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import Breadcrumbs from "@/components/common/breadcrumbs";
import HeroMeta from "@/components/common/hero-meta";
import CtaButton from "@/components/common/cta-button";
import TnaSkillMatrix from "./tna-skill-matrix";
import LdRightSideBlock from "../learning development consulting/l d right side block";
import { cn } from "@/lib/utils";

export default function TNAHero({
  data,
  breadcrumbItems,
  hero,
  customWeight,
  customColor,
  rightSideComponent,
}) {
  if (!data) return null;

  // Extract meta items from either hero prop or data object
  const metaItems = hero?.meta || data?.meta || [];

  // Check showMeta flag (defaults to true if showMeta is undefined)
  const shouldShowMeta =
    (hero?.showMeta ?? data?.showMeta ?? true) && metaItems.length > 0;

  // READ FROM JSON DATA/HERO OBJECT OR PROPS
  const weightClass = customWeight || hero?.fontWeight || data?.fontWeight;
  const colorClass = customColor || hero?.textColor || data?.textColor;

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
                  items={metaItems}
                  className={cn("mt-6", weightClass, colorClass)}
                />
              </Reveal>
            )}

            {/* Action Buttons */}
            <Reveal delay={4}>
              <Box className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {data.primaryBtnText && (
                  <CtaButton arrow>{data.primaryBtnText}</CtaButton>
                )}

                {data.secondaryBtnText && (
                  <CtaButton variant="ghost" arrow>
                    {data.secondaryBtnText}
                  </CtaButton>
                )}
              </Box>
            </Reveal>
          </Box>

          {/* Right Side Conditional Rendering per page */}
          <Box className="min-w-0">
            {rightSideComponent ? (
              rightSideComponent
            ) : data.learning_system ? (
              /* Image 2 Card */
              <LdRightSideBlock data={data.learning_system} />
            ) : data.skill_matrix ? (
              /* Image 1 Card */
              <TnaSkillMatrix data={data.skill_matrix} />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}