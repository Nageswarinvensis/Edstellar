"use client";

import * as React from "react";
import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from "@/components/ui/carousel";

function ProgressBars({ count }) {
  const { api } = useCarousel();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const updateIndex = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    updateIndex();

    api.on("select", updateIndex);

    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => api?.scrollTo(index)}
          title={`Click Here to View Slide ${index + 1}`}
          aria-label={`Go to slide ${index + 1}`}
          className={[
            "h-1 w-8 rounded-full transition-all duration-300",
            index === selectedIndex
              ? "bg-[#07162C]"
              : "bg-[#07162C]/20",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export default function SlideSection({ data }) {
  if (!data) return null;

  return (
    <Section id="results" className="border-t border-ink/10">
      <Box className="mx-auto max-w-225">

       <Reveal delay={0}>
        <Text as="h2" className="mb-10 max-w-180">
          {data.heading?.parts
            ? data.heading.parts.map((p, i) =>
                (p.is_italic || p.em) ? <em key={i} className="font-serif font-normal italic">{p.text}</em> : p.text
              )
            : (typeof data.heading === "string" ? data.heading : "").split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, i) => {
                const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
                return match ? <em key={i} className="font-serif font-normal italic">{match[1]}</em> : fragment;
              })
          }
        </Text>
        </Reveal>

        {/* CAROUSEL */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
        <Reveal delay={1}>
          <CarouselContent>
            {data.items?.map((item) => (
              <CarouselItem key={item.id}>

                {/* QUOTE */}
                <Text
                  as="blockquote"
                  className="max-w-211 font-serif text-[22px] italic leading-[1.65] text-[#07162C]"
                >
                  “{item.quote}”
                </Text>

                {/* PERSON */}
                <Box className="mt-7 flex items-center gap-4">
                  {item.image && (
                    <Box className="relative size-12 overflow-hidden rounded-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </Box>
                  )}

                  <Box>
                    <Text
                      as="p"
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#07162C]"
                    >
                      {item.name}
                    </Text>

                    <Text
                      as="p"
                      className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#07162C]/55"
                    >
                      {item.role}
                    </Text>
                  </Box>
                </Box>

              </CarouselItem>
            ))}
          </CarouselContent>
        </Reveal>

          {/* BOTTOM CONTROLS */}
          <Reveal delay={2}>
          <Box className="mt-20 flex items-center justify-between">

            {/* PROGRESS BARS */}
            <ProgressBars count={data.items?.length || 0} />

            {/* PREVIOUS / NEXT */}
            <Box className="flex items-center gap-2">

              <CarouselPrevious
                className="static translate-y-0 size-10.5 rounded-full border-[#07162C]/20 bg-transparent text-[#07162C] hover:bg-[#07162C]/5 [&_svg]:size-3
                "
              />

              <CarouselNext
                className="static translate-y-0 size-10.5 rounded-full border-[#07162C]/20 bg-transparent text-[#07162C] hover:bg-[#07162C]/5 [&_svg]:size-3
                "
              />

            </Box>
          </Box>
          </Reveal>
        </Carousel>

      </Box>
    </Section>
  );
}