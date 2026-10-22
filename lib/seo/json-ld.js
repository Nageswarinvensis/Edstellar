import { SITE } from "@/lib/constants";

/**
 * Structured-data builders (TASTE.md §4.2).
 *
 * Every builder must only describe content that is actually rendered on the
 * page. Marking up things the visitor cannot see is cloaking.
 */

function absolute(path) {
  if (!path) return undefined;
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
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
          url: "https://media.edstellar.com/website/139_x_50_.svg",
          width: 139,
          height: 50,
        },
        image:
          "https://media.edstellar.com/website/139_x_50_.svg",
        description:
          "Edstellar is a global corporate training company and workforce capability partner trusted by Microsoft, Amazon, Intel, Adobe, Johnson & Johnson, Visa, ABB, and 500+ enterprises across 100+ locations worldwide. With 5+ years of experience and 5,000+ expert trainers, Edstellar partners with CHROs, L&D leaders, and business heads to close skill gaps and drive measurable business outcomes through corporate training programs, learning needs analysis, managed training services, L&D and OD consulting, talent diagnostics, learning architecture, and AI-driven skills intelligence.",
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
            email: "contact@edstellar.com",
            availableLanguage: ["English"],
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/edstellarofficial/",
          "https://www.facebook.com/edstellarofficial/",
          "https://x.com/edstellarglobal",
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
    name,
    url: absolute(path),
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
