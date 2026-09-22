import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";

export default function TnaDeliverable({ data }) {
  if (!data) return null;

  // Handles both <TnaDeliverable data={pageData} /> and <TnaDeliverable data={pageData.tnaDeliverablesData} />
  const content = data.tnaDeliverablesData || data;
  const { sectionId, heading, subtitle, items } = content;

  return (
    <Section id={sectionId} className="bg-ink">
      <Box>
        <Box>
          <Text
            as="h2"
            className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-white lg:text-[36px]"
          >
            {heading?.prefix}{" "}
            {heading?.highlightText && (
              <Text
                as="span"
                className="font-serif font-normal italic text-lime"
              >
                {heading.highlightText}
              </Text>
            )}
            {heading?.suffix && ` ${heading.suffix}`}
          </Text>

          {subtitle && (
            <Text className="mt-4 text-[16px] leading-6 text-[#B8C0CF]">
              {subtitle}
            </Text>
          )}
        </Box>

        {items && items.length > 0 && (
          <Box className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Box
                key={`${item.title}-${index}`}
                className="rounded-[14px] border border-[#30415D] bg-[#172641] px-7 py-6"
              >
                <Text
                  as="h3"
                  className="text-[16px] font-bold leading-6 text-[#F5F2EA]"
                >
                  {item.title}
                </Text>

                <Text
                  as="p"
                  className="mt-2.5 text-[16px] leading-6 text-[#B8C0CF]"
                >
                  {item.description}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Section>
  );
}