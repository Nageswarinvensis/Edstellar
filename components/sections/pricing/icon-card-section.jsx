import {
  Award,
  CalendarCheck,
  CircleDollarSign,
  Clock,
  GraduationCap,
  LayoutGrid,
  Monitor,
  PenLine,
  Users,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_WIDTH, SECTION_PADDING } from "@/components/common/section-head";
import { cn } from "@/lib/utils";

const ICONS = {
  team: Users,
  clock: Clock,
  monitor: Monitor,
  cap: GraduationCap,
  pen: PenLine,
  award: Award,
  budget: CircleDollarSign,
  grid: LayoutGrid,
  calendar: CalendarCheck,
};

const COLUMNS = {
  3: "min-[561px]:grid-cols-2 min-[901px]:grid-cols-3",
  4: "min-[561px]:grid-cols-2 min-[1001px]:grid-cols-4",
};

/**
 * A warm band of icon cards under a section head — "What shapes your
 * training price" (3 across) and "Benefits" (4 across, with the lime
 * underline that draws in on hover).
 *
 * Design: corporate-training-pricing-v2 `#price-factors` `.shape`,
 * `#benefits` `.why`.
 */
export default function IconCardSection({ id, data, columns = 3, underline = false }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section
      id={id}
      className={cn("border-y border-ink/12 bg-paper-warm", SECTION_PADDING)}
      innerClassName={SECTION_WIDTH}
    >
      <SectionHead heading={data.heading} description={data.description} />

      <Box className={cn("grid gap-5", COLUMNS[columns] ?? COLUMNS[3])}>
        {items.map((item, index) => {
          const Icon = ICONS[item.icon] ?? LayoutGrid;
          return (
            <Reveal
              key={item.title}
              delay={Math.min((index % columns) + 1, 4)}
              className={cn(
                "relative overflow-hidden rounded-[18px] border border-ink/12 bg-white px-6.5 py-7 transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1 hover:border-ink/22 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.4)]",
                underline &&
                  "pt-7.5 after:absolute after:inset-x-0 after:bottom-0 after:h-0.75 after:origin-left after:scale-x-0 after:bg-lime after:transition-transform after:duration-300 after:content-[''] hover:-translate-y-1.5 hover:after:scale-x-100",
              )}
            >
              <Box className="mb-4.5 grid size-11 place-items-center rounded-xl bg-navy text-lime">
                <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
              </Box>
              <Text as="h3" className="mb-2 text-[18px] leading-[1.3] font-medium">
                {item.title}
              </Text>
              <Text as="p" className="text-[15px] leading-[1.7]">
                {item.text}
              </Text>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
