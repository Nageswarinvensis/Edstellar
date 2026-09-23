import { Zap } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/*
 * The course's capability model: an eyebrow, a heading with a "Powered by"
 * badge beside it, and the numbered path of steps the program takes a team
 * through. Sits in the course hero, just above the proof bar.
 *
 * `data` is the CMS `CapabilityModel` component's `config`, read verbatim:
 *   { tag_line, heading, card: [{ title, description }] }
 * `heading` marks its italic phrase with `<span>`, like every heading here.
 * Step numbers come from each card's position, and the "Powered by" badge
 * is fixed copy — neither is sent by the CMS.
 */
const BADGE = "Powered by Edstellar";

export default function CapabilityModel({ data }) {
  if (!data?.card?.length) return null;

  return (
    <Box>
      <Reveal>
        <Box className="flex flex-wrap items-center justify-between gap-x-[22px] gap-y-3.5">
          <Box>
            <RichHeading
              heading={data.heading}
              className="m-0 max-w-[26ch] text-[clamp(22px,2.4vw,27px)] leading-[1.12] tracking-[-0.03em] hyphens-manual"
              emphasisClassName="font-bold"
            />
            {data.tag_line ? (
              <Text
                as="p"
                className="
              mb-0.8 inline-flex items-center gap-2.5 font-mono text-[10px] leading-normal tracking-[0.2em] text-ink/60 uppercase
            "
              >
                {data.tag_line}
              </Text>
            ) : null}
          </Box>
          <Text
            as="span"
            className="inline-flex flex-none items-center gap-2 rounded-full border border-ink/12 bg-white py-[7px] pr-[15px] pl-3 font-mono text-[10.5px] leading-[1.7] tracking-[0.14em] whitespace-nowrap text-ink/60 uppercase"
          >
            <Zap
              size={13}
              strokeWidth={0}
              fill="currentColor"
              aria-hidden="true"
              className="flex-none text-lime"
            />
            {BADGE}
          </Text>
        </Box>
      </Reveal>

      <Reveal delay={1}>
        <Box
          as="ol"
          className="
            mt-[22px] grid list-none grid-cols-5 gap-3.5 p-0
            max-[1141px]:mt-5 max-[1141px]:grid-cols-3 max-[821px]:grid-cols-2 max-[521px]:grid-cols-1
          "
        >
          {data.card.map((step, index) => (
            <Box
              as="li"
              key={step.title}
              className="
                relative flex flex-col overflow-hidden rounded-2xl border border-ink/12 bg-white px-[18px] pt-[22px] pb-5
                transition-[translate,box-shadow,border-color] duration-250
                hover:-translate-y-[5px] hover:border-ink/22 hover:shadow-[0_26px_54px_-30px_rgba(10,22,40,0.5)]
                motion-reduce:hover:translate-y-0
                before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-linear-to-r before:from-navy before:to-lime before:content-['']
              "
            >
              <Text
                as="span"
                aria-hidden="true"
                className="mb-3 font-display text-[26px] leading-none font-bold tracking-[-0.035em] text-ink"
              >
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Text
                as="h3"
                className="mb-2 text-[15.5px] leading-[1.25] font-[650] tracking-[-0.02em] hyphens-manual"
              >
                {step.title}
              </Text>
              <Text
                as="p"
                className="m-0 text-[13px] leading-[1.55] text-ink/60 hyphens-manual"
              >
                {step.description}
              </Text>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Box>
  );
}
