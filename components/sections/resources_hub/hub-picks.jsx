import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";
import { RESOURCE_ICONS } from "@/components/sections/resources_hub/resource-icons";
import { cn } from "@/lib/utils";

/**
 * "Editor's picks" — six linked cards (icon, kind, title, "Download Free →").
 * External resources open in a new tab.
 *
 * Design: Learning_Development_Resources `#editors-picks`, `.picks`, `.pick`.
 */
export default function HubPicks({ data }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section
      id="editors-picks"
      className={cn("scroll-mt-16 border-y border-ink/12 bg-paper-warm", SECTION_PADDING)}
      innerClassName={SECTION_WIDTH}
    >
      <SectionHead heading={data.heading} description={data.description} />

      <Box className="grid gap-4.5 min-[601px]:grid-cols-2 min-[961px]:grid-cols-3">
        {items.map((item, index) => {
          const Icon = RESOURCE_ICONS[item.icon] ?? RESOURCE_ICONS.all;
          return (
            <Reveal key={item.title} delay={Math.min((index % 3) + 1, 4)} className="flex">
              <a
                href={item.href}
                title={`Click Here to Download ${item.title}`}
                {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
                className="group flex w-full items-start gap-4.5 rounded-[18px] border border-ink/12 bg-white p-6 transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.25 hover:border-ink/22 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <Box className="grid size-11 flex-none place-items-center rounded-[11px] bg-lime/18 text-olive transition-colors duration-250 group-hover:bg-navy group-hover:text-lime">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </Box>
                <Box>
                  <Text as="span" className="block font-mono text-[10.5px] leading-[1.5] tracking-[0.16em] text-ink-muted uppercase">
                    {item.kind}
                  </Text>
                  <Text as="h3" className="mt-1.5 mb-4 text-[17px] leading-[1.35] font-medium tracking-[-0.02em]">
                    {item.title}
                  </Text>
                  <Text
                    as="span"
                    className="inline-flex items-center gap-2 bg-[linear-gradient(var(--color-lime),var(--color-lime))] bg-[length:0_1.5px] bg-left-bottom bg-no-repeat text-[14px] leading-[1.5] font-semibold text-ink transition-[background-size] duration-250 group-hover:bg-[length:100%_1.5px] after:text-olive after:transition-transform after:duration-200 after:content-['→'] group-hover:after:translate-x-1"
                  >
                    {item.cta_label}
                  </Text>
                </Box>
              </a>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
