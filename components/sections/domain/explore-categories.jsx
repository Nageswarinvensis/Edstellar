import {
  ArrowRight,
  Gavel,
  ShieldAlert,
  Landmark,
  Network,
  Users,
  Compass,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * "Categories worth exploring next" — the `#explore` section of the domain
 * design. A header (heading + lede + "All categories" link) over a grid of
 * category cards (icon, name, course count, arrow) — the cross-train shelf.
 *
 * Server Component, data-driven; renders nothing without `data`.
 */

// Category-card icons, mapped by the CMS's string `icon` key. Never index this
// without the fallback — an unmapped key would render `undefined` as an element
// and crash the page (see sections/domain/path.jsx).
const categoryIcons = {
  gavel: Gavel,
  shield: ShieldAlert,
  landmark: Landmark,
  network: Network,
  users: Users,
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

function CategoryCard({ category }) {
  const Icon = categoryIcons[category.icon] ?? Compass;

  return (
    <Box as="li">
      <Box
        as="a"
        href={category.href || "#"}
        className="group grid h-full grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center gap-x-3.5 gap-y-0.5 rounded-[14px] border border-ink/12 bg-white px-[18px] py-4 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-ink/22 hover:shadow-[0_20px_42px_-26px_rgba(10,22,40,0.45)] max-sm:p-[22px]"
      >
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
          {category.name}
        </Text>

        <Text
          as="span"
          className="col-start-2 self-start font-mono text-[11px] uppercase leading-none tracking-[0.08em] text-ink-muted"
        >
          {category.count}
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

export default function ExploreCategories({ data }) {
  if (!data) return null;

  return (
    <Section id="explore" className="border-b border-ink/12 bg-paper">
      <Box>
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

            <AllLink link={data.all_link} />
          </Box>
        </Reveal>

        <Reveal delay={2}>
          <Box
            as="ul"
            role="list"
            className="grid list-none grid-cols-3 gap-3 max-[900px]:grid-cols-2 max-sm:grid-cols-1"
          >
            {data.categories?.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
