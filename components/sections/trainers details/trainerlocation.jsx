import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import trainerContent from "@/content/trainer.json";

/**
 * Country and city come from the CMS trainer record. Everything else here
 * — metro/region, timezone, onsite radius, travel, virtual delivery and the
 * nearby-cities list — is static from `content/trainer.json` for now: the
 * CMS doesn't send those fields yet. Connect them later.
 */
export default function TrainerLocation({ trainer }) {
  const city = trainer.city;
  const country = trainer.country;
  const {
    metroRegion,
    timezone,
    onsiteRadius,
    willingToTravel,
    virtualDelivery,
  } = trainerContent.locationDetail;
  const nearbyCities = trainerContent.nearbyCities;

  const locationDetails = [
    { label: "Country", value: country },
    { label: "City", value: city },
    { label: "Metro / region", value: metroRegion },
    { label: "Timezone", value: timezone },
    { label: "Onsite radius", value: onsiteRadius },
    { label: "Willing to travel", value: willingToTravel },
    { label: "Virtual delivery", value: virtualDelivery },
  ];

  return (
    <Section id="location" className="bg-[#f9fafb]">
      <Box>
        {/* Section Heading */}
        <RichHeading
          heading={`Based in ${city}, <span>open to travel.</span>`}
          className="tracking-tight"
          emphasisClassName="font-normal"
        />

        <Box className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_480px] lg:gap-12">
          {/* Dark Location Card */}
          <Box className="flex flex-col justify-between rounded-2xl bg-ink p-5 text-white shadow-sm lg:p-6">
            <Box>
              <Text as="span" className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">
                Home Base
              </Text>
              <Text as="h3" className="mt-2 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                {city}
              </Text>
              <Text as="p" className="mt-1 font-serif italic text-lg text-lime">
                {country}
              </Text>

              <Box className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-soft px-4 py-2 text-[14px] font-semibold text-ink">
                <span className="h-2 w-2 rounded-full bg-ink" />
                Willing to travel for onsite delivery
              </Box>
            </Box>

            {/* Nearby Served Locations — static for now (see above). */}
            {nearbyCities.length > 0 && (
              <Box>
                <Text as="span" className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#FAFAF78C]">
                  Also Serves Nearby
                </Text>
                <Box className="mt-2 flex flex-wrap gap-2">
                  {nearbyCities.map((item, idx) => (
                    <Text key={idx} as="span" className="rounded-full border border-[rgba(250,250,247,0.12)] bg-[rgba(250,250,247,0.12)] px-3.5 py-1.5 text-xs text-[#cbd5e1]">
                      {item}
                    </Text>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* Right Side Specs List */}
          <Box className="flex flex-col justify-center divide-y divide-[#e2e8f0]">
            {locationDetails.map((item, idx) => (
              <Box key={idx} className="flex items-center justify-between py-3.5 text-sm">
                <Text as="span" className="text-[#64748b]">
                  {item.label}
                </Text>
                <Text as="span" className="font-bold text-ink">
                  {item.value}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}