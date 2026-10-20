import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import FaqDetails from "@/components/common/faq-details";
import { CtaButton } from "@/components/common/cta-button";
import { HubIcon, InlineText, SectionHead } from "@/components/sections/corporate_training_hub/parts";
import DomainFinder from "@/components/sections/corporate_training_hub/domain-finder";
import DeliveryTabs from "@/components/sections/corporate_training_hub/delivery-tabs";
import { cn } from "@/lib/utils";

/*
 * The Corporate Training hub's sections, top to bottom.
 * Design: Edstellar_Corporate_Training_Hub 6.html.
 */

const pad = (n) => String(n).padStart(2, "0");
const CARD = "rounded-[16px] border border-ink/12 bg-white";

/** A link button — internal routes through `next/link`, others as `<a>`. */
function LinkButton({ cta, variant, className }) {
  const internal = cta.href.startsWith("/");
  return (
    <CtaButton
      arrow={variant !== "ghost"}
      variant={variant}
      render={internal ? <Link href={cta.href} /> : <a href={cta.href} />}
      className={className}
    >
      {cta.label}
    </CtaButton>
  );
}

function Microcopy({ children, className }) {
  return (
    <Text as="p" className={cn("mt-4 text-[13px] text-ink-muted", className)}>
      {children}
    </Text>
  );
}

/** Hero, then the navy proof strip. Design: `ct-hero-photo`, `.proof`. */
export function HubHero({ data, proof, breadcrumbs }) {
  return (
    <>
      <Section id="top" aria-labelledby="hub-h1" className="bg-paper">
        <Box className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <Reveal>
            <Breadcrumbs items={breadcrumbs} className="mt-0 mb-6" />
            <RichHeading as="h1" id="hub-h1" heading={data.heading} className="max-w-[13ch]" emphasisClassName="text-ink" />
            <Text as="p" className="mt-7 max-w-[56ch] text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-ink/80">
              {data.lede}
            </Text>
            <Text as="p" className="mt-5 max-w-[60ch] text-[15px] leading-[1.75]">
              {data.definition}
            </Text>
            <Box className="mt-8 flex flex-wrap gap-3">
              <LinkButton cta={data.primary_cta} />
              <CtaButton arrow variant="ghost" render={<a href={data.secondary_cta.href} />}>
                {data.secondary_cta.label}
              </CtaButton>
            </Box>
            <Microcopy>{data.microcopy}</Microcopy>
          </Reveal>

          <Reveal delay={1}>
            <Box className="overflow-hidden rounded-[20px] bg-navy">
              <img loading="eager"
                src={data.image.src}
                alt={data.image.alt}
                width={data.image.width}
                height={data.image.height}
                fetchPriority="high"
                decoding="async"
                className="block aspect-[4/3] w-full object-cover"
              />
              <Box as="ul" className="m-0 list-none px-8 py-4">
                {data.confidence.map((item) => (
                  <Box as="li" key={item.label} className="flex items-center gap-4 border-b border-paper/12 py-4.5 text-[15.5px] text-paper last:border-b-0">
                    <HubIcon name={item.icon} size={26} className="flex-none text-lime" />
                    {item.label}
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Section>

      <Box as="section" aria-label="Edstellar at a glance" className="bg-navy px-5 py-8 lg:px-10">
        <Box as="dl" className="mx-auto my-0 grid max-w-7xl grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {proof.map((item) => (
            <Box key={item.label} className="flex flex-col-reverse border-paper/12 pr-4 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
              <dt className="mt-1.5 text-[14px] leading-snug text-paper/70">{item.label}</dt>
              <dd className="m-0 font-display text-[clamp(26px,2.4vw,32px)] leading-none font-semibold text-lime">{item.value}</dd>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

/** 01 — the two service cards (the second navy) and the managed-training
 * strip. Design: `ct-services-pair`. */
export function HubServices({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper-warm">
      <SectionHead data={data} />
      <Box className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {data.items.map((item, index) => (
          <Reveal key={item.title} delay={index + 1}>
            <Box as="article" className={cn("flex h-full flex-col rounded-[20px] p-8 lg:p-9", item.dark ? "bg-navy" : "border border-ink/12 bg-white")}>
              <Text as="p" className={cn("mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] uppercase", item.dark ? "text-lime" : "text-ink/70")}>
                <Text as="span" className={cn("grid size-7.5 place-items-center rounded-full border text-[11px]", item.dark ? "border-lime/60 text-lime" : "border-ink/40 text-ink/70")}>
                  {pad(index + 1)}
                </Text>
                {item.kicker}
              </Text>
              <Text as="h3" className={cn("mb-4", item.dark && "text-paper")}>
                {item.title}
              </Text>
              <Text as="p" className={cn("mb-6 text-[15.5px] leading-[1.75]", item.dark && "text-paper/70")}>
                {item.description}
              </Text>
              <Box as="dl" className={cn("m-0 border-t", item.dark ? "border-paper/15" : "border-ink/12")}>
                {[
                  [data.rows_labels.best_for, item.best_for],
                  [data.rows_labels.shapes, item.shapes],
                  [data.rows_labels.format, item.format],
                ].map(([label, value]) => (
                  <Box key={label} className={cn("grid grid-cols-1 gap-1 border-b py-3.5 sm:grid-cols-[150px_1fr] sm:gap-4", item.dark ? "border-paper/15" : "border-ink/12")}>
                    <dt className={cn("pt-0.5 font-mono text-[11px] tracking-[0.12em] uppercase", item.dark ? "text-lime" : "text-ink/70")}>{label}</dt>
                    <dd className={cn("m-0 text-[15.5px] leading-[1.55]", item.dark ? "text-paper" : "text-ink")}>{value}</dd>
                  </Box>
                ))}
              </Box>
              <Text as="p" className={cn("mt-6 mb-3 text-[14px] font-semibold", item.dark ? "text-paper" : "text-ink")}>
                {data.starts_label}
              </Text>
              <Box as="ul" className="m-0 mb-8 flex list-none flex-wrap gap-2 p-0">
                {item.starts.map((start) => (
                  <li key={start} className={cn("rounded-full border px-3.5 py-1.5 text-[14px]", item.dark ? "border-paper/20 bg-navy-soft text-paper" : "border-ink/12 bg-paper-warm text-ink")}>
                    {start}
                  </li>
                ))}
              </Box>
              <Link href={item.link.href} className={cn("mt-auto inline-flex items-center gap-2 font-display text-[15px] font-semibold", item.dark ? "text-lime" : "text-ink hover:text-olive")}>
                {item.link.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Box>
          </Reveal>
        ))}
      </Box>
      <Reveal className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-[16px] border border-dashed border-ink/20 bg-white px-7 py-6">
        <Text as="p" className="max-w-[70ch] text-[15.5px] leading-[1.7]">
          <b className="font-semibold text-ink">{data.managed.lead}</b> {data.managed.text}
        </Text>
        <LinkButton cta={data.managed.cta} variant="ghost" />
      </Reveal>
    </Section>
  );
}

/** 02 — every training domain, searchable, from the CMS sitemap API.
 * Design: `#training-programs`. */
export function HubPrograms({ data, domains }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper">
      <SectionHead data={data} />
      <Reveal>
        <DomainFinder data={data} domains={domains} />
      </Reveal>
      <Box className="mt-10 text-center">
        <LinkButton cta={data.cta} />
        <Microcopy>{data.microcopy}</Microcopy>
      </Box>
    </Section>
  );
}

/** One row of an organization lane — a link, or "Coming soon" when the
 * page doesn't exist yet. */
function LaneItem({ item, comingSoon }) {
  const tag = item.tag ? (
    <Text as="span" className="flex-none rounded-full border border-ink/25 px-2.5 py-0.5 font-mono text-[10.5px] text-ink">
      {item.tag}
      {item.href ? null : ` · ${comingSoon}`}
    </Text>
  ) : item.href ? null : (
    <Text as="span" className="flex-none rounded-full bg-ink/6 px-2.5 py-0.5 font-mono text-[10.5px] text-ink-muted">
      {comingSoon}
    </Text>
  );

  return item.href ? (
    <Link href={item.href} className="flex items-center justify-between gap-3 border-b border-ink/12 py-3.5 font-display text-[15.5px] font-semibold text-ink hover:text-olive">
      <Text as="span" className="text-inherit">{item.label}</Text>
      <Text as="span" className="flex items-center gap-3">
        {tag}
        <ArrowRight size={17} aria-hidden="true" />
      </Text>
    </Link>
  ) : (
    <Box className="flex items-center justify-between gap-3 border-b border-ink/12 py-3.5 text-[15.5px] text-ink-muted">
      <Text as="span" className="text-inherit">{item.label}</Text>
      {tag}
    </Box>
  );
}

/** 03 — organization type, industry and goal lanes. Design: `#by-organization`. */
export function HubOrganization({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper-warm">
      <SectionHead data={data} />
      <Reveal className="grid grid-cols-1 gap-y-8 lg:grid-cols-3">
        {data.lanes.map((lane, index) => (
          <Box key={lane.title} className={cn(index > 0 && "lg:border-l lg:border-ink/12")}>
            <Box
              className={cn(
                "flex items-center gap-4 px-7 py-5 lg:[clip-path:polygon(0_0,calc(100%-24px)_0,100%_50%,calc(100%-24px)_100%,0_100%)]",
                index === 0 && "rounded-l-[16px]",
                index === data.lanes.length - 1 && "lg:rounded-r-[16px] lg:[clip-path:none]",
                lane.highlight ? "bg-lime text-navy" : "bg-navy text-paper",
                "max-lg:rounded-[16px]",
              )}
            >
              <HubIcon name={lane.icon} size={26} className={lane.highlight ? "text-navy" : "text-lime"} />
              <Box>
                <Text as="h3" className={cn("text-[20px] leading-tight", lane.highlight ? "text-navy" : "text-paper")}>
                  {lane.title}
                </Text>
                <Text as="span" className={cn("mt-1 block font-mono text-[11px] tracking-[0.14em] uppercase", lane.highlight ? "text-navy/70" : "text-paper/70")}>
                  {lane.kicker}
                </Text>
              </Box>
            </Box>
            <Box className="px-0 lg:px-6">
              <Box as="ul" className="m-0 list-none p-0">
                {lane.items.map((item) => (
                  <li key={item.label}>
                    <LaneItem item={item} comingSoon={data.coming_soon} />
                  </li>
                ))}
              </Box>
              {lane.more ? (
                <Link href={lane.more.href} className="mt-5 inline-flex items-center gap-2 font-display text-[14.5px] font-semibold text-ink hover:text-olive">
                  {lane.more.label}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              ) : null}
            </Box>
          </Box>
        ))}
      </Reveal>
    </Section>
  );
}

/** 04 — the 5A capability system, the Activate column lime. Design:
 * `#capability-system`. */
export function HubSystem({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-navy">
      <SectionHead data={data} dark />
      <Reveal className="grid grid-cols-1 overflow-hidden rounded-[18px] border border-paper/12 sm:grid-cols-2 lg:grid-cols-5">
        {data.stages.map((stage, index) => (
          <Box
            key={stage.name}
            className={cn(
              "border-paper/12 p-6 not-first:max-lg:border-t lg:not-first:border-l",
              stage.current ? "bg-lime text-navy" : "text-paper",
            )}
          >
            <Text as="span" className={cn("font-mono text-[11px]", stage.current ? "text-navy" : "text-lime")}>
              {pad(index + 1)}
            </Text>
            <Text as="h3" className={cn("mt-3 text-[clamp(22px,2vw,26px)] leading-tight", stage.current ? "text-navy" : "text-paper")}>
              {stage.name}
            </Text>
            <Text as="p" className={cn("mt-1 mb-5 text-[14px]", stage.current ? "text-navy/80" : "text-paper/60")}>
              {stage.tagline}
            </Text>
            {stage.current ? (
              <Text as="span" className="mb-3 inline-block rounded-full bg-navy px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-lime uppercase">
                {data.current_tag}
              </Text>
            ) : null}
            <Box as="ul" className="m-0 list-none p-0">
              {stage.links.map((link) => (
                <li key={link.label} className={cn("border-t py-2.5 text-[14.5px] leading-snug", stage.current ? "border-navy/20" : "border-paper/12")}>
                  {link.href ? (
                    <Link href={link.href} className={cn("hover:underline", stage.current ? "text-navy" : "text-paper")}>
                      {link.label}
                    </Link>
                  ) : (
                    <Text as="span" className={cn("text-[14.5px]", stage.current ? "text-navy/70" : "text-paper/55")}>
                      {link.label}
                    </Text>
                  )}
                </li>
              ))}
            </Box>
          </Box>
        ))}
      </Reveal>
    </Section>
  );
}

/** 05 — the four-step approach as an arrow flow over four columns.
 * Design: `ct-process-flow`. */
export function HubApproach({ data }) {
  const TAB_BG = ["bg-navy-deep", "bg-navy", "bg-navy-soft", "bg-lime"];
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper">
      <SectionHead data={data} />
      <Reveal as="ol" className="m-0 grid list-none grid-cols-1 gap-y-6 p-0 md:grid-cols-2 lg:grid-cols-4">
        {data.steps.map((step, index) => (
          <li key={step.title} className={cn(index > 0 && "lg:border-l lg:border-ink/12")}>
            <Box
              className={cn(
                "mb-6 flex items-center gap-3 px-6 py-5 max-lg:rounded-[14px]",
                // Arrow-shaped tabs: the first has a flat left edge, the last
                // a flat right edge, the middle ones a notch and a point.
                index === 0
                  ? "lg:rounded-l-[14px] lg:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%)]"
                  : index === data.steps.length - 1
                    ? "lg:rounded-r-[14px] lg:pl-9 lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,22px_50%)]"
                    : "lg:pl-9 lg:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%,22px_50%)]",
                TAB_BG[index],
                index === 3 ? "text-navy" : "text-paper",
              )}
            >
              <Text as="span" className={cn("font-mono text-[11px]", index === 3 ? "text-navy" : "text-lime")}>
                {pad(index + 1)}
              </Text>
              <Text as="span" className={cn("font-display text-[19px] font-semibold", index === 3 ? "text-navy" : "text-paper")}>
                {step.tab}
              </Text>
            </Box>
            <Box className={cn("lg:px-6", index === 0 && "lg:pl-0")}>
              <Text as="h3" className="mb-3 text-[20px] leading-[1.25]">
                {step.title}
              </Text>
              <Text as="p" className="text-[15px] leading-[1.7]">
                <InlineText text={step.text} linkClassName="text-ink" />
              </Text>
            </Box>
          </li>
        ))}
      </Reveal>
      <Box className="mt-10 text-center">
        <LinkButton cta={data.cta} />
      </Box>
    </Section>
  );
}

/** 06 — delivery format tabs. Design: `ct-delivery-tabs`. */
export function HubDelivery({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper-warm">
      <SectionHead data={data} />
      <Reveal>
        <DeliveryTabs data={data} />
      </Reveal>
      <Box className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton cta={data.primary_cta} />
        <LinkButton cta={data.secondary_cta} variant="ghost" />
      </Box>
    </Section>
  );
}

/** 07 — why Edstellar: a navy 5A feature card beside three reason rows.
 * Design: `#why-edstellar`. */
export function HubReasons({ data }) {
  const { feature } = data;
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper">
      <SectionHead data={data} />
      <Box className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="flex flex-col rounded-[18px] bg-navy p-9">
          <Text as="p" className="font-serif text-[64px] leading-none text-lime italic">
            {feature.mark}
          </Text>
          <Text as="h3" className="mt-5 mb-4 max-w-[18ch] text-paper">
            {feature.title}
          </Text>
          <Text as="p" className="mb-10 text-[15.5px] leading-[1.7] text-paper/70">
            {feature.text}
          </Text>
          <Box as="ul" className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0">
            {feature.stages.map((stage) => (
              <li
                key={stage}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase",
                  stage === feature.current ? "border-lime bg-lime text-navy" : "border-paper/25 text-paper",
                )}
              >
                {stage}
              </li>
            ))}
          </Box>
        </Reveal>
        <Box className="flex flex-col gap-4">
          {data.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.5} className={cn(CARD, "grid grid-cols-1 gap-3 p-7 sm:grid-cols-[130px_1fr] sm:gap-5")}>
              <Text as="p" className="font-serif text-[38px] leading-none text-ink italic">
                {item.mark}
              </Text>
              <Box>
                <Text as="h3" className="mb-2 text-[19px] leading-snug">
                  {item.title}
                </Text>
                <Text as="p" className="text-[15px] leading-[1.7]">
                  {item.text}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}

/** 08 — FAQs and the closing CTA. Uses the site's shared FAQ list. */
export function HubFaqs({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper-warm" innerClassName="max-w-260">
      <SectionHead data={data} center />
      <FaqDetails items={data.items} />
      <Reveal className="mt-12 text-center">
        <Text as="p" className="mx-auto mb-6 max-w-[60ch] text-[17px] leading-[1.7]">
          {data.closing.text}
        </Text>
        <Box className="flex flex-wrap justify-center gap-3">
          <LinkButton cta={data.closing.primary_cta} />
          <LinkButton cta={data.closing.secondary_cta} variant="ghost" />
        </Box>
      </Reveal>
    </Section>
  );
}
