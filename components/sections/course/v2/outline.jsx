import Box from "@/components/ui/Box";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2SectionHead from "@/components/sections/course/v2/section-head";
import V2CtaBand from "@/components/sections/course/v2/cta-band";

/** "Learn ~1.5 h · Practice ~2.5 h" → [1.5, 2.5]; null when it does not parse. */
function parseSplit(split) {
  const m = String(split ?? "").match(/Learn\s*~?\s*([\d.]+).*Practice\s*~?\s*([\d.]+)/i);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

const LABEL = "mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-olive";

function Tags({ label, items }) {
  if (!items?.length) return null;
  return (
    <Box>
      <b className={LABEL}>{label}</b>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item} className="inline-block rounded-full bg-paper-warm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
            {item}
          </li>
        ))}
      </ul>
    </Box>
  );
}

/**
 * One module: a checkbox on the timeline, and a card whose summary shows
 * the number, the outcome-led title and "hours · lab"; inside, the topic
 * bullets, the lab, the learn/practice split bar, tools, frameworks and
 * "In your team's week" (before / after).
 */
function Module({ mod, open }) {
  const split = parseSplit(mod.split);
  const learnShare = split ? (split[0] / (split[0] + split[1])) * 100 : 0;
  return (
    <details
      id={`mod-${mod.number}`}
      open={open}
      className="group relative scroll-mt-24 rounded-2xl border border-ink/12 bg-white shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)] before:absolute before:top-[22px] before:-left-[30px] before:size-3.5 before:rounded-[4px] before:border-[1.5px] before:border-navy before:bg-paper before:transition-[background-color,box-shadow] before:duration-300 open:before:border-olive open:before:bg-lime-soft open:before:shadow-[0_0_0_4px_rgba(10,22,40,0.07)]"
    >
      <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-x-3.5 gap-y-1 rounded-2xl px-[18px] py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[11px] tracking-[0.12em] text-olive">{mod.number}</span>
        <span className="font-display text-[16.5px] font-medium tracking-[-0.015em] text-ink">{mod.title}</span>
        <span aria-hidden="true" className="col-start-3 row-start-1 font-mono text-[18px] text-olive">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">–</span>
        </span>
        <span className="col-start-2 text-[13px] text-ink-muted">{mod.meta}</span>
      </summary>

      <Box className="grid gap-3.5 px-[18px] pb-[18px] min-[900px]:grid-cols-[1.3fr_1fr] min-[900px]:pl-[58px]">
        <ul className="grid list-disc content-start gap-[5px] pl-[18px] text-[14.5px] leading-[1.6] text-ink">
          {mod.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>

        <Box className="grid content-start gap-2.5">
          {mod.lab && (
            <p className="text-[14px] leading-[1.5] text-ink">
              <b className={LABEL.replace("mb-1.5", "mb-0.5")}>Lab</b>
              {mod.lab}
            </p>
          )}
          {split && (
            <Box>
              <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="block h-2.5 w-full overflow-hidden rounded-full border border-navy" role="img" aria-label={mod.split}>
                <rect width="100" height="10" className="fill-navy" />
                <rect width={learnShare} height="10" className="fill-lime-soft" />
                <line x1={learnShare} x2={learnShare} y1="0" y2="10" className="stroke-navy" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>
              <p className="mt-1 text-[12px] text-ink-muted">{mod.split}</p>
            </Box>
          )}
          <Tags label={mod.tools_label} items={mod.tools} />
          <Tags label={mod.frameworks_label} items={mod.frameworks} />
        </Box>

        {mod.week && (
          <Box className="col-span-full border-t border-dashed border-ink/12 pt-3">
            <p className="mb-2 font-display text-[15px] font-medium text-ink">
              <span className={LABEL.replace("mb-1.5", "mb-0.5")}>{mod.week.label}</span>
              {mod.week.scenario}
            </p>
            <Box className="grid gap-2.5 min-[720px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <Box className="rounded-xl border border-dashed border-ink/22 bg-paper-warm px-3 py-2.5 text-[13.5px] text-ink-muted">
                <b className="mb-1 block font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted">Before</b>
                <ul className="grid list-disc gap-[3px] pl-[18px]">
                  {mod.week.before.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </Box>
              <Box className="rounded-xl border border-ink/12 bg-paper px-3 py-2.5 text-[13.5px] text-ink">
                <b className="mb-1 block font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-olive">After</b>
                <ol className="grid list-decimal gap-[3px] pl-[18px]">
                  {mod.week.after.map((line) => <li key={line}>{line}</li>)}
                </ol>
                {mod.week.produces && <p className="mt-1.5 text-[13px] font-semibold">{mod.week.produces}</p>}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </details>
  );
}

/**
 * v2 · 5 Program outline (the design's `#outline`) — the mono summary line,
 * then the modules on a checkbox timeline (first open), then the CTA.
 */
export default function V2Outline({ data }) {
  if (!data?.modules?.length) return null;
  const { eyebrow, heading, lead, summary = [], modules, cta } = data;

  return (
    <V2Section id="outline">
      <V2SectionHead eyebrow={eyebrow} heading={heading} lead={lead} />

      {summary.length > 0 && (
        <Reveal>
          <p className="-mt-3.5 mb-[26px] flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            {summary.map((s) => (
              <span key={s.label}>
                <b className="font-medium text-ink">{s.value}</b> {s.label}
              </span>
            ))}
          </p>
        </Reveal>
      )}

      <Box
        id="mods"
        className="relative grid gap-3 pl-[34px] before:absolute before:top-[22px] before:bottom-[22px] before:left-[11px] before:w-px before:bg-ink/22"
      >
        {modules.map((mod, i) => (
          <Module key={mod.number} mod={mod} open={i === 0} />
        ))}
      </Box>

      <V2CtaBand cta={cta} />
    </V2Section>
  );
}
