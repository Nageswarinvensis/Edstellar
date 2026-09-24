"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

/**
 * Blueprint's interactive body — the smallest client leaf. Layer 01 starts
 * open; `hiddenUntilFound` keeps every closed layer's copy in the server
 * HTML, so it stays crawlable and find-in-page can open it.
 *
 * Design: `.bp-acc`, `.bpb`, `.bp-n`, `.bpb-t`, `.bpb-pm`, `.bpb-d`.
 */
export default function LdBlueprintAccordion({ layers }) {
  if (!layers?.length) return null;

  return (
    <Accordion
      multiple
      hiddenUntilFound
      defaultValue={[layers[0].number]}
      className="mx-auto max-w-240 gap-3"
    >
      {layers.map((layer) => (
        <AccordionItem
          key={layer.number}
          value={layer.number}
          className="overflow-hidden rounded-xl border border-l-3 border-ink/12 border-l-navy bg-white"
        >
          {/* Base UI's Header renders the <h3>; the trigger inside it holds
              only phrasing content. */}
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              title={`Click Here to View ${layer.title}`}
              className="group/bp flex flex-1 cursor-pointer items-center gap-5 px-6 py-5 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy max-sm:gap-3.5"
            >
              <Text
                as="span"
                className="grid size-9 flex-none place-items-center rounded-[9px] bg-navy font-display text-[14px] leading-none font-bold text-lime"
              >
                {layer.number}
              </Text>

              <Box as="span" className="block min-w-0">
                <Text
                  as="span"
                  className="block font-display text-[16px] leading-[1.3] font-bold tracking-[-0.01em] text-ink"
                >
                  {layer.title}
                </Text>
                {layer.summary ? (
                  <Text as="span" className="block text-[13px] leading-[1.5] text-ink/60">
                    {layer.summary}
                  </Text>
                ) : null}
              </Box>

              <Box
                as="span"
                aria-hidden="true"
                className="relative ml-auto grid size-5 flex-none place-items-center"
              >
                <span className="absolute h-0.5 w-5 rounded-full bg-navy" />
                <span className="absolute h-5 w-0.5 rounded-full bg-navy transition-transform duration-200 group-aria-expanded/bp:scale-y-0 motion-reduce:transition-none" />
              </Box>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionContent className="pr-6 pb-5.5 pl-20 max-sm:pl-6">
            {layer.description ? (
              <Text
                as="p"
                className="mb-3 text-[13.5px] leading-[1.55] text-ink/60"
              >
                {layer.description}
              </Text>
            ) : null}
            {layer.points?.length ? (
              <Box as="ul" className="list-disc pl-4.5 marker:text-ink/40">
                {layer.points.map((point) => (
                  <Box
                    as="li"
                    key={point}
                    className="mb-1.5 text-[13px] leading-[1.5] text-ink"
                  >
                    {point}
                  </Box>
                ))}
              </Box>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
