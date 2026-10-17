import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import SectionNav from "@/components/common/section-nav";
import { cn } from "@/lib/utils";

/*
 * Link styles sit once on each list (`[&_a]:…`) rather than on each of the
 * ~2,600 links, which would otherwise multiply the page's HTML several times
 * over. Every link also skips prefetching for the same reason.
 */
const LIST_LINKS =
  "[&_a]:text-ink/75 [&_a]:transition-colors [&_a:hover]:text-olive [&_a:hover]:underline [&_a:hover]:underline-offset-3";

/** Short line under each section heading, keyed by section id. */
const INTROS = {
  categories: "Every training domain, each with its full course catalog.",
  courses: "Instructor-led courses, grouped by domain. Open a domain to see its courses.",
  services: "Consulting, coaching, assessment and managed learning services.",
  blog: "Articles and guides on corporate training and workforce development, A to Z.",
  "case-studies": "How organizations have trained their teams with Edstellar.",
  "quick-links": "Company, platform and policy pages.",
};

const count = (section) =>
  section.links?.length ?? section.groups.reduce((sum, group) => sum + group.links.length, 0);

const format = (n) => n.toLocaleString("en-US");

/** Number, heading, intro and page count — the top of every section. */
function SectionHeader({ section, index }) {
  return (
    <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <Box className="max-w-[60ch]">
        <Text as="span" className="mb-3 block font-mono text-[11px] tracking-[0.16em] text-olive uppercase">
          {String(index + 1).padStart(2, "0")} / {section.heading}
        </Text>
        <Text as="h2" id={`${section.id}-h`} className="mb-2.5">
          {section.heading}
        </Text>
        <Text as="p" className="text-[16px] leading-[1.6]">
          {INTROS[section.id]}
        </Text>
      </Box>
      <Text as="span" className="rounded-full border border-ink/12 bg-white px-3.5 py-1.5 font-mono text-[12px] tracking-[0.06em] text-ink/70">
        {format(count(section))} {count(section) === 1 ? "page" : "pages"}
      </Text>
    </Reveal>
  );
}

/** Training categories as compact link cards. */
function CardGrid({ links }) {
  return (
    <Box as="ul" className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            prefetch={false}
            className="group flex h-full items-center justify-between gap-3 rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-[14.5px] leading-snug font-medium text-ink transition-[border-color,box-shadow] hover:border-navy hover:shadow-[0_8px_24px_-16px_rgba(10,22,40,0.45)]"
          >
            {link.label}
            <ArrowRight size={15} aria-hidden="true" className="flex-none text-ink/30 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-olive" />
          </Link>
        </li>
      ))}
    </Box>
  );
}

/** Courses: one collapsible card per domain. Native `<details>`, so every
 * course link is in the HTML whether or not the card is open. */
function CourseGroups({ groups }) {
  return (
    <Box className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2">
      {groups.map((group) => (
        <Box as="details" key={group.href} className="group rounded-[14px] border border-ink/12 bg-white open:border-navy/40 open:shadow-[0_12px_32px_-22px_rgba(10,22,40,0.5)]">
          <Box
            as="summary"
            className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden"
          >
            <Text as="span" className="flex-1 font-display text-[16.5px] leading-snug font-medium text-ink">
              {group.heading}
            </Text>
            <Text as="span" className="font-mono text-[11.5px] text-ink/55">
              {group.links.length}
            </Text>
            <ChevronDown size={18} aria-hidden="true" className="flex-none text-ink/50 transition-transform group-open:rotate-180" />
          </Box>
          <Box className="border-t border-ink/10 px-5 pt-4 pb-5">
            <Box as="ul" className={cn("m-0 list-none columns-1 gap-6 p-0 text-[14px] leading-normal sm:columns-2 [&_li]:mb-2.5 [&_li]:break-inside-avoid", LIST_LINKS)}>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </Box>
            <Link
              href={group.href}
              prefetch={false}
              className="mt-2 inline-flex items-center gap-1.5 font-display text-[13.5px] font-semibold text-navy hover:text-olive"
            >
              All {group.heading} training
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

/** Services: a card per pillar, its sub-pages listed underneath. */
function ServiceGroups({ groups }) {
  return (
    <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <Box key={group.href} className="rounded-[14px] border border-ink/12 bg-white p-6">
          <Text as="h3" className="mb-4 border-b border-ink/10 pb-4 text-[19px] leading-snug">
            <Link href={group.href} prefetch={false} className="hover:text-olive">
              {group.heading}
            </Link>
          </Text>
          <Box as="ul" className={cn("m-0 list-none space-y-2.5 p-0 text-[14.5px] leading-normal", LIST_LINKS)}>
            {group.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} prefetch={false}>
                  {link.label}
                </Link>
              </li>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

/** Blog: posts under an A–Z letter, flowing across three columns. */
function AlphabeticalList({ links }) {
  const byLetter = new Map();
  for (const link of links) {
    const first = link.label.charAt(0).toUpperCase();
    const letter = /[A-Z]/.test(first) ? first : "#";
    if (!byLetter.has(letter)) byLetter.set(letter, []);
    byLetter.get(letter).push(link);
  }
  const letters = [...byLetter.keys()].sort((a, b) => (a === "#" ? -1 : b === "#" ? 1 : a.localeCompare(b)));

  return (
    <Box className="rounded-[18px] border border-ink/12 bg-white p-6 sm:p-9">
      <Box className="columns-1 gap-10 md:columns-2 lg:columns-3">
        {letters.map((letter) => (
          <Box key={letter} className="mb-7 break-inside-avoid">
            <Text as="span" className="mb-3 block border-b border-ink/10 pb-2 font-display text-[22px] leading-none font-semibold text-olive">
              {letter}
            </Text>
            <Box as="ul" className={cn("m-0 list-none space-y-2.5 p-0 text-[14px] leading-normal", LIST_LINKS)}>
              {byLetter.get(letter).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** Plain three-column list — case studies and quick links. */
function LinkGrid({ links }) {
  return (
    <Box as="ul" className={cn("m-0 grid list-none grid-cols-1 gap-x-8 gap-y-3.5 p-0 text-[15px] leading-normal sm:grid-cols-2 lg:grid-cols-3", LIST_LINKS)}>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} prefetch={false}>
            {link.label}
          </Link>
        </li>
      ))}
    </Box>
  );
}

function SectionBody({ section }) {
  switch (section.id) {
    case "categories":
      return <CardGrid links={section.links} />;
    case "courses":
      return <CourseGroups groups={section.groups} />;
    case "services":
      return <ServiceGroups groups={section.groups} />;
    case "blog":
      return <AlphabeticalList links={section.links} />;
    default:
      return <LinkGrid links={section.links} />;
  }
}

/**
 * `/sitemap` — every public page. A navy hero with the page counts, a sticky
 * jump bar, then one section per group, each shaped for its size: category
 * cards, collapsible course domains, service pillar cards, an A–Z blog
 * index, and plain lists for the short groups.
 */
export default function SitemapPage({ page, breadcrumbs }) {
  const total = page.sections.reduce((sum, section) => sum + count(section), 0);
  const stats = page.sections
    .filter((section) => ["categories", "courses", "services", "blog"].includes(section.id))
    .map((section) => ({ value: count(section), label: section.heading }));

  return (
    <>
      <Section className="relative overflow-hidden border-b-4 border-lime bg-navy">
        <Box
          aria-hidden="true"
          className="pointer-events-none absolute -top-55 -right-40 size-130 rounded-full bg-[radial-gradient(circle,rgba(200,241,53,0.16),transparent_70%)]"
        />
        <Box className="relative grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Box>
            <Breadcrumbs items={breadcrumbs} tone="dark" className="mt-0 mb-6" />
            <Reveal>
              <RichHeading as="h1" heading="Site<span>map</span>" className="mb-5 text-paper" emphasisClassName="text-lime" />
              <Text as="p" className="max-w-[48ch] text-[17px] leading-[1.7] text-paper/75">
                All {format(total)} pages on Edstellar in one place — training categories, courses, services, articles
                and company pages.
              </Text>
            </Reveal>
          </Box>
          <Reveal delay={1}>
            <Box as="dl" className="m-0 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <Box key={stat.label} className="rounded-[14px] border border-paper/12 bg-navy-soft px-5 py-4.5">
                  <dt className="font-mono text-[10.5px] tracking-[0.14em] text-paper/55 uppercase">{stat.label}</dt>
                  <dd className="m-0 mt-1.5 font-display text-[30px] leading-none font-semibold text-lime">{format(stat.value)}</dd>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>
      </Section>

      <SectionNav data={{ items: page.sections.map(({ id, heading }) => ({ id, label: heading })) }} />

      {page.sections.map((section, index) => (
        <Section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-h`}
          className={cn("scroll-mt-32", index % 2 ? "bg-paper-warm" : "bg-paper")}
        >
          <SectionHeader section={section} index={index} />
          <SectionBody section={section} />
        </Section>
      ))}
    </>
  );
}
