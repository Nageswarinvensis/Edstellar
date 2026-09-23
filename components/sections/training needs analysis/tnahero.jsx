import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import Breadcrumbs from "@/components/common/breadcrumbs";
import CtaButton from "@/components/common/cta-button";
import TnaSkillMatrix from "./tna-skill-matrix";

export default function TNAHero({ data, breadcrumbItems }) {
  if (!data) return null;

  return (
    // `top` is what the sticky enquiry bar watches to know the hero has
    // scrolled away.
    <Section id="top" className="bg-[#f8f7f4]">
      <Reveal>
        {breadcrumbItems ? <Breadcrumbs items={breadcrumbItems} /> : null}
      </Reveal>
      <Box>
        <Box className="grid grid-cols-[1.15fr_0.85fr] items-center gap-14 max-[901px]:grid-cols-1 max-[901px]:gap-9">
          {/* Left Side Content */}
          <Box className="min-w-0">
            <Reveal delay={1}>
              <Text as="h1" className="mt-4">
                {data.title}
              </Text>
            </Reveal>

            {data.tagline && (
              <Text
                as="p"
                className="mt-4 font-serif text-[18px] font-normal italic text-ink"
              >
                {data.tagline}
              </Text>
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

            {/* Action Buttons */}
            <Reveal delay={3}>
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

          {data.skill_matrix ? (
            <Box className="min-w-0">
              <TnaSkillMatrix data={data.skill_matrix} />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Section>
  );
}
