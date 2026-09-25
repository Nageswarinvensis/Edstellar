import Box from "@/components/ui/Box";
import { CtaButton } from "@/components/common/cta-button";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import { fillTemplate } from "@/lib/template";
import { TRAINERS_DATA } from "@/content/trainers/trainersdata";

export default function TrainerAbout({ trainer, data }) {
  const trainerFirstName = trainer.name.split(" ")[0];
  const copy = { name: trainerFirstName };
  const baseLocation = [trainer.city, trainer.country].join(", ");

  // `trainer_category` doesn't exist on the API record — the real field is
  // `meta.primary_training_type`, with `meta.current_job_title` next.
  const primaryDomain =
    trainer.meta?.primary_training_type ||
    trainer.meta?.current_job_title ||
    data.primaryDomain;

  const languages = Array.isArray(trainer.languages)
    ? trainer.languages.join(", ")
    : trainer.languages ||
      TRAINERS_DATA.sharedData.languages.map((lang) => lang.name).join(", ");

  const deliveryMode =
    trainer.delivery_mode || TRAINERS_DATA.sharedData.deliveryMode;

  const travelsForOnsite =
    trainer.travels_onsite !== undefined
      ? trainer.travels_onsite
        ? "Yes"
        : "No"
      : data.travelsOnsite;

  const rawAboutText = trainer.meta?.about || "";

  const paragraphs = rawAboutText
    ? rawAboutText
        .split(/\s*\|\|\s*/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  const glanceValues = {
    base: baseLocation,
    trainer_since: trainer.training_since,
    primary_domain: primaryDomain,
    languages,
    delivery: deliveryMode,
    travels_for_onsite: travelsForOnsite,
  };
  const glanceDetails = data.glance_rows.map((row) => ({
    label: row.label,
    value: glanceValues[row.key],
  }));

  return (
    <Section id="about" className="bg-[#f9fafb] py-16 text-ink">
      <Box>
        <Box className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Left Side: About Bio Text */}
          <Box className="flex flex-col space-y-6">
            <RichHeading
              heading={fillTemplate(data.heading, copy)}
              className="tracking-tight text-ink"
              emphasisClassName="font-normal"
            />

            {paragraphs.length > 0 && (
              <Box className="flex flex-col space-y-5">
                {paragraphs.map((paragraph, index) => (
                  <Text
                    key={index}
                    as="p"
                    className="text-[16px] leading-[1.75] text-[#334155]"
                  >
                    {paragraph}
                  </Text>
                ))}
              </Box>
            )}
          </Box>

          {/* Right Side: Sticky "At a glance" Card */}
          <Box className="sticky top-16 self-start h-fit rounded-[16px] border border-[#e2e8f0] bg-white p-5 shadow-sm sm:p-6">
            <Text
              as="h3"
              className="text-[20px] font-bold tracking-tight text-ink"
            >
              {data.glance_heading}
            </Text>

            <Box className="mt-4 flex flex-col divide-y divide-[#f1f5f9]">
              {glanceDetails.map((item, index) => (
                <Box
                  key={index}
                  className="flex items-center justify-between py-2.5 text-[14px]"
                >
                  <Text as="span" className="text-[#64748b]">
                    {item.label}
                  </Text>
                  <Text as="span" className="font-bold text-ink">
                    {item.value}
                  </Text>
                </Box>
              ))}
            </Box>

            <Box className="mt-4">
              <CtaButton block arrow render={<a href={data.cta.href} />}>
                {data.cta.text}
              </CtaButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
