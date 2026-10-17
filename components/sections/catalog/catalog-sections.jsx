import Link from "next/link";
import { Download, Target } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import FaqDetails from "@/components/common/faq-details";
import { CtaButton } from "@/components/common/cta-button";
import CatalogBrowser from "@/components/sections/catalog/catalog-browser";
import BriefBuilder from "@/components/sections/catalog/brief-builder";

/*
 * Corporate Training Catalog sections, top to bottom.
 * Design: corporate-training-catalog 27.html.
 */

const ACTION_ICONS = { target: Target, download: Download };

/** Hero — title, serif subheading, meta row, CTAs and the photo; then the
 * breadcrumb. Design: `.hero`. */
export function CatalogHero({ data, breadcrumbs }) {
  return (
    <Section id="top" className="bg-paper">
      <Box className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_0.9fr] lg:gap-16">
        <Reveal>
          <Breadcrumbs items={breadcrumbs} className="mt-0 mb-6" />
          <Text as="h1">{data.heading}</Text>
          <Text as="p" className="mt-4 max-w-[32ch] font-serif text-[clamp(20px,1.8vw,24px)] leading-[1.3] text-ink italic">
            {data.subheading}
          </Text>
          <Text as="p" className="mt-6 max-w-[60ch] text-[clamp(16px,1.3vw,18px)] leading-[1.7]">
            {data.description}
          </Text>
          <Box as="ul" className="m-0 mt-6 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {data.meta.map((item, index) => (
              <li key={item} className="flex items-center gap-5 font-mono text-[11.5px] tracking-[0.12em] text-ink/70 uppercase">
                {index > 0 ? <Box as="span" aria-hidden="true" className="size-1.5 rounded-full bg-ink" /> : null}
                {item}
              </li>
            ))}
          </Box>
          <Box className="mt-8 flex flex-wrap gap-3">
            <CtaButton arrow render={<a href={data.primary_cta.href} />}>
              {data.primary_cta.label}
            </CtaButton>
            <CtaButton variant="ghost" render={<a href={data.secondary_cta.href} />}>
              {data.secondary_cta.label}
            </CtaButton>
          </Box>
        </Reveal>
        <Reveal delay={1}>
          <img
            src={data.image.src}
            alt={data.image.alt}
            width={data.image.width}
            height={data.image.height}
            fetchPriority="high"
            decoding="async"
            className="block aspect-[8/7] w-full rounded-[16px] object-cover shadow-[0_30px_60px_-30px_rgba(10,22,40,0.5)]"
          />
        </Reveal>
      </Box>
    </Section>
  );
}

/** Navy proof card — stats, the ISO credential, and two "where to start"
 * actions. Design: `.proof-strip`, `.cf`. */
export function CatalogProof({ data }) {
  return (
    <Box as="section" aria-label="Edstellar at a glance" className="bg-paper px-5 pb-10 lg:px-10">
      <Reveal className="mx-auto max-w-7xl rounded-[18px] bg-navy px-7 py-6 lg:px-9">
        <Box as="dl" className="m-0 flex flex-wrap gap-x-10 gap-y-5 border-b border-paper/12 pb-6">
          {[...data.stats, data.credential].map((stat) => (
            <Box key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-[13.5px] text-paper/65">{stat.label}</dt>
              <dd className="m-0 font-display text-[clamp(22px,2vw,28px)] leading-none font-semibold text-lime">{stat.value}</dd>
            </Box>
          ))}
        </Box>
        <Box className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <Text as="p" className="font-display text-[17px] font-semibold text-paper">
            {data.prompt}
          </Text>
          <Box className="flex flex-wrap gap-3">
            {data.actions.map((action) => {
              const Icon = ACTION_ICONS[action.icon];
              const content = (
                <>
                  <Box as="span" className="grid size-8 place-items-center rounded-full bg-lime text-navy">
                    {Icon ? <Icon size={16} aria-hidden="true" /> : null}
                  </Box>
                  {action.label}
                </>
              );
              const className = "flex items-center gap-3 rounded-full border border-paper/20 py-1.5 pr-5 pl-1.5 font-display text-[14.5px] font-semibold text-paper hover:border-lime";
              return action.href.startsWith("/") ? (
                <Link key={action.label} href={action.href} className={className}>
                  {content}
                </Link>
              ) : (
                <a key={action.label} href={action.href} target="_blank" rel="noopener" className={className}>
                  {content}
                </a>
              );
            })}
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
}

/** The A–Z catalog beside the sticky brief builder. Design: `#catalog`. */
export function CatalogBody({ catalog, brief, domains }) {
  return (
    <Section id="catalog" aria-labelledby="catalog-h" className="scroll-mt-24 bg-paper pt-6 lg:pt-8">
      <Text as="h2" id="catalog-h" className="sr-only">
        Edstellar training domains, A to Z
      </Text>
      <Box className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <CatalogBrowser data={catalog} domains={domains} />
        <BriefBuilder data={brief} />
      </Box>
    </Section>
  );
}

/** FAQs and the "still have a question" line. Design: `#faq`. */
export function CatalogFaqs({ data }) {
  return (
    <Section id="faq" aria-labelledby="faq-h" className="bg-paper" innerClassName="max-w-220">
      <Reveal className="mb-10 text-center">
        <RichHeading as="h2" id="faq-h" heading={data.heading} />
      </Reveal>
      <FaqDetails items={data.items} />
      <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-5">
        <Text as="p" className="font-display text-[16px] font-semibold text-ink">
          {data.closing.text}
        </Text>
        <CtaButton variant="ghost" render={<a href={data.closing.cta.href} />}>
          {data.closing.cta.label}
        </CtaButton>
      </Reveal>
    </Section>
  );
}
