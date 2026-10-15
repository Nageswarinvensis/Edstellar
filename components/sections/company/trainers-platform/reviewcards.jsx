import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import Section from "@/components/ui/Section";

export default function ReviewCards({ data }) {
  if (!data?.heading) return null;

  const { heading, description, reviews } = data;

  // Helper to parse markdown-style asterisks for styled accent word with matching size
  const renderHeading = (text) => {
    const parts = text.split(/\*(.*?)\*/g);
    if (parts.length < 2) return text;

    return (
      <>
        {parts[0]}
        <Text
          as="span"
          className="text-[clamp(30px,3.5vw,42px)] font-normal italic text-olive"
        >
          {parts[1]}
        </Text>
        {parts[2]}
      </>
    );
  };

  return (
    <Section className="bg-paper-warm border-y border-[#0a16281f]">
      <Box className="mx-auto max-w-7xl">
        {/* Centered Header Section */}
        <Box className="mx-auto max-w-2xl text-center">
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
                className="mt-4 text-[clamp(15px,1.1vw,16px)] leading-[1.6] text-ink/60"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}
        </Box>

        {/* Reviews Grid */}
        {reviews?.length ? (
          <Box className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {reviews.map((item, index) => (
              <Reveal key={item.id || index} delay={index + 1}>
                <Box className="flex h-full flex-col justify-between rounded-2xl border border-ink/10 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                  <Box>
                    {/* Quotation Mark Icon */}
                    <Box className="mb-4 text-lime" aria-hidden="true">
                      <svg
                        width="28"
                        height="20"
                        viewBox="0 0 28 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 20V11.2381C0 4.28571 4.43333 0.761905 11.2 0L12.6 3.04762C8.86667 4.09524 6.88333 6.09524 6.65 9.04762H11.2V20H0ZM15.4 20V11.2381C15.4 4.28571 19.8333 0.761905 26.6 0L28 3.04762C24.2667 4.09524 22.2833 6.09524 22.05 9.04762H26.6V20H15.4Z" />
                      </svg>
                    </Box>

                    {/* Quote Text */}
                    <Text
                      as="p"
                      className="text-[14px] leading-[1.7] text-ink/70"
                    >
                      {item.quote}
                    </Text>
                  </Box>

                  {/* Author Meta Row */}
                  {item.author ? (
                    <Box className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
                      {item.author.avatar ? (
                        <Box className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-paper">
                          <Box
                            as="img"
                            src={item.author.avatar}
                            alt={item.author.avatar_alt || item.author.name}
                            className="h-full w-full object-cover grayscale"
                          />
                        </Box>
                      ) : null}

                      <Box className="flex flex-col">
                        <Text
                          as="span"
                          className="text-[15px] font-bold leading-tight text-ink"
                        >
                          {item.author.name}
                        </Text>
                        <Text
                          as="span"
                          className="mt-1 text-[11px] font-semibold `tracking-widest` text-ink/40 uppercase"
                        >
                          {item.author.role}
                        </Text>
                      </Box>
                    </Box>
                  ) : null}
                </Box>
              </Reveal>
            ))}
          </Box>
        ) : null}
      </Box>
    </Section>
  );
}