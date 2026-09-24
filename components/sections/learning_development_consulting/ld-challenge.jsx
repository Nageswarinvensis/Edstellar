import {
  MessageCircle,
  Zap,
  Compass,
  Hourglass,
  Layers,
  ChartColumn,
  AlertCircle,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

const ICONS = {
  message: MessageCircle,
  zap: Zap,
  compass: Compass,
  hourglass: Hourglass,
  layers: Layers,
  chart: ChartColumn,
};

/**
 * "The cost of learning without a strategy" — centred heading and lede, a
 * navy stat band, then a three-up grid of problem cards, each tagged with
 * the part of the business it hits.
 *
 * Design: `#challenge`, `.ch-head`, `.ch-band`, `.ch-cards`, `.ch-card`,
 * `.ch-imp`.
 */
export default function LdChallenge({ data }) {
  if (!data?.cards?.length) return null;

  const { section_id, heading, description, stat, cards } = data;

  return (
    <Section id={section_id} className="border-t border-ink/12 bg-paper-warm">
      <Box className="mx-auto mb-6.5 max-w-[60ch] text-center">
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
              className="mx-auto text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      {stat ? (
        <Reveal delay={2}>
          <Box className="mx-auto mb-6.5 flex max-w-160 items-center justify-center gap-5 rounded-[14px] bg-navy px-7 py-5 max-[900px]:flex-col max-[900px]:gap-2.5 max-[900px]:text-center">
            <Text
              as="span"
              className="font-display text-[40px] leading-none font-bold text-lime"
            >
              {stat.value}
            </Text>
            <Text
              as="span"
              className="max-w-[38ch] text-[13px] leading-[1.5] text-paper/75"
            >
              {stat.label}
            </Text>
          </Box>
        </Reveal>
      ) : null}

      <Box className="grid grid-cols-3 gap-4.5 max-[900px]:grid-cols-1">
        {cards.map((card, index) => {
          const Icon = ICONS[card.icon] || AlertCircle;

          return (
            <Reveal key={card.title} delay={Math.min((index % 3) + 1, 4)}>
              <Box className="flex h-full flex-col rounded-[14px] border border-ink/12 bg-white p-6 transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0">
                <Box className="mb-4 grid size-11 place-items-center rounded-xl bg-lime-soft text-navy">
                  <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
                </Box>

                <Text
                  as="h3"
                  className="mb-1.75 text-[18px] leading-[1.3] tracking-[-0.01em]"
                >
                  {card.title}
                </Text>

                <Text
                  as="p"
                  className="mb-4.5 text-[14px] leading-[1.55] text-ink/60"
                >
                  {card.description}
                </Text>

                {card.impact ? (
                  <Text
                    as="span"
                    className="mt-auto self-start rounded-full bg-lime-soft px-3 py-1.25 font-mono text-[10px] leading-[1.4] tracking-[0.08em] text-navy uppercase"
                  >
                    {card.impact}
                  </Text>
                ) : null}
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
