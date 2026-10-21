import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import FaqDetails from "@/components/common/faq-details";
import { CtaButton } from "@/components/common/cta-button";
import ToolLauncher from "@/components/sections/template_detail/tool-launcher";
import { TemplateIcon } from "@/components/sections/template_detail/icons";
import { cn } from "@/lib/utils";

/*
 * An L&D template / tool page, in the design's order: navy hero, then the
 * article (lede, features, audience, steps, benefits, FAQs) beside a sticky
 * promo. Each block renders nothing when its entry has no data for it, so
 * other templates can drop sections they don't need.
 * Design: Free_Organizational_Chart_Generator_Template.html.
 */

const pad = (n) => String(n).padStart(2, "0");
const ARROW_ITEM = "relative pl-5.5 before:absolute before:left-0 before:font-bold before:text-olive before:content-['→']";

/** Navy hero — breadcrumb, title and "Access Tool" beside the framed
 * screenshot, closed by a lime rule. Design: `.hero`, `.shot`. */
export function TemplateHero({ template, breadcrumbs }) {
  const { hero } = template;
  return (
    <Section className="relative overflow-hidden border-b-4 border-lime bg-navy">
      <Box
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-130 rounded-full bg-[radial-gradient(circle,rgba(200,241,53,0.12),transparent_70%)]"
      />
      <Box className="relative">
        <Breadcrumbs items={breadcrumbs} tone="dark" className="mt-0 mb-10" />
        <Box className="grid grid-cols-1 items-center gap-11 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <RichHeading as="h1" heading={hero.heading} className="max-w-[14ch] text-paper" emphasisClassName="text-lime" />
            {hero.tool ? <ToolLauncher tool={hero.tool} title={template.title} /> : null}
          </Reveal>
          {hero.image ? (
            <Reveal delay={1}>
              <Box className="rounded-[22px] border border-paper/12 bg-[linear-gradient(160deg,var(--color-navy-soft),var(--color-navy-deep))] p-4.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
                <img loading="eager"
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={hero.image.width}
                  height={hero.image.height}
                  fetchPriority="high"
                  decoding="async"
                  className="block h-auto w-full rounded-[14px] bg-paper"
                />
              </Box>
            </Reveal>
          ) : null}
        </Box>
      </Box>
    </Section>
  );
}

function BlockHeading({ heading }) {
  return <RichHeading as="h2" heading={heading} className="mb-6.5" emphasisClassName="text-olive" />;
}

/** "Key Features Included" — a numbered, ruled list. Design: `.feats`. */
function Features({ data }) {
  if (!data?.items?.length) return null;
  return (
    <Reveal as="section" id="features" className="scroll-mt-28">
      <BlockHeading heading={data.heading} />
      <Box as="ol" className="m-0 list-none border-t border-ink/12 p-0">
        {data.items.map((item, index) => (
          <Box as="li" key={item.title} className="grid grid-cols-[42px_1fr] gap-3.5 border-b border-ink/12 py-4.5 text-[15.5px] leading-[1.7] text-ink/65">
            <Text as="span" aria-hidden="true" className="pt-1.5 font-mono text-[11px] tracking-[0.18em] text-olive">
              {pad(index + 1)}
            </Text>
            <Text as="span" className="text-[15.5px] leading-[1.7]">
              <b className="font-semibold text-ink">{item.title} -</b> {item.text}
            </Text>
          </Box>
        ))}
      </Box>
    </Reveal>
  );
}

/** "Who Should Use…" — role chips. Design: `.roles`. */
function Audience({ data }) {
  if (!data?.items?.length) return null;
  return (
    <Reveal as="section" id="who" className="scroll-mt-28">
      <BlockHeading heading={data.heading} />
      <Box as="ul" className="m-0 flex list-none flex-wrap gap-2.5 p-0">
        {data.items.map((item) => (
          <Box
            as="li"
            key={item}
            className="flex items-center gap-2.5 rounded-[14px] border border-ink/12 bg-white px-4.5 py-3 text-[14.5px] font-medium text-ink before:font-bold before:text-olive before:content-['→']"
          >
            {item}
          </Box>
        ))}
      </Box>
    </Reveal>
  );
}

/** "How to Use…" — numbered step cards with arrow bullets (and one nested
 * level). Design: `.steps`, `.step`. */
function Steps({ data }) {
  if (!data?.items?.length) return null;
  return (
    <Box as="section" id="how" className="scroll-mt-28">
      <Reveal>
        <BlockHeading heading={data.heading} />
      </Reveal>
      <Box as="ol" className="m-0 grid list-none gap-3.5 p-0">
        {data.items.map((step, index) => (
          <Reveal as="li" key={step.title} className="grid grid-cols-[48px_1fr] gap-4.5 rounded-[18px] border border-ink/12 bg-white px-6 py-5.5">
            <Text as="span" aria-hidden="true" className="grid size-12 place-items-center rounded-xl bg-navy font-display text-[19px] font-bold text-lime">
              {index + 1}
            </Text>
            <Box>
              <Text as="h3" className="my-2.5 text-[18px] leading-[1.35]">
                {step.title}
              </Text>
              <Box as="ul" className="m-0 grid list-none gap-1.5 p-0 text-[14.5px] leading-[1.6] text-ink/65">
                {step.points.map((point) =>
                  typeof point === "string" ? (
                    <li key={point} className={ARROW_ITEM}>
                      {point}
                    </li>
                  ) : (
                    <li key={point.text} className={ARROW_ITEM}>
                      {point.text}
                      <Box as="ul" className="m-0 mt-1.5 grid list-none gap-1.5 p-0">
                        {point.items.map((sub) => (
                          <li key={sub} className="relative pl-5.5 before:absolute before:left-0 before:font-bold before:text-olive before:content-['–']">
                            {sub}
                          </li>
                        ))}
                      </Box>
                    </li>
                  ),
                )}
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}

/** "Benefits of Using…" — benefit groups of icon cards, the second on navy.
 * Design: `.bgroup`, `.bgroup.dark`, `.ben`. */
function Benefits({ data }) {
  if (!data?.groups?.length) return null;
  return (
    <Box as="section" id="benefits" className="scroll-mt-28">
      <Reveal>
        <BlockHeading heading={data.heading} />
      </Reveal>
      {data.groups.map((group) => (
        <Reveal key={group.title} className={cn("mt-8 first:mt-0", group.dark && "rounded-[24px] bg-navy p-7")}>
          <Text
            as="h3"
            className={cn(
              "mb-4 flex items-center gap-2.5 font-mono text-[11px] leading-none tracking-[0.2em] uppercase before:h-0.5 before:w-5.5 before:bg-lime before:content-['']",
              group.dark ? "text-paper/60" : "text-ink-muted",
            )}
          >
            {group.title}
          </Text>
          <Box className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {group.items.map((item) => (
              <Box
                key={item.title}
                className={cn("rounded-[18px] border p-5.5", group.dark ? "border-paper/12 bg-navy-soft" : "border-ink/12 bg-white")}
              >
                <Box
                  as="span"
                  className={cn("mb-5 grid size-9.5 place-items-center rounded-[10px]", group.dark ? "bg-lime/12 text-lime" : "bg-lime-soft/60 text-olive")}
                >
                  <TemplateIcon name={item.icon} />
                </Box>
                <Text as="h4" className={cn("mb-2 text-[18px] leading-snug", group.dark && "text-paper")}>
                  {item.title}
                </Text>
                <Text as="p" className={cn("text-[14.5px] leading-[1.65]", group.dark && "text-paper/70")}>
                  {item.text}
                </Text>
              </Box>
            ))}
          </Box>
        </Reveal>
      ))}
    </Box>
  );
}

/** The article beside its sticky promo. Design: `.page`, `.content`, `.side`. */
export function TemplateArticle({ template }) {
  return (
    <Section className="bg-paper">
      <Box className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <Box as="article" className="flex flex-col gap-19">
          {template.lede ? (
            <Reveal>
              <Text as="p" className="text-[17.5px] leading-[1.8] first-line:text-ink">
                {template.lede}
              </Text>
            </Reveal>
          ) : null}
          <Features data={template.features} />
          <Audience data={template.audience} />
          <Steps data={template.steps} />
          <Benefits data={template.benefits} />
          {template.faqs?.items?.length ? (
            <Box as="section" id="faqs" className="scroll-mt-28">
              <Reveal>
                <BlockHeading heading={template.faqs.heading} />
              </Reveal>
              <FaqDetails items={template.faqs.items} />
            </Box>
          ) : null}
        </Box>

        {template.promo ? (
          <Reveal as="aside" delay={1} className="lg:sticky lg:top-24">
            <Box className="relative overflow-hidden rounded-[20px] bg-navy px-7 py-8 before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-lime before:content-['']">
              <RichHeading as="h2" heading={template.promo.heading} className="mb-6 text-[26px] leading-[1.2] text-paper" emphasisClassName="text-lime" />
              <CtaButton arrow block render={<Link href={template.promo.cta.href} />} className="bg-paper text-navy hover:bg-white">
                {template.promo.cta.label}
              </CtaButton>
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}
