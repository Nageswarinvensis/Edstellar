import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * "More Corporate Training Programs" — a grid of course link cards, each
 * with an arrow. Link styles sit once on the list (`[&_a]:…`) rather than on
 * every card.
 * Design: amol-pune-india `#programs`, `.course-list`.
 */
export default function ProgramLinks({ heading, items }) {
  if (!items?.length) return null;

  return (
    <Section id="programs" aria-labelledby="prog-h" className="bg-paper-warm">
      <Reveal className="mb-9">
        <RichHeading as="h2" id="prog-h" heading={heading} />
      </Reveal>
      <Box
        as="ul"
        className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-2.5 p-0 [&_a]:flex [&_a]:h-full [&_a]:items-center [&_a]:justify-between [&_a]:gap-3 [&_a]:rounded-xl [&_a]:border [&_a]:border-ink/12 [&_a]:bg-white [&_a]:px-4.5 [&_a]:py-3.5 [&_a]:font-body [&_a]:text-[14.5px] [&_a]:leading-[1.35] [&_a]:font-semibold [&_a]:text-ink [&_a]:transition-[border-color,transform] [&_a]:duration-200 [&_a:hover]:-translate-y-0.5 [&_a:hover]:border-navy [&_svg]:flex-none [&_svg]:text-ink-muted"
      >
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href}>
              {item.label}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </li>
        ))}
      </Box>
    </Section>
  );
}
