import { getAboutUsPage } from "@/lib/content/about-us";
import { buildMetadata } from "@/lib/seo/metadata";
import AboutUsPage from "@/components/templates/about-us-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getAboutUsPage();
  // The SEO title is "About Edstellar" exactly — the root layout's
  // `%s | Edstellar` template would repeat the brand, so it is bypassed.
  return { ...buildMetadata(seo), title: { absolute: seo.title } };
}

/**
 * About Us — local content (`content/company/about-us.js`), so fully
 * static.
 *
 * Design: `Edstellar-New-Lanch SETUP/about-us 59.html`.
 */
export default function AboutUsRoute() {
  const page = getAboutUsPage();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/about-us`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://www.edstellar.com/about-us#webpage",
        "url": "https://www.edstellar.com/about-us",
        "name": "Your Capability Transformation Partner",
        "description": "Learn about Edstellar, our purpose, values and approach to capability transformation, and how we help organizations develop their people and teams.",
        "inLanguage": "en-US",
        "isPartOf": { "@id": "https://www.edstellar.com/#website" },
        "mainEntity": { "@id": "https://www.edstellar.com/#organization" },
        "breadcrumb": { "@id": "https://www.edstellar.com/about-us#breadcrumb" },
        "hasPart": { "@id": "https://www.edstellar.com/about-us#faq" }
      }} />
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
      {page.breadcrumbs?.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": page.breadcrumbs.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.label,
            "item": item.href === "/" ? BASE : item.href?.startsWith("http") ? item.href : item.href ? `${BASE}${item.href}` : pageUrl
          }))
        }} />
      )}
      {/* <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items}
      /> */}
      <AboutUsPage page={page} />
    </>
  );
}
