import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

export default function CoachingCta() {
  return (
    <Section className="bg-ink">
      <Box>
        <Box className="max-w-3xl">
          {/* Badge */}
          <Reveal>
            <Box className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              <Sparkles size={13} className="text-slate-900" />
              <span>COMING SOON</span>
            </Box>
          </Reveal>

          {/* Title */}
          <Reveal delay={1}>
            <Text
              as="h2"
              className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Team coaching on Meridian, coming{" "}
              <span className="font-serif italic font-normal text-lime">
                soon.
              </span>
            </Text>
          </Reveal>

          {/* Description */}
          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-5 text-base lg:text-lg leading-relaxed text-[#fafaf7b8] max-w-2xl"
            >
              Meridian already runs Edstellar’s individual coaching paths. Team
              sessions on Meridian are on the way. Until then, every team
              coaching session is facilitated live by a certified team coach.
            </Text>
          </Reveal>

          {/* Buttons */}
          <Reveal delay={3}>
            <Box className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary Button */}
              <Box
                as={Link}
                href="#contact"
                title="Book a coaching consultation"
                className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:bg-lime hover:shadow-lg no-underline"
              >
                <span>Book a coaching consultation</span>
                <ArrowRight size={16} />
              </Box>

              {/* Secondary Outline Button */}
              <Box
                as={Link}
                href="/meridian"
                title="Explore Meridian"
                className="inline-flex items-center rounded-full border border-slate-700 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-slate-500 hover:bg-slate-800/50 no-underline"
              >
                Explore Meridian
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Box>
    </Section>
  );
}