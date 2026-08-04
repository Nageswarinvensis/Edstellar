import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import ReadMore from "@/components/shared/read-more";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";
import SectionMark from "@/components/shared/section-mark";

/**
 * Domain hub "what is this" definition block.
 *
 * Design: `section#about.block` on the domain page. Note the domain page's own
 * override reduces block padding to 88px (66px ≤980px) and steps the section
 * headline down from the course-page scale.
 */
function DomainAbout({ about }) {
  if (!about) return null;

  return (
    <Section
      id="about"
      className="relative border-b border-ink/12 py-[88px] max-lg:py-[66px] max-sm:py-[78px]"
    >
      <Reveal>
        <SectionMark
          roman={about.mark?.roman}
          keyword={about.mark?.keyword}
          label={about.mark?.label}
          className="mb-6"
        />
      </Reveal>

      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={about.headlineParts}
          // The domain hub steps the section headline down from the course
          // scale. `leading` must be restated alongside any `text-*` override
          // or tailwind-merge drops the base value.
          className="mb-5 max-w-[20ch] text-[clamp(27px,3.2vw,40px)] leading-[1.08]"
        />
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-0 max-w-[64ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7]"
        >
          {about.lede}
        </Text>
      </Reveal>

      {about.more?.length ? (
        <ReadMore className="mt-4 max-w-[64ch]">
          {about.more.map((paragraph, index) => (
            <Text
              as="p"
              key={index}
              className={
                index === about.more.length - 1
                  ? "text-base leading-[1.75]"
                  : "mb-[18px] text-base leading-[1.75]"
              }
            >
              {paragraph}
            </Text>
          ))}
        </ReadMore>
      ) : null}
    </Section>
  );
}

export default DomainAbout;
