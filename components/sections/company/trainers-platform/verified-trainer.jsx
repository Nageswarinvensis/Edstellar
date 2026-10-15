import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import Section from "@/components/ui/Section";

export default function VerifiedTrainer({ data }) {
  if (!data?.heading) return null;

  const { heading, description, cards } = data;

  // Parse heading to apply line break & styled green text with matching font size
  const renderHeading = (text) => {
    const parts = text.split(/\*(.*?)\*/g);
    if (parts.length < 2) return text;

    return (
      <>
        {parts[0]}
        <br />
        <Text
          as="span"
          className="text-[clamp(30px,3.5vw,42px)] font-300 italic text-olive"
        >
          {parts[1]}
        </Text>
        {parts[2]}
      </>
    );
  };

  return (
    <Section className="bg-paper border-t-2 border-lime">
      <Box>
        {/* Header Section */}
        <Box className="max-w-3xl">
          <Reveal>
            <Text
              as="h2"
              className="text-[clamp(30px,3.5vw,42px)] font-bold leading-[1.15] text-ink"
            >
              {renderHeading(heading)}
            </Text>
          </Reveal>

          {description ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-4 max-w-[65ch] text-[clamp(16px,1.1vw,17px)] leading-[1.6] text-ink/60"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}
        </Box>

        {/* Benefits Grid */}
        {cards?.length ? (
          <Box className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
              <Reveal key={card.id || index} delay={index + 1}>
                <Box className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white p-0 transition-all duration-500 ease-out hover:-translate-y-2.5 hover:shadow-xl hover:shadow-black/5">
                  {/* Image Container */}
                  {card.image ? (
                    <Box className="relative aspect-4/3 w-full overflow-hidden">
                      <Box
                        as="img"
                        src={card.image}
                        alt={card.image_alt || card.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Box>
                  ) : null}

                  {/* Card Content */}
                  <Box className="flex flex-1 flex-col p-6">
                    {/* Card Tag/Badge below image */}
                    {card.badge ? (
                      <Text
                        as="span"
                        className="mb-2 text-[11px] font-bold tracking-[0.12em] text-olive uppercase"
                      >
                        {card.badge}
                      </Text>
                    ) : null}

                    <Text
                      as="h3"
                      className="text-[18px] font-bold leading-[1.3] text-ink"
                    >
                      {card.title}
                    </Text>

                    {card.description ? (
                      <Text
                        as="p"
                        className="mt-3 text-[14px] leading-[1.6] text-ink/60"
                      >
                        {card.description}
                      </Text>
                    ) : null}
                  </Box>

                  {/* Green Bottom Hover Border */}
                  <Box className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </Box>
              </Reveal>
            ))}
          </Box>
        ) : null}
      </Box>
    </Section>
  );
}