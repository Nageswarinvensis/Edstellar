import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import Reveal from "@/components/common/reveal";

/** Warm-sand CTA band between the sectors list and the "why" grid. */
export default function ClientsCtaBand({ data }) {
  if (!data) return null;

  return (
    <Section aria-labelledby="cta-h" className="bg-paper-warm">
      <Reveal>
        <Box className="flex flex-wrap items-center justify-between gap-8">
          <RichHeading
            as="h2"
            id="cta-h"
            heading={data.heading}
            className="m-0 max-w-[720px] text-[clamp(28px,3.4vw,38px)] font-medium leading-[1.1] tracking-[-0.03em] text-ink"
          />
          <Box className="flex flex-wrap gap-3">
            {data.actions?.map((action) => (
              <CtaButton
                key={action.label}
                variant={action.variant === "primary" ? "primary" : "secondary"}
                color="navy"
                arrow={Boolean(action.arrow)}
                render={<a href={action.href} />}
              >
                {action.label}
              </CtaButton>
            ))}
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
