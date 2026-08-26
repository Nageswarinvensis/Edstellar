import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Corporate Training Courses",
  description:
    "Instructor-led corporate training across technology, leadership and compliance — scoped to your stack and delivered onsite, virtually or offsite.",
  path: "/corporate-training",
});
function page() {
  return (
    <div className="">
      <Reveal delay={1} className="flex justify-center items-center h-[100vh]">
        <RichHeading
          as="h1"
          parts={[
            { text: "Corporate " },
            { text: "Training Page", highlighted: true },
          ]}
          emphasisClassName="color-ink"
          className="mb-2.5 text-center max-lg:text-[clamp(32px,5vw,50px)]"
        />
      </Reveal>
    </div>
  );
}

export default page;
