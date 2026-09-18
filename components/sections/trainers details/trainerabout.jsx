import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";

export default function TrainerAbout({ trainer }) {
  const trainerFirstName = trainer?.name?.split(" ")[0] || "Trainer";

  const baseLocation =
    [trainer?.city, trainer?.country].filter(Boolean).join(", ") ||
    trainer?.city ||
    trainer?.country ||
    "Delhi, India";

  const trainerSince = trainer?.training_since || "May 2013";

  const primaryDomain =
    trainer?.trainer_category ||
    trainer?.current_job_title ||
    "Technical Training";

  const languages = Array.isArray(trainer?.languages)
    ? trainer.languages.join(", ")
    : trainer?.languages || "English";

  const deliveryMode = trainer?.delivery_mode || "Onsite & Virtual";

  const travelsForOnsite =
    trainer?.travels_onsite !== undefined
      ? trainer.travels_onsite
        ? "Yes"
        : "No"
      : "Yes";

  const rawAboutText = trainer?.meta?.about || trainer?.about || "";

  const paragraphs = rawAboutText
    ? rawAboutText
        .split(/\s*\|\|\s*/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  const glanceDetails = [
    { label: "Base", value: baseLocation },
    { label: "Trainer since", value: trainerSince },
    { label: "Primary domain", value: primaryDomain },
    { label: "Languages", value: languages },
    { label: "Delivery", value: deliveryMode },
    { label: "Travels for onsite", value: travelsForOnsite },
  ];

  return (
    <Section id="about" className="bg-[#f9fafb] py-16 text-ink">
      <Box>
        <Box className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Left Side: About Bio Text */}
          <Box className="flex flex-col space-y-6">
            <Text
              as="h2"
              className="text-[30px] font-bold tracking-tight text-ink lg:text-[36px]"
            >
              About{" "}
              <Text
                as="span"
                className="font-Cormorant Garamond text-[18px] font-normal italic text-ink lg:text-[24px]"
              >
                {trainerFirstName}.
              </Text>
            </Text>

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
              At a glance
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
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text.sm font-semibold text-lime transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(10,22,40,0.5)]"
              >
                <span>Talk to Edstellar Consultant</span>
                <span className="text-base leading-none">→</span>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Section>
  );
}