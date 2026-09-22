import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";

export default function TnaDeliverable({ data }) {
  if (!data) return null;

  // Handles both <TnaDeliverable data={pageData} /> and <TnaDeliverable data={pageData.tnaDeliverablesData} />
  const content = data.tnaDeliverablesData || data;
  const { sectionId, heading, subtitle, items } = content;
  const headingText =
    typeof heading === "string"
      ? heading
      : "Your TNA <span>deliverables.</span>";

  return (
    <Section id={sectionId} className="bg-ink">
      <Box>
        <Box>
          <RichHeading
            heading={headingText}
            className="text-white"
            emphasisClassName="text-lime"
          />

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
