import HomeHero from "@/components/sections/home/home-hero";
import HomeStats from "@/components/sections/home/home-stats";
import HomeClients from "@/components/sections/home/home-clients";
import HomeDefinition from "@/components/sections/home/home-definition";
import HomeSolutions from "@/components/sections/home/home-solutions";
import HomeEngage from "@/components/sections/home/home-engage";
import HomeGlobal from "@/components/sections/home/home-global";
import HomeChoose from "@/components/sections/home/home-choose";
import HomeResults from "@/components/sections/home/home-results";
import HomeTaxonomy from "@/components/sections/home/home-taxonomy";
import HomePlatforms from "@/components/sections/home/home-platforms";
import HomeMethod from "@/components/sections/home/home-method";
import HomePriorities from "@/components/sections/home/home-priorities";
import HomeWhy from "@/components/sections/home/home-why";
import HomeWho from "@/components/sections/home/home-who";
import HomeFaq from "@/components/sections/home/home-faq";
import HomeCta from "@/components/sections/home/home-cta";

/**
 * Home (`/`) — the capability-platform narrative. Server Component; every
 * section is presentational and static.
 *
 * Design: `Edstellar-New-Lanch SETUP/edstellar-homepage 51.html`.
 */
export default function HomePage({ page }) { 
  return (
    <>
      <HomeHero data={page.hero} />
      <HomeStats data={page.stats} />
      <HomeClients data={page.clients} />
      <HomeDefinition data={page.definition} />
      <HomeSolutions data={page.solutions} />
      <HomeEngage data={page.engage} />
      <HomeGlobal data={page.global} />
      <HomeChoose data={page.choose} />
      {/* <HomeResults data={page.results} /> */}
      <HomeTaxonomy data={page.taxonomy} />
      <HomePlatforms data={page.platforms} />
      <HomeMethod data={page.method} />
      <HomePriorities data={page.priorities} />
      <HomeWhy data={page.why} />
      <HomeWho data={page.who} />
      <HomeFaq data={page.faq} />
      <HomeCta data={page.cta} />
    </>
  );
}
