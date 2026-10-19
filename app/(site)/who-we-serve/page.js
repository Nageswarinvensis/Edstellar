import { pageData } from "@/lib/content/who-we-serve";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import WwsHero from "@/components/sections/who-we-serve/wws-hero";
import ProofBar from "@/components/common/proof-bar";
import Section from "@/components/ui/Section";
import ClientLogos from "@/components/common/client-logos";
import WwsOrgExplorer from "@/components/sections/who-we-serve/wws-org-explorer";
import WwsCtaBand from "@/components/sections/who-we-serve/wws-cta-band";
import WwsIndustries from "@/components/sections/who-we-serve/wws-industries";
import WwsRoles from "@/components/sections/who-we-serve/wws-roles";
import WwsGlobal from "@/components/sections/who-we-serve/wws-global";
import WwsWhy from "@/components/sections/who-we-serve/wws-why";
import WwsTools from "@/components/sections/who-we-serve/wws-tools";
import WwsFaq from "@/components/sections/who-we-serve/wws-faq";
import WwsContact from "@/components/sections/who-we-serve/wws-contact";

export const metadata = {
  title: "Who We Serve: Industries & Organizations",
  description:
    "Explore the industries and organizations Edstellar serves, from growing businesses to global enterprises, universities and government teams building capability.",
  alternates: {
    canonical: "/who-we-serve",
  },
  openGraph: {
    title: "Who We Serve: Industries & Organizations",
    description:
      "Explore the industries and organizations Edstellar serves, from growing businesses to global enterprises, universities and government teams building capability.",
  },
};

export default function WhoWeServePage() {
  return (
    <main id="main" tabIndex={-1}>
      <WwsHero data={pageData.hero} />
      <Section aria-label="Edstellar at a glance" className="bg-navy-deep">
        <ProofBar layout="spread" stats={pageData.proof} />
      </Section>
      <ClientLogos />
      <StickyTabs data={pageData.stickyNav} />
      <WwsOrgExplorer data={pageData.orgExplorer} />
      <WwsCtaBand data={pageData.ctaBand} />
      <WwsIndustries data={pageData.industries} />
      <WwsRoles data={pageData.roles} />
      <WwsGlobal data={pageData.global} />
      <WwsWhy data={pageData.why} />
      <WwsTools data={pageData.tools} />
      <WwsFaq data={pageData.faq} />
      <WwsContact data={pageData.contact} />
    </main>
  );
}
