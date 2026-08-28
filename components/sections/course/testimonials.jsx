"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

function QuoteSlide({ item }) {
  return (
    <Box className="flex min-h-70 flex-col justify-center">
      <Text
        as="p"
        className="mb-6 font-serif text-[clamp(19px,2.2vw,27px)] leading-[1.38] tracking-[-0.01em] text-ink italic"
      >
        “{item.quote}”
      </Text>
      <Text
        as="p"
        className="font-mono text-[11px] tracking-[0.12em] text-ink/60 uppercase"
      >
        <b className="font-medium text-ink">{item.name}</b> · {item.role}
      </Text>
    </Box>
  );
}

function QuoteDots({ count }) {
  const { api } = useCarousel();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <Box className="flex gap-2.5">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          title={`Click Here to View Testimonial ${index + 1}`}
          aria-label={`Go to testimonial ${index + 1}`}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "h-1 w-8.5 cursor-pointer rounded-[4px] border-none transition-colors duration-300",
            selected === index ? "bg-navy" : "bg-ink/22",
          )}
        />
      ))}
    </Box>
  );
}

function QuoteArrows() {
  const { scrollPrev, scrollNext } = useCarousel();

  return (
    <Box className="ml-auto flex gap-2">
      <button
        type="button"
        title="Click Here to View Previous testimonial"
        aria-label="Previous testimonial"
        onClick={scrollPrev}
        className="flex size-10.5 cursor-pointer items-center justify-center rounded-full border border-ink/22 bg-transparent transition-colors duration-200 hover:border-navy hover:bg-navy hover:text-lime"
      >
        <ArrowLeft size={16} />
      </button>
      <button
        type="button"
        title="Click Here to View Next testimonial"
        aria-label="Next testimonial"
        onClick={scrollNext}
        className="flex size-10.5 cursor-pointer items-center justify-center rounded-full border border-ink/22 bg-transparent transition-colors duration-200 hover:border-navy hover:bg-navy hover:text-lime"
      >
        <ArrowRight size={16} />
      </button>
    </Box>
  );
}

/**
 * Course proof — a looping testimonial carousel built on the shared
 * `components/ui/carousel` (embla) primitive rather than a hand-rolled
 * slider, with a dot/arrow nav row driven by `useCarousel()`.
 *
 * Design: `section#proof`, `.container-narrow`, `.quote-stage`, `.q-nav`.
 */
export default function Testimonials({ testimonials }) {
  if (!testimonials?.items?.length) return null;

  const { heading, items } = testimonials;

  return (
    <Section
      id="results"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10"
    >
      <Box className="mx-auto max-w-230">
        <Reveal delay={1}>
          <Text
            as="h2"
            className="mb-9 max-w-[22ch] tracking-[-0.03em]"
            dangerouslySetInnerHTML={{ __html: heading || "" }}
          />
        </Reveal>

        <Reveal delay={2}>
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem key={index}>
                  <QuoteSlide item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <Box className="mt-7.5 flex items-center gap-2.5">
              <QuoteDots count={items.length} />
              <QuoteArrows />
            </Box>
          </Carousel>
        </Reveal>
      </Box>
    </Section>
  );
}
