import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";

/**
 * Utility function to parse custom formatted work_history string:
 *  - Splits multiple jobs by '||'
 *  - Splits job header from bullets by '::'
 *  - Splits individual bullet items by ';;'
 */
function parseWorkHistory(workHistory) {
  if (!workHistory || typeof workHistory !== "string") return [];

  const jobEntries = workHistory.split(/\s*\|\|\s*/).filter(Boolean);

  return jobEntries.map((entry, index) => {
    const [headerPart = "", highlightsPart = ""] = entry.split(/\s*::\s*/);

    let role = "";
    let company_or_industry = "";
    let duration = "";

    // Extract date range inside parentheses, e.g. "(Feb 2024 - present)"
    const dateMatch = headerPart.match(/\((.*?)\)/);

    if (dateMatch) {
      duration = dateMatch[1].trim();
      const beforeDate = headerPart.replace(dateMatch[0], "").trim();
      const parts = beforeDate.split(/\s*-\s*/);
      role = parts[0] || "";
      company_or_industry = parts.slice(1).join(" - ") || "";
    } else {
      const parts = headerPart.split(/\s*-\s*/);
      role = parts[0] || "";
      company_or_industry = parts[1] || "";
      duration = parts.slice(2).join(" - ") || "";
    }

    const highlights = highlightsPart
      .split(/\s*;;\s*/)
      .map((b) => b.trim())
      .filter(Boolean);

    return {
      role: role.trim(),
      company_or_industry: company_or_industry.trim(),
      duration: duration.trim(),
      is_current: index === 0 || duration.toLowerCase().includes("present"),
      highlights,
    };
  });
}

export default function TrainerExperience({ trainer }) {
  const parsedExperience = parseWorkHistory(trainer.meta?.work_history);
  const firstName = trainer.name.split(" ")[0];

  return (
    <Section id="experience" className="bg-white">
      <Box>
        {/* Section Header */}
        <Box className="mb-10 max-w-2xl">
          <Text as="h2" className="tracking-tight text-ink">
            Professional{" "}
            <Text
              as="span"
              className="font-serif text-[20px] font-normal italic text-ink lg:text-[24px]"
            >
              experience.
            </Text>
          </Text>
          <Text
            as="p"
            className="mt-3 text-[16px] leading-relaxed text-[#64748b]"
          >
            The operating background that informs how {firstName} trains change
            and leadership.
          </Text>
        </Box>

        {/* Timeline List */}
        <Box className="relative pl-5 sm:pl-7">
          {/* Continuous Left Vertical Line */}
          <Box className="absolute left-3 top-3 bottom-3 w-px bg-ink/15" />

          <Box className="flex flex-col space-y-12">
            {parsedExperience.length > 0 ? (
              parsedExperience.map((item, idx) => (
                <Box key={idx} className="relative flex flex-col">
                  {/* Timeline Circle Indicator */}
                  <span
                    className={`absolute -left-5.75 top-1.5 h-4 w-4 rounded-full border-2 border-ink transition-colors ${
                      item.is_current ? "bg-lime" : "bg-white"
                    }`}
                  />

                  {/* Role Title (Main Heading) */}
                  <Text
                    as="h3"
                    className="text-[18px] font-bold tracking-tight text-ink"
                  >
                    {item.role}
                  </Text>

                  {/* Sub Heading (Industry & Duration) */}
                  <Text
                    as="p"
                    className="mt-1 font-mono text-xs tracking-wider uppercase text-[#64748b]"
                  >
                    {item.company_or_industry}{" "}
                    {item.duration ? `· ${item.duration}` : ""}
                  </Text>

                  {/* Bullet Points */}
                  {item.highlights?.length > 0 && (
                    <Box as="ul" className="mt-4 flex flex-col space-y-3">
                      {item.highlights.map((bullet, bulletIdx) => (
                        <Box
                          key={bulletIdx}
                          as="li"
                          className="flex items-start gap-3"
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#0A162838]" />
                          <Text
                            as="span"
                            className="text-[16px] leading-relaxed text-ink"
                          >
                            {bullet}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ))
            ) : (
              <Text as="p" className="text-sm italic text-[#64748b]">
                No professional experience details available.
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
