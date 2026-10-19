import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import FaqDetails from "@/components/common/faq-details";
import { CtaButton } from "@/components/common/cta-button";
import { AboutIcon } from "@/components/sections/about/icons";
import SolveTabs from "@/components/sections/about/solve-tabs";
import MethodStepper from "@/components/sections/about/method-stepper";
import ClientLogoWall from "@/components/sections/about/client-logo-wall";
import { cn } from "@/lib/utils";

/*
 * About Us sections, top to bottom. Each is a Server Component; only the
 * segment tabs, the 5A stepper and the logo filter ship JavaScript.
 * Design: about-us 59.html.
 */

const pad = (n) => String(n).padStart(2, "0");
const RING_TEXT = ["text-ring-1", "text-ring-2", "text-ring-3"];
const RING_BORDER = ["border-ring-1", "border-ring-2", "border-ring-3"];

/** A link button: internal routes through `next/link`, the rest as `<a>`. */
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

/** Heading + intro at the top of a section. */
function Head({ id, data, dark = false, className }) {
  return (
    <Reveal className={cn("mb-11 max-w-[64rem]", className)}>
      <RichHeading as="h2" id={`${id}-h`} heading={data.heading} className={cn(dark && "text-paper")} emphasisClassName={dark ? "text-lime" : "text-ink"} />
      {data.description ? (
        <Text as="p" className={cn("mt-4 max-w-[60ch] text-[17px] leading-[1.7]", dark && "text-paper/75")}>
          {data.description}
        </Text>
      ) : null}
    </Reveal>
  );
}

/** Centred navy hero. Design: `.hero`. */
export function AboutHero({ data, breadcrumbs }) {
  return (
    <Section id="top" className="relative overflow-hidden bg-[radial-gradient(70%_80%_at_50%_0%,var(--color-navy-soft),var(--color-navy-deep))] text-center">
      <Breadcrumbs items={breadcrumbs} tone="dark" className="mt-0 mb-12 justify-center" />
      <Reveal className="mx-auto max-w-5xl">
        <RichHeading
          as="h1"
          heading={data.heading}
          className="mx-auto text-paper [&_em]:mt-2 [&_em]:block [&_em]:text-[clamp(44px,7vw,92px)] [&_em]:leading-[1.05]"
          emphasisClassName="text-lime"
        />
        <Text as="p" className="mx-auto mt-8 max-w-[62ch] text-[clamp(16px,1.3vw,18px)] leading-[1.7] text-paper/75">
          {data.description}
        </Text>
        <Box className="mt-9 flex flex-wrap justify-center gap-3">
          <CtaButton color="lime" arrow render={<a href={data.primary_cta.href} />}>
            {data.primary_cta.label}
          </CtaButton>
          <CtaButton arrow variant="ghost" render={<a href={data.secondary_cta.href} />} className="border-paper/40 text-paper hover:border-paper hover:bg-paper/5">
            {data.secondary_cta.label}
          </CtaButton>
        </Box>
      </Reveal>
    </Section>
  );
}

/** The logo story — logo and name meanings beside four numbered cards.
 * Design: `#story`. */
export function AboutStory({ data }) {
  return (
    <Section id="story" aria-labelledby="story-h" className="scroll-mt-32 bg-paper-warm">
      <Head id="story" data={data} />
      <Box className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <Reveal>
          <img src={data.logo.src} alt={data.logo.alt} width={data.logo.width} height={data.logo.height} loading="lazy" decoding="async" className="mb-10 h-auto w-full max-w-110" />
          <Box className="border-l-4 border-navy pl-6">
            {data.name_parts.map((item) => (
              <Text as="p" key={item.part} className="mb-4 text-[17px] leading-[1.6] text-ink last:mb-0">
                <b className="mr-3 font-display text-[22px] font-semibold">{item.part}</b>
                <mark className="bg-lime-soft/70 px-1 text-ink">{item.meaning}</mark>
              </Text>
            ))}
          </Box>
        </Reveal>
        <Box as="ol" className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {data.items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.5} className="rounded-[16px] border border-ink/12 bg-white p-6">
              <Text as="span" aria-hidden="true" className="mb-4 grid size-7 place-items-center rounded-full bg-navy font-display text-[13px] font-semibold text-lime">
                {index + 1}
              </Text>
              <Text as="h3" className="mb-2 text-[18px] leading-snug">
                {item.title}
              </Text>
              <Text as="p" className="text-[15px] leading-[1.6]">
                {item.description}
              </Text>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}

/** The three Es beside the logo's rings. Design: `#values`. */
export function AboutValues({ data }) {
  return (
    <Section id="values" aria-labelledby="values-h" className="bg-navy">
      <Reveal className="mb-6 max-w-[60ch]">
        <RichHeading as="h2" id="values-h" heading={data.heading} className="text-paper" emphasisClassName="text-ring-3" />
        <Text as="p" className="mt-4 text-[16px] leading-[1.7] text-paper/75">
          {data.description}
        </Text>
      </Reveal>
      <Box className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1fr]">
        <Reveal aria-hidden="true" className="mx-auto w-full max-w-120">
          <svg viewBox="0 0 400 400" className="w-full">
            <circle cx="200" cy="200" r="188" fill="none" strokeWidth="14" className="stroke-ring-1" />
            <circle cx="200" cy="200" r="155" fill="none" strokeWidth="14" className="stroke-ring-2" />
            <circle cx="200" cy="200" r="122" fill="none" strokeWidth="14" className="stroke-ring-3" />
            <text x="200" y="262" textAnchor="middle" className="fill-paper font-display text-[200px]">
              e
            </text>
          </svg>
        </Reveal>
        <Box className="divide-y divide-paper/12">
          {data.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.5} className="py-6 first:pt-0 last:pb-0">
              <Text as="h3" className={cn("flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[clamp(30px,3.2vw,42px)] leading-none", RING_TEXT[index])}>
                {item.title}
                <Text as="span" className="font-mono text-[11px] tracking-[0.18em] text-paper/60 uppercase">
                  {item.tag}
                </Text>
              </Text>
              <Text as="p" className="mt-3 text-[16px] leading-[1.7] text-paper/80">
                {item.description}
              </Text>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}

/** Vision, mission and values cards. Design: `#purpose`. */
export function AboutPurpose({ data }) {
  const Card = ({ item, className, dark }) => (
    <Box as="article" className={cn("rounded-[16px] p-8", className)}>
      <Text as="h3" className={cn("mb-2 font-mono text-[11px] tracking-[0.18em] uppercase", dark ? "text-lime" : "text-ink/60")}>
        {item.label}
      </Text>
      <Text as="p" className={cn("mb-5 text-[14px] font-semibold", dark ? "text-paper/75" : "text-ink/70")}>
        {item.question}
      </Text>
      {item.text ? (
        <RichHeading as="p" heading={item.text} className={cn("font-body text-[16.5px] leading-[1.6] font-normal tracking-normal", dark ? "text-paper" : "text-ink")} emphasisClassName="text-lime" />
      ) : null}
    </Box>
  );

  return (
    <Section id="purpose" aria-labelledby="purpose-h" className="scroll-mt-32 bg-paper-warm">
      <Head id="purpose" data={data} />
      <Reveal className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Box className="flex flex-col gap-5">
          <Card item={data.vision} dark className="bg-navy" />
          <Card item={data.mission} className="flex-1 border border-ink/12 bg-white" />
        </Box>
        <Box as="article" className="rounded-[16px] bg-paper-cream p-8">
          <Text as="h3" className="mb-2 font-mono text-[11px] tracking-[0.18em] text-ink/70 uppercase">
            {data.values.label}
          </Text>
          <Text as="p" className="mb-5 text-[14px] font-semibold text-ink">
            {data.values.question}
          </Text>
          <Box as="ul" className="m-0 list-none border-t border-ink/15 p-0">
            {data.values.items.map((item, index) => (
              <Box as="li" key={item.title} className="flex gap-4 border-b border-ink/15 py-5 last:border-b-0">
                <Box as="span" aria-hidden="true" className={cn("mt-0.5 size-6 flex-none rounded-full border-[3px]", RING_BORDER[index])} />
                <Box>
                  <Text as="span" className="block font-display text-[19px] font-semibold text-ink">
                    {item.title}
                  </Text>
                  <Text as="span" className="mt-1.5 block text-[15.5px] leading-[1.6] text-ink/80">
                    {item.text}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}

/** The eight headline numbers. Design: `#glance`. */
export function AboutGlance({ data }) {
  return (
    <Section id="glance" aria-labelledby="glance-h" className="bg-navy">
      <Head id="glance" data={data} dark className="mb-9" />
      <Reveal>
        <Box as="dl" className="m-0 grid grid-cols-2 gap-y-8 rounded-[18px] bg-navy-soft p-8 lg:grid-cols-4 lg:p-10">
          {data.stats.map((stat) => (
            <Box key={stat.label} className="flex flex-col-reverse border-paper/12 pr-4 lg:border-l lg:pl-8 lg:[&:nth-child(4n+1)]:border-l-0 lg:[&:nth-child(4n+1)]:pl-0">
              <dt className="mt-2 text-[14px] text-paper/75">{stat.label}</dt>
              <dd className="m-0 font-display text-[clamp(28px,2.8vw,36px)] leading-none font-semibold text-lime">{stat.value}</dd>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}

/** Global delivery — scale rails beside the world map, then the delivery
 * promises and formats as chips. Design: `#reach`. */
export function AboutReach({ data }) {
  return (
    <Section id="reach" aria-labelledby="reach-h" className="scroll-mt-32 bg-paper">
      <Head id="reach" data={data} />
      <Box className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <Text as="h3" className="mb-4 text-[18px] leading-snug">
            {data.scale_title}
          </Text>
          <Box as="ul" className="m-0 grid list-none gap-3 p-0">
            {data.scales.map((scale) => (
              <Box as="li" key={scale.label} className="flex gap-4 rounded-[14px] border border-ink/12 bg-white p-4">
                <Box as="span" className="grid size-9 flex-none place-items-center rounded-[10px] bg-navy text-lime">
                  <AboutIcon name={scale.icon} size={17} />
                </Box>
                <Box className="flex-1">
                  <Text as="p" className="font-display text-[16px] font-semibold text-ink">
                    {scale.label}
                  </Text>
                  <Box aria-hidden="true" className="relative mt-2.5 h-1 rounded-full bg-[linear-gradient(90deg,var(--color-ring-3),var(--color-ring-1),var(--color-navy))] before:absolute before:-top-1 before:left-0 before:size-3 before:rounded-full before:border-2 before:border-ring-3 before:bg-white before:content-[''] after:absolute after:-top-1 after:right-0 after:size-3 after:rounded-full after:border-2 after:border-white after:bg-navy after:content-['']" />
                  <Text as="p" className="mt-2 flex justify-between text-[13px] text-ink/60">
                    <Text as="span" className="text-[13px]">{scale.from}</Text>
                    <Text as="span" className="text-[13px]">{scale.to}</Text>
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>
        <Reveal delay={1}>
          <img src={data.map.src} alt={data.map.alt} width={960} height={540} loading="lazy" decoding="async" className="block h-auto w-full rounded-[16px]" />
        </Reveal>
      </Box>
      <Reveal as="ul" className="m-0 mt-10 flex list-none flex-wrap justify-center gap-2.5 p-0">
        {[...data.promises, ...data.formats].map((item) => (
          <li key={item.label} title={item.description} className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4.5 py-2.5 text-[15px] font-medium text-ink">
            <AboutIcon name={item.icon} size={16} />
            {item.label}
          </li>
        ))}
      </Reveal>
    </Section>
  );
}

/** Segments tabs, then the six everyday challenges. Design: `#solve`. */
export function AboutSolve({ data }) {
  return (
    <Section id="solve" aria-labelledby="solve-h" className="scroll-mt-32 bg-paper-warm">
      <Head id="solve" data={data} />
      <Reveal>
        <SolveTabs data={data} />
      </Reveal>
      <Reveal className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(6,1fr)] lg:gap-5">
        <Text as="h3" className="text-[19px] leading-snug sm:col-span-2 lg:col-span-1 lg:self-center">
          {data.challenges_title}
        </Text>
        {data.challenges.map((item) => (
          <Box key={item.title}>
            <Check size={17} aria-hidden="true" className="mb-3 text-ink" />
            <Text as="p" className="mb-1.5 font-display text-[15px] leading-snug font-semibold text-ink">
              {item.title}
            </Text>
            <Text as="p" className="text-[14px] leading-[1.6]">
              {item.text}
            </Text>
          </Box>
        ))}
      </Reveal>
    </Section>
  );
}

/** The 5A methodology. Design: `#method`. */
export function AboutMethod({ data }) {
  return (
    <Section id="method" aria-labelledby="method-h" className="scroll-mt-32 bg-paper">
      <Head id="method" data={data} />
      <Reveal>
        <MethodStepper data={data} />
      </Reveal>
    </Section>
  );
}

/** Platforms and tools in two groups of cards. Design: `#tools`. */
export function AboutTools({ data }) {
  return (
    <Section id="tools" aria-labelledby="tools-h" className="scroll-mt-32 bg-navy">
      <Head id="tools" data={data} dark />
      <Box className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-paper/12">
        {data.groups.map((group, groupIndex) => (
          <Reveal key={group.title} className={groupIndex === 0 ? "lg:pr-5" : "lg:pl-5"}>
            <Text as="p" className="mb-2 font-mono text-[11px] tracking-[0.16em] text-lime uppercase">
              {group.kicker}
            </Text>
            <Text as="h3" className="mb-1.5 text-paper">
              {group.title}
            </Text>
            <Text as="p" className="mb-6 text-[15px] text-paper/70">
              {group.description}
            </Text>
            <Box className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {group.items.map((tool) => {
                const body = (
                  <>
                    <Box className="mb-4 flex items-start justify-between gap-3">
                      <Box as="span" className="grid size-11 flex-none place-items-center rounded-[10px] bg-lime/12 text-lime">
                        <AboutIcon name={tool.icon} size={19} />
                      </Box>
                      <Text as="span" className="text-right font-mono text-[10.5px] tracking-[0.14em] text-paper/60 uppercase">
                        {tool.stages}
                      </Text>
                    </Box>
                    <Text as="h4" className="mb-3 text-[18px] leading-snug text-paper">
                      {tool.name}
                    </Text>
                    <Text as="p" className="mb-4 flex-1 text-[14.5px] leading-[1.6] text-paper/75">
                      {tool.description}
                    </Text>
                    {tool.href ? (
                      <Text as="span" className="inline-flex items-center gap-1.5 font-display text-[14px] font-semibold text-lime">
                        {data.explore_label}
                        <ArrowRight size={14} aria-hidden="true" />
                      </Text>
                    ) : null}
                  </>
                );
                const card = "flex h-full flex-col rounded-[14px] border border-paper/12 bg-navy-soft p-5";
                return tool.href ? (
                  <Link key={tool.name} href={tool.href} title={`Click Here to Explore ${tool.name}`} className={cn(card, "transition-colors hover:border-lime/50")}>
                    {body}
                  </Link>
                ) : (
                  <Box key={tool.name} className={card}>
                    {body}
                  </Box>
                );
              })}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}

/** The expert network and how matching works. Design: `#experts`. */
export function AboutExperts({ data }) {
  return (
    <Section id="experts" aria-labelledby="experts-h" className="scroll-mt-32 bg-navy-deep">
      <Box className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <RichHeading as="h2" id="experts-h" heading={data.heading} className="text-paper" emphasisClassName="text-lime" />
          <Text as="p" className="mt-5 font-display text-[clamp(64px,8vw,104px)] leading-none font-bold text-lime">
            {data.stat.value}
          </Text>
          <Text as="p" className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-paper/80">
            {data.stat.label}
          </Text>
          <Text as="p" className="sr-only">
            {data.roles_label}
          </Text>
          <Box as="ul" className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
            {data.roles.map((role) => (
              <li key={role} className="rounded-full border border-paper/25 px-3.5 py-1.5 text-[14px] text-paper">
                {role}
              </li>
            ))}
          </Box>
          <Box className="mt-8 flex flex-wrap gap-3">
            <LinkButton cta={data.primary_cta} className="bg-lime text-navy" />
            <LinkButton cta={data.secondary_cta} variant="ghost" className="border-paper/40 text-paper hover:border-paper hover:bg-paper/5" />
          </Box>
        </Reveal>
        <Reveal delay={1} className="rounded-[18px] bg-navy-soft p-7">
          <Text as="h3" className="mb-5 font-mono text-[11px] tracking-[0.16em] text-paper/70 uppercase">
            {data.match_title}
          </Text>
          <Box as="ol" className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {data.steps.map((step, index) => (
              <li key={step.title} className="rounded-[14px] border border-paper/12 bg-navy p-5">
                <Text as="span" className="font-mono text-[11px] text-lime">
                  {pad(index + 1)}
                </Text>
                <Text as="p" className="mt-3 mb-2 font-display text-[17px] font-semibold text-paper">
                  {step.title}
                </Text>
                <Text as="p" className="text-[14.5px] leading-[1.65] text-paper/75">
                  {step.text}
                </Text>
              </li>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}

/** Industry filter and client logos. Design: `#clients`. */
export function AboutClients({ data }) {
  return (
    <Section id="clients" aria-labelledby="clients-h" className="scroll-mt-32 bg-white">
      <Head id="clients" data={data} />
      <Reveal>
        <ClientLogoWall data={data} />
      </Reveal>
    </Section>
  );
}

/** "Training partner → capability partner" comparison. Design: `#shift`. */
export function AboutShift({ data }) {
  return (
    <Section id="shift" aria-labelledby="shift-h" className="bg-paper-warm">
      <Head id="shift" data={data} />
      <Reveal className="overflow-hidden rounded-[18px] border border-ink/12">
        <Box className="grid grid-cols-1 md:grid-cols-2">
          <Text as="p" className="border-b border-ink/12 bg-paper-warm px-6 py-4.5 font-mono text-[11px] tracking-[0.18em] text-ink/60 uppercase max-md:hidden">
            {data.from_label}
          </Text>
          <Text as="p" className="border-b border-ink/12 bg-navy px-6 py-4.5 font-mono text-[11px] tracking-[0.18em] text-lime uppercase max-md:hidden">
            {data.to_label}
          </Text>
        </Box>
        <Box as="ul" className="m-0 list-none p-0">
          {data.rows.map((row) => (
            <Box as="li" key={row.from} className="grid grid-cols-1 border-b border-ink/12 last:border-b-0 md:grid-cols-2">
              <Box className="flex items-center justify-between gap-4 bg-paper-warm px-6 py-5">
                <Text as="span" className="text-[15.5px] font-medium text-ink/80">
                  {row.from}
                </Text>
                <ArrowRight size={18} aria-hidden="true" className="flex-none text-ink max-md:rotate-90" />
              </Box>
              <Box className="bg-white px-6 py-5">
                <Text as="p" className="font-display text-[18px] font-semibold text-ink">
                  {row.to}
                </Text>
                <Text as="p" className="mt-1 text-[14px] leading-[1.6]">
                  {row.detail}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}

/** FAQs in two columns, then the navy closing CTA card. Design: `#faq`,
 * `#cta`. */
export function AboutFaqs({ faqs, cta }) {
  const half = Math.ceil(faqs.items.length / 2);
  return (
    <Section id="faq" aria-labelledby="faq-h" className="scroll-mt-32 bg-paper">
      <Head id="faq" data={faqs} />
      <Box className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        <FaqDetails items={faqs.items.slice(0, half)} />
        <FaqDetails items={faqs.items.slice(half)} startAt={half + 1} openFirst={false} className="max-lg:border-t-0" />
      </Box>
      <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-8 rounded-[20px] bg-[linear-gradient(120deg,var(--color-navy-deep),var(--color-navy-soft))] px-8 py-12 lg:px-14">
        <Box className="max-w-[48ch]">
          <RichHeading as="h2" heading={cta.heading} className="text-paper" emphasisClassName="text-lime" />
          <Text as="p" className="mt-4 text-[16px] leading-[1.7] text-paper/75">
            {cta.description}
          </Text>
        </Box>
        <Box className="flex flex-wrap gap-3">
          <CtaButton color="lime" arrow render={<a href={cta.primary_cta.href} />}>
            {cta.primary_cta.label}
          </CtaButton>
          <LinkButton cta={cta.secondary_cta} variant="ghost" className="border-paper/40 text-paper hover:border-paper hover:bg-paper/5" />
        </Box>
      </Reveal>
    </Section>
  );
}
