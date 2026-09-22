import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import Breadcrumbs from "@/components/common/breadcrumbs";

export default function TNAHero({ data, breadcrumbItems }) {
  if (!data) return null;

  return (
    <Section className="bg-[#f8f7f4]">
     <Reveal>
      {
        breadcrumbItems ? <Breadcrumbs items={breadcrumbItems} /> : null
      }
     </Reveal>
      <Box>
        <Box className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Side Content */}
          <Box className="lg:col-span-6">
            <Reveal delay={1}>
            <Text
              as="h1"
              className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-tight text-ink lg:text-[48px]"
            >
              {data.title}
            </Text>
            </Reveal>

            {data.tagline && (
              <Text
                as="p"
                className="mt-4 font-serif text-[18px] font-normal italic text-ink"
              >
                {data.tagline}
              </Text>
            )}

            {data.description && (
             <Reveal delay={2}>
              <Text
                as="p"
                className="mt-6 text-[16px] font-normal leading-relaxed text-ink-muted"
              >
                {data.description}
              </Text>
             </Reveal>
            )}

            {/* Action Buttons */}
            <Reveal delay={3}>
            <Box className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {data.primaryBtnText && (
                <button
                  type="button"
                  className="rounded-full bg-[#0f172a] px-6 py-3.5 text-center text-[14px] font-semibold text-[#ccf244] transition-all hover:bg-[#1e293b]"
                >
                  {data.primaryBtnText}
                </button>
              )}

              {data.secondaryBtnText && (
                <button
                  type="button"
                  className="rounded-full border border-black/80 bg-transparent px-6 py-3.5 text-center text-[14px] font-semibold text-[#0b1320] transition-all hover:bg-black/5"
                >
                  {data.secondaryBtnText}
                </button>
              )}
            </Box>
            </Reveal>
          </Box>

          {/* Right Side Content - Renders HTML string directly from JSON */}
          {data.rightSideHtml && (
            <Box className="lg:col-span-6">
              <div
                dangerouslySetInnerHTML={{ __html: data.rightSideHtml }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Section>
  );
}