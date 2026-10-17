"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Coaching benefits — expanding panels. One panel is open (wide, full-color
 * art, the copy); the rest are narrow strips with a vertical label and faded
 * art. Dots and arrows below move between them on desktop; below 900px the
 * panels stack and each closed one is a full-width row.
 *
 * Every panel's copy is in the DOM (only hidden when closed), so all six
 * benefits stay crawlable.
 *
 * Design: coaching-hub `#benefits`, `.bf`, `.bf-panel`, `.bf-btn`,
 * `.bf-body`, `.bf-art`, `.bf-ctrl`.
 */
export default function CoachingBenefits({ data }) {
  const [active, setActive] = useState(0);
  const headingRefs = useRef([]);
  const items = data?.items ?? [];

  if (!items.length) return null;

  const { section_id, heading, description } = data;
  const total = items.length;

  const show = (index, focus = false) => {
    const next = (index + total) % total;
    setActive(next);
    if (focus) {
      requestAnimationFrame(() => headingRefs.current[next]?.focus({ preventScroll: true }));
    }
  };

  return (
    <Section id={section_id} className="bg-paper-warm">
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

      <Box className="flex h-110 gap-3 max-[900px]:h-auto max-[900px]:flex-col">
        {items.map((item, index) => {
          const open = index === active;
          const bodyId = `bf-body-${index}`;
          return (
            <Box
              key={item.title}
              className={cn(
                "relative min-w-0 overflow-hidden rounded-[14px] border border-ink/12 bg-white transition-[flex-grow,box-shadow,border-color] duration-450 ease-[cubic-bezier(.2,.7,.2,1)] max-[900px]:flex-none motion-reduce:transition-none",
                open
                  ? "flex-[5] shadow-lift after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_46%,rgba(255,255,255,.85)_58%,rgba(255,255,255,0)_78%)] after:content-[''] max-[900px]:after:bg-[linear-gradient(180deg,rgba(255,255,255,.97)_0%,rgba(255,255,255,.92)_60%,rgba(255,255,255,.6)_100%)]"
                  : "flex-1 hover:border-ink/22",
              )}
            >
              {item.art_svg ? (
                <Box
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 transition-opacity duration-450 [&_svg]:size-full",
                    open ? "opacity-100 max-[900px]:opacity-55" : "opacity-9 grayscale",
                  )}
                  dangerouslySetInnerHTML={{ __html: item.art_svg }}
                />
              ) : null}

              {/* Closed: the whole strip is the button */}
              <button
                type="button"
                onClick={() => show(index, true)}
                aria-expanded={open}
                aria-controls={bodyId}
                className={cn(
                  "absolute inset-0 z-1 flex cursor-pointer flex-col justify-between px-5 py-6 text-left focus-visible:-outline-offset-4 focus-visible:outline-2 focus-visible:outline-navy",
                  "max-[900px]:relative max-[900px]:w-full max-[900px]:flex-row max-[900px]:items-center max-[900px]:justify-start max-[900px]:gap-4 max-[900px]:py-4.5",
                  open && "hidden",
                )}
              >
                <Text as="span" className="font-mono text-[12px] tracking-[0.12em] text-ink/60">
                  {pad(index + 1)}
                </Text>
                <Text
                  as="span"
                  className="max-h-75 rotate-180 font-display text-[17px] leading-[1.25] font-semibold text-ink [writing-mode:vertical-rl] max-[900px]:max-h-none max-[900px]:rotate-0 max-[900px]:text-[16px] max-[900px]:[writing-mode:horizontal-tb]"
                >
                  {item.title}
                </Text>
              </button>

              {/* Open: the copy */}
              <Box
                id={bodyId}
                role="region"
                aria-label={item.title}
                className={cn(
                  "absolute inset-0 z-1 flex-col p-10 text-ink max-[900px]:relative max-[900px]:px-6 max-[900px]:py-7",
                  open ? "flex" : "hidden",
                )}
              >
                <Text as="span" className="font-mono text-[12px] tracking-[0.12em] text-ink/60">
                  {pad(index + 1)} / {pad(total)}
                </Text>
                <Text
                  as="h3"
                  ref={(el) => {
                    headingRefs.current[index] = el;
                  }}
                  tabIndex={-1}
                  className="mt-3 mb-4 max-w-[min(440px,58%)] text-[clamp(22px,2.2vw,28px)] leading-[1.15] font-medium tracking-[-0.02em] outline-none max-[900px]:max-w-none"
                >
                  {item.title}
                </Text>
                <Text as="p" className="max-w-[min(440px,58%)] text-[16px] leading-[1.7] text-ink/60 max-[900px]:max-w-none">
                  {item.description}
                </Text>
                {item.points?.length ? (
                  <Box as="ul" className="m-0 mt-2 grid max-w-[min(440px,58%)] list-none gap-2.5 p-0 max-[900px]:max-w-none">
                    {item.points.map((point) => (
                      <Box as="li" key={point} className="flex gap-2.5 text-[15px] leading-[1.6]">
                        <Check size={20} strokeWidth={1.8} className="mt-0.75 flex-none text-navy" aria-hidden="true" />
                        {point}
                      </Box>
                    ))}
                  </Box>
                ) : null}
                {/* `link` is `{ label, href }`, or just the href as a string
                    (how the CMS currently sends it) with a default label. */}
                {(typeof item.link === "string" ? item.link : item.link?.href) ? (
                  <Link
                    href={typeof item.link === "string" ? item.link : item.link.href}
                    title={`Click Here to View ${item.title}`}
                    className="mt-4.5 inline-flex items-center gap-2 self-start text-[14px] font-semibold text-navy underline-offset-3 hover:underline"
                  >
                    {(typeof item.link === "string" ? null : item.link.label) || "Learn more"}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                ) : null}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box className="mt-6 flex items-center justify-between max-[900px]:hidden">
        <Box className="flex gap-2" role="group" aria-label="Choose a benefit">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => show(index)}
              aria-label={`Benefit ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className={cn("size-2.5 cursor-pointer rounded-full", index === active ? "bg-navy" : "bg-ink/20")}
            />
          ))}
        </Box>
        <Box className="flex items-center gap-3 font-mono text-[13px] text-ink/60">
          <span aria-live="polite">
            {pad(active + 1)} / {pad(total)}
          </span>
          {[
            { dir: -1, label: "Previous benefit", Icon: ChevronLeft },
            { dir: 1, label: "Next benefit", Icon: ChevronRight },
          ].map(({ dir, label, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => show(active + dir)}
              aria-label={label}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/22 bg-white text-navy transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Icon size={18} aria-hidden="true" />
            </button>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
