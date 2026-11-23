import Image from "next/image";
import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2Heading from "@/components/sections/course/v2/heading";
import V2ScrollLink from "@/components/sections/course/v2/scroll-link";
import { V2_BUTTON, V2ButtonArrow } from "@/components/sections/course/v2/buttons";

/**
 * v2 · Customized training — the live course page's "Enterprise Training
 * Solutions Customized for Your Company" band, in the v2 design: a navy panel
 * with the heading, a line and the quote button on the left, the benefit
 * list on the right. A separate component from the old
 * `course/customized-training.jsx`, which stays untouched.
 *
 * `data` = `{ heading, text, cta: { label, href, title }, items }` — text
 * only. The background image is fixed here, as on the live section, so the
 * CMS never has to send it.
 */
const BACKGROUND = { src: "/course/custimized-training.webp", alt: "Customized corporate training solutions" };

export default function V2Customized({ data }) {
  if (!data?.items?.length) return null;
  const { heading, text, cta, items } = data;

  return (
    <V2Section id="customized" aria-label="Customized training">
      <Box className="relative isolate grid items-center gap-8 overflow-hidden rounded-[18px] bg-navy p-6 sm:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-13 lg:p-14">
        <Box className="absolute inset-0 -z-10 hidden lg:block">
          <Image src={BACKGROUND.src} alt={BACKGROUND.alt} title={BACKGROUND.alt} fill sizes="1280px" loading="lazy" className="object-cover" />
        </Box>
        <Reveal>
          <V2Heading parts={heading} className="mb-3.5 text-white" emClassName="text-lime" />
          {text && <Text className="mb-6 max-w-[44ch] text-[15px] leading-[1.65] text-white/75">{text}</Text>}
          {cta?.label && (
            <V2ScrollLink href={cta.href || "#quote"} topic={cta.label} title={cta.title || `Click here to ${cta.label}`} className={V2_BUTTON.lime}>
              {cta.label}
              <V2ButtonArrow />
            </V2ScrollLink>
          )}
        </Reveal>
        <Reveal delay={1}>
          <Box as="ul" className="grid gap-3.25">
            {items.map((item) => (
              <Box as="li" key={item} className="flex items-start gap-3">
                <Box className="mt-0.5 grid size-5.5 flex-none place-items-center rounded-full bg-lime/16 text-lime">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </Box>
                <Text as="span" className="text-[15px] leading-normal text-white">
                  {item}
                </Text>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </V2Section>
  );
}
