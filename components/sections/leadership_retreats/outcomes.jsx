import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { RetreatIcon } from "@/components/sections/leadership_retreats/icons";
import { cn } from "@/lib/utils";

/**
 * "Leaders return with clarity, energy and a plan" — three outcome cards,
 * the last one navy.
 * Design: leadership-retreats `.o3-grid`, `.o3-c`, `.o3-c.hi`.
 */
export default function Outcomes({ data }) {
  return (
    <Section id="outcomes" aria-labelledby="oc-h" className="scroll-mt-32 bg-paper">
      <Reveal className="mx-auto mb-11 max-w-[62ch] text-center">
        <RichHeading as="h2" id="oc-h" heading={data.heading} className="mb-4" />
        <Text as="p" className="text-[clamp(16px,1.2vw,18px)] leading-[1.7]">
          {data.description}
        </Text>
      </Reveal>

      <Box className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {data.items.map((item, index) => (
          <Reveal key={item.title} delay={index + 1}>
            <Box
              as="article"
              className={cn(
                "h-full rounded-[16px] p-7.5",
                item.highlight
                  ? "bg-navy text-paper shadow-[0_8px_32px_rgba(10,22,40,0.12)]"
                  : "border border-ink/12 bg-white shadow-[0_1px_2px_rgba(10,22,40,0.07),0_4px_16px_rgba(10,22,40,0.07)]",
              )}
            >
              <Box
                as="span"
                aria-hidden="true"
                className={cn(
                  "mb-5 grid size-12 place-items-center rounded-full border",
                  item.highlight ? "border-gold text-gold" : "border-navy text-navy",
                )}
              >
                <RetreatIcon name={item.icon} size={18} />
              </Box>
              {/* The card's one-word theme is the italic serif accent — set on
                  an inner <em>, so the heading keeps the global weight and
                  the accent the global 400. */}
              <Text
                as="h3"
                className={cn(
                  "mb-5 border-b pb-5 text-[36px] leading-tight",
                  item.highlight ? "border-paper/15 text-gold" : "border-ink/12 text-ink",
                )}
              >
                <em className="font-serif font-normal italic">{item.title}</em>
              </Text>
              <Box as="ul" className="m-0 list-none p-0">
                {item.points.map((point, pointIndex) => (
                  <Box
                    as="li"
                    key={point.title}
                    className={cn(pointIndex > 0 && "mt-4 border-t pt-4", item.highlight ? "border-paper/15" : "border-ink/12")}
                  >
                    <Text as="span" className={cn("mb-1.5 block font-display text-[18px] font-semibold", item.highlight ? "text-paper" : "text-ink")}>
                      {point.title}
                    </Text>
                    <Text as="p" className={cn("text-[15px] leading-[1.6]", item.highlight && "text-paper/75")}>
                      {point.description}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
