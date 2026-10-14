import Link from "next/link";
import { ArrowRight, Check, Lock, MessageSquare, Target, X } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CoachingCtaBand from "@/components/sections/coaching/coaching-cta-band";
import { coachingIcon } from "@/components/sections/coaching/icons";
import { cn } from "@/lib/utils";

const MINI_ICONS = { target: Target, "message-square": MessageSquare };

// Bar heights for the two little charts (decorative, fixed by the design).
const APP_BARS = ["h-[30%]", "h-[42%]", "h-[38%]", "h-[58%]", "h-[70%]", "h-[88%] bg-lime"];
const NODE_BARS = ["h-[45%] bg-navy", "h-[80%] bg-lime", "h-[60%] bg-navy", "h-[95%] bg-navy"];

const Arrow = () => (
  <span
    aria-hidden="true"
    className="relative mx-2 mb-5.5 h-0.5 w-7 bg-navy after:absolute after:-top-0.75 after:-right-px after:size-1.5 after:rotate-45 after:border-t-2 after:border-r-2 after:border-navy after:content-[''] max-[420px]:mx-1 max-[420px]:w-3.5"
  />
);

/** The small diagram on each card, picked by `visual.type`. Decorative. */
function Visual({ visual }) {
  switch (visual?.type) {
    case "app":
      return (
        <Box className="w-full max-w-75 overflow-hidden rounded-[10px] border border-ink/22 bg-white shadow-rest">
          <Box className="flex items-center gap-1 bg-navy px-2 py-1.5">
            <i className="size-1.5 rounded-full bg-lime" />
            <i className="size-1.5 rounded-full bg-paper/30" />
            <i className="size-1.5 rounded-full bg-paper/30" />
            <span className="ml-auto text-[9.5px] uppercase tracking-[0.12em] text-lime">{visual.title}</span>
          </Box>
          <Box className="flex gap-2.5 p-2">
            <ul className="m-0 flex flex-none list-none flex-col gap-0.75 p-0">
              {visual.menu.map((item, i) => (
                <li key={item} className={cn("rounded-[5px] px-2 py-1 text-[10.5px]", i === visual.active ? "bg-navy text-lime" : "text-ink/60")}>
                  {item}
                </li>
              ))}
            </ul>
            <span className="flex h-17.5 flex-1 items-end gap-1 border-b border-l border-ink/12 pl-1.5">
              {APP_BARS.map((cls, i) => (
                <b key={i} className={cn("flex-1 rounded-t-[3px] bg-paper-cream", cls)} />
              ))}
            </span>
          </Box>
        </Box>
      );
    case "match":
      return (
        <Box className="flex flex-col items-center gap-3">
          <Box className="flex items-center">
            {visual.avatars.map((initials, i) => {
              const on = i === visual.selected;
              return (
                <span
                  key={initials}
                  className={cn(
                    "relative -mx-1 grid place-items-center rounded-full border-2",
                    on ? "z-1 size-13.5 border-lime bg-navy text-[12px] text-lime" : "size-10.5 border-paper-warm bg-paper-cream text-[10.5px] text-ink/60",
                  )}
                >
                  {initials}
                  {on ? (
                    <i className="absolute -right-1 -bottom-0.5 grid size-4.5 place-items-center rounded-full border-2 border-paper-warm bg-lime text-navy">
                      <Check size={10} strokeWidth={3} />
                    </i>
                  ) : null}
                </span>
              );
            })}
          </Box>
          <ol className="m-0 flex list-none items-center p-0">
            {visual.steps.map((step, i) => (
              <li
                key={step.label}
                className={cn(
                  "flex items-center gap-1.25 text-[10.5px] uppercase tracking-[0.06em] max-[420px]:gap-0.75 max-[420px]:text-[9px] max-[420px]:tracking-[0.02em]",
                  step.state === "todo" ? "text-ink/60" : "font-medium text-navy",
                )}
              >
                {i > 0 ? (
                  <span aria-hidden="true" className={cn("mx-1.5 h-0.5 w-4 max-[420px]:mx-1 max-[420px]:w-2", visual.steps[i - 1].state === "done" ? "bg-navy" : "bg-ink/22")} />
                ) : null}
                {step.state === "done" ? (
                  <Check size={12} strokeWidth={2.4} />
                ) : (
                  <i
                    className={cn(
                      "size-2.5 rounded-full border-2",
                      step.state === "now" ? "border-navy bg-lime shadow-[0_0_0_3px_rgba(200,241,53,.35)]" : "border-ink/22",
                    )}
                  />
                )}
                {step.label}
              </li>
            ))}
          </ol>
        </Box>
      );
    case "flow":
      return (
        <Box className="flex items-center">
          {visual.nodes.map((node, i) => {
            const Icon = MINI_ICONS[node.icon];
            return (
              <Box key={node.label} className="flex items-center">
                {i > 0 ? <Arrow /> : null}
                <span className={cn("flex flex-col items-center gap-2 text-[10.5px] uppercase tracking-[0.1em]", node.active ? "font-medium text-navy" : "text-ink/60")}>
                  <span
                    className={cn(
                      "flex size-15 rounded-xl border max-[420px]:size-11",
                      node.active ? "border-navy bg-navy text-lime" : "border-ink/22 bg-white text-navy",
                      node.kind === "bars" ? "items-end gap-1 px-2.5 py-3" : "items-center justify-center",
                    )}
                  >
                    {node.kind === "bars"
                      ? NODE_BARS.map((cls, k) => <i key={k} className={cn("flex-1 rounded-[2px]", cls)} />)
                      : Icon ? <Icon size={22} strokeWidth={1.7} /> : null}
                  </span>
                  {node.label}
                </span>
              </Box>
            );
          })}
        </Box>
      );
    case "privacy":
      return (
        <Box className="flex items-center">
          <span className="relative flex flex-col gap-1.25 rounded-xl border border-dashed border-lime/60 bg-navy px-3 pt-4 pb-2.5">
            <b className="absolute -top-2.75 left-1/2 grid size-5.5 -translate-x-1/2 place-items-center rounded-full bg-lime text-navy">
              <Lock size={12} />
            </b>
            {visual.vault.map((label) => (
              <span key={label} className="rounded-full bg-paper/10 px-2.5 py-1 text-center text-[10px] uppercase tracking-[0.1em] text-paper">
                {label}
              </span>
            ))}
          </span>
          <Arrow />
          <ul className="m-0 flex list-none flex-col gap-1.25 p-0">
            {visual.shared.map((item) => (
              <li
                key={item.label}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.25 py-1 text-[10.5px] uppercase tracking-[0.06em]",
                  item.shared ? "border-ink/12 bg-white text-navy" : "border-dashed border-ink/12 text-ink/45 line-through",
                )}
              >
                {item.shared ? <Check size={12} strokeWidth={2.2} /> : <X size={12} strokeWidth={2.2} />}
                {item.label}
              </li>
            ))}
          </ul>
        </Box>
      );
    case "zones":
      return (
        <Box className="flex flex-col items-center gap-2.5">
          <Text as="p" className="m-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60">
            {visual.caption}
          </Text>
          <Box className="relative flex gap-1.5 before:absolute before:top-1/2 before:right-4 before:left-4 before:h-px before:bg-ink/22 before:content-[''] max-[420px]:gap-0.75">
            {visual.zones.map((zone) => (
              <span
                key={zone.zone}
                className={cn(
                  "relative flex flex-col items-center gap-0.75 rounded-lg border px-2.25 py-2 max-[420px]:px-0.75 max-[420px]:py-1.5",
                  zone.active ? "scale-112 border-navy bg-navy max-[420px]:scale-100" : "border-ink/12 bg-white",
                )}
              >
                <b className={cn("text-[9.5px] font-normal tracking-[0.1em] max-[420px]:text-[8.5px]", zone.active ? "text-paper/70" : "text-ink/60")}>{zone.zone}</b>
                <span className={cn("text-[13px] max-[420px]:text-[11px]", zone.active ? "text-lime" : "text-navy")}>{zone.time}</span>
              </span>
            ))}
          </Box>
        </Box>
      );
    case "venn":
      return visual.svg ? (
        <Box
          className="w-full p-2.5 [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-67.5 [&_text]:font-mono [&_text]:text-[9px] [&_text]:tracking-[0.1em]"
          dangerouslySetInnerHTML={{ __html: visual.svg }}
        />
      ) : null;
    default:
      return null;
  }
}

/**
 * Why Edstellar — six cards (icon, title, line, a small diagram, "the
 * difference"), aligned on a subgrid so rows line up; then a navy CTA band and
 * four related-service cards.
 *
 * Design: coaching-hub `#why`, `.w1`, `.w1-c`, `.mv`, `.w1-diff`, `.why-cta`,
 * `.rel-head`, `.rel-grid`, `.rel-card`.
 */
export default function CoachingWhy({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, items, difference_label, cta, related } = data;

  return (
    <Section id={section_id}>
      <Box className="mb-12 max-w-205 max-[600px]:mb-8">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-3 gap-5 max-[1200px]:grid-cols-2 max-[600px]:grid-cols-1">
        {items.map((item, index) => {
          const Icon = coachingIcon(item.icon);
          return (
            <Reveal
              as="article"
              key={item.title}
              delay={Math.min((index % 3) + 1, 4)}
              className="row-span-5 grid min-w-0 grid-rows-subgrid content-start gap-y-0 rounded-[14px] border border-ink/12 bg-white p-7 max-[600px]:p-5.5"
            >
              <span className="mb-4 grid size-11 place-items-center rounded-xl bg-lime-soft text-navy">
                {Icon ? <Icon size={20} strokeWidth={1.7} aria-hidden="true" /> : null}
              </span>
              <Text as="h3" className="mb-2 text-[18px] leading-[1.3] font-semibold text-ink">
                {item.title}
              </Text>
              <Text as="p" className="text-[14.5px] leading-[1.6] text-ink/60">
                {item.description}
              </Text>
              <Box
                aria-hidden="true"
                className="mt-1.5 mb-4.5 flex min-h-43 flex-wrap items-center justify-center gap-2 rounded-xl bg-paper-warm p-4.5 font-mono text-[11px] max-[420px]:px-2.5 max-[420px]:py-3.5"
              >
                <Visual visual={item.visual} />
              </Box>
              <Box className="border-t border-ink/12 pt-3.5">
                <Text as="span" className="mb-1 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/60">
                  {difference_label}
                </Text>
                <b className="text-[14px] leading-normal text-ink">{item.difference}</b>
              </Box>
            </Reveal>
          );
        })}
      </Box>

      <CoachingCtaBand data={cta} inline />

      {related?.items?.length ? (
        <>
          <Box className="mt-18 mb-6">
            <Text as="h3" className="mb-1.5 text-[22px] leading-[1.3] font-semibold tracking-[-0.02em] text-ink">
              {related.heading}
            </Text>
            {related.description ? (
              <Text as="p" className="m-0 text-[16px] text-ink/60">
                {related.description}
              </Text>
            ) : null}
          </Box>
          <Box className="grid grid-cols-4 gap-5 max-[1200px]:grid-cols-2 max-[600px]:grid-cols-1">
            {related.items.map((item, index) => {
              const Icon = coachingIcon(item.icon);
              return (
                <Reveal key={item.title} delay={Math.min(index + 1, 4)} className="h-full">
                  <Box
                    as={Link}
                    href={item.href}
                    title={`Click Here to View ${item.title}`}
                    className="group flex h-full flex-col gap-3 rounded-[14px] border border-ink/12 bg-white p-7 text-ink no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0 max-[600px]:p-5.5"
                  >
                    <span className="grid size-12 place-items-center rounded-xl bg-lime-soft text-navy">
                      {Icon ? <Icon size={22} strokeWidth={1.7} aria-hidden="true" /> : null}
                    </span>
                    <Text as="h4" className="text-[18px] leading-[1.3] font-semibold tracking-[-0.01em] text-ink">
                      {item.title}
                    </Text>
                    <Text as="p" className="m-0 text-[14.5px] leading-[1.6] text-ink/60">
                      {item.description}
                    </Text>
                    <Text as="span" className="mt-auto inline-flex items-center gap-2 pt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-navy">
                      {item.link}
                      <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Text>
                  </Box>
                </Reveal>
              );
            })}
          </Box>
        </>
      ) : null}
    </Section>
  );
}
