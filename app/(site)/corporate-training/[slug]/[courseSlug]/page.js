import { notFound } from "next/navigation";

import { getCourse } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import CoursePage from "@/components/templates/training/course-page";

/**
 * `/corporate-training/{domain}/{course-slug}` — a course page.
 *
 * A course belongs to exactly one domain, which is what gives it exactly one
 * canonical URL. Industry and vendor pages list courses and link here; they
 * never host one (TASTE.md §1.2).
 */

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug, courseSlug } = await params;
  const course = await getCourse(slug, courseSlug);

  if (!course) return {};

  const rawTitle = course.seo?.meta_title ?? course.name;
  const title = rawTitle.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();

  return buildMetadata({
    title,
    description: course.seo?.Meta_description,
    path: `/corporate-training/${slug}/${courseSlug}`,
    image: course.seo?.og_image_url || course.banner_image,
  });
}

export default async function CourseRoute({ params }) {
  const { slug, courseSlug } = await params;

  // Both segments. A one-argument read would render this course under any
  // parent slug, including an industry or a vendor (TASTE.md §1.2).
  const course = await getCourse(slug, courseSlug);

  // Covers two distinct failures at once: no such course, or the course
  // belongs to a different domain than the one in the URL. Both are real 404s.
  if (!course) notFound();

  const NET_COURSE = courseSlug === "net-architecture-design-patterns-course" && slug === "software-development";

  return (
    <>
      {NET_COURSE && (
        <>
          {/* 1 — WebSite + WebPage */}
          <JsonLd data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.edstellar.com/#website",
                "url": "https://www.edstellar.com",
                "name": "Edstellar"
              },
              {
                "@type": "WebPage",
                "@id": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course#webpage",
                "url": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course",
                "name": ".NET Architecture and Design Patterns Corporate Training",
                "description": "Instructor-led corporate training that teaches your team .NET architecture, design patterns, and clean code in guided hands-on labs.",
                "inLanguage": "en-US",
                "isPartOf": { "@id": "https://www.edstellar.com/#website" }
              }
            ]
          }} />
          {/* 2 — BreadcrumbList + FAQPage */}
          <JsonLd data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.edstellar.com" },
                  { "@type": "ListItem", "position": 2, "name": "Corporate Training", "item": "https://www.edstellar.com/corporate-training" },
                  { "@type": "ListItem", "position": 3, "name": "Software Development", "item": "https://www.edstellar.com/corporate-training/software-development" },
                  { "@type": "ListItem", "position": 4, "name": ".NET Architecture and Design Patterns", "item": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course" }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course#faq",
                "inLanguage": "en-US",
                "mainEntity": [
                  { "@type": "Question", "name": "How do we get a quote for this program?", "acceptedAnswer": { "@type": "Answer", "text": "Share your team size, preferred dates, and delivery format, and we will send a tailored quote for .NET Architecture & Design Patterns within one business day." } },
                  { "@type": "Question", "name": "Can we schedule a discovery call first?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. A short discovery call with a training advisor helps us map your team's goals to the .NET Architecture & Design Patterns curriculum before you commit." } },
                  { "@type": "Question", "name": "Is this training available virtually?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Live virtual delivery covers the full 24-hour curriculum with the same guided labs and capstone as onsite sessions." } },
                  { "@type": "Question", "name": "Can you deliver onsite at our office?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Onsite delivery brings the instructor to your location, with whiteboard design sessions and face-to-face lab coaching." } },
                  { "@type": "Question", "name": "How long is the program?", "acceptedAnswer": { "@type": "Answer", "text": "The program runs 24 instructor-led hours across six modules, ending with a capstone build reviewed by the instructor." } },
                  { "@type": "Question", "name": "What group size works best?", "acceptedAnswer": { "@type": "Answer", "text": "Cohorts are sized for interaction and coaching, typically up to 20 participants, so every team gets lab support." } },
                  { "@type": "Question", "name": "Can the content be customized?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Labs and the capstone are shaped around your stack and use cases, so exercises map to your real systems." } },
                  { "@type": "Question", "name": "Who should attend this training?", "acceptedAnswer": { "@type": "Answer", "text": ".NET developers, backend engineers, and technical leads who design or evolve .NET systems." } },
                  { "@type": "Question", "name": "Are there hands-on labs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every module includes a guided hands-on lab, and the program ends with a capstone build." } },
                  { "@type": "Question", "name": "How is learning assessed?", "acceptedAnswer": { "@type": "Answer", "text": "Instructors review labs throughout and assess the capstone against practical criteria, with feedback your team can act on." } },
                  { "@type": "Question", "name": "What materials and support are included?", "acceptedAnswer": { "@type": "Answer", "text": "Course materials, code samples, and lab guides are included, plus post-program resources for applying the methods." } },
                  { "@type": "Question", "name": "How do we roll this out to multiple teams?", "acceptedAnswer": { "@type": "Answer", "text": "We schedule sequential cohorts and share reusable patterns, so standards spread across your organization." } }
                ]
              }
            ]
          }} />
          {/* 3 — Course (standalone) */}
          <JsonLd data={{
            "@context": "https://schema.org",
            "@type": "Course",
            "@id": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course#course",
            "name": ".NET Architecture and Design Patterns Corporate Training",
            "description": "Instructor-led corporate training that teaches your team .NET architecture, design patterns, and clean code in guided hands-on labs.",
            "url": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course",
            "provider": { "@type": "Organization", "name": "Edstellar", "url": "https://www.edstellar.com" },
            "inLanguage": "en",
            "learningResourceType": "Instructor-led corporate training",
            "image": "https://media.edstellar.com/course_thumbnail/net-architecture-design-patterns-course.webp",
            "timeRequired": "PT24H",
            "teaches": [
              "Write C# code that follows SOLID principles so systems stay maintainable as they grow.",
              "Choose and implement creational patterns for flexible object creation in .NET.",
              "Compose clean, reusable .NET components with structural patterns.",
              "Design event-driven and async behavior with proven behavioral patterns.",
              "Structure .NET applications in clean layers with clear boundaries and dependencies.",
              "Configure DI containers so components stay testable and loosely coupled.",
              "Validate designs with unit tests and reviews that catch coupling early."
            ],
            "coursePrerequisites": "Participants benefit most from working experience with C# and .NET. No prior architecture experience is needed: the program starts with foundations and adapts to each cohort's stack, so every team practices the patterns it will use in production.",
            "audience": { "@type": "Audience", "audienceType": "This program is built for engineering teams designing and evolving .NET systems. Content adapts to each cohort's stack and experience level, so every group practices the architecture workflows it actually owns." },
            "educationalCredentialAwarded": "Edstellar course completion certificate",
            "hasCourseInstance": [
              { "@type": "CourseInstance", "@id": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course#onsite", "courseMode": "Onsite" },
              { "@type": "CourseInstance", "@id": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course#virtual", "courseMode": "Live virtual" },
              { "@type": "CourseInstance", "@id": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course#hybrid", "courseMode": "Hybrid" }
            ]
          }} />
          {/* 4 — Service (standalone) */}
          <JsonLd data={{
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course#service",
            "name": ".NET Architecture and Design Patterns Corporate Training",
            "description": "Edstellar provides customized .NET Architecture and Design Patterns training for enterprise teams. Our expert trainers tailor delivery to your team's roles, capability gaps, and business requirements. Practical exercises focus on these course outcomes: Apply SOLID principles; Use creational patterns; Use structural patterns. Training is available through onsite, live virtual or hybrid delivery. English is the default training language, with other languages available on request.",
            "url": "https://www.edstellar.com/corporate-training/software-development/net-architecture-design-patterns-course",
            "serviceType": "Customized instructor-led corporate training",
            "provider": { "@type": "Organization", "name": "Edstellar", "url": "https://www.edstellar.com" },
            "image": "https://media.edstellar.com/course_thumbnail/net-architecture-design-patterns-course.webp",
            "areaServed": ["North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Latin America and the Caribbean"],
            "audience": { "@type": "Audience", "audienceType": "Enterprise and Corporate Organizations" }
          }} />
        </>
      )}
      <CoursePage course={course} />
    </>
  );
}
