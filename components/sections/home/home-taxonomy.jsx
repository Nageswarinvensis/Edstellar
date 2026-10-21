import HomeWrap from "@/components/sections/home/home-wrap";
import Reveal from "@/components/common/reveal";
import HomeSectionHead from "@/components/sections/home/home-section-head";
import HomeTaxonomyFlow from "@/components/sections/home/home-taxonomy-flow";

/** The five-layer capability schema — Function → Role → Capability → Skill →
 * Proficiency — as a bordered five-column flow whose highlighted example path
 * cycles (`HomeTaxonomyFlow`). `data.start` is the path shown first. */
export default function HomeTaxonomy({ data }) {
  if (!data?.steps?.length) return null;

  return (
    <HomeWrap id="taxonomy" aria-labelledby="taxo-heading" className="scroll-mt-16 border-t-[1.5px] border-ink/12 bg-paper-warm py-20 max-lg:py-16">
      <HomeSectionHead id="taxo-heading" heading={data.heading} lede={data.lede} />

      <Reveal>
        <HomeTaxonomyFlow steps={data.steps} start={data.start ?? 1} />
      </Reveal>
    </HomeWrap>
  );
}
