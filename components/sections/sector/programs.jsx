import Image from "next/image";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/common/section-head";
import { CtaButton } from "@/components/common/cta-button";
import ProgramCatalog from "./program-catalog";

/** One course in a program's catalog pop-up: name, duration + delivery, blurb. */
function CatalogCourse({ course, deliveryLabel }) {
  return (
    <Box className="rounded-xl border border-ink/12 bg-paper px-4 py-3.5">
      <Text
        as="h4"
        className="mb-1.5 text-[15px] leading-[1.3] font-semibold tracking-normal text-navy"
      >
        {course.name}
      </Text>
      <Box className="mb-1.5 flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[10.5px] leading-[1.4] tracking-[0.06em] text-ink-muted">
        <Text as="span" className="font-mono text-[10.5px] leading-[1.4] text-inherit">
          {course.duration}
        </Text>
        {deliveryLabel ? (
          <Text as="span" className="font-mono text-[10.5px] leading-[1.4] text-inherit">
            {deliveryLabel}
          </Text>
        ) : null}
      </Box>
      <Text as="p" className="text-[13.5px] leading-[1.55]">
        {course.description}
      </Text>
    </Box>
  );
}

/**
 * The sector's skill-development programs: a 3-up grid of photo cards, each
 * with its course count and a "View Catalog" button that opens the program's
 * course list in a pop-up. The course lists are rendered here, on the server,
 * and handed to the `ProgramCatalog` client leaf as children — so all of them
 * are in the HTML. The pop-up's "Enquire Now" goes to the sector's program
 * enquiry page with the program's slug (`item.enquiry_href`).
 *
 * `data`: `section_id`, `heading` (emphasis in `<span>`), `description`,
 * `delivery_label`, `enquire_label`, `items` `{ slug, title, description,
 * course_count, image, catalog_label, catalog_title, enquiry_href,
 * courses: { name, duration, description }[] }[]`.
 *
 * Design: government-employees-training-courses / training-for-universities
 * `[data-cmp="related-grid"]` `.grid.g3`, `.rel.prog`, `.prog-img`, `.prog-n`,
 * `.prog-btn`; `[data-cmp="sample-modal"]` `.cat-grid`, `.cat-c`, `.cat-m`,
 * `.cat-foot`.
 */
export default function Programs({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, delivery_label, enquire_label, items } = data;

  return (
    <Section id={section_id} className="scroll-mt-20 bg-paper">
      <SectionHead heading={heading} description={description} align="start" />

      <Box className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const titleId = `catalog-${item.slug}`;

          return (
            <Reveal key={item.slug} delay={(index % 3) + 1} className="h-full">
              <Box
                as="article"
                className="flex h-full flex-col overflow-hidden rounded-[14px] border border-ink/12 bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-0.75 hover:shadow-lift"
              >
                {item.image?.src ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="mb-4.5 aspect-[558/221] w-full object-cover"
                  />
                ) : null}

                <Box className="flex flex-1 flex-col px-5.5 pb-5.5">
                  <Text
                    as="h3"
                    className="mb-1.5 text-[16px] leading-[1.3] tracking-[-0.01em]"
                  >
                    {item.title}
                  </Text>
                  <Text as="p" className="text-[14px] leading-[1.6]">
                    {item.description}
                  </Text>
                  <Text
                    as="span"
                    className="mt-3 mb-4.5 self-start rounded-full bg-lime/25 px-2.75 py-1.25 font-mono text-[10.5px] leading-[1.3] tracking-[0.12em] text-olive uppercase"
                  >
                    {item.course_count}
                  </Text>

                  <Box className="mt-auto">
                    <ProgramCatalog
                      label={item.catalog_label}
                     
                      titleId={titleId}
                    >
                      <Text
                        as="h3"
                        id={titleId}
                        className="mb-4.5 pr-10 text-[22px] leading-[1.2] tracking-normal text-navy"
                      >
                        {item.catalog_title}
                      </Text>
                      <Box
                        data-scroll=""
                        className="grid min-h-0 flex-1 gap-3 overflow-auto pr-1 sm:grid-cols-2"
                      >
                        {item.courses.map((course, courseIndex) => (
                          <CatalogCourse
                            key={`${course.name}-${courseIndex}`}
                            course={course}
                            deliveryLabel={delivery_label}
                          />
                        ))}
                      </Box>
                      {item.enquiry_href ? (
                        <Box className="flex justify-center pt-4">
                          <CtaButton arrow render={<a href={item.enquiry_href} />}>
                            {enquire_label}
                          </CtaButton>
                        </Box>
                      ) : null}
                    </ProgramCatalog>
                  </Box>
                </Box>
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
