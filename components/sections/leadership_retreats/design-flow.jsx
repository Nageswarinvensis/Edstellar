import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { RetreatIcon } from "@/components/sections/leadership_retreats/icons";
import { cn } from "@/lib/utils";

/** One column of the flow — "Your brief" (dark rows) or "Your retreat" (light). */
function FlowColumn({ column, light }) {
  return (
    <Reveal>
      <Text as="h3" className="mb-4 flex items-center gap-2.5 text-[19px] leading-tight text-paper">
        <RetreatIcon name={column.icon} size={17} className="text-gold" />
        {column.title}
      </Text>
      <Box as="ul" className="m-0 flex list-none flex-col gap-2 p-0">
        {column.items.map((item) => (
          <Box
            as="li"
            key={item.title}
            className={cn(
              "flex items-center gap-4 rounded-[10px] border px-4.5 py-3.5",
              light ? "border-white bg-white text-ink" : "border-paper/12 bg-navy-soft text-paper",
            )}
          >
            <RetreatIcon name={item.icon} size={17} className={light ? "text-navy" : "text-gold"} />
            <Box>
              <Text as="span" className={cn("block text-[15px] font-semibold", light ? "text-ink" : "text-paper")}>
                {item.title}
              </Text>
              <Text as="span" className={cn("block text-[13.5px]", light ? "text-ink-muted" : "text-paper/70")}>
                {item.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Reveal>
  );
}

/** Where each step pill sits on the ring: left, top, bottom, right. */
const STEP_POSITIONS = [
  "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-1/2 left-full -translate-x-1/2 -translate-y-1/2",
];

/**
 * "Every retreat is designed around its leaders" — the leaders' brief on the
 * left, Edstellar's four curation steps on a ring in the middle, the retreat
 * it produces on the right.
 * Design: leadership-retreats `.p4-grid`, `.p4-col`, `.p4-lens`, `.p4-ring`.
 */
export default function DesignFlow({ data }) {
  return (
    <Section id="days" aria-labelledby="days-h" className="scroll-mt-32 bg-navy">
      <Reveal className="mb-10 max-w-[62ch]">
        <RichHeading as="h2" id="days-h" heading={data.heading} className="mb-4 text-paper" emphasisClassName="text-gold" />
        <Text as="p" className="text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/75">
          {data.description}
        </Text>
      </Reveal>

      <Box className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        <FlowColumn column={data.brief} />

        <Reveal delay={1} className="flex justify-center py-6">
          <Box
            role="img"
            aria-label={`Edstellar curates in four steps: ${data.steps.join(", ").toLowerCase()}`}
            className="relative size-60 rounded-full border border-dashed border-gold/60"
          >
            {data.steps.map((step, index) => (
              <Text
                as="span"
                key={step}
                aria-hidden="true"
                className={cn(
                  "absolute flex items-center gap-2 rounded-full border border-paper/25 bg-navy px-2.5 py-1.5 text-[13.5px] font-medium whitespace-nowrap text-paper",
                  STEP_POSITIONS[index],
                )}
              >
                <Text as="span" className="grid size-5 place-items-center rounded-full bg-gold text-[11px] font-semibold text-navy">
                  {index + 1}
                </Text>
                {step}
              </Text>
            ))}
            <Box
              aria-hidden="true"
              className="absolute inset-12 grid place-items-center rounded-full bg-gold text-center ring-8 ring-navy-soft"
            >
              <Box>
                <Text as="span" className="block font-display text-[22px] leading-tight font-semibold text-navy">
                  {data.core.title}
                </Text>
                <Text as="span" className="block font-serif text-[18px] text-navy/80 italic">
                  {data.core.subtitle}
                </Text>
              </Box>
            </Box>
          </Box>
        </Reveal>

        <FlowColumn column={data.retreat} light />
      </Box>

      <Reveal>
        <Text as="p" className="mt-8 text-center text-[14px] text-paper/70">
          {data.footnote}
        </Text>
      </Reveal>
    </Section>
  );
}
