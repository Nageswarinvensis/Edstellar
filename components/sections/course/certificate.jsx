import Image from "next/image";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";

export default function Certificate({ certificate }) {
  if (!certificate) return null;

  return (
    <Section
      id="certificate"
      className="scroll-mt-[calc(68px_+_var(--mobile-toc-h,0px)_+_16px)] border-t border-ink/10"
    >
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
              <Box className="relative aspect-[1080/764] overflow-hidden rounded-[11px] border border-lime/20">
                <Image
                  src="/course/Edstellar Sample Certificate.webp"
                  alt={certificate.certificateCard.title}
                  title={certificate.certificateCard.title}
                  fill
                  className="object-cover"
                />
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
