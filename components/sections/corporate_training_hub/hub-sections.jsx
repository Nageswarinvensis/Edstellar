import Link from "next/link";
import { ArrowRight, Users, FileText, Globe, Link as LinkIcon, List, ShieldCheck } from "lucide-react";

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
import HomeClients from "@/components/sections/home/home-clients";
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
      render={internal ? <Link href={cta.href} title={cta.title} /> : <a href={cta.href} title={cta.title} />}
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
            <RichHeading as="h1" id="hub-h1" heading={data.heading}  emphasisClassName="text-ink" />
            <Text as="p" className="mt-7 max-w-[56ch] text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-ink/80">
              {data.lede}
            </Text>
            <Text as="p" className="mt-5 max-w-[60ch] text-[15px] leading-[1.75]">
              {data.definition}
            </Text>
            <Box className="mt-8 flex flex-wrap gap-3">
              <LinkButton cta={data.primary_cta} />
              <CtaButton arrow variant="ghost" render={<a href={data.secondary_cta.href} title={data.secondary_cta.title} />}>
                {data.secondary_cta.label}
              </CtaButton>
            </Box>
            <Microcopy>{data.microcopy}</Microcopy>
            <Box as="ul" className="m-0 mt-6 flex list-none flex-wrap gap-x-6 gap-y-2.5 p-0">
              {data.confidence.map((item) => (
                <Box as="li" key={item.label} className="flex items-center gap-2 text-[13.5px] text-ink-muted">
                  <Box as="span" className="size-2 flex-none rounded-full bg-lime" />
                  {item.label}
                </Box>
              ))}
            </Box>
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
            </Box>
          </Reveal>
        </Box>
      </Section>

      <Box as="section" aria-label="Edstellar at a glance" className="bg-navy px-5 py-8 lg:px-10">
        <Box as="dl" className="mx-auto my-0 grid max-w-7xl grid-cols-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-4">
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

/** 00b — client logo marquee, reuses the home page component. */
export function HubClients({ homeClients }) {
  if (!homeClients) return null;
  return <HomeClients data={homeClients} />;
}

const TAG_STYLE = {
  AI: "bg-lime text-navy",
  Leadership: "bg-ink/8 text-ink",
  "Soft Skills": "bg-ink/8 text-ink",
};

/** 00c — most requested programs: 5×2 card grid. */
export function HubTopPrograms({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper">
      <Box className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <RichHeading
            as="h2"
            id={`${data.id}-h`}
            heading={data.heading}
            className="text-[clamp(28px,2.8vw,38px)] leading-[1.1] tracking-[-0.03em]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Text as="p" className="text-[15px] leading-[1.7] text-ink-muted lg:pt-2">
            {data.kicker}
          </Text>
        </Reveal>
      </Box>
      <Box className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {data.items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.04} className={cn(CARD, "flex flex-col gap-3 p-5")}>
            <Text as="span" className={cn("inline-block self-start rounded px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.1em] uppercase", TAG_STYLE[item.tag] ?? "bg-ink/8 text-ink")}>
              {item.tag}
            </Text>
            <Text as="h3" className="flex-1 text-[15px] font-semibold leading-snug">
              {item.label}
            </Text>
            <Link
              href={item.href}
              title={item.title}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] uppercase text-olive hover:underline"
            >
              {data.cta_label} <ArrowRight size={12} />
            </Link>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}

/** 00d — "What is corporate training?" definition block. */
export function HubDefinition({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper">
      <Box className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left */}
        <Reveal>
          <RichHeading
            as="h2"
            id={`${data.id}-h`}
            heading={data.heading}
            className="mb-8 text-[clamp(32px,3.2vw,42px)] leading-[1.1] tracking-[-0.03em]"
          />
          {data.body.map((para, i) => {
            const parts = para.split(/(\[.*?\]\(.*?\))|(<strong>.*?<\/strong>)/g).filter(Boolean);
            return (
              <Text key={i} as="p" className={`text-[16px] leading-[1.75] text-ink ${i > 0 ? "mt-5 text-ink-muted" : ""}`}>
                {parts.map((part, j) => {
                  const link = part.match(/\[(.*?)\]\((.*?)\)/);
                  if (link) return (
                    <Link key={j} href={data.fit_link?.href ?? link[2]} title={data.fit_link?.title} className="font-semibold text-olive underline underline-offset-2 hover:text-olive/80">
                      {link[1]}
                    </Link>
                  );
                  const bold = part.match(/^<strong>(.*?)<\/strong>$/);
                  if (bold) return <strong key={j}>{bold[1]}</strong>;
                  return part;
                })}
              </Text>
            );
          })}
        </Reveal>

        {/* Right */}
        <Reveal delay={0.15} className="flex flex-col gap-4">
          <Text as="p" className="border-l-2 border-ink/15 pl-5 text-[15px] text-ink-muted">
            {data.kicker}
          </Text>
          <Box className={cn(CARD, "mt-2 p-7")}>
            <Text as="h3" className="mb-4 text-[16px] font-semibold leading-snug">
              {data.fit_heading}
            </Text>
            <Box as="ul" className="m-0 list-none p-0">
              {data.fit_items.map((item) => (
                <Box as="li" key={item} className="flex items-start gap-3 border-t border-ink/10 py-3 text-[14.5px] leading-[1.6] text-ink-muted first:border-t-0">
                  <Box className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ink/30" />
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}

/** 01 — the two service cards (the second navy) and the managed-training
 * strip. Design: `ct-services-pair`. */
export function HubServices({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper-warm">
      <SectionHead data={data} />
      <Box className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item, index) => (
          <Reveal key={item.title} delay={index + 1}>
            <Box as="article" className="flex h-full flex-col rounded-[20px] border border-ink/12 bg-white p-8">
              <Text as="p" className="mb-4 font-mono text-[11px] tracking-[0.16em] text-ink/60 uppercase">
                {item.kicker}
              </Text>
              <Text as="h3" className="mb-4">
                {item.title}
              </Text>
              <Text as="p" className="mb-6 text-[15.5px] leading-[1.75] text-ink/75">
                {item.description}
              </Text>
              <Box as="ul" className="m-0 mb-6 list-none border-t border-ink/12 p-0 pt-5">
                {item.bullets.map((bullet) => (
                  <Box as="li" key={bullet} className="mb-3 flex items-start gap-3 text-[15px] leading-[1.6] text-ink last:mb-0">
                    <Box as="span" className="mt-[3px] flex-none text-olive">✓</Box>
                    {bullet}
                  </Box>
                ))}
              </Box>
              <Text as="p" className="mb-2 font-mono text-[11px] tracking-[0.14em] text-ink/50 uppercase">
                {data.starts_label}
              </Text>
              <Text as="p" className="mb-6 text-[15px] text-ink/70">
                {item.starts.join(" · ")}
              </Text>
              <a href={item.link.href} title={item.link.title} className="mt-auto inline-flex items-center gap-2 font-display text-[15px] font-semibold text-ink hover:text-olive">
                {item.link.label}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Box>
          </Reveal>
        ))}
      </Box>
      <Reveal className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-[16px] border-l-4 border-lime bg-white px-7 py-6">
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

/** 03 — by role / by goal two-column lanes. Design: `#by-organization`. */
export function HubOrganization({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper">
      <SectionHead data={data} />
      <Reveal className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {data.lanes.map((lane) => (
          <Box key={lane.title} className={cn(CARD, "p-7")}>
            <Text as="h3" className="mb-4 text-[18px] font-semibold">{lane.title}</Text>
            <Box as="ul" className="m-0 list-none p-0">
              {lane.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    title={item.title}
                    className="flex items-start justify-between gap-4 border-t border-ink/10 py-4"
                  >
                    <Box>
                      <Text as="span" className="block text-[15.5px] font-semibold leading-snug text-ink">{item.label}</Text>
                      <Text as="span" className="mt-0.5 block text-[13px] text-ink-muted">{item.sub}</Text>
                    </Box>
                    <ArrowRight size={16} className="mt-1 flex-none text-ink/40" aria-hidden="true" />
                  </Link>
                </li>
              ))}
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
                    <Link href={link.href} title={link.title} className={cn("hover:underline", stage.current ? "text-navy" : "text-paper")}>
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
      {data.footer_note ? (
        <Box className="mt-6 text-[15px] text-paper/70">
          {data.footer_note.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            return match ? (
              <Link key={i} href={match[2]} title={`Click here to learn about ${match[1]}`} className="text-lime underline hover:text-lime/80">
                {match[1]}
              </Link>
            ) : (
              <Text key={i} as="span" className="text-[15px] text-paper/70">{part}</Text>
            );
          })}
        </Box>
      ) : null}
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
      {data.languages?.length ? (
        <Box className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-6">
          <Text as="span" className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted">
            Delivered in 10+ languages, including
          </Text>
          {data.languages.map((lang) => (
            <Text key={lang} as="span" className="font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-ink">
              {lang}
            </Text>
          ))}
        </Box>
      ) : null}
      {/* The live site's delivery pages these linked to don't exist on the
          new site yet, so the CTAs are off; the row returns with them. */}
      {data.primary_cta || data.secondary_cta ? (
        <Box className="mt-8 flex flex-wrap justify-center gap-3">
          {data.primary_cta ? <LinkButton cta={data.primary_cta} /> : null}
          {data.secondary_cta ? <LinkButton cta={data.secondary_cta} variant="ghost" /> : null}
        </Box>
      ) : null}
    </Section>
  );
}

const REASON_ICONS = { Users, FileText, Globe, Link: LinkIcon, List, ShieldCheck };

/** 05b — 5,000+ vetted trainers: criteria list + trainer photo grid. */
export function HubTrainers({ data, experts }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper">
      <Box className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <RichHeading as="h2" id={`${data.id}-h`} heading={data.heading} className="text-[clamp(28px,2.8vw,38px)] leading-[1.1] tracking-[-0.03em]" />
        </Reveal>
        <Reveal delay={0.1}>
          <Text as="p" className="border-l-2 border-ink/15 pl-5 text-[15px] leading-[1.7] text-ink-muted lg:pt-2">{data.kicker}</Text>
        </Reveal>
      </Box>
      <Box className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Criteria list */}
        <Reveal>
          <Box as="ol" className="m-0 list-none p-0">
            {data.criteria.map((item) => (
              <Box as="li" key={item.title} className="flex gap-5 border-t border-ink/10 py-5">
                <Text as="span" className="font-mono text-[11px] tracking-[0.1em] text-ink-muted pt-0.5">{item.num}</Text>
                <Box>
                  <Text as="h3" className="mb-1 text-[16px] font-semibold leading-snug">{item.title}</Text>
                  <Text as="p" className="text-[14.5px] leading-[1.6] text-ink-muted">{item.text}</Text>
                </Box>
              </Box>
            ))}
          </Box>
          {data.cta ? (
            <Link href={data.cta.href} title={data.cta.title} className="mt-4 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.1em] uppercase text-olive hover:underline">
              {data.cta.label} <ArrowRight size={13} />
            </Link>
          ) : null}
        </Reveal>
        {/* Trainer photos */}
        {experts?.trainers?.length ? (
          <Reveal delay={0.15}>
            <Text as="p" className="mb-5 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted">{experts.note}</Text>
            <Box className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {experts.trainers.slice(0, 6).map((trainer) => (
                <Box key={trainer.slug} className="flex flex-col gap-2">
                  <Box className="overflow-hidden rounded-[12px] bg-ink/5">
                    <img
                      src={trainer.photo}
                      alt={trainer.name}
                      className="h-40 w-full object-cover object-top"
                      loading="lazy"
                    />
                  </Box>
                  <Text as="span" className="text-[14px] font-semibold">{trainer.name}</Text>
                  <Text as="span" className="text-[12px] text-ink-muted">{trainer.role}</Text>
                </Box>
              ))}
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}

/** 06a — pricing: navy license card + 6 factor cards. */
export function HubPricing({ data }) {
  const { license } = data;
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper-warm">
      <Box className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <RichHeading as="h2" id={`${data.id}-h`} heading={data.heading} className="text-[clamp(28px,2.8vw,38px)] leading-[1.1] tracking-[-0.03em]" />
        </Reveal>
        <Reveal delay={0.1}>
          <Text as="p" className="border-l-2 border-ink/15 pl-5 text-[15px] leading-[1.7] text-ink-muted lg:pt-2">{data.kicker}</Text>
        </Reveal>
      </Box>
      <Box className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
        {/* Navy license card */}
        <Reveal className="flex flex-col rounded-[18px] bg-navy p-8">
          <Text as="span" className="mb-4 font-mono text-[11px] tracking-[0.14em] uppercase text-lime">{license.tag}</Text>
          <Text as="h3" className="mb-4 text-[clamp(20px,1.8vw,24px)] leading-snug font-semibold text-paper">{license.title}</Text>
          <Text as="p" className="mb-6 text-[14.5px] leading-[1.7] text-paper/65">{license.text}</Text>
          <Box className="mb-8 flex flex-wrap items-center gap-2">
            {license.formula.map((part) => (
              <Box key={part.value} className="flex items-center gap-2">
                <Text as="span" className="rounded-md bg-paper/10 px-3 py-1.5 font-mono text-[12px] text-paper">{part.value}</Text>
                {part.op && <Text as="span" className="font-mono text-[13px] text-paper/50">{part.op}</Text>}
              </Box>
            ))}
          </Box>
          <Link href={license.cta.href} title={license.cta.title} className="mt-auto inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 font-display text-[14px] font-semibold text-navy transition-opacity hover:opacity-90 self-start">
            {license.cta.label} <ArrowRight size={14} />
          </Link>
        </Reveal>
        {/* Factor grid */}
        <Box className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {data.factors.map((factor, i) => (
            <Reveal key={factor.title} delay={i * 0.06} className={cn(CARD, "p-5")}>
              <Text as="h4" className="mb-1.5 text-[15px] font-semibold leading-snug">{factor.title}</Text>
              <Text as="p" className="text-[13.5px] leading-[1.6] text-ink-muted">{factor.text}</Text>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}

/** 06b — training effectiveness: 4-level Kirkpatrick grid. */
export function HubEffectiveness({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper">
      <Box className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <RichHeading as="h2" id={`${data.id}-h`} heading={data.heading} className="text-[clamp(28px,2.8vw,38px)] leading-[1.1] tracking-[-0.03em]" />
        </Reveal>
        <Reveal delay={0.1}>
          <Text as="p" className="border-l-2 border-ink/15 pl-5 text-[15px] leading-[1.7] text-ink-muted lg:pt-2">{data.kicker}</Text>
        </Reveal>
      </Box>
      <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.levels.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} className={cn(CARD, "flex flex-col gap-3 p-6")}>
            <Text as="span" className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted">{item.level}</Text>
            <Text as="h3" className="text-[20px] font-semibold leading-snug">{item.title}</Text>
            <Text as="p" className="flex-1 text-[14px] leading-[1.7] text-ink-muted">{item.text}</Text>
            <Box className="border-t border-ink/10 pt-3">
              <Text as="span" className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted">Evidence: </Text>
              <Text as="span" className="text-[13px] text-ink">{item.evidence}</Text>
            </Box>
          </Reveal>
        ))}
      </Box>
      {data.footer ? (
        <Text as="p" className="mt-6 text-center text-[13px] text-ink-muted">{data.footer}</Text>
      ) : null}
    </Section>
  );
}

/** 07 — why Edstellar: 6-card grid with icon, title, text.
 * Design: `#why-edstellar`. */
export function HubReasons({ data }) {
  return (
    <Section id={data.id} aria-labelledby={`${data.id}-h`} className="scroll-mt-24 bg-paper">
      <SectionHead data={data} />
      <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item, index) => {
          const Icon = REASON_ICONS[item.icon];
          return (
            <Reveal key={item.title} delay={index * 0.08} className={cn(CARD, "flex flex-col gap-4 p-7")}>
              {Icon ? (
                <Box className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20">
                  <Icon size={20} className="text-olive" />
                </Box>
              ) : null}
              <Text as="h3" className="text-[18px] leading-snug">
                {item.title}
              </Text>
              <Text as="p" className="text-[15px] leading-[1.7] text-ink-muted">
                {item.text}
              </Text>
            </Reveal>
          );
        })}
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
    </Section>
  );
}
