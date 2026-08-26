import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/shared/CtaButton";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import HeroMedia from "@/components/shared/hero-media";
import HeroMeta from "@/components/shared/hero-meta";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";

const HERO_ACTIONS = [
  { href: "#curriculum", label: "View course outline", variant: "primary" },
  { href: "#apply", label: "Enquire now", variant: "ghost" },
];

/**
 * Category hero — shared by the category page and the course page within it.
 *
 * Adds the topic pill rail, the dark proof bar, and the multi-program
 * group-quote prompt. The proof bar tone is driven entirely by content
 * (`proof.tone`), not by a page-level flag.
 *
 * Design: `header.hero` on the course page.
 */
function CategoryHero({ hero, breadcrumbs }) {
  if (!hero) return null;

  return (
    <Section id="top" className="relative overflow-hidden">
      <Box className="grid grid-cols-1 items-center gap-6.5 lg:gap-8.5">
        <HeroMedia
          image={hero.media?.image}
          video={hero.media?.video}
          alt={hero.media?.alt}
        />

        <Box
          className={`relative z-1 max-w-full ${
            HERO_ACTIONS.some(
              (action) => action.label?.toLowerCase() === "download brochure",
            )
              ? "lg:max-w-[50%]"
              : "lg:max-w-[46%]"
          }`}
        >
          <Reveal delay={1}>
            <RichHeading
              as="h1"
              parts={hero.headlineParts}
              emphasisClassName="color-ink"
              className="mb-2.5 max-lg:text-[clamp(32px,5vw,50px)]"
            />
          </Reveal>

          <Reveal delay={1}>
            <Text
              as="p"
              className="mb-3.5 max-w-[38ch] font-serif text-[clamp(17px,1.6vw,21px)] leading-[1.3] text-ink italic"
            >
              {hero.subhead}
            </Text>
          </Reveal>

          <Reveal delay={2}>
            <Text
              as="p"
              className="mb-5 max-w-[60ch] text-[clamp(14px,1.1vw,16px)] leading-[1.6]"
            >
              {hero.lede}
            </Text>
          </Reveal>

          <Reveal delay={4}>
            <HeroMeta items={hero.meta} />
          </Reveal>

          <Reveal delay={3}>
            <Box className="flex flex-wrap gap-3">
              {HERO_ACTIONS.map((action) => (
                <CtaButton
                  key={action.label}
                  variant={action.variant}
                  arrow
                  render={<a href={action.href} />}
                >
                  {action.label}
                </CtaButton>
              ))}
            </Box>
          </Reveal>

          <Reveal>
            <Breadcrumbs items={breadcrumbs} />
          </Reveal>
        </Box>
      </Box>
    </Section>
  );
}

export default CategoryHero;
