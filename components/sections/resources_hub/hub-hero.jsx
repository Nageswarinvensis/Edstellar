import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { CtaButton } from "@/components/common/cta-button";
import { RESOURCE_ICONS } from "@/components/sections/resources_hub/resource-icons";

/**
 * Resource hub hero — breadcrumb, heading, lede and two jumps (to the
 * library and to Editor's Picks) beside an "In the library" panel: the
 * total and one row per resource type. A row links to `#type-{key}`, which
 * the library reads to open that type's filter (see `HubLibrary`), so the
 * hero itself needs no JavaScript.
 *
 * Design: Learning_Development_Resources `.hero`, `.lib`, `.badge`.
 */
export default function HubHero({ data, types = [], breadcrumbs }) {
  if (!data) return null;
  const { heading, description, primary_cta, secondary_cta, library } = data;
  const rows = types.filter((type) => type.key !== "all");

  return (
    <Box
      as="section"
      aria-label="Learning and development resources"
      className="relative overflow-hidden border-b-4 border-lime bg-navy px-5 text-paper before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(60%_70%_at_85%_30%,color-mix(in_srgb,var(--color-lime)_10%,transparent),transparent_70%),radial-gradient(40%_50%_at_0%_100%,color-mix(in_srgb,var(--color-navy-soft)_90%,transparent),transparent_70%)] before:content-[''] lg:px-10"
    >
      <Box className="relative mx-auto max-w-295 pt-7.5 pb-18 sm:pb-21">
        <Breadcrumbs items={breadcrumbs} tone="dark" className="mt-0 mb-13.5 text-[11px] tracking-[0.1em]" />

        <Box className="grid items-center gap-12 min-[961px]:grid-cols-[1.1fr_0.9fr] min-[961px]:gap-14">
          <Reveal>
            <RichHeading as="h1" heading={heading} className="text-paper" emphasisClassName="font-normal text-lime" />
            {description ? (
              <Text as="p" className="mt-5.5 max-w-[54ch] text-[18px] leading-[1.75] text-paper/72">
                {description}
              </Text>
            ) : null}
            <Box className="mt-8.5 flex flex-wrap gap-3">
              {primary_cta?.href ? (
                <CtaButton color="lime" arrow render={<a href={primary_cta.href} />}>
                  {primary_cta.label}
                </CtaButton>
              ) : null}
              {secondary_cta?.href ? (
                <CtaButton
                  variant="ghost"
                  arrow
                  render={<a href={secondary_cta.href} />}
                  className="border-paper/28 text-paper hover:border-lime hover:bg-transparent hover:text-lime"
                >
                  {secondary_cta.label}
                </CtaButton>
              ) : null}
            </Box>
          </Reveal>

          {library ? (
            <Reveal
              delay={1}
              className="relative rounded-[22px] border border-paper/12 bg-[linear-gradient(160deg,var(--color-navy-soft),var(--color-navy-deep))] px-6 pt-6.5 pb-11 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]"
            >
              <Box className="mb-1.5 flex items-baseline justify-between border-b border-paper/12 pb-4">
                <Text as="span" className="font-mono text-[10px] leading-none tracking-[0.2em] text-paper/50 uppercase">
                  {library.label}
                </Text>
                <Text as="span" className="font-display text-[30px] leading-none font-bold tracking-[-0.03em] text-lime">
                  {library.total}
                </Text>
              </Box>

              <Box as="ul" className="grid list-none gap-x-5.5 min-[481px]:grid-cols-2">
                {rows.map((type) => {
                  const Icon = RESOURCE_ICONS[type.key] ?? RESOURCE_ICONS.all;
                  return (
                    <Box as="li" key={type.key}>
                      <a
                        href={`#type-${type.key}`}
                        title={`Click Here to View ${type.label}`}
                        className="flex items-center gap-3 border-b border-paper/12 py-2.75 text-[14px] text-paper/72 transition-colors duration-200 hover:text-lime"
                      >
                        <Box className="grid size-7.5 flex-none place-items-center rounded-[9px] bg-lime/12 text-lime">
                          <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                        </Box>
                        {type.label}
                        <Text as="span" className="ml-auto font-mono text-[11px] leading-none text-paper/50">
                          {type.count}
                        </Text>
                      </a>
                    </Box>
                  );
                })}
              </Box>

              {library.badge ? (
                <Box className="absolute right-3 -bottom-5 rounded-2xl bg-lime px-4.25 py-3.25 text-navy shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] motion-safe:animate-bob min-[961px]:-right-4">
                  <Text as="span" className="mb-0.75 block font-mono text-[9.5px] leading-none font-medium tracking-[0.16em] text-navy uppercase">
                    {library.badge.label}
                  </Text>
                  <Text as="span" className="block font-display text-[15px] leading-[1.25] font-bold tracking-[-0.02em] text-navy">
                    {library.badge.text}
                  </Text>
                </Box>
              ) : null}
            </Reveal>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
