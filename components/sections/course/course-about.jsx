import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import ReadMore from "@/components/shared/read-more";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";
import CtaBanner from "@/components/shared/ctabanner";

function CategoryAbout({ about, ctaBannerData }) {
  if (!about) return null;

  const contrast = about.contrast;

  return (
    <Section id="about" className="relative border-b border-ink/12 ">
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={about.headlineParts}
          className="mb-6.5 max-w-[20ch]"
        />
      </Reveal>

      <Box className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
        <Reveal delay={1}>
          {about.body?.map((paragraph, index) => (
            <Text
              as="p"
              key={index}
              className="mb-4.5 text-base leading-[1.75]"
            >
              {paragraph}
            </Text>
          ))}

          {about.more?.length ? (
            <ReadMore showIcon>
              {about.more.map((paragraph, index) => (
                <Text
                  as="p"
                  key={index}
                  className="mb-4.5 text-base leading-[1.75]"
                >
                  {paragraph}
                </Text>
              ))}
            </ReadMore>
          ) : null}
        </Reveal>

        {contrast ? (
          <Reveal delay={2}>
            <Box>
              {contrast.label ? (
                <Text
                  as="h3"
                  className="mb-5 inline-block border-b-[3px] border-lime pb-2.5 font-display text-[22px] leading-[1.25] font-bold tracking-[-0.025em] text-ink"
                >
                  {contrast.label}
                </Text>
              ) : null}

              <Box className="grid grid-cols-1 overflow-hidden rounded-[18px] border border-ink/12 bg-white sm:grid-cols-2">
                {contrast.columns.map((column, index) => (
                  <Box
                    key={column.heading}
                    className={[
                      "p-5",
                      index === 0
                        ? "border-b border-ink/12 sm:border-r sm:border-b-0"
                        : "bg-lime/5",
                    ].join(" ")}
                  >
                    <Text
                      as="p"
                      className={[
                        "mb-3.5 font-mono text-[10px] font-normal tracking-[0.14em] uppercase",
                        index === 0 ? "text-ink/60" : "rounded bg-lime/10 px-2 py-1 text-ink",
                      ].join(" ")}
                    >
                      {column.heading}
                    </Text>

                    <Box as="ul" className="flex flex-col gap-3.25">
                      {column.items.map((item) => (
                        <Box
                          as="li"
                          key={item}
                          className="relative pl-5.5 text-[14.5px] leading-[1.5] font-medium text-ink before:absolute before:top-[0.46em] before:left-0 before:size-1.75 before:rounded-full before:border before:border-ink/22 before:bg-lime"
                        >
                          {item}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        ) : null}
      </Box>
      {ctaBannerData?.map((cta, index) => (
        <CtaBanner key={index} data={cta} />
      ))}
    </Section>
  );
}

export default CategoryAbout;
