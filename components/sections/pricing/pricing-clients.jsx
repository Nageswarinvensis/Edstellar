"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUp } from "lucide-react";

import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";
import { cn } from "@/lib/utils";
import { SECTION_WIDTH } from "@/components/common/section-head";

/**
 * "Globally trusted by clientele" — a grid of client logo tiles. The first
 * `visible_count` show; View More reveals the rest. Every logo is in the
 * HTML from the start (the extra ones are only hidden), so the full client
 * list is crawlable.
 *
 * Design: corporate-training-pricing-v2 `.clients`, `.logo-grid`, `.toggle`.
 */
export default function PricingClients({ data }) {
  const [open, setOpen] = useState(false);
  const gridRef = useRef(null);
  const gridId = useId();

  const logos = data?.logos ?? [];
  if (!logos.length) return null;

  const visible = data.visible_count ?? logos.length;
  const hasMore = logos.length > visible;

  function toggle() {
    setOpen((value) => !value);
    if (open) gridRef.current?.scrollIntoView({ block: "center" });
  }

  return (
    <Section
      aria-label="Our clients"
      className="border-y border-ink/12 bg-paper-warm py-18"
      innerClassName={SECTION_WIDTH}
    >
      <Reveal>
        <RichHeading
          as="h2"
          heading={data.heading}
          className="mx-auto mb-10 max-w-200 text-center"
          emphasisClassName="font-normal"
        />
      </Reveal>

      <Reveal>
        <Box
          as="ul"
          id={gridId}
          ref={gridRef}
          className="grid list-none grid-cols-2 gap-3.5 min-[561px]:grid-cols-4 min-[1001px]:grid-cols-6"
        >
          {logos.map((logo, index) => (
            <Box
              as="li"
              key={logo.src}
              className={cn(
                "h-21.5 items-center justify-center rounded-[14px] border border-ink/12 bg-white px-4.5 py-3.5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ink/22",
                index < visible || open ? "flex" : "hidden",
              )}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                title={logo.alt.split(":")[0].trim()}
                width={160}
                height={46}
                loading="lazy"
                sizes="160px"
                className="h-auto max-h-11.5 w-auto object-contain"
              />
            </Box>
          ))}
        </Box>
      </Reveal>

      {hasMore ? (
        <Box className="mt-8 flex justify-center">
          <CtaButton
            variant="ghost"
            aria-expanded={open}
            aria-controls={gridId}
            onClick={toggle}
          >
            {open ? data.less_label : data.more_label}
            {open ? (
              <ArrowUp size={16} strokeWidth={2.25} aria-hidden="true" />
            ) : (
              <ArrowDown size={16} strokeWidth={2.25} aria-hidden="true" />
            )}
          </CtaButton>
        </Box>
      ) : null}
    </Section>
  );
}
