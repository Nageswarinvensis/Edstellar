import {
  ArrowRight,
  Lock,
  Landmark,
  Briefcase,
  ShieldAlert,
  HardHat,
  Scale,
  ShieldCheck,
  Trophy,
  Flame,
  TrendingUp,
  Star,
  Clock,
  Users,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { DOMAIN_CARD_IMAGE } from "@/lib/constants";

/**
 * "Explore compliance training by topic" — the `#topics` section of the
 * domain design. Two stacked parts: (A) a grid of topic cards (icon, name,
 * count, arrow), and (B) a "Popular programs" sub-block of image cards.
 *
 * Server Component: the save button is intentionally a static, non-functional
 * `<button>` (matching how the other domain sections keep interactivity
 * minimal) so this never needs `"use client"`.
 */

// Topic-card icons, mapped by the CMS's string `icon` key. Never index this
// without the fallback — an unmapped key would otherwise render `undefined`
// as an element and crash the page (see sections/domain/path.jsx).
const topicIcons = {
  lock: Lock,
  landmark: Landmark,
  briefcase: Briefcase,
  shield: ShieldAlert,
  "hard-hat": HardHat,
  scale: Scale,
};

// Rank badge: background + text color, plus a per-variant icon/icon-color.
// Gold tints both the label and icon navy; the others keep the ink label and
// only color the icon. One-off hex values have no theme token, so arbitrary
// Tailwind values are used per CLAUDE.md.
const rankVariants = {
  gold: { wrap: "bg-[#F8C93A] text-navy", icon: "", Icon: Trophy },
  flame: { wrap: "bg-white text-ink", icon: "text-[#EA580C]", Icon: Flame },
  mint: {
    wrap: "bg-[#DDF5EA] text-ink",
    icon: "text-[#15803D]",
    Icon: TrendingUp,
  },
  lilac: { wrap: "bg-[#EEE8FD] text-ink", icon: "text-[#6D28D9]", Icon: Star },
};

const tagVariants = {
  orange: "bg-[#FFF0E5] text-[#B4410C]",
  blue: "bg-[#E8EFFE] text-[#1D4ED8]",
  green: "bg-[#E3F5E8] text-[#15803D]",
};

function AllLink({ link }) {
  if (!link?.label) return null;

  return (
    <Box
      as="a"
      href={link.href || "#"}
      className="group inline-flex flex-none items-center gap-2 self-end border-b-2 border-ink pb-1.5 font-body text-[14px] font-semibold text-ink max-sm:self-start"
    >
      {link.label}
      <ArrowRight
        size={16}
        strokeWidth={2.2}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-[3px]"
      />
    </Box>
  );
}

function TopicCard({ topic }) {
  const Icon = topicIcons[topic.icon] ?? ShieldCheck;

  return (
    <Box as="li">
      {/* Not a link — but keeps the card's hover treatment. */}
      <Box className="group grid h-full grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center gap-x-3.5 gap-y-0.5 rounded-[14px] border border-ink/12 bg-white px-[16px] py-4 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-ink/22 hover:shadow-[0_20px_42px_-26px_rgba(10,22,40,0.45)] max-sm:p-[22px]">
        <Box
          as="span"
          className="row-span-2 grid size-[38px] place-items-center rounded-[10px] bg-lime/22 text-navy transition-colors duration-300 group-hover:bg-lime"
        >
          <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
        </Box>

        <Text
          as="span"
          className="col-start-2 self-end font-display text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink"
        >
          {topic.name}
        </Text>

        <Text
          as="span"
          className="col-start-2 self-start font-mono text-[11px] uppercase leading-none tracking-[0.08em] text-ink-muted"
        >
          {topic.count}
        </Text>

        <Box
          as="span"
          className="col-start-3 row-span-2 self-center text-ink-muted transition-colors duration-200 group-hover:text-ink"
        >
          <ArrowRight
            size={16}
            strokeWidth={2.2}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </Box>
      </Box>
    </Box>
  );
}

function ProgramCard({ program }) {
  const rank = rankVariants[program.rank_variant] ?? rankVariants.gold;
  const RankIcon = rank.Icon;
  const tagClass = tagVariants[program.tag_variant] ?? tagVariants.orange;

  return (
    <Box
      as="li"
      className="group flex flex-col overflow-hidden rounded-[14px] border border-ink/12 bg-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ink/22 hover:shadow-[0_24px_48px_-30px_rgba(10,22,40,0.45)]"
    >
      <Box className="relative block aspect-[960/340] overflow-hidden bg-paper-warm">
        {/* Card image is hardcoded for every program (not from the CMS) — see
            DOMAIN_CARD_IMAGE. `program.image` is intentionally ignored. */}
        {DOMAIN_CARD_IMAGE ? (
          <img
            src={DOMAIN_CARD_IMAGE}
            alt={program.image_alt || program.title || ""}
            width={960}
            height={340}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
          />
        ) : null}

        {program.rank_label ? (
          <Box
            as="span"
            className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-[7px] py-[3px] pl-[6px] pr-[8px] text-[10px] font-semibold shadow-[0_6px_16px_-10px_rgba(10,22,40,0.5)] ${rank.wrap}`}
          >
            <RankIcon
              size={12}
              strokeWidth={1.8}
              aria-hidden="true"
              className={`flex-none ${rank.icon}`}
            />
            {program.rank_label}
          </Box>
        ) : null}
      </Box>

      <Box className="flex flex-1 flex-col px-5 pb-5 pt-[18px]">
        {program.tag ? (
          <Text
            as="span"
            className={`mb-3 max-w-full self-start truncate whitespace-nowrap rounded-[5px] px-[6px] py-1 font-mono text-[9px] uppercase leading-none tracking-[0.01em] ${tagClass}`}
          >
            {program.tag}
          </Text>
        ) : null}

        <Text
          as="h4"
          className="mb-3 text-[15px] font-semibold leading-[1.2] tracking-[-0.25px] text-ink"
        >
          {program.title}
        </Text>

        <Box className="mb-2.5 flex flex-nowrap items-center gap-2 whitespace-nowrap text-[11px] text-ink">
          {program.duration ? (
            <Box as="span" className="inline-flex items-center gap-1">
              <Clock
                size={13}
                strokeWidth={1.8}
                aria-hidden="true"
                className="shrink-0 text-ink-muted"
              />
              {program.duration}
            </Box>
          ) : null}

          {program.duration && program.delivery ? (
            <Box
              as="span"
              aria-hidden="true"
              className="h-3 w-px shrink-0 bg-ink/22"
            />
          ) : null}

          {program.delivery ? (
            <Box as="span" className="inline-flex items-center gap-1">
              <Users
                size={13}
                strokeWidth={1.8}
                aria-hidden="true"
                className="shrink-0 text-ink-muted"
              />
              {program.delivery}
            </Box>
          ) : null}
        </Box>

        <Text
          as="p"
          className="mb-[18px] text-[13.5px] leading-[1.55] text-ink-muted"
        >
          {program.description}
        </Text>

        <Box className="mt-auto flex items-center gap-2.5">
          <CtaButton
            render={<a href={program.href || "#"} />}
            arrow
            className="px-[18px] py-[11px] text-[13px]"
          >
            View program
          </CtaButton>
        </Box>
      </Box>
    </Box>
  );
}

export default function Topics({ data }) {
  if (!data) return null;

  const popular = data.popular;

  return (
    <Section id="topics" className="bg-paper-warm">
      <Box>
        {/* ===== PART A: HEADER ===== */}
        <Reveal delay={1}>
          <Box className="mb-7 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
            <Box>
              {data.eyebrow ? (
                <Text
                  as="span"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted"
                >
                  {data.eyebrow}
                </Text>
              ) : null}

              <RichHeading
                as="h2"
                heading={data.heading}
                className="mb-2.5 max-w-none font-semibold tracking-[-1.8px] text-ink"
                emphasisClassName="font-serif font-normal tracking-[-1px]"
              />

              <Text
                as="p"
                className="mb-0 max-w-[56ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-ink-muted"
              >
                {data.lede}
              </Text>
            </Box>

            {/* Fixed navigational affordance: jump to the full catalog
                (`#by-topic`). The label and anchor are intentional and do not
                read from the CMS `all_link`, which carries no `href`. */}
            <AllLink link={{ label: "All Topics", href: "#by-topic" }} />
          </Box>
        </Reveal>

        {/* ===== PART A: TOPIC GRID ===== */}
        <Reveal delay={2}>
          <Box
            as="ul"
            role="list"
            className="grid list-none grid-cols-3 gap-3 max-[900px]:grid-cols-2 max-sm:grid-cols-1"
          >
            {data.topics?.map((topic) => (
              <TopicCard key={topic.name} topic={topic} />
            ))}
          </Box>
        </Reveal>

        {/* ===== PART B: POPULAR PROGRAMS ===== */}
        {popular ? (
          <Box className="mt-12 rounded-[20px] border border-ink/12 bg-white/55 px-9 pb-10 pt-9 max-sm:px-5">
            <Reveal delay={1}>
              <Box className="mb-[22px] flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
                <Box>
                  <RichHeading
                    as="h3"
                    heading={popular.heading}
                    className="mb-2 text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-ink"
                    emphasisClassName="font-serif font-normal tracking-[-1px]"
                  />

                  <Text
                    as="p"
                    className="text-[15px] leading-[1.6] text-ink-muted"
                  >
                    {popular.lede}
                  </Text>
                </Box>

                <AllLink link={popular.all_link} />
              </Box>
            </Reveal>

            <Reveal delay={2}>
              <Box
                as="ul"
                role="list"
                className="grid list-none grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1"
              >
                {popular.programs?.map((program) => (
                  <ProgramCard key={program.title} program={program} />
                ))}
              </Box>
            </Reveal>
          </Box>
        ) : null}
      </Box>
    </Section>
  );
}
