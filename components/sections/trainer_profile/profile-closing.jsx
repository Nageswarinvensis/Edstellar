import Link from "next/link";

import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";

/** "Want {name} for your Next Training?" — the navy band before the other
 * trainers. Design: amol-pune-india `.ctaband`. */
export function ProfileCta({ heading, button }) {
  return (
    <Section aria-labelledby="cta-h" className="bg-navy-deep text-center">
      <Reveal>
        <RichHeading as="h2" id="cta-h" heading={heading} className="mb-7 text-paper" emphasisClassName="text-lime" />
        <CtaButton arrow color="lime" render={<Link href={button.href} />}>
          {button.label}
        </CtaButton>
      </Reveal>
    </Section>
  );
}
