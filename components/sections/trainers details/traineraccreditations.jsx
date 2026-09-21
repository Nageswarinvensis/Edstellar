import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import trainerContent from "@/content/trainer.json";

const parseEducationData = (educationRaw) => {
  if (!educationRaw) return [];

  const items = educationRaw.split("||");

  return items.map((item) => {
    const match = item.trim().match(/^(.*?)(?:\s*-\s*(.*?))?\s*\((.*?)\)$/);

    if (match) {
      return {
        institution: match[1]?.trim() || item,
        degree: match[2]?.trim() || "",
        years: match[3]?.replace("-", " – ").trim() || "",
      };
    }

    return {
      institution: item.trim(),
      degree: "",
      years: "",
    };
  });
};

export default function CertificationsAndEducation({ trainer }) {
  const educationString = trainer.meta?.education;
  const educationList = parseEducationData(educationString);

  return (
    <Section id="accreditations" className="bg-paper">
      <Box>
        {/* TOP BLOCK: Certifications & Accreditations */}
        <Box>
          {/* Section Heading */}
          <Text
            as="h2"
            className="mb-3 tracking-tight text-ink"
          >
            Certifications &{" "}
            <Text
              as="span"
              className="font-serif text-[32px] font-normal italic text-black/80 lg:text-[38px]"
            >
              accreditations.
            </Text>
          </Text>

          {/* Subtitle */}
          <Text as="p" className="mb-10 max-w-2xl text-[16px] text-black/60">
            Professional certifications a trainer holds in their domain. Displayed with the issuing body and year; badges use each partner's official artwork per $23.4.
          </Text>

          {/* Certifications Cards Grid */}
          <Box className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trainerContent.certifications.map((item, index) => (
              <Box
                key={index}
                className="flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-5 lg:p-6 shadow-sm transition-all hover:shadow-md"
              >
                <Box className="flex flex-col gap-3">
                  <Box className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0eee9] text-ink">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </Box>

                  <Text
                    as="h3"
                    className="text-[16px] font-medium leading-snug text-ink"
                  >
                    {item.title}
                  </Text>

                  <Text
                    as="p"
                    className="text-[12px] font-medium text-black/50"
                  >
                    {item.subtitle}
                  </Text>
                </Box>

                <Text
                  as="span"
                  className="mt-2 text-[10px] font-medium tracking-wide text-black/40"
                >
                  {item.issuer} · {item.year}
                </Text>
              </Box>
            ))}
          </Box>

          {/* Disclaimer Note Box */}
          <Box className="mb-12 flex items-start gap-2.5 rounded-xl border border-black/5 bg-[#ecebe4] p-4 text-[12px] text-black/60">
            <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-black/30 text-[10px] font-bold">
              !
            </span>
            <Text as="p">
              Accreditation names shown are sample credentials. Real badges use each partner's official logo files and usage rules per $23.4, and a lapsed credential comes down.
            </Text>
          </Box>
        </Box>

        {/* BOTTOM BLOCK: Education */}
        {educationList.length > 0 && (
          <Box id="education">
            <Text
              as="h2"
              className="tracking-tight text-ink"
            >
              Education.
            </Text>

            <Box className="mt-8 grid gap-4 sm:grid-cols-2">
              {educationList.map((item, index) => (
                <Box
                  key={index}
                  className="flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <Box>
                    <Text
                      as="h3"
                      className="text-[18px] font-bold leading-snug text-ink"
                    >
                      {item.institution}
                    </Text>

                    {item.degree && (
                      <Text
                        as="p"
                        className="mt-1.5 text-[14px] font-medium text-black/60"
                      >
                        {item.degree}
                      </Text>
                    )}
                  </Box>

                  {item.years && (
                    <Text
                      as="span"
                      className="mt-4 text-[12px] font-medium tracking-wide text-black/40"
                    >
                      {item.years}
                    </Text>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Section>
  );
}