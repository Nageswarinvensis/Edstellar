import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import LifecycleStages from "@/components/sections/course/lifecycle-stages";

export default function Lifecycle({ lifecycle }) {
  if (!lifecycle?.stages?.length) return null;

  return (
    <Section
      id="lifecycle"
      className="relative overflow-hidden border-t border-paper/10 bg-navy"
    >
      {/* Decorative lifecycle arcs */}
      {lifecycle.image?.src && (
        <img
          src={lifecycle.image.src}
          alt={lifecycle.image.alt || ""}
          aria-hidden={!lifecycle.image.alt}
          className="
            pointer-events-none
            absolute
            -right-7.5
            top-21.25
            z-0
            hidden
            max-w-none
            lg:block
          "
        />
      )}

      {/* Main content */}
      <div className="relative z-10">
        <Reveal delay={1}>
          <Text as="h2" className="mb-6.5 max-w-[20ch] text-paper tracking-[-0.03em]">
            {(typeof lifecycle.heading === "string" ? lifecycle.heading : "").split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, i) => {
              const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
              return match ? <em key={i} className="font-serif font-normal italic text-lime">{match[1]}</em> : fragment;
            })}
          </Text>
        </Reveal>

        <Reveal delay={2}>
          <Text
            as="p"
            className="mb-15 max-w-[64ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-paper/78"
          >
            {lifecycle.description}
          </Text>
        </Reveal>

        <Reveal delay={2}>
          <LifecycleStages stages={lifecycle.stages} />
        </Reveal>
      </div>
    </Section>
  );
}