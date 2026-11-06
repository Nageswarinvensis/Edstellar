import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import Breadcrumbs from "@/components/common/breadcrumbs";
import EtlHeroIllo from "./etl-hero-illo";
import CourseBannerV2Actions from "./course-banner-v2-actions";

/**
 * Static placeholder data.
 * Replace by passing a `banner` prop shaped from the API once wired.
 * Fields use snake_case to match the CMS convention (CLAUDE.md §10).
 */
const STATIC_BANNER = {
  illustration_url: "/course-banners/etl-testing-banner.svg",
  heading: "ETL Testing Corporate Training",
  subhead: "Learn to catch bad data before the business does, on every single load.",
  description: "A hands-on program for data and engineering leaders whose data engineering, quality assurance (QA) and BI teams cannot yet prove that reports match the source or that a migration is safe to go live.",
  intro_text: "ETL Testing Corporate Training is an instructor-led program from Edstellar that teaches your team how to plan, reconcile and automate tests for the extract, transform, load (ETL) pipelines and data warehouses behind its reports, with every lab built on the team's own pipeline scenarios.",
  formats: ["Onsite", "Virtual", "Hybrid"],
  actions: [
    { label: "Request a quote", href: "#quote" },
    { label: "View program outline", href: "#outline" },
  ],
  stats: [
    { value: "~40 hours", label: "10 modules" },
    { value: "9 hands-on labs", label: "+ capstone" },
    { value: "~70% practice", label: "Applied learning" },
  ],
};

/**
 * Renders the right-side illustration.
 *
 * Priority:
 *   1. `illustration` prop — inline JSX (custom override)
 *   2. `banner.illustration_url` — uploaded SVG via <object> (preserves
 *      animations) or a raster image via <img>
 *   3. Fallback — the built-in <EtlHeroIllo /> inline SVG
 */
function BannerIllustration({ url, inline }) {
  if (inline) return inline;

  if (url) {
    const isSvg = /\.svg(\?.*)?$/i.test(url);
    if (isSvg) {
      return (
        <Box className="relative w-full aspect-[560/485]">
          <object
            data={url}
            type="image/svg+xml"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <EtlHeroIllo />
          </object>
        </Box>
      );
    }
    // raster image (PNG / WebP / JPG)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt="" aria-hidden="true" className="w-full h-auto" />
    );
  }

  return <EtlHeroIllo />;
}

/**
 * Course Banner V2 — hero for course pages in the new v2 design.
 *
 * Layout: two-column grid on desktop (46 / 54 fr split).
 *   Left  — kicker, heading, subhead (serif italic), description, intro_text,
 *            format chips, CTA row, stats DL.
 *   Right — illustration (SVG file or inline JSX fallback).
 *
 * Usage — static (prototype):
 *   <CourseBannerV2 />
 *
 * Usage — with API data:
 *   <CourseBannerV2 banner={course.banner_v2} />
 *
 * Pass `illustration={<YourSvg />}` to override the right-side SVG inline.
 */
export default function CourseBannerV2({ banner = STATIC_BANNER, illustration, breadcrumbs }) {
  const {
    illustration_url,
    heading,
    subhead,
    description,
    intro_text,
    formats = [],
    actions = [],
    stats = [],
  } = banner;

  return (
    <Section
      id="top"
      className="cbv2-bg relative overflow-hidden pt-0 pb-10 lg:pt-0 lg:pb-10"
    >
      {/* Breadcrumbs — full width, above the two-column grid */}
      <Reveal>
        <Breadcrumbs items={breadcrumbs} />
      </Reveal>

      {/* Two-column grid */}
      <Box className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-[50fr_50fr] lg:gap-10 lg:items-start">

      {/* ── Left column: copy ── */}
      <Box className="relative z-[1]">

        {/* Heading → <h1> — same size/weight as v1 hero */}
        <Reveal delay={1}>
          <Text
            as="h1"
            className="mb-3 max-lg:text-[clamp(32px,5vw,50px)] max-lg:leading-[1.05]"
          >
            {heading}
          </Text>
        </Reveal>

        {/* Subhead — Cormorant Garamond italic */}
        <Reveal delay={1}>
          <Text
            as="p"
            className="mb-4 font-serif italic text-[clamp(19px,2vw,30px)] leading-[1.2] tracking-[-0.01em] text-ink"
          >
            {subhead}
          </Text>
        </Reveal>

        {/* Description — bold audience qualifier */}
        <Reveal delay={2}>
          <Text
            as="p"
            className="mb-3 text-[15px] font-semibold leading-[1.6] text-ink tracking-[-0.005em]"
          >
            {description}
          </Text>
        </Reveal>

        {/* Intro text — lead paragraph */}
        <Reveal delay={2}>
          <Text
            as="p"
            className="mb-5 text-[15px] leading-[1.7] text-ink-muted"
          >
            {intro_text}
          </Text>
        </Reveal>

        {/* Delivery format chips */}
        {formats.length > 0 && (
          <Reveal delay={3}>
            <Box
              as="p"
              className="mb-6 flex flex-wrap items-center gap-y-1 font-body text-[14px] text-ink-muted"
            >
              {formats.map((fmt, i) => (
                <span key={fmt} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-2.5">·</span>
                  )}
                  {fmt}
                </span>
              ))}
            </Box>
          </Reveal>
        )}

        {/* CTA buttons (client leaf handles scroll-to-hash) */}
        {actions.length > 0 && (
          <Reveal delay={3}>
            <Box className="mb-7">
              <CourseBannerV2Actions actions={actions} />
            </Box>
          </Reveal>
        )}

        {/* Stats DL — 3-column grid with consistent dividers */}
        {stats.length > 0 && (
          <Reveal>
            <dl className="grid grid-cols-3 divide-x divide-ink/12 border-t border-ink/12 pt-5">
              {stats.map((stat, i) => (
                <div
                  key={stat.value}
                  className={i === 0 ? "pr-5 lg:pr-8" : "px-5 lg:px-8"}
                >
                  <dt className="font-display font-medium text-[clamp(14px,1.3vw,19px)] leading-tight tracking-[-0.02em] text-ink break-words">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-[13px] leading-snug text-ink-muted break-words">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </Box>

      {/* ── Right column: illustration ── */}
      <Box
        as="figure"
        className="m-0 min-w-0 max-lg:mx-auto max-lg:w-full max-lg:max-w-[760px] max-sm:pt-11"
        role="img"
        aria-label="Data rows move through three pipelines to a business dashboard; a team spot-checks every load at a gate, good rows turn green and flow on, bad rows turn red and are caught, so only trusted data reaches the dashboard."
      >
        <BannerIllustration url={illustration_url} inline={illustration} />
      </Box>

      </Box>{/* end two-column grid */}
    </Section>
  );
}
