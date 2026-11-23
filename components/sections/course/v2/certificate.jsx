import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2Heading from "@/components/sections/course/v2/heading";

/**
 * v2 · 11 Certificate (the design's `#certificate`) — what participants
 * earn, beside the certificate in a navy frame.
 */
export default function V2Certificate({ data }) {
  if (!data) return null;
  const { heading, text, note, note_strong, image, image_alt, image_width, image_height } = data;

  return (
    <V2Section id="certificate">
      <Box className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <V2Heading parts={heading} className="max-w-[560px]" />
          {text && <Text className="mt-7 max-w-[530px] text-[15px] leading-7">{text}</Text>}
          {(note || note_strong) && (
            <Text className="mt-4 max-w-[530px] text-[14px] leading-5">
              {note_strong && <strong className="font-semibold text-ink">{note_strong}</strong>} {note}
            </Text>
          )}
        </Reveal>
        {image && (
          <Reveal delay={2} className="relative mx-auto w-full max-w-[460px] rounded-[15px] bg-navy p-3 shadow-[0_1px_2px_rgba(10,22,40,0.08)]">
            <Box className="relative overflow-hidden rounded-[11px] border border-lime/20">
              <Image src={image} alt={image_alt || ""} title={image_alt || undefined} loading="lazy" width={image_width || 1080} height={image_height || 764} className="block h-auto w-full" />
            </Box>
          </Reveal>
        )}
      </Box>
    </V2Section>
  );
}
