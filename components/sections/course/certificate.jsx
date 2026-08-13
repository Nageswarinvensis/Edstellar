import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";
import { Star } from "lucide-react";

export default function Certificate({ certificate }) {
  if (!certificate) return null;

  return (
    <Section id="certificate" className="border-t border-ink/10">
      <Box className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Left */}
        <Reveal delay={1}>
          <Box>
            <RichHeading
              as="h2"
              parts={certificate.title.parts}
              emphasisClassName="font-serif italic font-normal"
              className="max-w-140 tracking-[-0.04em]"
            />

            <Text
              as="p"
              className="mt-7 max-w-132.5 text-[15px] leading-7 text-ink/60"
            >
              {certificate.description}
            </Text>

            <Text
              as="p"
              className="mt-4 max-w-132.5 text-[14px] leading-5 text-ink/60"
            >
              <strong className="font-semibold text-ink">
                {certificate.highlight.title}
              </strong>{" "}
              {certificate.highlight.description}
            </Text>
          </Box>
        </Reveal>

        {/* Certificate Card */}
        <Reveal delay={2}>
          <Box className="relative mx-auto w-full max-w-115">
            <Box className="rounded-[15px] bg-navy p-3 shadow-sm">
              <Box className="flex min-h-78 flex-col items-center justify-center rounded-[11px] border border-lime/20 px-8 text-center">
                {/* Icon */}
                <Box className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-lime">
                  <Star
                    size={21}
                    strokeWidth={2}
                    fill="currentColor"
                    className="text-navy"
                  />
                </Box>

                {/* Certificate title */}
                <Text
                  as="h3"
                  className="font-serif text-xl leading-snug font-normal text-paper italic"
                >
                  {certificate.certificateCard.title}
                </Text>

                {/* Subtitle */}
                <Text
                  as="p"
                  className="mt-3 text-[8px] tracking-[0.28em] text-paper/50 uppercase"
                >
                  {certificate.certificateCard.subtitle}
                </Text>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
