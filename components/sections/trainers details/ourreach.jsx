import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function OurReach({ trainer }) {
  const firstName = trainer?.name?.split(" ")[0] || "Amara";

  const languages = trainer?.languages?.length
    ? trainer.languages.map((lang, idx) => ({
        name: typeof lang === "string" ? lang : lang.name,
        proc:
          typeof lang === "object" && lang.proficiency
            ? lang.proficiency
            : idx === 0
              ? "Native / full delivery"
              : "Professional / full delivery",
        width:
          typeof lang === "object" && lang.level
            ? lang.level
            : idx === 0
              ? "100%"
              : "85%",
      }))
    : [
        {
          name: "English",
          proc: "Native / full delivery",
          width: "100%",
        },
        {
          name: "French",
          proc: "Professional / full delivery",
          width: "85%",
        },
      ];

  const coverage = trainer?.regional_coverage || [
    {
      badge: "ONSITE",
      isLime: true,
      title: "West Africa",
      desc: "Nigeria, Ghana, Côte d'Ivoire, Senegal",
    },
    {
      badge: "VIRTUAL",
      isLime: false,
      title: "EMEA",
      desc: "Live instructor-led across European & Middle East timezones",
    },
    {
      badge: "VIRTUAL",
      isLime: false,
      title: "Americas & APAC",
      desc: "Scheduled to the team's working hours",
    },
    {
      badge: "TRAVEL",
      isLime: true,
      title: "Onsite elsewhere on request",
      desc: "For multi-day or enterprise engagements",
    },
  ];

  const cardClass = "flex flex-col justify-between rounded-2xl border border-[rgba(10,22,40,.12)] bg-white p-5 shadow-sm lg:p-6";

  const cardHeaderClass = "mb-4.5 flex items-center gap-2.5";

  return (
    <Box id="reach & languages" className="bg-[#f9fafb] py-16 text-ink">
      <Box className="mx-auto max-w-7xl px-5 lg:px-8">
        <Box className="mb-10 max-w-2xl">
          <Text
            as="h2"
            className="mb-3 text-[30px] font-bold tracking-tight lg:text-[36px]"
          >
            Delivery{" "}
            <Text
              as="span"
              className="font-Cormorant Garamond text-[18px] font-normal text-ink lg:text-[24px]"
            >
              reach,
            </Text>{" "}
            in detail.
          </Text>

          <Text as="p" className="text-[16px] text-in">
            Which languages {firstName} trains in, and how each region is
            served, so a buyer knows exactly what a session with her looks like
            from their location.
          </Text>
        </Box>

        <Box className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Box className={cardClass}>
            <Box>
              <Box className={cardHeaderClass}>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>

                <Text as="h3" className="text-[18px] font-bold">
                  Languages of delivery
                </Text>
              </Box>

              <Box className="space-y-5">
                {languages.map((lang, idx) => (
                  <Box key={idx} className="space-y-2">
                    <Box className="flex justify-between text-sm">
                      <Text as="span" className="font-bold">
                        {lang.name}
                      </Text>

                      <Text as="span" className="text-xs text-[#64748b]">
                        {lang.proc}
                      </Text>
                    </Box>

                    <Box className="h-1.5 w-full rounded-full bg-[#f1f5f9]">
                      <Box
                        className="h-full rounded-full bg-ink"
                        style={{ width: lang.width }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className="mt-4.5 flex items-start gap-2 border-t border-[#f1f5f9] pt-4.5 text-xs text-[#64748b]">
              <svg
                className="mt-1.5 h-4 w-4 shrink-0 text-[#94a3b8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path
                  strokeWidth="2"
                  d="M12 6v6l4 2"
                  strokeLinecap="round"
                />
              </svg>

              <Text as="p">
                Materials, exercises and assessment are delivered in the
                chosen language, not just spoken translation.
              </Text>
            </Box>
          </Box>

          <Box className={cardClass}>
            <Box>
              <Box className={cardHeaderClass}>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeWidth="2"
                    d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                  />
                </svg>

                <Text as="h3" className="text-[18px] font-bold">
                  Regional coverage
                </Text>
              </Box>

              <Box className="space-y-4">
                {coverage.map((item, idx) => (
                  <Box key={idx} className="flex items-start gap-4">
                    <Text
                      as="span"
                      className={`mt-0.5 min-w-17.5 rounded-full px-3 py-1 text-center text-[10px] font-bold uppercase ${
                        item.isLime
                          ? "bg-lime-soft text-ink"
                          : "border border-[#cbd5e1] text-ink-muted"
                      }`}
                    >
                      {item.badge}
                    </Text>

                    <Box>
                      <Text as="p" className="text-sm font-bold">
                        {item.title}
                      </Text>

                      <Text as="p" className="text-xs text-ink-muted">
                        {item.desc}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className="mt-4.5 border-t border-[#f1f5f9] pt-4.5">
              <Box className="flex items-start gap-2 text-xs text-ink-muted">
                <svg
                  className="mt-1.5 h-4 w-4 shrink-0 text-[#94a3b8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeWidth="2"
                    d="M12 6v6l4 2"
                    strokeLinecap="round"
                  />
                </svg>

                <Text as="p">
                  Home timezone{" "}
                  <Text as="span" className="font-bold text-ink">
                    {trainer?.timezone || "WAT (UTC+1)"}
                  </Text>
                  . Virtual cohorts are scheduled to overlap the team's hours,
                  not the trainer's.
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}