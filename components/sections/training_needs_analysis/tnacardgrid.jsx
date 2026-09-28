import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

// The design breaks to 2 columns at 600px and to the full count at 900px, not at Tailwind's defaults.
const GRID_COLUMNS = {
  3: "min-[601px]:grid-cols-2 min-[901px]:grid-cols-3",
  4: "min-[601px]:grid-cols-2 min-[901px]:grid-cols-4",
};

const BACKGROUNDS = {
  paper: "bg-paper",
  warm: "bg-paper-warm",
};

/** Heading, lede and a grid of plain title/description cards (the design's `.card` grid). */
export default function TnaCardGrid({ id, data, columns = 4, background = "paper" }) {
  if (!data) return null;

  const { heading, description, items } = data;

  return (
    <Section id={id} className={cn("border-t border-ink/12", BACKGROUNDS[background])}>
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          <RichHeading
            heading={heading}
            className="text-[clamp(32px,4vw,40px)] leading-[1.08] hyphens-none"
            emphasisClassName="font-normal"
          />
        </Reveal>

        {description && (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60 hyphens-none"
            >
              {description}
            </Text>
          </Reveal>
        )}
      </Box>

      <Box className={cn("grid grid-cols-1 gap-5", GRID_COLUMNS[columns] || GRID_COLUMNS[4])}>
        {items?.map((item, index) => (
          <Reveal key={item.title} delay={Math.min(index + 2, 4)}>
            <Box className="h-full rounded-[14px] border border-ink/12 bg-white p-7">
              <Text
                as="h3"
                className="mb-2.5 font-display text-[16px] leading-[1.3] font-bold tracking-[-0.01em] text-ink hyphens-none"
              >
                {item.title}
              </Text>

              <Text as="p" className="text-[15px] leading-[1.7] text-ink/60 hyphens-none">
                {item.description}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
