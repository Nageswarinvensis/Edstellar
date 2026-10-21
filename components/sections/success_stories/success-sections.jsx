import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import FootprintMap from "@/components/sections/success_stories/footprint-map";
import StoryGrid from "@/components/sections/success_stories/story-grid";

/*
 * Success Stories sections, top to bottom.
 * Design: success-stories.html.
 */

/** Navy footprint section — the h1, the pinned world map and the copy.
 * Design: `#change-journey`. */
export function SuccessFootprint({ data }) {
  return (
    <Section aria-labelledby="ss-h1" className="bg-navy">
      <Reveal>
        <RichHeading as="h1" id="ss-h1" heading={data.heading} className="mx-auto mb-11 max-w-[22ch] text-center text-paper" emphasisClassName="text-lime" />
      </Reveal>
      <Box className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        <Reveal>
          <FootprintMap data={data} />
        </Reveal>
        <Reveal delay={1}>
          <Text as="p" className="mb-3.5 font-mono text-[12px] tracking-[0.14em] text-lime uppercase">
            {data.eyebrow}
          </Text>
          {data.paragraphs.map((text) => (
            <Text as="p" key={text} className="mb-6 text-[15.5px] leading-[1.6] text-paper/80">
              {text}
            </Text>
          ))}
          <Box as="ul" className="m-0 -mt-2 mb-5 flex list-none flex-col gap-3.5 p-0">
            {data.points.map((point) => (
              <li key={point} className="relative pl-4.5 text-[14px] leading-[1.5] text-paper/65 before:absolute before:top-2 before:left-0 before:size-1.5 before:rounded-[1px] before:bg-lime before:content-['']">
                {point}
              </li>
            ))}
          </Box>
          <Text as="p" className="text-[15.5px] leading-[1.6] text-paper/80">
            {data.closing}
          </Text>
        </Reveal>
      </Box>
    </Section>
  );
}

/** "Clients We've Empowered Globally" — a slowly scrolling logo strip that
 * pauses on hover and stops for reduced motion. The list is doubled so the
 * loop is seamless; the copy is hidden from assistive tech, and the names
 * are listed once for screen readers. Design: `.trustbar`, `.mq`. */
export function SuccessClients({ data }) {
  return (
    <Box as="section" aria-label={data.label} className="bg-paper-warm px-5 py-10 lg:px-10">
      <Box className="mx-auto flex max-w-7xl flex-wrap items-center gap-7">
        <Text as="p" className="flex-none font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
          {data.label}
        </Text>
        <Text as="p" className="sr-only">
          {data.logos.map((logo) => logo.name).join(", ")}
        </Text>
        <Box aria-hidden="true" className="group min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,black_5%,black_95%,transparent_100%)]">
          <Box className="flex w-max animate-[marquee_60s_linear_infinite] items-center gap-13 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...data.logos, ...data.logos].map((logo, index) => (
              <img key={index} src={logo.src} alt={logo.name} title={logo.description} height={34} loading="lazy" decoding="async" className="block h-8.5 w-auto max-w-37.5 flex-none object-contain" />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/** Breadcrumb, heading and intro, then the filterable story grid.
 * Design: `#related`. */
export function SuccessStoryList({ data, breadcrumbs }) {
  return (
    <Section aria-labelledby="ss-list-h" className="bg-paper">
      <Breadcrumbs items={breadcrumbs} className="mt-0 mb-6" />
      <Reveal className="mb-10 max-w-[62rem]">
        <RichHeading as="h2" id="ss-list-h" heading={data.heading} className="max-w-[24ch]" />
        <Text as="p" className="mt-4 max-w-[62ch] text-[17px] leading-[1.7]">
          {data.description}
        </Text>
      </Reveal>
      <StoryGrid data={data} />
    </Section>
  );
}
