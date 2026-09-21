import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";

export default function CtaTrainer({ trainer }) {
  const trainerFirstName = trainer.name.split(" ")[0];

  return (
    <Section id="contact" className="bg-[#070e1b]">
      <Box className="flex flex-col items-center text-center">
        {/* Section Heading */}
        <RichHeading
          heading={`Want ${trainerFirstName} for your <span>next program</span>?`}
          className="tracking-tight text-white"
          emphasisClassName="text-[18px] font-normal text-lime lg:text-[24px]"
        />

        {/* Subtitle */}
        <Text
          as="p"
          className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-paper"
        >
          Talk to an Edstellar consultant and we will confirm availability, delivery mode, and timezone for your team.
        </Text>

        {/* CTA Button with Arrow */}
        <Box className="mt-8 flex justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(217,249,157,0.3)]"
          >
            <span>Talk to Edstellar Consultant</span>
            <span className="text-base leading-none">→</span>
          </Link>
        </Box>
      </Box>
    </Section>
  );
}