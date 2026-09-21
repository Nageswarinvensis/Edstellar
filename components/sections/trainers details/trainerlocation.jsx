import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import trainerContent from "@/content/trainer.json";

export default function TrainerLocation({ trainer }) {
  const city = trainer.city;
  const country = trainer.country;
  const metroRegion = trainer.metro_region || trainerContent.locationDetail.metroRegion;
  const timezone = trainer.timezone || trainerContent.locationDetail.timezone;
  const onsiteRadius = trainer.onsite_radius || trainerContent.locationDetail.onsiteRadius;
  const willingToTravel = trainer.willing_to_travel || trainerContent.locationDetail.willingToTravel;
  const virtualDelivery = trainer.virtual_delivery || trainerContent.locationDetail.virtualDelivery;

  const nearbyCities = trainer.nearby_cities?.length
    ? trainer.nearby_cities
    : trainerContent.nearbyCities;

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
          emphasisClassName="text-[18px] font-normal text-ink lg:text-[24px]"
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

            {/* Nearby Served Locations — hidden until the CMS models this,
                rather than showing a hardcoded city list that belongs to a
                different trainer's geography. */}
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