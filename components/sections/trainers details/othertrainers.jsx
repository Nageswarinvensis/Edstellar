import Image from "next/image";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import trainerContent from "@/content/trainer.json";

export default function OtherTrainers({ trainer }) {
  const others = trainerContent.otherTrainers
    .filter((item) => item.slug !== trainer.slug)
    .slice(0, 4);

  if (!others.length) return null;

  return (
    <Section id="other-trainers" className="bg-white">
      <Box>
        <Text as="h2" className="tracking-tight">
          Other{" "}
          <Text as="span" className="font-serif text-[18px] font-normal italic text-ink lg:text-[24px]">
            trainers.
          </Text>
        </Text>

        <Box className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/trainer/${item.slug}`}
              className="flex flex-col overflow-hidden rounded-2xl border border-[rgba(10,22,40,.12)] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(10,22,40,.12)]"
            >
              <Box className="relative aspect-4/3 w-full overflow-hidden bg-ink">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={`${item.name}, trainer in ${item.city}, ${item.country}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
              </Box>

              <Box className="flex flex-1 flex-col gap-3 p-4.5">
                <Box>
                  <Text as="h3" className="text-[17px] font-bold text-ink">
                    {item.name}
                  </Text>
                  <Text as="p" className="mt-0.5 flex items-center gap-1.5 text-[13px] text-ink-muted">
                    <span aria-hidden="true">{item.flag}</span>
                    {item.city}, {item.country}
                  </Text>
                </Box>

                <Box className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <Text
                      key={skill}
                      as="span"
                      className="rounded-full bg-paper-cream px-2.5 py-1 text-[11.5px] text-ink-muted"
                    >
                      {skill}
                    </Text>
                  ))}
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
