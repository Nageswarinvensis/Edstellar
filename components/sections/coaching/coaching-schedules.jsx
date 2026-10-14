import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { coachingIcon } from "@/components/sections/coaching/icons";
import { cn } from "@/lib/utils";

/**
 * Built for real schedules — six ruled cells (icon, title, line), three per
 * row on desktop with hairline dividers between columns.
 *
 * Design: coaching-hub `#schedules`, `.sched`.
 */
export default function CoachingSchedules({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, items } = data;

  return (
    <Section id={section_id} className="bg-white">
      <Box className="mb-12 max-w-205 max-[600px]:mb-8">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-3 border-t border-ink/12 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        {items.map((item, index) => {
          const Icon = coachingIcon(item.icon);
          return (
            <Reveal
              as="article"
              key={item.title}
              delay={Math.min((index % 3) + 1, 4)}
              className={cn(
                "border-b border-ink/12 py-7 pr-7",
                // desktop: divider before columns 2 and 3
                index % 3 !== 0 && "min-[901px]:border-l min-[901px]:pl-7",
                // tablet: two columns, divider before the second
                "max-[900px]:p-6",
                index % 2 === 1 && "max-[900px]:border-l",
                "max-[600px]:border-l-0 max-[600px]:px-0",
              )}
            >
              {Icon ? <Icon size={28} strokeWidth={1.6} className="mb-4 text-navy" aria-hidden="true" /> : null}
              <Text as="h3" className="mb-2 text-[17px] leading-[1.3] font-semibold text-ink">
                {item.title}
              </Text>
              <Text as="p" className="m-0 text-[15px] leading-[1.65] text-ink/60">
                {item.description}
              </Text>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
