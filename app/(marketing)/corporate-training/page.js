import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";
function page() {
  return (
    <div className="">
      <Reveal delay={1} className="flex justify-center items-center h-[100vh]">
        <RichHeading
          as="h1"
          parts={[
            { text: "Corporated " },
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
