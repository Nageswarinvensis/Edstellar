import { getHomePage } from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo/metadata";
import HomePage from "@/components/templates/home-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getHomePage();
  return buildMetadata(seo);
}

/**
 * Home (`/`) — local content (`content/home.js`), rendered as ISR (§2.2).
 *
 * Design: `Edstellar-New-Lanch SETUP/edstellar-homepage 51.html`.
 */
export default function HomeRoute() {
  const page = getHomePage();

  const BASE = "https://www.edstellar.com";

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://www.edstellar.com/#organization",
        "name": "Edstellar",
        "url": "https://www.edstellar.com",
        "description": "Edstellar helps enterprises build workforce capabilities and drive organizational transformation. Backed by 5+ years of experience in corporate learning and development, Edstellar brings together corporate training, L&D and organizational development consulting, talent assessments, leadership and team coaching, managed learning services, and learning, assessment and capability analytics platforms. These offerings help organizations identify capability gaps, develop employees and leaders, and align workforce development with business goals.",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.edstellar.com/course/edstellar.svg"
        },
        "sameAs": [
          "https://www.linkedin.com/company/edstellarofficial/",
          "https://www.youtube.com/@edstellarofficial",
          "https://x.com/edstellarglobal",
          "https://www.facebook.com/edstellarofficial/",
          "https://www.instagram.com/edstellarofficial/"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "training enquiries",
            "email": "contact@edstellar.com",
            "url": "https://www.edstellar.com/contact-us"
          }
        ],
        "knowsAbout": [
          "Corporate training",
          "Learning and development consulting",
          "Organizational development consulting",
          "Talent assessments",
          "Leadership coaching",
          "Team coaching",
          "Managed learning services",
          "Learning management systems",
          "Capability analytics"
        ],
        "areaServed": [
          "North America",
          "Europe",
          "Asia-Pacific",
          "Middle East",
          "Africa",
          "Latin America and the Caribbean"
        ]
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.edstellar.com/#website",
        "name": "Edstellar",
        "url": "https://www.edstellar.com"
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${BASE}#webpage`,
        "url": BASE,
        "name": page.seo.title,
        ...(page.seo.description && { "description": page.seo.description }),
        "inLanguage": "en-US"
      }} />
      {/* <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
      /> */}
      <HomePage page={page} />
    </>
  );
}
