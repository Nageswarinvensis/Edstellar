import HomeHero from "@/components/sections/home/home-hero";
import HomeStats from "@/components/sections/home/home-stats";
import HomeClients from "@/components/sections/home/home-clients";
import HomePillars from "@/components/sections/home/home-pillars";
import HomeTaxonomy from "@/components/sections/home/home-taxonomy";
import HomeMethod from "@/components/sections/home/home-method";
import HomeWhy from "@/components/sections/home/home-why";
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
      <HomePillars data={page.pillars} />
      <HomeTaxonomy data={page.taxonomy} />
      <HomeMethod data={page.method} />
      <HomeWhy data={page.why} />
      <HomeCta data={page.cta} />
    </>
  );
}
