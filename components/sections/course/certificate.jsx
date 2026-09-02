import Image from "next/image";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * Static, not CMS-driven — the certificate is the same for every course, so
 * there is nothing here for a course record to model.
 */
const CONTENT = {
  heading: "Certificate of <span>Training Completion</span>.",
  description:
    "On successful completion, employees receive an Edstellar course completion certificate, recognizing their commitment to ongoing learning and professional development. It validates the skills they have built and motivates them to keep growing and contribute to organizational success.",
  highlight: {
    title: "Earned, not attended.",
    description:
      "Awarded on completion of all hands-on labs and the capstone project.",
  },
  certificate_card: {
    title: "Edstellar Certificate of Completion",
  },
};

export default function Certificate() {
  const certificate = CONTENT;

  return (
    <Section
      id="certificate"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10"
    >
      <Box className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Left */}
        <Reveal delay={1}>
          <Box>
            <RichHeading heading={certificate.heading} className="max-w-140" />

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
                  alt={certificate.certificate_card?.title}
                  title={certificate.certificate_card?.title}
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
