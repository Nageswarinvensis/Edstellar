import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import { fillTemplate } from "@/lib/template";
import { parseTrainerHistory } from "@/lib/trainer-history";

export default function TrainerExperience({ trainer, data }) {
  const parsedExperience = parseTrainerHistory(trainer.meta?.work_history);
  const firstName = trainer.name.split(" ")[0];

  return (
    <Section id="experience" className="bg-white">
      <Box>
        {/* Section Header */}
        <Box className="mb-10 max-w-2xl">
          <RichHeading
            heading={data.heading}
            className="tracking-tight text-ink"
            emphasisClassName="font-normal"
          />
          <Text
            as="p"
            className="mt-3 text-[16px] leading-relaxed text-[#64748b]"
          >
            {fillTemplate(data.description, { name: firstName })}
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
                {data.empty_text}
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
