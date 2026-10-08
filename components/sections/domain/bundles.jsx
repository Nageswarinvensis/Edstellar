"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Scale,
  Lock,
  Landmark,
  FileText,
  Coins,
  Network,
  Layers,
  Users,
  Clock,
  ChevronRight,
  X,
  Package,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * "Compliance bundles for whole teams" — the `#bundles` section of the domain
 * design. A header, a row of category filter tabs, a grid of bundle cards, and
 * a centered "View all" button. Clicking a card opens a right-side slide-in
 * drawer (`BundleDrawer`) listing that bundle's programs.
 *
 * Client Component: the filter tabs hold `useState` for the active category and
 * narrow the visible cards — same pattern as `byrole.jsx`/`scope.jsx`. The
 * drawer adds a second piece of state (`openBundle`). Matches the card styling
 * of `topics.jsx`/`explore-categories.jsx`.
 */

// Bundle-card icons, mapped by the CMS's string `icon` key. Never index this
// without the fallback — an unmapped key would render `undefined` as an element
// and crash the page (see sections/domain/path.jsx).
const bundleIcons = {
  scale: Scale,
  lock: Lock,
  landmark: Landmark,
  file: FileText,
  coins: Coins,
  network: Network,
};

// `icon_variant` → tinted icon-tile classes. The design's hexes have no theme
// token, so arbitrary Tailwind values are used per CLAUDE.md (mirrors
// `.bn-ic.t-*` in the source).
const iconVariants = {
  orange: "bg-[#FFF0E5] text-[#C2410C]",
  blue: "bg-[#E8EFFE] text-[#1D4ED8]",
  gold: "bg-[#FEF5DC] text-[#A16207]",
  teal: "bg-[#E1F5EF] text-[#0F766E]",
  purple: "bg-[#F0E9FE] text-[#6D28D9]",
  green: "bg-[#E5F5E8] text-[#15803D]",
  sky: "bg-[#E2F3FB] text-[#0369A1]",
  red: "bg-[#FDEBEB] text-[#B91C1C]",
};

function BundleCard({ bundle, onOpen }) {
  const Icon = bundleIcons[bundle.icon] ?? Package;
  const iconClass = iconVariants[bundle.icon_variant] ?? iconVariants.orange;

  return (
    <Box
      as="button"
      type="button"
      onClick={() => onOpen(bundle)}
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[14px] border border-ink/12 bg-white text-left shadow-[0_1px_0_rgba(10,22,40,0.04)] transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-1 hover:border-ink/22 hover:shadow-[0_24px_48px_-30px_rgba(10,22,40,0.45)]"
    >
      <Box className="relative block aspect-[16/9] overflow-hidden bg-paper-warm">
        {bundle.image ? (
          <img
            src={bundle.image}
            alt={bundle.image_alt || bundle.name || ""}
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
          />
        ) : null}

        {bundle.badge ? (
          <Text
            as="span"
            className="absolute right-2.5 top-2.5 rounded-[6px] bg-lime px-[9px] py-[5px] font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-navy"
          >
            {bundle.badge}
          </Text>
        ) : null}
      </Box>

      <Box className="relative flex flex-1 flex-col gap-2.5 px-[18px] pb-[18px]">
        <Box
          as="span"
          className={`-mt-[22px] grid size-11 place-items-center rounded-[11px] border-[3px] border-white shadow-[0_6px_16px_-8px_rgba(10,22,40,0.35)] ${iconClass}`}
        >
          <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
        </Box>

        <Text
          as="span"
          className="font-display text-[16px] font-bold leading-[1.25] tracking-[-0.01em] text-ink"
        >
          {bundle.name}
        </Text>

        <Text
          as="span"
          className="flex-1 text-[13.5px] leading-[1.55] text-ink-muted"
        >
          {bundle.description}
        </Text>

        <Box className="flex flex-col gap-[7px] pt-1">
          <Box
            as="span"
            className="flex items-center gap-2 text-[12.5px] font-medium text-ink"
          >
            <Layers
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
              className="flex-none text-ink-muted"
            />
            {bundle.program_count}
          </Box>

          <Box
            as="span"
            className="flex items-center gap-2 text-[12.5px] font-medium text-ink"
          >
            <Users
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
              className="flex-none text-ink-muted"
            />
            {bundle.audience}
          </Box>
        </Box>

        <Box
          as="span"
          className="mt-1 inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-navy"
        >
          View bundle
          <ArrowRight
            size={15}
            strokeWidth={2.2}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Right-side slide-in drawer listing a bundle's programs. Ported from the
 * design's `.bd-drawer`/`.bd-overlay` markup + CSS. Mounts only while a bundle
 * is open; a `shown` flag flipped on the next frame drives the slide-in
 * transition. Closes on the X, the "Close" button, the overlay, and Escape,
 * and locks body scroll while open.
 */
function BundleDrawer({ bundle, onClose }) {
  const [shown, setShown] = useState(false);

  const Icon = bundleIcons[bundle.icon] ?? Package;
  const iconClass = iconVariants[bundle.icon_variant] ?? iconVariants.orange;
  const programs = bundle.programs ?? [];

  // Slide in on the frame after mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Close on Escape.
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <Box
        onClick={onClose}
        className={[
          "fixed inset-0 z-[1300] bg-navy/50 backdrop-blur-[2px] transition-opacity duration-300",
          shown ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      <Box
        as="aside"
        role="dialog"
        aria-modal="true"
        aria-label={bundle.name}
        className={[
          "fixed inset-y-0 right-0 z-[1301] flex w-[min(600px,94vw)] flex-col bg-white shadow-[-24px_0_60px_rgba(5,13,26,0.26)] transition-transform duration-[360ms] ease-[cubic-bezier(.4,0,.1,1)]",
          shown ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-[18px] top-[18px] z-[4] grid size-10 cursor-pointer place-items-center rounded-[10px] border border-ink/12 bg-white text-ink transition-colors duration-200 hover:bg-paper-warm"
        >
          <X size={18} strokeWidth={1.7} aria-hidden="true" />
        </button>

        {/* Header */}
        <Box className="flex flex-none gap-[18px] border-b border-ink/12 px-[34px] pb-[22px] pt-[34px]">
          <Box
            as="span"
            className={`grid size-16 flex-none place-items-center rounded-[14px] ${iconClass}`}
          >
            <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
          </Box>

          <Box>
            <Text
              as="h3"
              className="mb-2 pr-10 font-display text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-ink"
            >
              {bundle.name}
            </Text>

            <Text
              as="p"
              className="mb-0 text-[14.5px] leading-[1.55] text-ink-muted"
            >
              {bundle.description}
            </Text>

            <Box className="mt-[14px] flex flex-wrap gap-[22px]">
              <Box
                as="span"
                className="flex items-center gap-1.5 text-[13px] font-semibold text-ink"
              >
                <Clock
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="flex-none text-ink-muted"
                />
                {programs.length} instructor-led programs
              </Box>

              <Box
                as="span"
                className="flex items-center gap-1.5 text-[13px] font-semibold text-ink"
              >
                <Users
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="flex-none text-ink-muted"
                />
                {bundle.audience}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Body */}
        <Box className="flex-1 overflow-y-auto overscroll-contain px-[34px] pb-7 pt-6">
          <Text
            as="h4"
            className="mb-4 font-display text-[16px] font-bold tracking-[-0.01em] text-ink"
          >
            {programs.length} Programs in this Track
          </Text>

          <Box className="flex flex-col gap-2.5">
            {programs.map((program) => (
              <Box
                as="a"
                href={program.href || "#"}
                key={program.number || program.title}
                className="group flex cursor-pointer items-center gap-[14px] rounded-[12px] border border-ink/12 bg-white px-4 py-[14px] transition-[border-color,background-color] duration-200 hover:border-ink hover:bg-paper-warm"
              >
                <Text
                  as="span"
                  className="grid size-[34px] flex-none place-items-center rounded-[9px] border border-ink/12 bg-paper-warm text-[13px] font-bold text-ink-muted"
                >
                  {program.number}
                </Text>

                <Box className="min-w-0 flex-1">
                  <Text
                    as="span"
                    className="block font-display text-[14.5px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink"
                  >
                    {program.title}
                  </Text>
                  <Text
                    as="span"
                    className="mt-[3px] line-clamp-2 block text-[13px] leading-[1.55] text-ink-muted"
                  >
                    {program.description}
                  </Text>
                </Box>

                <Box className="flex flex-none flex-col items-start gap-[5px]">
                  <Box
                    as="span"
                    className="flex items-center gap-1.5 whitespace-nowrap text-[11.5px] font-semibold text-ink"
                  >
                    <Clock
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="flex-none text-ink-muted"
                    />
                    {program.duration}
                  </Box>
                  <Box
                    as="span"
                    className="flex items-center gap-1.5 whitespace-nowrap text-[11.5px] font-semibold text-ink"
                  >
                    <Users
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="flex-none text-ink-muted"
                    />
                    {program.audience}
                  </Box>
                </Box>

                <ChevronRight
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="flex-none text-ink/22 transition-colors duration-200 group-hover:text-ink"
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Footer */}
        <Box className="flex flex-none items-center justify-end gap-3 border-t border-ink/12 bg-white px-[34px] py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-ink/22 bg-transparent px-5 py-[14px] font-body text-[13.5px] font-semibold text-ink transition-[border-color,background-color] duration-200 hover:border-navy hover:bg-ink/[0.07]"
          >
            Close
          </button>

          <Box
            as="a"
            href="#apply"
            onClick={onClose}
            className="inline-flex items-center gap-[9px] rounded-full bg-navy px-5 py-[14px] font-body text-[13.5px] font-semibold text-lime transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(10,22,40,0.45)]"
          >
            Request a Quote
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

const PAGE_SIZE = 8;

export default function Bundles({ data }) {
  const [activeCat, setActiveCat] = useState("all");
  const [openBundle, setOpenBundle] = useState(null);
  // How many cards are revealed; grows by `PAGE_SIZE` on each "view more".
  const [shownCount, setShownCount] = useState(PAGE_SIZE);

  if (!data) return null;

  const bundles = data.bundles ?? [];
  const visible =
    activeCat === "all"
      ? bundles
      : bundles.filter((bundle) => bundle.cat === activeCat);
  const shownBundles = visible.slice(0, shownCount);
  const remaining = visible.length - shownBundles.length;

  return (
    <Section id="bundles" className="bg-paper-cream">
      <Box>
        <Reveal delay={1}>
          <Box className="mb-6 max-w-[720px]">
            <RichHeading
              as="h2"
              heading={data.heading}
              className="mb-3 max-w-none font-semibold tracking-[-1.8px] text-ink"
              emphasisClassName="font-serif font-normal tracking-[-1px]"
            />

            <Text
              as="p"
              className="mb-0 text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-ink-muted"
            >
              {data.lede}
            </Text>
          </Box>
        </Reveal>

        <Reveal delay={2}>
          <Box
            role="group"
            aria-label="Filter bundles"
            className="mb-6 flex flex-wrap gap-2"
          >
            {data.filters?.map((filter) => {
              const isActive = activeCat === filter.cat;

              return (
                <button
                  key={filter.cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveCat(filter.cat);
                    setShownCount(PAGE_SIZE);
                  }}
                  className={[
                    "cursor-pointer rounded-full border px-[15px] py-2 font-body text-[13px] transition-[border-color,background-color,color] duration-200",
                    isActive
                      ? "border-navy bg-navy font-semibold text-lime"
                      : "border-ink/12 bg-white font-medium text-ink hover:border-ink/22",
                  ].join(" ")}
                >
                  {filter.label}
                  {filter.count != null ? ` (${filter.count})` : ""}
                </button>
              );
            })}
          </Box>
        </Reveal>

        <Reveal delay={3}>
          <Box
            as="ul"
            role="list"
            className="grid list-none grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1"
          >
            {shownBundles.map((bundle) => (
              <Box as="li" key={bundle.name} className="h-full">
                <BundleCard bundle={bundle} onOpen={setOpenBundle} />
              </Box>
            ))}
          </Box>
        </Reveal>

        {/* Pagination: reveal the next page of real bundles. No button once
            every available bundle is shown. */}
        {remaining > 0 ? (
          <Box className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShownCount((count) => count + PAGE_SIZE)}
              className="group inline-flex cursor-pointer items-center gap-[9px] rounded-full border border-ink/22 bg-white px-[22px] py-[13px] font-body text-[13.5px] font-semibold text-ink transition-[border-color,box-shadow] duration-200 hover:border-navy hover:shadow-[0_12px_26px_-18px_rgba(10,22,40,0.45)]"
            >
              View {remaining} more {remaining === 1 ? "bundle" : "bundles"}
              <ArrowRight
                size={15}
                strokeWidth={2.2}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-[3px]"
              />
            </button>
          </Box>
        ) : null}
      </Box>

      {openBundle ? (
        <BundleDrawer
          bundle={openBundle}
          onClose={() => setOpenBundle(null)}
        />
      ) : null}
    </Section>
  );
}
