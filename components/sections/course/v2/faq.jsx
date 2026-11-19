import Box from "@/components/ui/Box";
import V2Section from "@/components/sections/course/v2/section";
import V2SectionHead from "@/components/sections/course/v2/section-head";
import V2CtaBand from "@/components/sections/course/v2/cta-band";

/**
 * v2 · 13 FAQs (the design's `#faq`) — categories in two columns on
 * desktop, each question a native disclosure (answers are in the HTML
 * whether open or not). The FAQPage schema is built from the same data by
 * the route.
 */
export default function V2Faq({ data }) {
  if (!data?.groups?.length) return null;
  const { eyebrow, heading, groups, cta } = data;

  return (
    <V2Section id="faq">
      <V2SectionHead eyebrow={eyebrow} heading={heading} />
      <Box className="grid gap-x-10 gap-y-1 lg:grid-cols-2 lg:items-start">
        {groups.map((group, gi) => (
          <Box key={group.category} className="min-w-0">
            <h3 className={`mb-0.5 flex items-center gap-2 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-olive before:size-1.5 before:rounded-full before:bg-lime before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-lime)_25%,transparent)] ${gi < 2 ? "mt-0 lg:mt-0" : "mt-6"} ${gi === 1 ? "mt-6 lg:mt-0" : ""}`}>
              {group.category}
            </h3>
            {group.items.map((item) => (
              <details key={item.question} className="group border-b border-ink/12 py-1">
                <summary className="flex cursor-pointer list-none justify-between gap-4 py-4 font-display text-[16.5px] font-medium tracking-[-0.015em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span aria-hidden="true" className="font-mono text-[18px] leading-none text-olive">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">–</span>
                  </span>
                </summary>
                <p className="max-w-[820px] pb-3 text-[15px] leading-[1.65] text-ink-muted">{item.answer}</p>
              </details>
            ))}
          </Box>
        ))}
      </Box>
      <V2CtaBand cta={cta} />
    </V2Section>
  );
}
