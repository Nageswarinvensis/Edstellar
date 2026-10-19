import Link from "next/link";
import { ArrowRight, Check, ChevronRight, FileText, User } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import FaqDetails from "@/components/common/faq-details";
import { CtaButton } from "@/components/common/cta-button";
import RfpForm from "@/components/forms/rfp-form";
import RfpTimeline from "@/components/sections/rfp/rfp-timeline";
import { RfpIcon } from "@/components/sections/rfp/icons";
import { cn } from "@/lib/utils";

/*
 * Request for Proposal sections, top to bottom.
 * Design: request-for-proposal 1.html.
 */

const pad = (n) => String(n).padStart(2, "0");

/** A link button: internal routes through `next/link`, anchors as `<a>`. */
function LinkButton({ cta, variant, className }) {
  const internal = cta.href.startsWith("/");
  return (
    <CtaButton arrow={variant !== "ghost"} variant={variant} render={internal ? <Link href={cta.href} /> : <a href={cta.href} />} className={className}>
      {cta.label}
    </CtaButton>
  );
}

/** Heading + intro; `aside` puts the intro to the right on wide screens. */
function Head({ id, data, dark = false, aside = false, className }) {
  return (
    <Reveal className={cn("mb-11", aside ? "grid grid-cols-1 items-end gap-5 lg:grid-cols-2 lg:gap-16" : "max-w-[60rem]", className)}>
      <RichHeading as="h2" id={`${id}-h`} heading={data.heading} className={cn("max-w-[24ch]", dark && "text-paper")} emphasisClassName={dark ? "text-lime" : "text-ink"} />
      {data.description ? (
        <Text as="p" className={cn("max-w-[60ch] text-[17px] leading-[1.7]", !aside && "mt-4", dark && "text-paper/75")}>
          {data.description}
        </Text>
      ) : null}
    </Reveal>
  );
}

/** Hero: heading, CTAs, documents → "One Edstellar proposal", promises; then
 * the navy strip. Design: `.hero`, `.strip`. */
export function RfpHero({ data, strip, breadcrumbs }) {
  return (
    <>
      <Section id="top" className="bg-[radial-gradient(50%_45%_at_50%_0%,color-mix(in_srgb,var(--color-lime)_22%,transparent),transparent_75%),var(--color-paper)] text-center">
        <Breadcrumbs items={breadcrumbs} className="mt-0 mb-6 justify-center" />
        <Reveal className="mx-auto max-w-5xl">
          <RichHeading as="h1" heading={data.heading} className="mx-auto max-w-[26ch]" emphasisClassName="text-ink" />
          <Text as="p" className="mx-auto mt-6 max-w-[64ch] text-[clamp(16px,1.3vw,18px)] leading-[1.7]">
            {data.description}
          </Text>
          <Box className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton cta={data.primary_cta} />
            <LinkButton cta={data.secondary_cta} variant="ghost" />
          </Box>
        </Reveal>
        <Reveal delay={1} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {data.documents.map((doc) => (
            <Box
              key={doc.label}
              className="relative w-33 overflow-hidden rounded-[10px] border border-ink/15 bg-white px-4 pt-9 pb-4 text-left shadow-[0_10px_30px_-20px_rgba(10,22,40,0.4)] before:absolute before:top-0 before:right-0 before:size-5 before:bg-paper-cream before:content-['']"
            >
              <Box aria-hidden="true" className="absolute top-4 left-4 h-1 w-17 rounded bg-ink/12" />
              <Box aria-hidden="true" className="absolute top-6.5 left-4 h-1 w-11 rounded bg-ink/12" />
              <Text as="span" className="block font-display text-[19px] font-semibold text-ink">
                {doc.label}
              </Text>
              <Text as="span" className="mt-1 block text-[12.5px] leading-snug text-ink/60">
                {doc.text}
              </Text>
            </Box>
          ))}
          <ArrowRight size={26} aria-hidden="true" className="text-ink max-sm:rotate-90" />
          <Text as="span" className="flex items-center gap-2.5 rounded-full bg-navy px-6 py-4 font-display text-[17px] font-semibold text-lime shadow-[0_18px_40px_-18px_rgba(10,22,40,0.6)]">
            <FileText size={18} aria-hidden="true" />
            {data.result}
          </Text>
        </Reveal>
        <Box as="dl" className="mx-auto mt-14 grid max-w-7xl grid-cols-1 border-t border-ink/12 text-left sm:grid-cols-2 lg:grid-cols-4">
          {data.promises.map((promise, index) => (
            <Box key={promise.title} className={cn("flex flex-col-reverse py-5 sm:px-4 lg:pl-4", index > 0 && "lg:border-l lg:border-ink/12", index === 0 && "lg:pl-0")}>
              <dd className="m-0 mt-1 text-[14px] text-ink/60">{promise.text}</dd>
              <dt className="font-display text-[17px] font-semibold text-ink">{promise.title}</dt>
            </Box>
          ))}
        </Box>
      </Section>
      <Box as="section" aria-label="Edstellar at a glance" className="bg-navy px-5 py-6 lg:px-10">
        <Box as="ul" className="mx-auto my-0 flex max-w-7xl list-none flex-wrap justify-between gap-x-8 gap-y-3 p-0">
          {strip.map((item) => (
            <li key={item.value + item.label} className="flex items-baseline gap-2.5">
              <Text as="span" className="font-display text-[21px] font-semibold text-paper">
                {item.value}
              </Text>
              <Text as="span" className="text-[14.5px] text-paper/70">
                {item.label}
              </Text>
            </li>
          ))}
        </Box>
      </Box>
    </>
  );
}

/** Scope — formats on the left, the service list on the right. Design: `#scope`. */
export function RfpScope({ data }) {
  return (
    <Section id="scope" aria-labelledby="scope-h" className="scroll-mt-32 bg-paper">
      <Box className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Box>
          <Head id="scope" data={data} className="mb-8" />
          <Box as="ul" className="m-0 flex list-none flex-col gap-3 p-0">
            {data.formats.map((format) => (
              <li key={format.tag} className="flex gap-5 rounded-[14px] border border-ink/12 bg-white px-5 py-4.5">
                <Text as="span" className="h-fit flex-none rounded-md bg-paper-cream px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-ink/70 uppercase">
                  {format.tag}
                </Text>
                <Box>
                  <Text as="span" className="block font-display text-[17px] font-semibold text-ink">
                    {format.title}
                  </Text>
                  <Text as="span" className="mt-0.5 block text-[14px] text-ink/60">
                    {format.text}
                  </Text>
                </Box>
              </li>
            ))}
          </Box>
          <Text as="p" className="mt-3 text-[14px] text-ink/60">
            {data.formats_note}
          </Text>
        </Box>
        <Reveal delay={1}>
          <Box as="ul" className="m-0 list-none border-t border-ink/12 p-0">
            {data.services.map((service) => {
              const body = (
                <>
                  <Box as="span" className="grid size-11 flex-none place-items-center rounded-full bg-paper-cream text-ink">
                    <RfpIcon name={service.icon} size={18} />
                  </Box>
                  <Box className="min-w-0 flex-1">
                    <Text as="span" className="block font-display text-[17px] font-semibold text-ink">
                      {service.title}
                    </Text>
                    <Text as="span" className="block text-[14px] text-ink/60">
                      {service.text}
                    </Text>
                  </Box>
                </>
              );
              return (
                <li key={service.title} className="border-b border-ink/12">
                  {service.href ? (
                    <Link href={service.href} className="group flex items-center gap-4 py-3.5 hover:text-olive">
                      {body}
                      <ChevronRight size={18} aria-hidden="true" className="text-ink/50 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    <Box className="flex items-center gap-4 py-3.5">{body}</Box>
                  )}
                </li>
              );
            })}
          </Box>
          <Box className="mt-6 flex items-center gap-4 rounded-[14px] border border-ink/12 bg-white px-6 py-5">
            <Box as="span" className="grid size-11 flex-none place-items-center rounded-full bg-navy text-lime">
              <User size={18} aria-hidden="true" />
            </Box>
            <Text as="p" className="text-[15px] leading-[1.6] text-ink/70">
              <b className="font-semibold text-ink">{data.bid_lead.lead}</b> {data.bid_lead.text}
            </Text>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}

/** The 15-day timeline. Design: `#timeline`. */
export function RfpTimelineSection({ data }) {
  return (
    <Section id="timeline" aria-labelledby="timeline-h" className="scroll-mt-32 bg-navy">
      <Head id="timeline" data={data} dark aside />
      <Reveal>
        <RfpTimeline data={data} />
      </Reveal>
      <Text as="p" className="mt-8 text-[14px] leading-[1.6] text-paper/65">
        <b className="font-semibold text-paper">{data.before.label}</b> {data.before.text} <b className="ml-2 font-semibold text-paper">{data.after.label}</b> {data.after.text}
      </Text>
    </Section>
  );
}

/** Mid-page CTA band. */
export function RfpBand({ data }) {
  return (
    <Section aria-labelledby="band-h" className="bg-paper-cream">
      <Reveal className="flex flex-wrap items-center justify-between gap-8">
        <RichHeading as="h2" id="band-h" heading={data.heading} className="max-w-[24ch]" emphasisClassName="text-ink" />
        <Box className="flex flex-wrap gap-3">
          <LinkButton cta={data.primary_cta} />
          <LinkButton cta={data.secondary_cta} variant="ghost" />
        </Box>
      </Reveal>
    </Section>
  );
}

/** "Every Edstellar proposal includes." — eight numbered parts. Design: `#proposal`. */
export function RfpIncludes({ data }) {
  return (
    <Section id="proposal" aria-labelledby="proposal-h" className="scroll-mt-32 bg-paper">
      <Box className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-12">
        <Head id="proposal" data={data} className="mb-0" />
        <Box as="ol" className="m-0 grid list-none grid-cols-1 gap-x-10 p-0 md:grid-cols-2">
          {data.items.map((item, index) => (
            <Reveal as="li" key={item.title} className="flex gap-5 border-t border-ink/12 py-6">
              <Box as="span" className="grid size-14 flex-none place-items-center rounded-[10px] border border-ink/15 bg-white text-ink">
                <FileText size={18} aria-hidden="true" />
              </Box>
              <Box>
                <Text as="span" className="block font-mono text-[11px] text-ink/50">
                  {pad(index + 1)}
                </Text>
                <Text as="h3" className="mt-1 mb-2 text-[18px] leading-snug">
                  {item.title}
                </Text>
                <Text as="p" className="text-[14.5px] leading-[1.6]">
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

/** Procurement pack — downloads beside the on-request list. Design: `#procurement`. */
export function RfpProcurement({ data }) {
  const { downloads, on_request: onRequest } = data;
  return (
    <Section id="procurement" aria-labelledby="procurement-h" className="scroll-mt-32 bg-navy">
      <Head id="procurement" data={data} dark aside />
      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="rounded-[18px] border border-paper/12 bg-navy-soft p-8">
          <Text as="h3" className="mb-1.5 text-paper">
            {downloads.title}
          </Text>
          <Text as="p" className="mb-6 text-[14.5px] text-paper/60">
            {downloads.text}
          </Text>
          <Box as="ul" className="m-0 flex list-none flex-col gap-3 p-0">
            {downloads.items.map((item) => (
              <li key={item.title} className="flex items-center gap-4 rounded-[12px] border border-paper/12 px-4 py-4">
                <Box as="span" className="grid size-10 flex-none place-items-center rounded-full bg-lime/12 text-lime">
                  <FileText size={17} aria-hidden="true" />
                </Box>
                <Box className="min-w-0 flex-1">
                  <Text as="span" className="block font-display text-[15.5px] font-semibold text-paper">
                    {item.title}
                  </Text>
                  <Text as="span" className="block text-[13px] text-paper/55">
                    {item.meta}
                  </Text>
                </Box>
                {item.href ? (
                  <a href={item.href} download className="flex-none font-display text-[14px] font-semibold text-paper hover:text-lime">
                    Download
                  </a>
                ) : (
                  <a href="#submit" className="flex-none font-display text-[14px] font-semibold text-paper/80 hover:text-lime">
                    {downloads.unavailable}
                  </a>
                )}
              </li>
            ))}
          </Box>
        </Reveal>
        <Reveal delay={1} className="rounded-[18px] border border-paper/12 bg-navy-soft p-8">
          <Text as="h3" className="mb-1.5 text-paper">
            {onRequest.title}
          </Text>
          <Text as="p" className="mb-5 text-[14.5px] text-paper/60">
            {onRequest.text}
          </Text>
          <Box as="ul" className="m-0 list-none p-0">
            {onRequest.items.map((item) => (
              <li key={item} className="flex gap-3 border-b border-paper/12 py-3 text-[15px] text-paper/90 last:border-b-0">
                <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-lime" />
                {item}
              </li>
            ))}
          </Box>
          <a href={onRequest.cta.href} className="mt-6 inline-flex items-center gap-2 font-display text-[14.5px] font-semibold text-paper hover:text-lime">
            {onRequest.cta.label}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
      </Box>
    </Section>
  );
}

/** Government tenders. Design: `#government`. */
export function RfpGovernment({ data }) {
  return (
    <Section id="government" aria-labelledby="government-h" className="scroll-mt-32 bg-paper">
      <Box className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <RichHeading as="h2" id="government-h" heading={data.heading} className="max-w-[22ch]" emphasisClassName="text-ink" />
          <Text as="p" className="mt-4 mb-7 max-w-[56ch] text-[17px] leading-[1.7]">
            {data.description}
          </Text>
          <LinkButton cta={data.cta} variant="ghost" />
        </Reveal>
        <Box as="ul" className="m-0 flex list-none flex-col gap-4 p-0">
          {data.items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.5} className="flex gap-5 rounded-[14px] border border-ink/12 bg-white px-6 py-5">
              <Box as="span" className="grid size-12 flex-none place-items-center rounded-full bg-paper-cream text-ink">
                <RfpIcon name={item.icon} size={18} />
              </Box>
              <Box>
                <Text as="h3" className="mb-1 text-[17px] leading-snug">
                  {item.title}
                </Text>
                <Text as="p" className="text-[14.5px] leading-[1.6]">
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

/** "Why buyers shortlist Edstellar." — four proof cells. Design: `#why`. */
export function RfpWhy({ data }) {
  return (
    <Section id="why" aria-labelledby="why-h" className="scroll-mt-32 border-t border-ink/12 bg-white">
      <Head id="why" data={data} aside />
      <Reveal as="dl" className="m-0 grid grid-cols-1 overflow-hidden rounded-[16px] border border-ink/12 bg-paper sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item, index) => (
          <Box key={item.title} className={cn("p-7", index > 0 && "max-sm:border-t sm:max-lg:[&:nth-child(n+3)]:border-t lg:border-l", index % 2 === 1 && "sm:border-l", "border-ink/12")}>
            <dd className="m-0 font-display text-[clamp(36px,3.2vw,44px)] leading-none font-semibold text-ink">{item.value}</dd>
            <dt className="mt-4 font-display text-[17px] font-semibold text-ink">{item.title}</dt>
            <dd className="m-0 mt-2 text-[14.5px] leading-[1.55] text-ink/60">{item.text}</dd>
          </Box>
        ))}
      </Reveal>
    </Section>
  );
}

/** The RFP form section. Design: `#submit`. */
export function RfpSubmit({ data }) {
  return (
    <Section id="submit" aria-labelledby="submit-h" className="scroll-mt-32 bg-paper-warm">
      <Reveal className="mx-auto mb-11 max-w-3xl text-center">
        <RichHeading as="h2" id="submit-h" heading={data.heading} className="mx-auto" emphasisClassName="text-ink" />
        <Text as="p" className="mx-auto mt-4 max-w-[64ch] text-[17px] leading-[1.7]">
          {data.description}
        </Text>
      </Reveal>
      <RfpForm data={data} thankYou="request-for-proposal" />
    </Section>
  );
}

/** FAQs. Design: `#faq`. */
export function RfpFaqs({ data }) {
  return (
    <Section id="faq" aria-labelledby="faq-h" className="scroll-mt-32 bg-paper" innerClassName="max-w-235">
      <Reveal className="mb-10 text-center">
        <RichHeading as="h2" id="faq-h" heading={data.heading} className="mx-auto" emphasisClassName="text-ink" />
      </Reveal>
      <FaqDetails items={data.items} />
    </Section>
  );
}
