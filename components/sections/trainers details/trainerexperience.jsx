import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function TrainerExperience({ trainer, experienceData: passedExperience = [] }) {
  const firstName = trainer?.name?.split(" ")[0] || "Amara";

  // Use API work_history first, then passed experienceData from page.js
  const rawList = trainer?.work_history?.length ? trainer.work_history : passedExperience;

  // Format work history items and parse double-semicolon delimited strings
  const formattedExperience = rawList.map((item) => {
    let highlights = item.highlights || item.description || [];
    if (typeof highlights === "string") {
      highlights = highlights
        .split(/\s*;;\s*/)
        .map((str) => str.trim())
        .filter(Boolean);
    }

    return {
      role: item.role || item.job_title || item.title || "Trainer",
      company_or_industry:
        item.company_or_industry || item.company || item.industry || "Enterprise",
      duration: item.duration || item.period || "2015 - Present",
      is_current:
        item.is_current ??
        Boolean(item.duration?.toLowerCase().includes("present")),
      highlights,
    };
  });

  return (
    <Box id="experience" className="bg-white py-16 text-ink">
      <Box className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header */}
        <Box className="max-w-2xl">
          <Text as="h2" className="text-[30px] font-bold tracking-tight lg:text-[36px]">
            Professional{" "}
            <Text
              as="span"
              className="font-Cormorant Garamond text-[18px] font-normal italic text-ink lg:text-[24px]"
            >
              experience.
            </Text>
          </Text>
          <Text as="p" className="mt-3 text-[16px] text-[#64748b]">
            The operating background that informs how {firstName} trains change and leadership.
          </Text>
        </Box>

        {/* Timeline List */}
        <Box className="relative mt-12 pl-7">
          {/* Continuous Left Border Line */}
          <Box className="absolute left-3.25 top-3 bottom-3 w-px bg-ink/15" />

          <Box className="flex flex-col space-y-10">
            {formattedExperience.map((item, idx) => (
              <Box key={idx} className="relative flex flex-col">
                {/* Timeline Dot Indicator */}
                <span
                  className={`absolute -left-5.5 top-1.5 h-4 w-4 rounded-full border-2 border-ink transition-colors ${
                    item.is_current ? "bg-lime-200" : "bg-white"
                  }`}
                />

                {/* Role Title */}
                <Text as="h3" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {item.role}
                </Text>

                {/* Subtitle / Metadata */}
                <Text as="p" className="mt-1 font-mono text-xs tracking-wider text-[#64748b]">
                  {item.company_or_industry} · {item.duration}
                </Text>

                {/* Highlights List */}
                {item.highlights?.length > 0 && (
                  <Box as="ul" className="mt-4 flex flex-col space-y-3">
                    {item.highlights.map((bullet, bulletIdx) => (
                      <Box key={bulletIdx} as="li" className="flex items-start gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#94a3b8]" />
                        <Text as="span" className="text-[15px] leading-relaxed text-[#334155]">
                          {bullet}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}