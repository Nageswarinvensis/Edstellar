import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2Heading from "@/components/sections/course/v2/heading";
import V2ScrollLink from "@/components/sections/course/v2/scroll-link";
import { V2_BUTTON, V2ButtonArrow } from "@/components/sections/course/v2/buttons";
import { cn } from "@/lib/utils";

import styles from "./gap.module.css";

/** "31 of 31" → "31", a small "of", "31" (the design's `.num small`). */
function StatValue({ value }) {
  const at = value.indexOf(" of ");
  if (at === -1) return value;
  return (
    <>
      {value.slice(0, at)}
      <small className="text-[0.55em] font-medium tracking-normal"> of </small>
      {value.slice(at + 4)}
    </>
  );
}

function Burst() {
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M14 2v6M14 20v6M2 14h6M20 14h6M5.5 5.5l4 4M18.5 18.5l4 4M22.5 5.5l-4 4M9.5 18.5l-4 4" />
    </svg>
  );
}

/**
 * A stat icon: an image URL, or SVG code from the CMS — a whole `<svg>…</svg>`
 * or just its inner shapes (with `icon_viewbox`, default 0 0 64 64). Inline
 * shapes are drawn as navy line art, as in the design's `.gap-card .gi`.
 * An image icon takes `icon_alt` (falling back to the stat's value and text).
 */
function StatIcon({ icon, viewBox, alt }) {
  const code = icon.trim();
  if (!code.startsWith("<")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={code} alt={alt} width={72} height={72} loading="lazy" decoding="async" className="mb-3 size-[72px]" />;
  }
  const svg = code.match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>$/i);
  const inner = svg ? svg[2] : code;
  const box = viewBox || svg?.[1].match(/viewbox\s*=\s*["']([^"']+)["']/i)?.[1] || "0 0 64 64";
  return (
    <svg
      viewBox={box}
      width={72}
      height={72}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="mb-3 size-[72px] text-navy"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

/**
 * v2 · 2 Why teams train now (the design's `#gap`) — centered definition
 * lead, 3 to 5 sourced stat cards on a baseline (vertical on small
 * screens), the full sources line, and the "map our gaps" CTA.
 */
export default function V2Gap({ data }) {
  if (!data) return null;
  const { heading, lead, stats = [], sources_note, cta } = data;

  return (
    <V2Section id="gap">
      <Reveal className="mx-auto mb-10 max-w-[900px] text-center">
        <V2Heading parts={heading} className="mb-3.5" />
        {lead && <Text className="mx-auto mt-3.5 max-w-[860px] text-[16.5px] leading-[1.7] text-ink">{lead}</Text>}
      </Reveal>

      {stats.length > 0 && (
        <Reveal>
          <ul className={styles.rail}>
            {stats.map((stat) => (
              <li key={stat.value + stat.source} className={styles.card}>
                {stat.icon && <StatIcon icon={stat.icon} viewBox={stat.icon_viewbox} alt={stat.icon_alt || `Icon: ${stat.value} ${stat.description ?? ""}`.trim()} />}
                <b className="mb-2 block font-display text-[clamp(32px,2.9vw,42px)] font-bold leading-[1.05] tracking-[-0.03em] whitespace-nowrap text-ink tabular-nums">
                  <StatValue value={stat.value} />
                </b>
                <Text className="text-[15px] leading-[1.4] text-ink">{stat.description}</Text>
                {stat.source && <span className={styles.src}>Source: {stat.source}</span>}
                <span className={styles.ptr} aria-hidden="true" />
                <span className={styles.burst} aria-hidden="true">
                  <span className={`${styles.burstIcon} text-navy`}>
                    <Burst />
                  </span>
                </span>
              </li>
            ))}
            <li aria-hidden="true" className={styles.line} />
          </ul>
        </Reveal>
      )}

      {sources_note && (
        <Text className="mx-auto mt-[18px] max-w-[900px] text-center text-[12.5px]">{sources_note}</Text>
      )}

      {cta?.label && (
        <Reveal className="mt-[34px] rounded-r-[10px] border-l-[6px] border-olive bg-paper-warm px-6 pt-[26px] pb-7 text-center">
          <Text as="h3" className="mx-auto mb-1.5 max-w-[760px] text-[18.5px] leading-[1.3]">{cta.heading}</Text>
          {cta.text && <Text className="mx-auto mb-4 max-w-[680px] text-[15px]">{cta.text}</Text>}
          <V2ScrollLink
            href={cta.href || "#quote"}
            topic={cta.heading}
            title={cta.title || `Click here to ${cta.label}`}
            className={cn(V2_BUTTON.ghost, "bg-white")}
          >
            {cta.label}
            <V2ButtonArrow />
          </V2ScrollLink>
        </Reveal>
      )}
    </V2Section>
  );
}
