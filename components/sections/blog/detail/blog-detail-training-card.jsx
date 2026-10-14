import {
  ChevronRight,
  Monitor,
  Briefcase,
  Users,
  Crown,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

const courses = [
  {
    name: "IT & Technical Courses",
    href: "https://www.edstellar.com/type/it-technical-training",
    icon: Monitor,
  },
  {
    name: "Management Courses",
    href: "https://www.edstellar.com/type/management-courses",
    icon: Briefcase,
  },
  {
    name: "Behavioral Courses",
    href: "https://www.edstellar.com/type/behavioral-courses",
    icon: Users,
  },
  {
    name: "Leadership Courses",
    href: "https://www.edstellar.com/type/leadership-courses",
    icon: Crown,
  },
  {
    name: "Compliance Courses",
    href: "https://www.edstellar.com/type/compliance-courses",
    icon: ShieldCheck,
  },
  {
    name: "Social Impact Courses",
    href: "https://www.edstellar.com/type/social-impact-courses",
    icon: HeartHandshake,
  },
];

/**
 * Rail card — explore courses: warm card, olive accents, white link rows.
 */
export default function BlogDetailTrainingCard() {
  return (
    <Box className="w-full rounded-2xl border border-ink/12 bg-paper-warm p-6 transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.25 hover:border-ink/22 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.5)]">
      <Reveal>
        <Box>
          <Text
            as="h2"
            className="mb-2.5 text-[17px] leading-[1.32] font-semibold tracking-[-0.02em] text-ink"
          >
            Explore{" "}
            <em className="font-serif font-normal text-olive">
              High-impact
            </em>{" "}
            instructor-led training for your teams.
          </Text>

          <Text className="mb-4 font-mono text-[10.5px] leading-[1.9] tracking-[0.1em] text-olive">
            #On-site #Virtual #GroupTraining #Customized
          </Text>

          <Box className="space-y-2">
            {courses.map((course) => {
              const Icon = course.icon;

              return (
                <a
                  key={course.name}
                  href={course.href}
                  title={`Click Here to View ${course.name}`}
                  className="group flex cursor-pointer items-center justify-between gap-2.5 rounded-xl border border-ink/12 bg-white px-3.5 py-3 transition-colors duration-200 hover:border-navy hover:bg-ink/4"
                >
                  <Box className="flex min-w-0 items-center gap-2.5">
                    <Icon size={16} className="shrink-0 text-ink/60" aria-hidden="true" />

                    <Text
                      as="span"
                      className="font-display text-[13px] font-semibold tracking-[-0.01em] text-ink"
                    >
                      {course.name}
                    </Text>
                  </Box>

                  <ChevronRight
                    size={16}
                    strokeWidth={2.25}
                    className="shrink-0 text-olive transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
}
