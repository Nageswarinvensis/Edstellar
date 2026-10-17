import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/** "Explore our Latest Corporate Training Courses" — a wrap of course pills.
 * Design: case-study `[data-cmp="related-grid"]`, `.cchips`, `.cchip`. */
export default function CourseChips({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section aria-labelledby="courses-h" className="bg-paper-warm">
      <Reveal>
        <RichHeading as="h2" id="courses-h" heading={data.heading} className="mb-11 max-w-[62ch]" emphasisClassName="text-olive" />
      </Reveal>
      <Box as="ul" className="m-0 flex list-none flex-wrap gap-2.5 p-0">
        {data.items.map((item) => (
          <Box as="li" key={item.href}>
            <a
              href={item.href}
              title={`Click Here to View ${item.label}`}
              className="inline-block rounded-full border border-ink/12 bg-white px-4 py-2.5 font-body text-sm font-medium text-ink no-underline transition-[border-color,transform,box-shadow] duration-200 after:text-olive after:content-['_→'] hover:-translate-y-0.5 hover:border-navy hover:shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {item.label}
            </a>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
