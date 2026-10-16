import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_WIDTH, SECTION_PADDING } from "@/components/common/section-head";
import { cn } from "@/lib/utils";

/**
 * "Virtual or onsite training" — the two delivery modes side by side as
 * term/description lists (price, includes, best for, not included). The
 * `highlight` column (onsite) is the navy one.
 *
 * Design: corporate-training-pricing-v2 `#virtual-or-onsite`, `.vo`, `.vo-col`.
 */
export default function DeliveryCompare({ data }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section
      id="virtual-or-onsite"
      className={cn("border-y border-ink/12 bg-paper-warm", SECTION_PADDING)}
      innerClassName={SECTION_WIDTH}
    >
      <SectionHead heading={data.heading} />

      <Box className="grid gap-5 min-[861px]:grid-cols-2">
        {items.map((item, index) => {
          const dark = Boolean(item.highlight);
          return (
            <Reveal
              key={item.title}
              delay={index + 1}
              className={cn(
                "relative overflow-hidden rounded-[22px] border px-7.5 py-8",
                dark
                  ? "border-navy bg-navy text-paper before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-lime before:content-['']"
                  : "border-ink/12 bg-white",
              )}
            >
              <Text
                as="p"
                className={cn(
                  "mb-2 font-mono text-[10px] leading-[1.5] tracking-[0.2em] uppercase",
                  dark ? "text-lime" : "text-olive",
                )}
              >
                {item.label}
              </Text>
              <Text as="h3" className={cn("mb-4.5 text-[22px] leading-[1.2] tracking-[-0.025em]", dark && "text-paper")}>
                {item.title}
              </Text>
              <Box as="dl">
                {item.rows.map((row) => (
                  <Box
                    key={row.term}
                    className={cn(
                      "grid gap-1 border-t py-3.25 min-[481px]:grid-cols-[120px_1fr] min-[481px]:gap-3.5",
                      dark ? "border-paper/12" : "border-ink/12",
                    )}
                  >
                    <Box
                      as="dt"
                      className={cn(
                        "pt-0.75 font-mono text-[10.5px] leading-[1.5] tracking-[0.14em] uppercase",
                        dark ? "text-paper/50" : "text-ink/45",
                      )}
                    >
                      {row.term}
                    </Box>
                    <Box as="dd" className={cn("text-[15px] leading-[1.6]", dark ? "text-paper/72" : "text-ink/60")}>
                      {row.price ? (
                        <Text
                          as="span"
                          className={cn(
                            "font-display text-[20px] leading-[1.3] font-bold tracking-[-0.02em]",
                            dark ? "text-lime" : "text-ink",
                          )}
                        >
                          {row.price}
                        </Text>
                      ) : (
                        row.text
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
