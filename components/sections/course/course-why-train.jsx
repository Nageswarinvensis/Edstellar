import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import styles from "./course-why-train.module.css";

// ── Inline SVG icons (72×72, navy stroke, no fill) ───────────────────────────
const ICONS = {
  "chip-broken": (
    <>
      <rect x="36" y="14" width="20" height="20" />
      <path d="M41 14v-5M51 14v-5M41 34v5M51 34v5M36 19h-5M36 29h-5M56 19h5M56 29h5" />
      <path d="M8 56V40M28 56V40M8 44h20M8 52h20M12 44l8 8M20 44l8 8" />
    </>
  ),
  "person-up": (
    <>
      <circle cx="24" cy="18" r="7" />
      <path d="M10 54c0-10 6-18 14-18s14 8 14 18" />
      <path d="M48 52V22M40 30l8-8 8 8" />
    </>
  ),
  "bank": (
    <>
      <path d="M10 24L32 10l22 14" />
      <path d="M12 24h40M12 50h40M8 56h48" />
      <path d="M18 28v18M28 28v18M36 28v18M46 28v18" />
    </>
  ),
  "calendar-x": (
    <>
      <rect x="10" y="14" width="44" height="40" />
      <path d="M10 26h44M22 8v12M42 8v12" />
      <path d="M18 36h14M18 44h8" />
      <path d="M40 36l8 8M48 36l-8 8" />
    </>
  ),
  "database-up": (
    <>
      <ellipse cx="22" cy="30" rx="12" ry="4" />
      <path d="M10 30v16c0 2.2 5.4 4 12 4s12-1.8 12-4V30M10 38c0 2.2 5.4 4 12 4s12-1.8 12-4" />
      <path d="M48 52V16M41 23l7-7 7 7" />
    </>
  ),
};

function StatIcon({ name }) {
  const paths = ICONS[name];
  if (!paths) return null;
  return (
    <svg
      viewBox="0 0 64 64"
      width="72"
      height="72"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ overflow: "visible" }}
    >
      {paths}
    </svg>
  );
}

/** "31 of 31" → renders "of" in smaller weight */
function StatValue({ value }) {
  const idx = value.indexOf(" of ");
  if (idx !== -1) {
    return (
      <>
        {value.slice(0, idx)}
        <small style={{ fontSize: "0.55em", fontWeight: 500, letterSpacing: 0 }}> of </small>
        {value.slice(idx + 4)}
      </>
    );
  }
  return value;
}

const BURST_SVG = (
  <svg
    viewBox="0 0 28 28"
    width="28"
    height="28"
    aria-hidden="true"
    focusable="false"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M14 2v6M14 20v6M2 14h6M20 14h6M5.5 5.5l4 4M18.5 18.5l4 4M22.5 5.5l-4 4M9.5 18.5l-4 4" />
  </svg>
);

// ── Static placeholder data ───────────────────────────────────────────────────
const STATIC = {
  tagline: "Why teams train now",
  heading: "Where Data Pipeline Testing Breaks Down, and What Your Team Learns in",
  heading_em: "ETL Testing Corporate Training",
  lead: "ETL Testing Corporate Training is for data and engineering leaders who need the pipelines behind their reports, AI work and migrations to be trusted. Without disciplined testing, the business spots wrong numbers first, month-end reports disagree with the source and a cloud migration cannot be signed off. The training builds that testing capability across data engineering, QA and BI teams.",
  stats: [
    {
      icon: "chip-broken",
      value: "57%",
      description: "of data leaders say data reliability is a top barrier to moving AI into production",
      source: "Informatica 2026",
    },
    {
      icon: "person-up",
      value: "75%",
      description: "of data leaders say employees need serious upskilling in data literacy",
      source: "Informatica 2026",
    },
    {
      icon: "bank",
      value: "31 of 31",
      description: "global systemically important banks assessed still needed work to fully comply with the BCBS 239 risk data principles",
      source: "Basel Committee 2023",
    },
    {
      icon: "calendar-x",
      value: "2026",
      description: "Informatica PowerCenter 10.5 left standard support on 31 March, putting PowerCenter teams on a migration path to IDMC",
      source: "Informatica 2026",
    },
    {
      icon: "database-up",
      value: "86%",
      description: "of companies plan to increase data management investment in 2026",
      source: "Informatica 2026",
    },
  ],
  sources_note:
    "Sources: Informatica, CDO Insights 2026, a survey of 600 data leaders (57%, 75%, 86%). Basel Committee on Banking Supervision, progress report on the BCBS 239 principles, November 2023 (31 of 31 banks). Informatica, PowerCenter 10.5 end of support notice, 2026 (31 March 2026).",
  cta: {
    heading: "Close the Data Pipeline Testing Gaps in Your Teams With Edstellar's ETL Testing Corporate Training",
    description:
      "Tell Edstellar where wrong numbers reach the business, which reports must reconcile for an audit or which migration has to go live, and the instructor builds the labs around those cases.",
    label: "Map our testing gaps",
    href: "#quote",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function CourseWhyTrain({ data = STATIC }) {
  const { tagline, heading, heading_em, lead, stats = [], sources_note, cta } = data;

  return (
    <Section id="why-train" className="py-14 lg:py-20">

      {/* Section header — centered */}
      <Reveal>
        <Box className="text-center mb-10 mx-auto max-w-[900px]">
          {tagline && (
            <Box
              as="p"
              className="inline-flex items-center gap-[9px] mb-[14px] font-mono text-[11px] uppercase tracking-[0.18em] text-ink justify-center"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-lime"
                style={{ boxShadow: "0 0 0 3px rgba(200,241,53,.25)" }}
                aria-hidden="true"
              />
              {tagline}
            </Box>
          )}
          <Text as="h2" className="mb-[14px]">
            {heading}{" "}
            {heading_em && (
              <em className="font-serif font-normal italic">{heading_em}</em>
            )}
          </Text>
          {lead && (
            <Text
              as="p"
              className="mt-[14px] mx-auto max-w-[860px] text-[16.5px] leading-[1.7] text-ink"
            >
              {lead}
            </Text>
          )}
        </Box>
      </Reveal>

      {/* Stat cards rail */}
      {stats.length > 0 && (
        <Reveal>
          <div className={styles.rail} id="gapRail">
            {stats.map((stat, i) => (
              <article key={i} className={styles.card} style={{ "--i": i }}>
                {/* Icon */}
                <div className="mb-3" style={{ color: "var(--color-navy)", lineHeight: 0 }}>
                  <StatIcon name={stat.icon} />
                </div>

                {/* Value */}
                <b className="block font-display font-bold text-[clamp(32px,2.9vw,42px)] tracking-[-0.03em] leading-[1.05] text-ink mb-2 whitespace-nowrap" style={{ fontVariantNumeric: "tabular-nums" }}>
                  <StatValue value={stat.value} />
                </b>

                {/* Description */}
                <p className="m-0 text-ink text-[15px] leading-[1.4]">
                  {stat.description}
                </p>

                {/* Source tag — absolute, bottom-right tab */}
                {stat.source && (
                  <span className={styles.src}>Source: {stat.source}</span>
                )}

                {/* Triangle pointer */}
                <span className={styles.ptr} aria-hidden="true" />

                {/* Burst marker */}
                <span className={styles.burst} aria-hidden="true">
                  <span className={styles.burstIcon} style={{ color: "var(--color-navy)" }}>
                    {BURST_SVG}
                  </span>
                </span>
              </article>
            ))}

            {/* Timeline line */}
            <div className={styles.line} aria-hidden="true" />
          </div>
        </Reveal>
      )}

      {/* Sources footnote */}
      {sources_note && (
        <Text
          as="p"
          className="mt-[18px] mx-auto max-w-[900px] text-center text-[12.5px] leading-[1.6] text-ink-muted"
        >
          {sources_note}
        </Text>
      )}

      {/* CTA block */}
      {cta && (
        <Reveal>
          <div
            className="mt-[34px] px-7 py-6 text-center"
            style={{
              background: "var(--color-paper)",
              borderLeft: "6px solid var(--color-olive)",
              borderRadius: "0 10px 10px 0",
            }}
          >
            <Text as="h3" className="mb-1.5 mx-auto max-w-[760px] text-[19px] leading-[1.3]">
              {cta.heading}
            </Text>
            {cta.description && (
              <Text
                as="p"
                className="mb-[18px] mx-auto max-w-[900px] text-[15px] leading-[1.6] text-ink-muted"
              >
                {cta.description}
              </Text>
            )}
            <a
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-navy bg-white px-[22px] py-3 font-body text-[14px] font-semibold text-ink transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "0 4px 0 rgba(10,22,40,.12)" }}
            >
              {cta.label}
            </a>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
