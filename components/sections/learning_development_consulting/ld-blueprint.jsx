import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * The learning strategy blueprint — five layers on a vertical track, each a
 * numbered node beside a card: title, a "You get:" deliverable pill, a
 * one-line lead and topic chips. A "foundation up" marker closes the track.
 * Static, so it stays a Server Component.
 *
 * Design: `learning-strategy-design (48).html` → `#blueprint`, `.bt`,
 * `.bt-row`, `.bt-node`, `.bt-card`, `.bt-found`.
 */
export default function LdBlueprint({ data }) {
  if (!data?.layers?.length) return null;

  const {
    section_id,
    heading,
    description,
    deliverable_label,
    foundation_label,
    layers,
  } = data;

  return (
    <Section id={section_id} className="border-t border-ink/12 bg-paper">
      <Box className="mx-auto max-w-230">
        <Box className="mb-11 max-w-[62ch]">
          <Reveal>
            <RichHeading
              heading={heading}
              className="mb-4"
              emphasisClassName="font-normal"
            />
          </Reveal>
          {description ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}
        </Box>

        {/* The track: a line behind the nodes, from the first to the marker. */}
        <Box className="relative before:absolute before:top-5.5 before:bottom-15 before:left-6.75 before:z-0 before:w-0.5 before:bg-ink/22 max-[640px]:before:left-4.75">
          {layers.map((layer, index) => (
            <Reveal key={layer.number} delay={Math.min(index + 1, 4)}>
              <Box className="relative z-1 mb-3.5 grid grid-cols-[56px_1fr] items-start gap-5 max-[640px]:grid-cols-[40px_1fr] max-[640px]:gap-3.5">
                <Box className="flex size-14 items-center justify-center rounded-[14px] bg-navy font-display text-[19px] font-bold text-lime shadow-[0_6px_16px_-8px_rgba(10,22,40,0.5)] max-[640px]:size-10 max-[640px]:text-[15px]">
                  {layer.number}
                </Box>

                <Box className="rounded-[14px] border border-ink/12 bg-white px-6 py-5 shadow-[0_1px_2px_rgba(10,22,40,0.04),0_14px_30px_-26px_rgba(10,22,40,0.4)]">
                  <Box className="flex flex-wrap items-baseline justify-between gap-4">
                    <Text
                      as="h3"
                      className="font-display text-[19px] leading-[1.3] font-bold tracking-[-0.01em] text-ink"
                    >
                      {layer.title}
                    </Text>
                    {layer.deliverable ? (
                      <Text
                        as="span"
                        className="inline-flex flex-none items-center gap-2 rounded-full bg-lime-soft px-3.5 py-1.5 text-[12.5px] leading-normal text-navy"
                      >
                        <Text
                          as="span"
                          className="text-[12.5px] leading-normal font-bold text-navy"
                        >
                          {deliverable_label}
                        </Text>
                        {layer.deliverable}
                      </Text>
                    ) : null}
                  </Box>

                  <Text
                    as="p"
                    className="mt-1.5 mb-3.5 text-[14.5px] leading-[1.55] text-ink/60"
                  >
                    {layer.description}
                  </Text>

                  {layer.points?.length ? (
                    <Box as="ul" className="flex flex-wrap gap-2">
                      {layer.points.map((point) => (
                        <Box
                          as="li"
                          key={point}
                          className="rounded-full border border-ink/12 bg-paper-warm px-3 py-1.25 font-mono text-[11px] tracking-[0.02em] text-ink"
                        >
                          {point}
                        </Box>
                      ))}
                    </Box>
                  ) : null}
                </Box>
              </Box>
            </Reveal>
          ))}

          {foundation_label ? (
            <Box className="relative z-1 grid grid-cols-[56px_1fr] items-center gap-5 max-[640px]:grid-cols-[40px_1fr] max-[640px]:gap-3.5">
              <Box
                aria-hidden="true"
                className="flex h-5 w-14 items-center justify-center max-[640px]:w-10"
              >
                <span className="size-3.5 -rotate-45 rounded-bl-[3px] border-b-2 border-l-2 border-ink/22" />
              </Box>
              <Text
                as="span"
                className="justify-self-start rounded-full bg-lime-soft px-4 py-2 font-mono text-[10px] leading-normal tracking-[0.1em] text-navy uppercase"
              >
                {foundation_label}
              </Text>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Section>
  );
}
