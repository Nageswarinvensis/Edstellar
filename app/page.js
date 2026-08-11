import Link from "next/link";
import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/ui/CtaButton";
import { buildMetadata } from "@/lib/seo/metadata";
import courses from "@/lib/content/courses";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Corporate Training and Consulting",
  path: "/",
});

const SITE_MAP = [
  {
    kicker: "Trainers",
    title: "Meet our trainers",
    links: ["/trainers", "/trainers/example"],
  },
  {
    kicker: "Assessments",
    title: "Talent assessment services",
    links: [
      "/talent-assessment-services",
      "/talent-assessment-services/example",
    ],
  },
  {
    kicker: "Consulting",
    title: "Learning & development consulting",
    links: [
      "/learning-development-consulting-services",
      "/learning-development-consulting-services/example",
    ],
  },
  {
    kicker: "Consulting",
    title: "Organizational development consulting",
    links: [
      "/organizational-development-consulting",
      "/organizational-development-consulting/example",
    ],
  },
  {
    kicker: "Consulting",
    title: "Skill-based organization",
    links: ["/skill-based-organization"],
  },
  {
    kicker: "Coaching",
    title: "Coaching services",
    links: ["/coaching-services"],
  },
  {
    kicker: "Platform",
    title: "Training management software",
    links: ["/training-management-software"],
  },
  {
    kicker: "Resources",
    title: "Brochures, templates & tools",
    links: [
      "/resources",
      "/resources/brochures/example",
      "/resources/case-studies/example",
      "/resources/templates/example",
      "/resources/tools/example",
    ],
  },
  {
    kicker: "Blog",
    title: "Articles, authors & categories",
    links: [
      "/blog",
      "/blog/example",
      "/blog/author/example",
      "/blog/category/example",
    ],
  },
  {
    kicker: "Conversion",
    title: "Thank you page",
    links: ["/thank-you/example"],
  },
  {
    kicker: "Company",
    title: "About, contact & enquiry",
    links: ["/about-us", "/contact-us", "/enquiry-now"],
  },
  {
    kicker: "Legal",
    title: "Privacy & terms",
    links: ["/privacy-policy", "/terms-and-conditions"],
  },
];

export default function HomePage() {
  const corporateTraining = {
    kicker: "Corporate Training",
    title: "Corporate training courses",
    links: [
      "/corporate-training",
      ...courses.map(
        (course) => `/corporate-training/${course.category}/${course.slug}`
      ),
    ],
  };

  const sections = [corporateTraining, ...SITE_MAP];

  return (
    <Section>
      <Box className="flex flex-col gap-4 mb-12">
        <Text as="h1">Edstellar</Text>
        <Text as="p" className="max-w-[60ch]">
          The Best Corporate Training Experiences are Instructor-led
        </Text>
      </Box>

      <Box className="flex flex-col gap-2 mb-8">
        <Text
          as="span"
          className="font-mono text-[11px] tracking-[0.24em] text-olive uppercase"
        >
          Sitemap
        </Text>
        <Text as="h3">Explore every page</Text>
      </Box>

      <Box className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <Box
            key={section.title}
            as="article"
            className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(10,22,40,0.35)] transition-shadow duration-200 hover:shadow-[0_24px_55px_-28px_rgba(10,22,40,0.45)]"
          >
            <Box className="flex flex-col gap-1">
              <Text
                as="span"
                className="font-mono text-[11px] tracking-[0.24em] text-olive uppercase"
              >
                {section.kicker}
              </Text>
              <Text as="h4">{section.title}</Text>
            </Box>

            <Box className="flex flex-wrap gap-2">
              {section.links.map((href) => (
                <CtaButton
                  key={href}
                  variant="ghost"
                  size="sm"
                  className="font-mono text-[12px]"
                  render={<Link href={href} />}
                >
                  {href}
                </CtaButton>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
