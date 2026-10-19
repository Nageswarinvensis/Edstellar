import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import FaqDetails from "@/components/common/faq-details";
import { CtaButton } from "@/components/common/cta-button";
import { CxIcon } from "@/components/sections/client_experience/icons";
import JourneyTabs from "@/components/sections/client_experience/journey-tabs";
import { cn } from "@/lib/utils";

/*
 * Client Experience sections, top to bottom.
 * Design: exceptional-customer-experience 6.html.
 */

const pad = (n) => String(n).padStart(2, "0");

/** Heading + intro at the top of a section. */
function Head({ id, data, dark = false, center = false }) {
  return (
    <Reveal className={cn("mb-11 max-w-[60rem]", center && "mx-auto text-center")}>
      <RichHeading as="h2" id={`${id}-h`} heading={data.heading} className={cn("max-w-[26ch]", center && "mx-auto", dark && "text-paper")} emphasisClassName={dark ? "text-lime" : "text-ink"} />
      {data.description ? (
        <Text as="p" className={cn("mt-4 max-w-[62ch] text-[17px] leading-[1.7]", center && "mx-auto", dark && "text-paper/75")}>
          {data.description}
        </Text>
      ) : null}
    </Reveal>
  );
}

/** Centred navy hero, then the white facts strip. Design: `.hero`, facts. */
export function CxHero({ data, facts, breadcrumbs }) {
  return (
    <>
      <Section id="top" className="bg-[radial-gradient(60%_70%_at_30%_0%,var(--color-navy-soft),var(--color-navy))] text-center">
        <Reveal className="mx-auto max-w-4xl">
          <RichHeading
            as="h1"
            heading={data.heading}
            className="mx-auto text-paper [&_em]:block"
            emphasisClassName="text-lime"
          />
          <Text as="p" className="mx-auto mt-6 max-w-[62ch] text-[clamp(16px,1.3vw,18px)] leading-[1.7] text-paper/75">
            {data.description}
          </Text>
          <Box className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaButton color="lime" arrow render={<a href={data.primary_cta.href} />}>
              {data.primary_cta.label}
            </CtaButton>
            <CtaButton arrow variant="ghost" render={<a href={data.secondary_cta.href} />} className="border-paper/40 text-paper hover:border-paper hover:bg-paper/5">
              {data.secondary_cta.label}
            </CtaButton>
          </Box>
          <Box as="ul" className="m-0 mt-6 flex list-none flex-wrap justify-center gap-2 p-0">
            {data.badges.map((badge) => (
              <li key={badge.label} className="flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-[14.5px] text-paper">
                <CxIcon name={badge.icon} size={15} className="text-lime" />
                {badge.label}
              </li>
            ))}
          </Box>
          <Breadcrumbs items={breadcrumbs} tone="dark" className="mt-10 justify-center" />
        </Reveal>
      </Section>
      <Box as="section" aria-label="Edstellar at a glance" className="border-b border-ink/12 bg-white px-5 py-8 lg:px-10">
        <Box as="dl" className="mx-auto my-0 grid max-w-7xl grid-cols-2 gap-y-6 lg:grid-cols-4">
          {facts.map((fact) => (
            <Box key={fact.label} className="flex flex-col-reverse border-ink/12 pr-6 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
              <dt className="mt-1.5 text-[14px] leading-snug text-ink/60">{fact.label}</dt>
              <dd className="m-0 font-display text-[clamp(22px,2.2vw,28px)] leading-none font-semibold text-ink">{fact.value}</dd>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

/** The four-step journey. Design: `#journey`. */
export function CxJourney({ data }) {
  return (
    <Section id="journey" aria-labelledby="journey-h" className="scroll-mt-32 bg-paper-warm">
      <Head id="journey" data={data} />
      <Reveal>
        <JourneyTabs data={data} />
      </Reveal>
    </Section>
  );
}

/** Who does what at each step — a role × step grid with a bar spanning the
 * steps each role covers. Design: `#team`. */
export function CxTeam({ data }) {
  const span = ["lg:col-span-1", "lg:col-span-2", "lg:col-span-3", "lg:col-span-4"];
  const start = ["lg:col-start-2", "lg:col-start-3", "lg:col-start-4", "lg:col-start-5"];
  return (
    <Section id="team" aria-labelledby="team-h" className="scroll-mt-32 bg-paper">
      <Head id="team" data={data} />
      <Reveal className="overflow-hidden rounded-[16px] border border-ink/12 bg-white">
        <Box aria-hidden="true" className="hidden grid-cols-[280px_repeat(4,1fr)] border-b border-ink/12 bg-paper-warm lg:grid">
          <Text as="span" className="px-6 py-4.5 font-mono text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            {data.who_label}
          </Text>
          {data.steps.map((step, index) => (
            <Text as="span" key={step} className="border-l border-ink/12 px-6 py-4.5 font-display text-[16px] font-semibold text-ink">
              <Text as="span" className="mr-2 font-mono text-[11px] text-ink/50">
                {pad(index + 1)}
              </Text>
              {step}
            </Text>
          ))}
        </Box>
        <Box as="ul" className="m-0 list-none p-0">
          {data.roles.map((role) => (
            <Box
              as="li"
              key={role.name}
              className="grid grid-cols-1 items-center gap-3 border-b border-ink/12 px-6 py-5 last:border-b-0 lg:grid-cols-[280px_repeat(4,1fr)] lg:gap-0 lg:px-0 lg:py-0"
            >
              <Box className="lg:px-6 lg:py-5">
                <Text as="span" className="block font-display text-[16.5px] font-semibold text-ink">
                  {role.name}
                </Text>
                <Text as="span" className="mt-0.5 block text-[14px] text-ink/60">
                  {role.note}
                </Text>
              </Box>
              <Box className={cn("lg:row-start-1 lg:mx-3 lg:my-5", start[role.from], span[role.to - role.from])}>
                <Text
                  as="span"
                  className={cn(
                    "flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[14px] leading-snug",
                    role.lead ? "bg-navy font-semibold text-paper" : "border border-ink/15 bg-paper text-ink",
                  )}
                >
                  {role.lead ? <Box as="span" aria-hidden="true" className="size-2 flex-none rounded-full bg-lime" /> : null}
                  <Text as="span" className="text-inherit lg:hidden">
                    {data.steps.slice(role.from, role.to + 1).join(" · ")}:{" "}
                  </Text>
                  {role.text}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}

/** Navy call-to-action card. Design: CTA band. */
export function CxCta({ data }) {
  return (
    <Section aria-labelledby="cx-cta-h" className="bg-paper pt-0 lg:pt-0">
      <Reveal className="flex flex-wrap items-center justify-between gap-8 rounded-[20px] bg-[linear-gradient(120deg,var(--color-navy),var(--color-navy-soft))] px-8 py-12 lg:px-14">
        <Box className="max-w-[46ch]">
          <RichHeading as="h2" id="cx-cta-h" heading={data.heading} className="text-paper" emphasisClassName="text-lime" />
          <Text as="p" className="mt-4 text-[16px] text-paper/75">
            {data.description}
          </Text>
        </Box>
        <CtaButton color="lime" arrow render={<a href={data.button.href} />}>
          {data.button.label}
        </CtaButton>
      </Reveal>
    </Section>
  );
}

/** Delivery — the matched trainer card beside "everything around the
 * trainer". Design: `#delivery`. */
export function CxDelivery({ data }) {
  const { trainer, around } = data;
  const CardHead = ({ icon, title, text }) => (
    <>
      <Box className="mb-4 flex items-center gap-4">
        <Box as="span" className="grid size-12 flex-none place-items-center rounded-full border border-ink/20 text-ink">
          <CxIcon name={icon} size={20} />
        </Box>
        <Text as="h3" className="text-[clamp(20px,2vw,24px)]">
          {title}
        </Text>
      </Box>
      <Text as="p" className="mb-6 text-[15.5px] leading-[1.7]">
        {text}
      </Text>
    </>
  );

  return (
    <Section id="delivery" aria-labelledby="delivery-h" className="scroll-mt-32 bg-paper-warm">
      <Head id="delivery" data={data} />
      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="rounded-[18px] border border-ink/12 bg-white p-8">
          <CardHead icon={trainer.icon} title={trainer.title} text={trainer.text} />
          <Box className="flex flex-wrap items-center gap-2">
            <Text as="span" className="mr-2 font-mono text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              {trainer.brief_label}
            </Text>
            {trainer.brief.map((item) => (
              <Text as="span" key={item} className="rounded-full bg-paper-warm px-4 py-2 text-[14.5px] text-ink">
                {item}
              </Text>
            ))}
          </Box>
          <ArrowDown size={22} aria-hidden="true" className="mx-auto my-3 text-ink/40" />
          <Box className="overflow-hidden rounded-[14px] border border-ink/15">
            <Box className="flex items-center gap-4 px-6 py-4.5">
              <Box as="span" className="grid size-10 place-items-center rounded-full bg-paper-warm text-ink">
                <CxIcon name="user" size={17} />
              </Box>
              <Box>
                <Text as="span" className="block font-display text-[16.5px] font-semibold text-ink">
                  {trainer.profile.title}
                </Text>
                <Text as="span" className="block text-[14px] text-ink/60">
                  {trainer.profile.subtitle}
                </Text>
              </Box>
            </Box>
            <Box as="ul" className="m-0 list-none p-0">
              {trainer.profile.rows.map((row) => (
                <li key={row} className="flex items-center justify-between border-t border-ink/12 px-6 py-3.5 text-[14.5px] text-ink">
                  {row}
                  <Text as="span" className="flex items-center gap-1.5 text-[14.5px] font-semibold text-ink">
                    <Check size={15} aria-hidden="true" />
                    {trainer.profile.matched}
                  </Text>
                </li>
              ))}
            </Box>
            <Box className="flex justify-end border-t border-ink/12 bg-paper-warm px-6 py-3">
              <Text as="span" className="rounded-full border border-ink/20 bg-white px-3.5 py-1.5 text-[13.5px] font-semibold text-ink">
                {trainer.profile.status}
              </Text>
            </Box>
          </Box>
          <Text as="p" className="mt-3 text-[13px] text-ink/55">
            {trainer.note}
          </Text>
        </Reveal>

        <Reveal delay={1} className="rounded-[18px] border border-ink/12 bg-white p-8">
          <CardHead icon={around.icon} title={around.title} text={around.text} />
          <Box as="ul" className="m-0 list-none border-t border-ink/12 p-0">
            {around.items.map((item) => (
              <li key={item.title} className="flex gap-4 border-b border-ink/12 py-4.5">
                <Box as="span" className="grid size-8 flex-none place-items-center rounded-full border border-ink/30 text-ink">
                  <Check size={15} aria-hidden="true" />
                </Box>
                <Box>
                  <Text as="span" className="block font-display text-[16.5px] font-semibold text-ink">
                    {item.title}
                  </Text>
                  <Text as="span" className="mt-0.5 block text-[14px] text-ink/60">
                    {item.text}
                  </Text>
                </Box>
              </li>
            ))}
          </Box>
          <Text as="p" className="mt-6 inline-flex items-center gap-3 rounded-full bg-navy px-5 py-3 text-[14.5px] text-paper">
            <Box as="span" aria-hidden="true" className="size-2 rounded-full bg-lime" />
            {around.badge}
          </Text>
        </Reveal>
      </Box>
    </Section>
  );
}

/** Navy "why" — heading beside a 2×2 of proof points. Design: `#why`. */
export function CxWhy({ data }) {
  return (
    <Section id="why" aria-labelledby="why-h" className="scroll-mt-32 bg-navy">
      <Box className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <RichHeading as="h2" id="why-h" heading={data.heading} className="text-paper" emphasisClassName="text-lime" />
          <Text as="p" className="mt-4 max-w-[44ch] text-[17px] leading-[1.7] text-paper/75">
            {data.description}
          </Text>
        </Reveal>
        <Reveal delay={1} as="dl" className="m-0 grid grid-cols-1 border-y border-paper/15 sm:grid-cols-2">
          {data.items.map((item, index) => (
            <Box key={item.title} className={cn("py-7 sm:px-8", index % 2 === 1 && "sm:border-l sm:border-paper/15", index > 1 && "border-t border-paper/15", index === 1 && "max-sm:border-t max-sm:border-paper/15")}>
              <dd className="m-0 font-display text-[clamp(32px,3vw,42px)] leading-none font-semibold text-lime">{item.value}</dd>
              <dt className="mt-4 font-display text-[18px] font-semibold text-paper">{item.title}</dt>
              <dd className="m-0 mt-2 text-[14.5px] leading-[1.55] text-paper/65">{item.text}</dd>
            </Box>
          ))}
        </Reveal>
      </Box>
    </Section>
  );
}

/** "More from Edstellar." — five link cards, the first navy. Design: `#related`. */
export function CxRelated({ data }) {
  return (
    <Section aria-labelledby="related-h" className="bg-paper">
      <Text as="h2" id="related-h" className="mb-6 text-[22px]">
        {data.heading}
      </Text>
      <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {data.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex flex-col rounded-[16px] border p-6 transition-colors",
              item.featured ? "border-navy bg-navy text-paper" : "border-ink/12 bg-white text-ink hover:border-navy",
            )}
          >
            <Box className="mb-5 flex items-start justify-between gap-3">
              <Box as="span" className={cn("grid size-12 place-items-center rounded-xl", item.featured ? "bg-navy-soft text-lime" : "bg-paper-warm text-ink")}>
                <CxIcon name={item.icon} size={20} />
              </Box>
              <Text as="span" className={cn("rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase", item.featured ? "border-lime text-lime" : "border-ink/15 text-ink/60")}>
                {item.tag}
              </Text>
            </Box>
            <Text as="span" className={cn("mb-2 font-display text-[19px] leading-snug font-semibold", item.featured ? "text-paper" : "text-ink")}>
              {item.title}
            </Text>
            <Text as="span" className={cn("mb-6 text-[14.5px] leading-[1.55]", item.featured ? "text-paper/70" : "text-ink/60")}>
              {item.text}
            </Text>
            <Text as="span" className={cn("mt-auto flex items-center justify-between gap-3 font-display text-[14.5px] font-semibold", item.featured ? "text-paper" : "text-ink")}>
              {item.link}
              <Box as="span" className={cn("grid size-8 flex-none place-items-center rounded-full border transition-colors", item.featured ? "border-lime/50 text-lime" : "border-ink/25 group-hover:bg-navy group-hover:text-lime")}>
                <ArrowRight size={15} aria-hidden="true" />
              </Box>
            </Text>
          </Link>
        ))}
      </Box>
    </Section>
  );
}

/** FAQs. Design: `#faq`. */
export function CxFaqs({ data }) {
  return (
    <Section id="faq" aria-labelledby="faq-h" className="scroll-mt-32 bg-paper-warm" innerClassName="max-w-235">
      <Head id="faq" data={data} center />
      <FaqDetails items={data.items} />
    </Section>
  );
}
