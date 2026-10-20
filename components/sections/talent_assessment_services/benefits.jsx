"use client";

import { useState } from "react";
import {
  MessageSquare,
  Puzzle,
  Rocket,
  UserRoundCheck,
  Heart,
  Star,
  Eye,
  TrendingUp,
  Users,
  ShieldCheck,
  Globe,
  ClipboardList,
  Target,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

import Reveal from "@/components/common/reveal";
const ICONS = {
  message: MessageSquare,
  puzzle: Puzzle,
  rocket: Rocket,
  "user-check": UserRoundCheck,
  heart: Heart,
  star: Star,
  eye: Eye,
  "trending-up": TrendingUp,
  users: Users,
  shield: ShieldCheck,
  globe: Globe,
  clipboard: ClipboardList,
  target: Target,
};

const pad = (n) => String(n).padStart(2, "0");

/**
 * Dark benefits band of expanding panels — one is open at a time, the rest
 * collapse to a vertical label. Prev/next and dots step through them.
 *
 * Design: `#benefits`, `.bx`, `.bx-n`, `.bx-v`, `.bx-b`, `.bx-ctl`.
 */
export default function Benefits({ data }) {
  const items = data?.items ?? [];
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  const { section_id, heading, description } = data;
  const go = (next) => setActive((cur) => (next + items.length) % items.length);

  return (
    <Section id={section_id} className="bg-navy">
      <Reveal>
        <Box className="mb-3 max-w-[72ch]">
          <RichHeading
            heading={heading}
            className="text-paper"
            emphasisClassName="font-normal text-lime"
          />
          {description ? (
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/60"
            >
              {description}
            </Text>
          ) : null}
        </Box>

        <Box
          as="ol"
          className="mt-3 flex list-none gap-3 p-0 h-110 max-[860px]:h-auto max-[860px]:flex-col"
        >
          {items.map((item, index) => {
            const Icon = ICONS[item.icon] || Star;
            const isOpen = index === active;

            return (
              <Box
                as="li"
                key={item.title}
                tabIndex={0}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActive(index);
                  }
                }}
                aria-expanded={isOpen}
                className={cn(
                  "group relative min-w-0 overflow-hidden rounded-[18px] border transition-[flex-grow,background-color,border-color] duration-500 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
                  "max-[860px]:flex-none max-[860px]:py-5 max-[860px]:pr-5 max-[860px]:pl-[74px]",
                  isOpen
                    ? "flex-[3.6] cursor-default border-paper bg-paper"
                    : "flex-1 cursor-pointer border-paper/14 bg-paper/[0.04] hover:border-lime/60",
                )}
              >
                {/* Big serif index */}
                <Text
                  as="span"
                  aria-hidden="true"
                  className={cn(
                    "absolute top-5 left-5 font-serif italic leading-none transition-[font-size,color] duration-400 max-[860px]:top-3.5 max-[860px]:lining-nums",
                    isOpen
                      ? "text-[88px] text-navy max-[860px]:text-[30px]"
                      : "text-[44px] text-lime/75 max-[860px]:text-[30px]",
                  )}
                >
                  {pad(index + 1)}
                </Text>

                {/* Vertical label (collapsed only) */}
                <Text
                  as="span"
                  aria-hidden="true"
                  className={cn(
                    // Spans from below the 44px index (top-23) to the card's foot, so a
                    // long title breaks onto a second vertical line instead of
                    // running into the number.
                    "absolute top-23 bottom-6 left-5.5 font-display text-[17px] min-[861px]:leading-[1.25] min-[861px]:text-balance font-semibold text-paper [writing-mode:vertical-rl] [transform:rotate(180deg)]",
                    "max-[860px]:static max-[860px]:block max-[860px]:whitespace-normal max-[860px]:pt-1 max-[860px]:[writing-mode:horizontal-tb] max-[860px]:[transform:none]",
                    isOpen && "opacity-0 max-[860px]:hidden",
                  )}
                >
                  {item.title}
                </Text>

                {/* Expanded content */}
                <Box
                  className={cn(
                    "absolute right-9 bottom-8.5 left-9 max-w-115 transition-[opacity,transform] duration-400",
                    "max-[860px]:static max-[860px]:max-w-none max-[860px]:overflow-hidden max-[860px]:transition-[max-height]",
                    isOpen
                      ? "opacity-100 max-[860px]:max-h-105"
                      : "pointer-events-none translate-y-3 opacity-0 max-[860px]:max-h-0",
                  )}
                >
                  <Box className="mb-4.5 grid size-13 place-items-center rounded-[14px] bg-navy text-lime max-[860px]:size-10">
                    <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
                  </Box>
                  <Text
                    as="h3"
                    className="mb-2.5 font-display text-[26px] font-medium leading-[1.2] text-navy max-[860px]:text-[20px]"
                  >
                    {item.title}
                  </Text>
                  <Text as="p" className="text-[16px] leading-[1.6] text-ink-muted max-[860px]:text-[15px]">
                    {item.description}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Controls */}
        <Box className="mt-5.5 flex items-center justify-between text-paper max-[860px]:hidden">
          <Box className="flex gap-2" aria-hidden="true">
            {items.map((item, index) => (
              <span
                key={item.title}
                className={cn(
                  "h-1 rounded-sm transition-[width,background-color] duration-300",
                  index === active ? "w-12 bg-lime" : "w-7 bg-paper/20",
                )}
              />
            ))}
          </Box>
          <Box className="flex items-center gap-3.5 font-mono text-[14px]">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous benefit"
              className="grid size-11 place-items-center rounded-full border border-paper/35 text-paper transition-colors hover:border-lime hover:bg-lime hover:text-navy"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <span aria-hidden="true">{`${pad(active + 1)} / ${pad(items.length)}`}</span>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next benefit"
              className="grid size-11 place-items-center rounded-full border border-paper/35 text-paper transition-colors hover:border-lime hover:bg-lime hover:text-navy"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
