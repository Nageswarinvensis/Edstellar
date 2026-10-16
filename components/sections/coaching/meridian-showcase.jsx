"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { coachingIcon } from "@/components/sections/coaching/icons";
import { MeridianWindow } from "@/components/sections/coaching/meridian-panels";
import { cn } from "@/lib/utils";

/**
 * Meridian spotlight — header with CTAs, then a tab list of four features on
 * the left and, on the right, each tab's CMS image (or, until a tab has one,
 * its built-in product screen). ARIA tabs with arrow-key movement. Every panel is rendered (inactive ones `hidden`), so
 * the copy is in the HTML.
 *
 * Design: coaching-hub `#meridian`, `.mer-head`, `.m2`, `.m2-t`, `.m2-stage`.
 */
/** A tab's right-side image from the CMS — `image` as a URL string or
 * `{ src, alt }` (also read as `image_url`), with `image_alt` — or `null`,
 * in which case the built-in product panel (`tab.panel`) is drawn instead. */
function tabImage(tab) {
  const image = tab.image ?? tab.image_url;
  const src = typeof image === "string" ? image : image?.src;
  if (!src) return null;
  return { src, alt: (typeof image === "object" && image?.alt) || tab.image_alt || tab.title };
}

export default function MeridianShowcase({ data }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const tabs = data?.tabs ?? [];

  if (!tabs.length) return null;

  const { section_id, tag, heading, description, buttons } = data;

  const onKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (active + keys[event.key] + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id={section_id} className="bg-navy-deep text-paper lg:py-14">
      <Box className="mb-7">
        <Reveal>
          {tag ? (
            <Text as="span" className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-lime">
              <Sparkles size={15} aria-hidden="true" />
              {tag}
            </Text>
          ) : null}
          <RichHeading heading={heading} className="text-paper" emphasisClassName="font-normal text-lime" />
        </Reveal>
        <Box className="mt-3.5 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          {description ? (
            <Reveal delay={1} className="max-w-160">
              <Text as="p" className="text-[16px] leading-[1.7] text-paper/60">
                {description}
              </Text>
            </Reveal>
          ) : null}
          {buttons?.length ? (
            <Reveal delay={2} className="flex flex-none flex-wrap gap-4 max-[600px]:w-full">
              {buttons.map((button) =>
                button.variant === "primary" ? (
                  <CtaButton
                    key={button.label}
                    color="lime"
                    arrow
                    render={<Link href={button.href} />}
                    className="px-7 py-4 focus-visible:outline-lime"
                  >
                    {button.label}
                  </CtaButton>
                ) : (
                  <CtaButton
                    key={button.label}
                    variant="secondary"
                    render={<Link href={button.href} />}
                    className="border-[1.5px] border-paper/50 px-7 py-4 text-paper hover:-translate-y-0.5 hover:border-paper hover:bg-transparent"
                  >
                    {button.label}
                  </CtaButton>
                ),
              )}
            </Reveal>
          ) : null}
        </Box>
      </Box>

      <Reveal
        delay={2}
        className="grid h-[min(520px,calc(100vh-330px))] min-h-110 grid-cols-[340px_1fr] items-stretch gap-6 max-[1200px]:h-auto max-[1200px]:min-h-0 max-[1200px]:grid-cols-1"
      >
        <Box
          role="tablist"
          aria-label="Meridian features"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="no-scrollbar flex min-w-0 flex-col gap-2 max-[1200px]:flex-row max-[1200px]:overflow-x-auto max-[600px]:-mx-4 max-[600px]:px-4 max-[600px]:pb-1"
        >
          {tabs.map((tab, index) => {
            const Icon = coachingIcon(tab.icon);
            const selected = index === active;
            return (
              <button
                key={tab.title}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`m2-t${index}`}
                aria-controls={`m2-p${index}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "grid flex-1 cursor-pointer grid-cols-[44px_1fr] items-center gap-3.5 rounded-[14px] border px-4 py-3.5 text-left text-paper transition-transform duration-200 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lime max-[1200px]:flex-none max-[600px]:max-w-75",
                  selected ? "border-lime/50 bg-navy-soft" : "border-paper/10 bg-transparent",
                )}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-lime/12 text-lime">
                  {Icon ? <Icon size={20} strokeWidth={1.7} aria-hidden="true" /> : null}
                </span>
                <span>
                  <b className="mb-0.5 block font-display text-[15px] leading-[1.35]">{tab.title}</b>
                  <small
                    className={cn(
                      "block font-mono text-[10.5px] uppercase tracking-[0.12em]",
                      selected ? "text-lime" : "text-paper/55",
                    )}
                  >
                    {tab.role}
                  </small>
                </span>
              </button>
            );
          })}
        </Box>

        <Box className="flex min-h-0 min-w-0 rounded-[20px] bg-navy-soft p-4 max-[600px]:p-3">
          {tabs.map((tab, index) => (
            <Box
              key={tab.title}
              role="tabpanel"
              id={`m2-p${index}`}
              aria-labelledby={`m2-t${index}`}
              hidden={index !== active}
              className="min-h-0 flex-1 [&:not([hidden])]:flex"
            >
              {tabImage(tab) ? (
                <img
                  src={tabImage(tab).src}
                  alt={tabImage(tab).alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="block h-auto w-full self-start rounded-[14px] object-contain"
                />
              ) : (
                <MeridianWindow panel={tab.panel} />
              )}
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
