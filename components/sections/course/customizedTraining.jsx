import { Check } from "lucide-react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/shared/CtaButton";
import Reveal from "@/components/shared/reveal";
import Image from "next/image";

export default function CustomizedTraining({ data }) {
  if (!data) return null;

  return (
    <Box as="section" aria-label="Customized training" className="mt-10 lg:mt-14">
      <Box className="relative p-14 rounded-[18px] min-[901px]:py-14 max-[900px]:p-5 bg-navy min-[901px]:arc-rings grid grid-cols-1 items-center gap-8 min-[901px]:grid-cols-[0.92fr_1.08fr] min-[901px]:gap-13">
        <Box as="div" className="!absolute inset-0 !z-[-1] hidden min-[901px]:block">
          <Image
            src="/course/Custimized Training.webp"
            alt="Custimized Training"
            title="Custimized Training"
            fill
            className="object-cover rounded-[18px] "
          />
        </Box>
        <Reveal>
          <Box>
            <Text
              as="p"
              className="mb-3.5 font-mono text-[10px] tracking-[0.17em] text-lime uppercase"
            >
              {data.eyebrow}
            </Text>

            <Text
              as="h2"
              className="mb-3.5 font-display text-[clamp(26px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.03em] text-paper"
            >
              {data.title}
            </Text>

            <Text
              as="p"
              className="mb-6 max-w-[44ch] text-[15px] leading-[1.65] text-paper/70"
            >
              {data.description}
            </Text>

            {data.cta ? (
              <CtaButton color="lime" arrow render={<a href={data.cta.href} />}>
                {data.cta.label}
              </CtaButton>
            ) : null}
          </Box>
        </Reveal>

        <Reveal delay={1}>
          <Box as="ul" className="grid grid-cols-1 gap-3.25">
            {data.benefits?.map((benefit) => (
              <Box as="li" key={benefit} className="flex items-start gap-3">
                <Box className="mt-0.5 grid size-5.5 flex-none place-items-center rounded-full bg-lime/16 text-lime">
                  <Check size={12} strokeWidth={3} />
                </Box>

                <Text
                  as="span"
                  className="text-[15px] leading-normal text-paper"
                >
                  {benefit}
                </Text>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
