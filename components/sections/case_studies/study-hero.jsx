import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import Breadcrumbs from "@/components/common/breadcrumbs";

/** Light detail hero — breadcrumb, eyebrow pill and title beside the framed
 * photo.
 * Design: case-study `.hero`, `.hero-grid`, `.cs-eyebrow`, `.hero-photo`. */
export default function StudyHero({ title, data, breadcrumbs }) {
  return (
    <Section className="bg-paper pt-16 pb-18 lg:pt-16 lg:pb-18">
      <Box className="grid grid-cols-1 items-center gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <Reveal>
          <Breadcrumbs items={breadcrumbs} className="mt-0 mb-6" />
          {data?.eyebrow ? (
            <Text as="p" className="mb-4 inline-block rounded-full bg-lime/30 px-3 py-1.25 font-mono text-[11px] tracking-[0.18em] text-olive uppercase">
              {data.eyebrow}
            </Text>
          ) : null}
          <Text as="h1" className="max-w-[22ch]">
            {title}
          </Text>
        </Reveal>

        {data?.image?.src ? (
          <Reveal delay={1}>
            <Box className="overflow-hidden rounded-[14px] border border-ink/12 bg-white p-3 shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]">
              <img
                src={data.image.src}
                alt={title}
                width={data.image.width}
                height={data.image.height}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full rounded-[10px]"
              />
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}
