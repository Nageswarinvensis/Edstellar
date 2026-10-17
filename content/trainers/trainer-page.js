/**
 * Trainer detail page (`/trainer/{slug}`) — the static copy only. Every fact
 * about the trainer (name, photo, location, courses, work history, skills,
 * education, projects) comes from the CMS record, `GET /api/v2/trainer/{slug}`.
 *
 * `{name}` / `{city}` placeholders are filled per page. Headings mark their
 * italic phrase with `<span>` for `RichHeading`.
 *
 * Design: `Edstellar-New-Lanch SETUP/amol-pune-india.html`.
 */
export const TRAINER_PAGE = {
  breadcrumbs: [
    // No "Trainers" crumb: there is no trainers listing page, only profiles.
    { label: "Home", href: "/" },
  ],

  // Only sections the trainer actually has content for are shown in the bar.
  section_nav: [
    { id: "about", label: "About" },
    { id: "trainer-for", label: "Trainer for" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
  ],

  hero: {
    primary_cta: { label: "Request a Demo", href: "/enquiry-now" },
    secondary_cta: { label: "See training areas", href: "#trainer-for" },
    // Course tags shown before "+N more".
    visible_tags: 5,
    labels: { location: "Location", since: "Trainer Since" },
  },

  about: {
    eyebrow: "Trainer profile",
    sub_heading: "About <span>{name}</span>",
    glance: {
      title: "At a glance",
      location: "Location",
      since: "Trainer Since",
      areas: "Training areas",
      education: "Education",
    },
    cta: { label: "Request a Demo", href: "/enquiry-now" },
  },

  trainer_for: { heading: "{name} is a Corporate Trainer <span>For</span>", since_label: "Training Since:" },
  experience: { heading: "Work <span>Experience</span>", responsibilities_label: "Roles & Responsibilities" },
  skills: { heading: "Skills", highlighted: 5 },
  education: { heading: "Education" },
  projects: { heading: "Projects", present_label: "currently working" },

  cta: {
    heading: "Want {name} for your <span>Next Training?</span>",
    button: { label: "Request a Demo", href: "/enquiry-now" },
  },

  // Real trainer profiles, read from the CMS by slug (it has no trainer
  // index endpoint). The page's own trainer is filtered out.
  other_trainers: {
    heading: "Other <span>Trainers</span>",
    slugs: [
      "mehak-bangalore-india",
      "oyiboka-abuja-nigeria",
      "ravi-bangalore-india",
      "satyanarayana-hyderabad-india",
      "nibedita-bangalore-india",
      "roberta-al-wajba-qatar",
      "venu-hyderabad-india",
      "mrinal-gurgaon-india",
      "harshil-ahmedabad-india",
      "yogesh-delhi-india",
      "simon-ubud-indonesia",
      "tamer-cairo-egypt",
    ],
    limit: 12,
  },

  programs: { heading: "More Corporate Training <span>Programs</span>" },
};
