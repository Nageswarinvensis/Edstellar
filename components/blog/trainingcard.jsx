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

export default function TrainingCard() {
  return (
    <Box className="w-full rounded-2xl border border-blue-300 bg-[#eef5ff] p-5 lg:max-w-67.5">
      <Reveal>
        <Box>
          <Text
            as="h2"
            className="mb-2.5 text-[20px] font-medium leading-[1.15] text-[#3A3A3A]"
          >
            Explore{" "}
            <span className="text-[#215aff] not-italic! font-medium!">
              High-impact instructor-led training
            </span>{" "}
            for your teams.
          </Text>

          <Text className="mb-5 space-y-2 text-[12px] text-ink">
            #On-site #Virtual #GroupTraining #Customized
          </Text>

          <Box className="space-y-2.5">
            {courses.map((course) => {
              const Icon = course.icon;

              return (
                <a
                  key={course.name}
                  href={course.href}
                  title={`Click Here to View ${course.name}`}
                  className="group flex items-center justify-between rounded-md bg-white px-2 py-1.5 text-[#215aff] transition"
                >
                  <Box className="flex min-w-0 items-center gap-2">
                    <Box className="flex h-8 w-8 shrink-0 items-center justify-center">
                      <Icon size={20} />
                    </Box>

                    <Text
                      as="span"
                      className="whitespace-nowrap text-[14px] font-semibold text-[#215aff] transition-colors group-hover:text-[#22295A]"
                    >
                      {course.name}
                    </Text>
                  </Box>

                  <ChevronRight
                    size={20}
                    className="shrink-0 text-[#215aff] transition-colors group-hover:text-[#22295A]"
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
