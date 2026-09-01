import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/common/breadcrumbs";
import HeroActions from "@/components/common/hero-actions";
import HeroMedia from "@/components/common/hero-media";
import HeroMeta from "@/components/common/hero-meta";
import Reveal from "@/components/common/reveal";

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
            <Text as="h1" className="mb-2.5 max-lg:text-[clamp(32px,5vw,50px)]">
              {(hero.heading || "").split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, i) => {
                const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
                return match ? <em key={i} className="font-serif font-normal italic">{match[1]}</em> : fragment;
              })}
            </Text>
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
              {hero.intro_text}
            </Text>
          </Reveal>

          <Reveal delay={4}>
            <HeroMeta items={hero.meta} />
          </Reveal>

          <Reveal delay={3}>
            <HeroActions actions={HERO_ACTIONS} />
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
