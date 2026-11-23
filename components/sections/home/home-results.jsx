import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import HomeWrap from "@/components/sections/home/home-wrap";
import HomeSectionHead from "@/components/sections/home/home-section-head";

/**
 * "Results from our learning and development programs." — four aggregate
 * stat cards, three case study cards (middle one featured/navy), and a
 * client quote block below.
 *
 * All items carry a `sample` flag in the JSON — remove it (or the item
 * entirely) once real client-approved data is in place.
 *
 * Design: `edstellar-homepage-ld-solutions.html` → `#results`
 * (`.agg`, `.cases`, `.case`, `.case.feat`, `.quote`).
 */
export default function HomeResults({ data }) {
  if (!data?.cases?.length) return null;
  const { heading, lede, stats, cases, quote } = data;

  return (
    <HomeWrap
      id="results"
      aria-labelledby="results-heading"
      className="scroll-mt-16 border-y border-ink/8 bg-paper-warm py-20 max-lg:py-16"
    >
      <HomeSectionHead id="results-heading" heading={heading} lede={lede} />

      {/* ── Aggregate stats ── */}
      {stats?.length > 0 && (
        <Box as="ul" className="m-0 mb-6 grid list-none grid-cols-2 gap-4 p-0 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={i} as="li" delay={i} className="relative rounded-[14px] border border-ink/12 bg-white p-5">
              {stat.sample && (
                <Box as="span" className="absolute right-3 top-3 rounded-[4px] border border-yellow-300 bg-yellow-100 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-yellow-700">
                  Sample
                </Box>
              )}
              <Text as="p" className="m-0 font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
                {stat.value}
              </Text>
              <Text as="p" className="m-0 mt-2 text-[13.5px] leading-[1.45] text-ink-muted">
                {stat.label}
              </Text>
            </Reveal>
          ))}
        </Box>
      )}

      {/* ── Case study cards ── */}
      <Box as="ul" className="m-0 grid list-none grid-cols-1 gap-[18px] p-0 md:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal
            key={i}
            as="li"
            delay={i}
            className={`relative flex flex-col rounded-[14px] border p-[22px] ${
              c.featured
                ? "border-navy bg-navy text-paper"
                : "border-ink/12 bg-white"
            }`}
          >
            {c.sample && (
              <Box as="span" className="absolute right-3 top-3 rounded-[4px] border border-yellow-300 bg-yellow-100 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-yellow-700">
                Sample
              </Box>
            )}

            {/* Tags */}
            <Box as="ul" className="m-0 mb-3.5 flex list-none flex-wrap gap-1.5 p-0 pr-14">
              {c.tags.map((tag, t) => (
                <Box
                  as="li"
                  key={t}
                  className={`rounded-[6px] px-[9px] py-[6px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.07em] ${
                    t === 0
                      ? "bg-lime text-navy"
                      : c.featured
                      ? "border border-paper/22 text-paper/80"
                      : "border border-ink/12 text-ink"
                  }`}
                >
                  {tag}
                </Box>
              ))}
            </Box>

            {/* Title */}
            <Text
              as="h3"
              className={`m-0 text-[18px] font-medium leading-[1.3] tracking-[-0.02em] ${
                c.featured ? "text-paper" : "text-ink"
              }`}
            >
              {c.title}
            </Text>

            {/* Engagement */}
            <Text
              as="p"
              className={`mt-1.5 mb-3.5 text-[12.5px] leading-tight ${
                c.featured ? "text-paper/60" : "text-ink-muted"
              }`}
            >
              Engagement:{" "}
              <strong className={c.featured ? "text-paper/90" : "text-ink"}>
                {c.engagement}
              </strong>
            </Text>

            {/* Description */}
            <Text
              as="p"
              className={`m-0 mb-4 text-[13.5px] leading-[1.55] ${
                c.featured ? "text-paper/72" : "text-ink-muted"
              }`}
            >
              {c.desc}
            </Text>

            {/* Metrics */}
            {c.metrics?.length > 0 && (
              <Box
                as="ul"
                className={`m-0 flex flex-1 list-none flex-col p-0 border-t ${
                  c.featured ? "border-paper/12" : "border-ink/8"
                }`}
              >
                {c.metrics.map((m, j) => (
                  <Box
                    as="li"
                    key={j}
                    className={`grid grid-cols-[118px_1fr] items-baseline gap-3 py-[11px] border-b ${
                      c.featured ? "border-paper/12" : "border-ink/8"
                    }`}
                  >
                    <Text
                      as="b"
                      className={`font-display text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] ${
                        c.featured ? "text-lime" : "text-ink"
                      }`}
                    >
                      {m.value}
                    </Text>
                    <Text
                      as="span"
                      className={`text-[13px] leading-[1.4] ${
                        c.featured ? "text-paper/70" : "text-ink-muted"
                      }`}
                    >
                      {m.label}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}

            {/* CTA */}
            {c.href && c.cta && (
              <Box
                as="a"
                href={c.href}
                className={`mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold ${
                  c.featured ? "text-paper" : "text-ink"
                }`}
              >
                {c.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Box>
            )}
          </Reveal>
        ))}
      </Box>

      {/* ── Quote ── */}
      {quote?.text && (
        <Reveal className="mt-[22px]">
          <Box className="grid grid-cols-[auto_1fr] items-center gap-[18px] rounded-[14px] border border-dashed border-ink/30 bg-white/55 px-[26px] py-[22px]">
            <Text as="span" className="font-serif text-[44px] font-medium leading-none text-lime" aria-hidden="true">
              "
            </Text>
            <Text as="p" className="m-0 text-[14px] leading-[1.6] text-ink-muted">
              {quote.text}
            </Text>
          </Box>
        </Reveal>
      )}
    </HomeWrap>
  );
}
