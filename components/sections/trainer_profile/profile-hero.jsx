import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { CtaButton } from "@/components/common/cta-button";
import ExpandableTags from "@/components/sections/trainer_profile/expandable-tags";

/**
 * Navy trainer hero — photo, name, profile title in the serif accent, the
 * trainer's courses as tags (the first few, with "+N more") and two CTAs, closed by a meta bar with location
 * and training-since. The breadcrumb sits above it on paper.
 * Design: amol-pune-india `.hero`, `.hero-tags`, `.hero-metabar`.
 */
export default function ProfileHero({ profile, data, breadcrumbs }) {
  return (
    <>
      <Section className="bg-paper py-4 lg:py-5">
        <Breadcrumbs items={breadcrumbs} className="mt-0" />
      </Section>

      <Box
        as="section"
        id="top"
        className="relative overflow-hidden bg-navy text-paper"
      >
        <Box
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 size-130 rounded-full bg-[radial-gradient(circle,rgba(200,241,53,0.12),transparent_70%)]"
        />
        <Box className="relative px-5 py-14 lg:px-10">
          <Box className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 sm:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] lg:gap-12">
            <Reveal>
              <Box className="mx-auto aspect-square w-full max-w-70 overflow-hidden rounded-[14px] border border-paper/14 bg-navy-soft">
                {profile.image ? (
                  <img loading="eager"
                    src={profile.image}
                    alt={`${profile.name}, ${profile.title}, ${profile.location}`}
                    width={300}
                    height={300}
                    fetchPriority="high"
                    decoding="async"
                    className="size-full object-cover"
                  />
                ) : null}
              </Box>
            </Reveal>

            <Reveal delay={1}>
              <Text as="h1" className="text-paper">
                {profile.name}
              </Text>
              {profile.title ? (
                <Text
                  as="p"
                  className="mt-3 font-serif text-[clamp(22px,2.2vw,28px)] leading-tight text-lime italic"
                >
                  {profile.title}
                </Text>
              ) : null}

              {profile.courses.length ? (
                <ExpandableTags
                  items={profile.courses.map((course) => course.title)}
                  visible={data.visible_tags}
                  className="mt-6"
                  tagClassName="rounded-full border border-lime/40 bg-lime/10 px-3.5 py-1.5 text-[13.5px] font-medium text-lime"
                  buttonClassName="rounded-full border border-paper/30 px-3.5 py-1.5 text-[13.5px] font-medium text-paper transition-colors hover:border-lime hover:text-lime"
                />
              ) : null}

              <Box className="mt-7 flex flex-wrap gap-3">
                <CtaButton arrow
                  color="lime"
                  render={<a href={data.primary_cta.href} />}
                >
                  {data.primary_cta.label}
                </CtaButton>
                {profile.courses.length ? (
                  <CtaButton arrow
                    variant="ghost"
                    render={<a href={data.secondary_cta.href} />}
                    className="border-paper/40 text-paper hover:border-paper hover:bg-paper/5"
                  >
                    {data.secondary_cta.label}
                  </CtaButton>
                ) : null}
              </Box>
            </Reveal>
          </Box>
        </Box>

        <Box className="relative border-t border-paper/10 px-5 py-6 lg:px-10">
          <Box
            as="dl"
            className="mx-auto my-0 flex max-w-7xl flex-wrap gap-x-20 gap-y-4"
          >
            <Box>
              <dt className="font-mono text-[10.5px] tracking-[0.14em] text-paper/55 uppercase">
                {data.labels.location}
              </dt>
              <dd className="m-0 mt-1.5 font-display text-[16px] font-semibold text-paper">
                {profile.flag ? (
                  <span aria-hidden="true" className="mr-2">
                    {profile.flag}
                  </span>
                ) : null}
                {profile.location}
              </dd>
            </Box>
            {profile.since ? (
              <Box>
                <dt className="font-mono text-[10.5px] tracking-[0.14em] text-paper/55 uppercase">
                  {data.labels.since}
                </dt>
                <dd className="m-0 mt-1.5 font-display text-[16px] font-semibold text-paper">
                  {profile.since}
                </dd>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
}
