import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/ui/CtaButton";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import HeroMedia from "@/components/shared/hero-media";
import HeroMeta from "@/components/shared/hero-meta";
import ProofBar from "@/components/shared/proof-bar";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";

/**
 * Domain hub hero.
 *
 * Server Component. The only client code below it is Reveal (a class toggle) and
 * the info popovers inside HeroMeta — all copy is in the initial HTML.
 *
 * Design: `header.hero` on the domain page. The domain proof bar is the light
 * white-card variant; the vendor course page uses the dark one.
 */
function DomainHero({ hero, breadcrumbs, proof }) {
  if (!hero) return null;

  return (
    <>
      <Box
        as="header"
        id="top"
        className="relative overflow-hidden pt-[38px] pb-[54px]"
      >
        <Box className="container-page">
          {/* No `relative` here — HeroMedia positions against the <header>. */}
          <Box className="grid grid-cols-1 items-center gap-[26px] lg:gap-[34px]">
            <HeroMedia
              image={hero.media?.image}
              video={hero.media?.video}
              alt={hero.media?.alt}
            />

            <Box className="relative z-1 max-w-full lg:max-w-[46%]">
              <Reveal delay={1}>
                <RichHeading
                  as="h1"
                  parts={hero.headlineParts}
                  emphasisClassName="text-olive"
                  // Only the responsive bump is overridden. Repeating the base
                  // size unprefixed would make tailwind-merge drop the base
                  // `leading-[1.05]`, since `text-*` also sets line-height in v4.
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
                  {hero.actions?.map((action) => (
                    <CtaButton
                      key={action.label}
                      variant={action.variant}
                      render={<a href={action.href} />}
                    >
                      {action.label}
                    </CtaButton>
                  ))}
                </Box>
              </Reveal>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Reveal>
          <Breadcrumbs items={breadcrumbs} />
        </Reveal>
        <Reveal delay={4}>
          <ProofBar
            tone={proof?.tone}
            stats={proof?.stats}
            trainers={proof?.trainers}
          />
        </Reveal>
      </Box>
    </>
  );
}

export default DomainHero;
