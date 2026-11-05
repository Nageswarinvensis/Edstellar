"use client";

import { useState } from "react";
import Image from "next/image";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/**
 * Delivery modes' interactive body: a tab strip that swaps the panel below
 * it. Kept as the smallest client leaf — the section heading/lede stay
 * server-rendered.
 *
 * The panel photo is a static asset per delivery mode, not CMS-driven — the
 * CMS doesn't model delivery-mode imagery, and every course shows the same
 * three modes with the same three photos.
 *
 * **Matched by keyword, not by exact `id`.** Different courses' CMS records
 * name this tab differently (`id: "virtual"` on one, `id: "online"` on
 * another, label "In-house" vs "On-site" vs sublabel-only), so an exact-key
 * lookup silently drops the image on any course that doesn't use the one
 * id this file happened to be written against. Position (virtual, on-site,
 * off-site, hybrid) is the final fallback. A hybrid / blended tab gets its
 * own photo, whichever position it is in (the domain CMS now sends
 * Onsite, Virtual, Hybrid).
 *
 * Each panel can close with a paragraph (`delivery_format_cta_description`)
 * and a button (`btn_label` + `btn_link`) under its points — both optional,
 * rendered only when the CMS sends them.
 *
 * Design: `#modeTabs`, `.tab`, `#modePanels`, `.tab-panel`, `.mode-art`.
 */
// `topicAlt` names the program (a course page passes `topic`, e.g.
// "Generative AI (GenAI)"); without one the plain `alt` is used.
const TAB_IMAGE_RULES = [
  // Hybrid first: a hybrid tab can also mention "virtual" / "online".
  {
    image: {
      src: "/course/hybrid.webp",
      alt: "Hybrid training",
      topicAlt: (topic) => `Hybrid ${topic} training combining onsite and virtual delivery`,
    },
    match: /hybrid|blended/i,
  },
  {
    image: {
      src: "/course/virtual.webp",
      alt: "Virtual training",
      topicAlt: (topic) => `Live virtual instructor-led ${topic} training session`,
    },
    match: /virtual|online/i,
  },
  {
    image: {
      src: "/course/on-site.webp",
      alt: "On-site training",
      topicAlt: (topic) => `Instructor delivering onsite ${topic} training at a client office`,
    },
    match: /on.?site|in.?house/i,
  },
  {
    image: {
      src: "/course/off-site.webp",
      alt: "Off-site training",
      topicAlt: (topic) => `Offsite ${topic} training at a venue away from the workplace`,
    },
    match: /off.?site|away/i,
  },
];

/** By position when no keyword matches: virtual, on-site, off-site, hybrid. */
const POSITION_FALLBACK = [1, 2, 3, 0].map((rule) => TAB_IMAGE_RULES[rule].image);

function imageForTab(tab, index, topic) {
  const haystack = `${tab.id ?? ""} ${tab.label ?? ""} ${tab.sublabel ?? ""}`;
  const byKeyword = TAB_IMAGE_RULES.find((rule) => rule.match.test(haystack));
  const image = byKeyword?.image ?? POSITION_FALLBACK[index];
  if (!image) return image;
  return { src: image.src, alt: topic && image.topicAlt ? image.topicAlt(topic) : image.alt };
}

/** Some CMS records (the domain page's `deliveryModes`, unlike a course's)
 * send no `id` per tab at all — every tab would otherwise collide on
 * `undefined`, both as a React key and as the active-tab match. `label` is
 * always present and unique across a tab strip, so it's the fallback; the
 * index is the last resort. */
function tabKey(tab, index) {
  return tab.id ?? tab.label ?? String(index);
}

export default function DeliveryModeTabs({ tabs, topic }) {
  const [activeKey, setActiveKey] = useState(tabs?.[0] && tabKey(tabs[0], 0));

  if (!tabs?.length) return null;

  const activeIndex = tabs.findIndex((tab, index) => tabKey(tab, index) === activeKey);
  const activeTabKey = activeIndex === -1 ? tabKey(tabs[0], 0) : activeKey;

  return (
    <Box>
      <Box
        role="tablist"
        className="mb-8 flex flex-wrap border-b border-ink/12"
      >
        {tabs.map((tab, index) => {
          const key = tabKey(tab, index);
          const isActive = key === activeTabKey;

          return (
            <button
              key={key}
              id={`mode-tab-${key}`}
              type="button"
              role="tab"
             
              aria-selected={isActive}
              aria-controls={`mode-panel-${key}`}
              onClick={() => setActiveKey(key)}
              className="relative mr-5.5 cursor-pointer border-none bg-transparent px-1.5 py-3.5 text-left transition-colors duration-200"
            >
              <Text
                as="span"
                className="mb-1.25 block font-mono text-[10px] tracking-[0.14em] text-ink-muted uppercase"
              >
                {tab.sublabel}
              </Text>

              <Text
                as="span"
                className={cn(
                  "font-display text-base font-semibold tracking-[-0.01em]",
                  isActive ? "text-ink" : "text-ink-muted",
                )}
              >
                {tab.label}
              </Text>

              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-px left-0 h-0.5 bg-lime transition-all duration-300",
                  isActive ? "w-full" : "w-0",
                )}
              />
            </button>
          );
        })}
      </Box>

      {tabs.map((tab, index) => {
        const key = tabKey(tab, index);
        const isActive = key === activeTabKey;
        const image = imageForTab(tab, index, topic);

        return (
          <Box
            key={key}
            id={`mode-panel-${key}`}
            role="tabpanel"
            aria-labelledby={`mode-tab-${key}`}
            hidden={!isActive}
          >
            {/* Full-width heading; the copy and the image start together below it. */}
            <Text
              as="h3"
              className="mb-4 font-display text-2xl font-medium tracking-[-0.02em] text-ink"
            >
              {tab.title}
            </Text>

            <Box className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
              <Box>
                <Text
                  as="p"
                  className="mb-4.5 text-[15px] leading-[1.6] text-ink-muted"
                >
                  {tab.description}
                </Text>

                <Box as="ul" className="flex flex-col divide-y divide-ink/12">
                  {tab.points?.map((point, pointIndex) => (
                    <Reveal
                      as="li"
                      key={point}
                      delay={Math.min(pointIndex + 1, 4)}
                      className="flex gap-3 py-2.25 text-[14.5px] --tw-leading: 1.5 text-ink-muted"
                    >
                      <Text
                        as="span"
                        aria-hidden="true"
                        className="font-bold text-ink-muted"
                      >
                        →
                      </Text>
                      {point}
                    </Reveal>
                  ))}
                </Box>

                {tab.delivery_format_cta_description ? (
                  <Text as="p" className="mt-5 text-[15px] leading-[1.6] text-ink-muted">
                    {tab.delivery_format_cta_description}
                  </Text>
                ) : null}

                {tab.btn_label && tab.btn_link ? (
                  <CtaButton
                    arrow
                    render={
                      <a
                        href={tab.btn_link}
                        title={/^get a quote$/i.test(tab.btn_label.trim()) ? "Click here to get a quote for this delivery format" : undefined}
                      />
                    }
                    className="mt-6"
                  >
                    {tab.btn_label}
                  </CtaButton>
                ) : null}
              </Box>

              <Box
                aria-hidden="true"
                className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,var(--color-navy)_0%,var(--color-navy-soft)_55%,var(--color-paper-cream)_100%)]"
              >
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    title={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                ) : null}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}