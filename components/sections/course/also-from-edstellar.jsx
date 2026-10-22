import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";

const SERVICES = [
  {
    title: "Talent assessments",
    description:
      "Psychometric, behavioral, leadership and 360-degree assessment.",
    href: "/talent-assessment-services",
  },
  {
    title: "Training needs analysis",
    description:
      "Needs analysis, gap identification, and a training roadmap.",
    href: "/training-needs-analysis-solutions",
  },
  {
    title: "L&D consulting",
    description:
      "Learning strategy, content, technology and ROI measurement.",
    href: "/learning-development-consulting-services",
  },
  {
    title: "OD consulting",
    description:
      "Org design, succession planning and cultural change.",
    href: "/organizational-development-consulting",
  },
  {
    title: "Managed training services",
    description:
      "Training outsourcing, vendor management, logistics and administration.",
    href: "/managed-learning-services/managed-training",
  },
  {
    title: "Coaching solutions",
    description:
      "Executive and manager coaching that keeps skills in use.",
    href: "/coaching-solutions",
  },
];

const BORDER_CLASSES = [
  "lg:border-b md:border-r lg:border-r",
  "lg:border-r lg:border-b",
  "lg:border-b md:border-r lg:border-r",
  "lg:border-r",
  "md:border-r lg:border-r",
  "",
];

export default function AlsoFromEdstellar() {
  return (
    <Section className="bg-paper-warm !pt-0">
      <Reveal>
        <Box className="border-t border-[#D6D5CF] pt-8">
          <Text
            as="p"
            className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted"
          >
            Also from Edstellar
          </Text>

          <Box className="grid grid-cols-1 overflow-hidden rounded-[14px] border border-[#D9DDE1] bg-white md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Box
                as="a"
                key={service.title}
                href={service.href}
               
                className={`group relative min-h-23 border-[#D9DDE1] px-5 py-4 transition-colors duration-200 ${BORDER_CLASSES[i]} hover:bg-[#F5F3EB]`}
              >
                <Text
                  as="span"
                  className="absolute right-5 top-4 font-body text-[12px] text-[#7A8491] transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </Text>

                <Text
                  as="h4"
                  className="pr-7 font-display text-[14px] font-medium leading-tight tracking-[-0.01em] text-ink"
                >
                  {service.title}
                </Text>

                <Text
                  as="p"
                  className="mt-2 max-w-82.5 font-body text-[11px] leading-tight text-ink-muted"
                >
                  {service.description}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
