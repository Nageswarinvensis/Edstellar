import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

/** Render a heading that may contain `<span>` or `<em>` tags for emphasis. */
function SuiteHeading({ html, className, ...props }) {
  return (
    <Text
      as="h2"
      {...props}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ── Emblem: dark panel with SVG visual, stat badges and extras ────────── */

function ToolEmblem({ tool }) {
  return (
    <Box
      aria-hidden="true"
      className="mb-5 flex flex-col gap-3.5 rounded-2xl bg-navy p-5"
    >
      {tool.svg_image ? (
        <Box
          dangerouslySetInnerHTML={{ __html: tool.svg_image }}
          className="mx-auto w-full max-w-[320px] [&_svg]:block [&_svg]:w-full"
        />
      ) : (
        <Box className="flex items-center gap-3">
          <Box className="grid size-12 flex-none place-items-center rounded-full bg-lime font-display text-[20px] font-bold text-navy">
            {tool.mark}
          </Box>
          {tool.badges?.length ? (
            <Box className="flex flex-wrap gap-2">
              {tool.badges.map((badge) => (
                <Box
                  key={badge.label}
                  className="inline-flex items-baseline gap-1.5 rounded-full border border-paper/16 bg-navy-soft px-3 py-1.5"
                >
                  <Text as="span" className="font-display text-[14px] font-bold text-lime">
                    {badge.n}
                  </Text>
                  <Text as="span" className="text-[11.5px] text-paper">
                    {badge.label}
                  </Text>
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
      )}

      {!tool.svg_image && tool.extras?.length ? (
        <Box className="flex flex-wrap gap-2">
          {tool.extras.map((extra) => (
            <Text
              as="span"
              key={extra}
              className="rounded-full border border-lime/50 px-2.75 py-1.25 text-[10px] font-semibold text-paper"
            >
              {extra}
            </Text>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

/* ── Spotlight (single-tool sub-page) ──────────────────────────────────── */

function Spotlight({ data, tool }) {
  return (
    <Section
      id={data.section_id ?? "tool"}
      className="bg-navy bg-[radial-gradient(900px_420px_at_85%_0%,rgba(200,241,53,0.14),transparent_60%)] text-paper"
    >
      <Box className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-7">
        <Box>
          <Reveal>
            <SuiteHeading
              html={data.heading}
              className="font-display text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-paper [&_em]:font-serif [&_em]:font-normal [&_em]:italic [&_em]:text-lime [&_span]:font-serif [&_span]:font-normal [&_span]:italic [&_span]:text-lime"
            />
          </Reveal>

          {data.lede ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/80"
              >
                {data.lede}
              </Text>
            </Reveal>
          ) : null}

          <Reveal delay={2}>
            <Box as="dl" className="mt-6 grid gap-3.5 border-t border-paper/16 pt-4.5">
              {tool.use_cases?.length ? (
                <Box>
                  <Box as="dt" className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/55">
                    Use cases
                  </Box>
                  <Box as="dd" className="m-0 flex flex-wrap gap-1.5">
                    {tool.use_cases.map((uc) => (
                      <Text
                        as="span"
                        key={uc}
                        className="rounded-full bg-lime-soft px-2.5 py-1 text-[12.5px] text-navy"
                      >
                        {uc}
                      </Text>
                    ))}
                  </Box>
                </Box>
              ) : null}
              {tool.audience ? (
                <Box>
                  <Box as="dt" className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/55">
                    Audience
                  </Box>
                  <Box as="dd" className="m-0 text-[14px] leading-[1.5] text-paper/90">
                    {tool.audience}
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Reveal>

          {tool.cta?.href ? (
            <Reveal delay={3}>
              <Box className="mt-6">
                <Box
                  as={Link}
                  href={tool.cta.href}
                  title={`Click Here to Explore ${tool.name}`}
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-[14px] font-semibold text-navy no-underline transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {tool.cta.label} <span aria-hidden="true">→</span>
                </Box>
              </Box>
            </Reveal>
          ) : null}
        </Box>

        {tool.svg_image ? (
          <Reveal delay={2}>
            <Box
              as="figure"
              className="m-0 rounded-[20px] border border-lime/28 bg-navy-soft p-6 max-[900px]:p-3.5"
            >
              <Box
                dangerouslySetInnerHTML={{ __html: tool.svg_image }}
                className="mx-auto max-w-[440px] [&_svg]:block [&_svg]:w-full"
              />
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}

/* ── Grid (multi-tool hub) ─────────────────────────────────────────────── */

/** The visual panel at the top of a hub card: the CMS's `svg_image` when it
 * sends one, otherwise the monogram + badges emblem. Design: `.oA-v`. */
function ToolVisual({ tool }) {
  if (!tool.svg_image) return <ToolEmblem tool={tool} />;

  return (
    <Box
      className="mb-5 rounded-[14px] bg-paper/4 p-3.5 [&_svg]:mx-auto [&_svg]:block [&_svg]:w-full [&_svg]:max-w-[340px]"
      dangerouslySetInnerHTML={{ __html: tool.svg_image }}
    />
  );
}

/**
 * The hub's Edstellar suite: Zenith, Orbit and Polaris as dark cards on the
 * navy band, each with its diagram, monogram, description, use cases,
 * audience and a lime product link.
 *
 * Design: `#suite`, `.oA`, `.oA-grid`, `.oA-c`.
 */
function Grid({ data }) {
  const { section_id, heading, lede, tools } = data;

  return (
    <Section
      id={section_id}
      aria-labelledby="su-h"
      className="relative overflow-hidden bg-navy bg-[radial-gradient(900px_420px_at_85%_0%,rgba(200,241,53,0.14),transparent_60%)]"
    >
      <Box className="mb-11 max-w-[760px]">
        <Reveal>
          <SuiteHeading
            id="su-h"
            html={heading}
            className="font-display text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-paper [&_em]:font-serif [&_em]:text-[1.08em] [&_em]:font-normal [&_em]:italic [&_em]:tracking-[-0.01em] [&_em]:text-lime [&_span]:font-serif [&_span]:text-[1.08em] [&_span]:font-normal [&_span]:italic [&_span]:tracking-[-0.01em] [&_span]:text-lime"
          />
        </Reveal>
        {lede ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/60"
            >
              {lede}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box
        role="list"
        aria-label="Edstellar assessment tools"
        className="grid grid-cols-3 gap-6 max-[1000px]:max-w-[560px] max-[1000px]:grid-cols-1"
      >
        {tools.map((tool, index) => (
          <Reveal key={tool.name} delay={Math.min(index + 1, 4)} role="listitem" className="h-full">
            <Box
              as="article"
              className="flex h-full flex-col rounded-[18px] border border-lime/28 bg-navy-soft p-7 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-lime motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[600px]:p-5.5"
            >
              <ToolVisual tool={tool} />

              <Box className="mb-4.5 flex items-center gap-3.5">
                <Text
                  as="span"
                  aria-hidden="true"
                  className="grid size-11 flex-none place-items-center rounded-full bg-lime font-display text-[18px] font-bold leading-none text-navy"
                >
                  {tool.mark}
                </Text>
                <Box>
                  <Text
                    as="h3"
                    className="m-0 font-display text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-white"
                  >
                    {tool.name}
                  </Text>
                  <Text
                    as="span"
                    className="mt-1.25 block font-mono text-[10px] uppercase leading-normal tracking-[0.14em] text-paper/60"
                  >
                    {tool.kicker}
                  </Text>
                </Box>
              </Box>

              <Text as="p" className="mb-4 text-[14px] leading-[1.6] text-paper/85">
                {tool.description}
              </Text>

              <Box as="dl" className="mb-5.5 grid gap-3 border-t border-paper/16 pt-3.5">
                {tool.use_cases?.length ? (
                  <Box>
                    <Box as="dt" className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/55">
                      Use cases
                    </Box>
                    <Box as="dd" className="m-0 text-[13.5px] leading-[1.5] text-paper/90">
                      {tool.use_cases.map((useCase) => (
                        <Text
                          as="span"
                          key={useCase}
                          className="mr-1.5 mb-1.5 inline-block rounded-full bg-lime-soft px-2.5 py-1 text-[12px] leading-[1.3] text-navy"
                        >
                          {useCase}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                ) : null}
                {tool.audience ? (
                  <Box>
                    <Box as="dt" className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/55">
                      Audience
                    </Box>
                    <Box as="dd" className="m-0 text-[13.5px] leading-[1.5] text-paper/90">
                      {tool.audience}
                    </Box>
                  </Box>
                ) : null}
              </Box>

              {tool.cta?.href ? (
                <Box
                  as={Link}
                  href={tool.cta.href}
                  title={`Click Here to Explore ${tool.name}`}
                  className="mt-auto inline-flex items-center gap-2 self-start rounded-full border-[1.5px] border-transparent bg-lime px-5.5 py-3 font-body text-[14px] font-semibold leading-[1.4] text-navy no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:translate-y-0"
                >
                  {tool.cta.label} <span aria-hidden="true">&rarr;</span>
                </Box>
              ) : null}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}

/**
 * Edstellar assessment tools section.
 *
 * Two layouts based on the number of tools the CMS sends:
 * - **1 tool** → spotlight: two-column (text left, visual right) on dark
 *   with radial gradient, matching the sub-page reference.
 * - **2+ tools** → grid: the hub's 3-card layout on dark.
 */
export default function Suite({ data }) {
  if (!data?.tools?.length) return null;

  if (data.tools.length === 1) {
    return <Spotlight data={data} tool={data.tools[0]} />;
  }

  return <Grid data={data} />;
}
