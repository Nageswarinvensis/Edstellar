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
  kicker: "Corporate training · Data Engineering",
  h1: "ETL Testing Corporate Training",
  theme_line:
    "Learn to catch bad data before the business does, on every single load.",
  sub: "A hands-on program for data and engineering leaders whose data engineering, quality assurance (QA) and BI teams cannot yet prove that reports match the source or that a migration is safe to go live.",
  lead: "ETL Testing Corporate Training is an instructor-led program from Edstellar that teaches your team how to plan, reconcile and automate tests for the extract, transform, load (ETL) pipelines and data warehouses behind its reports, with every lab built on the team's own pipeline scenarios.",
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
 * Course Banner V2 — the hero for course pages in the new v2 design.
 *
 * Layout: two-column grid on desktop (46 / 54 fr split).
 *   Left  — kicker, H1, serif theme line, sub-heading, lead, format chips,
 *            CTA row, stats DL, breadcrumbs.
 *   Right — animated ETL pipeline SVG illustration (or a custom SVG passed
 *            via the `illustration` prop for other courses).
 *
 * Usage — static (prototype):
 *   <CourseBannerV2 />
 *
 * Usage — with API data:
 *   <CourseBannerV2 banner={course.banner} />
 *
 * The right-side illustration defaults to the ETL Testing pipeline SVG.
 * Pass `illustration={<YourSvg />}` to swap it out for another course.
 */
/**
 * Renders the right-side illustration.
 *
 * Priority:
 *   1. `illustration` prop — inline JSX (custom override)
 *   2. `banner.illustration_url` — uploaded SVG file via <object> (preserves
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
            {/* fallback for browsers that can't render the SVG */}
            <EtlHeroIllo />
          </object>
        </Box>
      );
    }
    // raster image (PNG / WebP / JPG)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        aria-hidden="true"
        className="w-full h-auto"
      />
    );
  }

  return <EtlHeroIllo />;
}

export default function CourseBannerV2({
  banner = STATIC_BANNER,
  breadcrumbs,
  illustration,
}) {
  const {
    illustration_url,
    kicker,
    h1,
    theme_line,
    sub,
    lead,
    formats = [],
    actions = [],
    stats = [],
  } = banner;

  return (
    <Section
      id="top"
      className="cbv2-bg relative overflow-hidden py-7 lg:min-h-[calc(100svh-110px)] lg:py-5"
      innerClassName="grid grid-cols-1 items-center gap-6 lg:grid-cols-[46fr_54fr] lg:gap-10 lg:items-start"
    >
      {/* ── Left column: copy ── */}
      <Box className="relative z-[1] max-w-[640px]">

        {/* Kicker */}
        <Reveal delay={0}>
          <Text
            as="p"
            className="mb-4.5 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted"
          >
            {kicker}
          </Text>
        </Reveal>

        {/* H1 */}
        <Reveal delay={1}>
          <Text
            as="h1"
            className="mb-3.5 text-[clamp(40px,4.4vw,66px)] leading-[1.03] tracking-[-0.045em] font-semibold max-lg:text-[clamp(32px,5.5vw,52px)] max-lg:leading-[1.06]"
          >
            {h1}
          </Text>
        </Reveal>

        {/* Theme line — Cormorant Garamond italic */}
        <Reveal delay={2}>
          <Text
            as="p"
            className="mb-5 font-serif italic text-[clamp(22px,2.5vw,38px)] leading-[1.15] tracking-[-0.01em] text-ink"
          >
            {theme_line}
          </Text>
        </Reveal>

        {/* Sub-heading (symptom / audience qualifier) */}
        <Reveal delay={3}>
          <Text
            as="p"
            className="mb-2 text-[17px] font-semibold leading-[1.5] text-ink tracking-[-0.005em]"
          >
            {sub}
          </Text>
        </Reveal>

        {/* Lead paragraph */}
        <Reveal delay={3}>
          <Text
            as="p"
            className="max-w-[560px] text-[17px] leading-[1.6] text-ink-muted"
          >
            {lead}
          </Text>
        </Reveal>

        {/* Delivery format chips */}
        {formats.length > 0 && (
          <Reveal delay={4}>
            <Box
              as="p"
              className="mt-5 mb-6 flex flex-wrap items-center gap-y-1 font-body text-[15px] text-ink"
            >
              {formats.map((fmt, i) => (
                <span key={fmt} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-2.5 text-ink-muted">
                      ·
                    </span>
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
            <CourseBannerV2Actions actions={actions} />
          </Reveal>
        )}

        {/* Stats DL — 3-column grid with dividers */}
        {stats.length > 0 && (
          <Reveal>
            <dl className="mt-7 grid max-w-[620px] grid-cols-3 border-t border-ink/12 pt-5 max-sm:grid-cols-3">
              {stats.map((stat, i) => (
                <div
                  key={stat.value}
                  className={
                    i === 0
                      ? "pr-[clamp(14px,2.4vw,40px)]"
                      : "border-l border-ink/12 px-[clamp(10px,2.4vw,40px)] max-sm:px-2.5"
                  }
                >
                  <dt className="font-display font-medium text-[clamp(15px,1.5vw,21px)] tracking-[-0.025em] text-ink lg:whitespace-nowrap">
                    {stat.value}
                  </dt>
                  <dd className="mt-0.5 text-[14px] text-ink-muted max-sm:text-[12.5px] lg:whitespace-nowrap">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {/* Breadcrumbs */}
        <Reveal>
          <Breadcrumbs items={breadcrumbs} />
        </Reveal>
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
    </Section>
  );
}
