import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/shared/reveal";
import { CtaButton } from "@/components/shared/CtaButton";

/**
 * Closing CTA band for a course sub-section (curriculum, audience, delivery
 * modes, FAQ) — a lime-edged callout nudging toward the lead form.
 *
 * Design: `.sec-cta`.
 */
export default function SecCta({ title, description, cta }) {
  if (!title || !cta) return null;

  return (
    <Reveal delay={2}>
      <Box className="mt-9 flex flex-wrap items-center justify-between gap-5.5 rounded-r-2xl border border-ink/12 border-l-4 border-l-lime bg-paper-cream px-7 py-6 max-[620px]:flex-col max-[620px]:items-start max-[620px]:px-5.5 max-[620px]:py-5">
        <Box className="min-w-0 flex-1 basis-75 max-[620px]:basis-auto">
          <Text
            as="p"
            className="font-display text-[18.5px] leading-[1.28] font-bold tracking-[-0.025em] text-ink"
          >
            {title}
          </Text>
          {description ? (
            <Text
              as="p"
              className="mt-1.5 max-w-[58ch] text-[13.5px] leading-[1.6] text-ink/60"
            >
              {description}
            </Text>
          ) : null}
        </Box>

        <CtaButton
          arrow
          className="flex-none max-[620px]:w-full"
          render={<a href={cta.href} />}
        >
          {cta.label}
        </CtaButton>
      </Box>
    </Reveal>
  );
}
