import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2SectionHead from "@/components/sections/course/v2/section-head";
import V2Products from "@/components/sections/course/v2/products";
import { cn } from "@/lib/utils";
import WhyGlobe from "@/components/sections/course/v2/why-globe";

/** Trusted static SVG markup from the design file. */
function Markup({ html, viewBox, className }) {
  return (
    <svg viewBox={viewBox || "0 0 24 24"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/** "ISO 9001&27001" → "ISO 9001" + a small "&" + "27001" (the design's `.wy-n i`). */
function StatValue({ value }) {
  const at = value.indexOf("&");
  if (at === -1) return <b className="font-body text-[24px] leading-none font-bold tracking-[-0.035em] text-ink">{value}</b>;
  return (
    <>
      <b className="font-body text-[24px] leading-none font-bold tracking-[-0.035em] text-ink">{value.slice(0, at).trim()}</b>
      <i className="font-body text-[12px] not-italic text-ink-muted">&amp;</i>
      <b className="font-body text-[24px] leading-none font-bold tracking-[-0.035em] text-ink">{value.slice(at + 1).trim()}</b>
    </>
  );
}


/**
 * v2 · 10 Why Edstellar (the design's `#why`) — the lead and four
 * commitments, the proof numbers and accreditations beside the globe of
 * delivery regions; the client logo band; then the Edstellar products —
 * `products`, the local `course_products` (not `data.products` from the CMS).
 */
export default function V2Why({ data, credentials = {}, products }) {
  if (!data) return null;
  const { heading, lead, points = [], globe } = data;
  // Stats, ISO badges and the client-logo band are local (`course_credentials`), not CMS.
  const { stats = [], accreditations = [], logos_label, logos = [] } = credentials;

  return (
    <V2Section id="why">
      <Box className="grid items-center gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <Box className="min-w-0">
          <V2SectionHead heading={heading} lead={lead} className="mb-[22px]" />

          <Reveal as="ul" className="mt-[18px] grid gap-2.5">
            {points.map((p) => (
              <li key={p.label} className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-3 text-[14.5px] leading-[1.55] text-ink-muted">
                <span className="-mt-0.5 flex size-7 items-center justify-center rounded-lg bg-lime-soft/70 text-olive">
                  {p.icon && <Markup html={p.icon} viewBox={p.icon_viewbox} className="size-4" />}
                </span>
                <span>
                  <b className="font-display font-medium text-ink">{p.label}</b> {p.text}
                </span>
              </li>
            ))}
          </Reveal>

          {stats.length > 0 && (
            <Reveal className="mt-6 grid grid-cols-1 overflow-hidden rounded-[14px] border border-ink/15 bg-white min-[560px]:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="min-h-[90px] border-ink/15 px-[22px] py-5 lg:border-r lg:last:border-r-0">
                  <span className="flex flex-wrap items-baseline gap-1.5">
                    <StatValue value={s.value} />
                  </span>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">{s.label}</p>
                </div>
              ))}
            </Reveal>
          )}

          {accreditations.length > 0 && (
            <ul className="mt-3.5 mb-1 flex flex-wrap gap-2">
              {accreditations.map((a) => (
                <li key={a} className="rounded-full bg-lime-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-navy">{a}</li>
              ))}
            </ul>
          )}
        </Box>

        {globe && (
          <Reveal as="figure" className="flex min-w-0 flex-col items-center gap-3">
            <WhyGlobe />
            <figcaption>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted before:size-[7px] before:rounded-full before:bg-lime before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-lime)_28%,transparent),inset_0_0_0_1px_var(--color-navy)]">
                {globe.caption}
              </span>
              <ul className="sr-only">
                {globe.regions?.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </figcaption>
          </Reveal>
        )}
      </Box>

      {logos.length > 0 && (
        <Reveal className="mt-[22px] overflow-hidden rounded-2xl bg-sand pt-[18px] pb-5">
          {logos_label && (
            <p className="mb-3.5 flex items-center gap-4 px-5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted before:h-px before:flex-1 before:bg-[linear-gradient(to_left,rgba(10,22,40,0.12),transparent)] after:h-px after:flex-1 after:bg-[linear-gradient(to_right,rgba(10,22,40,0.12),transparent)]">
              {logos_label}
            </p>
          )}
          {/* A scrolling strip, as the site's client-logo marquee: the list is
              rendered twice so translateX(-50%) loops seamlessly; it pauses on
              hover, and reduced motion falls back to one centred, wrapped row. */}
          <Box className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
            <ul className="flex w-max animate-marquee items-center gap-x-[30px] hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3.5 motion-reduce:px-5">
              {[...logos, ...logos].map((logo, index) => {
                const duplicate = index >= logos.length;
                return (
                  <li key={`${logo.name}-${index}`} aria-hidden={duplicate || undefined} className={cn("flex-none", duplicate && "motion-reduce:hidden")}>
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      title={logo.name}
                      loading="lazy"
                      width={logo.image_width || 120}
                      height={logo.image_height || 48}
                      className="h-7 w-auto max-w-[110px] object-contain opacity-75 grayscale transition-transform duration-200 hover:-translate-y-0.5"
                    />
                  </li>
                );
              })}
            </ul>
          </Box>
        </Reveal>
      )}

      <V2Products data={products} />
    </V2Section>
  );
}
