import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { CtaButton } from "@/components/common/cta-button";
import { RetreatIcon, SEAT_CLASSES, SEAT_SVG_CLASSES } from "@/components/sections/leadership_retreats/icons";
import { cn } from "@/lib/utils";

/** Seat centres on a circle in a 100×100 viewBox, clockwise from the top. */
function seatPosition(index, total) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return { cx: 50 + 41 * Math.cos(angle), cy: 50 + 41 * Math.sin(angle) };
}

/** "Who is at the table" — attendee seats ringed round a navy table. An SVG,
 * so seat positions are plain attributes rather than inline styles. */
function SeatingTable({ table }) {
  return (
    <Box aria-label={table.aria_label} role="img" className="mx-auto w-full max-w-110">
      <Box className="relative aspect-square">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
          <circle cx="50" cy="50" r="41" fill="none" strokeDasharray="0.6 1.6" strokeWidth="0.25" className="stroke-navy/30" />
          {table.seats.map((seat, index) => {
            const { cx, cy } = seatPosition(index, table.seats.length);
            return (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r="2.6"
                strokeWidth="0.45"
                className={SEAT_SVG_CLASSES[seat]}
              />
            );
          })}
        </svg>

        <Box className="absolute inset-[19%] grid place-items-center rounded-full bg-navy p-6 text-center shadow-[0_24px_60px_-24px_rgba(10,22,40,0.55)] before:absolute before:inset-2.5 before:rounded-full before:border before:border-gold/60 before:content-['']">
          <Box className="relative">
            <Text as="span" className="block font-display text-[clamp(17px,1.9vw,24px)] leading-tight font-semibold tracking-[-0.02em] text-paper">
              {table.title}
            </Text>
            <Text as="span" className="mt-2.5 block text-[15px] font-semibold text-gold">
              {table.subtitle}
            </Text>
            <Text as="span" className="mt-1.5 block text-[12.5px] text-paper/75">
              {table.note}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box as="ul" className="mt-6 flex list-none flex-wrap justify-center gap-x-4 gap-y-2 p-0">
        {table.legend.map((item) => (
          <Box as="li" key={item.key} className="flex items-center gap-1.5 text-[13px] text-ink-muted">
            <Box as="span" aria-hidden="true" className={cn("size-3 rounded-full border-2", SEAT_CLASSES[item.key])} />
            {item.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/**
 * Hero — kicker, heading, lede, two CTAs, the four fact chips and the
 * breadcrumb on the left; the seating illustration on the right.
 * Design: leadership-retreats `.hE`, `.hE-facts`, `.table-wrap`, `.table-key`.
 */
export default function RetreatHero({ data, breadcrumbs }) {
  return (
    <Section className="bg-paper">
      <Box className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Box>
          <Reveal>
            <Text as="p" className="mb-4 text-[15px] font-medium text-ink/70">
              {data.kicker}
            </Text>
            <RichHeading as="h1" heading={data.heading} className="max-w-[20ch]" />
          </Reveal>

          <Reveal delay={1}>
            <Text as="p" className="mt-6 max-w-[58ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7]">
              {data.description}
            </Text>
          </Reveal>

          <Reveal delay={2} className="mt-8 flex flex-wrap gap-3">
            <CtaButton arrow render={<a href={data.primary_cta.href} />} className="text-gold">
              {data.primary_cta.label}
            </CtaButton>
            <CtaButton arrow variant="ghost" render={<a href={data.secondary_cta.href} />} className="border-navy">
              {data.secondary_cta.label}
            </CtaButton>
          </Reveal>

          <Reveal delay={3}>
            <Box as="ul" className="mt-7 flex list-none flex-wrap gap-2 p-0">
              {data.facts.map((fact) => (
                <Box
                  as="li"
                  key={fact.label}
                  className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-2 text-[13.5px] font-medium text-ink"
                >
                  <RetreatIcon name={fact.icon} size={14} />
                  {fact.label}
                </Box>
              ))}
            </Box>
            <Breadcrumbs items={breadcrumbs} className="mt-10" />
          </Reveal>
        </Box>

        <Reveal delay={1}>
          <SeatingTable table={data.table} />
        </Reveal>
      </Box>
    </Section>
  );
}
