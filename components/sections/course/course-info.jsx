import Box from "@/components/ui/Box";
import Reveal from "@/components/common/reveal";
import ProofBar from "@/components/common/proof-bar";
import CapabilityModel from "@/components/sections/course/capability-model";

const DELIVERY_STAT = {
  value: "Delivery",
  label: "Instructor-led (onsite/virtual/hybrid)",
};

const GROUP_QUOTE = {
  href: "#group-quote",
  label: "Get a group quote",
  helperText: "Need more than one program?",
};

const TRAINERS_STATIC = {
  people: [{ photo: "/course/Avatar.webp" }],
  trainer_label: "Expert trainers",
  meet_label: "Meet them",
};

function CourseInfo({ proof, capabilityModel }) {
  const topic_tags = proof?.topic_tags ?? [];
  const stats = proof
    ? [
        ...(proof.stats ?? []).filter((stat) => stat.value !== "Delivery"),
        DELIVERY_STAT,
      ]
    : [];
  const trainers = proof?.trainers && {
    ...proof.trainers,
    ...TRAINERS_STATIC,
  };

  return (
    <Box as="section" className="px-5 py-5 lg:px-10">
      <Box as="div" className="max-w-7xl m-auto">
        <CapabilityModel data={capabilityModel} />

        <Reveal delay={4}>
          <ProofBar
            tone={proof?.tone || "dark"}
            stats={stats}
            trainers={trainers}
            actions={proof?.actions}
          />
        </Reveal>

        <Reveal delay={4}>
          <Box
            as="p"
            className="mt-4 flex flex-wrap items-center justify-center gap-2 max-sm:mt-3.25 max-sm:gap-2"
          >
            <Box
              as="span"
              className="font-mono text-[10px] tracking-[0.13em] text-ink/60 uppercase max-sm:text-[9.5px]"
            >
              {GROUP_QUOTE.helperText}
            </Box>

            <a
              href={GROUP_QUOTE.href}
              title={`Click Here to ${GROUP_QUOTE.label}`}
              className="group border-b border-lime/55 pb-0.5 font-mono text-[10px] font-medium tracking-[0.13em] text-ink/60 uppercase transition-colors hover:border-navy hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy max-sm:text-[9.5px]"
            >
              {GROUP_QUOTE.label}

              <span
                aria-hidden="true"
                className="ml-1.5 inline-block transition-transform duration-250 group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </a>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}

export default CourseInfo;
