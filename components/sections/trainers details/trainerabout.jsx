import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function TrainerAbout({ trainer }) {
  const trainerFirstName = trainer?.name?.split(" ")[0] || "Trainer";

  // API Property Mappings based on your backend payload
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

  const travelsForOnsite = trainer?.travels_onsite !== undefined
    ? (trainer.travels_onsite ? "Yes" : "No")
    : "Yes";

  // About text mapped directly from API meta / about fields
  const aboutText = trainer?.meta?.about || trainer?.about;

  const glanceDetails = [
    { label: "Base", value: baseLocation },
    { label: "Trainer since", value: trainerSince },
    { label: "Primary domain", value: primaryDomain },
    { label: "Languages", value: languages },
    { label: "Delivery", value: deliveryMode },
    { label: "Travels for onsite", value: travelsForOnsite },
  ];

  return (
    <Box id="about" className="bg-[#f9fafb] py-16 text-ink">
      <Box className="mx-auto max-w-7xl px-5 lg:px-8">
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
                className="text-[18px] font-Cormorant Garamond italic font-normal text-text-ink lg:text-[24px]"
              >
                {trainerFirstName}.
              </Text>
            </Text>

            {aboutText && (
              <Text as="p" className="text-[16px] leading-[1.7] text-[#334155]">
                {aboutText}
              </Text>
            )}
          </Box>

          {/* Right Side: At a glance Card */}
          <Box className="h-fit rounded-[16px] border border-[#e2e8f0] bg-white p-5 shadow-sm sm:p-6">
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
                className="inline-flex w-full items-center justify-center rounded-full bg-ink py-3.5 px-7 text-[14px] font-semibold text-lime transition-colors hover:bg-[#1e293b]"
              >
                Talk to Edstellar Consultant
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}