import { X } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

/**
 * Under the pricing table: "Points to note" — the footnotes the plans'
 * superscript marks link to (`#points`) — beside the navy "What is not
 * included?" card.
 *
 * Design: corporate-training-pricing-v2 `.notes`, `.note`, `.box.not`.
 */
export default function PricingNotes({ notes, exclusions }) {
  if (!notes?.items?.length && !exclusions?.items?.length) return null;

  return (
    <Box id="points" className="mt-10 grid scroll-mt-28 gap-5 min-[901px]:grid-cols-[1.4fr_1fr]">
      {notes?.items?.length ? (
        <Reveal className="rounded-[18px] border border-ink/12 bg-white px-7 py-7.5">
          <Text as="p" className="mb-1.5 font-mono text-[10px] leading-[1.5] tracking-[0.2em] text-olive uppercase">
            {notes.label}
          </Text>
          {notes.items.map((note, index) => (
            <Box
              key={note.key}
              className={`grid grid-cols-[34px_1fr] gap-3 py-3.5 ${index > 0 ? "border-t border-ink/12" : ""}`}
            >
              <Text
                as="span"
                className="flex h-6 items-center justify-center rounded-lg bg-lime font-mono text-[11px] leading-none text-navy"
              >
                {note.key}
              </Text>
              <Box>
                {note.title ? (
                  <Text as="h4" className="text-[15px] leading-[1.4]">
                    {note.title}
                  </Text>
                ) : null}
                {note.points?.length ? (
                  <Box as="ul" className="mt-1 list-none">
                    {note.points.map((point) => (
                      <Box
                        as="li"
                        key={point}
                        className="relative pl-3.5 text-[14px] leading-[1.65] text-ink/60 before:absolute before:top-2.5 before:left-0 before:h-[1.5px] before:w-1.25 before:bg-olive before:content-['']"
                      >
                        {point}
                      </Box>
                    ))}
                  </Box>
                ) : null}
                {note.text ? (
                  <Text as="p" className="text-[14px] leading-[1.65]">
                    {note.text}
                  </Text>
                ) : null}
              </Box>
            </Box>
          ))}
        </Reveal>
      ) : null}

      {exclusions?.items?.length ? (
        <Reveal
          delay={1}
          className="relative overflow-hidden rounded-[18px] border border-navy bg-navy px-7 py-7.5 text-paper before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-lime before:content-['']"
        >
          <Text as="p" className="mb-1.5 font-mono text-[10px] leading-[1.5] tracking-[0.2em] text-lime uppercase">
            {exclusions.label}
          </Text>
          <Text as="h3" className="mb-3 text-[22px] leading-[1.2] text-paper">
            {exclusions.heading}
          </Text>
          <Box as="ul" className="list-none">
            {exclusions.items.map((item) => (
              <Box
                as="li"
                key={item}
                className="flex items-start gap-3.5 border-t border-paper/12 py-3.25 text-[14.5px] leading-[1.6] text-paper/72"
              >
                <Box
                  aria-hidden="true"
                  className="mt-px grid size-5.5 flex-none place-items-center rounded-full bg-paper/10 text-lime"
                >
                  <X size={12} strokeWidth={3} />
                </Box>
                {item}
              </Box>
            ))}
          </Box>
        </Reveal>
      ) : null}
    </Box>
  );
}
