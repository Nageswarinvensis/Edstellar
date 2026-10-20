import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import Breadcrumbs from "@/components/common/breadcrumbs";

/** Clients hero — headline, lede, two CTAs and a stat row on the left; a
 * four-column logo mosaic on the right. */
export default function ClientsHero({ data, breadcrumbs }) {
  if (!data) return null;

  return (
    <Section as="header" id="top" className="bg-paper">
      <Box className="grid items-center gap-14 max-lg:gap-10 lg:grid-cols-[1.05fr_1fr]">
        <Box>
          <RichHeading
            as="h1"
            heading={data.heading}
            className="m-0 text-[clamp(38px,4.4vw,48px)] leading-[1.05] tracking-[-0.035em] font-medium text-ink [&_span]:text-ink"
          />
          <Text as="p" className="mt-4 max-w-[640px] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
            {data.lede}
          </Text>

          <Box className="mt-7 flex flex-wrap gap-3">
            {data.actions?.map((action) => (
              <CtaButton
                key={action.label}
                variant={action.variant === "primary" ? "primary" : "secondary"}
                color="navy"
                arrow={Boolean(action.arrow)}
                render={<a href={action.href} />}
              >
                {action.label}
              </CtaButton>
            ))}
          </Box>

          <Box as="ul" className="mt-8 flex list-none flex-wrap gap-x-8 gap-y-2 border-t border-ink/12 pt-6">
            {data.facts?.map((fact) => (
              <Box as="li" key={fact.label} className="font-body text-sm text-ink-muted">
                <Text as="span" className="mr-2 font-display text-[22px] font-bold tracking-[-0.03em] text-ink">
                  {fact.value}
                </Text>
                {fact.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Logo mosaic — 12 tiles in four columns; on phones it drops to
            three columns and the last three tiles, matching the design. */}
        <Box as="ul" className="grid list-none grid-cols-4 gap-4 pb-6 max-md:grid-cols-2 max-sm:grid-cols-3 max-sm:gap-2 max-sm:pb-0 max-sm:[&>li:nth-child(n+10)]:hidden">
          {data.mosaic?.map((tile) => (
            <Box as="li" key={tile.name} className={tile.off ? "opacity-45" : undefined}>
              <Box className="flex h-full items-center justify-center rounded-[14px] border border-ink/12 bg-white p-4 shadow-rest max-sm:rounded-[10px] max-sm:p-2">
                <Image loading="eager"
                  src={tile.logo}
                  alt={tile.name}
                  width={160}
                  height={64}
                  className="h-16 w-full max-w-[160px] object-contain max-sm:h-8"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Breadcrumbs items={breadcrumbs} className="mt-8" />
    </Section>
  );
}
