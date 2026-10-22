import { SITE } from "@/lib/constants";

/**
 * Structured-data builders (TASTE.md §4.2).
 *
 * Every builder must only describe content that is actually rendered on the
 * page. Marking up things the visitor cannot see is cloaking.
 */

function absolute(path) {
  if (!path) return undefined;
  const clean = path === "/" ? path : path.replace(/\/$/, "");
  return clean.startsWith("http") ? clean : `${SITE.url}${clean}`;
}

/**
 * Single `@graph` emitted once in the root layout — covers every page.
 * Combines Organization + EducationalOrganization and WebSite in one block
 * so Google can resolve the `@id` cross-references between them.
 */
export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "EducationalOrganization"],
        "@id": SITE.url + "/#organization",
        name: "Edstellar",
        legalName: "Edstellar Solutions Private Limited",
        url: SITE.url + "/",
        logo: {
          "@type": "ImageObject",
          url: "https://media.edstellar.com/edstellar-schema-logo.png",
          width: 112,
          height: 112,
        },
        image:
          "https://media.edstellar.com/edstellar-schema-logo.png",
        description:
          "Edstellar is a global capability transformation partner that helps enterprises build the workforce capabilities their strategy depends on. Trusted by Microsoft, Amazon, Intel, Adobe, Johnson & Johnson, Visa, ABB, and 1,200+ enterprises across 100+ countries and 10+ languages, Edstellar partners with CHROs, L&D leaders, and business heads to diagnose capability gaps, build capability across 70+ domains, and measure business impact. Its work spans talent assessments, L&D and OD consulting, training needs analysis, coaching, managed training services, and corporate training, delivered by 5,000+ consultants, coaches, and subject experts and powered by Edstellar's proprietary platforms and tools: the Capability Intelligence Platform, Spectra LMS, the TNA/TNI Engine, Zenith, Meridian, Polaris, and Orbit.",
        slogan:
          "5+ Years | 5,000+ Expert Trainers | Aligning Employees to Organizational Goals with the Right Training Solutions",
        foundingDate: "2021",
        founder: {
          "@type": "Person",
          name: "Arvind Rongala",
          jobTitle: "Founder",
        },
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 50,
          maxValue: 200,
        },
        address: [
          {
            "@type": "PostalAddress",
            streetAddress:
              "Axis Praha, 4th Floor, Ranka Colony Rd, Munivenkatppa Layout, Bilekahalli.",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            postalCode: "560078",
            addressCountry: "IN",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "2785 Rockbrook Dr STE 204",
            addressLocality: "Lewisville",
            addressRegion: "TX",
            postalCode: "75067",
            addressCountry: "US",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+1-682-297-4830",
            areaServed: "US",
            email: "contact@edstellar.com",
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+44-151-453-4009",
            areaServed: "GB",
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+91-636-483-3830",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/edstellarofficial/",
          "https://www.facebook.com/edstellarofficial/",
          "https://x.com/edstellarglobal",
          "https://www.youtube.com/@edstellarofficial",
          "https://www.instagram.com/edstellarofficial/",
        ],
        areaServed: "Worldwide",
        knowsAbout: [
          "Corporate Training",
          "Corporate Training Company",
          "Instructor-Led Training",
          "Leadership Development",
          "IT Technical Training",
          "Behavioral Training",
          "Management Training",
          "L&D Consulting Services",
          "Organizational Development Consulting",
          "Compliance Training",
          "Social Impact Training",
          "Executive Coaching",
          "Managed Training Services",
          "Learning Needs Analysis",
          "Talent Diagnostics",
          "Learning Architecture",
          "Skills Intelligence",
          "Learning and Development",
          "Workforce Upskilling",
          "Talent Transformation",
          "Artificial Intelligence Training",
          "Cybersecurity Training",
          "Cloud Computing Training",
          "Data Analytics Training",
          "DevOps Training",
          "Skill Gap Analysis",
          "Behavioral Profiling",
          "Digital Learning Ecosystems",
          "Training Needs Analysis",
          "Talent Assessment Services",
          "Change Management Consulting",
          "Culture Transformation Consulting",
          "DEI Consulting",
          "Employee Engagement Consulting",
          "Strategic Workforce Planning",
          "Succession Planning Consulting",
          "Learning Content Development",
          "Learning Technology Consulting",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Corporate Training Programs",
          itemListElement: [
            { "@type": "OfferCatalog", name: "Software Development Corporate Training Courses", url: SITE.url + "/corporate-training/software-development" },
            { "@type": "OfferCatalog", name: "Governance, Risk & Compliance Corporate Training Courses", url: SITE.url + "/corporate-training/grc" },
            { "@type": "OfferCatalog", name: "Artificial Intelligence Corporate Training Courses", url: SITE.url + "/corporate-training/ai" },
            { "@type": "OfferCatalog", name: "Cybersecurity Corporate Training Courses", url: SITE.url + "/corporate-training/cybersecurity" },
            { "@type": "OfferCatalog", name: "Human Resources Corporate Training Courses", url: SITE.url + "/corporate-training/hr" },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE.url + "/#website",
        name: SITE.name,
        url: SITE.url,
        publisher: {
          "@id": SITE.url + "/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              SITE.url +
              "/corporate-training?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function webPageJsonLd({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absolute(path) + "#webpage",
    name,
    url: absolute(path),
    isPartOf: { "@id": SITE.url + "/#website" },
    about: { "@id": SITE.url + "/#organization" },
    ...(description ? { description } : {}),
  };
}

/**
 * `BreadcrumbList` from the same array the visible breadcrumb rail renders, so
 * the two can never drift apart.
 */
export function breadcrumbJsonLd(items = []) {
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absolute(item.href),
    })),
  };
}

/**
 * `Course` for an individual course page.
 * courseMode sits directly on Course (Google accepts this pattern).
 * availableLanguage lists all delivery languages the platform supports.
 */
export function courseJsonLd({
  name,
  description,
  path,
  image,
  audience,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": absolute(path) + "#course",
    name,
    description,
    url: absolute(path),
    ...(image ? { image: absolute(image) } : {}),
    provider: {
      "@type": "Organization",
      "@id": SITE.url + "/#organization",
      name: SITE.name,
      url: SITE.url + "/",
    },
    ...(audience ? { coursePrerequisites: audience } : {}),
    educationalCredentialAwarded: "Course Completion Certificate",
    learningResourceType: "Instructor-led corporate training",
    inLanguage: "en",
    availableLanguage: ["en", "es", "zh", "de", "ar", "pt", "hi", "fr", "ja", "it"],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Onsite", "Online", "Blended"],
    },
  };
}

/**
 * `BlogPosting` for a blog post.
 *
 * `authorName` is optional: the Webflow-sourced bulk listing still has no
 * name-resolution for its author reference id (see lib/content/blog.js), so
 * callers reading from that upstream have nothing to pass here.
 */
export function blogPostingJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    ...(description ? { description } : {}),
    url: absolute(path),
    ...(image ? { image: absolute(image) } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(authorName ? { author: { "@type": "Person", name: authorName } } : {}),
    publisher: {
      "@type": "Organization",
      "@id": SITE.url + "/#organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

/**
 * `Service` for a category hub, which sells a training capability rather than a
 * single scheduled course. `offers` (`{ name, description }[]`, optional)
 * lists the packages the page sells as an `OfferCatalog` — the pricing page's
 * plans.
 */
export function serviceJsonLd({
  name,
  description,
  path,
  serviceType = `${name} corporate training`,
  offers,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    name,
    description,
    url: absolute(path),
    provider: {
      "@type": "Organization",
      "@id": SITE.url + "/#organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: "Worldwide",
    ...(offers?.length && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name,
        itemListElement: offers.map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            description: offer.description,
          },
        })),
      },
    }),
  };
}

/**
 * `FAQPage` from the same `{ question, answer }` items the visible FAQ
 * renders, so the two can never drift apart.
 */
export function faqJsonLd(items = []) {
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/**
 * `Person` for a trainer profile page — only the facts the profile renders:
 * name, title, photo, home base and delivery languages.
 */
export function personJsonLd({
  name,
  jobTitle,
  image,
  path,
  city,
  country,
  languages = [],
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    image: absolute(image),
    url: absolute(path),
    ...(city || country
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: city,
            addressCountry: country,
          },
        }
      : {}),
    ...(languages.length ? { knowsLanguage: languages } : {}),
    worksFor: {
      "@type": "Organization",
      "@id": SITE.url + "/#organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}
